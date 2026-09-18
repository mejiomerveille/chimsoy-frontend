import { useEffect } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import SplashScreenImage from '../../assets/images/splash-bg.png';
import ChimsoyLogo from '../../assets/images/logo.png'; // 👈 remplace par le chemin de ton vrai logo

import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { colors, radii, spacing, typography } from '@/src/theme/tokens';

const SPLASH_DURATION = 4000;

export default function SplashScreen() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: SPLASH_DURATION,
      easing: Easing.out(Easing.ease),
    });

    const timer = setTimeout(() => {
      router.replace('/(auth)/onboarding');
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, []);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <ImageBackground
      source={SplashScreenImage}
      resizeMode="cover"
      style={styles.container}
    >
      <LinearGradient
        colors={[`${colors.ink}22`, `${colors.ink}B8`, colors.ink]}
        locations={[0, 0.52, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <View style={styles.brandBlock}>
            {/* Logo — remplace l'ancien cercle orange (glow) */}
            <Animated.View entering={FadeIn.duration(700)}>
              <Image
                source={ChimsoyLogo}
                resizeMode="contain"
                style={styles.logoImage}
              />
            </Animated.View>

            <Animated.Text
              entering={FadeIn.delay(200).duration(700)}
              style={styles.logo}
            >
              CHIMSOY
            </Animated.Text>

            <Animated.Text
              entering={FadeIn.delay(400).duration(600)}
              style={styles.slogan}
            >
              PLAY · COMPETE · WIN
            </Animated.Text>

            <Animated.View
              entering={FadeInDown.delay(600).duration(600)}
              style={styles.subtitleBlock}
            >
              <Text style={styles.subtitle}>
                L'ARÈNE DES CHAMPIONS
              </Text>

              <Text style={styles.subtitleAccent}>
                DU CAMEROUN À L'AFRIQUE
              </Text>
            </Animated.View>
          </View>

          <Animated.View
            entering={FadeIn.delay(1200).duration(500)}
            style={styles.footer}
          >
            <View style={styles.progressTrack}>
              <Animated.View
                style={[styles.progressFill, progressStyle]}
              />
            </View>

            <Text style={styles.footerText}>
              DOUALA · CAMEROUN
            </Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  safe: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
  },

  brandBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: spacing.xl,
  },

  // 👇 remplace l'ancien style "glow" (cercle orange) — logo plus imposant
  logoImage: {
    width: 148,
    height: 148,
    marginBottom: spacing.md,
  },

  logo: {
    color: colors.white,
    fontSize: typography.display,
    fontWeight: '900',
    letterSpacing: -2,
    textAlign: 'center',
  },

  slogan: {
    color: colors.orange,
    fontSize: typography.caption,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: spacing.xs,
    textAlign: 'center',
  },

  subtitleBlock: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },

  subtitle: {
    color: colors.cream,
    fontSize: typography.caption,
    fontWeight: '700',
    letterSpacing: 0.8,
    textAlign: 'center',
  },

  subtitleAccent: {
    color: colors.orange,
    fontSize: typography.caption,
    fontWeight: '800',
    letterSpacing: 0.8,
    textAlign: 'center',
    marginTop: 2,
  },

  footer: {
    alignItems: 'center',
    gap: spacing.md,
  },

  progressTrack: {
    width: '100%',
    height: spacing.xs,
    overflow: 'hidden',
    borderRadius: radii.pill,
    backgroundColor: colors.inkSoft,
  },

  progressFill: {
    height: '100%',
    borderRadius: radii.pill,
    backgroundColor: colors.orange,
  },

  footerText: {
    color: colors.cream,
    fontSize: typography.micro,
    fontWeight: '800',
    letterSpacing: 1.6,
    opacity: 0.7,
  },
});