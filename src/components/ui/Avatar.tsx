import { StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '@/src/theme/tokens';

type AvatarProps = {
  initials: string;
  size?: number;
  tone?: 'accent' | 'primary' | 'gold';
};

export function Avatar({ initials, size = 48, tone = 'accent' }: AvatarProps) {
  return (
    <View accessibilityLabel={`Avatar ${initials}`} style={[styles.base, styles[tone], { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.label, { fontSize: size * 0.32 }]}>{initials.slice(0, 2).toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center' },
  accent: { backgroundColor: colors.accent },
  primary: { backgroundColor: colors.primary },
  gold: { backgroundColor: colors.gold },
  label: { color: '#fff', fontWeight: '700', fontFamily: typography.fontFamily.bold },
});
