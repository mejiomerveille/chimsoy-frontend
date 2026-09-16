import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Check, User } from 'lucide-react-native';
import { colors, radii, spacing, typography, theme } from '@/src/theme/tokens';
import { useAppStore } from '@/src/store/useAppStore';

const avatarColors = [
  { bg: colors.accent, label: 'Orange' },
  { bg: colors.primary, label: 'Bleu' },
  { bg: colors.success, label: 'Vert' },
  { bg: colors.gold, label: 'Or' },
  { bg: colors.danger, label: 'Rouge' },
  { bg: theme.link, label: 'Cyan' },
];

const avatarEmojis = ['🦁', '🦅', '🐆', '🐘', '🦓', '🐊', '🦒', '🐃', '🦏', '🦖', '🐉', '🦜'];

export default function AvatarScreen() {
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedEmoji, setSelectedEmoji] = useState(0);

  const handleContinue = () => {
    setAuthenticated({
      id: 'u_001',
      phone: '+237 6 90 00 00 00',
      username: 'Leo237',
      level: 4,
      rankLabel: 'Challenger',
      points: 426,
      city: 'Douala',
      country: 'Cameroun',
      avatarInitials: avatarEmojis[selectedEmoji],
      badges: [],
      stats: { gamesPlayed: 0, wins: 0, losses: 0, winRate: 0, bestStreak: 0, currentStreak: 0 },
    });
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
          <Text style={styles.eyebrow}>PERSONNALISATION</Text>
          <Text style={styles.title}>Choisis ton avatar</Text>
          <Text style={styles.subtitle}>Ton avatar sera visible par tes adversaires</Text>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(200).duration(400)} style={styles.previewWrap}>
          <View style={[styles.preview, { backgroundColor: avatarColors[selectedColor].bg }]}>
            <Text style={styles.previewEmoji}>{avatarEmojis[selectedEmoji]}</Text>
          </View>
          <Text style={styles.previewLabel}>{avatarColors[selectedColor].label}</Text>
        </Animated.View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>COULEUR</Text>
          <View style={styles.colorRow}>
            {avatarColors.map((c, idx) => (
              <Animated.View key={idx} entering={FadeInDown.delay(idx * 50).duration(200)}>
                <Pressable
                  onPress={() => setSelectedColor(idx)}
                  style={({ pressed }) => [
                    styles.colorDot,
                    { backgroundColor: c.bg },
                    selectedColor === idx && styles.colorDotSelected,
                    pressed && styles.colorDotPressed,
                  ]}
                >
                  {selectedColor === idx && <Check color={colors.textPrimary} size={18} strokeWidth={3} />}
                </Pressable>
              </Animated.View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>EMBLÈME</Text>
          <View style={styles.emojiGrid}>
            {avatarEmojis.map((emoji, idx) => (
              <Animated.View key={idx} entering={FadeInDown.delay(idx * 30).duration(150)}>
                <Pressable
                  onPress={() => setSelectedEmoji(idx)}
                  style={({ pressed }) => [
                    styles.emojiCell,
                    selectedEmoji === idx && styles.emojiCellSelected,
                    pressed && styles.emojiCellPressed,
                  ]}
                >
                  <Text style={styles.emojiText}>{emoji}</Text>
                </Pressable>
              </Animated.View>
            ))}
          </View>
        </View>

        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.footer}>
          <Pressable
            onPress={handleContinue}
            style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          >
            <Text style={styles.ctaText}>Commencer à jouer</Text>
          </Pressable>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  safe: { flex: 1 },
  header: { alignItems: 'center', paddingHorizontal: spacing.xl, paddingTop: spacing.xxl, paddingBottom: spacing.md, gap: spacing.xs },
  eyebrow: { color: colors.accent, fontSize: typography.micro, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1.4 },
  title: { color: colors.textPrimary, fontSize: typography.title, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -0.5, textAlign: 'center' },
  subtitle: { color: colors.textSecondary, fontSize: typography.caption, fontFamily: typography.fontFamily.regular, textAlign: 'center' },
  previewWrap: { alignItems: 'center', gap: spacing.sm, marginVertical: spacing.lg },
  preview: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  previewEmoji: { fontSize: 48 },
  previewLabel: { color: colors.textSecondary, fontSize: typography.caption, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  section: { paddingHorizontal: spacing.lg, gap: spacing.sm },
  sectionLabel: { color: colors.textSecondary, fontSize: typography.micro, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1 },
  colorRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  colorDot: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  colorDotSelected: { borderWidth: 3, borderColor: colors.textPrimary },
  colorDotPressed: { opacity: 0.8, transform: [{ scale: 0.95 }] },
  emojiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  emojiCell: { width: 56, height: 56, borderRadius: radii.md, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface, borderWidth: 2, borderColor: 'transparent' },
  emojiCellSelected: { borderColor: colors.accent, backgroundColor: 'rgba(255,106,44,0.12)' },
  emojiCellPressed: { opacity: 0.85, transform: [{ scale: 0.95 }] },
  emojiText: { fontSize: 28 },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, marginTop: 'auto' },
  cta: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.accent, borderRadius: radii.pill, paddingVertical: 16, minHeight: 54,
  },
  ctaPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  ctaText: { color: colors.background, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold },
});
