import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Check, Globe } from 'lucide-react-native';
import { colors, radii, spacing, typography } from '@/src/theme/tokens';
import { useAppStore } from '@/src/store/useAppStore';

type Lang = 'fr' | 'en';

const languages: { id: Lang; label: string; sub: string }[] = [
  { id: 'fr', label: 'Français', sub: 'La langue principale du Cameroun' },
  { id: 'en', label: 'English', sub: 'Main language across Africa' },
];

export default function LanguageScreen() {
  const updateSettings = useAppStore((s) => s.updateSettings);
  const [selected, setSelected] = useState<Lang>('fr');

  const handleContinue = () => {
    updateSettings({ language: selected });
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
          <View style={styles.iconWrap}>
            <Globe color={colors.white} size={32} />
          </View>
          <Text style={styles.title}>Choisis ta langue</Text>
          <Text style={styles.subtitle}>Tu pourras la changer plus tard dans les paramètres</Text>
        </Animated.View>

        <View style={styles.list}>
          {languages.map((lang, idx) => {
            const isSelected = selected === lang.id;
            return (
              <Animated.View key={lang.id} entering={FadeInDown.delay(idx * 100).duration(300)}>
                <Pressable
                  onPress={() => setSelected(lang.id)}
                  style={({ pressed }) => [styles.option, isSelected && styles.optionSelected, pressed && styles.optionPressed]}
                >
                  <View style={styles.optionLeft}>
                    <Text style={styles.flag}>{lang.id === 'fr' ? '🇫🇷' : '🇬🇧'}</Text>
                    <View>
                      <Text style={styles.optionLabel}>{lang.label}</Text>
                      <Text style={styles.optionSub}>{lang.sub}</Text>
                    </View>
                  </View>
                  {isSelected && (
                    <View style={styles.checkWrap}>
                      <Check color={colors.white} size={18} strokeWidth={3} />
                    </View>
                  )}
                </Pressable>
              </Animated.View>
            );
          })}
        </View>

        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.footer}>
          <Pressable
            onPress={handleContinue}
            style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          >
            <Text style={styles.ctaText}>Continuer</Text>
          </Pressable>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ink },
  safe: { flex: 1 },
  header: { alignItems: 'center', paddingHorizontal: spacing.xl, paddingTop: spacing.xxl, paddingBottom: spacing.lg, gap: spacing.sm },
  iconWrap: { width: 72, height: 72, alignItems: 'center', justifyContent: 'center', borderRadius: 36, backgroundColor: colors.inkSoft, marginBottom: spacing.sm },
  title: { color: colors.white, fontSize: typography.title, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -0.5, textAlign: 'center' },
  subtitle: { color: colors.inkMuted, fontSize: typography.body, fontFamily: typography.fontFamily.regular, textAlign: 'center' },
  list: { paddingHorizontal: spacing.lg, gap: spacing.md, marginTop: spacing.lg },
  option: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.inkSoft, borderRadius: radii.lg, padding: spacing.lg,
    borderWidth: 2, borderColor: 'transparent',
  },
  optionSelected: { borderColor: colors.orange },
  optionPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  optionLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, flex: 1 },
  flag: { fontSize: 36 },
  optionLabel: { color: colors.white, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  optionSub: { color: colors.inkMuted, fontSize: typography.caption, fontFamily: typography.fontFamily.regular, marginTop: 2 },
  checkWrap: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: colors.orange },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, marginTop: 'auto' },
  cta: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.orange, borderRadius: radii.pill, paddingVertical: 16, minHeight: 54,
  },
  ctaPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  ctaText: { color: colors.white, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold },
});
