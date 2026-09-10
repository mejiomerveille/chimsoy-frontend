import type {
  Game,
  User,
  Match,
  Tournament,
  LeaderboardEntry,
  Community,
  Wallet,
  AppNotification,
} from '@/src/types';
import {
  mockGames,
  mockUser,
  mockMatches,
  mockTournaments,
  mockLeaderboard,
  mockCommunities,
  mockWallet,
  mockNotifications,
} from './mockData';

function delay<T>(value: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const api = {
  login: (phone: string, _otp: string) => delay({ token: 'mock-token', user: mockUser }),
  getGames: () => delay<Game[]>(mockGames),
  getProfile: () => delay<User>(mockUser),
  getMatches: () => delay<Match[]>(mockMatches),
  getTournaments: () => delay<Tournament[]>(mockTournaments),
  getLeaderboard: (_scope: 'city' | 'country' | 'africa' | 'world') => delay<LeaderboardEntry[]>(mockLeaderboard),
  getCommunities: () => delay<Community[]>(mockCommunities),
  getWallet: () => delay<Wallet>(mockWallet),
  getNotifications: () => delay<AppNotification[]>(mockNotifications),
  findMatch: (_gameId: string) => delay<Match>({
    id: 'm_live',
    gameId: 'quiz',
    mode: '1v1',
    opponent: { username: 'Sam237', avatarInitials: 'SA', level: 4 },
    status: 'playing',
    createdAt: new Date().toISOString(),
  }, 1500),
};
