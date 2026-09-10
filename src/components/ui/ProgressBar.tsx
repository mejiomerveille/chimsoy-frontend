import { StyleSheet, View } from 'react-native';
import { colors, radius } from '@/src/theme/tokens';

type ProgressBarProps = {
  value: number;
  color?: string;
};

export function ProgressBar({ value, color = colors.accent }: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(1, value));

  return (
    <View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: safeValue * 100 }} style={styles.track}>
      <View style={[styles.fill, { width: `${safeValue * 100}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 8, overflow: 'hidden', backgroundColor: colors.surface, borderRadius: radius.full },
  fill: { height: '100%', borderRadius: radius.full },
});
