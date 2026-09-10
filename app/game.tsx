import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown, SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import type { ViewStyle, TextStyle } from 'react-native';
import { Brain, Check, Clock, X, Zap } from 'lucide-react-native';
import { Avatar, ProgressBar } from '@/src/components/ui';
import { colors, radius, spacing, typography } from '@/src/theme/tokens';
import { useAppStore } from '@/src/store/useAppStore';
import { mockUser } from '@/src/services/mockData';
import { quizQuestions } from '@/src/services/quizData';

const QUESTION_TIME = 15;
const TOTAL_QUESTIONS = quizQuestions.length;

export default function GameScreen() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const currentMatch = useAppStore((s) => s.currentMatch);
  const setLastResult = useAppStore((s) => s.setLastResult);
  const addCoins = useAppStore((s) => s.addCoins);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [myScore, setMyScore] = useState(0);
  const [oppScore, setOppScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [answered, setAnswered] = useState(false);
  const [oppAnswering, setOppAnswering] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const question = quizQuestions[questionIndex];
  const opponent = currentMatch?.opponent || { username: 'Sam237', avatarInitials: 'SA', level: 5 };

  useEffect(() => {
    if (answered) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          handleAnswer(-1);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [questionIndex, answered]);

  useEffect(() => {
    if (answered) return;
    setOppAnswering(false);
    const oppTimer = setTimeout(() => {
      setOppAnswering(true);
      const oppCorrect = Math.random() < 0.6;
      if (oppCorrect) {
        setOppScore((s) => s + 1);
      }
    }, 3000 + Math.random() * 5000);
    return () => clearTimeout(oppTimer);
  }, [questionIndex]);

  const handleAnswer = (index: number) => {
    if (answered) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSelectedAnswer(index);
    setAnswered(true);

    const isCorrect = index === question.correctIndex;
    if (isCorrect) {
      setMyScore((s) => s + 1);
    }

    setTimeout(() => {
      if (questionIndex < TOTAL_QUESTIONS - 1) {
        setQuestionIndex((q) => q + 1);
        setSelectedAnswer(null);
        setAnswered(false);
        setTimeLeft(QUESTION_TIME);
        setOppAnswering(false);
      } else {
        finishGame(isCorrect ? myScore + 1 : myScore);
      }
    }, 1800);
  };

  const finishGame = (finalMyScore: number) => {
    const finalOppScore = oppScore;
    const isWin = finalMyScore > finalOppScore;
    const pointsAwarded = isWin ? 32 : 0;
    const coinsAwarded = isWin ? 500 : 0;

    if (isWin) addCoins(coinsAwarded);

    setLastResult({
      gameId: (gameId as 'quiz' | 'ludo') || 'quiz',
      result: isWin ? 'win' : 'loss',
      myScore: finalMyScore,
      opponentScore: finalOppScore,
      opponentName: opponent.username,
      opponentInitials: opponent.avatarInitials,
      pointsAwarded,
      coinsAwarded,
    });

    router.replace('/result');
  };

  const progress = (questionIndex + 1) / TOTAL_QUESTIONS;
  const timeUrgent = timeLeft <= 5;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Brain color={colors.primary} size={20} />
          <Text style={styles.headerTitle}>Quiz Arena</Text>
        </View>
        <View style={[styles.timer, timeUrgent && styles.timerUrgent]}>
          <Clock color={timeUrgent ? colors.danger : colors.accent} size={16} />
          <Text style={[styles.timerText, timeUrgent && styles.timerTextUrgent]}>00:{String(timeLeft).padStart(2, '0')}</Text>
        </View>
      </View>

      <View style={styles.scoreRow}>
        <View style={styles.scoreSide}>
          <Avatar initials={mockUser.avatarInitials} size={40} tone="accent" />
          <View>
            <Text style={styles.scoreName}>{mockUser.username}</Text>
            <Text style={styles.scoreValue}>{myScore}</Text>
          </View>
        </View>
        <Text style={styles.scoreVs}>VS</Text>
        <View style={styles.scoreSide}>
          <Avatar initials={opponent.avatarInitials} size={40} tone="primary" />
          <View>
            <Text style={styles.scoreName}>{opponent.username}</Text>
            <View style={styles.oppScoreRow}>
              <Text style={styles.scoreValue}>{oppScore}</Text>
              {oppAnswering && <View style={styles.oppThinking} />}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.progressWrap}>
        <ProgressBar value={progress} color={colors.accent} />
        <Text style={styles.progressLabel}>Question {questionIndex + 1} / {TOTAL_QUESTIONS}</Text>
      </View>

      <Animated.View
        key={questionIndex}
        entering={SlideInRight.duration(300).springify().damping(20)}
        exiting={SlideOutLeft.duration(200)}
        style={styles.questionSection}
      >
        <Text style={styles.questionLabel}>Question {questionIndex + 1}</Text>
        <Text style={styles.questionText}>{question.text}</Text>
      </Animated.View>

      <View style={styles.options}>
        {question.options.map((option, i) => {
          const isSelected = selectedAnswer === i;
          const isCorrect = i === question.correctIndex;
          const showResult = answered;

          let optionStyle: ViewStyle = styles.option;
          let textStyle: TextStyle = styles.optionText;
          let icon: React.ReactNode = null;

          if (showResult && isCorrect) {
            optionStyle = styles.optionCorrect;
            textStyle = styles.optionTextCorrect;
            icon = <Check color={colors.background} size={20} />;
          } else if (showResult && isSelected && !isCorrect) {
            optionStyle = styles.optionWrong;
            textStyle = styles.optionTextWrong;
            icon = <X color={colors.danger} size={20} />;
          } else if (showResult) {
            optionStyle = styles.optionDimmed;
            textStyle = styles.optionTextDimmed;
          }

          return (
            <Pressable
              key={i}
              disabled={answered}
              onPress={() => handleAnswer(i)}
              style={({ pressed }) => [optionStyle, pressed && !answered && styles.optionPressed]}
            >
              <Text style={textStyle}>{option}</Text>
              {icon}
            </Pressable>
          );
        })}
      </View>

      {answered && (
        <Animated.View entering={FadeIn.duration(300)} style={styles.feedbackRow}>
          <Text style={styles.feedbackText}>
            {selectedAnswer === question.correctIndex
              ? 'Bonne réponse !'
              : selectedAnswer === -1
                ? 'Temps écoulé !'
                : 'Mauvaise réponse'}
          </Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.sm },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  headerTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  timer: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.surface, paddingHorizontal: spacing.sm, paddingVertical: 6, borderRadius: 999 },
  timerUrgent: { backgroundColor: 'rgba(225,59,59,0.15)' },
  timerText: { color: colors.accent, fontSize: 13, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  timerTextUrgent: { color: colors.danger },
  scoreRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: spacing.lg },
  scoreSide: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  scoreName: { color: colors.textSecondary, fontSize: 12, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  scoreValue: { color: colors.textPrimary, fontSize: 28, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  scoreVs: { color: colors.accent, fontSize: 18, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  oppScoreRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  oppThinking: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success },
  progressWrap: { gap: 6, marginBottom: spacing.lg },
  progressLabel: { color: colors.textSecondary, fontSize: 11, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  questionSection: { flex: 1, justifyContent: 'center', gap: spacing.sm },
  questionLabel: { color: colors.accent, fontSize: 12, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 0.5 },
  questionText: { color: colors.textPrimary, fontSize: 24, fontWeight: '700', fontFamily: typography.fontFamily.bold, lineHeight: 30, letterSpacing: -0.5 },
  options: { gap: spacing.sm, marginBottom: spacing.lg },
  option: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.surface, borderRadius: radius.md, paddingVertical: 18, paddingHorizontal: spacing.lg, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  optionPressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
  optionCorrect: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.success, borderRadius: radius.md, paddingVertical: 18, paddingHorizontal: spacing.lg, borderWidth: 2, borderColor: colors.success },
  optionWrong: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(225,59,59,0.15)', borderRadius: radius.md, paddingVertical: 18, paddingHorizontal: spacing.lg, borderWidth: 2, borderColor: colors.danger },
  optionDimmed: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.surface, borderRadius: radius.md, paddingVertical: 18, paddingHorizontal: spacing.lg, borderWidth: 1, borderColor: 'rgba(255,255,255,0.03)', opacity: 0.4 },
  optionText: { color: colors.textPrimary, fontSize: 16, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  optionTextCorrect: { color: colors.background, fontSize: 16, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  optionTextWrong: { color: colors.danger, fontSize: 16, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  optionTextDimmed: { color: 'rgba(245,247,250,0.3)', fontSize: 16, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  feedbackRow: { alignItems: 'center', paddingVertical: spacing.sm },
  feedbackText: { color: colors.textPrimary, fontSize: 16, fontWeight: '700', fontFamily: typography.fontFamily.bold },
});
