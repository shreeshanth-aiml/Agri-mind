import { useState } from 'react';
import { useAppContext } from '../lib/store';
import { DISTRICTS_KANNADA } from '../lib/mockData';
import { useTranslation } from '../lib/translations';
import { LanguageToggle } from '../components/LanguageToggle';
import {
  User,
  X,
  MapPin,
  Bell,
  LogOut,
  Maximize2,
  FileText,
  Phone,
  CheckCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { state, updateState, logoutUser } = useAppContext();
  const { currentLang } = useTranslation(state.language);
  const isKannada = currentLang === 'kn-IN';

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const profile = state.userProfile || {
    name: 'Guest Farmer',
    phone: 'Not provided',
    district: state.district,
    farmSize: state.farmSize,
  };

  const handleAlertToggle = (checked: boolean) => {
    updateState({ proactiveAlertsEnabled: checked });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-xs">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-[#FAF7F2] rounded-2xl max-w-md w-full border border-soil/25 shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-4 bg-forest text-cream flex justify-between items-center">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-cream/20 flex items-center justify-center text-wheat font-bold text-sm">
                <User size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold">{isKannada ? 'ರೈತರ ಪ್ರೊಫೈಲ್' : 'Farmer Profile'}</h3>
                <p className="text-[10px] text-cream/75">
                  {state.isLoggedIn
                    ? isKannada
                      ? 'ದೃಢೀಕರಿಸಿದ ಖಾತೆ'
                      : 'Verified Account'
                    : isKannada
                    ? 'ಅತಿಥಿ ಮೋಡ್'
                    : 'Guest / Demo Mode'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-cream/80 hover:text-cream hover:bg-cream/10 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4 overflow-y-auto text-xs">
            {savedSuccess && (
              <div className="p-2 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-900 flex items-center space-x-1.5 text-xs font-semibold">
                <CheckCircle size={14} className="text-emerald-700" />
                <span>{isKannada ? 'ಬದಲಾವಣೆಗಳು ಉಳಿಸಲಾಗಿದೆ' : 'Settings updated successfully'}</span>
              </div>
            )}

            {/* Profile info cards */}
            <div className="bg-white rounded-xl p-3 border border-soil/15 space-y-2">
              <div className="flex justify-between items-center py-1 border-b border-soil/10">
                <span className="text-charcoal/60 font-medium flex items-center gap-1.5">
                  <User size={13} className="text-forest" />
                  {isKannada ? 'ಹೆಸರು:' : 'Name:'}
                </span>
                <span className="font-bold text-charcoal">{profile.name}</span>
              </div>

              {state.isLoggedIn && (
                <div className="flex justify-between items-center py-1 border-b border-soil/10">
                  <span className="text-charcoal/60 font-medium flex items-center gap-1.5">
                    <Phone size={13} className="text-forest" />
                    {isKannada ? 'ಮೊಬೈಲ್:' : 'Mobile:'}
                  </span>
                  <span className="font-bold text-charcoal">{profile.phone}</span>
                </div>
              )}

              <div className="flex justify-between items-center py-1 border-b border-soil/10">
                <span className="text-charcoal/60 font-medium flex items-center gap-1.5">
                  <MapPin size={13} className="text-forest" />
                  {isKannada ? 'ಜಿಲ್ಲೆ:' : 'District:'}
                </span>
                <select
                  value={state.district}
                  onChange={(e) => updateState({ district: e.target.value })}
                  className="bg-cream border border-soil/20 rounded px-2 py-0.5 text-xs font-bold text-charcoal cursor-pointer"
                >
                  {Object.entries(DISTRICTS_KANNADA).map(([en, kn]) => (
                    <option key={en} value={en}>
                      {isKannada ? `${kn} (${en})` : `${en} (${kn})`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-charcoal/60 font-medium flex items-center gap-1.5">
                  <Maximize2 size={13} className="text-forest" />
                  {isKannada ? 'ಜಮೀನು ವಿಸ್ತೀರ್ಣ:' : 'Farm Size:'}
                </span>
                <div className="flex items-center space-x-1">
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={state.farmSize}
                    onChange={(e) => updateState({ farmSize: parseFloat(e.target.value) || 1 })}
                    className="w-16 bg-cream border border-soil/20 rounded px-1.5 py-0.5 text-xs text-right font-bold text-charcoal"
                  />
                  <span className="font-medium text-charcoal/70">{isKannada ? 'ಎಕರೆ' : 'acres'}</span>
                </div>
              </div>
            </div>

            {/* Stage 11: Proactive Opt-In Alert Setting */}
            <div className="bg-wheat/20 rounded-xl p-3 border border-wheat/60 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 font-bold text-soil">
                  <Bell size={15} />
                  <span>{isKannada ? 'ಪ್ರಮುಖ ಬದಲಾವಣೆಗಳ ಸೂಚನೆಗಳು' : 'Notify Significant Changes'}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.proactiveAlertsEnabled}
                    onChange={(e) => handleAlertToggle(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-soil/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-forest"></div>
                </label>
              </div>
              <p className="text-[11px] text-charcoal/75 leading-relaxed">
                {isKannada
                  ? 'ನಿಮ್ಮ ಜಿಲ್ಲೆಗೆ ಮಳೆ ಮುನ್ಸೂಚನೆ ಅಥವಾ ನಿಮ್ಮ ಬೆಳೆಯ ಮಾರುಕಟ್ಟೆ ದರದಲ್ಲಿ ಮಹತ್ವದ ಏರಿಳಿತವಾದಾಗ ಆ್ಯಪ್‌ನಲ್ಲಿ ಸೂಕ್ತ ಮುನ್ಸೂಚನೆ ತೋರಿಸುತ್ತದೆ (ಡೀಫಾಲ್ಟ್: ಆಫ್).'
                  : 'Proactively surfaces in-app alerts when mandi prices or rainfall alerts change significantly in your district. Default is OFF.'}
              </p>
            </div>

            {/* Soil Health Card Status */}
            <div className="bg-white rounded-xl p-3 border border-soil/15 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-charcoal flex items-center gap-1.5">
                  <FileText size={14} className="text-soil" />
                  {isKannada ? 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್' : 'Soil Health Card Data'}
                </span>
                <span className="text-[10px] bg-forest/10 text-forest px-2 py-0.5 rounded font-bold">
                  {state.soilProfile ? 'Tested' : 'District Benchmark'}
                </span>
              </div>
              <p className="text-[11px] text-charcoal/70">
                {state.soilProfile
                  ? isKannada
                    ? 'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮಣ್ಣಿನ ಪರೀಕ್ಷಾ ಮೌಲ್ಯಗಳನ್ನು ಕೃಷಿ ಶಿಫಾರಸುಗಳಿಗೆ ಬಳಸಲಾಗುತ್ತಿದೆ.'
                    : 'Your verified custom soil health card values are driving crop suitability.'
                  : isKannada
                  ? 'ಕರ್ನಾಟಕ ೩೧ ಜಿಲ್ಲೆಗಳ ಸಾರ್ವಜನಿಕ ಉಲ್ಲೇಖ ಡೇಟಾಬೇಸ್ ಬಳಸಲಾಗುತ್ತಿದೆ.'
                  : 'Using Karnataka 31-district reference soil database benchmark.'}
              </p>
            </div>

            {/* Language Switch */}
            <div className="pt-1">
              <span className="text-[11px] font-bold text-charcoal/70 block mb-1">
                {isKannada ? 'ಭಾಷೆ ಬದಲಾಯಿಸಿ:' : 'Language:'}
              </span>
              <LanguageToggle />
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-3 border-t border-soil/15 bg-cream/70 flex justify-between items-center">
            {state.isLoggedIn ? (
              <button
                onClick={() => {
                  logoutUser();
                  onClose();
                }}
                className="text-xs font-bold text-rose-700 hover:text-rose-900 flex items-center space-x-1 cursor-pointer"
              >
                <LogOut size={14} />
                <span>{isKannada ? 'ಖಾತೆಯಿಂದ ನಿರ್ಗಮಿಸಿ' : 'Log Out / Switch Account'}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  state.currentView = 'login';
                }}
                className="text-xs font-bold text-forest hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <span>{isKannada ? 'ರೈತರ ಪ್ರೊಫೈಲ್ ರಚಿಸಿ / ಲಾಗಿನ್' : 'Create Profile / Log In'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-forest text-cream font-bold text-xs rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
            >
              {isKannada ? 'ಮುಚ್ಚಿ' : 'Done'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
