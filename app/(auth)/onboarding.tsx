import { useRef, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { ArrowRight } from 'lucide-react-native';

import { colors, radii, spacing, typography } from '@/src/theme/tokens';

import intro1 from '../../assets/images/intro1.png';
import intro2 from '../../assets/images/intro2.png';
import intro3 from '../../assets/images/intro3.png';

const { width, height } = Dimensions.get('window');

type TitleLine = {
  text: string;
  color?: string;
};

type Slide = {
  image: ImageSourcePropType;
  titleLines: TitleLine[];
  subtitle: string;
};

const slides: Slide[] = [
  {
    image: intro1,
    titleLines: [
      { text: 'JOUEZ.' },
      { text: 'DÉFIEZ.' },
      { text: 'GAGNEZ.' },
    ],
    subtitle:
      "Affrontez des joueurs de toute l'Afrique et prouvez votre talent.",
  },

  {
    image: intro3,
    titleLines: [
      { text: 'COMPÉTITIONS' },
      { text: '& CLASSEMENTS' },
    ],
    subtitle:
      "Grimpez dans les classements de votre ville à l'Afrique et gagnez des trophées.",
  },

  {
    image: intro2,
    titleLines: [
      { text: 'GAGNEZ' },
      { text: 'VRAI', color: colors.yellow },
    ],
    subtitle:
      'Participez à des matchs à enjeux et gagnez de l’argent.',
  },
];

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);

  const scrollRef = useRef<ScrollView>(null);

  const handleNext = () => {
    if (index < slides.length - 1) {
      const next = index + 1;

      setIndex(next);

      scrollRef.current?.scrollTo({
        x: next * width,
        animated: true,
      });
    } else {
      router.replace('/(auth)/login');
    }
  };

  const handleSkip = () => {
    router.replace('/(auth)/login');
  };

  const handleScroll = (e: {
    nativeEvent: {
      contentOffset: {
        x: number;
      };
    };
  }) => {
    const i = Math.round(
      e.nativeEvent.contentOffset.x / width
    );

    if (i !== index) {
      setIndex(i);
    }
  };

  const isLast = index === slides.length - 1;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
        >
          {slides.map((s, i) => (
            <View key={i} style={styles.slide}>
              <ImageBackground
                source={s.image}
                resizeMode="cover"
                style={styles.backgroundImage}
                imageStyle={styles.imageStyle}
              >
                <LinearGradient
                  colors={[
                    'transparent',
                    `${colors.ink}55`,
                    colors.ink,
                  ]}
                  locations={[0, 0.42, 0.88]}
                  style={styles.overlay}
                />

                {/* CONTENU : TITRE + SOUS-TITRE */}
                <View style={styles.slideContent}>
                  <Animated.View
                    entering={FadeIn.duration(500)}
                  >
                    {s.titleLines.map((line, li) => (
                      <Text
                        key={li}
                        style={[
                          styles.title,
                          {
                            color:
                              line.color ?? colors.white,
                          },
                        ]}
                      >
                        {line.text}
                      </Text>
                    ))}
                  </Animated.View>

                  <Animated.Text
                    entering={FadeInDown.delay(300).duration(500)}
                    style={styles.subtitle}
                  >
                    {s.subtitle}
                  </Animated.Text>
                </View>
              </ImageBackground>
            </View>
          ))}
        </ScrollView>

        {/* FOOTER */}
        <View style={styles.footer}>
          <View style={styles.dots}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === index && styles.dotActive,
                ]}
              />
            ))}
          </View>

          {isLast ? (
            <Pressable
              onPress={handleNext}
              style={({ pressed }) => [
                styles.startBtn,
                pressed && styles.btnPressed,
              ]}
            >
              <Text style={styles.startBtnText}>
                COMMENCER
              </Text>
            </Pressable>
          ) : (
            <View style={styles.navRow}>
              <Pressable
                onPress={handleSkip}
                style={styles.skipBtn}
              >
                <Text style={styles.skipText}>
                  PASSER
                </Text>
              </Pressable>

              <Pressable
                onPress={handleNext}
                style={({ pressed }) => [
                  styles.roundBtn,
                  pressed && styles.btnPressed,
                ]}
              >
                <ArrowRight
                  color={colors.white}
                  size={24}
                  strokeWidth={2.5}
                />
              </Pressable>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ink,
  },

  safe: {
    flex: 1,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  /*
   * Chaque slide occupe tout l'écran.
   */
  slide: {
    width,
    height,
  },

  /*
   * Image de fond responsive.
   */
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },

  imageStyle: {
    width: '100%',
    height: '100%',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

  /*
   * TITRE + SOUS-TITRE
   *
   * On remonte le contenu afin qu'il ne soit
   * pas masqué par le footer.
   */
  slideContent: {
    flex: 1,
    justifyContent: 'flex-end',

    paddingHorizontal: spacing.xl,

    /*
     * AVANT :
     * paddingBottom: spacing.xxl
     *
     * MAINTENANT :
     * On remonte le texte de 90px supplémentaires.
     */
    paddingBottom: spacing.xxl + 90,
  },

  title: {
    fontSize: typography.title,
    fontWeight: '900',
    letterSpacing: -1,
    lineHeight: typography.title * 1.15,
  },

  subtitle: {
    color: colors.cream,
    fontSize: typography.body,
    lineHeight: typography.body * 1.5,
    marginTop: spacing.md,
    maxWidth: width - spacing.xl * 2,
  },

  /*
   * FOOTER
   */
  footer: {
    backgroundColor: colors.ink,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    paddingTop: spacing.md,
  },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(246,244,237,0.2)',
  },

  dotActive: {
    width: 24,
    backgroundColor: colors.orange,
  },

  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  skipBtn: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    minHeight: 44,
    justifyContent: 'center',
  },

  skipText: {
    color: colors.blue,
    fontSize: typography.body,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  roundBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },

  startBtn: {
    backgroundColor: colors.orange,
    borderRadius: radii.pill,
    paddingVertical: spacing.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 54,
  },

  startBtnText: {
    color: colors.white,
    fontSize: typography.body,
    fontWeight: '900',
    letterSpacing: 1,
  },
});