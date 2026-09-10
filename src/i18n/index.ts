import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      app: { name: 'CHIMSOY', tagline: 'Joue fort. Monte plus haut.' },
      nav: { home: 'Accueil', games: 'Jeux', tournaments: 'Tournois', wallet: 'Portefeuille', profile: 'Profil' },
      auth: {
        welcome: 'Bienvenue sur CHIMSOY',
        subtitle: 'La compétition africaine commence ici.',
        phone: 'Numéro de téléphone',
        phonePlaceholder: '+237 6 90 00 00 00',
        sendOtp: 'Envoyer le code',
        otp: 'Code de vérification',
        otpPlaceholder: 'Code à 4 chiffres',
        verify: 'Vérifier',
        password: 'Mot de passe',
        passwordPlaceholder: 'Ton mot de passe',
        login: 'Se connecter',
        or: 'ou',
      },
      home: {
        play: 'Jouer', challenge: 'Défi', tournaments: 'Tournois', leaderboard: 'Classement',
        communities: 'Communautés', wallet: 'Portefeuille',
        findOpponent: 'Trouver un adversaire', quickPlay: 'Partie rapide',
      },
      games: { title: 'Choisis ton terrain', subtitle: 'Ton arène CHIMSOY' },
      matchmaking: { searching: 'Recherche d\'adversaire en cours…', found: 'Adversaire trouvé !', vs: 'contre' },
      result: { win: 'Victoire', loss: 'Défaite', draw: 'Égalité', points: 'points gagnés', backHome: 'Retour à l\'accueil' },
      tournaments: { title: 'Tournois & Compétitions', upcoming: 'À venir', live: 'En direct', join: 'S\'inscrire', full: 'Complet' },
      leaderboard: { title: 'Classements', city: 'Ville', country: 'Pays', africa: 'Afrique', world: 'Monde', rank: 'Rang', player: 'Joueur', points: 'Points' },
      communities: { title: 'Communautés', join: 'Rejoindre', joined: 'Membre', members: 'membres' },
      wallet: { title: 'Portefeuille', balance: 'Solde', deposit: 'Déposer', withdraw: 'Retirer', history: 'Historique' },
      profile: { title: 'Profil', stats: 'Statistiques', badges: 'Badges', level: 'Niveau', wins: 'Victoires', losses: 'Défaites', winRate: 'Taux de victoire', streak: 'Série actuelle' },
      notifications: { title: 'Notifications', markAllRead: 'Tout marquer comme lu', empty: 'Aucune notification' },
      settings: {
        title: 'Paramètres', language: 'Langue', security: 'Sécurité', notifications: 'Notifications',
        privacy: 'Confidentialité', account: 'Compte', sound: 'Sons', biometric: 'Verrouillage biométrique',
        privateProfile: 'Profil privé', logout: 'Se déconnecter', french: 'Français', english: 'Anglais',
      },
      common: { loading: 'Chargement…', retry: 'Réessayer', error: 'Une erreur est survenue', empty: 'Rien à afficher' },
    },
  },
  en: {
    translation: {
      app: { name: 'CHIMSOY', tagline: 'Play hard. Rise higher.' },
      nav: { home: 'Home', games: 'Games', tournaments: 'Tournaments', wallet: 'Wallet', profile: 'Profile' },
      auth: {
        welcome: 'Welcome to CHIMSOY',
        subtitle: 'African competition starts here.',
        phone: 'Phone number',
        phonePlaceholder: '+237 6 90 00 00 00',
        sendOtp: 'Send code',
        otp: 'Verification code',
        otpPlaceholder: '4-digit code',
        verify: 'Verify',
        password: 'Password',
        passwordPlaceholder: 'Your password',
        login: 'Sign in',
        or: 'or',
      },
      home: {
        play: 'Play', challenge: 'Challenge', tournaments: 'Tournaments', leaderboard: 'Leaderboard',
        communities: 'Communities', wallet: 'Wallet',
        findOpponent: 'Find an opponent', quickPlay: 'Quick play',
      },
      games: { title: 'Pick your arena', subtitle: 'Your CHIMSOY arena' },
      matchmaking: { searching: 'Searching for an opponent…', found: 'Opponent found!', vs: 'vs' },
      result: { win: 'Victory', loss: 'Defeat', draw: 'Draw', points: 'points earned', backHome: 'Back to home' },
      tournaments: { title: 'Tournaments & Competitions', upcoming: 'Upcoming', live: 'Live', join: 'Join', full: 'Full' },
      leaderboard: { title: 'Leaderboards', city: 'City', country: 'Country', africa: 'Africa', world: 'World', rank: 'Rank', player: 'Player', points: 'Points' },
      communities: { title: 'Communities', join: 'Join', joined: 'Member', members: 'members' },
      wallet: { title: 'Wallet', balance: 'Balance', deposit: 'Deposit', withdraw: 'Withdraw', history: 'History' },
      profile: { title: 'Profile', stats: 'Statistics', badges: 'Badges', level: 'Level', wins: 'Wins', losses: 'Losses', winRate: 'Win rate', streak: 'Current streak' },
      notifications: { title: 'Notifications', markAllRead: 'Mark all read', empty: 'No notifications' },
      settings: {
        title: 'Settings', language: 'Language', security: 'Security', notifications: 'Notifications',
        privacy: 'Privacy', account: 'Account', sound: 'Sound', biometric: 'Biometric lock',
        privateProfile: 'Private profile', logout: 'Sign out', french: 'French', english: 'English',
      },
      common: { loading: 'Loading…', retry: 'Retry', error: 'Something went wrong', empty: 'Nothing to show' },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr',
  fallbackLng: 'fr',
  interpolation: { escapeValue: false },
});

export default i18n;
