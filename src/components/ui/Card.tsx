import { StyleSheet, View, type ViewProps } from 'react-native';
import { colors, radius, spacing } from '@/src/theme/tokens';

type CardProps = ViewProps & {
  tone?: 'surface' | 'background' | 'primary';
  compact?: boolean;
};

export function Card({ children, tone = 'surface', compact = false, style, ...props }: CardProps) {
  return (
    <View {...props} style={[styles.base, styles[tone], compact && styles.compact, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  surface: { backgroundColor: colors.surface },
  background: { backgroundColor: colors.background },
  primary: { backgroundColor: colors.primary },
  compact: { padding: spacing.md, borderRadius: radius.md },
});
