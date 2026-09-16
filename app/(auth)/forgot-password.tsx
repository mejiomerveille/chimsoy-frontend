import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';
import { ArrowLeft, Phone } from 'lucide-react-native';
import { colors, radii, spacing, typography, theme } from '@/src/theme/tokens';

export default function ForgotPasswordScreen() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = () => {
    setError(null);
    if (phone.trim().length < 8) { setError('Entre un numéro de téléphone valide'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); router.push('/(auth)/reset-password'); }, 800);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color={colors.white} size={22} />
        </Pressable>

        <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
          <Text style={styles.title}>Mot de passe oublié</Text>
          <Text style={styles.subtitle}>Entre ton numéro pour recevoir un code de réinitialisation</Text>
        </Animated.View>

        <Animated.View key="form" entering={SlideInRight.duration(350)} style={styles.form}>
          <View style={styles.inputWrap}>
            <Phone color={colors.inkMuted} size={18} />
            <TextInput
              style={styles.input}
              placeholder="+237 6 90 00 00 00"
              placeholderTextColor={colors.inkMuted}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {error && (
            <Animated.View entering={FadeIn.duration(300)} style={styles.errorRow}>
              <Text style={styles.errorText}>{error}</Text>
            </Animated.View>
          )}

          <Pressable
            onPress={handleSend}
            disabled={loading}
            style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed, loading && styles.ctaDisabled]}
          >
            <Text style={styles.ctaText}>{loading ? 'Patientes…' : 'ENVOYER LE CODE'}</Text>
          </Pressable>

          <Pressable onPress={() => router.replace('/(auth)/login')} style={styles.linkRow}>
            <Text style={styles.linkText}>Retour à la connexion</Text>
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
  errorRow: { backgroundColor: 'rgba(224,82,82,0.12)', borderRadius: radii.sm, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  errorText: { color: theme.danger, fontSize: 13, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  cta: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.orange, borderRadius: radii.pill, paddingVertical: 16, minHeight: 54 },
  ctaPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  ctaDisabled: { opacity: 0.5 },
  ctaText: { color: colors.white, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1 },
  linkRow: { alignItems: 'center', paddingVertical: spacing.md },
  linkText: { color: colors.blue, fontSize: typography.caption, fontWeight: '700', fontFamily: typography.fontFamily.bold },
});
