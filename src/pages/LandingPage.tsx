import { ReactNode } from 'react';
import { useAppContext, ActiveTab } from '../lib/store';
import { useTranslation } from '../lib/translations';
import { FieldBackground } from '../components/FieldBackground';
import { LanguageToggle } from '../components/LanguageToggle';
import {
  Sprout,
  ShieldCheck,
  TrendingUp,
  CircleDollarSign,
  Bug,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';

export default function LandingPage() {
  const { state, navigateTo, switchTab } = useAppContext();
  const { currentLang } = useTranslation(state.language);

  const isKannada = currentLang === 'kn-IN';

  const keyFeatures: {
    icon: ReactNode;
    title: string;
    desc: string;
    tab: ActiveTab;
  }[] = [
    {
      icon: <Smartphone className="text-forest" size={20} />,
      title: isKannada ? 'ಮೊಬೈಲ್ ಮಾತ್ರ — ಶೂನ್ಯ ಹಾರ್ಡ್‌ವೇರ್' : 'Zero-Hardware Phone Decision Support',
      desc: isKannada
        ? 'ಯಾವುದೇ ಸಂವೇದಕಗಳ ಅಗತ್ಯವಿಲ್ಲ. ಫೋನ್ ಕ್ಯಾಮೆರಾ ಮತ್ತು ಮಣ್ಣಿನ ಕಾರ್ಡ್ ವಿವರಗಳಿಂದ ನೇರ ಕೃಷಿ ನಿರ್ಧಾರ.'
        : 'No IoT sensors needed. All intelligence driven by phone camera and soil health card.',
      tab: 'crop',
    },
    {
      icon: <CircleDollarSign className="text-soil" size={20} />,
      title: isKannada ? 'ಕರ್ನಾಟಕ ಎಪಿಎಂಸಿ ನೇರ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ' : 'Real-Time Karnataka APMC Mandi Prices',
      desc: isKannada
        ? '೩೧ ಜಿಲ್ಲೆಗಳ ಎಪಿಎಂಸಿ ದರಗಳು, ೨ ವಾರಗಳ ಮುನ್ಸೂಚನೆ ಹಾಗೂ ನಿಖರ ಲಾಭದ ಲೆಕ್ಕಾಚಾರ.'
        : 'District-level modal mandi auctions, 2-week baseline trend forecast, and ROI scenario analysis.',
      tab: 'market',
    },
    {
      icon: <Bug className="text-forest" size={20} />,
      title: isKannada ? 'ತತ್ಕ್ಷಣದ ಎಲೆ ರೋಗ ತಪಾಸಣೆ' : 'Camera-First Leaf Disease Clinic',
      desc: isKannada
        ? 'ಎಲೆಯ ಫೋಟೋ ತೆಗೆದು ತಕ್ಷಣ ರೋಗ ಪತ್ತೆ ಮಾಡಿ, ಕಡಿಮೆ ವೆಚ್ಚದ ಚಿಕಿತ್ಸೆ ಮತ್ತು ತಡೆಗಟ್ಟುವ ಸಲಹೆ ಪಡೆಯಿರಿ.'
        : 'Snap leaf photos for instant diagnosis, severity rating, and low-cost verified treatments.',
      tab: 'disease',
    },
    {
      icon: <TrendingUp className="text-soil" size={20} />,
      title: isKannada ? 'ಉಪಗ್ರಹ ಆಧಾರಿತ ಇಳುವರಿ ಮುನ್ಸೂಚನೆ' : 'Satellite-Grounded Yield Forecasting',
      desc: isKannada
        ? 'ಸೆಂಟಿನೆಲ್-೨ ಉಪಗ್ರಹ ಹಸಿರು ಸೂಚ್ಯಂಕ ಮತ್ತು ಹವಾಮಾನ ಆಧರಿಸಿ ವಿಶ್ವಾಸಾರ್ಹ ಇಳುವರಿ ಅಂದಾಜು.'
        : 'Sentinel-2 vegetation health and weather features drive calibrated yield confidence ranges.',
      tab: 'yield',
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-forest/20 text-charcoal">
      {/* Reusable Nature Field Background with gentle ambient drift */}
      <FieldBackground intensity="full" motion="on" />

      {/* Header bar with Language Toggle */}
      <header className="relative z-10 p-4 max-w-lg mx-auto w-full flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-forest/10 border border-forest/20 flex items-center justify-center text-forest">
            <Sprout size={18} />
          </div>
          <span className="font-extrabold text-forest text-lg tracking-tight">AgriMind</span>
        </div>

        {/* Prominent Language Selector for low-literacy farmers right on first screen */}
        <LanguageToggle variant="compact" />
      </header>

      {/* Main Landing Content */}
      <main className="relative z-10 px-5 py-4 max-w-lg mx-auto w-full flex-1 flex flex-col justify-center">
        {/* Hero Section */}
        <div className="text-center space-y-3 pt-2 pb-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/80 border border-soil/20 shadow-xs mb-1 text-forest"
          >
            <Sprout size={34} strokeWidth={1.75} />
          </motion.div>

          <motion.h1
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-3xl font-black text-forest tracking-tight"
          >
            AgriMind
          </motion.h1>

          <motion.p
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-sm font-semibold text-charcoal/80 max-w-xs mx-auto leading-snug"
          >
            {isKannada
              ? 'ನಿಮ್ಮ ಮೊಬೈಲ್‌ನಿಂದಲೇ ನಿಖರ, ವಿಶ್ವಾಸಾರ್ಹ ಕೃಷಿ ನಿರ್ಧಾರಗಳು'
              : 'Smart farming decisions, from your phone'}
          </motion.p>

          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-wheat/30 border border-soil/20 text-soil text-[11px] font-bold"
          >
            <Sparkles size={12} className="text-soil" />
            <span>
              {isKannada
                ? 'ಕರ್ನಾಟಕದ ೩೧ ಜಿಲ್ಲೆಗಳಿಗೆ ಪ್ರತ್ಯೇಕ ವಿಶ್ಲೇಷಣೆ'
                : 'Built for Karnataka Farmers • 31 Districts'}
            </span>
          </motion.div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="space-y-2.5 my-3">
          {keyFeatures.map((item, idx) => (
            <motion.button
              key={idx}
              type="button"
              onClick={() => switchTab(item.tab)}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + idx * 0.06 }}
              className="w-full bg-white/85 hover:bg-white backdrop-blur-xs rounded-xl p-3 border border-soil/15 hover:border-forest shadow-xs hover:shadow-md transition-all flex items-center justify-between text-left cursor-pointer group active:scale-[0.98]"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-cream border border-soil/10 flex-shrink-0 mt-0.5 group-hover:bg-forest/10 transition-colors">
                  {item.icon}
                </div>
                <div className="space-y-0.5">
                  <h2 className="text-xs font-bold text-charcoal group-hover:text-forest transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-[11px] text-charcoal/70 leading-relaxed">{item.desc}</p>
                </div>
              </div>
              <ArrowRight
                size={15}
                className="text-charcoal/30 group-hover:text-forest group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2"
              />
            </motion.button>
          ))}
        </div>

        {/* Trust & Transparency Badge */}
        <div className="flex items-center justify-center space-x-3 text-[10px] text-soil/80 font-medium py-2">
          <span className="flex items-center space-x-1">
            <CheckCircle2 size={12} className="text-forest" />
            <span>{isKannada ? 'ನೇರ ಮಂಡಿ ದತ್ತಾಂಶ' : 'Live Mandi Data'}</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <ShieldCheck size={12} className="text-forest" />
            <span>{isKannada ? 'ಉಪಗ್ರಹ ಮೇಲ್ವಿಚಾರಣೆ' : 'Satellite Verified'}</span>
          </span>
          <span>•</span>
          <span>{isKannada ? 'ಧ್ವನಿ ಸೌಲಭ್ಯ' : 'Voice Enabled'}</span>
        </div>

        {/* Action CTAs */}
        <div className="space-y-2 pt-3 pb-6">
          <button
            onClick={() => navigateTo('login')}
            className="w-full h-12 bg-forest text-cream font-bold text-sm rounded-xl shadow-sm hover:opacity-95 active:scale-[0.97] transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>{isKannada ? 'ಪ್ರಾರಂಭಿಸಿ' : 'Get Started'}</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => navigateTo('app')}
            className="w-full py-2.5 text-center text-xs font-semibold text-charcoal/70 hover:text-forest transition-colors cursor-pointer"
          >
            {isKannada ? 'ಖಾತೆ ಇಲ್ಲದೆ ಮುಂದುವರಿಯಿರಿ (ಡೆಮೊ ಮೋಡ್)' : 'Continue as Guest (Demo Mode)'}
          </button>
        </div>
      </main>

      {/* Footer Credibility Tag */}
      <footer className="relative z-10 py-3 text-center text-[10px] text-charcoal/50 border-t border-soil/10 bg-cream/40">
        AgriMind Decision Support System • Data: Karnataka APMC, IMD, Sentinel-2
      </footer>
    </div>
  );
}
