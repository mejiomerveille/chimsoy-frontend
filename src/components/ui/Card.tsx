import { StyleSheet, View, type ViewProps } from 'react-native';
import { colors, radii, spacing , theme} from '@/src/theme/tokens';

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
    borderRadius: radii.lg,
    padding: spacing.lg,
  },
  surface: { backgroundColor: theme.surface },
  background: { backgroundColor: theme.background },
  primary: { backgroundColor: theme.link },
  compact: { padding: spacing.md, borderRadius: radii.md },
});
