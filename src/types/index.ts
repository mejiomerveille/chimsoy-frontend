export type GameId = 'quiz' | 'ludo' | 'cards' | 'checkers' | 'racing' | 'moto';

export type GameMode = '1v1' | 'solo' | 'tournament';

export type Game = {
  id: GameId;
  name: string;
  description: string;
  durationLabel: string;
  mode: GameMode;
  color: string;
  icon: string;
  image: string;
  playersOnline: number;
  category: string;
};

export type User = {
  id: string;
  phone: string;
  username: string;
  level: number;
  rankLabel: string;
  points: number;
  city: string;
  country: string;
  avatarInitials: string;
  badges: Badge[];
  stats: UserStats;
};

export type Badge = {
  id: string;
  label: string;
  description: string;
  earnedAt: string;
};

export type UserStats = {
  gamesPlayed: number;
  wins: number;
  losses: number;
  winRate: number;
  bestStreak: number;
  currentStreak: number;
};

export type Match = {
  id: string;
  gameId: GameId;
  mode: GameMode;
  opponent: { username: string; avatarInitials: string; level: number };
  status: 'searching' | 'playing' | 'finished';
  result?: 'win' | 'loss' | 'draw';
  score?: { me: number; opponent: number };
  pointsAwarded?: number;
  createdAt: string;
};

export type Tournament = {
  id: string;
  name: string;
  gameId: GameId;
  entryFee: number;
  prizePool: number;
  participants: number;
  maxParticipants: number;
  startsAt: string;
  status: 'upcoming' | 'live' | 'finished';
};

export type LeaderboardEntry = {
  rank: number;
  username: string;
  avatarInitials: string;
  points: number;
  level: number;
  city: string;
  isMe?: boolean;
};

export type Community = {
  id: string;
  name: string;
  description: string;
  members: number;
  icon: string;
  joined: boolean;
};

export type WalletTransaction = {
  id: string;
  type: 'deposit' | 'withdrawal' | 'win' | 'entry';
  amount: number;
  balanceAfter: number;
  label: string;
  createdAt: string;
};

export type Wallet = {
  balance: number;
  currency: string;
  transactions: WalletTransaction[];
};

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  type: 'match' | 'tournament' | 'wallet' | 'system';
  read: boolean;
  createdAt: string;
};

export type AppSettings = {
  language: 'fr' | 'en';
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  biometricEnabled: boolean;
  privateProfile: boolean;
};
