import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  
  // Admin
  isAdminLoggedIn: boolean;
  loginAttempts: number;
  lockoutUntil: number | null;
  adSenseCode: string;
  announcement: string;
  siteName: string;
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
  
  adminLogin: (username: string, password: string) => boolean;
  adminLogout: () => void;
  setAdSenseCode: (code: string) => void;
  setAnnouncement: (text: string) => void;
  setSiteName: (name: string) => void;
  
  // AI Usage
  aiUsesToday: number;
  aiLastReset: string;
  incrementAIUse: () => boolean;
  getRemainingAIUses: () => number;
  
  // Stats (simulated)
  toolUses: Record<string, number>;
  incrementToolUse: (toolId: string) => void;
}

const ADMIN_USERNAME = 'toolhive@9698';
const ADMIN_PASSWORD = 'ToolHive@9698';
const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const MAX_AI_USES_PER_DAY = 5;

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      darkMode: false,
      toggleDarkMode: () => {
        set((state) => {
          const newMode = !state.darkMode;
          if (newMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { darkMode: newMode };
        });
      },
      
      // Admin state
      isAdminLoggedIn: false,
      loginAttempts: 0,
      lockoutUntil: null,
      adSenseCode: '',
      announcement: '',
      siteName: 'ToolHive',
      
      adminLogin: (username: string, password: string) => {
        const state = get();
        
        // Check lockout
        if (state.lockoutUntil && Date.now() < state.lockoutUntil) {
          return false;
        }
        
        // Reset lockout if expired
        if (state.lockoutUntil && Date.now() >= state.lockoutUntil) {
          set({ lockoutUntil: null, loginAttempts: 0 });
        }
        
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
          set({ isAdminLoggedIn: true, loginAttempts: 0, lockoutUntil: null });
          return true;
        }
        
        const newAttempts = state.loginAttempts + 1;
        if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
          set({ loginAttempts: newAttempts, lockoutUntil: Date.now() + LOCKOUT_DURATION });
        } else {
          set({ loginAttempts: newAttempts });
        }
        return false;
      },
      
      adminLogout: () => set({ isAdminLoggedIn: false }),
      setAdSenseCode: (code: string) => set({ adSenseCode: code }),
      setAnnouncement: (text: string) => set({ announcement: text }),
      setSiteName: (name: string) => set({ siteName: name }),
      geminiApiKey: '',
      setGeminiApiKey: (key: string) => set({ geminiApiKey: key }),
      
      // AI Usage
      aiUsesToday: 0,
      aiLastReset: new Date().toDateString(),
      
      incrementAIUse: () => {
        const state = get();
        const today = new Date().toDateString();
        
        // Reset if new day
        if (state.aiLastReset !== today) {
          set({ aiUsesToday: 1, aiLastReset: today });
          return true;
        }
        
        if (state.aiUsesToday >= MAX_AI_USES_PER_DAY) {
          return false;
        }
        
        set({ aiUsesToday: state.aiUsesToday + 1 });
        return true;
      },
      
      getRemainingAIUses: () => {
        const state = get();
        const today = new Date().toDateString();
        
        if (state.aiLastReset !== today) {
          return MAX_AI_USES_PER_DAY;
        }
        
        return Math.max(0, MAX_AI_USES_PER_DAY - state.aiUsesToday);
      },
      
      // Tool usage stats
      toolUses: {},
      incrementToolUse: (toolId: string) => {
        set((state) => ({
          toolUses: {
            ...state.toolUses,
            [toolId]: (state.toolUses[toolId] || 0) + 1
          }
        }));
      }
    }),
    {
      name: 'toolhive-storage',
    }
  )
);
