// src/theme/tokens.ts

// ---------------------------------------------------------------------------
// PALETTE BRUTE — inchangée par rapport à ta version, aucune valeur modifiée
// ---------------------------------------------------------------------------
export const colors = {
  ink: '#091A1B',
  inkSoft: '#102A2A',
  inkMuted: '#567070',
  cream: '#F6F4ED',
  white: '#FFFFFF',
  orange: '#FF6B35',
  orangeDeep: '#D94C1C',
  orangeSoft: '#FFE2D6',
  mint: '#B8F2D0',
  mintDeep: '#2FA56D',
  lime: '#D7F36B',
  yellow: '#F5C84B',
  blue: '#78C8E8',
  red: '#E05252',
  burgundy: '#874A4A',
  burgundyDeep: '#5D2C2F',
  burgundySoft: '#F4E9E8',
  line: '#D9E1DA',
  shadow: '#001414',

  background: '#0B0F1A',
  surface: '#151C2E',
  primary: '#1A3FE4',
  accent: '#FF6A2C',
  gold: '#F2B705',
  success: '#1FAE5E',
  danger: '#E13B3B',
  textPrimary: '#F5F7FA',
  textSecondary: '#9AA5B8',
} as const;


export const radius = { sm: 8, md: 12, lg: 16, full: 999 } as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  sm: 10,
  md: 18,
  lg: 28,
  pill: 999,
} as const;

export const typography = {
  fontFamily: {
    bold: 'Poppins-Bold',
    semiBold: 'Poppins-SemiBold',
    medium: 'Poppins-Medium',
    regular: 'Poppins-Regular',
  },
  display: 42,
  title: 28,
  heading: 20,
  body: 16,
  caption: 13,
  micro: 11,
} as const;

export const shadows = {
  card: {
    shadowColor: colors.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
} as const;

// ---------------------------------------------------------------------------
// AJOUTS — nouveau, n'écrase rien de ce qui précède. Import optionnel.
// ---------------------------------------------------------------------------

// Familles de police : à utiliser avec `typography.*` (ex: fontSize: typography.title, fontFamily: fontFamily.bold)
export const fontFamily = {
  bold: 'Poppins-Bold',
  semiBold: 'Poppins-SemiBold',
  medium: 'Poppins-Medium',
  regular: 'Poppins-Regular',
} as const;

// Hauteurs de ligne associées à chaque taille de `typography`
export const lineHeights = {
  display: 48,
  title: 34,
  heading: 26,
  body: 22,
  caption: 18,
  micro: 15,
} as const;

// Rôles sémantiques : à utiliser dans les écrans à la place de `colors.*` directement,
// pour que le sens d'une couleur reste clair et cohérent partout dans l'app.
export const theme = {
  background: colors.ink,
  surface: colors.inkSoft,

  textPrimary: colors.white,
  textOnSurfaceSoft: colors.cream,
  textSecondary: colors.inkMuted,

  border: colors.line,

  // Action principale (CTA) — un seul par écran
  action: colors.orange,
  actionPressed: colors.orangeDeep,
  actionSoft: colors.orangeSoft,

  // Actions secondaires, liens, navigation
  link: colors.blue,

  // États système
  success: colors.mintDeep,
  successSoft: colors.mint,
  danger: colors.red,

  // Valeur / récompense (trophées, gains, classement)
  reward: colors.yellow,

  // Accents spéciaux (badges "nouveau", "en direct"...)
  highlight: colors.lime,

  // Réservé aux écrans liés à l'argent réel (portefeuille, mises, enjeux)
  money: colors.burgundy,
  moneyPressed: colors.burgundyDeep,
  moneySoft: colors.burgundySoft,
} as const;