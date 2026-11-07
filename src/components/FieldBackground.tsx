import { useEffect, useState } from 'react';

interface FieldBackgroundProps {
  intensity?: 'full' | 'subtle';
  motion?: 'on' | 'reduced' | 'off';
  className?: string;
}

export function FieldBackground({
  intensity = 'full',
  motion = 'on',
  className = '',
}: FieldBackgroundProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  const shouldAnimate = motion === 'on' && !prefersReducedMotion;
  const isReduced = motion === 'reduced' || prefersReducedMotion;

  if (intensity === 'subtle') {
    return (
      <div
        className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        {/* Subtle organic soil-grain & furrow pattern (3-5% opacity) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.035]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="subtle-furrows" width="60" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M0 20 Q 15 15, 30 20 T 60 20"
                fill="none"
                stroke="#6B4E37"
                strokeWidth="1"
              />
              <circle cx="15" cy="8" r="0.8" fill="#2D4A3E" />
              <circle cx="45" cy="32" r="0.8" fill="#2D4A3E" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#subtle-furrows)" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* Sky wash: Warm cream (#FAF7F2) grading into gentle wheat/tan (#D4C19C) at horizon */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-[#F6EFE5] to-[#EBDDC5]/80" />

      {/* Ambient subtle golden dawn glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-b from-amber-100/30 to-transparent blur-3xl" />

      {/* SVG Farmland landscape with rolling furrows & organic plant line-art */}
      <svg
        className="absolute bottom-0 left-0 w-full h-auto min-h-[180px] max-h-[260px] object-cover pointer-events-none"
        viewBox="0 0 430 220"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle gradient for back hills */}
          <linearGradient id="backHills" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4C19C" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#C2AC82" stopOpacity="0.6" />
          </linearGradient>

          {/* Earth gradient for foreground rolling soil furrows */}
          <linearGradient id="foreFurrows" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8A674B" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#6B4E37" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#543C29" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* Back rolling ridge */}
        <path
          d="M 0 135 Q 110 100, 220 120 T 430 110 L 430 220 L 0 220 Z"
          fill="url(#backHills)"
        />

        {/* Middle rolling farmland ridge */}
        <path
          d="M 0 150 Q 90 135, 190 148 T 430 140 L 430 220 L 0 220 Z"
          fill="#BCA67B"
          fillOpacity="0.3"
        />

        {/* Rolling soil furrows along bottom third */}
        <path
          d="M 0 170 Q 120 155, 230 172 T 430 162 L 430 220 L 0 220 Z"
          fill="url(#foreFurrows)"
        />

        {/* Furrow contour lines with organic waves */}
        <path
          d="M -10 178 Q 110 162, 230 180 T 440 170"
          fill="none"
          stroke="#6B4E37"
          strokeWidth="1.2"
          strokeOpacity="0.35"
        />
        <path
          d="M -10 192 Q 130 178, 250 194 T 440 184"
          fill="none"
          stroke="#543C29"
          strokeWidth="1.2"
          strokeOpacity="0.3"
        />
        <path
          d="M -10 206 Q 120 195, 260 208 T 440 198"
          fill="none"
          stroke="#3E2B1B"
          strokeWidth="1.5"
          strokeOpacity="0.25"
        />
      </svg>

      {/* Line-art Wheat Stalks & Leaf Motifs placed strictly off to the sides (never behind center text or buttons) */}
      <div
        className={`absolute bottom-6 left-3 w-16 h-36 pointer-events-none opacity-40 text-forest ${
          shouldAnimate ? 'animate-ambient-slow' : isReduced ? 'opacity-35' : ''
        }`}
      >
        <svg viewBox="0 0 60 140" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Main wheat stalk */}
          <path d="M 28 140 C 28 90, 26 50, 30 10" strokeLinecap="round" />
          {/* Grains / awns */}
          <path d="M 30 15 C 24 10, 16 14, 18 20 C 22 24, 28 22, 30 20" fill="#2D4A3E" fillOpacity="0.25" />
          <path d="M 30 25 C 36 20, 44 24, 42 30 C 38 34, 32 32, 30 30" fill="#2D4A3E" fillOpacity="0.25" />
          <path d="M 30 35 C 24 30, 16 34, 18 40 C 22 44, 28 42, 30 40" fill="#2D4A3E" fillOpacity="0.25" />
          <path d="M 30 45 C 36 40, 44 44, 42 50 C 38 54, 32 52, 30 50" fill="#2D4A3E" fillOpacity="0.25" />
          <path d="M 29 58 C 23 54, 16 60, 20 66 C 24 68, 28 64, 29 62" fill="#2D4A3E" fillOpacity="0.2" />
        </svg>
      </div>

      <div
        className={`absolute bottom-8 right-3 w-14 h-32 pointer-events-none opacity-35 text-[#6B4E37] ${
          shouldAnimate ? 'animate-ambient-reverse' : isReduced ? 'opacity-30' : ''
        }`}
      >
        <svg viewBox="0 0 50 120" fill="none" stroke="currentColor" strokeWidth="1.4">
          {/* Organic sprout stem */}
          <path d="M 25 120 C 25 80, 22 40, 28 15" strokeLinecap="round" />
          {/* Leaf pair */}
          <path d="M 28 35 C 18 25, 8 32, 12 42 C 18 48, 26 42, 28 38" fill="#6B4E37" fillOpacity="0.2" />
          <path d="M 27 55 C 37 45, 47 52, 43 62 C 37 68, 29 62, 27 58" fill="#6B4E37" fillOpacity="0.2" />
          <path d="M 26 78 C 17 70, 9 78, 14 86 C 19 90, 25 84, 26 80" fill="#6B4E37" fillOpacity="0.15" />
        </svg>
      </div>
    </div>
  );
}
