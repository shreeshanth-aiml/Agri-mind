import { useAppContext } from '../lib/store';
import { Languages } from 'lucide-react';

interface LanguageToggleProps {
  className?: string;
  variant?: 'compact' | 'pill' | 'expanded';
}

export function LanguageToggle({ className = '', variant = 'pill' }: LanguageToggleProps) {
  const { state, updateState } = useAppContext();
  const isKannada = state.language === 'kn-IN' || state.language.startsWith('kn');

  const toggleLanguage = () => {
    updateState({ language: isKannada ? 'en-IN' : 'kn-IN' });
  };

  const setLanguage = (lang: 'kn-IN' | 'en-IN') => {
    updateState({ language: lang });
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleLanguage}
        className={`flex items-center space-x-1.5 px-2 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer shadow-2xs ${
          isKannada
            ? 'bg-wheat/40 text-soil border-soil/30 hover:bg-wheat/60'
            : 'bg-forest/10 text-forest border-forest/30 hover:bg-forest/20'
        } ${className}`}
        title={isKannada ? 'Switch to English' : 'ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ'}
        aria-label="Toggle Kannada / English Language"
      >
        <Languages size={14} className={isKannada ? 'text-soil' : 'text-forest'} />
        <span>{isKannada ? 'ಕನ್ನಡ' : 'EN'}</span>
      </button>
    );
  }

  return (
    <div
      className={`inline-flex items-center bg-cream/90 p-0.5 rounded-full border border-soil/25 shadow-2xs ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLanguage('kn-IN')}
        className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
          isKannada
            ? 'bg-forest text-cream shadow-xs scale-102'
            : 'text-charcoal/70 hover:text-charcoal'
        }`}
      >
        <span>ಕನ್ನಡ</span>
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en-IN')}
        className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
          !isKannada
            ? 'bg-forest text-cream shadow-xs scale-102'
            : 'text-charcoal/70 hover:text-charcoal'
        }`}
      >
        <span>English</span>
      </button>
    </div>
  );
}
