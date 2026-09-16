import { StyleSheet, Text, View } from 'react-native';
import { colors, typography , theme} from '@/src/theme/tokens';

type BadgeProps = {
  label: string;
  tone?: 'primary' | 'accent' | 'gold' | 'surface';
};

export function Badge({ label, tone = 'accent' }: BadgeProps) {
  return (
    <View style={[styles.base, styles[tone]]}>
      <Text style={[styles.label, tone === 'surface' && styles.surfaceLabel]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 999 },
  primary: { backgroundColor: theme.link },
  accent: { backgroundColor: theme.action },
  gold: { backgroundColor: theme.reward },
  surface: { backgroundColor: theme.surface },
  label: { color: '#fff', fontSize: 11, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  surfaceLabel: { color: theme.textPrimary },
});
