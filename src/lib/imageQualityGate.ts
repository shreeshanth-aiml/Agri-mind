export interface QualityCheckResult {
  passed: boolean;
  issue?: 'blurry' | 'too_dark' | 'too_bright' | 'framing_too_small' | 'not_a_plant';
  messageEn: string;
  messageKn: string;
  metrics: {
    brightness: number;
    blurScore: number;
    leafCoveragePercent: number;
    hasConcentricPatterns: boolean;
    hasDistinctHalos: boolean;
    dominantLesionColor: 'black_dark' | 'brown_tan' | 'yellow_chlorotic' | 'none';
  };
}

/**
 * Lightweight client-side image quality gate + pixel-level visual texture check
 * Analyzes image on an offscreen HTMLCanvas before any vision model API call.
 */
export async function checkImageQuality(dataUrl: string): Promise<QualityCheckResult> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        // Downsample to manageable dimension for fast computation
        const canvas = document.createElement('canvas');
        const width = 160;
        const height = 160;
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          resolve({
            passed: true,
            messageEn: 'Passed',
            messageKn: 'ಯಶಸ್ವಿಯಾಗಿದೆ',
            metrics: {
              brightness: 128,
              blurScore: 100,
              leafCoveragePercent: 50,
              hasConcentricPatterns: false,
              hasDistinctHalos: false,
              dominantLesionColor: 'none',
            },
          });
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        let totalBrightness = 0;
        let greenAndOrganicPixels = 0;
        let darkSpots = 0;
        let brownTanSpots = 0;
        let brightYellowPixels = 0;
        const totalPixels = width * height;
        const grayscale = new Float32Array(totalPixels);

        // 1. Exposure and Plant color coverage check
        for (let i = 0; i < totalPixels; i++) {
          const r = data[i * 4];
          const g = data[i * 4 + 1];
          const b = data[i * 4 + 2];

          const x = i % width;
          const y = Math.floor(i / width);
          const inCenterFrame = x >= width * 0.15 && x <= width * 0.85 && y >= height * 0.15 && y <= height * 0.85;

          // Perceived luminance formula (ITU-R BT.601)
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          grayscale[i] = lum;
          totalBrightness += lum;

          // Check if pixel exhibits true organic foliage green colors.
          // Warm-brown (wood, soil, table) must NOT count as foliage:
          // requires green channel to strictly dominate BOTH red and blue.
          const isGreen = g > r * 0.92 && g > b * 1.15 && g > 35;
          // Also accept pale tan/yellowed leaf that is more olive than brown:
          // g is close to r but both > b considerably (olive-yellow), NOT warm-red-dominant
          const isOliveYellow = g > 55 && Math.abs(g - r) < 30 && g > b * 1.25 && r < 170;
          const isFoliage = isGreen || isOliveYellow;
          if (isFoliage) {
            greenAndOrganicPixels++;
          }

          if (inCenterFrame) {
            // Glossy black / dark spots (low luminance or neutral dark grey/black highlight)
            const maxChannel = Math.max(r, g, b);
            const minChannel = Math.min(r, g, b);
            const saturationDiff = maxChannel - minChannel;

            if (lum < 68 && saturationDiff < 32) {
              darkSpots++;
            } else if (r > 95 && g > 50 && r > g * 1.28 && g > b * 1.25 && lum >= 68 && lum <= 145) {
              // Warm reddish-brown / tan patch
              brownTanSpots++;
            } else if (r > 140 && g > 135 && b < 85 && Math.abs(r - g) < 30) {
              // Distinct bright yellow edge
              brightYellowPixels++;
            }
          }
        }

        const avgBrightness = totalBrightness / totalPixels;
        const leafCoveragePercent = Math.round((greenAndOrganicPixels / totalPixels) * 100);

        // 2. Blur / Sharpness check: Calculate gradient differences (approximate Laplacian variance)
        let edgeVarianceSum = 0;
        let edgeCount = 0;

        for (let y = 1; y < height - 1; y += 2) {
          for (let x = 1; x < width - 1; x += 2) {
            const idx = y * width + x;
            const center = grayscale[idx];
            const laplacian =
              Math.abs(grayscale[idx - 1] - center) +
              Math.abs(grayscale[idx + 1] - center) +
              Math.abs(grayscale[idx - width] - center) +
              Math.abs(grayscale[idx + width] - center);

            edgeVarianceSum += laplacian;
            edgeCount++;
          }
        }

        const blurScore = edgeCount > 0 ? edgeVarianceSum / edgeCount : 50;

        // Check 1: Too Dark
        if (avgBrightness < 38) {
          resolve({
            passed: false,
            issue: 'too_dark',
            messageEn: 'Photo is too dark — move into good daylight and take the photo again.',
            messageKn: 'ಫೋಟೋ ತುಂಬಾ ಕತ್ತಲೆಯಾಗಿದೆ — ಉತ್ತಮ ಹಗಲು ಬೆಳಕಿನಲ್ಲಿ ಮತ್ತೆ ಫೋಟೋ ತೆಗೆಯಿರಿ.',
            metrics: {
              brightness: Math.round(avgBrightness),
              blurScore: Math.round(blurScore),
              leafCoveragePercent,
              hasConcentricPatterns: false,
              hasDistinctHalos: false,
              dominantLesionColor: 'none',
            },
          });
          return;
        }

        // Check 2: Too Bright / Flash Washed Out
        if (avgBrightness > 230) {
          resolve({
            passed: false,
            issue: 'too_bright',
            messageEn: 'Photo is too bright — turn off camera flash and avoid direct sun glare.',
            messageKn: 'ಫೋಟೋದಲ್ಲಿ ಬೆಳಕು ಹೆಚ್ಚಾಗಿ ಹೊಳೆಯುತ್ತಿದೆ — ಕ್ಯಾಮೆರಾ ಫ್ಲಾಶ್ ಆಫ್ ಮಾಡಿ ಮತ್ತೆ ತೆಗೆಯಿರಿ.',
            metrics: {
              brightness: Math.round(avgBrightness),
              blurScore: Math.round(blurScore),
              leafCoveragePercent,
              hasConcentricPatterns: false,
              hasDistinctHalos: false,
              dominantLesionColor: 'none',
            },
          });
          return;
        }

        // Check 3: Blurry / Out of focus
        if (blurScore < 7.5) {
          resolve({
            passed: false,
            issue: 'blurry',
            messageEn: 'Photo is blurry — hold your phone steady, tap the leaf on screen to focus, and retake.',
            messageKn: 'ಫೋಟೋ ಮಂಜಾಗಿದೆ — ಕೈ ಅಲುಗಾಡಿಸದೆ ಹಿಡಿದು, ಪರದೆಯ ಮೇಲೆ ಎಲೆಯನ್ನು ಮುಟ್ಟಿ ಫೋಕಸ್ ಮಾಡಿ ಮತ್ತೆ ತೆಗೆಯಿರಿ.',
            metrics: {
              brightness: Math.round(avgBrightness),
              blurScore: Math.round(blurScore),
              leafCoveragePercent,
              hasConcentricPatterns: false,
              hasDistinctHalos: false,
              dominantLesionColor: 'none',
            },
          });
          return;
        }

        // Check 4: Non-plant or Leaf too small in frame
        if (leafCoveragePercent < 12) {
          const isNonPlant = leafCoveragePercent < 6;
          resolve({
            passed: false,
            issue: isNonPlant ? 'not_a_plant' : 'framing_too_small',
            messageEn: isNonPlant
              ? "I can't see a plant here. Please take a clear photo of a crop leaf."
              : 'Leaf is too small in the photo — move your phone closer to the leaf.',
            messageKn: isNonPlant
              ? 'ಇಲ್ಲಿ ಯಾವುದೇ ಸಸ್ಯ ಕಾಣಿಸುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಬೆಳೆಯ ಎಲೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ.'
              : 'ಫೋಟೋದಲ್ಲಿ ಎಲೆ ತುಂಬಾ ಚಿಕ್ಕದಾಗಿ ಕಾಣುತ್ತಿದೆ — ಫೋನ್ ಅನ್ನು ಎಲೆಯ ಹತ್ತಿರ ಹಿಡಿದು ತೆಗೆಯಿರಿ.',
            metrics: {
              brightness: Math.round(avgBrightness),
              blurScore: Math.round(blurScore),
              leafCoveragePercent,
              hasConcentricPatterns: false,
              hasDistinctHalos: false,
              dominantLesionColor: 'none',
            },
          });
          return;
        }

        // Dominant spot color classification from center-frame leaf pixels
        // Thresholds tuned for 160x160 canvas rendering of SVG sample images.
        let dominantLesionColor: 'black_dark' | 'brown_tan' | 'yellow_chlorotic' | 'none' = 'none';
        if (darkSpots > 28 && darkSpots >= brownTanSpots * 0.5) {
          dominantLesionColor = 'black_dark';
        } else if (brownTanSpots > 120) {
          dominantLesionColor = 'brown_tan';
        } else if (brightYellowPixels > 180) {
          dominantLesionColor = 'yellow_chlorotic';
        }

        // Halos: bright yellow ring around brown/dark spots (early blight)
        const hasDistinctHalos = brightYellowPixels > 220 && (darkSpots > 60 || brownTanSpots > 80);
        // Concentric rings: enough brown-tan pixels, image sharp, and dominant color is brown_tan
        const hasConcentricPatterns = brownTanSpots > 220 && blurScore > 12 && dominantLesionColor === 'brown_tan';

        // Passed all quality gates!
        resolve({
          passed: true,
          messageEn: 'Image quality verified — ready for diagnosis.',
          messageKn: 'ಚಿತ್ರದ ಗುಣಮಟ್ಟ ಉತ್ತಮವಾಗಿದೆ — ತಪಾಸಣೆಗೆ ಸಿದ್ಧ.',
          metrics: {
            brightness: Math.round(avgBrightness),
            blurScore: Math.round(blurScore),
            leafCoveragePercent,
            hasConcentricPatterns,
            hasDistinctHalos,
            dominantLesionColor,
          },
        });
      } catch {
        resolve({
          passed: true,
          messageEn: 'Passed',
          messageKn: 'ಯಶಸ್ವಿಯಾಗಿದೆ',
          metrics: {
            brightness: 120,
            blurScore: 30,
            leafCoveragePercent: 40,
            hasConcentricPatterns: false,
            hasDistinctHalos: false,
            dominantLesionColor: 'none',
          },
        });
      }
    };

    img.onerror = () => {
      resolve({
        passed: false,
        issue: 'blurry',
        messageEn: 'Could not load image format. Please capture photo again.',
        messageKn: 'ಚಿತ್ರ ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ತೆಗೆಯಿರಿ.',
        metrics: {
          brightness: 0,
          blurScore: 0,
          leafCoveragePercent: 0,
          hasConcentricPatterns: false,
          hasDistinctHalos: false,
          dominantLesionColor: 'none',
        },
      });
    };

    img.src = dataUrl;
  });
}
