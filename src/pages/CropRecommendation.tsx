import { useState } from 'react';
import { useAppContext } from '../lib/store';
import { SOIL_DB, DISTRICTS_KANNADA } from '../lib/mockData';
import { callGemini } from '../lib/gemini';
import { speak } from '../lib/voice';
import { useTranslation } from '../lib/translations';
import { LanguageToggle } from '../components/LanguageToggle';
import {
  Sprout,
  Volume2,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  Droplets,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { motion } from 'motion/react';

interface CropItem {
  name: string;
  suitability: number;
  source: string;
  reason: string;
  irrigation: string;
  waterFreq: string;
  factors: {
    soil: number;
    climate: number;
    market: number;
  };
}

export default function CropRecommendation() {
  const { state, updateState } = useAppContext();
  const { t, currentLang } = useTranslation(state.language);
  const [loading, setLoading] = useState(false);
  const [crops, setCrops] = useState<CropItem[] | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const soil = state.soilProfile || SOIL_DB[state.district] || SOIL_DB['Default'];

  const getRecommendations = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const prompt = `Farmer profile: District ${state.district} (${
        DISTRICTS_KANNADA[state.district] || state.district
      }), Karnataka. 
Language: ${state.language === 'kn-IN' ? 'Kannada' : 'English'}.
Season: ${state.season}. 
Soil: ${soil.type}, pH ${soil.ph}, N: ${soil.n}, P: ${soil.p}, K: ${soil.k}.
Recommend the top 3 crops. Provide output in STRICT JSON format matching this structure:
{
  "crops": [
    {
      "name": "string (with Kannada name if Kannada selected)",
      "suitability": 0-100,
      "source": "🤖 AI-estimated",
      "reason": "short explanation",
      "irrigation": "method",
      "waterFreq": "frequency",
      "factors": { "soil": 0-100, "climate": 0-100, "market": 0-100 }
    }
  ]
}`;

      const res = await callGemini({
        prompt,
        isJSON: true,
      });

      if (res && Array.isArray(res.crops) && res.crops.length > 0) {
        setCrops(res.crops);
      } else {
        throw new Error('Could not parse crop recommendation list');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        currentLang === 'kn-IN'
          ? 'ಬೆಳೆ ಶಿಫಾರಸು ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ.'
          : 'Could not fetch recommendations at this moment. Tap retry or adjust district.'
      );
    } finally {
      setLoading(false);
    }
  };

  const resetRecommendations = () => {
    setCrops(null);
    setExpandedIndex(null);
    setErrorMsg(null);
  };

  const handleReadout = (crop: CropItem) => {
    const textToSpeak =
      currentLang === 'kn-IN'
        ? `${crop.name}. ಸೂಕ್ತತೆಯ ಅಂಕ ಶೇಕಡಾ ${crop.suitability}. ನೀರಾವರಿ ಪದ್ಧತಿ: ${crop.irrigation}. ಶಿಫಾರಸಿನ ವಿವರ: ${crop.reason}`
        : `${crop.name}. Suitability score: ${crop.suitability} percent. Recommended irrigation: ${crop.irrigation}, frequency: ${crop.waterFreq}. Why recommended: ${crop.reason}`;
    speak(textToSpeak, state.language);
  };

  return (
    <div className="p-4 pb-24 space-y-6 w-full max-w-lg md:max-w-3xl lg:max-w-6xl mx-auto relative z-10">
      {/* Header */}
      <header className="flex justify-between items-center pb-2 border-b border-soil/10">
        <div>
          <h1 className="text-2xl font-bold text-forest flex items-center gap-2">
            <Sprout className="text-forest" size={26} />
            {t('cropAdvisoryTitle')}
          </h1>
          <p className="text-xs text-charcoal/70">{t('cropAdvisorySubtitle')}</p>
        </div>
        <LanguageToggle variant="compact" />
      </header>

      {/* 2-Column Responsive Layout: Left (Inputs & Soil Parameters) & Right (Recommendations) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: District, Season, Soil Profile and Trigger */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-soil/15 shadow-xs space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-charcoal/70 block uppercase tracking-wider mb-1">
                  {t('selectDistrict')}
                </label>
                <select
                  value={state.district}
                  onChange={(e) => {
                    updateState({ district: e.target.value });
                    setCrops(null);
                  }}
                  className="w-full bg-cream border border-soil/20 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-forest text-charcoal cursor-pointer"
                >
                  {Object.entries(DISTRICTS_KANNADA).map(([en, kn]) => (
                    <option key={en} value={en}>
                      {currentLang === 'kn-IN' ? `${kn} (${en})` : `${en} (${kn})`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-charcoal/70 block uppercase tracking-wider mb-1">
                  {t('selectSeason')}
                </label>
                <select
                  value={state.season}
                  onChange={(e) => {
                    updateState({ season: e.target.value as any });
                    setCrops(null);
                  }}
                  className="w-full bg-cream border border-soil/20 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-forest text-charcoal cursor-pointer"
                >
                  <option value="Kharif">{t('kharif')}</option>
                  <option value="Rabi">{t('rabi')}</option>
                  <option value="Zaid">{t('zaid')}</option>
                </select>
              </div>
            </div>

            <div className="bg-wheat/20 rounded-xl p-2.5 text-xs text-soil flex items-center justify-between border border-wheat/50">
              <div>
                <span className="font-bold">{t('soilLabel')}:</span> {soil.type} (pH {soil.ph})
              </div>
              <div className="text-[11px] text-soil/80 font-medium">
                NPK: {soil.n}-{soil.p}-{soil.k}
              </div>
            </div>

            <button
              onClick={getRecommendations}
              disabled={loading}
              className="w-full bg-forest text-cream font-bold py-3 px-4 rounded-xl shadow-md hover:bg-forest/90 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 active:scale-[0.99] cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                  <span>{t('analyzingAgroData')}</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} className="text-wheat" />
                  <span>
                    {crops
                      ? currentLang === 'kn-IN'
                        ? 'ಶಿಫಾರಸು ಮರುಪರಿಶೀಲಿಸಿ'
                        : 'Recalculate Advisory'
                      : t('getCropRecs')}
                  </span>
                </>
              )}
            </button>
          </div>

          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl text-xs flex items-center space-x-2">
              <ShieldAlert size={16} className="text-rose-600 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Agro-climatic context info */}
          <div className="hidden lg:block bg-wheat/20 rounded-2xl p-4 border border-wheat/50 text-xs text-charcoal/80 space-y-2">
            <div className="font-bold text-forest flex items-center gap-1.5">
              <Sprout size={16} />
              <span>{currentLang === 'kn-IN' ? 'ಕರ್ನಾಟಕ ಕೃಷಿ ವಲಯ ಮಾಹಿತಿ' : 'Agro-Ecological Advisory'}</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              {currentLang === 'kn-IN'
                ? 'ಕರ್ನಾಟಕದ ಕೃಷಿ ವಲಯಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಮಣ್ಣಿನ ಪಿಎಚ್ (pH), ಲಭ್ಯ ಸಾರಜನಕ ಮತ್ತು ಮುಂಗಾರು ಮಳೆಯ ಲಭ್ಯತೆ ಆಧರಿಸಿ ಬೆಳೆ ಸೂಕ್ತತೆಯನ್ನು ಅಳೆಯಲಾಗುತ್ತದೆ.'
                : 'Crop recommendations are calculated using regional district soil profiles (pH, NPK), historical seasonal precipitation, and mandi pricing stability.'}
            </p>
          </div>
        </div>

        {/* Right Column: Recommended Crops Cards & Live Feed */}
        <div className="lg:col-span-7 space-y-4">
          {crops && crops.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <h2 className="text-sm font-bold text-forest uppercase tracking-wider flex items-center gap-1.5">
                  <span>{t('topRecommendedCrops')}</span>
                  <span className="text-[10px] bg-forest text-cream px-2 py-0.5 rounded-full lowercase">
                    ai verified
                  </span>
                </h2>
                <button
                  onClick={resetRecommendations}
                  className="text-xs text-soil hover:text-forest flex items-center gap-1 font-semibold cursor-pointer underline"
                >
                  <RotateCcw size={12} />
                  <span>{t('startOver')}</span>
                </button>
              </div>

              {crops.map((crop, idx) => {
                const isExpanded = expandedIndex === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-2xl p-4 border border-soil/15 shadow-sm space-y-3"
                  >
                    {/* Card Title & Score */}
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded-full bg-forest text-cream text-[11px] font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <h3 className="text-lg font-extrabold text-charcoal">{crop.name}</h3>
                        </div>
                        <span className="text-[10px] text-charcoal/50 block ml-7">
                          {crop.source || '🤖 AI-estimated'}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleReadout(crop)}
                          className="p-2 rounded-xl bg-wheat/30 hover:bg-wheat/50 text-forest transition-colors cursor-pointer"
                          title={t('listenSpeech')}
                          aria-label="Listen recommendation"
                        >
                          <Volume2 size={18} />
                        </button>
                        <div className="text-right">
                          <div className="text-base font-black text-forest">{crop.suitability}%</div>
                          <div className="text-[9px] text-charcoal/50 uppercase tracking-wider font-semibold">
                            {t('suitability')}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Suitability Progress Bar */}
                    <div className="space-y-1">
                      <div className="w-full bg-soil/10 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-forest h-full rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${crop.suitability}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-charcoal/80 leading-relaxed bg-cream/60 p-2.5 rounded-xl border border-soil/10">
                      {crop.reason}
                    </p>

                    {/* Irrigation info badges */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center space-x-1.5 bg-sky-50 text-sky-900 p-2 rounded-xl border border-sky-100">
                        <Droplets size={14} className="text-sky-600 flex-shrink-0" />
                        <span className="truncate text-[11px] font-medium">{crop.irrigation}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 bg-amber-50 text-amber-900 p-2 rounded-xl border border-amber-100">
                        <Clock size={14} className="text-amber-600 flex-shrink-0" />
                        <span className="truncate text-[11px] font-medium">{crop.waterFreq}</span>
                      </div>
                    </div>

                    {/* Expand / Collapse "View why" */}
                    <div className="pt-2 border-t border-soil/10">
                      <button
                        onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                        className="w-full flex items-center justify-between text-xs font-bold text-soil hover:text-forest transition-colors py-1 cursor-pointer"
                      >
                        <span>{isExpanded ? t('hideFactors') : t('viewWhy')}</span>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="pt-3 space-y-2 text-xs"
                        >
                          <div>
                            <div className="flex justify-between text-[11px] text-charcoal/70 mb-0.5">
                              <span>{t('soilCompat')}</span>
                              <span className="font-bold">{crop.factors?.soil || crop.suitability}%</span>
                            </div>
                            <div className="w-full bg-soil/10 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-soil h-full rounded-full"
                                style={{ width: `${crop.factors?.soil || crop.suitability}%` }}
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-[11px] text-charcoal/70 mb-0.5">
                              <span>{t('climateFit')}</span>
                              <span className="font-bold">
                                {crop.factors?.climate || crop.suitability}%
                              </span>
                            </div>
                            <div className="w-full bg-soil/10 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-forest h-full rounded-full"
                                style={{ width: `${crop.factors?.climate || crop.suitability}%` }}
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-[11px] text-charcoal/70 mb-0.5">
                              <span>{t('marketDemand')}</span>
                              <span className="font-bold">{crop.factors?.market || crop.suitability}%</span>
                            </div>
                            <div className="w-full bg-soil/10 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-amber-600 h-full rounded-full"
                                style={{ width: `${crop.factors?.market || crop.suitability}%` }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Idle Desktop Guide */}
          {!crops && !loading && (
            <div className="hidden lg:flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-soil/15 text-center space-y-3 min-h-[300px]">
              <div className="w-14 h-14 rounded-full bg-forest/10 text-forest flex items-center justify-center">
                <Sprout size={28} />
              </div>
              <h3 className="font-bold text-base text-charcoal">
                {currentLang === 'kn-IN' ? 'ವೈಜ್ಞಾನಿಕ ಬೆಳೆ ಶಿಫಾರಸು' : 'Ready for Agro Advisory'}
              </h3>
              <p className="text-xs text-charcoal/65 max-w-sm">
                {currentLang === 'kn-IN'
                  ? 'ಎಡಭಾಗದಲ್ಲಿ ನಿಮ್ಮ ಜಿಲ್ಲೆ ಹಾಗೂ ಋತುವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ "ಶಿಫಾರಸು ಪಡೆಯಿರಿ" ಕ್ಲಿಕ್ ಮಾಡಿ. ನಿಮ್ಮ ಮಣ್ಣಿನ ಫಲವತ್ತತೆ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಬೇಡಿಕೆಗೆ ತಕ್ಕಂತೆ ಬೆಳೆಗಳ ಪಟ್ಟಿ ಇಲ್ಲಿ ಕಾಣುತ್ತದೆ.'
                  : 'Select your district and season on the left to compute top varieties matched to your soil chemistry, climate patterns, and market profitability.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
