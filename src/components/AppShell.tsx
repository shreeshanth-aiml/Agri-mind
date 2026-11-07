import { useState, useEffect, ReactNode } from 'react';
import { useAppContext, ActiveTab, LayoutMode } from '../lib/store';
import { useTranslation } from '../lib/translations';
import { DISTRICTS_KANNADA } from '../lib/mockData';
import { BottomNav } from './BottomNav';
import { LanguageToggle } from './LanguageToggle';
import { ProfileModal } from './ProfileModal';
import { ViewModeSwitch } from './ViewModeSwitch';
import {
  Home,
  Sprout,
  Bug,
  TrendingUp,
  CircleDollarSign,
  User,
  Mic,
  Calendar,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
  currentTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export function AppShell({ children, currentTab, onTabChange }: AppShellProps) {
  const { state, updateState, toggleAssistant } = useAppContext();
  const { t, currentLang } = useTranslation(state.language);
  const [showProfile, setShowProfile] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Resize listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const layoutMode: LayoutMode = state.layoutMode || 'auto';

  // Section 1 & 3 layout resolution
  // If desktop forced: desktop
  // If mobile forced: mobile
  // If auto: desktop if >= 1024, tablet if 768-1023, mobile if < 768
  const isDesktop =
    layoutMode === 'desktop' || (layoutMode === 'auto' && windowWidth >= 1024);
  const isTablet =
    layoutMode === 'auto' && windowWidth >= 768 && windowWidth < 1024;
  const isMobile =
    layoutMode === 'mobile' || (layoutMode === 'auto' && windowWidth < 768);

  // Viewport meta handling for forced desktop on small screens
  useEffect(() => {
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'viewport');
      document.head.appendChild(meta);
    }

    if (layoutMode === 'desktop') {
      meta.setAttribute(
        'content',
        'width=1024, initial-scale=0.35, minimum-scale=0.2, maximum-scale=5.0, user-scalable=yes'
      );
    } else {
      meta.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes'
      );
    }

    return () => {
      meta?.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes'
      );
    };
  }, [layoutMode]);

  const navItems: { id: ActiveTab; icon: typeof Home; labelKey: string }[] = [
    { id: 'dashboard', icon: Home, labelKey: 'homeTab' },
    { id: 'crop', icon: Sprout, labelKey: 'cropTab' },
    { id: 'disease', icon: Bug, labelKey: 'diseaseTab' },
    { id: 'yield', icon: TrendingUp, labelKey: 'yieldTab' },
    { id: 'market', icon: CircleDollarSign, labelKey: 'marketTab' },
  ];

  return (
    <>
      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />

      {/* DESKTOP LAYOUT (Section 2) */}
      {isDesktop ? (
        <div
          className={`min-h-screen bg-cream text-charcoal flex flex-row ${
            layoutMode === 'desktop' ? 'min-w-[1024px] overflow-x-auto' : ''
          }`}
        >
          {/* Fixed Left Sidebar (~240px to 260px) */}
          <aside
            className="w-64 min-w-[16rem] bg-white border-r border-soil/15 flex flex-col justify-between h-screen sticky top-0 z-30 shadow-xs select-none"
            aria-label="AgriMind Desktop Navigation"
          >
            {/* Top section: Logo and Nav Items */}
            <div className="p-4 flex flex-col space-y-4 overflow-y-auto">
              {/* AgriMind Brand Header */}
              <div className="flex items-center space-x-2.5 pb-2 border-b border-soil/10">
                <div className="w-10 h-10 rounded-xl bg-forest text-wheat flex items-center justify-center shadow-xs">
                  <Sprout size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-black text-forest tracking-tight">
                      {t('appName')}
                    </span>
                  </div>
                  <span className="text-[10px] bg-wheat/40 text-soil px-1.5 py-0.5 rounded font-bold border border-soil/15">
                    {t('stateSubtitle')}
                  </span>
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-1.5" aria-label="Main Modules">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onTabChange(item.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-forest ${
                        isActive
                          ? 'bg-forest text-cream font-bold shadow-xs'
                          : 'text-charcoal/75 hover:text-charcoal hover:bg-wheat/20'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <Icon
                        size={19}
                        className={isActive ? 'text-wheat' : 'text-forest/75 flex-shrink-0'}
                      />
                      <span className="break-words leading-tight flex-1">
                        {t(item.labelKey as any)}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Quick Settings in Sidebar: District, Season, Language */}
              <div className="pt-2 border-t border-soil/10 space-y-2.5 text-xs">
                {/* District Selector */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-soil flex items-center gap-1">
                    <MapPin size={12} className="text-forest" />
                    <span>{t('selectDistrict')}</span>
                  </label>
                  <select
                    value={state.district}
                    onChange={(e) => updateState({ district: e.target.value })}
                    className="w-full bg-cream border border-soil/20 rounded-lg px-2 py-1.5 text-xs font-semibold text-charcoal focus:outline-none focus:border-forest cursor-pointer"
                  >
                    {Object.entries(DISTRICTS_KANNADA).map(([en, kn]) => (
                      <option key={en} value={en}>
                        {currentLang === 'kn-IN' ? `${kn} (${en})` : `${en} (${kn})`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Season Selector */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-soil flex items-center gap-1">
                    <Calendar size={12} className="text-forest" />
                    <span>{t('selectSeason')}</span>
                  </label>
                  <select
                    value={state.season}
                    onChange={(e) => updateState({ season: e.target.value as any })}
                    className="w-full bg-cream border border-soil/20 rounded-lg px-2 py-1.5 text-xs font-semibold text-charcoal focus:outline-none focus:border-forest cursor-pointer"
                  >
                    <option value="Kharif">{t('kharif')}</option>
                    <option value="Rabi">{t('rabi')}</option>
                    <option value="Zaid">{t('zaid')}</option>
                  </select>
                </div>

                {/* Language Toggle in Sidebar */}
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-soil">
                    {t('switchLanguage')}
                  </span>
                  <LanguageToggle />
                </div>

                {/* Farmer Profile Button */}
                <button
                  type="button"
                  onClick={() => setShowProfile(true)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-wheat/20 hover:bg-wheat/40 border border-soil/15 text-charcoal font-bold transition-all cursor-pointer text-xs"
                >
                  <div className="flex items-center gap-2">
                    <User size={15} className="text-forest" />
                    <span>{t('farmerProfile')}</span>
                  </div>
                  <span className="text-[10px] text-soil font-semibold">
                    {state.userProfile?.name || (currentLang === 'kn-IN' ? 'ಖಾತೆ' : 'Account')}
                  </span>
                </button>

                {/* Voice & Chat Assistant Button */}
                <button
                  type="button"
                  onClick={toggleAssistant}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-forest/10 hover:bg-forest/20 border border-forest/30 text-forest font-bold transition-all cursor-pointer text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Mic size={16} className="text-forest" />
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <span>{t('assistantSidebarBtn')}</span>
                  </div>
                  <Sparkles size={13} className="text-forest/70" />
                </button>
              </div>
            </div>

            {/* Bottom section of Desktop Sidebar: Manual View Mode Switch */}
            <div className="p-3.5 border-t border-soil/15 bg-cream/50">
              <ViewModeSwitch variant="full" />
            </div>
          </aside>

          {/* Desktop Main Content Area (Max width ~1200px, centered) */}
          <div className="flex-1 min-w-0 flex flex-col">
            <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </div>
      ) : (
        /* MOBILE & TABLET LAYOUT */
        <div
          className={`min-h-screen bg-cream text-charcoal flex flex-col relative ${
            layoutMode === 'mobile'
              ? 'max-w-[480px] mx-auto border-x border-soil/20 shadow-2xl forced-mobile-view'
              : isTablet
              ? 'max-w-[720px] mx-auto'
              : 'w-full'
          }`}
        >
          {/* Mobile / Tablet Header with View Switch and Language Toggle */}
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-soil/15 px-3 py-2 shadow-2xs">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-1.5">
                <div className="w-7 h-7 rounded-lg bg-forest text-wheat flex items-center justify-center">
                  <Sprout size={16} />
                </div>
                <div>
                  <span className="text-base font-extrabold text-forest leading-none block">
                    {t('appName')}
                  </span>
                  <span className="text-[9px] text-soil font-semibold">
                    {t('stateSubtitle')}
                  </span>
                </div>
              </div>

              {/* View Mode Switcher in Header (Phone / Laptop / Auto) */}
              <div className="flex items-center gap-1.5">
                <ViewModeSwitch variant="compact" />
                <LanguageToggle variant="compact" />
                <button
                  type="button"
                  onClick={() => setShowProfile(true)}
                  className="w-7 h-7 rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center text-forest hover:bg-forest hover:text-cream transition-colors cursor-pointer"
                  title={t('farmerProfile')}
                  aria-label={t('farmerProfile')}
                >
                  <User size={13} />
                </button>
              </div>
            </div>
          </header>

          {/* Top Quick Tab Strip for Mobile / Tablet */}
          <div className="relative z-20 bg-cream/90 backdrop-blur-xs border-b border-soil/10 px-2 py-1.5 shadow-2xs">
            <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
              {navItems.map((tab) => {
                const Icon = tab.icon;
                const isActive = currentTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-forest text-cream shadow-xs font-bold'
                        : 'text-charcoal/70 hover:text-charcoal hover:bg-wheat/30'
                    }`}
                  >
                    <Icon size={13} className={isActive ? 'text-wheat' : 'text-forest/70'} />
                    <span>{t(tab.labelKey as any)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Mobile/Tablet Content */}
          <main className="flex-1 pb-24">{children}</main>

          {/* Mobile Bottom Tab Bar */}
          <BottomNav currentTab={currentTab} onTabChange={(tab) => onTabChange(tab as ActiveTab)} />
        </div>
      )}
    </>
  );
}
