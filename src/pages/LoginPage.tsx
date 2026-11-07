import React, { useState } from 'react';
import { useAppContext } from '../lib/store';
import { DISTRICTS_KANNADA } from '../lib/mockData';
import { useTranslation } from '../lib/translations';
import { FieldBackground } from '../components/FieldBackground';
import { LanguageToggle } from '../components/LanguageToggle';
import {
  Sprout,
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Maximize2,
  FileText,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginPage() {
  const { state, loginUser, navigateTo } = useAppContext();
  const { currentLang } = useTranslation(state.language);
  const isKannada = currentLang === 'kn-IN';

  const [name, setName] = useState(state.userProfile?.name || '');
  const [phone, setPhone] = useState(state.userProfile?.phone || '');
  const [district, setDistrict] = useState(state.district || 'Bengaluru Urban');
  const [farmSize, setFarmSize] = useState<number>(state.farmSize || 2);
  const [hasSoilCard, setHasSoilCard] = useState(false);
  const [soilN, setSoilN] = useState<number>(45);
  const [soilP, setSoilP] = useState<number>(20);
  const [soilK, setSoilK] = useState<number>(35);
  const [soilPh, setSoilPh] = useState<number>(6.5);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg(isKannada ? 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.' : 'Please enter your name.');
      return;
    }

    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg(
        isKannada
          ? 'ದಯವಿಟ್ಟು ಸರಿಯಾದ ೧೦-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.'
          : 'Please enter a valid 10-digit mobile number.'
      );
      return;
    }

    setLoading(true);

    // Micro-delay with growing sprout animation for tactile feedback
    setTimeout(() => {
      loginUser({
        name: name.trim(),
        phone: phone.trim(),
        district,
        farmSize: Number(farmSize) || 1,
        hasSoilCard,
      });

      if (hasSoilCard) {
        // save custom soil card
        state.soilProfile = {
          n: Number(soilN) || 40,
          p: Number(soilP) || 20,
          k: Number(soilK) || 35,
          ph: Number(soilPh) || 6.5,
          source: 'Tested',
          type: isKannada ? 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್ (ಪರೀಕ್ಷಿತ)' : 'Soil Health Card (Tested)',
        };
      }

      setLoading(false);
      navigateTo('app');
    }, 600);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-forest/20 text-charcoal">
      {/* Nature Background with reduced motion for calm form entry */}
      <FieldBackground intensity="full" motion="reduced" />

      {/* Top Bar */}
      <header className="relative z-10 p-4 max-w-lg mx-auto w-full flex justify-between items-center">
        <button
          onClick={() => navigateTo('landing')}
          className="flex items-center space-x-1.5 text-xs font-bold text-soil hover:text-forest transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>{isKannada ? 'ಹಿಂದಕ್ಕೆ' : 'Back'}</span>
        </button>

        <LanguageToggle variant="compact" />
      </header>

      {/* Main Login Card */}
      <main className="relative z-10 px-4 py-2 max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="bg-[#FAF7F2]/95 backdrop-blur-sm rounded-2xl p-5 border border-soil/25 shadow-md space-y-4"
        >
          {/* Card Header with Static Sprout Icon */}
          <div className="flex items-center space-x-3 pb-2 border-b border-soil/15">
            <div className="w-10 h-10 rounded-xl bg-forest/10 border border-forest/20 flex items-center justify-center text-forest flex-shrink-0">
              <Sprout size={22} />
            </div>
            <div>
              <h2 className="text-base font-black text-forest">
                {isKannada ? 'ರೈತರ ಪ್ರೊಫೈಲ್ ಲಾಗಿನ್' : 'Farmer Profile Login'}
              </h2>
              <p className="text-[11px] text-charcoal/70">
                {isKannada
                  ? 'ನಿಮ್ಮ ಜಮೀನಿಗೆ ಸೂಕ್ತವಾದ ನಿಖರ ಕೃಷಿ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ'
                  : 'Tailored agricultural recommendations for your farm'}
              </p>
            </div>
          </div>

          {/* Validation Error Message */}
          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
              <AlertCircle size={15} className="flex-shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Farmer Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-charcoal flex items-center space-x-1.5">
                <User size={13} className="text-forest" />
                <span>{isKannada ? 'ರೈತರ ಹೆಸರು' : 'Farmer Name'}</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isKannada ? 'ಉದಾ: ಬಸವರಾಜ ಪಾಟೀಲ' : 'e.g. Basavaraj Patil'}
                className="w-full bg-white border border-soil/25 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-forest text-charcoal"
              />
            </div>

            {/* Mobile Number */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-charcoal flex items-center space-x-1.5">
                <Phone size={13} className="text-forest" />
                <span>{isKannada ? 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (೧೦ ಅಂಕಿಗಳು)' : 'Mobile Number (10 Digits)'}</span>
              </label>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
                className="w-full bg-white border border-soil/25 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-forest text-charcoal tracking-wide"
              />
            </div>

            {/* District Selection (All 31 Districts) */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-charcoal flex items-center space-x-1.5">
                <MapPin size={13} className="text-forest" />
                <span>{isKannada ? 'ಜಿಲ್ಲೆ (ಕರ್ನಾಟಕ)' : 'District (Karnataka)'}</span>
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-white border border-soil/25 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-forest text-charcoal cursor-pointer"
              >
                {Object.entries(DISTRICTS_KANNADA).map(([en, kn]) => (
                  <option key={en} value={en}>
                    {isKannada ? `${kn} (${en})` : `${en} (${kn})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Farm Size */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-charcoal flex items-center space-x-1.5">
                <Maximize2 size={13} className="text-forest" />
                <span>{isKannada ? 'ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ (ಎಕರೆಗಳಲ್ಲಿ)' : 'Farm Size (in Acres)'}</span>
              </label>
              <input
                type="number"
                min="0.25"
                step="0.25"
                value={farmSize}
                onChange={(e) => setFarmSize(parseFloat(e.target.value) || 1)}
                className="w-full bg-white border border-soil/25 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-forest text-charcoal"
              />
            </div>

            {/* Optional Soil Health Card Entry */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setHasSoilCard(!hasSoilCard)}
                className="flex items-center space-x-2 text-xs font-bold text-soil hover:text-forest transition-colors cursor-pointer"
              >
                <FileText size={14} />
                <span>
                  {isKannada
                    ? hasSoilCard
                      ? '✓ ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್ ವಿವರಗಳು ಸೇರಿಸಲಾಗಿದೆ (ಬದಲಾಯಿಸಿ)'
                      : '+ ನನ್ನ ಬಳಿ ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್ (Soil Health Card) ಇದೆ'
                    : hasSoilCard
                    ? '✓ Soil Health Card details added (click to collapse)'
                    : '+ I have a Soil Health Card (Optional)'}
                </span>
              </button>

              {hasSoilCard && (
                <div className="mt-2.5 p-3 rounded-xl bg-wheat/20 border border-soil/20 space-y-2">
                  <div className="text-[11px] font-bold text-soil">
                    {isKannada ? 'ಪ್ರಯೋಗಾಲಯ ಪರೀಕ್ಷಿತ ಮಣ್ಣಿನ ಮೌಲ್ಯಗಳು' : 'Lab-Tested Soil Metrics'}
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div>
                      <span className="text-[10px] text-charcoal/60 font-semibold">pH</span>
                      <input
                        type="number"
                        step="0.1"
                        value={soilPh}
                        onChange={(e) => setSoilPh(parseFloat(e.target.value) || 6.5)}
                        className="w-full bg-white border border-soil/20 rounded-lg p-1 text-xs text-center font-bold text-charcoal"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-charcoal/60 font-semibold">N (kg/ha)</span>
                      <input
                        type="number"
                        value={soilN}
                        onChange={(e) => setSoilN(parseFloat(e.target.value) || 40)}
                        className="w-full bg-white border border-soil/20 rounded-lg p-1 text-xs text-center font-bold text-charcoal"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-charcoal/60 font-semibold">P (kg/ha)</span>
                      <input
                        type="number"
                        value={soilP}
                        onChange={(e) => setSoilP(parseFloat(e.target.value) || 20)}
                        className="w-full bg-white border border-soil/20 rounded-lg p-1 text-xs text-center font-bold text-charcoal"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-charcoal/60 font-semibold">K (kg/ha)</span>
                      <input
                        type="number"
                        value={soilK}
                        onChange={(e) => setSoilK(parseFloat(e.target.value) || 35)}
                        className="w-full bg-white border border-soil/20 rounded-lg p-1 text-xs text-center font-bold text-charcoal"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button with 0.97 Scale Tap Feedback and Sprout Micro-Loader */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-forest text-cream font-bold text-sm rounded-xl shadow-sm hover:opacity-95 active:scale-[0.97] transition-all cursor-pointer flex items-center justify-center space-x-2 mt-4 disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <Sprout size={18} className="animate-sprout text-wheat" />
                  <span>{isKannada ? 'ಪ್ರೊಫೈಲ್ ಉಳಿಸಲಾಗುತ್ತಿದೆ...' : 'Saving Profile...'}</span>
                </div>
              ) : (
                <>
                  <span>{isKannada ? 'ಮುಂದುವರಿಯಿರಿ' : 'Continue / Log In'}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* New here / Guest link */}
          <div className="pt-2 text-center">
            <button
              onClick={() => navigateTo('landing')}
              className="text-xs font-semibold text-charcoal/70 hover:text-forest transition-colors cursor-pointer"
            >
              {isKannada ? 'ಹೊಸಬರೇ? ಪರಿಚಯ ಪುಟಕ್ಕೆ ಹೋಗಿ' : 'New here? Back to Welcome Page'}
            </button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-3 text-center text-[10px] text-charcoal/50 border-t border-soil/10 bg-cream/40">
        AgriMind • Secure phone-only profile stored locally
      </footer>
    </div>
  );
}
