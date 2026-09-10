import { create } from 'zustand';
import type { User, AppSettings, Match } from '@/src/types';
import { mockUser } from '@/src/services/mockData';

type GameResult = {
  gameId: 'quiz' | 'ludo';
  result: 'win' | 'loss';
  myScore: number;
  opponentScore: number;
  opponentName: string;
  opponentInitials: string;
  pointsAwarded: number;
  coinsAwarded: number;
};

type AppState = {
  user: User | null;
  isAuthenticated: boolean;
  settings: AppSettings;
  currentMatch: Match | null;
  lastResult: GameResult | null;
  walletBalance: number;
  joinedCommunities: string[];
  joinedTournaments: string[];
  readNotifications: string[];
  setAuthenticated: (user: User) => void;
  logout: () => void;
  updateSettings: (patch: Partial<AppSettings>) => void;
  setCurrentMatch: (match: Match | null) => void;
  setLastResult: (result: GameResult) => void;
  addCoins: (amount: number) => void;
  toggleCommunity: (id: string) => void;
  toggleTournament: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
};

const defaultSettings: AppSettings = {
  language: 'fr',
  notificationsEnabled: true,
  soundEnabled: true,
  biometricEnabled: false,
  privateProfile: false,
};

export const useAppStore = create<AppState>((set) => ({
  user: mockUser,
  isAuthenticated: false,
  settings: defaultSettings,
  currentMatch: null,
  lastResult: null,
  walletBalance: 2500,
  joinedCommunities: ['c1'],
  joinedTournaments: [],
  readNotifications: ['n3'],
  setAuthenticated: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateSettings: (patch) => set((s) => ({ settings: { ...s.settings, ...patch } })),
  setCurrentMatch: (match) => set({ currentMatch: match }),
  setLastResult: (result) => set({ lastResult: result }),
  addCoins: (amount) => set((s) => ({ walletBalance: s.walletBalance + amount })),
  toggleCommunity: (id) =>
    set((s) => ({
      joinedCommunities: s.joinedCommunities.includes(id)
        ? s.joinedCommunities.filter((c) => c !== id)
        : [...s.joinedCommunities, id],
    })),
  toggleTournament: (id) =>
    set((s) => ({
      joinedTournaments: s.joinedTournaments.includes(id)
        ? s.joinedTournaments.filter((t) => t !== id)
        : [...s.joinedTournaments, id],
    })),
  markNotificationRead: (id) =>
    set((s) => ({ readNotifications: [...s.readNotifications, id] })),
  markAllNotificationsRead: () => set({ readNotifications: ['n1', 'n2', 'n3'] }),
}));
