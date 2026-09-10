import { useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import SplashScreenImage from '../../assets/images/splash-bg.png';

import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { colors, radii, spacing, typography } from '@/src/theme/tokens';

const SPLASH_DURATION = 4000;

export default function SplashScreen() {
  const glow = useSharedValue(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    glow.value = withRepeat(
      withTiming(1, {
        duration: 1400,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );

    progress.value = withTiming(1, {
      duration: SPLASH_DURATION,
      easing: Easing.out(Easing.ease),
    });

    const timer = setTimeout(() => {
      router.replace('/(auth)/onboarding');
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, []);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: 0.3 + glow.value * 0.4,
    transform: [{ scale: 1 + glow.value * 0.12 }],
  }));

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
            <Animated.View style={[styles.glow, glowStyle]} />

            <Animated.Text
              entering={FadeIn.duration(700)}
              style={styles.logo}
            >
              CHIMSOY
            </Animated.Text>

            <Animated.View
              entering={FadeInDown.delay(500).duration(600)}
              style={styles.taglineRow}
            >
              <Text style={styles.tagline}>
                LE SPORT NUMÉRIQUE{' '}
              </Text>

              <Text style={styles.taglineAccent}>
                AFRICAIN
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
    justifyContent: 'center',
  },

  glow: {
    position: 'absolute',
    width: 220,
    height: 100,
    borderRadius: radii.pill,
    backgroundColor: colors.orange,
    opacity: 0.3,
    transform: [{ scale: 1.1 }],
  },

  logo: {
    color: colors.white,
    fontSize: typography.display,
    fontWeight: '900',
    letterSpacing: -2,
    textAlign: 'center',
  },

  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },

  tagline: {
    color: colors.cream,
    fontSize: typography.caption,
    fontWeight: '700',
    letterSpacing: 0.8,
  },

  taglineAccent: {
    color: colors.orange,
    fontSize: typography.caption,
    fontWeight: '800',
    letterSpacing: 0.8,
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

