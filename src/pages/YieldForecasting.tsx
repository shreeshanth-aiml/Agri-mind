import { useState, useEffect } from 'react';
import { useAppContext } from '../lib/store';
import { MOCK_WEATHER, MOCK_NDVI, DISTRICTS_KANNADA } from '../lib/mockData';
import { callGemini } from '../lib/gemini';
import { useTranslation } from '../lib/translations';
import { LanguageToggle } from '../components/LanguageToggle';
import {
  TrendingUp,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Layers,
  CheckCircle,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface ForecastAIResponse {
  plainTextNote: string;
  keyFactors: string[];
}

export default function YieldForecasting() {
  const { state } = useAppContext();
  const { t, currentLang } = useTranslation(state.language);
  const [loading, setLoading] = useState(false);
  const [aiNote, setAiNote] = useState<ForecastAIResponse | null>(null);
  const [showModelDetails, setShowModelDetails] = useState(false);

  const districtDisplay =
    currentLang === 'kn-IN'
      ? DISTRICTS_KANNADA[state.district] || state.district
      : state.district;

  const chartData = [
    { year: '2022', historicalYield: 18, forecastYield: null },
    { year: '2023', historicalYield: 19, forecastYield: null },
    { year: '2024', historicalYield: 17.5, forecastYield: null },
    { year: '2025', historicalYield: 20, forecastYield: 20 },
    { year: currentLang === 'kn-IN' ? '೨೦೨೬ (ಅಂದಾಜು)' : '2026 (Est)', historicalYield: null, forecastYield: 20.5 },
  ];

  const fetchConfidenceNote = async () => {
    setLoading(true);
    try {
      const prompt = `Farmer is in ${state.district} during ${state.season}.
Language: ${state.language === 'kn-IN' ? 'Kannada' : 'English'}.
Recent weather shows ${MOCK_WEATHER.current.condition} with ${MOCK_WEATHER.current.temp}C.
NDVI (Vegetation Index) is trending at ${MOCK_NDVI[MOCK_NDVI.length - 1].ndvi} (Healthy).
Yield forecast is 18-22 quintals/acre. 
Generate a short, simple plain-language confidence note explaining WHY we predict this based on weather and vegetation health in ${
        state.language === 'kn-IN' ? 'Kannada language' : 'English'
      }.
Do NOT mention 'NDVI' as an acronym, say 'satellite vegetation health'.
Return ONLY valid JSON in this exact format, with NO markdown formatting in the strings:
{
  "plainTextNote": "A short 2-3 sentence paragraph explaining the forecast.",
  "keyFactors": ["Factor 1 (e.g., Good rainfall)", "Factor 2 (e.g., Healthy vegetation)"]
}`;

      const res = await callGemini({
        prompt,
        isJSON: true,
      });

      if (res && res.plainTextNote) {
        setAiNote(res);
      }
    } catch {
      setAiNote({
        plainTextNote:
          currentLang === 'kn-IN'
            ? `${districtDisplay} ಜಿಲ್ಲೆಯಲ್ಲಿ ಸುರಿದ ಉತ್ತಮ ಮಳೆ ಹಾಗೂ ಉಪಗ್ರಹ ಹಸಿರು ಸೂಚ್ಯಂಕವು ಬೆಳೆ ಉತ್ತಮವಾಗಿ ಬೆಳೆಯುತ್ತಿರುವುದನ್ನು ಸೂಚಿಸುತ್ತದೆ. ಮಣ್ಣಿನ ತೇವಾಂಶ ಸ್ಥಿರವಾಗಿದ್ದು, ಇಳುವರಿಯು ಕಳೆದ ೫ ವರ್ಷಗಳ ಸರಾಸರಿಗಿಂತ ಉತ್ತಮವಾಗಿರಲಿದೆ.`
            : `Favorable monsoon showers and strong satellite vegetation health in ${districtDisplay} indicate robust crop vigor. Sustained soil moisture supports a harvest tracking comfortably above recent multi-year averages.`,
        keyFactors:
          currentLang === 'kn-IN'
            ? [
                'ಧಾನ್ಯ ತುಂಬುವ ಹಂತಕ್ಕೆ ಸೂಕ್ತ ಉಷ್ಣಾಂಶ (೨೬-೩೦°C)',
                'ಉಪಗ್ರಹ ಮೇಲ್ವಿಚಾರಣೆಯಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಹಸಿರು ಹೊದಿಕೆ',
                'ಸ್ಥಿರವಾದ ಋತುಮಾನದ ಮಣ್ಣಿನ ತೇವಾಂಶ ಸಂಗ್ರಹ',
              ]
            : [
                'Optimal temperature range for grain filling',
                'Robust satellite vegetation canopy greenness',
                'Stable seasonal soil moisture reserves',
              ],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfidenceNote();
  }, [state.district, state.season, state.language]);

  return (
    <div className="p-4 pb-24 space-y-6 w-full max-w-lg md:max-w-3xl lg:max-w-6xl mx-auto relative z-10">
      {/* Header */}
      <header className="flex justify-between items-center pb-2 border-b border-soil/10">
        <div>
          <h1 className="text-2xl font-bold text-forest flex items-center gap-2">
            <TrendingUp className="text-forest" size={26} />
            {t('yieldForecastTitle')}
          </h1>
          <p className="text-xs text-charcoal/70">{t('yieldForecastSubtitle')}</p>
        </div>
        <LanguageToggle variant="compact" />
      </header>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Metrics, Weather Features, Satellite NDVI, Model Details */}
        <div className="lg:col-span-5 space-y-4">
          {/* Primary Forecast Metric Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-forest text-cream rounded-2xl p-5 shadow-sm relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-semibold text-cream/75 uppercase tracking-wider block">
                  {t('estimatedOutput')}
                </span>
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className="text-3xl font-extrabold text-cream">18 - 22</span>
                  <span className="text-sm text-wheat font-bold">{t('quintalsPerAcre')}</span>
                </div>
                <div className="text-[11px] text-wheat/90 font-medium mt-0.5">
                  {currentLang === 'kn-IN' ? 'ಅತ್ಯಂತ ಸಂಭಾವ್ಯ: ೨೦.೫ ಕ್ವಿಂಟಾಲ್ / ಎಕರೆ' : 'Most Likely: 20.5 quintals / acre'}
                </div>
              </div>
              <span className="bg-wheat text-forest font-bold text-xs px-2.5 py-1 rounded-full shadow-xs">
                {t('vsFiveYearAvg')}
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-cream/20 grid grid-cols-2 gap-2 text-xs text-cream/80">
              <div>
                <span className="block text-[10px] text-cream/60">
                  {t('selectDistrict')} & {t('selectSeason')}
                </span>
                <span className="font-semibold text-cream">
                  {districtDisplay} • {state.season}
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-cream/60">{t('canopyHealthScore')}</span>
                <span className="font-semibold text-wheat">0.80 ({t('favorable')})</span>
              </div>
            </div>
          </motion.div>

          {/* Stage 7: Engineered Features & NDVI Satellite Health */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 border border-soil/15 shadow-xs space-y-1">
              <div className="text-[10px] font-bold text-soil uppercase tracking-wider">
                {currentLang === 'kn-IN' ? 'ಬೆಳೆ ಉಷ್ಣಾಂಶ ಸಂಚಯ (GDD)' : 'Growing Degree Days (GDD)'}
              </div>
              <div className="text-lg font-black text-charcoal">1,420 GDD</div>
              <div className="text-[10px] text-emerald-700 font-semibold">
                {currentLang === 'kn-IN' ? 'ಧಾನ್ಯ ತುಂಬುವಿಕೆಗೆ ಅತ್ಯುತ್ತಮ' : 'Optimal for grain-filling'}
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 border border-soil/15 shadow-xs space-y-1">
              <div className="text-[10px] font-bold text-soil uppercase tracking-wider">
                {currentLang === 'kn-IN' ? 'ಸಂಚಿತ ಮಳೆ ಪ್ರಮಾಣ' : 'Cumulative Rainfall'}
              </div>
              <div className="text-lg font-black text-charcoal">+12% Surplus</div>
              <div className="text-[10px] text-emerald-700 font-semibold">
                {currentLang === 'kn-IN' ? 'ತೇವಾಂಶ ಕೊರತೆ ಶೂನ್ಯ' : 'Zero drought stress flag'}
              </div>
            </div>
          </div>

          {/* Satellite Vegetation Index (NDVI) Card */}
          <div className="bg-white rounded-xl p-3.5 border border-soil/15 shadow-xs space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-xs font-bold text-charcoal">
                {currentLang === 'kn-IN' ? 'ಉಪಗ್ರಹ ಹಸಿರು ಸೂಚ್ಯಂಕ (NDVI)' : 'Satellite Vegetation Index (NDVI)'}
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                0.80 • High Canopy Greenness
              </span>
            </div>

            {/* Mini NDVI Sparkline Strip */}
            <div className="flex items-end justify-between h-10 px-2 pt-2 bg-cream/60 rounded-lg">
              {MOCK_NDVI.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center space-y-1">
                  <div
                    className="w-8 bg-forest rounded-t"
                    style={{ height: `${item.ndvi * 30}px` }}
                    title={`${item.month}: ${item.ndvi}`}
                  />
                  <span className="text-[9px] text-charcoal/60 font-semibold">{item.month}</span>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-charcoal/60 leading-tight pt-1">
              {currentLang === 'kn-IN'
                ? 'ಉಪಗ್ರಹ ಹಸಿರು ಸೂಚ್ಯಂಕ — ಸೆಂಟಿನೆಲ್-೨ ಉಪಗ್ರಹ ಚಿತ್ರಗಳ ಮೂಲಕ ಬೆಳೆಯ ಜೀವಂತ ಹಸಿರು ಸಾಂದ್ರತೆ ಮಾಪನ ಮಾಡುತ್ತದೆ.'
                : 'Vegetation health index — reflects current crop growth condition from Sentinel-2 satellite surface reflectance.'}
            </p>
          </div>

          {/* Collapsible Model Details */}
          <div className="bg-wheat/20 rounded-2xl p-4 border border-wheat/60">
            <button
              onClick={() => setShowModelDetails(!showModelDetails)}
              className="w-full flex items-center justify-between text-xs font-bold text-soil hover:text-forest transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-1.5">
                <Layers size={16} />
                <span>{t('modelDetailsTitle')}</span>
              </div>
              {showModelDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showModelDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-3 space-y-2 text-xs text-charcoal/80 border-t border-soil/10 mt-3"
              >
                {currentLang === 'kn-IN' ? (
                  <>
                    <p>
                      • <strong>ದ್ವಿಹಂತದ ವರ್ಗಾವಣೆ ಕಲಿಕೆ (Transfer Learning):</strong> ಐಸಿಆರ್‌ಐಎಸ್‌ಎಟಿ (ICRISAT) ಭಾರತೀಯ ದಶಕಗಳ ಜಿಲ್ಲಾಮಟ್ಟದ ದತ್ತಾಂಶದಲ್ಲಿ ಸಾಮಾನ್ಯ ಕಾಲಿಕ ಮಾದರಿಗಳನ್ನು ಪೂರ್ವ-ತರಬೇತಿ (Pre-train) ಮಾಡಿ, ನಂತರ ಕರ್ನಾಟಕದ ೩೧ ಜಿಲ್ಲೆಗಳ ಸೂಕ್ಷ್ಮ ಹವಾಮಾನ ದತ್ತಾಂಶದೊಂದಿಗೆ ಫೈನ್-ಟ್ಯೂನ್ ಮಾಡಲಾಗಿದೆ.
                    </p>
                    <p>
                      • <strong>ಅಲ್ಗಾರಿದಮ್:</strong> ಇಸ್ರೋ ಮತ್ತು ಸೆಂಟಿನೆಲ್-೨ ಉಪಗ್ರಹ ಹಸಿರು ಸೂಚ್ಯಂಕ ಹಾಗೂ ಐಎಂಡಿ ಮಳೆಯ ದೈನಂದಿನ ದತ್ತಾಂಶಗಳ ಸಂಗಮ.
                    </p>
                    <p>
                      • <strong>ಉಪಗ್ರಹ ಹಸಿರು ಸಾಂದ್ರತೆ:</strong> ೦.೭೫ ರಿಂದ ೦.೮೦ ವರೆಗಿನ ಆರೋಗ್ಯಕರ ಪತ್ರಹರಿತ್ತು ಸೂಚ್ಯಂಕ.
                    </p>
                    <p>
                      • <strong>ಖಚಿತತೆಯ ಶ್ರೇಣಿ:</strong> ಮುಂಗಾರು ಮಳೆಯ ಸಹಜ ಪರಿಸ್ಥಿತಿಯಲ್ಲಿ ಶೇಕಡಾ ೯೨ ನಿಖರತೆ.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      • <strong>Transfer Learning Approach:</strong> Two-stage training pipeline: (a) Pre-trained on multi-decade ICRISAT district-level India crop yield dataset to capture seasonal macro patterns, (b) Fine-tuned on Karnataka-specific 31-district dataset to overcome local sample size limits.
                    </p>
                    <p>
                      • <strong>Algorithm:</strong> Spatio-temporal Gradient Boosted Regression combining Sentinel-2 MSI surface reflectance with IMD gridded daily precipitation.
                    </p>
                    <p>
                      • <strong>Satellite Vegetation Index:</strong> Historical composite tracking 0.75-0.80 healthy green canopy absorption across the district.
                    </p>
                    <p>
                      • <strong>Confidence Interval:</strong> 92% probabilistic tolerance range under median monsoon conditions.
                    </p>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Column: Wide Yield History Chart and AI Forecast Confidence */}
        <div className="lg:col-span-7 space-y-4">
          {/* Yield Trend Chart */}
          <div className="bg-white rounded-2xl p-4 border border-soil/15 shadow-xs space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider">
                {t('yieldHistoryChart')}
              </h3>
              <span className="text-[10px] text-charcoal/50">
                {currentLang === 'kn-IN' ? 'ಪ್ರಮಾಣ: ಕ್ವಿಂಟಾಲ್ / ಎಕರೆಗೆ' : 'Unit: Quintals / Acre'}
              </span>
            </div>

            <div className="h-64 lg:h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="historicalGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2D4A3E" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2D4A3E" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4C19C" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#D4C19C" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe1" />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#6B4E37' }} />
                  <YAxis domain={[12, 26]} tick={{ fontSize: 11, fill: '#6B4E37' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FAF7F2',
                      borderColor: '#6B4E37',
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="historicalYield"
                    stroke="#2D4A3E"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#historicalGrad)"
                    name={t('historicalYield')}
                  />
                  <Area
                    type="monotone"
                    dataKey="forecastYield"
                    stroke="#B59A6D"
                    strokeWidth={2.5}
                    strokeDasharray="5 5"
                    fillOpacity={1}
                    fill="url(#forecastGrad)"
                    name={t('aiForecastYield')}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex justify-center items-center space-x-6 pt-2 border-t border-soil/10 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3.5 h-1 bg-[#2D4A3E] rounded" />
                <span className="text-charcoal/70 font-medium">{t('historicalYield')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3.5 h-1 bg-[#B59A6D] border-t border-dashed border-[#B59A6D]" />
                <span className="text-charcoal/70 font-medium">{t('aiForecastYield')}</span>
              </div>
            </div>
          </div>

          {/* AI Forecast Confidence Note Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-4 border border-soil/15 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-forest">
                <Sparkles size={18} className="text-forest animate-pulse" />
                <h3 className="font-bold text-sm text-forest">{t('aiConfidenceNote')}</h3>
              </div>
              {loading && (
                <span className="text-[11px] text-charcoal/50 animate-pulse font-medium">
                  {currentLang === 'kn-IN' ? 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...' : 'Updating...'}
                </span>
              )}
            </div>

            {aiNote && (
              <div className="space-y-3">
                <p className="text-xs text-charcoal/85 leading-relaxed bg-cream/70 p-3 rounded-xl border border-soil/10">
                  {aiNote.plainTextNote}
                </p>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-soil uppercase tracking-wider block">
                    {t('keyFactorsTitle')}
                  </span>
                  <div className="space-y-1">
                    {aiNote.keyFactors.map((factor, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-charcoal/80">
                        <CheckCircle size={14} className="text-emerald-700 flex-shrink-0" />
                        <span>{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
