// src/theme/tokens.ts

// ---------------------------------------------------------------------------
// PALETTE BRUTE — inchangée par rapport à ta version, aucune valeur modifiée
// ---------------------------------------------------------------------------
export const colors = {
  ink: '#0B0F1A',
  inkSoft: '#151C2E',
  inkMuted: '#9AA5B8',
  cream: '#F5F7FA',
  white: '#F5F7FA',
  orange: '#FF6A2C',
  orangeDeep: '#D94C1C',
  orangeSoft: '#3A2119',
  mint: '#8DE0AD',
  mintDeep: '#1FAE5E',
  lime: '#F2B705',
  yellow: '#F2B705',
  blue: '#1A3FE4',
  red: '#E13B38',
  burgundy: '#E13B38',
  burgundyDeep: '#B7282B',
  burgundySoft: '#3A1C26',
  line: '#2A344A',
  shadow: '#000000',
} as const;

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
