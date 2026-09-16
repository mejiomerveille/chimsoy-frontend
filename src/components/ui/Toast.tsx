import { StyleSheet, Text, View } from 'react-native';
import { Check, Info } from 'lucide-react-native';
import { colors, radii, spacing, typography , theme} from '@/src/theme/tokens';

type ToastProps = {
  message: string;
  tone?: 'success' | 'info';
};

export function Toast({ message, tone = 'success' }: ToastProps) {
  const Icon = tone === 'success' ? Check : Info;

  return (
    <View accessibilityLiveRegion="polite" style={styles.base}>
      <Icon color={theme.textPrimary} size={18} strokeWidth={3} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, padding: spacing.md, backgroundColor: theme.success, borderRadius: radii.md },
  message: { flex: 1, color: '#fff', fontSize: 14, fontWeight: '700', fontFamily: typography.fontFamily.semiBold },
});
