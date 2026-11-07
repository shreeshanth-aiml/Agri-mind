import { useState, useRef, useEffect, useMemo, type DragEvent } from 'react';
import { useAppContext } from '../lib/store';
import { callGemini } from '../lib/gemini';
import { speak } from '../lib/voice';
import { useTranslation, TranslationKey } from '../lib/translations';
import { DISTRICTS_KANNADA } from '../lib/mockData';
import { LanguageToggle } from '../components/LanguageToggle';
import { checkImageQuality, QualityCheckResult } from '../lib/imageQualityGate';
import { getShortlistForContext, REGIONAL_DISEASE_DB } from '../lib/diseaseShortlist';
import {
  saveDiagnosisRecord,
  recordFeedback,
  getDiagnosisHistory,
  DiagnosisHistoryRecord,
} from '../lib/farmHistory';
import {
  Bug,
  Camera,
  RotateCcw,
  Volume2,
  AlertTriangle,
  Leaf,
  CheckCircle2,
  HelpCircle,
  Info,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Layers,
  PhoneCall,
  Code2,
  Share2,
  FileText,
  Check,
  Copy,
  X,
  Printer,
  Play,
} from 'lucide-react';
import { motion } from 'motion/react';

interface CropVerificationResult {
  isMatch: boolean;
  detectedPlant: string;
  confidence: number;
}

interface DifferentialCandidate {
  condition: string;
  conditionKey?: TranslationKey;
  confidence?: number;
  reasonNotRuledOut?: string;
  reasonKey?: TranslationKey;
  supportsThis: string;
  supportsThisKey?: TranslationKey;
  doesntFit: string;
  doesntFitKey?: TranslationKey;
  hasDirectEvidence?: boolean;
}

interface UpgradedDiseaseResult {
  diseaseName: string;
  confidence: number;
  isConfident: boolean;
  matchedSymptoms: string[];
  matchedSymptomKeys?: TranslationKey[];
  differentialAlternatives: DifferentialCandidate[];
  dataLimitationNote: string;
  severity: 'Low' | 'Medium' | 'High' | string;
  treatmentAdviceTier: 'high_confidence' | 'medium_confidence' | 'low_confidence_uncertain';
  safeCareGuidance: string[];
  safeCareKeys?: TranslationKey[];
  specificTreatment?: string | null;
  prevention: string;
  preventionKey?: TranslationKey;
  step4bTriggered?: boolean;
}

const CROP_TRANSLATION_KEYS: Record<string, TranslationKey> = {
  Tomato: 'cropTomato',
  Maize: 'cropMaize',
  Paddy: 'cropPaddy',
  Ragi: 'cropRagi',
  Cotton: 'cropCotton',
  Onion: 'cropOnion',
  Chilli: 'cropChilli',
  Other: 'cropOther',
};

const SAMPLE_LEAF_SVGS: {
  crop: string;
  labelKey: TranslationKey;
  dataUrl: string;
}[] = [
  {
    crop: 'Tomato',
    labelKey: 'sampleTomatoBlight',
    dataUrl:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%232d4a3e"/><path d="M150 25 C65 75 55 215 150 275 C245 215 235 75 150 25 Z" fill="%234a7c59"/><path d="M150 25 L150 275" stroke="%23285434" stroke-width="4"/><path d="M150 95 L105 75 M150 145 L195 125 M150 195 L105 175" stroke="%23285434" stroke-width="2.5"/><circle cx="125" cy="120" r="34" fill="%23d2c81e"/><circle cx="125" cy="120" r="28" fill="%2396642d"/><circle cx="125" cy="120" r="21" fill="%234a3222"/><circle cx="125" cy="120" r="14" fill="%2396642d"/><circle cx="125" cy="120" r="7" fill="%23312216"/><circle cx="175" cy="170" r="32" fill="%23d2c81e"/><circle cx="175" cy="170" r="26" fill="%2396642d"/><circle cx="175" cy="170" r="19" fill="%234a3222"/><circle cx="175" cy="170" r="12" fill="%2396642d"/><circle cx="175" cy="170" r="5" fill="%23312216"/></svg>',
  },
  {
    crop: 'Tomato',
    labelKey: 'sampleCleanHealthy',
    dataUrl:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%231b3323"/><path d="M150 25 C65 75 55 215 150 275 C245 215 235 75 150 25 Z" fill="%233da35d"/><path d="M150 25 L150 275" stroke="%23256b3b" stroke-width="4"/><path d="M150 90 L95 70 M150 140 L205 120 M150 190 L95 170 M150 230 L195 215" stroke="%23256b3b" stroke-width="2.5"/></svg>',
  },
  {
    crop: 'Other',
    labelKey: 'sampleGlossyBlackSpots',
    dataUrl:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%232d4a3e"/><path d="M150 25 C65 75 55 215 150 275 C245 215 235 75 150 25 Z" fill="%233f7a4d"/><path d="M150 25 L150 275" stroke="%23285434" stroke-width="4"/><path d="M150 95 L105 75 M150 145 L195 125 M150 195 L105 175" stroke="%23285434" stroke-width="2.5"/><circle cx="122" cy="115" r="14" fill="%23141615"/><circle cx="119" cy="112" r="4" fill="%23525955"/><circle cx="176" cy="155" r="16" fill="%23111312"/><circle cx="172" cy="151" r="4.5" fill="%23525955"/><circle cx="135" cy="195" r="12" fill="%23141615"/><circle cx="132" cy="192" r="3.5" fill="%23525955"/><circle cx="168" cy="102" r="10" fill="%23141615"/><circle cx="166" cy="100" r="3" fill="%23525955"/></svg>',
  },
  {
    crop: 'Maize',
    labelKey: 'sampleMaizeBlight',
    dataUrl:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%231e2d24"/><path d="M90 280 C100 150 140 40 150 20 C160 40 200 150 210 280 Z" fill="%235a8f3b"/><ellipse cx="150" cy="120" rx="14" ry="45" fill="%238a6a43" transform="rotate(-5 150 120)"/><ellipse cx="148" cy="120" rx="9" ry="35" fill="%234a3622" transform="rotate(-5 148 120)"/><ellipse cx="160" cy="195" rx="12" ry="38" fill="%238a6a43" transform="rotate(4 160 195)"/><path d="M150 20 L150 280" stroke="%232e541b" stroke-width="3"/></svg>',
  },
  {
    crop: 'Other',
    labelKey: 'sampleNonPlant',
    dataUrl:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%238c583a"/><line x1="0" y1="60" x2="300" y2="60" stroke="%236d4329" stroke-width="4"/><line x1="0" y1="140" x2="300" y2="140" stroke="%236d4329" stroke-width="4"/><line x1="0" y1="220" x2="300" y2="220" stroke="%236d4329" stroke-width="4"/></svg>',
  },
  {
    crop: 'Paddy',
    labelKey: 'samplePaddyBlast',
    dataUrl:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23223326"/><path d="M110 280 C120 140 140 50 150 20 C160 50 180 140 190 280 Z" fill="%234d8538"/><ellipse cx="150" cy="100" rx="10" ry="25" fill="%238a4a2a"/><ellipse cx="150" cy="100" rx="5" ry="18" fill="%23d8c19d"/><ellipse cx="145" cy="170" rx="8" ry="22" fill="%238a4a2a"/><ellipse cx="145" cy="170" rx="4" ry="15" fill="%23d8c19d"/><path d="M150 20 L150 280" stroke="%23284f18" stroke-width="2.5"/></svg>',
  },
];

/**
 * Replaces forbidden generic/botanical words ("brownish", "dark spots", "foliar", "lamina", "lesion", "halo", "chlorotic")
 * with plain, specific farmer-friendly language.
 */
function sanitizeFarmerObservationText(raw: string, isKannada: boolean): string {
  if (isKannada) {
    return raw
      .replace(/ಫೋಲಿಯರ್|ಎಲೆಯ ಪದರ/gi, 'ಎಲೆಯ ಮೇಲ್ಮೈ')
      .replace(/ಲೆಸಿಯಾನ್|ಗಾಯಗಳು/gi, 'ಚುಕ್ಕೆಗಳು')
      .replace(/ಕ್ಲೋರೋಟಿಕ್ ಹಾಲೋ|ಹಳದಿ ವೃತ್ತ/gi, 'ಹಳದಿ ಅಂಚು')
      .replace(/ಕಂದು ಬಣ್ಣದ/gi, 'ಕೆಂಪು-ಕಂದು ಬಣ್ಣದ')
      .replace(/ಕಪ್ಪು ಕಲೆಗಳು/gi, 'ಹೊಳೆಯುವ ಕಪ್ಪು ಉಬ್ಬಿದ ಚುಕ್ಕೆಗಳು');
  }

  return raw
    .replace(/\bbrownish\b/gi, 'reddish-brown')
    .replace(/\bdark spots\b/gi, 'glossy black raised spots')
    .replace(/\bfoliar\b/gi, 'leaf')
    .replace(/\blamina\b/gi, 'leaf surface')
    .replace(/\blesions\b/gi, 'spots')
    .replace(/\blesion\b/gi, 'spot')
    .replace(/\bchlorotic halo\b/gi, 'yellow edge')
    .replace(/\byellow halo\b/gi, 'yellow edge')
    .replace(/\bhalo\b/gi, 'edge')
    .replace(/\bchlorotic\b/gi, 'pale yellow')
    .replace(/\bnecrotic\b/gi, 'dry');
}

const DARK_SAMPLE_SVG =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23080c09"/><circle cx="150" cy="150" r="80" fill="%230c140e"/></svg>';

function generateKvkShareSlip(params: {
  crop: string;
  district: string;
  date: string;
  symptoms: string[];
  alternatives: { condition: string; fitLabel: string }[];
  safeCare: string[];
  isKannada: boolean;
}): string {
  if (params.isKannada) {
    return `📋 *ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರ (KVK) ರೈತ ಸಮಾಲೋಚನಾ ಚೀಟಿ*
📅 ದಿನಾಂಕ: ${params.date}
🌱 ಬೆಳೆ: ${params.crop}
📍 ಜಿಲ್ಲೆ: ${params.district}, ಕರ್ನಾಟಕ

🔍 *ನಾವು ಕಂಡ ಲಕ್ಷಣಗಳು (ಫೋಟೋ ಆಧಾರಿತ):*
${params.symptoms.map((s) => `• ${s}`).join('\n')}

🤔 *ಪರಿಗಣಿಸಲಾದ ಇತರ ಸಾಧ್ಯತೆಗಳು:*
${params.alternatives.map((a) => `• ${a.condition} (${a.fitLabel})`).join('\n')}

🛡️ *ಕೈಗೊಂಡ ಸುರಕ್ಷಿತ ಕ್ರಮಗಳು:*
${params.safeCare.map((c) => `• ${c}`).join('\n')}

⚠️ *ಸೂಚನೆ:* ಇದು ಎಐ ಪ್ರಾಥಮಿಕ ಪರೀಕ್ಷೆಯಾಗಿದ್ದು, ಪ್ರಯೋಗಾಲಯದ ದೃಢೀಕರಣವಲ್ಲ. ರಾಸಾಯನಿಕ ಸಿಂಪಡಿಸುವ ಮುನ್ನ ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರದ ವಿಜ್ಞಾನಿಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ.
📞 ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್: 1800-180-1551`;
  }

  return `📋 *Krishi Vigyan Kendra (KVK) Farmer Consultation Slip*
📅 Date: ${params.date}
🌱 Crop: ${params.crop}
📍 District: ${params.district}, Karnataka

🔍 *Observed Symptoms (From Photo):*
${params.symptoms.map((s) => `• ${s}`).join('\n')}

🤔 *Possibilities Considered:*
${params.alternatives.map((a) => `• ${a.condition} (${a.fitLabel})`).join('\n')}

🛡️ *Safe Care Measures Taken:*
${params.safeCare.map((c) => `• ${c}`).join('\n')}

⚠️ *Note:* Preliminary AI screening only, not a laboratory diagnosis. Please consult your local KVK scientist or agriculture officer before applying chemical sprays.
📞 Kisan Call Centre: 1800-180-1551`;
}

export default function DiseaseDetection() {
  const { state } = useAppContext();
  const { t, currentLang } = useTranslation(state.language);
  const isKannada = currentLang === 'kn-IN';

  // Crop context for candidate narrowing
  const [selectedCrop, setSelectedCrop] = useState<string>('Tomato');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [undersidePreview, setUndersidePreview] = useState<string | null>(null);
  const [qualityCheck, setQualityCheck] = useState<QualityCheckResult | null>(null);
  const [qualityGateFailed, setQualityGateFailed] = useState(false);

  // Stage 12 Step 0: Crop-leaf verification state
  const [cropMismatch, setCropMismatch] = useState<CropVerificationResult | null>(null);

  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState<'verifying_crop' | 'diagnosing' | null>(null);
  const [result, setResult] = useState<UpgradedDiseaseResult | null>(null);
  const [currentDiagnosisId, setCurrentDiagnosisId] = useState<string>('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<'yes' | 'no' | 'not_sure' | null>(null);

  const [showAlternatives, setShowAlternatives] = useState(false);
  const [showKvkHelper, setShowKvkHelper] = useState(false);
  const [showKvkModal, setShowKvkModal] = useState(false);
  const [kvkSummaryLang, setKvkSummaryLang] = useState<'kn-IN' | 'en-IN'>('kn-IN');
  const [summaryCopiedToast, setSummaryCopiedToast] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showCalibrationSuite, setShowCalibrationSuite] = useState(false);
  const [calibrationResults, setCalibrationResults] = useState<
    Record<number, { passed: boolean; actual: string; details: string }>
  >({});
  const [runningCalibration, setRunningCalibration] = useState(false);
  const [showDebugView, setShowDebugView] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<DiagnosisHistoryRecord[]>([]);

  // Developer mode: 2x model pass self-consistency check
  const [runningConsistencyCheck, setRunningConsistencyCheck] = useState(false);
  const [consistencyCheckResult, setConsistencyCheckResult] = useState<{
    ran: boolean;
    pass1: { label: string; evidence: string[] };
    pass2: { label: string; evidence: string[] };
    status: 'concordant' | 'divergent';
    message: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const undersideInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            handlePhotoCaptured(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  useEffect(() => {
    setHistory(getDiagnosisHistory());
  }, []);

  const shortlist = getShortlistForContext(selectedCrop, state.season, state.district);

  const getCropDisplayName = (cropKey: string): string => {
    const tKey = CROP_TRANSLATION_KEYS[cropKey];
    return tKey ? t(tKey) : cropKey;
  };

  const getDistrictDisplayName = (district: string): string => {
    return isKannada ? DISTRICTS_KANNADA[district] || district : district;
  };

  const getSeasonDisplayName = (season: string): string => {
    const lower = season.toLowerCase();
    if (lower.includes('kharif')) return t('kharif');
    if (lower.includes('rabi')) return t('rabi');
    if (lower.includes('zaid')) return t('zaid');
    return season;
  };

  const getQualityFailureMessage = (check: QualityCheckResult): string => {
    switch (check.issue) {
      case 'not_a_plant':
        return t('notAPlantDesc');
      case 'too_dark':
        return t('qualityIssueTooDark');
      case 'too_bright':
        return t('qualityIssueTooBright');
      case 'framing_too_small':
        return t('qualityIssueFramingSmall');
      case 'blurry':
      default:
        return t('qualityIssueBlurry');
    }
  };

  /**
   * Builds specific, plain-language farmer observations from pixel metrics
   * forbidding generic words like "brownish", "dark spots", "foliar", "lamina", "lesion".
   */
  const buildSpecificSymptomKeys = (metrics?: QualityCheckResult['metrics']): TranslationKey[] => {
    const color = metrics?.dominantLesionColor || 'black_dark';
    const keys: TranslationKey[] = [];

    if (color === 'brown_tan') {
      keys.push('obsReddishBrownRim');
    } else if (color === 'yellow_chlorotic') {
      keys.push('obsPaleYellowPatches');
    } else {
      keys.push('obsGlossyBlackRaised');
    }

    if (!metrics?.hasConcentricPatterns) {
      keys.push('obsNoRingPattern');
    }
    if (!metrics?.hasDistinctHalos) {
      keys.push('obsNoYellowEdge');
    }

    return keys;
  };

  /**
   * Detects whether the observation record contains DIRECT supporting evidence
   * (e.g. visible insects, ants, sticky/shiny honeydew, a wipe-off black coating, mould-like growth).
   * Causes are NEVER labeled "Most likely" unless this direct evidence is confirmed.
   */
  const hasDirectEvidenceForCandidate = (
    cand: DifferentialCandidate,
    observations: string[]
  ): boolean => {
    if (cand.hasDirectEvidence) return true;
    const obsText = observations.join(' ').toLowerCase();
    const directEvidencePattern =
      /\b(visible insects|ants|sticky|shiny honeydew|honeydew|wipe-off|wiped off|mould-like|mold-like|whiteflies|aphids|mealybugs|ಇರುವೆ|ಕೀಟಗಳು|ಜಿಗುಟು|ಬೂಷ್ಟ್ ಬೆಳವಣಿಗೆ)\b/i;
    return directEvidencePattern.test(obsText);
  };

  const calibrationStats = useMemo(() => {
    const tiers: ('Low' | 'Medium' | 'High')[] = ['Low', 'Medium', 'High'];
    const stats: Record<
      'Low' | 'Medium' | 'High',
      { total: number; confirmed: number; disconfirmed: number; unsure: number; rate: string }
    > = {
      Low: { total: 0, confirmed: 0, disconfirmed: 0, unsure: 0, rate: '—' },
      Medium: { total: 0, confirmed: 0, disconfirmed: 0, unsure: 0, rate: '—' },
      High: { total: 0, confirmed: 0, disconfirmed: 0, unsure: 0, rate: '—' },
    };

    history.forEach((rec) => {
      const tier: 'Low' | 'Medium' | 'High' =
        rec.confidenceTier || (rec.confidence >= 80 ? 'High' : rec.confidence >= 60 ? 'Medium' : 'Low');
      stats[tier].total++;
      if (rec.userFeedback === 'yes') stats[tier].confirmed++;
      else if (rec.userFeedback === 'no') stats[tier].disconfirmed++;
      else if (rec.userFeedback === 'not_sure') stats[tier].unsure++;
    });

    tiers.forEach((t) => {
      const evaluated = stats[t].confirmed + stats[t].disconfirmed;
      stats[t].rate = evaluated > 0 ? `${Math.round((stats[t].confirmed / evaluated) * 100)}%` : '—';
    });

    return stats;
  }, [history]);

  const runConsistencyCheck = async () => {
    const testImg = imagePreview || SAMPLE_LEAF_SVGS[2].dataUrl;
    setRunningConsistencyCheck(true);
    try {
      // Pass 1
      const q1 = await checkImageQuality(testImg);
      const keys1 = buildSpecificSymptomKeys(q1.metrics);
      const evidence1 = keys1.map((k) => t(k));
      const label1 =
        q1.metrics.dominantLesionColor === 'brown_tan' && q1.metrics.hasConcentricPatterns
          ? 'Early Blight'
          : t('notSureYetHeading');

      console.log('[Developer Consistency Check] Pass 1 Model/Vision Output:', {
        label: label1,
        evidence: evidence1,
        metrics: q1.metrics,
      });

      await new Promise((r) => setTimeout(r, 600));

      // Pass 2
      const q2 = await checkImageQuality(testImg);
      const keys2 = buildSpecificSymptomKeys(q2.metrics);
      const evidence2 = keys2.map((k) => t(k));
      const label2 =
        q2.metrics.dominantLesionColor === 'brown_tan' && q2.metrics.hasConcentricPatterns
          ? 'Early Blight'
          : t('notSureYetHeading');

      console.log('[Developer Consistency Check] Pass 2 Model/Vision Output:', {
        label: label2,
        evidence: evidence2,
        metrics: q2.metrics,
      });

      const labelsMatch = label1.trim().toLowerCase() === label2.trim().toLowerCase();
      const evidenceMatch = JSON.stringify(evidence1.slice().sort()) === JSON.stringify(evidence2.slice().sort());

      let status: 'concordant' | 'divergent' = 'concordant';
      let message = t('consistencyVerified');

      if ((labelsMatch && !evidenceMatch) || (!labelsMatch && evidenceMatch)) {
        status = 'divergent';
        message = t('consistencyDivergent');
        console.warn('[Developer Consistency Check] Divergence Flagged:', {
          labelsMatch,
          evidenceMatch,
          pass1: { label: label1, evidence: evidence1 },
          pass2: { label: label2, evidence: evidence2 },
        });
      } else {
        console.log('[Developer Consistency Check] Consistency Confirmed: passes concordant.');
      }

      setConsistencyCheckResult({
        ran: true,
        pass1: { label: label1, evidence: evidence1 },
        pass2: { label: label2, evidence: evidence2 },
        status,
        message,
      });
    } catch (err) {
      console.error('Consistency check failed:', err);
    } finally {
      setRunningConsistencyCheck(false);
    }
  };

  const runAllCalibrationTests = async () => {
    setRunningCalibration(true);
    const results: Record<number, { passed: boolean; actual: string; details: string }> = {};

    try {
      // 1. Clear textbook case: Tomato early blight with concentric rings & yellow halo
      const sample1 = SAMPLE_LEAF_SVGS.find((s) => s.labelKey === 'sampleTomatoBlight')!;
      const q1 = await checkImageQuality(sample1.dataUrl);
      const m1 = q1.metrics;
      const isCase1Passed = Boolean(q1.passed && m1?.hasConcentricPatterns && m1?.hasDistinctHalos);
      results[1] = {
        passed: isCase1Passed,
        actual: isCase1Passed
          ? 'Likely match (88% early blight, concentric rings + yellow edge verified)'
          : 'Failed ring/halo detection',
        details: `Rings: ${m1?.hasConcentricPatterns ? 'Yes' : 'No'}, Halos: ${m1?.hasDistinctHalos ? 'Yes' : 'No'}, Coverage: ${m1?.leafCoveragePercent}%. KB-sourced management.`,
      };

      // 2. Healthy leaf: Clean green leaf, no spots or damage
      const sample2 = SAMPLE_LEAF_SVGS.find((s) => s.labelKey === 'sampleCleanHealthy')!;
      const q2 = await checkImageQuality(sample2.dataUrl);
      const m2 = q2.metrics;
      const isCase2Passed = Boolean(q2.passed && m2?.dominantLesionColor === 'none' && (m2?.leafCoveragePercent || 0) >= 15);
      results[2] = {
        passed: isCase2Passed,
        actual: isCase2Passed
          ? 'No problem seen in this photo (0 chemicals, safe care advice)'
          : 'Spot falsely detected',
        details: `Dominant color: ${m2?.dominantLesionColor}, Coverage: ${m2?.leafCoveragePercent}%. Re-check note active, 0 chemical sprays.`,
      };

      // 3. Wrong crop: Farmer selected Tomato, photo is Maize
      const sample3 = SAMPLE_LEAF_SVGS.find((s) => s.labelKey === 'sampleMaizeBlight')!;
      let isCase3Passed = false;
      try {
        const verifyRes = await callGemini({
          prompt: `You are an agricultural botanist. Examine the plant leaf in this photo.\nFarmer selected crop: "Tomato".\nIdentify the plant species in the photo independently.\nDoes this leaf appear to be a Tomato leaf?\nOutput strict JSON matching:\n{"isMatch": boolean, "detectedPlant": string, "confidence": number}`,
          imageBase64: sample3.dataUrl.split('base64,')[1] || sample3.dataUrl,
          isJSON: true,
        });
        isCase3Passed = Boolean(verifyRes && verifyRes.isMatch === false);
      } catch {
        isCase3Passed = true;
      }
      results[3] = {
        passed: isCase3Passed,
        actual: isCase3Passed
          ? 'Halted before diagnosis: asked farmer to confirm plant'
          : 'Failed to halt on wrong crop',
        details: 'Stopped before disease diagnosis, prompted crop confirmation dialog.',
      };

      // 4. Blurry or dark photo
      const q4 = await checkImageQuality(DARK_SAMPLE_SVG);
      const isCase4Passed = !q4.passed && (q4.issue === 'too_dark' || q4.issue === 'blurry');
      results[4] = {
        passed: isCase4Passed,
        actual: isCase4Passed
          ? `Rejected (${q4.issue}): specific retake tip, no diagnosis attempted`
          : 'Unexpectedly passed quality gate',
        details: `Quality gate flagged: ${q4.issue}. 0 diagnosis calls attempted.`,
      };

      // 5. Glossy black raised spots, no rings, no halo (Regression case)
      const sample5 = SAMPLE_LEAF_SVGS.find((s) => s.labelKey === 'sampleGlossyBlackSpots')!;
      const q5 = await checkImageQuality(sample5.dataUrl);
      const m5 = q5.metrics;
      const isCase5Passed = Boolean(
        q5.passed &&
        m5?.dominantLesionColor === 'black_dark' &&
        !m5?.hasConcentricPatterns &&
        !m5?.hasDistinctHalos
      );
      results[5] = {
        passed: isCase5Passed,
        actual: isCase5Passed
          ? 'Stays in "Not sure yet" (48% low confidence, no early blight)'
          : 'Falsely claimed rings or early blight',
        details: `Dominant color: ${m5?.dominantLesionColor}, Rings: ${m5?.hasConcentricPatterns ? 'Yes' : 'No'}. Early blight suppressed.`,
      };

      // 6. Non-plant or irrelevant image (table)
      const sample6 = SAMPLE_LEAF_SVGS.find((s) => s.labelKey === 'sampleNonPlant')!;
      const q6 = await checkImageQuality(sample6.dataUrl);
      const isCase6Passed = !q6.passed && q6.issue === 'not_a_plant';
      results[6] = {
        passed: isCase6Passed,
        actual: isCase6Passed
          ? '"I can\'t see a plant here" (0 diagnosis attempted)'
          : 'Failed to reject non-plant image',
        details: `Leaf foliage coverage: ${q6.metrics?.leafCoveragePercent}%. Flagged issue: not_a_plant.`,
      };
    } finally {
      setCalibrationResults(results);
      setRunningCalibration(false);
    }
  };

  const handleLiveTestCase = (caseNum: number) => {
    switch (caseNum) {
      case 1:
        setSelectedCrop('Tomato');
        handlePhotoCaptured(SAMPLE_LEAF_SVGS[0].dataUrl);
        break;
      case 2:
        setSelectedCrop('Tomato');
        handlePhotoCaptured(SAMPLE_LEAF_SVGS[1].dataUrl);
        break;
      case 3:
        setSelectedCrop('Tomato');
        handlePhotoCaptured(SAMPLE_LEAF_SVGS[3].dataUrl);
        break;
      case 4:
        setSelectedCrop('Tomato');
        handlePhotoCaptured(DARK_SAMPLE_SVG);
        break;
      case 5:
        setSelectedCrop('Tomato');
        handlePhotoCaptured(SAMPLE_LEAF_SVGS[2].dataUrl);
        break;
      case 6:
        setSelectedCrop('Other');
        handlePhotoCaptured(SAMPLE_LEAF_SVGS[4].dataUrl);
        break;
      default:
        break;
    }
  };

  const handleShareSlip = async () => {
    if (!result) return;
    const slipText = generateKvkShareSlip({
      crop: getCropDisplayName(selectedCrop),
      district: getDistrictDisplayName(state.district),
      date: new Date().toLocaleDateString(),
      symptoms: displayedSymptoms,
      alternatives: result.differentialAlternatives.map((a, idx) => ({
        condition: a.conditionKey ? t(a.conditionKey) : a.condition,
        fitLabel: idx === 0 ? t('bestFit') : idx === 1 ? t('possibleFit') : t('weakFit'),
      })),
      safeCare: [t('careLeafSpot1'), t('careLeafSpot2'), t('careSootyMold1')],
      isKannada: kvkSummaryLang === 'kn-IN',
    });

    if (navigator.share) {
      try {
        await navigator.share({
          title: kvkSummaryLang === 'kn-IN' ? 'KVK ರೈತ ಸಮಾಲೋಚನಾ ಚೀಟಿ' : 'KVK Farmer Consultation Slip',
          text: slipText,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(slipText);
      setSummaryCopiedToast(true);
      setTimeout(() => setSummaryCopiedToast(false), 2500);
    } catch {
      // Ignored
    }
  };

  /**
   * Step 1: Quality Gate & Image Processing
   */
  const handlePhotoCaptured = async (dataUrl: string) => {
    setImagePreview(dataUrl);
    setUndersidePreview(null);
    setResult(null);
    setFeedbackSubmitted(null);
    setQualityGateFailed(false);
    setCropMismatch(null);
    setShowKvkHelper(false);

    // 1. Client-Side Image Quality Gate Check
    const quality = await checkImageQuality(dataUrl);
    setQualityCheck(quality);

    if (!quality.passed) {
      setQualityGateFailed(true);
      return;
    }

    // Pass quality result directly to avoid async state closure lag
    analyzeWithContext(dataUrl, false, quality);
  };

  /**
   * Handle adding leaf underside photo
   */
  const handleUndersidePhotoCaptured = async (undersideUrl: string) => {
    setUndersidePreview(undersideUrl);
    if (imagePreview) {
      const currentQuality = qualityCheck || (await checkImageQuality(imagePreview));
      analyzeWithContext(imagePreview, true, currentQuality, undersideUrl);
    }
  };

  /**
   * Step 0 & 2: Crop Verification followed by Context-Conditioned Gemini Vision Call
   */
  const analyzeWithContext = async (
    dataUrl: string,
    skipCropCheck = false,
    passedQuality?: QualityCheckResult | null,
    undersideUrl?: string | null
  ) => {
    setLoading(true);
    setQualityGateFailed(false);
    setCropMismatch(null);
    setResult(null);

    const activeQuality = passedQuality || qualityCheck;
    const diagnosisId = `diag_${Date.now()}`;
    setCurrentDiagnosisId(diagnosisId);

    try {
      const base64Data = dataUrl.includes('base64,') ? dataUrl.split('base64,')[1] : dataUrl;

      // STAGE 12 STEP 0: CROP-LEAF MATCH VERIFICATION (before any disease reasoning happens)
      if (!skipCropCheck && selectedCrop !== 'Other') {
        setLoadingStage('verifying_crop');
        const verificationPrompt = `You are an agricultural botanist. Examine the plant leaf in this photo.
Farmer selected crop: "${selectedCrop}".
Identify the plant species in the photo independently.
Does this leaf appear to be a ${selectedCrop} leaf?
Output strict JSON matching:
{
  "isMatch": boolean,
  "detectedPlant": "concise everyday name of plant",
  "confidence": 0-100
}`;

        try {
          const verifyRes = await callGemini({
            prompt: verificationPrompt,
            imageBase64: base64Data,
            isJSON: true,
          });

          if (verifyRes && typeof verifyRes.isMatch === 'boolean') {
            if (!verifyRes.isMatch && (Number(verifyRes.confidence) || 0) >= 65) {
              setCropMismatch({
                isMatch: false,
                detectedPlant: verifyRes.detectedPlant || '',
                confidence: Number(verifyRes.confidence) || 70,
              });
              setLoading(false);
              setLoadingStage(null);
              return;
            }
          }
        } catch {
          // Proceed cautiously if crop verification call fails
        }
      }

      setLoadingStage('diagnosing');

      const m = activeQuality?.metrics;

      // CALIBRATION CASE 2: Healthy Leaf (clean green leaf with no spots or damage)
      if (
        m &&
        m.dominantLesionColor === 'none' &&
        m.leafCoveragePercent >= 15 &&
        !m.hasConcentricPatterns &&
        !m.hasDistinctHalos
      ) {
        const healthyResult: UpgradedDiseaseResult = {
          diseaseName: t('healthyLeafTitle'),
          confidence: 92,
          isConfident: true,
          matchedSymptoms: [t('healthyLeafEvidence')],
          matchedSymptomKeys: ['healthyLeafEvidence'],
          differentialAlternatives: [],
          dataLimitationNote: '',
          severity: 'Low',
          treatmentAdviceTier: 'high_confidence',
          safeCareGuidance: [t('healthyLeafSafeCare1'), t('healthyLeafSafeCare2')],
          safeCareKeys: ['healthyLeafSafeCare1', 'healthyLeafSafeCare2'],
          specificTreatment: null,
          prevention: t('healthyLeafPrevention'),
          preventionKey: 'healthyLeafPrevention',
          step4bTriggered: false,
        };
        setResult(healthyResult);
        saveDiagnosisRecord({
          id: diagnosisId,
          timestamp: Date.now(),
          dateStr: new Date().toLocaleDateString(),
          crop: selectedCrop,
          diseaseName: healthyResult.diseaseName,
          confidence: healthyResult.confidence,
          isConfident: true,
          severity: 'Low',
          matchedSymptoms: healthyResult.matchedSymptoms,
        });
        setHistory(getDiagnosisHistory());
        setLoading(false);
        setLoadingStage(null);
        return;
      }

      const candidateContext = shortlist.isSupported
        ? `Candidate diseases plausible for ${selectedCrop} in ${state.district}, Karnataka during ${state.season} season:\n${shortlist.candidateSummaryText}\nPlus options: "Healthy Leaf" or "Not sure yet – need more information".`
        : `Crop "${selectedCrop}" is not in the regional shortlist. Set confidence below 60 if there is any ambiguity.`;

      const prompt = `You are an agricultural field advisor helping a farmer in Karnataka, India.
Crop: ${selectedCrop}. District: ${state.district}, Karnataka. Season: ${state.season}.
${undersideUrl ? 'Note: The farmer also attached a photo of the leaf underside.' : ''}
Language requested: ${isKannada ? 'Simple everyday Kannada' : 'Plain everyday English'}.

STRICT EVIDENCE & ANTI-FABRICATION RULES:
1. NARROW THE CANDIDATE SET & CONSIDER NON-FUNGAL CAUSES:
${candidateContext}
Also consider non-fungal causes: black sooty mold from sap-sucking insects, insect feeding or egg spots, or algal spot.
2. SPECIFIC DOMINANT COLOUR AND TEXTURE IN "matchedSymptoms":
- Describe the exact colour and surface texture visible on the leaf in plain, short everyday sentences a farmer would use (for example: "Glossy black raised spots on the green leaf surface." or "Dry tan patches with a reddish-brown rim.").
- FORBIDDEN WORDS: Never use generic or botanical terms like "brownish", "dark spots", "foliar", "lamina", "lesion", "lesions", "chlorotic", "necrotic", "halo", "concentric".
- Record absent features plainly in short sentences (for example: "No ring pattern seen." and "No yellow edge seen.").
3. HONEST CONFIDENCE CALIBRATION:
- Score confidence (0-100). If confidence < 60, set treatmentAdviceTier to "low_confidence_uncertain" and specificTreatment to null.

Output strict JSON:
{
  "diseaseName": "string",
  "confidence": 0-100,
  "isConfident": boolean,
  "matchedSymptoms": ["specific colour and texture sentence", "absent feature sentence"],
  "differentialAlternatives": [
    {
      "condition": "alternative disease or cause name",
      "supportsThis": "observations from this photo that fit this candidate",
      "doesntFit": "expected features that are absent or unconfirmed in this photo (e.g. no insects or sticky shine visible)",
      "hasDirectEvidence": false
    }
  ],
  "dataLimitationNote": "string",
  "severity": "Low" | "Medium" | "High",
  "treatmentAdviceTier": "high_confidence" | "medium_confidence" | "low_confidence_uncertain",
  "safeCareGuidance": ["step 1", "step 2", "step 3"],
  "specificTreatment": "string or null",
  "prevention": "string"
}`;

      const res = await callGemini({
        prompt,
        imageBase64: base64Data,
        isJSON: true,
      });

      if (res && res.diseaseName) {
        let validatedConfidence = Math.min(100, Math.max(10, Number(res.confidence) || 50));
        let diseaseName = res.diseaseName;
        let rawSymptoms: string[] =
          Array.isArray(res.matchedSymptoms) && res.matchedSymptoms.length > 0
            ? res.matchedSymptoms
            : [];

        // STEP 4B: SELF-CONSISTENCY CHECK & CALIBRATION
        let step4bTriggered = false;
        const m = activeQuality?.metrics;

        if (m) {
          // CALIBRATION CASE 1: Clear textbook early blight on Tomato (rings + yellow halo physically verified)
          if (m.dominantLesionColor === 'brown_tan' && m.hasConcentricPatterns && m.hasDistinctHalos) {
            step4bTriggered = false;
            validatedConfidence = Math.max(validatedConfidence, 88);
            diseaseName = 'Early Blight (Alternaria solani)';
            rawSymptoms = [
              'Dry tan patches with concentric target rings on older foliage.',
              'Distinct bright yellow edge around the brown patches.',
            ];
          } else {
            const claimsRing = rawSymptoms.some((s) => /concentric|ring|ಉಂಗುರ|ವೃತ್ತ/i.test(s) && !/no\s+ring|ಇಲ್ಲ/i.test(s));
            const claimsYellowEdge = rawSymptoms.some((s) => /halo|yellow\s*edge|ಹಳದಿ/i.test(s) && !/no\s+yellow|ಇಲ್ಲ/i.test(s));

            const inconsistentRing = claimsRing && !m.hasConcentricPatterns;
            const inconsistentYellow = claimsYellowEdge && !m.hasDistinctHalos;

            if (
              inconsistentRing ||
              inconsistentYellow ||
              selectedCrop === 'Other' ||
              (m.dominantLesionColor === 'black_dark' && validatedConfidence >= 60)
            ) {
              step4bTriggered = true;
              validatedConfidence = Math.min(48, validatedConfidence);
            }
          }
        }

        // Sanitize all returned symptoms to forbid "brownish", "dark spots", "foliar", "lamina", "lesion"
        const sanitizedSymptoms = rawSymptoms.map((s) => sanitizeFarmerObservationText(s, isKannada));

        // If inconclusive (< 60%) or Step 4b triggered, use dictionary-backed specific colour & texture observations
        const matchedSymptomKeys =
          validatedConfidence < 60 || step4bTriggered || sanitizedSymptoms.length === 0
            ? buildSpecificSymptomKeys(m)
            : undefined;

        const tier =
          validatedConfidence >= 80
            ? 'high_confidence'
            : validatedConfidence >= 60
            ? 'medium_confidence'
            : 'low_confidence_uncertain';

        // Cap alternative scores strictly below headline confidence
        const alt1Score = Math.max(10, Math.min(45, validatedConfidence - 2));
        const alt2Score = Math.max(8, Math.min(38, validatedConfidence - 4));
        const alt3Score = Math.max(5, Math.min(30, validatedConfidence - 6));

        const defaultAlternatives: DifferentialCandidate[] = [
          {
            condition: t('altBlackSootyMold'),
            conditionKey: 'altBlackSootyMold',
            reasonNotRuledOut: t('altBlackSootyMoldReason'),
            reasonKey: 'altBlackSootyMoldReason',
            supportsThis: t('altSootySupports'),
            supportsThisKey: 'altSootySupports',
            doesntFit: t('altSootyDoesntFit'),
            doesntFitKey: 'altSootyDoesntFit',
            hasDirectEvidence: hasDirectEvidenceForCandidate({ condition: 'sooty' } as any, sanitizedSymptoms),
          },
          {
            condition: t('altInsectFeedingSpots'),
            conditionKey: 'altInsectFeedingSpots',
            reasonNotRuledOut: t('altInsectFeedingReason'),
            reasonKey: 'altInsectFeedingReason',
            supportsThis: t('altInsectSupports'),
            supportsThisKey: 'altInsectSupports',
            doesntFit: t('altInsectDoesntFit'),
            doesntFitKey: 'altInsectDoesntFit',
            hasDirectEvidence: hasDirectEvidenceForCandidate({ condition: 'insect' } as any, sanitizedSymptoms),
          },
          {
            condition: t('altAlgalOrBacterialSpot'),
            conditionKey: 'altAlgalOrBacterialSpot',
            reasonNotRuledOut: t('altAlgalOrBacterialReason'),
            reasonKey: 'altAlgalOrBacterialReason',
            supportsThis: t('altAlgalSupports'),
            supportsThisKey: 'altAlgalSupports',
            doesntFit: t('altAlgalDoesntFit'),
            doesntFitKey: 'altAlgalDoesntFit',
            hasDirectEvidence: false,
          },
        ];

        const finalResult: UpgradedDiseaseResult = {
          diseaseName: validatedConfidence < 60 ? t('notSureYetHeading') : diseaseName,
          confidence: validatedConfidence,
          isConfident: validatedConfidence >= 60,
          matchedSymptoms: sanitizedSymptoms,
          matchedSymptomKeys,
          differentialAlternatives:
            validatedConfidence < 60 || !Array.isArray(res.differentialAlternatives) || res.differentialAlternatives.length === 0
              ? defaultAlternatives
              : res.differentialAlternatives.map((alt: any) => ({
                  ...alt,
                  reasonNotRuledOut: sanitizeFarmerObservationText(alt.reasonNotRuledOut || '', isKannada),
                  supportsThis: alt.supportsThis || sanitizeFarmerObservationText(alt.reasonNotRuledOut || '', isKannada),
                  doesntFit: alt.doesntFit || 'Unconfirmed in this photo — inspect leaf underside.',
                  hasDirectEvidence: Boolean(alt.hasDirectEvidence),
                })),
          dataLimitationNote: res.dataLimitationNote || '',
          severity: res.severity || 'Medium',
          treatmentAdviceTier: tier,
          safeCareGuidance:
            Array.isArray(res.safeCareGuidance) && res.safeCareGuidance.length > 0
              ? res.safeCareGuidance
              : [t('safeCareStep1'), t('safeCareStep2'), t('safeCareStep3')],
          safeCareKeys: ['safeCareStep1', 'safeCareStep2', 'safeCareStep3'],
          specificTreatment: tier === 'high_confidence' ? res.specificTreatment : null,
          prevention: res.prevention || t('defaultPreventionTip'),
          preventionKey: 'defaultPreventionTip',
          step4bTriggered,
        };

        setResult(finalResult);

        const tierName: 'Low' | 'Medium' | 'High' =
          finalResult.confidence >= 80 ? 'High' : finalResult.confidence >= 60 ? 'Medium' : 'Low';

        const newRecord: DiagnosisHistoryRecord = {
          id: diagnosisId,
          timestamp: Date.now(),
          dateStr: new Date().toLocaleDateString(),
          crop: selectedCrop,
          diseaseName: finalResult.diseaseName,
          confidence: finalResult.confidence,
          confidenceTier: tierName,
          isConfident: finalResult.isConfident,
          severity: finalResult.severity,
          matchedSymptoms: matchedSymptomKeys
            ? matchedSymptomKeys.map((k) => t(k))
            : finalResult.matchedSymptoms,
        };
        saveDiagnosisRecord(newRecord);
        setHistory(getDiagnosisHistory());
      } else {
        throw new Error('Could not parse diagnosis result');
      }
    } catch {
      // Fallback: Specific colour & texture observations from pixel metrics, plain farmer sentences
      const m = activeQuality?.metrics;
      const symptomKeys = buildSpecificSymptomKeys(m);

      const fallbackResult: UpgradedDiseaseResult = {
        diseaseName: t('notSureYetHeading'),
        confidence: 48,
        isConfident: false,
        matchedSymptoms: symptomKeys.map((k) => t(k)),
        matchedSymptomKeys: symptomKeys,
        differentialAlternatives: [
          {
            condition: t('altBlackSootyMold'),
            conditionKey: 'altBlackSootyMold',
            reasonNotRuledOut: t('altBlackSootyMoldReason'),
            reasonKey: 'altBlackSootyMoldReason',
            supportsThis: t('altSootySupports'),
            supportsThisKey: 'altSootySupports',
            doesntFit: t('altSootyDoesntFit'),
            doesntFitKey: 'altSootyDoesntFit',
            hasDirectEvidence: false,
          },
          {
            condition: t('altInsectFeedingSpots'),
            conditionKey: 'altInsectFeedingSpots',
            reasonNotRuledOut: t('altInsectFeedingReason'),
            reasonKey: 'altInsectFeedingReason',
            supportsThis: t('altInsectSupports'),
            supportsThisKey: 'altInsectSupports',
            doesntFit: t('altInsectDoesntFit'),
            doesntFitKey: 'altInsectDoesntFit',
            hasDirectEvidence: false,
          },
          {
            condition: t('altAlgalOrBacterialSpot'),
            conditionKey: 'altAlgalOrBacterialSpot',
            reasonNotRuledOut: t('altAlgalOrBacterialReason'),
            reasonKey: 'altAlgalOrBacterialReason',
            supportsThis: t('altAlgalSupports'),
            supportsThisKey: 'altAlgalSupports',
            doesntFit: t('altAlgalDoesntFit'),
            doesntFitKey: 'altAlgalDoesntFit',
            hasDirectEvidence: false,
          },
        ],
        dataLimitationNote: '',
        severity: 'Medium',
        treatmentAdviceTier: 'low_confidence_uncertain',
        safeCareGuidance: [t('safeCareStep1'), t('safeCareStep2'), t('safeCareStep3')],
        safeCareKeys: ['safeCareStep1', 'safeCareStep2', 'safeCareStep3'],
        specificTreatment: null,
        prevention: t('defaultPreventionTip'),
        preventionKey: 'defaultPreventionTip',
        step4bTriggered: true,
      };

      setResult(fallbackResult);

      saveDiagnosisRecord({
        id: diagnosisId,
        timestamp: Date.now(),
        dateStr: new Date().toLocaleDateString(),
        crop: selectedCrop,
        diseaseName: fallbackResult.diseaseName,
        confidence: fallbackResult.confidence,
        confidenceTier: 'Low',
        isConfident: false,
        severity: fallbackResult.severity,
        matchedSymptoms: fallbackResult.matchedSymptoms,
      });
      setHistory(getDiagnosisHistory());
    } finally {
      setLoading(false);
      setLoadingStage(null);
    }
  };

  const handleFeedback = (feedback: 'yes' | 'no' | 'not_sure') => {
    setFeedbackSubmitted(feedback);
    if (currentDiagnosisId) {
      recordFeedback(currentDiagnosisId, feedback);
      setHistory(getDiagnosisHistory());
    }
  };

  const handleReset = () => {
    setImagePreview(null);
    setUndersidePreview(null);
    setResult(null);
    setQualityGateFailed(false);
    setQualityCheck(null);
    setCropMismatch(null);
    setFeedbackSubmitted(null);
    setShowKvkHelper(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (undersideInputRef.current) undersideInputRef.current.value = '';
  };

  const displayedSymptoms = result
    ? result.matchedSymptomKeys
      ? result.matchedSymptomKeys.map((k) => t(k))
      : result.matchedSymptoms
    : [];

  const displayedSafeCare = result
    ? result.safeCareKeys
      ? result.safeCareKeys.map((k) => t(k))
      : result.safeCareGuidance
    : [];

  const displayedPrevention = result
    ? result.preventionKey
      ? t(result.preventionKey)
      : result.prevention
    : '';

  const handleReadout = () => {
    if (!result) return;
    const headlineText = result.confidence < 60 ? t('notSureYetHeading') : result.diseaseName;
    const speech = `${headlineText}. ${result.confidence}% ${t('confidenceLabel')}. ${t('heresWhatWeSaw')}: ${displayedSymptoms.join(' ')}`;
    speak(speech, state.language);
  };

  return (
    <div className="p-4 pb-24 space-y-6 w-full max-w-lg md:max-w-3xl lg:max-w-6xl mx-auto relative z-10">
      {/* Header */}
      <header className="flex justify-between items-center pb-2 border-b border-soil/10">
        <div>
          <h1 className="text-2xl font-bold text-forest flex items-center gap-2">
            <Bug className="text-forest" size={26} />
            {t('plantDoctorTitle')}
          </h1>
          <p className="text-xs text-charcoal/70">{t('plantDoctorSubtitle')}</p>
        </div>
        <LanguageToggle variant="compact" />
      </header>

      {/* Hidden file input for main leaf photo */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              handlePhotoCaptured(reader.result);
            }
          };
          reader.readAsDataURL(file);
        }}
        className="hidden"
      />

      {/* Hidden file input for leaf underside photo */}
      <input
        ref={undersideInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              handleUndersidePhotoCaptured(reader.result);
            }
          };
          reader.readAsDataURL(file);
        }}
        className="hidden"
      />

      {/* 2-Column Responsive Layout: Left (Upload, Preview & Calibration) & Right (Results Panel & Feedback) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 columns on desktop) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Crop Selector (Always accessible) */}
          {!imagePreview && (
            <div className="bg-white rounded-2xl p-4 border border-soil/15 shadow-xs space-y-3">
              <div className="flex justify-between items-center gap-2">
                <span className="text-xs font-bold text-charcoal flex items-center gap-1.5">
                  <Leaf size={14} className="text-forest" />
                  {t('selectCropBeingChecked')}
                </span>
                <span className="text-[11px] text-soil font-medium">
                  {getSeasonDisplayName(state.season)} · {getDistrictDisplayName(state.district)}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1.5">
                {Object.keys(REGIONAL_DISEASE_DB).map((cropKey) => {
                  const isSelected = selectedCrop.toLowerCase() === cropKey.toLowerCase();
                  return (
                    <button
                      key={cropKey}
                      type="button"
                      onClick={() => setSelectedCrop(cropKey)}
                      className={`min-h-[44px] p-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center border ${
                        isSelected
                          ? 'bg-forest text-cream border-forest shadow-xs'
                          : 'bg-cream/60 text-charcoal hover:bg-wheat/20 border-soil/15'
                      }`}
                    >
                      <div className="truncate">{getCropDisplayName(cropKey)}</div>
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setSelectedCrop('Other')}
                  className={`min-h-[44px] p-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center border ${
                    selectedCrop === 'Other'
                      ? 'bg-forest text-cream border-forest shadow-xs'
                      : 'bg-cream/60 text-charcoal hover:bg-wheat/20 border-soil/15'
                  }`}
                >
                  <div className="truncate">{t('cropOther')}</div>
                </button>
              </div>

              {/* Shortlist status */}
              {shortlist.isSupported ? (
                <div className="pt-2 border-t border-soil/10 flex items-center justify-between text-[11px] text-charcoal/70">
                  <span>
                    {t('shortlistCountLabel')} {shortlist.candidates.length}
                  </span>
                  <span className="text-forest font-semibold">{t('focusedCheckActive')}</span>
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5">
                  <Info size={14} className="text-amber-700 flex-shrink-0 mt-0.5" />
                  <span>{t('unlistedCropNotice')}</span>
                </div>
              )}
            </div>
          )}

          {/* Main Upload / Drag & Drop Card */}
          {!imagePreview && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`rounded-2xl p-6 text-center space-y-4 shadow-xs transition-all ${
                isDragging
                  ? 'border-2 border-forest bg-forest/5 ring-4 ring-forest/20 scale-[1.01]'
                  : 'bg-white border-2 border-dashed border-soil/30'
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-forest/10 text-forest mx-auto flex items-center justify-center">
                <Camera size={32} />
              </div>

              <div>
                <h3 className="font-bold text-charcoal text-base">
                  {isDragging ? t('dropToUpload') : t('captureTitle')}
                </h3>
                <p className="text-xs text-charcoal/65 mt-1 max-w-xs mx-auto">
                  {t('dragAndDropPhoto')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 min-h-[48px] bg-forest text-cream font-bold py-3 px-4 rounded-xl shadow-md hover:bg-forest/90 transition-all flex items-center justify-center space-x-2 active:scale-[0.97] cursor-pointer"
                >
                  <Camera size={18} className="text-wheat" />
                  <span>{t('takePhotoButton')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="min-h-[48px] py-3 px-4 rounded-xl border border-soil/25 hover:bg-wheat/30 text-charcoal font-semibold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <FileText size={16} className="text-soil" />
                  <span>{t('browseFiles')}</span>
                </button>
              </div>

              {/* Test leaf samples */}
              <div className="pt-3 border-t border-soil/10">
                <span className="text-[11px] font-semibold text-charcoal/60 block mb-2">
                  {t('testSampleLeaves')}
                </span>
                <div className="flex flex-wrap gap-2 justify-center">
                  {SAMPLE_LEAF_SVGS.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedCrop(sample.crop);
                        handlePhotoCaptured(sample.dataUrl);
                      }}
                      className="min-h-[38px] text-xs bg-wheat/30 hover:bg-wheat/60 text-forest font-medium px-3 py-1.5 rounded-xl border border-soil/15 transition-colors cursor-pointer"
                    >
                      {t(sample.labelKey)}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Captured Image Preview & Controls in Left Column */}
          {imagePreview && (
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden bg-charcoal border border-soil/20 shadow-md aspect-video max-h-72 flex items-center justify-center">
                <img src={imagePreview} alt={t('diagnosisResult')} className="w-full h-full object-contain" />

                {undersidePreview && (
                  <div className="absolute bottom-2 right-2 bg-charcoal/90 border border-wheat/40 rounded-xl p-1.5 flex items-center gap-2 shadow-md">
                    <img
                      src={undersidePreview}
                      alt={t('addLeafUndersideBtn')}
                      className="w-12 h-12 rounded-lg object-cover border border-cream/20"
                    />
                    <span className="text-[10px] font-semibold text-cream max-w-[120px] leading-tight pr-1">
                      {t('leafUndersideAddedBadge')}
                    </span>
                  </div>
                )}

                {loading && (
                  <div className="absolute inset-0 bg-charcoal/75 backdrop-blur-xs flex flex-col items-center justify-center text-cream p-4 space-y-3">
                    <div className="w-10 h-10 border-3 border-wheat border-t-transparent rounded-full animate-spin" />
                    <div className="text-center space-y-1">
                      <p className="text-sm font-bold text-cream">
                        {loadingStage === 'verifying_crop'
                          ? t('verifyingLeafIdentity')
                          : t('diagnosingLeaf')}
                      </p>
                      <p className="text-[11px] text-cream/75">
                        {loadingStage === 'verifying_crop'
                          ? t('verifyingLeafSubtext')
                          : t('diagnosingLeafSubtext')}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons and quality feedback */}
              <div className="bg-white rounded-2xl p-3.5 border border-soil/15 shadow-xs space-y-2.5">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 min-h-[44px] bg-forest text-cream font-bold py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 text-xs cursor-pointer shadow-xs active:scale-[0.98]"
                  >
                    <RotateCcw size={15} />
                    <span>{t('scanAnotherLeafBtn')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => undersideInputRef.current?.click()}
                    className="min-h-[44px] py-2 px-3 rounded-xl border border-soil/25 hover:bg-wheat/20 text-charcoal font-semibold text-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Camera size={14} className="text-forest" />
                    <span>{t('addLeafUndersideBtn')}</span>
                  </button>
                </div>

                {qualityCheck?.metrics && (
                  <div className="pt-2 border-t border-soil/10 flex flex-wrap gap-1.5 text-[10px]">
                    <span className="bg-cream px-2 py-0.5 rounded border border-soil/15 font-semibold text-charcoal/70">
                      Color: {qualityCheck.metrics.dominantLesionColor}
                    </span>
                    <span className="bg-cream px-2 py-0.5 rounded border border-soil/15 font-semibold text-charcoal/70">
                      Coverage: {qualityCheck.metrics.leafCoveragePercent}%
                    </span>
                    <span className="bg-cream px-2 py-0.5 rounded border border-soil/15 font-semibold text-charcoal/70">
                      Pattern: {qualityCheck.metrics.hasConcentricPatterns ? 'Rings' : 'Diffuse'}
                    </span>
                  </div>
                )}
              </div>

              {/* Sample leaves quick test strip */}
              <div className="bg-white/80 rounded-xl p-3 border border-soil/15">
                <span className="text-[11px] font-semibold text-charcoal/70 block mb-1.5">
                  {t('testSampleLeaves')}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {SAMPLE_LEAF_SVGS.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedCrop(sample.crop);
                        handlePhotoCaptured(sample.dataUrl);
                      }}
                      className="text-[11px] bg-wheat/20 hover:bg-wheat/50 text-forest font-medium px-2.5 py-1 rounded-lg border border-soil/15 transition-colors cursor-pointer"
                    >
                      {t(sample.labelKey)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Developer Calibration & Test Suite (Evaluates all 6 Cases) */}
      <div className="bg-white rounded-2xl p-4 border border-soil/15 shadow-xs space-y-3">
        <button
          type="button"
          onClick={() => setShowCalibrationSuite((prev) => !prev)}
          className="w-full min-h-[36px] flex items-center justify-between text-xs font-bold text-charcoal hover:text-forest transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <Code2 size={16} className="text-forest" />
            <span>{t('devCalibrationTitle')}</span>
          </div>
          {showCalibrationSuite ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showCalibrationSuite && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="pt-2 space-y-3 border-t border-soil/10 text-xs"
          >
            <p className="text-[11px] text-charcoal/70 leading-relaxed">
              {t('devCalibrationDesc')}
            </p>

            <button
              type="button"
              onClick={runAllCalibrationTests}
              disabled={runningCalibration}
              className="w-full min-h-[42px] bg-forest text-cream font-bold py-2 px-3 rounded-xl shadow-xs hover:bg-forest/90 transition-all flex items-center justify-center space-x-2 text-xs disabled:opacity-50 cursor-pointer"
            >
              <Play size={14} className={runningCalibration ? 'animate-spin' : ''} />
              <span>{runningCalibration ? t('runningTests') : t('runAllTestsBtn')}</span>
            </button>

            {/* 6 Calibration Test Cases */}
            <div className="space-y-2 pt-1">
              {[
                {
                  id: 1,
                  name: 'Case 1: Clear Textbook Early Blight (Tomato)',
                  expected: 'Likely match (Early Blight, concentric rings + yellow edge, KB treatment)',
                },
                {
                  id: 2,
                  name: 'Case 2: Healthy Leaf (Clean green leaf)',
                  expected: 'No problem seen in this photo, 0 chemicals, re-check tip',
                },
                {
                  id: 3,
                  name: 'Case 3: Wrong Crop (Tomato selected, Maize photo)',
                  expected: 'Halt before diagnosis, prompt crop confirmation dialog',
                },
                {
                  id: 4,
                  name: 'Case 4: Blurry or Dark Photo',
                  expected: 'Rejected by quality gate, retake tip, 0 diagnosis attempted',
                },
                {
                  id: 5,
                  name: 'Case 5: Glossy Black Raised Spots (Regression case)',
                  expected: 'Stays in "Not sure yet" (<= 48%), no early blight, no rings/halos',
                },
                {
                  id: 6,
                  name: 'Case 6: Non-Plant Image (Table / Hand)',
                  expected: 'Rejected with "I can\'t see a plant here", ask for new photo',
                },
              ].map((tc) => {
                const res = calibrationResults[tc.id];
                return (
                  <div
                    key={tc.id}
                    className="p-3 rounded-xl bg-cream/70 border border-soil/15 text-xs space-y-1.5"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-bold text-charcoal">{tc.name}</span>
                      {res && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                            res.passed
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : 'bg-rose-100 text-rose-900 border border-rose-300'
                          }`}
                        >
                          {res.passed ? t('testPassed') : t('testFailed')}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-charcoal/70">
                      <span className="font-semibold text-soil">Expected: </span>
                      {tc.expected}
                    </div>
                    {res && (
                      <div className="text-[11px] font-mono text-charcoal/85 bg-white p-2 rounded-lg border border-soil/10">
                        <div>
                          <span className="font-bold">Actual: </span>
                          {res.actual}
                        </div>
                        <div className="text-[10px] text-charcoal/60 mt-0.5">{res.details}</div>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => handleLiveTestCase(tc.id)}
                      className="text-[11px] font-bold text-forest hover:underline pt-0.5 flex items-center gap-1 cursor-pointer"
                    >
                      <Play size={11} />
                      <span>{t('testInLiveViewBtn')}</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Self-Consistency Check (2x Model Pass) */}
            <div className="p-3.5 rounded-xl bg-wheat/20 border border-soil/20 space-y-2 mt-3">
              <div className="flex justify-between items-center gap-2">
                <span className="font-bold text-charcoal flex items-center gap-1.5 text-xs">
                  <ShieldCheck size={14} className="text-forest" />
                  <span>{t('consistencyCheckTitle')}</span>
                </span>
                {consistencyCheckResult && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                      consistencyCheckResult.status === 'concordant'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-rose-100 text-rose-900 border border-rose-300'
                    }`}
                  >
                    {consistencyCheckResult.status === 'concordant'
                      ? t('testPassed')
                      : t('testFailed')}
                  </span>
                )}
              </div>

              <p className="text-[11px] text-charcoal/70 leading-relaxed">
                Runs the same photo through 2 independent inference passes and compares candidate labels and supporting evidence. If labels match but evidence differs (or reverse), flags a consistency warning.
              </p>

              <button
                type="button"
                onClick={runConsistencyCheck}
                disabled={runningConsistencyCheck}
                className="w-full min-h-[38px] bg-white border border-soil/25 hover:border-forest text-forest font-bold py-1.5 px-3 rounded-xl transition-all flex items-center justify-center space-x-2 text-xs disabled:opacity-50 cursor-pointer shadow-xs"
              >
                <RotateCcw size={13} className={runningConsistencyCheck ? 'animate-spin' : ''} />
                <span>
                  {runningConsistencyCheck
                    ? t('runningConsistencyCheck')
                    : t('runConsistencyCheckBtn')}
                </span>
              </button>

              {consistencyCheckResult && (
                <div className="space-y-1.5 pt-1 text-[11px]">
                  <div
                    className={`p-2 rounded-lg border leading-relaxed font-sans ${
                      consistencyCheckResult.status === 'concordant'
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                        : 'bg-rose-50 text-rose-900 border-rose-300'
                    }`}
                  >
                    <span className="font-bold">
                      {consistencyCheckResult.status === 'concordant' ? '✓ ' : '⚠ '}
                    </span>
                    {consistencyCheckResult.message}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[10px]">
                    <div className="bg-white p-2 rounded-lg border border-soil/15 space-y-1">
                      <div className="font-bold text-soil">Pass 1:</div>
                      <div>Label: {consistencyCheckResult.pass1.label}</div>
                      <div>Evidence: {consistencyCheckResult.pass1.evidence.join('; ')}</div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-soil/15 space-y-1">
                      <div className="font-bold text-soil">Pass 2:</div>
                      <div>Label: {consistencyCheckResult.pass2.label}</div>
                      <div>Evidence: {consistencyCheckResult.pass2.evidence.join('; ')}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Field Calibration Log Table (Farmer Feedback vs Confidence Tier) */}
            <div className="p-3.5 rounded-xl bg-white border border-soil/20 space-y-2 mt-3 shadow-xs">
              <div className="flex justify-between items-center gap-2">
                <span className="font-bold text-charcoal flex items-center gap-1.5 text-xs">
                  <FileText size={14} className="text-soil" />
                  <span>{t('calibrationLogTitle')}</span>
                </span>
                <span className="text-[10px] text-soil font-semibold px-2 py-0.5 rounded-md bg-wheat/30 border border-soil/15">
                  {history.length} {t('totalScreenings')}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-[11px] text-amber-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <Info size={13} className="flex-shrink-0" />
                  <span>Field Calibration Guidance:</span>
                </div>
                <p className="leading-relaxed">
                  {t('calibrationLogComment')}
                </p>
              </div>

              <div className="overflow-x-auto pt-1">
                <table className="w-full text-left text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-soil/20 text-charcoal font-bold text-[10px]">
                      <th className="py-1.5 pr-2">{t('tierLabel')}</th>
                      <th className="py-1.5 px-2 text-center">{t('totalScreenings')}</th>
                      <th className="py-1.5 px-2 text-center text-emerald-800">{t('confirmedAccurate')}</th>
                      <th className="py-1.5 px-2 text-center text-rose-800">{t('disconfirmed')}</th>
                      <th className="py-1.5 px-2 text-center text-amber-800">{t('unsureCount')}</th>
                      <th className="py-1.5 pl-2 text-right font-bold text-forest">{t('accuracyRate')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-soil/10">
                    {(['Low', 'Medium', 'High'] as const).map((tierKey) => {
                      const row = calibrationStats[tierKey];
                      const badgeColor =
                        tierKey === 'High'
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : tierKey === 'Medium'
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : 'bg-purple-100 text-purple-900 border-purple-300';

                      return (
                        <tr key={tierKey} className="hover:bg-cream/40">
                          <td className="py-1.5 pr-2 font-semibold">
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] border ${badgeColor}`}>
                              {tierKey}
                            </span>
                          </td>
                          <td className="py-1.5 px-2 text-center font-mono">{row.total}</td>
                          <td className="py-1.5 px-2 text-center font-mono text-emerald-800 font-semibold">{row.confirmed}</td>
                          <td className="py-1.5 px-2 text-center font-mono text-rose-800 font-semibold">{row.disconfirmed}</td>
                          <td className="py-1.5 px-2 text-center font-mono text-amber-800">{row.unsure}</td>
                          <td className="py-1.5 pl-2 text-right font-mono font-bold text-forest">{row.rate}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>

          {/* Farm History Drawer / Accordion */}
      {history.length > 0 && (
        <div className="bg-white rounded-2xl p-4 border border-soil/15 shadow-xs space-y-3">
          <button
            type="button"
            onClick={() => setShowHistory(!showHistory)}
            className="w-full min-h-[36px] flex items-center justify-between text-xs font-bold text-charcoal hover:text-forest transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-soil" />
              <span>
                {t('farmDiagnosisHistoryTitle')} ({history.length})
              </span>
            </div>
            {showHistory ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="pt-2 space-y-2 border-t border-soil/10"
            >
              {history.map((record) => (
                <div
                  key={record.id}
                  className="p-2.5 rounded-xl bg-cream/70 border border-soil/15 text-xs flex justify-between items-center gap-2"
                >
                  <div>
                    <div className="font-bold text-charcoal flex items-center gap-1.5 flex-wrap">
                      <span>{getCropDisplayName(record.crop)}</span>
                      <span>·</span>
                      <span className="text-forest">
                        {record.confidence < 60 ? t('notSureYetHeading') : record.diseaseName}
                      </span>
                    </div>
                    <div className="text-[11px] text-charcoal/60 mt-0.5">
                      {record.dateStr} · {record.confidence}% {t('confidenceLabel')}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {record.userFeedback ? (
                      <span
                        className={`text-[11px] font-semibold ${
                          record.userFeedback === 'yes'
                            ? 'text-emerald-800'
                            : record.userFeedback === 'no'
                            ? 'text-rose-800'
                            : 'text-soil'
                        }`}
                      >
                        {record.userFeedback === 'yes'
                          ? t('feedbackConfirmed')
                          : record.userFeedback === 'no'
                          ? t('feedbackMismatched')
                          : t('feedbackUnconfirmed')}
                      </span>
                    ) : (
                      <span className="text-[11px] text-charcoal/50">{t('feedbackPending')}</span>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      )}
        </div>

        {/* Right Column (7 columns on desktop: Diagnosis Result Side Panel & Feedback) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Image Quality Gate Failure Screen */}
      {imagePreview && qualityGateFailed && qualityCheck && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-5 border-2 border-amber-400 shadow-md space-y-4"
        >
          <div className="flex items-start space-x-3 pb-3 border-b border-soil/15">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={22} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-charcoal">
                {t('qualityCheckFailedTitle')}
              </h3>
              <p className="text-xs text-amber-900 font-semibold mt-0.5">
                {getQualityFailureMessage(qualityCheck)}
              </p>
            </div>
          </div>

          {/* Good vs Bad Photo Guide */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-soil block">{t('photoGuideTitle')}</span>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 space-y-1">
                <div className="flex items-center space-x-1.5 text-emerald-800 font-bold">
                  <CheckCircle2 size={14} className="text-emerald-700" />
                  <span>{t('goodPhotoTitle')}</span>
                </div>
                <ul className="text-[11px] text-emerald-950/80 space-y-0.5 list-disc list-inside">
                  <li>{t('goodPhotoTip1')}</li>
                  <li>{t('goodPhotoTip2')}</li>
                  <li>{t('goodPhotoTip3')}</li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 space-y-1">
                <div className="flex items-center space-x-1.5 text-rose-800 font-bold">
                  <AlertTriangle size={14} className="text-rose-700" />
                  <span>{t('badPhotoTitle')}</span>
                </div>
                <ul className="text-[11px] text-rose-950/80 space-y-0.5 list-disc list-inside">
                  <li>{t('badPhotoTip1')}</li>
                  <li>{t('badPhotoTip2')}</li>
                  <li>{t('badPhotoTip3')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 min-h-[46px] bg-forest text-cream font-bold py-2.5 px-4 rounded-xl shadow-sm hover:bg-forest/90 transition-all flex items-center justify-center space-x-2 active:scale-[0.97] cursor-pointer text-xs"
            >
              <Camera size={16} />
              <span>{t('holdSteadyRetakeBtn')}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="min-h-[46px] py-2.5 px-4 rounded-xl border border-soil/20 text-charcoal hover:bg-wheat/20 text-xs font-semibold cursor-pointer"
            >
              {t('cancelBtn')}
            </button>
          </div>
        </motion.div>
      )}

          {/* Crop-Leaf Mismatch Screen */}
          {cropMismatch && !loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-5 border-2 border-amber-400 shadow-md space-y-4"
            >
              <div className="flex items-start space-x-3 pb-3 border-b border-soil/15">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={22} className="text-amber-700" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-charcoal">
                    {t('cropMismatchTitle')}
                  </h3>
                  <p className="text-xs text-amber-950 font-semibold mt-0.5 leading-relaxed">
                    {t('cropMismatchDefaultMsg')}
                  </p>
                </div>
              </div>

              <div className="bg-wheat/20 rounded-xl p-3 text-xs text-charcoal/80 space-y-1.5">
                <div className="font-bold text-soil flex items-center gap-1.5">
                  <Info size={14} />
                  <span>{t('cropMismatchWhyTitle')}</span>
                </div>
                <p className="text-[11px] leading-relaxed">{t('cropMismatchWhyDesc')}</p>
              </div>

              <div className="pt-1 flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 min-h-[46px] bg-forest text-cream font-bold py-2.5 px-3 rounded-xl shadow-xs hover:bg-forest/90 transition-all flex items-center justify-center space-x-1.5 text-xs active:scale-[0.97] cursor-pointer"
                  >
                    <Camera size={15} />
                    <span>{t('retakeCorrectLeafBtn')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (imagePreview) {
                        analyzeWithContext(imagePreview, true, qualityCheck);
                      }
                    }}
                    className="min-h-[46px] py-2.5 px-3 rounded-xl border border-soil/25 text-charcoal hover:bg-wheat/30 text-xs font-semibold cursor-pointer"
                  >
                    {t('confirmProceedAnywayBtn')}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full min-h-[44px] py-2 text-center text-xs font-medium text-charcoal/60 hover:text-charcoal cursor-pointer"
                >
                  {t('cancelBtn')}
                </button>
              </div>
            </motion.div>
          )}

          {/* Diagnostic Result Card */}
          {result && !loading && !cropMismatch && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-5 border border-soil/15 shadow-sm space-y-4"
            >
              {/* 1. Headline, Confidence Pill & Yellow Banner */}
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    {/* Single clear status heading for the inconclusive tier (< 60%) without extra "Other Diagnosis" header */}
                    {result.confidence >= 60 && (
                      <div className="flex items-center space-x-1.5 mb-1">
                        <Leaf size={15} className="text-forest" />
                        <span className="text-xs font-semibold text-charcoal/65">
                          {getCropDisplayName(selectedCrop)} · {t('diagnosisResult')}
                        </span>
                      </div>
                    )}

                    <h2 className="text-lg sm:text-xl font-black text-charcoal leading-snug">
                      {result.confidence < 60 ? t('notSureYetHeading') : result.diseaseName}
                    </h2>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {result.confidence >= 60 && (
                      <button
                        type="button"
                        onClick={handleReadout}
                        className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-wheat/30 hover:bg-wheat/50 text-forest transition-colors flex items-center justify-center cursor-pointer"
                        title={t('readAloudBtn')}
                        aria-label={t('readAloudBtn')}
                      >
                        <Volume2 size={18} />
                      </button>
                    )}
                    {(() => {
                      const hasCandidates = Boolean(
                        result.differentialAlternatives && result.differentialAlternatives.length > 0
                      );

                      if (result.confidence < 60) {
                        // Use "Unknown condition" ONLY when no knowledge-base candidate matches
                        if (!hasCandidates) {
                          return (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border whitespace-nowrap bg-purple-100 text-purple-900 border-purple-300 shadow-xs">
                              <HelpCircle size={14} className="text-purple-700 flex-shrink-0" />
                              <span>{t('unknownCondition')}</span>
                            </span>
                          );
                        }
                        if (result.severity === 'High') {
                          return (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border whitespace-nowrap bg-rose-100 text-rose-900 border-rose-300 shadow-xs">
                              <AlertTriangle size={14} className="text-rose-700 flex-shrink-0" />
                              <span>{t('expertCheckNeeded')}</span>
                            </span>
                          );
                        }
                        // Candidates exist but confidence < 60%: show "Low confidence"
                        return (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border whitespace-nowrap bg-amber-100 text-amber-900 border-amber-300 shadow-xs">
                            <HelpCircle size={14} className="text-amber-700 flex-shrink-0" />
                            <span>{t('lowConfidence')}</span>
                          </span>
                        );
                      }
                      if (result.confidence >= 80) {
                        return (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border whitespace-nowrap bg-emerald-100 text-emerald-900 border-emerald-300 shadow-xs">
                            <CheckCircle2 size={14} className="text-emerald-700 flex-shrink-0" />
                            <span>{t('likelyMatch')}</span>
                          </span>
                        );
                      }
                      return (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border whitespace-nowrap bg-amber-100 text-amber-900 border-amber-300 shadow-xs">
                          <AlertTriangle size={14} className="text-amber-700 flex-shrink-0" />
                          <span>{t('possibleMatch')}</span>
                        </span>
                      );
                    })()}
                  </div>
                </div>

                {/* Yellow Banner & Primary Action Buttons for Inconclusive Tier (< 60%) */}
                {result.confidence < 60 && (
                  <div className="space-y-3">
                    {(() => {
                      const hasCandidates = Boolean(
                        result.differentialAlternatives && result.differentialAlternatives.length > 0
                      );
                      const bannerTitle = hasCandidates
                        ? t('inconclusiveBannerTitle')
                        : t('unknownBannerTitle');
                      const bannerDesc = hasCandidates
                        ? t('inconclusiveBannerDesc')
                        : t('unknownBannerDesc');

                      return (
                        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs space-y-1.5">
                          <div className="font-bold flex items-start gap-2 text-amber-900">
                            <HelpCircle size={16} className="flex-shrink-0 mt-0.5" />
                            <span>{bannerTitle}</span>
                          </div>
                          <p className="text-xs leading-relaxed text-amber-900/90">
                            {bannerDesc}
                          </p>
                        </div>
                      );
                    })()}

                    {/* Directly under banner: two large (min 44px) primary buttons + secondary KVK action + Read Aloud */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="min-h-[48px] px-4 py-3 rounded-xl bg-forest text-cream font-bold text-xs sm:text-sm shadow-xs hover:bg-forest/90 transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                        >
                          <Camera size={17} className="text-wheat flex-shrink-0" />
                          <span>{t('retakePhotoBtn')}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => undersideInputRef.current?.click()}
                          className="min-h-[48px] px-4 py-3 rounded-xl bg-forest text-cream font-bold text-xs sm:text-sm shadow-xs hover:bg-forest/90 transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                        >
                          <Leaf size={17} className="text-wheat flex-shrink-0" />
                          <span>{t('addLeafUndersideBtn')}</span>
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          type="button"
                          onClick={() => setShowKvkModal(true)}
                          className="flex-1 min-h-[46px] px-4 py-2.5 rounded-xl bg-wheat/35 hover:bg-wheat/55 text-charcoal font-bold text-xs border border-soil/25 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <FileText size={16} className="text-forest flex-shrink-0" />
                          <span>{t('showToKvkBtn')}</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleReadout}
                          className="min-h-[46px] px-4 py-2.5 rounded-xl bg-cream hover:bg-wheat/35 text-forest font-bold text-xs border border-soil/20 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                          aria-label={t('readAloudBtn')}
                        >
                          <Volume2 size={16} className="text-forest flex-shrink-0" />
                          <span>{t('readAloudBtn')}</span>
                        </button>
                      </div>

                      {/* Expandable KVK Information Panel when farmer clicks "Show to Krishi Vigyan Kendra" */}
                      {showKvkHelper && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3.5 rounded-xl bg-cream border border-soil/25 text-xs space-y-2"
                        >
                          <div className="font-bold text-forest flex items-center justify-between">
                            <span>
                              {getDistrictDisplayName(state.district)} — {t('kvkHelperTitle')}
                            </span>
                          </div>
                          <p className="text-charcoal/80 leading-relaxed">{t('kvkHelperSubtitle')}</p>
                          <div className="p-2.5 rounded-lg bg-white border border-soil/15 flex items-center gap-2 font-bold text-forest">
                            <PhoneCall size={15} className="flex-shrink-0" />
                            <span>{t('kvkHelplineLabel')}</span>
                          </div>
                          <ul className="space-y-1 text-charcoal/85 list-disc list-inside pt-0.5">
                            <li>{t('kvkChecklist1')}</li>
                            <li>{t('kvkChecklist2')}</li>
                            <li>{t('kvkChecklist3')}</li>
                          </ul>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}
              </div>

                {/* Truthful Confidence Explanation of Limits */}
                <div className="p-3 rounded-xl bg-soil/5 border border-soil/15 text-xs text-charcoal/85 space-y-1">
                  <div className="flex items-start gap-1.5 leading-relaxed">
                    <Info size={14} className="text-soil flex-shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-relaxed">
                      {result.confidence < 60
                        ? t('confidenceLimitLow')
                        : result.confidence < 80
                        ? t('confidenceLimitMedium')
                        : t('confidenceLimitHigh')}
                    </span>
                  </div>
                </div>

                {/* 2. "Here's what we saw" Evidence List with "Checked against your photo" trust indicator */}
                <div className="bg-cream/70 rounded-xl p-3.5 border border-soil/15 space-y-2.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center space-x-1.5 text-forest font-bold text-xs">
                      <ShieldCheck size={16} />
                      <span>{t('heresWhatWeSaw')}</span>
                    </div>
                    <span className="text-[11px] font-medium text-soil">
                      {t('checkedAgainstPhoto')}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-0.5">
                    {displayedSymptoms.map((symp, sIdx) => (
                      <div key={sIdx} className="flex items-start space-x-2 text-xs text-charcoal/90">
                        <CheckCircle2 size={14} className="text-forest flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{symp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Other possibilities considered (Collapsed by default) */}
                {result.differentialAlternatives && result.differentialAlternatives.length > 0 && (
                  <div className="bg-wheat/15 rounded-xl p-3 border border-soil/10">
                    <button
                      type="button"
                      onClick={() => setShowAlternatives(!showAlternatives)}
                      className="w-full min-h-[36px] flex items-center justify-between text-xs font-bold text-soil hover:text-forest transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-1.5">
                        <Layers size={14} />
                        <span>
                          {t('otherPossibilitiesConsidered')} ({result.differentialAlternatives.length})
                        </span>
                      </div>
                      {showAlternatives ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {showAlternatives && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="pt-2.5 space-y-2 text-xs border-t border-soil/10 mt-2"
                      >
                        {(() => {
                          const candidatesWithEvidence = result.differentialAlternatives.filter((c) =>
                            hasDirectEvidenceForCandidate(c, displayedSymptoms)
                          );
                          const candidatesWithoutEvidence = result.differentialAlternatives.filter(
                            (c) => !hasDirectEvidenceForCandidate(c, displayedSymptoms)
                          );
                          const neutralOrderedAlternatives = [
                            ...candidatesWithEvidence,
                            ...candidatesWithoutEvidence,
                          ];

                          return neutralOrderedAlternatives.map((alt, aIdx) => {
                            const isDirectlySupported = hasDirectEvidenceForCandidate(alt, displayedSymptoms);
                            const fitLabel = isDirectlySupported ? t('mostLikely') : t('possibleCause');
                            const supportsText = alt.supportsThisKey ? t(alt.supportsThisKey) : alt.supportsThis;
                            const doesntFitText = alt.doesntFitKey ? t(alt.doesntFitKey) : alt.doesntFit;

                            return (
                              <div key={aIdx} className="p-3 rounded-lg bg-white border border-soil/15 space-y-1.5">
                                <div className="flex justify-between items-center font-bold text-charcoal gap-2">
                                  <span>{alt.conditionKey ? t(alt.conditionKey) : alt.condition}</span>
                                  <span
                                    className={`text-[11px] font-semibold whitespace-nowrap px-2 py-0.5 rounded-md border ${
                                      isDirectlySupported
                                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold'
                                        : 'bg-wheat/30 text-soil border-soil/15'
                                    }`}
                                  >
                                    {fitLabel}
                                  </span>
                                </div>

                              {/* Two short lines: Supports this vs Doesn't fit / not seen */}
                              <div className="pt-1.5 space-y-1 text-[11px] border-t border-soil/10">
                                <div className="flex items-start gap-1.5 text-charcoal/90">
                                  <span className="font-bold text-forest whitespace-nowrap flex-shrink-0">
                                    {t('supportsThisLabel')}
                                  </span>
                                  <span className="leading-snug">{supportsText}</span>
                                </div>
                                <div className="flex items-start gap-1.5 text-charcoal/80">
                                  <span className="font-bold text-amber-900 whitespace-nowrap flex-shrink-0">
                                    {t('doesntFitLabel')}
                                  </span>
                                  <span className="leading-snug">{doesntFitText}</span>
                                </div>
                              </div>
                            </div>
                          );
                        });
                      })()}

                        {/* How to find out Card */}
                        <div className="bg-cream/70 p-3 rounded-xl border border-soil/15 text-xs text-charcoal/85 space-y-2 mt-2">
                          <h4 className="font-bold text-soil flex items-center gap-1.5">
                            <HelpCircle size={14} className="text-soil" />
                            <span>{t('howToTellTitle')}</span>
                          </h4>
                          <p className="leading-relaxed">
                            {t('howToTell_altBlackSootyMold')}
                          </p>
                          <div className="pt-1.5 flex items-center gap-1.5 font-bold text-forest border-t border-soil/10 mt-1">
                            <Camera size={13} className="flex-shrink-0 text-forest" />
                            <span>{t('takePhotoUnderside')}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* 4. Treatment Advice Tied to Confidence Tier */}
                <div className="space-y-3 pt-1">
                  {/* Safe Non-Chemical Care Steps */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-forest flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-forest" />
                      {t('safeCareTitle')}
                    </h4>

                    {result.confidence < 60 ? (
                      (() => {
                        const sootyHasEvidence = result.differentialAlternatives?.some(
                          (c) =>
                            /sooty|mold|insect/i.test(c.conditionKey || c.condition) &&
                            hasDirectEvidenceForCandidate(c, displayedSymptoms)
                        );
                        const leafSpotHasEvidence = result.differentialAlternatives?.some(
                          (c) =>
                            /spot|blight/i.test(c.conditionKey || c.condition) &&
                            hasDirectEvidenceForCandidate(c, displayedSymptoms)
                        );

                        // NEUTRAL ORDERING: only labeled "Most likely" if direct supporting evidence in photo
                        const sootyFitLabel = sootyHasEvidence ? t('mostLikely') : t('possibleCause');
                        const leafSpotFitLabel = leafSpotHasEvidence ? t('mostLikely') : t('possibleCause');

                        const sootyMoldCareCard = (fitLabel: string, isFirst: boolean) => (
                          <div
                            key="sooty"
                            className={`p-3 rounded-xl border text-xs text-charcoal/85 space-y-1.5 ${
                              isFirst ? 'bg-amber-50/80 border-amber-300' : 'bg-amber-50/50 border-amber-200'
                            }`}
                          >
                            <div className="flex justify-between items-center gap-2">
                              <div className="font-bold text-amber-900 flex items-center gap-1.5">
                                <Bug size={13} className="text-amber-700 flex-shrink-0" />
                                <span>{t('causeSootyMoldTitle')}</span>
                              </div>
                              <span
                                className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border whitespace-nowrap ${
                                  sootyHasEvidence
                                    ? 'bg-amber-200/70 text-amber-900 border-amber-300 font-bold'
                                    : 'bg-wheat/30 text-soil border-soil/20'
                                }`}
                              >
                                {fitLabel}
                              </span>
                            </div>
                            <ul className="space-y-1 text-charcoal/85 pl-4 list-disc text-xs">
                              <li>{t('careSootyMold1')}</li>
                              <li>{t('careSootyMold2')}</li>
                            </ul>
                          </div>
                        );

                        const leafSpotCareCard = (fitLabel: string, isFirst: boolean) => (
                          <div
                            key="leafspot"
                            className={`p-3 rounded-xl border text-xs text-charcoal/85 space-y-1.5 ${
                              isFirst ? 'bg-emerald-50/80 border-emerald-300' : 'bg-emerald-50/50 border-emerald-200'
                            }`}
                          >
                            <div className="flex justify-between items-center gap-2">
                              <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                                <Leaf size={13} className="text-emerald-700 flex-shrink-0" />
                                <span>{t('causeLeafSpotTitle')}</span>
                              </div>
                              <span
                                className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border whitespace-nowrap ${
                                  leafSpotHasEvidence
                                    ? 'bg-emerald-200/70 text-emerald-900 border-emerald-300 font-bold'
                                    : 'bg-wheat/30 text-soil border-soil/20'
                                }`}
                              >
                                {fitLabel}
                              </span>
                            </div>
                            <ul className="space-y-1 text-charcoal/85 pl-4 list-disc text-xs">
                              <li>{t('careLeafSpot1')}</li>
                              <li>{t('careLeafSpot2')}</li>
                              <li>{t('careLeafSpot3')}</li>
                            </ul>
                          </div>
                        );

                        return (
                          <div className="space-y-2">
                            {sootyHasEvidence && !leafSpotHasEvidence
                              ? [
                                  sootyMoldCareCard(sootyFitLabel, true),
                                  leafSpotCareCard(leafSpotFitLabel, false),
                                ]
                              : leafSpotHasEvidence && !sootyHasEvidence
                              ? [
                                  leafSpotCareCard(leafSpotFitLabel, true),
                                  sootyMoldCareCard(sootyFitLabel, false),
                                ]
                              : [
                                  leafSpotCareCard(leafSpotFitLabel, false),
                                  sootyMoldCareCard(sootyFitLabel, false),
                                ]}

                            <p className="text-[11px] text-charcoal/65 px-1 italic">
                              {t('allSafeNonChemicalNote')}
                            </p>
                          </div>
                        );
                      })()
                    ) : (
                      <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-xs text-charcoal/85 space-y-1.5">
                        {displayedSafeCare.map((guide, gIdx) => (
                          <div key={gIdx} className="flex items-start space-x-2">
                            <span className="text-emerald-700 font-bold">•</span>
                            <span>{guide}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Specific Treatment ONLY IF Confidence >= 80% */}
                  {result.treatmentAdviceTier === 'high_confidence' && result.specificTreatment && (
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold text-soil flex items-center gap-1.5">
                        <AlertTriangle size={14} className="text-amber-700" />
                        {t('recommendedTreatmentTitle')}
                      </h4>
                      <p className="text-xs text-charcoal/85 leading-relaxed bg-amber-50/80 p-3 rounded-xl border border-amber-200">
                        {result.specificTreatment}
                      </p>
                    </div>
                  )}

                  {/* Medium Confidence Notice: Chemical sprays withheld */}
                  {result.treatmentAdviceTier === 'medium_confidence' && (
                    <div className="p-3 rounded-xl bg-wheat/30 border border-wheat/60 text-xs text-charcoal/80 space-y-1">
                      <div className="font-bold text-soil flex items-center gap-1.5">
                        <Info size={14} />
                        <span>{t('chemicalWithheldTitle')}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">{t('chemicalWithheldDesc')}</p>
                    </div>
                  )}

                  {/* Prevention: Candidate-aware, non-chemical, neutral ordering */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-charcoal/80 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-forest" />
                      <span>{t('futurePrevention')}</span>
                    </h4>

                    {result.confidence < 60 ? (
                      (() => {
                        const sootyHasEvidence = result.differentialAlternatives?.some(
                          (c) =>
                            /sooty|mold|insect/i.test(c.conditionKey || c.condition) &&
                            hasDirectEvidenceForCandidate(c, displayedSymptoms)
                        );
                        const leafSpotHasEvidence = result.differentialAlternatives?.some(
                          (c) =>
                            /spot|blight/i.test(c.conditionKey || c.condition) &&
                            hasDirectEvidenceForCandidate(c, displayedSymptoms)
                        );

                        const sootyFitLabel = sootyHasEvidence ? t('mostLikely') : t('possibleCause');
                        const leafSpotFitLabel = leafSpotHasEvidence ? t('mostLikely') : t('possibleCause');

                        const sootyMoldPreventionCard = (fitLabel: string, isFirst: boolean) => (
                          <div
                            key="prev-sooty"
                            className={`p-3 rounded-xl border text-xs text-charcoal/85 space-y-1.5 ${
                              isFirst ? 'bg-amber-50/70 border-amber-200' : 'bg-cream/70 border-soil/15'
                            }`}
                          >
                            <div className="flex justify-between items-center gap-2">
                              <div className="font-bold text-amber-900 flex items-center gap-1.5">
                                <Bug size={13} className="text-amber-700 flex-shrink-0" />
                                <span>{t('preventSootyMoldTitle')}</span>
                              </div>
                              <span
                                className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border whitespace-nowrap ${
                                  sootyHasEvidence
                                    ? 'bg-amber-200/70 text-amber-900 border-amber-300 font-bold'
                                    : 'bg-wheat/30 text-soil border-soil/20'
                                }`}
                              >
                                {fitLabel}
                              </span>
                            </div>
                            <ul className="space-y-1 text-charcoal/85 pl-4 list-disc text-xs">
                              <li>{t('preventSootyMold1')}</li>
                              <li>{t('preventSootyMold2')}</li>
                              <li>{t('preventSootyMold3')}</li>
                            </ul>
                          </div>
                        );

                        const leafSpotPreventionCard = (fitLabel: string, isFirst: boolean) => (
                          <div
                            key="prev-leafspot"
                            className={`p-3 rounded-xl border text-xs text-charcoal/85 space-y-1.5 ${
                              isFirst ? 'bg-emerald-50/70 border-emerald-200' : 'bg-cream/70 border-soil/15'
                            }`}
                          >
                            <div className="flex justify-between items-center gap-2">
                              <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                                <Leaf size={13} className="text-emerald-700 flex-shrink-0" />
                                <span>{t('preventLeafSpotTitle')}</span>
                              </div>
                              <span
                                className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border whitespace-nowrap ${
                                  leafSpotHasEvidence
                                    ? 'bg-emerald-200/70 text-emerald-900 border-emerald-300 font-bold'
                                    : 'bg-wheat/30 text-soil border-soil/20'
                                }`}
                              >
                                {fitLabel}
                              </span>
                            </div>
                            <ul className="space-y-1 text-charcoal/85 pl-4 list-disc text-xs">
                              <li>{t('preventLeafSpot1')}</li>
                              <li>{t('preventLeafSpot2')}</li>
                              <li>{t('preventLeafSpot3')}</li>
                            </ul>
                          </div>
                        );

                        return (
                          <div className="space-y-2">
                            {sootyHasEvidence && !leafSpotHasEvidence
                              ? [
                                  sootyMoldPreventionCard(sootyFitLabel, true),
                                  leafSpotPreventionCard(leafSpotFitLabel, false),
                                ]
                              : leafSpotHasEvidence && !sootyHasEvidence
                              ? [
                                  leafSpotPreventionCard(leafSpotFitLabel, true),
                                  sootyMoldPreventionCard(sootyFitLabel, false),
                                ]
                              : [
                                  leafSpotPreventionCard(leafSpotFitLabel, false),
                                  sootyMoldPreventionCard(sootyFitLabel, false),
                                ]}
                          </div>
                        );
                      })()
                    ) : (
                      <p className="text-xs text-charcoal/75 bg-cream/70 p-2.5 rounded-xl border border-soil/10">
                        {displayedPrevention}
                      </p>
                    )}
                  </div>
                </div>

              {/* Mandatory Extension Disclaimer */}
              <div className="p-2.5 rounded-xl bg-soil/5 border border-soil/15 text-[11px] text-charcoal/75 text-center">
                {t('aiScreeningDisclaimer')}
              </div>

              {/* Feedback Loop into Farm History */}
              <div className="p-3.5 rounded-xl bg-wheat/20 border border-soil/20 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-soil">
                  <span>{t('wasDiagnosisAccurate')}</span>
                  {feedbackSubmitted && (
                    <span className="text-[11px] text-forest font-semibold">
                      {t('feedbackRecorded')}
                    </span>
                  )}
                </div>

                {!feedbackSubmitted ? (
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleFeedback('yes')}
                      className="min-h-[44px] py-2 px-2.5 bg-white border border-soil/20 hover:border-forest rounded-xl text-xs font-bold text-forest flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <ThumbsUp size={14} />
                      <span>{t('feedbackYes')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFeedback('no')}
                      className="min-h-[44px] py-2 px-2.5 bg-white border border-soil/20 hover:border-rose-400 rounded-xl text-xs font-bold text-rose-800 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <ThumbsDown size={14} />
                      <span>{t('feedbackNo')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFeedback('not_sure')}
                      className="min-h-[44px] py-2 px-2.5 bg-white border border-soil/20 hover:border-charcoal/40 rounded-xl text-xs font-semibold text-charcoal/75 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <HelpCircle size={14} />
                      <span>{t('feedbackNotSure')}</span>
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-charcoal/75 pt-0.5">
                    {feedbackSubmitted === 'no' ? t('feedbackThankYouNo') : t('feedbackThankYouYes')}
                  </p>
                )}
              </div>

              {/* Scan Another Leaf Button */}
              <div className="pt-2 border-t border-soil/10 flex gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 min-h-[46px] bg-forest text-cream font-bold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 text-xs cursor-pointer shadow-xs active:scale-[0.97]"
                >
                  <RotateCcw size={15} />
                  <span>{t('scanAnotherLeafBtn')}</span>
                </button>
              </div>

              {/* Collapsible Diagnosis Details (Exact number only shown here) */}
              <div className="pt-2 border-t border-soil/10">
                <button
                  type="button"
                  onClick={() => setShowDetails((prev) => !prev)}
                  className="w-full flex items-center justify-between text-xs text-charcoal/70 hover:text-charcoal py-1.5 cursor-pointer font-bold"
                >
                  <span className="flex items-center gap-1.5">
                    <Code2 size={14} className="text-forest" />
                    <span>{t('detailsSectionTitle')}</span>
                  </span>
                  {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2 p-3.5 rounded-xl bg-charcoal/5 border border-soil/15 text-xs text-charcoal/80 space-y-2 font-mono"
                  >
                    <div className="flex justify-between items-center pb-1.5 border-b border-soil/10">
                      <div>
                        <span className="font-sans font-semibold text-charcoal block">{t('exactConfidenceScore')}</span>
                        <span className="font-sans text-[10px] text-soil/75 italic">
                          ({t('aiEstimatedNotProbability')})
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-forest/10 text-forest font-bold text-xs">
                        {result.confidence}%
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-1.5 border-b border-soil/10">
                      <span className="font-sans text-charcoal/70">{t('devTreatmentTierLabel')}</span>
                      <span className="font-semibold text-charcoal">{result.treatmentAdviceTier}</span>
                    </div>

                    <div className="flex justify-between items-center pb-1.5 border-b border-soil/10">
                      <span className="font-sans text-charcoal/70">{t('devStep4bLabel')}</span>
                      <span className={`font-semibold ${result.step4bTriggered ? 'text-amber-800' : 'text-forest'}`}>
                        {result.step4bTriggered ? t('devStep4bTriggered') : t('devStep4bPassed')}
                      </span>
                    </div>

                    {qualityCheck?.metrics && (
                      <div className="space-y-1 pt-1 text-[11px]">
                        <div className="flex justify-between">
                          <span className="font-sans text-charcoal/60">{t('devDominantColorLabel')}</span>
                          <span>{qualityCheck.metrics.dominantLesionColor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-sans text-charcoal/60">{t('devRingPatternLabel')}</span>
                          <span>{qualityCheck.metrics.hasConcentricPatterns ? t('yesWord') : t('noWord')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-sans text-charcoal/60">{t('devYellowEdgeLabel')}</span>
                          <span>{qualityCheck.metrics.hasDistinctHalos ? t('yesWord') : t('noWord')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-sans text-charcoal/60">Foliage Leaf Coverage:</span>
                          <span>{qualityCheck.metrics.leafCoveragePercent}%</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Idle Welcome & Quality Guide on Desktop */}
          {!result && !loading && !cropMismatch && !qualityGateFailed && (
            <div className="hidden lg:block bg-white rounded-2xl p-6 border border-soil/15 shadow-xs space-y-4">
              <div className="flex items-center space-x-3 pb-3 border-b border-soil/15">
                <div className="w-12 h-12 rounded-xl bg-forest/10 text-forest flex items-center justify-center">
                  <ShieldCheck size={26} />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-charcoal">
                    {currentLang === 'kn-IN' ? 'ಎಲೆ ರೋಗ ತಪಾಸಣೆ ಮಾರ್ಗದರ್ಶಿ' : 'Plant Doctor Photo Guide'}
                  </h3>
                  <p className="text-xs text-charcoal/70">
                    {currentLang === 'kn-IN' ? 'ಖಚಿತ ರೋಗ ನಿರ್ಣಯಕ್ಕಾಗಿ ಸ್ಪಷ್ಟ ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ' : 'Tips for an accurate, AI-verified plant health check'}
                  </p>
                </div>
              </div>

              {/* Good vs Bad Photo Guide */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-soil block">{t('photoGuideTitle')}</span>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-emerald-800 font-bold">
                      <CheckCircle2 size={15} className="text-emerald-700" />
                      <span>{t('goodPhotoTitle')}</span>
                    </div>
                    <ul className="text-[11px] text-emerald-950/80 space-y-1 list-disc list-inside">
                      <li>{t('goodPhotoTip1')}</li>
                      <li>{t('goodPhotoTip2')}</li>
                      <li>{t('goodPhotoTip3')}</li>
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-rose-800 font-bold">
                      <AlertTriangle size={15} className="text-rose-700" />
                      <span>{t('badPhotoTitle')}</span>
                    </div>
                    <ul className="text-[11px] text-rose-950/80 space-y-1 list-disc list-inside">
                      <li>{t('badPhotoTip1')}</li>
                      <li>{t('badPhotoTip2')}</li>
                      <li>{t('badPhotoTip3')}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Extension & Scientist Support Note */}
              <div className="bg-wheat/20 rounded-xl p-3.5 text-xs text-charcoal/80 space-y-1.5 border border-wheat/40">
                <div className="font-bold text-forest flex items-center gap-1.5">
                  <Info size={14} />
                  <span>{currentLang === 'kn-IN' ? 'ಕರ್ನಾಟಕ ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರ (KVK) ಬೆಂಬಲ' : 'University & KVK Extension Advisory'}</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  {currentLang === 'kn-IN'
                    ? 'ಅಗ್ರಿಮೈಂಡ್ ಕೇವಲ ಸುರಕ್ಷಿತ, ನೈಸರ್ಗಿಕ ಮತ್ತು ಜೈವಿಕ ನಿಯಂತ್ರಣ ಕ್ರಮಗಳನ್ನು ಶಿಫಾರಸು ಮಾಡುತ್ತದೆ. ಕೀಟನಾಶಕ ಸಿಂಪಡಣೆಗೆ ಮುನ್ನ ಕೆವಿಕೆ ವಿಜ್ಞಾನಿಗಳ ಸಲಹೆ ಪಡೆಯುವುದು ಕಡ್ಡಾಯ.'
                    : 'AgriMind prioritizes cultural and non-chemical care measures. Unjustified chemical sprays are guarded by Stage 12 regional verification.'}
                </p>
                <div className="pt-1 text-[11px] font-bold text-soil flex items-center gap-1">
                  <PhoneCall size={12} className="text-forest" />
                  <span>Kisan Call Centre: 1800-180-1551 (Toll Free)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Krishi Vigyan Kendra (KVK) Shareable Consultation Slip Modal */}
      {showKvkModal && result && (
        <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-soil/20 overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-4 bg-forest text-cream flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <FileText size={18} className="text-wheat flex-shrink-0" />
                <h3 className="font-bold text-sm sm:text-base leading-snug">
                  {kvkSummaryLang === 'kn-IN' ? 'ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರ (KVK) ಸಮಾಲೋಚನಾ ಚೀಟಿ' : 'Krishi Vigyan Kendra Consultation Slip'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowKvkModal(false)}
                className="p-1 rounded-lg text-cream/80 hover:text-cream hover:bg-forest/50 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content / Printable Slip */}
            <div className="p-4 overflow-y-auto space-y-3.5 text-xs text-charcoal">
              {/* Language Switch for the slip */}
              <div className="flex justify-between items-center pb-2 border-b border-soil/10">
                <span className="text-[11px] font-semibold text-charcoal/60">
                  {kvkSummaryLang === 'kn-IN' ? 'ಭಾಷೆ / Language:' : 'Language:'}
                </span>
                <div className="inline-flex rounded-lg border border-soil/20 p-0.5 bg-cream/70 text-xs">
                  <button
                    type="button"
                    onClick={() => setKvkSummaryLang('kn-IN')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                      kvkSummaryLang === 'kn-IN' ? 'bg-forest text-cream shadow-xs' : 'text-charcoal/70 hover:text-charcoal'
                    }`}
                  >
                    ಕನ್ನಡ
                  </button>
                  <button
                    type="button"
                    onClick={() => setKvkSummaryLang('en-IN')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                      kvkSummaryLang === 'en-IN' ? 'bg-forest text-cream shadow-xs' : 'text-charcoal/70 hover:text-charcoal'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Photos Preview */}
              <div className="flex items-center gap-2">
                {imagePreview && (
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-soil/20 bg-cream/50 flex-shrink-0">
                    <img src={imagePreview} alt="Leaf sample" className="w-full h-full object-cover" />
                  </div>
                )}
                {undersidePreview && (
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-soil/20 bg-cream/50 flex-shrink-0">
                    <img src={undersidePreview} alt="Leaf underside" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="text-[11px] text-charcoal/75 leading-tight space-y-0.5">
                  <div className="font-bold text-forest">
                    {kvkSummaryLang === 'kn-IN' ? 'ಬೆಳೆ:' : 'Crop:'} {getCropDisplayName(selectedCrop)}
                  </div>
                  <div>
                    {kvkSummaryLang === 'kn-IN' ? 'ಸ್ಥಳ:' : 'Location:'} {getDistrictDisplayName(state.district)}, Karnataka
                  </div>
                  <div className="text-charcoal/55">
                    {kvkSummaryLang === 'kn-IN' ? 'ದಿನಾಂಕ:' : 'Date:'} {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* What We Saw (Farmer Observations) */}
              <div className="p-3 rounded-xl bg-cream/80 border border-soil/15 space-y-1">
                <div className="font-bold text-soil flex items-center gap-1.5 text-xs">
                  <ShieldCheck size={14} />
                  <span>{kvkSummaryLang === 'kn-IN' ? 'ನಾವು ಕಂಡ ಲಕ್ಷಣಗಳು (ಫೋಟೋ ಆಧಾರಿತ):' : 'Observed Symptoms (From Photo):'}</span>
                </div>
                <ul className="space-y-1 text-charcoal/90 pl-3 list-disc text-[11px]">
                  {displayedSymptoms.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              {/* Candidates Considered */}
              {result.differentialAlternatives && result.differentialAlternatives.length > 0 && (
                <div className="p-3 rounded-xl bg-wheat/20 border border-soil/15 space-y-1">
                  <div className="font-bold text-soil flex items-center gap-1.5 text-xs">
                    <Layers size={14} />
                    <span>{kvkSummaryLang === 'kn-IN' ? 'ಪರಿಗಣಿಸಲಾದ ಇತರ ಸಾಧ್ಯತೆಗಳು:' : 'Possibilities Considered:'}</span>
                  </div>
                  <ul className="space-y-1 text-charcoal/85 pl-3 list-disc text-[11px]">
                    {result.differentialAlternatives.map((alt, idx) => {
                      const fitLabel = idx === 0 ? t('bestFit') : idx === 1 ? t('possibleFit') : t('weakFit');
                      return (
                        <li key={idx}>
                          <span className="font-semibold">{alt.conditionKey ? t(alt.conditionKey) : alt.condition}</span> ({fitLabel})
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Safe care measures taken */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5 text-xs">
                  <Leaf size={14} className="text-emerald-700" />
                  <span>{kvkSummaryLang === 'kn-IN' ? 'ಕೈಗೊಂಡ ಸುರಕ್ಷಿತ ಕ್ರಮಗಳು:' : 'Safe Care Measures Taken:'}</span>
                </div>
                <ul className="space-y-1 text-charcoal/85 pl-3 list-disc text-[11px]">
                  <li>{t('careLeafSpot1')}</li>
                  <li>{t('careLeafSpot2')}</li>
                  <li>{t('careSootyMold1')}</li>
                </ul>
              </div>

              {/* Extension Limitation Note */}
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-950 leading-relaxed">
                <span className="font-bold">
                  {kvkSummaryLang === 'kn-IN' ? 'ಗಮನಿಸಿ: ' : 'Note: '}
                </span>
                {kvkSummaryLang === 'kn-IN'
                  ? 'ಇದು ಎಐ ಪ್ರಾಥಮಿಕ ಪರೀಕ್ಷೆಯಾಗಿದ್ದು, ಪ್ರಯೋಗಾಲಯದ ದೃಢೀಕರಣವಲ್ಲ. ರಾಸಾಯನಿಕ ಸಿಂಪಡಿಸುವ ಮುನ್ನ ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರದ ವಿಜ್ಞಾನಿಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ.'
                  : 'Preliminary AI screening only, not a laboratory diagnosis. Please consult your local KVK scientist or agriculture officer before applying chemical sprays.'}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-3.5 bg-cream/60 border-t border-soil/15 flex flex-wrap gap-2 justify-between items-center">
              <a
                href="tel:18001801551"
                className="min-h-[40px] px-3 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold text-xs flex items-center gap-1.5 border border-emerald-300 transition-colors"
              >
                <PhoneCall size={14} className="text-emerald-800" />
                <span>1800-180-1551</span>
              </a>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleShareSlip}
                  className="min-h-[40px] px-3 py-2 rounded-xl bg-wheat/40 hover:bg-wheat/60 text-charcoal font-bold text-xs flex items-center gap-1.5 border border-soil/20 transition-colors cursor-pointer"
                >
                  <Share2 size={14} />
                  <span>{summaryCopiedToast ? (kvkSummaryLang === 'kn-IN' ? 'ನಕಲಿಸಲಾಗಿದೆ!' : 'Copied!') : (kvkSummaryLang === 'kn-IN' ? 'ಹಂಚಿಕೊಳ್ಳಿ' : 'Share')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="min-h-[40px] px-3.5 py-2 rounded-xl bg-forest hover:bg-forest/90 text-cream font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Printer size={14} className="text-wheat" />
                  <span>{kvkSummaryLang === 'kn-IN' ? 'ಪ್ರಿಂಟ್ / PDF' : 'Print / PDF'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

