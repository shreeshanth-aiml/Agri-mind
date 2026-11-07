import { Smartphone, Laptop, Sparkles } from 'lucide-react';
import { useAppContext, LayoutMode } from '../lib/store';
import { useTranslation } from '../lib/translations';

interface ViewModeSwitchProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export function ViewModeSwitch({ variant = 'compact', className = '' }: ViewModeSwitchProps) {
  const { state, setLayoutMode } = useAppContext();
  const { t } = useTranslation(state.language);
  const currentMode = state.layoutMode || 'auto';

  const modes: { id: LayoutMode; icon: typeof Smartphone; label: string }[] = [
    { id: 'auto', icon: Sparkles, label: t('viewModeAuto') },
    { id: 'mobile', icon: Smartphone, label: t('viewModeMobile') },
    { id: 'desktop', icon: Laptop, label: t('viewModeDesktop') },
  ];

  if (variant === 'compact') {
    return (
      <div
        className={`inline-flex items-center bg-cream/90 p-0.5 rounded-full border border-soil/25 shadow-2xs ${className}`}
        role="group"
        aria-label={t('viewMode')}
      >
        {modes.map((m) => {
          const Icon = m.icon;
          const isActive = currentMode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setLayoutMode(m.id)}
              className={`flex items-center space-x-1 px-2 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-forest text-cream shadow-xs'
                  : 'text-charcoal/70 hover:text-charcoal hover:bg-wheat/20'
              }`}
              title={`${t('viewMode')}: ${m.label}`}
              aria-label={`${t('viewMode')}: ${m.label}`}
              aria-pressed={isActive}
            >
              <Icon size={13} className={isActive ? 'text-wheat' : 'text-forest/80'} />
              <span className="hidden sm:inline">{m.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between text-xs font-bold text-soil">
        <span>{t('viewMode')}</span>
        <span className="text-[10px] text-charcoal/60 font-medium">
          {modes.find((m) => m.id === currentMode)?.label}
        </span>
      </div>
      <div
        className="grid grid-cols-3 gap-1 bg-white p-1 rounded-xl border border-soil/20 shadow-xs"
        role="group"
        aria-label={t('viewMode')}
      >
        {modes.map((m) => {
          const Icon = m.icon;
          const isActive = currentMode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setLayoutMode(m.id)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-forest text-cream shadow-xs'
                  : 'text-charcoal/70 hover:text-charcoal hover:bg-wheat/25'
              }`}
              aria-pressed={isActive}
            >
              <Icon size={14} className={isActive ? 'text-wheat' : 'text-forest/80'} />
              <span className="text-[11px]">{m.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
