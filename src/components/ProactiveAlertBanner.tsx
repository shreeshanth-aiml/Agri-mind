import { useState } from 'react';
import { useAppContext } from '../lib/store';
import { useTranslation } from '../lib/translations';
import { CloudRain, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ProactiveAlertBanner() {
  const { state } = useAppContext();
  const { currentLang } = useTranslation(state.language);
  const [dismissed, setDismissed] = useState(false);

  // Default OFF; only show if user opted in
  if (!state.proactiveAlertsEnabled || dismissed) {
    return null;
  }

  const isKannada = currentLang === 'kn-IN';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-amber-100/90 border-b border-amber-300 text-amber-950 px-4 py-2 text-xs relative z-20"
      >
        <div className="max-w-lg mx-auto flex items-start justify-between space-x-2">
          <div className="flex items-start space-x-2">
            <CloudRain size={16} className="text-amber-800 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="flex items-center space-x-1.5 font-bold">
                <span>{isKannada ? 'ಪ್ರಮುಖ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ' : 'Live Agro Alert (Opted-in)'}</span>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-semibold border border-amber-400/40">
                  {isKannada ? 'IMD ನೇರ ಮುನ್ಸೂಚನೆ' : 'Live IMD Forecast'}
                </span>
              </div>
              <p className="text-[11px] leading-tight text-amber-900/90">
                {isKannada
                  ? `${state.district} ಜಿಲ್ಲೆಯಲ್ಲಿ ಬುಧವಾರ ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆ ಇದೆ. ಎಲೆ ಕೀಟನಾಶಕ ಸಿಂಪಡಣೆ ಮುಂದೂಡಿ.`
                  : `Rain forecasted Wednesday afternoon for ${state.district}. Delay foliar spraying to prevent wash-off.`}
              </p>
              <div className="text-[10px] text-amber-800/70 font-medium">
                {isKannada ? 'ಮೂಲ: getWeatherNow() • ೪೫ ನಿಮಿಷಗಳ ಹಿಂದೆ ಅಪ್‌ಡೇಟ್' : 'Triggered by getWeatherNow() • Updated 45m ago'}
              </div>
            </div>
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="text-amber-800 hover:text-amber-950 p-1 rounded-md hover:bg-amber-200/50 transition-colors cursor-pointer flex-shrink-0"
            aria-label="Dismiss alert"
          >
            <X size={14} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
