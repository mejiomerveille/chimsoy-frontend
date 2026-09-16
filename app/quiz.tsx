import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import type { ViewStyle, TextStyle } from 'react-native';
import { Check, Clock, Flag, MessageCircle, X } from 'lucide-react-native';
import { Avatar } from '@/src/components/ui';
import { colors, radii, spacing, typography, theme } from '@/src/theme/tokens';
import { useAppStore } from '@/src/store/useAppStore';
import { mockUser } from '@/src/services/mockData';
import { quizQuestions } from '@/src/services/quizData';

const QUESTION_TIME = 8;
const TOTAL_QUESTIONS = 10;

export default function QuizGameScreen() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const currentMatch = useAppStore((s) => s.currentMatch);
  const setLastResult = useAppStore((s) => s.setLastResult);
  const addCoins = useAppStore((s) => s.addCoins);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [myScore, setMyScore] = useState(120);
  const [oppScore, setOppScore] = useState(80);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [answered, setAnswered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const question = quizQuestions[questionIndex];
  const opponent = currentMatch?.opponent || { username: 'Aboubakar_221', avatarInitials: 'AB', level: 7 };

  useEffect(() => {
    if (answered) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { handleAnswer(-1); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [questionIndex, answered]);

  useEffect(() => {
    if (answered) return;
    const oppTimer = setTimeout(() => {
      if (Math.random() < 0.6) setOppScore((s) => s + 10);
    }, 3000 + Math.random() * 5000);
    return () => clearTimeout(oppTimer);
  }, [questionIndex]);

  const handleAnswer = (index: number) => {
    if (answered) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSelectedAnswer(index);
    setAnswered(true);
    const isCorrect = index === question.correctIndex;
    if (isCorrect) setMyScore((s) => s + 20);
    setTimeout(() => {
      if (questionIndex < TOTAL_QUESTIONS - 1) {
        setQuestionIndex((q) => q + 1);
        setSelectedAnswer(null);
        setAnswered(false);
        setTimeLeft(QUESTION_TIME);
      } else {
        finishGame(isCorrect ? myScore + 20 : myScore);
      }
    }, 1800);
  };

  const finishGame = (finalMyScore: number) => {
    const isWin = finalMyScore > oppScore;
    if (isWin) addCoins(500);
    setLastResult({
      gameId: 'quiz', result: isWin ? 'win' : 'loss',
      myScore: finalMyScore, opponentScore: oppScore,
      opponentName: opponent.username, opponentInitials: opponent.avatarInitials,
      pointsAwarded: isWin ? 32 : 0, coinsAwarded: isWin ? 500 : 0,
    });
    router.replace('/result');
  };

  const roundDots = Array.from({ length: Math.min(questionIndex, 10) }, (_, i) => i);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DUEL DE QUIZ</Text>
        <Text style={styles.headerSub}>Manche {questionIndex + 1} / {TOTAL_QUESTIONS}</Text>
      </View>

      <View style={styles.vsRow}>
        <View style={styles.playerSide}>
          <View style={styles.avatarWrapGreen}>
            <Avatar initials={mockUser.avatarInitials} size={48} tone="accent" />
          </View>
          <Text style={styles.playerName}>{mockUser.username}</Text>
          <Text style={[styles.playerScore, { color: theme.success }]}>{myScore}</Text>
          <View style={styles.dotsRow}>
            {roundDots.map((d) => (
              <View key={`me-${d}`} style={styles.dotGreen} />
            ))}
          </View>
        </View>

        <View style={styles.vsBadge}>
          <Text style={styles.vsText}>VS</Text>
        </View>

        <View style={styles.playerSide}>
          <View style={styles.avatarWrapRed}>
            <Avatar initials={opponent.avatarInitials} size={48} tone="primary" />
          </View>
          <Text style={styles.playerName}>{opponent.username}</Text>
          <Text style={[styles.playerScore, { color: theme.danger }]}>{oppScore}</Text>
          <View style={styles.dotsRow}>
            {roundDots.map((d) => (
              <View key={`opp-${d}`} style={styles.dotRed} />
            ))}
          </View>
        </View>
      </View>

      <View style={styles.categoryWrap}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>Catégorie : Football Africain</Text>
        </View>
      </View>

      <View style={styles.timerWrap}>
        <View style={styles.timerRing}>
          <Text style={styles.timerNumber}>{timeLeft}</Text>
          <Text style={styles.timerLabel}>sec</Text>
        </View>
      </View>

      <Animated.View
        key={questionIndex}
        entering={SlideInRight.duration(300).springify().damping(20)}
        exiting={SlideOutLeft.duration(200)}
        style={styles.questionWrap}
      >
        <Text style={styles.questionText}>{question.text}</Text>
      </Animated.View>

      <View style={styles.options}>
        {question.options.map((option, i) => {
          const isSelected = selectedAnswer === i;
          const isCorrect = i === question.correctIndex;
          const showResult = answered;
          let optionStyle: ViewStyle = styles.option;
          let textStyle: TextStyle = styles.optionText;
          if (showResult && isCorrect) {
            optionStyle = styles.optionCorrect; textStyle = styles.optionTextCorrect;
          } else if (showResult && isSelected && !isCorrect) {
            optionStyle = styles.optionWrong; textStyle = styles.optionTextWrong;
          } else if (isSelected) {
            optionStyle = styles.optionSelected; textStyle = styles.optionTextSelected;
          }
          const letter = String.fromCharCode(65 + i);
          return (
            <Pressable
              key={i}
              disabled={answered}
              onPress={() => handleAnswer(i)}
              style={({ pressed }) => [optionStyle, pressed && !answered && styles.optionPressed]}
            >
              <View style={[styles.optionBadge, isSelected && styles.optionBadgeSelected, showResult && isCorrect && styles.optionBadgeCorrect, showResult && isSelected && !isCorrect && styles.optionBadgeWrong]}>
                <Text style={[styles.optionBadgeText, (isSelected || (showResult && isCorrect)) && styles.optionBadgeTextActive]}>{letter}</Text>
              </View>
              <Text style={textStyle}>{option}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.bottomRow}>
        <Pressable style={styles.bottomBtn}>
          <Flag color={theme.textSecondary} size={16} />
          <Text style={styles.bottomBtnText}>SIGNALER</Text>
        </Pressable>
        <Pressable style={styles.bottomBtn}>
          <MessageCircle color={theme.textSecondary} size={16} />
          <Text style={styles.bottomBtnText}>CHAT</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.background, padding: spacing.lg },
  header: { alignItems: 'center', gap: 4, marginTop: spacing.sm },
  headerTitle: { color: theme.textPrimary, fontSize: typography.heading, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1 },
  headerSub: { color: theme.textSecondary, fontSize: typography.caption, fontFamily: typography.fontFamily.regular },
  vsRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: spacing.lg, paddingHorizontal: spacing.md },
  playerSide: { alignItems: 'center', gap: 6, flex: 1 },
  avatarWrapGreen: { padding: 3, borderRadius: 30, borderWidth: 2, borderColor: theme.success },
  avatarWrapRed: { padding: 3, borderRadius: 30, borderWidth: 2, borderColor: theme.danger },
  playerName: { color: theme.textPrimary, fontSize: typography.caption, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  playerScore: { fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  dotsRow: { flexDirection: 'row', gap: 3, marginTop: 4 },
  dotGreen: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.success },
  dotRed: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.danger },
  vsBadge: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: theme.surface, borderWidth: 2, borderColor: theme.border, marginTop: 8 },
  vsText: { color: theme.textPrimary, fontSize: typography.caption, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  categoryWrap: { alignItems: 'center', marginTop: spacing.lg },
  categoryBadge: { paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: radii.pill, backgroundColor: 'rgba(242,183,5,0.15)' },
  categoryText: { color: theme.reward, fontSize: typography.caption, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  timerWrap: { alignItems: 'center', marginTop: spacing.lg },
  timerRing: { width: 80, height: 80, alignItems: 'center', justifyContent: 'center', borderRadius: 40, borderWidth: 4, borderColor: theme.action, backgroundColor: 'transparent' },
  timerNumber: { color: theme.textPrimary, fontSize: 32, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  timerLabel: { color: theme.textSecondary, fontSize: typography.micro, fontFamily: typography.fontFamily.regular },
  questionWrap: { flex: 1, justifyContent: 'center', gap: spacing.sm, marginTop: spacing.lg },
  questionText: { color: theme.textPrimary, fontSize: typography.heading, fontWeight: '700', fontFamily: typography.fontFamily.bold, lineHeight: 28, letterSpacing: -0.3, textAlign: 'center' },
  options: { gap: spacing.sm, marginBottom: spacing.lg },
  option: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: theme.surface, borderRadius: radii.md, paddingVertical: 16, paddingHorizontal: spacing.md, borderWidth: 2, borderColor: 'transparent' },
  optionSelected: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: 'rgba(26,63,228,0.15)', borderRadius: radii.md, paddingVertical: 16, paddingHorizontal: spacing.md, borderWidth: 2, borderColor: theme.link },
  optionCorrect: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: 'rgba(31,174,94,0.15)', borderRadius: radii.md, paddingVertical: 16, paddingHorizontal: spacing.md, borderWidth: 2, borderColor: theme.success },
  optionWrong: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: 'rgba(225,59,56,0.15)', borderRadius: radii.md, paddingVertical: 16, paddingHorizontal: spacing.md, borderWidth: 2, borderColor: theme.danger },
  optionPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  optionBadge: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.08)' },
  optionBadgeSelected: { backgroundColor: theme.link },
  optionBadgeCorrect: { backgroundColor: theme.success },
  optionBadgeWrong: { backgroundColor: theme.danger },
  optionBadgeText: { color: theme.textSecondary, fontSize: typography.caption, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  optionBadgeTextActive: { color: theme.textPrimary },
  optionText: { flex: 1, color: theme.textPrimary, fontSize: typography.body, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  optionTextSelected: { flex: 1, color: theme.textPrimary, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  optionTextCorrect: { flex: 1, color: theme.textPrimary, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  optionTextWrong: { flex: 1, color: theme.textPrimary, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', paddingBottom: spacing.sm },
  bottomBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
  bottomBtnText: { color: theme.textSecondary, fontSize: typography.micro, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 0.5 },
});
