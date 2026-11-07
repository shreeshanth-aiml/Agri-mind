import { useState } from 'react';
import { useAppContext } from '../lib/store';
import { MOCK_WEATHER, SOIL_DB, DISTRICTS_KANNADA } from '../lib/mockData';
import { useTranslation } from '../lib/translations';
import { LanguageToggle } from '../components/LanguageToggle';
import { ProfileModal } from '../components/ProfileModal';
import {
  CloudRain,
  ShieldCheck,
  ThermometerSun,
  MapPin,
  TestTube,
  Calendar,
  Sparkles,
  User,
  Sprout,
  Bug,
  TrendingUp,
  CircleDollarSign,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Dashboard() {
  const { state, updateState, switchTab } = useAppContext();
  const { t, currentLang } = useTranslation(state.language);
  const [showProfile, setShowProfile] = useState(false);

  const weather = MOCK_WEATHER.current;
  const soil = state.soilProfile || SOIL_DB[state.district] || SOIL_DB['Default'];
  const districtDisplay =
    currentLang === 'kn-IN'
      ? DISTRICTS_KANNADA[state.district] || state.district
      : state.district;

  return (
    <div className="p-4 pb-24 space-y-6 w-full max-w-lg md:max-w-3xl lg:max-w-6xl mx-auto relative z-10">
      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />

      {/* Top Header (Visible on mobile/tablet or when standalone) */}
      <header className="flex justify-between items-start pb-2 border-b border-soil/10 lg:hidden">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black text-forest tracking-tight">{t('appName')}</span>
            <span className="text-[10px] bg-wheat/50 text-soil px-2 py-0.5 rounded-full font-semibold border border-soil/20">
              {t('stateSubtitle')}
            </span>
          </div>
          <div className="flex flex-wrap items-center text-xs text-charcoal/80 mt-1 gap-1">
            <MapPin size={13} className="text-forest flex-shrink-0" />
            <select
              value={state.district}
              onChange={(e) => updateState({ district: e.target.value })}
              className="bg-wheat/20 font-semibold text-charcoal rounded px-1.5 py-0.5 border border-soil/20 focus:outline-none focus:border-forest text-xs cursor-pointer"
            >
              {Object.entries(DISTRICTS_KANNADA).map(([en, kn]) => (
                <option key={en} value={en}>
                  {currentLang === 'kn-IN' ? `${kn} (${en})` : `${en} (${kn})`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-1.5">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowProfile(true)}
              className="w-7 h-7 rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center text-forest hover:bg-forest hover:text-cream transition-colors cursor-pointer"
              title="Farmer Profile & Settings"
              aria-label="Profile and Settings"
            >
              <User size={14} />
            </button>
            <LanguageToggle />
          </div>

          <div className="flex items-center space-x-1 text-[11px] text-charcoal/70">
            <Calendar size={12} className="text-soil" />
            <select
              value={state.season}
              onChange={(e) => updateState({ season: e.target.value as any })}
              className="bg-transparent font-medium text-forest underline cursor-pointer"
            >
              <option value="Kharif">{t('kharif')}</option>
              <option value="Rabi">{t('rabi')}</option>
              <option value="Zaid">{t('zaid')}</option>
            </select>
          </div>
        </div>
      </header>

      {/* Hero Banner: Overall Crop Safety Score (Spans full width at top) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-forest text-cream rounded-2xl p-5 md:p-6 shadow-sm relative overflow-hidden"
      >
        <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
          <ShieldCheck size={160} />
        </div>

        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center space-x-1.5">
              <Sparkles size={15} className="text-wheat animate-pulse" />
              <h2 className="text-cream/80 text-xs md:text-sm font-semibold uppercase tracking-wider">
                {t('safetyScore')}
              </h2>
            </div>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl md:text-4xl font-extrabold text-cream">82</span>
              <span className="text-cream/60 text-sm md:text-base">/ 100</span>
              <span className="text-xs font-semibold bg-emerald-700/60 text-emerald-200 px-2.5 py-0.5 rounded-full ml-1">
                {t('favorable')}
              </span>
            </div>
          </div>
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-cream/10 flex items-center justify-center border border-cream/20">
            <ShieldCheck size={28} className="text-wheat" />
          </div>
        </div>

        <p className="text-xs md:text-sm text-cream/90 leading-relaxed max-w-2xl">
          {currentLang === 'kn-IN'
            ? `${districtDisplay} ಜಿಲ್ಲೆಯಲ್ಲಿ ಉತ್ತಮ ಬೆಳೆ ಬೆಳವಣಿಗೆಯ ವಾತಾವರಣವಿದೆ. ಕೀಟ ಬಾಧೆ ನಿಯಂತ್ರಣದಲ್ಲಿದ್ದು, ಬೇರು ವಲಯದಲ್ಲಿ ಸಾಕಷ್ಟು ತೇವಾಂಶವಿದೆ.`
            : `Favorable growing conditions in ${districtDisplay}. Low regional pest pressure, optimal daytime solar radiation, and balanced root-zone moisture.`}
        </p>

        <div className="mt-4 pt-3 border-t border-cream/15 flex justify-between items-center text-[11px] md:text-xs text-cream/70">
          <span>{t('safetySource')}</span>
          <span className="font-medium text-cream/90">{t('updatedToday')}</span>
        </div>
      </motion.div>

      {/* All Dashboards & Modules Hub (4 columns on desktop, 2 on mobile/tablet) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between px-0.5">
          <h3 className="text-xs md:text-sm font-bold text-soil uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={14} className="text-forest" />
            <span>{currentLang === 'kn-IN' ? 'ಎಲ್ಲಾ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗಳು ಮತ್ತು ಪರಿಕರಗಳು' : 'All Dashboards & Tools'}</span>
          </h3>
          <span className="text-[10px] md:text-xs text-charcoal/60 font-medium">
            {currentLang === 'kn-IN' ? 'ನೇರ ಪ್ರವೇಶ' : 'Tap to Open'}
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {/* 1. Crop Advisory */}
          <button
            type="button"
            onClick={() => switchTab('crop')}
            className="p-4 rounded-2xl bg-white border border-soil/20 hover:border-forest shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer active:scale-[0.98] min-h-[110px]"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <div className="w-10 h-10 rounded-xl bg-forest/10 border border-forest/20 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-cream transition-colors">
                <Sprout size={20} />
              </div>
              <ArrowRight size={15} className="text-charcoal/40 group-hover:text-forest group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h4 className="text-xs md:text-sm font-bold text-charcoal leading-snug group-hover:text-forest">
                {t('cropTab')}
              </h4>
              <p className="text-[10px] md:text-xs text-charcoal/65 mt-0.5 leading-snug">
                {currentLang === 'kn-IN' ? 'ಮಣ್ಣು ಮತ್ತು ಮಳೆ ಆಧಾರಿತ ಬೆಳೆ ಸಲಹೆ' : 'NPK & seasonal crop suitability'}
              </p>
            </div>
          </button>

          {/* 2. Disease Clinic */}
          <button
            type="button"
            onClick={() => switchTab('disease')}
            className="p-4 rounded-2xl bg-white border border-soil/20 hover:border-emerald-600 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer active:scale-[0.98] min-h-[110px]"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 group-hover:bg-emerald-700 group-hover:text-cream transition-colors">
                <Bug size={20} />
              </div>
              <ArrowRight size={15} className="text-charcoal/40 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h4 className="text-xs md:text-sm font-bold text-charcoal leading-snug group-hover:text-emerald-800">
                {t('diseaseTab')}
              </h4>
              <p className="text-[10px] md:text-xs text-charcoal/65 mt-0.5 leading-snug">
                {currentLang === 'kn-IN' ? 'ಎಲೆ ಫೋಟೋ ಸ್ಕ್ಯಾನ್ ಮತ್ತು ಸುರಕ್ಷಿತ ಚಿಕಿತ್ಸೆ' : 'Leaf photo scan & safe care'}
              </p>
            </div>
          </button>

          {/* 3. Yield Forecast */}
          <button
            type="button"
            onClick={() => switchTab('yield')}
            className="p-4 rounded-2xl bg-white border border-soil/20 hover:border-soil shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer active:scale-[0.98] min-h-[110px]"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <div className="w-10 h-10 rounded-xl bg-wheat/40 border border-soil/20 flex items-center justify-center text-soil group-hover:bg-soil group-hover:text-cream transition-colors">
                <TrendingUp size={20} />
              </div>
              <ArrowRight size={15} className="text-charcoal/40 group-hover:text-soil group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h4 className="text-xs md:text-sm font-bold text-charcoal leading-snug group-hover:text-soil">
                {t('yieldTab')}
              </h4>
              <p className="text-[10px] md:text-xs text-charcoal/65 mt-0.5 leading-snug">
                {currentLang === 'kn-IN' ? 'ಉಪಗ್ರಹ ಆಧಾರಿತ ಇಳುವರಿ ಅಂದಾಜು' : 'Satellite NDVI harvest models'}
              </p>
            </div>
          </button>

          {/* 4. Mandi & ROI */}
          <button
            type="button"
            onClick={() => switchTab('market')}
            className="p-4 rounded-2xl bg-white border border-soil/20 hover:border-amber-600 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer active:scale-[0.98] min-h-[110px]"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 group-hover:bg-amber-700 group-hover:text-cream transition-colors">
                <CircleDollarSign size={20} />
              </div>
              <ArrowRight size={15} className="text-charcoal/40 group-hover:text-amber-800 group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h4 className="text-xs md:text-sm font-bold text-charcoal leading-snug group-hover:text-amber-800">
                {t('marketTab')}
              </h4>
              <p className="text-[10px] md:text-xs text-charcoal/65 mt-0.5 leading-snug">
                {currentLang === 'kn-IN' ? 'ಎಪಿಎಂಸಿ ದರ ಮತ್ತು ಲಾಭ ಲೆಕ್ಕಾಚಾರ' : 'Live APMC rates & farm ROI'}
              </p>
            </div>
          </button>
        </div>
      </motion.div>

      {/* Multi-Column Summary Grid: 3 columns on wide screens, 2 on medium */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1: Weather */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-white rounded-2xl p-4 md:p-5 border border-soil/15 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center space-x-1.5 text-forest mb-2">
              <ThermometerSun size={20} />
              <h3 className="font-semibold text-xs md:text-sm uppercase tracking-wider">{t('weatherTitle')}</h3>
            </div>
            <div className="text-3xl font-bold text-charcoal">{weather.temp}°C</div>
            <div className="text-xs md:text-sm text-charcoal/70 font-medium mt-0.5">
              {currentLang === 'kn-IN'
                ? weather.condition === 'Partly Cloudy'
                  ? 'ಭಾಗಶಃ ಮೋಡ'
                  : weather.condition
                : weather.condition}
            </div>
            <div className="text-[11px] md:text-xs text-charcoal/50 mt-1">
              {t('humidity')}: {weather.humidity}%
            </div>
          </div>
          <div className="text-[10px] md:text-xs text-forest font-semibold mt-4 pt-2.5 border-t border-soil/10 flex items-center justify-between">
            <span>{t('liveForecast')}</span>
            <span>4-Day</span>
          </div>
        </motion.div>

        {/* Card 2: Soil Health */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="bg-white rounded-2xl p-4 md:p-5 border border-soil/15 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center space-x-1.5 text-soil mb-2">
              <TestTube size={20} />
              <h3 className="font-semibold text-xs md:text-sm uppercase tracking-wider">{t('soilHealthTitle')}</h3>
            </div>
            <div className="text-lg font-bold text-charcoal truncate" title={soil.type}>
              {soil.type}
            </div>
            <div className="text-xs md:text-sm text-charcoal/70 mt-1">
              pH: <span className="font-semibold text-charcoal">{soil.ph}</span> • N:{' '}
              <span className="font-semibold text-charcoal">{soil.n}</span>
            </div>
            <div className="text-[11px] md:text-xs text-charcoal/50 mt-1">
              P: {soil.p} • K: {soil.k}
            </div>
          </div>
          <div className="text-[10px] md:text-xs text-soil font-semibold mt-4 pt-2.5 border-t border-soil/10 flex items-center justify-between">
            <span>{state.soilProfile ? t('testedData') : t('estimatedData')}</span>
            <span>{t('favorable')}</span>
          </div>
        </motion.div>

        {/* Card 3: Action Required Alert Box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-wheat/25 rounded-2xl p-4 md:p-5 border border-wheat/60 shadow-xs flex flex-col justify-between md:col-span-2 lg:col-span-1"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-soil">
                <CloudRain size={20} className="text-soil" />
                <h3 className="font-bold text-sm text-soil">{t('actionRequired')}</h3>
              </div>
              <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                {t('rainWarningTitle')}
              </span>
            </div>
            <p className="text-xs md:text-sm text-charcoal/85 leading-relaxed">
              {currentLang === 'kn-IN'
                ? `${districtDisplay} ಜಿಲ್ಲೆಯಲ್ಲಿ ಬುಧವಾರ ಮಧ್ಯಾಹ್ನ ಮಳೆಯಾಗುವ ಮುನ್ಸೂಚನೆ ಇದೆ. ನೀರಿನ ನಷ್ಟ ತಡೆಯಲು ಕೀಟನಾಶಕ ಸಿಂಪಡಣೆ ಅಥವಾ ಯೂರಿಯಾ ಗೊಬ್ಬರ ನೀಡುವುದನ್ನು ಮಳೆಯ ನಂತರಕ್ಕೆ ಮುಂದೂಡಿ.`
                : `Rain expected on Wednesday afternoon across ${districtDisplay}. Consider delaying foliar pesticide or urea top-dressing to prevent runoff losses. Ensure field drainage channels are clear.`}
            </p>
          </div>
          <div className="text-[10px] text-soil font-semibold mt-3 pt-2 border-t border-wheat/50">
            {t('rainWarningDesc')}
          </div>
        </motion.div>
      </div>

      {/* Weekly Forecast Mini Strip (Full Width below 3-col summary) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white rounded-2xl p-4 md:p-5 border border-soil/10 shadow-xs"
      >
        <h3 className="text-xs md:text-sm font-bold text-charcoal/80 uppercase tracking-wider mb-3">
          {t('fourDayOutlook')}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
          {MOCK_WEATHER.forecast.map((item, idx) => {
            const dayTranslation =
              currentLang === 'kn-IN'
                ? { Mon: 'ಸೋಮ', Tue: 'ಮಂಗಳ', Wed: 'ಬುಧ', Thu: 'ಗುರು' }[item.day] || item.day
                : item.day;
            const condTranslation =
              currentLang === 'kn-IN'
                ? { Sunny: 'ಬಿಸಿಲು', Rain: 'ಮಳೆ', Cloudy: 'ಮೋಡ' }[item.condition] || item.condition
                : item.condition;

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border ${
                  item.condition === 'Rain'
                    ? 'bg-sky-50 border-sky-200 text-sky-900'
                    : 'bg-cream/50 border-soil/10 text-charcoal'
                }`}
              >
                <div className="text-xs font-bold text-charcoal/70">{dayTranslation}</div>
                <div className="text-xl font-extrabold my-1">{item.temp}°</div>
                <div className="text-xs font-medium truncate">{condTranslation}</div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
