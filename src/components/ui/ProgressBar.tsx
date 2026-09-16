import { StyleSheet, View } from 'react-native';
import { colors, radii , theme} from '@/src/theme/tokens';

type ProgressBarProps = {
  value: number;
  color?: string;
};

export function ProgressBar({ value, color = theme.action }: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(1, value));

  return (
    <View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: safeValue * 100 }} style={styles.track}>
      <View style={[styles.fill, { width: `${safeValue * 100}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 8, overflow: 'hidden', backgroundColor: theme.surface, borderRadius: radii.pill },
  fill: { height: '100%', borderRadius: radii.pill },
});
