import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en-IN' | 'hi-IN' | 'kn-IN' | 'ml-IN' | 'ta-IN' | 'te-IN' | 'mr-IN';

export interface SoilProfile {
  n: number;
  p: number;
  k: number;
  ph: number;
  moisture?: number;
  source: 'Estimated' | 'Tested';
  type?: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  district: string;
  farmSize: number;
  hasSoilCard?: boolean;
}

export type ActiveTab = 'dashboard' | 'crop' | 'disease' | 'yield' | 'market';
export type LayoutMode = 'auto' | 'mobile' | 'desktop';

export interface AppState {
  language: Language;
  district: string;
  locationSource: 'gps' | 'manual' | null;
  soilProfile: SoilProfile | null;
  season: 'Kharif' | 'Rabi' | 'Zaid';
  farmSize: number;
  mandiPrices: Record<string, number>;
  mandiFetchTime: number | null;
  isLoggedIn: boolean;
  userProfile: UserProfile | null;
  currentView: 'landing' | 'login' | 'app';
  currentTab: ActiveTab;
  proactiveAlertsEnabled: boolean;
  layoutMode: LayoutMode;
  isAssistantOpen: boolean;
}

const defaultState: AppState = {
  language: 'kn-IN',
  district: 'Bengaluru Urban',
  locationSource: null,
  soilProfile: null,
  season: 'Kharif',
  farmSize: 1,
  mandiPrices: {},
  mandiFetchTime: null,
  isLoggedIn: false,
  userProfile: null,
  currentView: 'landing',
  currentTab: 'dashboard',
  proactiveAlertsEnabled: false,
  layoutMode: 'auto',
  isAssistantOpen: false,
};

interface AppContextType {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  loginUser: (profile: UserProfile) => void;
  logoutUser: () => void;
  navigateTo: (view: 'landing' | 'login' | 'app', tab?: ActiveTab) => void;
  switchTab: (tab: ActiveTab) => void;
  setLayoutMode: (mode: LayoutMode) => void;
  toggleAssistant: () => void;
  setAssistantOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem('agrimind_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultState,
          ...parsed,
          // If already logged in, go straight to app, otherwise allow landing
          currentView: parsed.isLoggedIn ? 'app' : (parsed.currentView || 'landing'),
        };
      }
      return defaultState;
    } catch {
      return defaultState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('agrimind_state', JSON.stringify(state));
    } catch (err) {
      console.warn('Failed to save to localStorage:', err);
    }
  }, [state]);

  const updateState = (updates: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const loginUser = (profile: UserProfile) => {
    setState((prev) => ({
      ...prev,
      isLoggedIn: true,
      userProfile: profile,
      district: profile.district || prev.district,
      farmSize: profile.farmSize || prev.farmSize,
      currentView: 'app',
    }));
  };

  const logoutUser = () => {
    setState((prev) => ({
      ...prev,
      isLoggedIn: false,
      userProfile: null,
      currentView: 'landing',
    }));
  };

  const navigateTo = (view: 'landing' | 'login' | 'app', tab?: ActiveTab) => {
    setState((prev) => ({
      ...prev,
      currentView: view,
      currentTab: tab || prev.currentTab || 'dashboard',
    }));
  };

  const switchTab = (tab: ActiveTab) => {
    setState((prev) => ({
      ...prev,
      currentView: 'app',
      currentTab: tab,
    }));
  };

  const setLayoutMode = (mode: LayoutMode) => {
    setState((prev) => ({
      ...prev,
      layoutMode: mode,
    }));
  };

  const toggleAssistant = () => {
    setState((prev) => ({
      ...prev,
      isAssistantOpen: !prev.isAssistantOpen,
    }));
  };

  const setAssistantOpen = (open: boolean) => {
    setState((prev) => ({
      ...prev,
      isAssistantOpen: open,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        state,
        updateState,
        loginUser,
        logoutUser,
        navigateTo,
        switchTab,
        setLayoutMode,
        toggleAssistant,
        setAssistantOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
