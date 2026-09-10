import { Pressable, StyleSheet, Text } from 'react-native';
import type { ReactNode } from 'react';
import { colors, radius, spacing, typography } from '@/src/theme/tokens';

type ButtonVariant = 'primary' | 'accent' | 'ghost';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  icon?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
};

export function Button({ label, onPress, variant = 'accent', icon, disabled = false, fullWidth = false }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.label, variant === 'ghost' && styles.ghostLabel]}>{label}</Text>
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  primary: { backgroundColor: colors.primary },
  accent: { backgroundColor: colors.accent },
  ghost: { paddingHorizontal: spacing.sm, backgroundColor: 'transparent' },
  fullWidth: { width: '100%' },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
  disabled: { opacity: 0.45 },
  label: { color: '#fff', fontSize: 15, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  ghostLabel: { color: colors.textSecondary },
});
