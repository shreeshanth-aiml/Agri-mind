import { Home, Sprout, Bug, TrendingUp, CircleDollarSign } from 'lucide-react';
import { useAppContext } from '../lib/store';
import { useTranslation } from '../lib/translations';

interface BottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ currentTab, onTabChange }: BottomNavProps) {
  const { state } = useAppContext();
  const { t } = useTranslation(state.language);

  const tabs = [
    { id: 'dashboard', icon: Home, label: t('homeTab') },
    { id: 'crop', icon: Sprout, label: t('cropTab') },
    { id: 'disease', icon: Bug, label: t('diseaseTab') },
    { id: 'yield', icon: TrendingUp, label: t('yieldTab') },
    { id: 'market', icon: CircleDollarSign, label: t('marketTab') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-cream border-t border-soil/20 pb-safe z-50 shadow-md">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors relative
                ${isActive ? 'text-forest font-semibold' : 'text-charcoal/60 hover:text-charcoal'}
              `}
              aria-label={tab.label}
            >
              {isActive && (
                <span className="absolute top-1 w-8 h-1 bg-forest rounded-full" />
              )}
              <Icon size={22} className={isActive ? 'opacity-100 scale-105' : 'opacity-70'} />
              <span className="text-[11px]">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
