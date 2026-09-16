import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { ArrowRight, Eye, EyeOff, Lock, Phone, ShieldCheck, Zap } from 'lucide-react-native';
import { colors, radii, spacing, typography, theme } from '@/src/theme/tokens';
import { useAppStore } from '@/src/store/useAppStore';
import { mockUser } from '@/src/services/mockData';

type Step = 'phone' | 'otp' | 'password';

export default function LoginScreen() {
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const otpRefs = useRef<(TextInput | null)[]>([]);
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '']);
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);

  const handleNext = () => {
    setError(null);

    if (step === 'phone') {
      if (phone.trim().length < 8) { setError('Entre un numéro de téléphone valide'); return; }
      setLoading(true);
      setTimeout(() => { setLoading(false); setStep('otp'); }, 800);
    } else if (step === 'otp') {
      if (otpDigits.join('').length !== 4) { setError('Entre le code à 4 chiffres'); return; }
      setLoading(true);
      setTimeout(() => { setLoading(false); setStep('password'); }, 800);
    } else {
      if (password.length < 4) { setError('Mot de passe trop court'); return; }
      setLoading(true);
      setTimeout(() => { router.replace('/(auth)/create-profile'); }, 800);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const digits = [...otpDigits];
    digits[index] = value;
    setOtpDigits(digits);
    if (value && index < 3) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const stepIndex = step === 'phone' ? 0 : step === 'otp' ? 1 : 2;
  const stepLabels = ['Téléphone', 'Code', 'Mot de passe'];

  return (
    <LinearGradient colors={[colors.ink, colors.inkSoft]} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
            <View style={styles.logoBadge}>
              <Zap color={colors.ink} size={28} strokeWidth={2.5} fill={colors.ink} />
            </View>
            <Text style={styles.welcome}>Bienvenue sur CHIMSOY</Text>
            <Text style={styles.subtitle}>La compétition africaine commence ici.</Text>
          </Animated.View>

          <View style={styles.stepsIndicator}>
            {stepLabels.map((label, i) => (
              <View key={label} style={styles.stepItem}>
                <View style={[styles.stepDot, i <= stepIndex && styles.stepDotActive]} />
                {i < stepLabels.length - 1 && <View style={[styles.stepLine, i < stepIndex && styles.stepLineActive]} />}
                <Text style={[styles.stepLabel, i <= stepIndex && styles.stepLabelActive]}>{label}</Text>
              </View>
            ))}
          </View>

          <Animated.View key={step} entering={SlideInRight.duration(350).springify().damping(20)} style={styles.form}>
            {step === 'phone' && (
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
            )}

            {step === 'otp' && (
              <View style={styles.otpSection}>
                <Text style={styles.otpHint}>On a envoyé un code à 4 chiffres au {phone}</Text>
                <View style={styles.otpRow}>
                  {otpDigits.map((digit, i) => (
                    <TextInput
                      key={i}
                      ref={(ref) => { otpRefs.current[i] = ref; }}
                      style={[styles.otpInput, digit && styles.otpInputFilled]}
                      keyboardType="numeric"
                      maxLength={1}
                      value={digit}
                      onChangeText={(v) => handleOtpChange(i, v)}
                      onKeyPress={(e) => handleOtpKeyPress(i, e.nativeEvent.key)}
                    />
                  ))}
                </View>
                <Pressable style={styles.resendRow}>
                  <Text style={styles.resendText}>Code non reçu ? </Text>
                  <Text style={styles.resendLink}>Renvoyer</Text>
                </Pressable>
              </View>
            )}

            {step === 'password' && (
              <View style={styles.inputWrap}>
                <Lock color={colors.inkMuted} size={18} />
                <TextInput
                  style={styles.input}
                  placeholder="Ton mot de passe"
                  placeholderTextColor={colors.inkMuted}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                  {showPassword ? <EyeOff color={colors.inkMuted} size={18} /> : <Eye color={colors.inkMuted} size={18} />}
                </Pressable>
              </View>
            )}

            {error && (
              <Animated.View entering={FadeInDown.duration(300)} style={styles.errorRow}>
                <Text style={styles.errorText}>{error}</Text>
              </Animated.View>
            )}

            <Pressable onPress={handleNext} disabled={loading} style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed, loading && styles.ctaDisabled]}>
              <Text style={styles.ctaText}>{loading ? 'Patientez…' : step === 'password' ? 'Se connecter' : 'Continuer'}</Text>
              {!loading && <ArrowRight color={colors.white} size={20} strokeWidth={2.5} />}
            </Pressable>

            {step === 'password' && (
              <Pressable onPress={() => router.push('/(auth)/forgot-password')} style={styles.forgotLink}>
                <Text style={styles.forgotLinkText}>Mot de passe oublié ?</Text>
              </Pressable>
            )}
          </Animated.View>

          <Animated.View entering={FadeIn.delay(600).duration(500)} style={styles.footer}>
            <View style={styles.footerRow}><ShieldCheck color={colors.mintDeep} size={14} /><Text style={styles.footerText}>Connexion sécurisée par OTP</Text></View>
            <Text style={styles.footerSub}>En continuant, tu acceptes les conditions d'utilisation.</Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  content: { flex: 1, padding: spacing.lg, justifyContent: 'center', gap: spacing.xl },
  header: { alignItems: 'center', gap: spacing.sm },
  logoBadge: { width: 72, height: 72, alignItems: 'center', justifyContent: 'center', borderRadius: 36, backgroundColor: colors.orange, marginBottom: spacing.sm },
  welcome: { color: colors.white, fontSize: 26, fontWeight: '700', fontFamily: typography.fontFamily.bold, textAlign: 'center', letterSpacing: -0.5 },
  subtitle: { color: colors.inkMuted, fontSize: 14, fontFamily: typography.fontFamily.regular, textAlign: 'center' },
  stepsIndicator: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  stepItem: { flexDirection: 'row', alignItems: 'center' },
  stepDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: 'rgba(246,244,237,0.15)' },
  stepDotActive: { backgroundColor: colors.orange },
  stepLine: { width: 32, height: 2, backgroundColor: 'rgba(246,244,237,0.1)', marginHorizontal: spacing.xs },
  stepLineActive: { backgroundColor: 'rgba(255,107,53,0.35)' },
  stepLabel: { color: 'rgba(246,244,237,0.3)', fontSize: 11, fontWeight: '600', fontFamily: typography.fontFamily.semiBold, marginLeft: spacing.xs },
  stepLabelActive: { color: colors.white },
  form: { gap: spacing.md },
  inputWrap: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.inkSoft, borderRadius: radii.md, paddingHorizontal: spacing.md, minHeight: 58, borderWidth: 1, borderColor: colors.line },
  input: { flex: 1, color: colors.white, fontSize: 15, fontWeight: '500', fontFamily: typography.fontFamily.medium },
  eyeBtn: { padding: spacing.xs },
  otpSection: { gap: spacing.md },
  otpHint: { color: colors.inkMuted, fontSize: 13, fontFamily: typography.fontFamily.regular, textAlign: 'center' },
  otpRow: { flexDirection: 'row', justifyContent: 'center', gap: spacing.md },
  otpInput: { width: 60, height: 68, textAlign: 'center', fontSize: 28, fontWeight: '700', fontFamily: typography.fontFamily.bold, color: colors.white, backgroundColor: colors.inkSoft, borderRadius: radii.md, borderWidth: 2, borderColor: colors.line },
  otpInputFilled: { borderColor: colors.orange, backgroundColor: colors.orangeSoft },
  resendRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  resendText: { color: colors.inkMuted, fontSize: 13, fontFamily: typography.fontFamily.regular },
  resendLink: { color: colors.orange, fontSize: 13, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  errorRow: { backgroundColor: 'rgba(225,59,59,0.12)', borderRadius: radii.sm, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  errorText: { color: colors.red, fontSize: 13, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  cta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: colors.orange, borderRadius: radii.pill, paddingVertical: 16, minHeight: 54 },
  ctaPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  ctaDisabled: { opacity: 0.5 },
  ctaText: { color: colors.white, fontSize: 16, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  forgotLink: { alignItems: 'center', paddingVertical: spacing.xs },
  forgotLinkText: { color: colors.blue, fontSize: typography.caption, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  footer: { alignItems: 'center', gap: spacing.xs },
  footerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  footerText: { color: colors.inkMuted, fontSize: 12, fontWeight: '500', fontFamily: typography.fontFamily.medium },
  footerSub: { color: colors.cream, fontSize: 11, fontFamily: typography.fontFamily.regular, opacity: 0.6 },
});
