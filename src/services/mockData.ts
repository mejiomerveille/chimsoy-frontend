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

export const mockGames: Game[] = [
  {
    id: 'quiz',
    name: 'Quiz Arena',
    description: 'Culture générale, sport, histoire — prouve ton savoir.',
    durationLabel: '5 min',
    mode: '1v1',
    color: '#B8F2D0',
    icon: 'brain',
    image: 'https://images.pexels.com/photos/21562934/pexels-photo-21562934.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    playersOnline: 342,
    category: 'Culture',
  },
  {
    id: 'ludo',
    name: 'Ludo Clash',
    description: 'Stratégie et chance — le classique africain revisité.',
    durationLabel: '10 min',
    mode: 'solo',
    color: '#FF6B35',
    icon: 'gamepad',
    image: 'https://images.pexels.com/photos/11646952/pexels-photo-11646952.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    playersOnline: 518,
    category: 'Stratégie',
  },
  {
    id: 'cards',
    name: 'Cartes Royale',
    description: 'Bluff, stratégie et chance — domine la table.',
    durationLabel: '8 min',
    mode: '1v1',
    color: '#E05252',
    icon: 'cards',
    image: 'https://images.pexels.com/photos/7565486/pexels-photo-7565486.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    playersOnline: 276,
    category: 'Cartes',
  },
  {
    id: 'checkers',
    name: 'Dames Masters',
    description: 'Le jeu de dames classique — chaque coup compte.',
    durationLabel: '12 min',
    mode: '1v1',
    color: '#78C8E8',
    icon: 'checkers',
    image: 'https://images.pexels.com/photos/7450530/pexels-photo-7450530.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    playersOnline: 189,
    category: 'Réflexion',
  },
  {
    id: 'racing',
    name: 'Speed Racing',
    description: 'Pilote à toute vitesse — dépasse tes rivaux sur le circuit.',
    durationLabel: '6 min',
    mode: 'solo',
    color: '#D94C1C',
    icon: 'racing',
    image: 'https://images.pexels.com/photos/11876812/pexels-photo-11876812.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    playersOnline: 431,
    category: 'Course',
  },
  {
    id: 'moto',
    name: 'Moto GP Africa',
    description: 'Motos puissantes, virages serrés — sois le roi de la piste.',
    durationLabel: '7 min',
    mode: '1v1',
    color: '#F5C84B',
    icon: 'moto',
    image: 'https://images.pexels.com/photos/5713150/pexels-photo-5713150.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    playersOnline: 203,
    category: 'Course',
  },
];

export const mockUser: User = {
  id: 'u_001',
  phone: '+237 6 90 00 00 00',
  username: 'Leo237',
  level: 4,
  rankLabel: 'Challenger',
  points: 426,
  city: 'Douala',
  country: 'Cameroun',
  avatarInitials: 'LE',
  badges: [
    { id: 'b1', label: 'Première victoire', description: 'Gagne ta première partie', earnedAt: '2025-08-01' },
    { id: 'b2', label: 'Série de 3', description: 'Enchaîne 3 victoires d’affilée', earnedAt: '2025-08-05' },
  ],
  stats: {
    gamesPlayed: 18,
    wins: 12,
    losses: 6,
    winRate: 67,
    bestStreak: 3,
    currentStreak: 2,
  },
};

export const mockMatches: Match[] = [
  {
    id: 'm_001',
    gameId: 'quiz',
    mode: '1v1',
    opponent: { username: 'Marc237', avatarInitials: 'MA', level: 3 },
    status: 'finished',
    result: 'win',
    score: { me: 8, opponent: 5 },
    pointsAwarded: 32,
    createdAt: '2025-08-20T14:00:00Z',
  },
  {
    id: 'm_002',
    gameId: 'ludo',
    mode: 'solo',
    opponent: { username: 'Bot', avatarInitials: 'BO', level: 2 },
    status: 'finished',
    result: 'loss',
    score: { me: 2, opponent: 3 },
    pointsAwarded: 0,
    createdAt: '2025-08-19T18:00:00Z',
  },
];

export const mockTournaments: Tournament[] = [
  {
    id: 't_001',
    name: 'Coupe Douala Quiz',
    gameId: 'quiz',
    entryFee: 100,
    prizePool: 50000,
    participants: 34,
    maxParticipants: 64,
    startsAt: '2025-09-05T16:00:00Z',
    status: 'upcoming',
  },
  {
    id: 't_002',
    name: 'Ludo Masters Afrique',
    gameId: 'ludo',
    entryFee: 0,
    prizePool: 100000,
    participants: 128,
    maxParticipants: 128,
    startsAt: '2025-08-28T20:00:00Z',
    status: 'live',
  },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: 'Queen237', avatarInitials: 'QU', points: 1840, level: 9, city: 'Douala' },
  { rank: 2, username: 'YaoundéKing', avatarInitials: 'YK', points: 1620, level: 8, city: 'Yaoundé' },
  { rank: 3, username: 'BafoussamX', avatarInitials: 'BX', points: 1490, level: 7, city: 'Bafoussam' },
  { rank: 24, username: 'Leo237', avatarInitials: 'LE', points: 426, level: 4, city: 'Douala', isMe: true },
  { rank: 25, username: 'Marc237', avatarInitials: 'MA', points: 410, level: 3, city: 'Douala' },
];

export const mockCommunities: Community[] = [
  { id: 'c1', name: 'Douala Gamers', description: 'La communauté des joueurs de Douala', members: 1240, icon: 'users', joined: true },
  { id: 'c2', name: 'Quiz Masters CM', description: 'Les rois du quiz camerounais', members: 860, icon: 'brain', joined: false },
  { id: 'c3', name: 'Ludo Legends', description: 'Pour les passionnés de Ludo', members: 520, icon: 'gamepad', joined: false },
];

export const mockWallet: Wallet = {
  balance: 2500,
  currency: 'FCFA',
  transactions: [
    { id: 'tx1', type: 'deposit', amount: 2000, balanceAfter: 2500, label: 'Dépôt MTN MoMo', createdAt: '2025-08-20T10:00:00Z' },
    { id: 'tx2', type: 'win', amount: 500, balanceAfter: 500, label: 'Victoire Quiz Arena', createdAt: '2025-08-20T14:30:00Z' },
    { id: 'tx3', type: 'entry', amount: -100, balanceAfter: 0, label: 'Inscription Coupe Douala', createdAt: '2025-08-18T12:00:00Z' },
  ],
};

export const mockNotifications: AppNotification[] = [
  { id: 'n1', title: 'Match trouvé', body: 'Un adversaire de niveau 3 est prêt pour le Quiz Arena.', type: 'match', read: false, createdAt: '2025-08-21T09:00:00Z' },
  { id: 'n2', title: 'Tournoi bientôt', body: 'Coupe Douala Quiz commence dans 3 jours.', type: 'tournament', read: false, createdAt: '2025-08-21T08:00:00Z' },
  { id: 'n3', title: 'Dépôt confirmé', body: '2 000 FCFA ajoutés à ton portefeuille.', type: 'wallet', read: true, createdAt: '2025-08-20T10:01:00Z' },
];
