import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';
import { ArrowLeft, Check, Eye, EyeOff, Lock } from 'lucide-react-native';
import { colors, radii, spacing, typography, theme } from '@/src/theme/tokens';

const checklist = [
  { id: 'length', label: 'Au moins 8 caractères', test: (pw: string) => pw.length >= 8 },
  { id: 'upper', label: 'Une majuscule', test: (pw: string) => /[A-Z]/.test(pw) },
  { id: 'number', label: 'Un chiffre', test: (pw: string) => /\d/.test(pw) },
];

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const allValid = checklist.every((c) => c.test(password));

  const handleReset = () => {
    if (!allValid) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); router.replace('/(auth)/login'); }, 800);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color={colors.white} size={22} />
        </Pressable>

        <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
          <Text style={styles.title}>Nouveau mot de passe</Text>
          <Text style={styles.subtitle}>Choisis un mot de passe sécurisé</Text>
        </Animated.View>

        <Animated.View key="form" entering={SlideInRight.duration(350)} style={styles.form}>
          <View style={styles.inputWrap}>
            <Lock color={colors.inkMuted} size={18} />
            <TextInput
              style={styles.input}
              placeholder="Nouveau mot de passe"
              placeholderTextColor={colors.inkMuted}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
              {showPassword ? <EyeOff color={colors.inkMuted} size={18} /> : <Eye color={colors.inkMuted} size={18} />}
            </Pressable>
          </View>

          <View style={styles.checklist}>
            {checklist.map((item) => {
              const valid = item.test(password);
              return (
                <View key={item.id} style={styles.checkItem}>
                  <View style={[styles.checkCircle, valid && styles.checkCircleValid]}>
                    {valid && <Check color={colors.white} size={12} strokeWidth={3} />}
                  </View>
                  <Text style={[styles.checkLabel, valid && styles.checkLabelValid]}>{item.label}</Text>
                </View>
              );
            })}
          </View>

          <Pressable
            onPress={handleReset}
            disabled={loading || !allValid}
            style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed, (loading || !allValid) && styles.ctaDisabled]}
          >
            <Text style={styles.ctaText}>{loading ? 'Patientes…' : 'RÉINITIALISER'}</Text>
          </Pressable>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ink },
  safe: { flex: 1 },
  backBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', marginLeft: spacing.sm, marginTop: spacing.sm },
  header: { alignItems: 'center', paddingHorizontal: spacing.xl, paddingTop: spacing.xxl, paddingBottom: spacing.lg, gap: spacing.xs },
  title: { color: colors.white, fontSize: typography.title, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -0.5, textAlign: 'center' },
  subtitle: { color: colors.inkMuted, fontSize: typography.caption, fontFamily: typography.fontFamily.regular, textAlign: 'center' },
  form: { paddingHorizontal: spacing.lg, gap: spacing.md, marginTop: spacing.xl },
  inputWrap: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.inkSoft, borderRadius: radii.md, paddingHorizontal: spacing.md, minHeight: 58, borderWidth: 1, borderColor: colors.line },
  input: { flex: 1, color: colors.white, fontSize: 15, fontWeight: '500', fontFamily: typography.fontFamily.medium },
  eyeBtn: { padding: spacing.xs },
  checklist: { gap: spacing.sm, marginTop: spacing.sm },
  checkItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  checkCircle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: colors.inkMuted, alignItems: 'center', justifyContent: 'center' },
  checkCircleValid: { backgroundColor: colors.mintDeep, borderColor: colors.mintDeep },
  checkLabel: { color: colors.inkMuted, fontSize: typography.caption, fontFamily: typography.fontFamily.regular },
  checkLabelValid: { color: colors.mintDeep, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  cta: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.orange, borderRadius: radii.pill, paddingVertical: 16, minHeight: 54, marginTop: spacing.md },
  ctaPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  ctaDisabled: { opacity: 0.4 },
  ctaText: { color: colors.white, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1 },
});
