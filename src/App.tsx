import { useEffect } from 'react';
import { AppProvider, useAppContext, ActiveTab } from './lib/store';
import { BottomNav } from './components/BottomNav';
import { VoiceAssistant } from './components/VoiceAssistant';
import { FieldBackground } from './components/FieldBackground';
import { ProactiveAlertBanner } from './components/ProactiveAlertBanner';
import { useTranslation } from './lib/translations';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import CropRecommendation from './pages/CropRecommendation';
import DiseaseDetection from './pages/DiseaseDetection';
import YieldForecasting from './pages/YieldForecasting';
import MarketROI from './pages/MarketROI';
import { AppShell } from './components/AppShell';
import { Home, Sprout, Bug, TrendingUp, CircleDollarSign } from 'lucide-react';

const PATH_TO_TAB: Record<string, ActiveTab> = {
  '/dashboard': 'dashboard',
  '/home': 'dashboard',
  '/crop': 'crop',
  '/crops': 'crop',
  '/disease': 'disease',
  '/diseases': 'disease',
  '/yield': 'yield',
  '/yields': 'yield',
  '/forecast': 'yield',
  '/market': 'market',
  '/markets': 'market',
  '/mandi': 'market',
  '/roi': 'market',
};

const TAB_TO_PATH: Record<ActiveTab, string> = {
  dashboard: '/dashboard',
  crop: '/crop',
  disease: '/disease',
  yield: '/yield',
  market: '/market',
};

function AppContent() {
  const { state, switchTab, navigateTo } = useAppContext();
  const { t } = useTranslation(state.language);
  const currentTab = state.currentTab || 'dashboard';

  // Synchronize browser URL and internal dashboard tab state
  useEffect(() => {
    const syncRouteFromPath = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
      if (PATH_TO_TAB[path]) {
        switchTab(PATH_TO_TAB[path]);
      } else if (path === '/login') {
        navigateTo('login');
      } else if (path === '/landing') {
        navigateTo('landing');
      }
    };

    // Initial check on load
    syncRouteFromPath();

    // Listen for browser Back/Forward navigation
    window.addEventListener('popstate', syncRouteFromPath);
    return () => window.removeEventListener('popstate', syncRouteFromPath);
  }, []);

  const handleTabChange = (tab: ActiveTab) => {
    switchTab(tab);
    const targetPath = TAB_TO_PATH[tab] || '/dashboard';
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
  };

  // Stage 10: Entry Views (Front/Landing and Login)
  if (state.currentView === 'landing') {
    return <LandingPage />;
  }

  if (state.currentView === 'login') {
    return <LoginPage />;
  }

  // Working App Screens with Nature-themed Background
  return (
    <div className="min-h-screen bg-cream text-charcoal font-sans selection:bg-forest/20 flex flex-col relative overflow-x-hidden">
      {/* Shared Subtle Nature-Themed Background */}
      <FieldBackground intensity="subtle" />

      {/* Stage 11: Proactive Opt-In Alert Banner */}
      <ProactiveAlertBanner />

      <AppShell currentTab={currentTab} onTabChange={handleTabChange}>
        {currentTab === 'dashboard' && <Dashboard />}
        {currentTab === 'crop' && <CropRecommendation />}
        {currentTab === 'disease' && <DiseaseDetection />}
        {currentTab === 'yield' && <YieldForecasting />}
        {currentTab === 'market' && <MarketROI />}
      </AppShell>

      <VoiceAssistant />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
