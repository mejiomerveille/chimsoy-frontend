import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';
import { Avatar } from '@/src/components/ui';
import { colors, radii, spacing, typography, theme } from '@/src/theme/tokens';
import { useAppStore } from '@/src/store/useAppStore';
import { mockUser } from '@/src/services/mockData';

const TOTAL_ROUNDS = 5;
const ROUND_TIME = 10;

type Operation = { a: number; b: number; op: '+' | '-' | '×'; answer: number; options: number[] };

function generateOperation(): Operation {
  const ops: ('+' | '-' | '×')[] = ['+', '-', '×'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a: number, b: number, answer: number;
  if (op === '+') { a = Math.floor(Math.random() * 50) + 10; b = Math.floor(Math.random() * 50) + 10; answer = a + b; }
  else if (op === '-') { a = Math.floor(Math.random() * 50) + 20; b = Math.floor(Math.random() * 20) + 1; answer = a - b; }
  else { a = Math.floor(Math.random() * 12) + 2; b = Math.floor(Math.random() * 12) + 2; answer = a * b; }
  const options = [answer, answer + 2, answer - 3, answer + 7].sort(() => Math.random() - 0.5);
  return { a, b, op, answer, options };
}

export default function SpeedMathGameScreen() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const currentMatch = useAppStore((s) => s.currentMatch);
  const setLastResult = useAppStore((s) => s.setLastResult);
  const addCoins = useAppStore((s) => s.addCoins);

  const [round, setRound] = useState(0);
  const [operation, setOperation] = useState(generateOperation);
  const [myScore, setMyScore] = useState(0);
  const [oppScore, setOppScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [feedback, setFeedback] = useState<'win' | 'loss' | null>(null);
  const [answered, setAnswered] = useState(false);
  const [myTime, setMyTime] = useState(0);
  const [oppTime, setOppTime] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const roundStartRef = useRef(Date.now());

  const opponent = currentMatch?.opponent || { username: 'Sam237', avatarInitials: 'SA', level: 5 };

  useEffect(() => {
    if (answered) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { handleAnswer(-1); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [round, answered]);

  useEffect(() => {
    if (answered) return;
    roundStartRef.current = Date.now();
    const oppDelay = 2000 + Math.random() * 5000;
    const oppTimer = setTimeout(() => {
      const oppCorrect = Math.random() < 0.55;
      if (oppCorrect) setOppScore((s) => s + 1);
      setOppTime(Math.round((Date.now() - roundStartRef.current) / 1000));
    }, oppDelay);
    return () => clearTimeout(oppTimer);
  }, [round]);

  const handleAnswer = (value: number) => {
    if (answered) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    setAnswered(true);
    const elapsed = Math.round((Date.now() - roundStartRef.current) / 1000);
    setMyTime(elapsed);
    const isCorrect = value === operation.answer;
    if (isCorrect) setMyScore((s) => s + 1);
    const oppAlreadyAnswered = oppTime > 0;
    const oppWon = !isCorrect || (oppAlreadyAnswered && oppTime < elapsed);
    setFeedback(oppWon ? 'loss' : 'win');
    setTimeout(() => {
      if (round < TOTAL_ROUNDS - 1) {
        setRound((r) => r + 1);
        setOperation(generateOperation());
        setAnswered(false);
        setFeedback(null);
        setTimeLeft(ROUND_TIME);
        setMyTime(0);
        setOppTime(0);
      } else {
        finishGame();
      }
    }, 2000);
  };

  const finishGame = () => {
    const isWin = myScore > oppScore;
    if (isWin) addCoins(500);
    setLastResult({
      gameId: 'quiz', result: isWin ? 'win' : 'loss',
      myScore, opponentScore: oppScore,
      opponentName: opponent.username, opponentInitials: opponent.avatarInitials,
      pointsAwarded: isWin ? 32 : 0, coinsAwarded: isWin ? 500 : 0,
    });
    router.replace('/result');
  };

  const iAmLeading = myScore >= oppScore;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerSide}>
          <Avatar initials={mockUser.avatarInitials} size={40} tone="accent" />
          <View>
            <Text style={styles.headerName}>{mockUser.username}</Text>
            <Text style={styles.headerScore}>{myScore} pts</Text>
          </View>
        </View>
        <View style={styles.vsBadge}>
          <Text style={styles.vsText}>VS</Text>
        </View>
        <View style={styles.headerSideRight}>
          <View>
            <Text style={styles.headerNameRight}>{opponent.username}</Text>
            <Text style={styles.headerScoreRight}>{oppScore} pts</Text>
          </View>
          <Avatar initials={opponent.avatarInitials} size={40} tone="primary" />
        </View>
      </View>

      <Text style={styles.roundLabel}>Manche {round + 1}/{TOTAL_ROUNDS}</Text>

      <Animated.View key={round} entering={SlideInRight.duration(300)} style={styles.operationSection}>
        <Text style={styles.operationText}>
          {operation.a} {operation.op} {operation.b} = ?
        </Text>
      </Animated.View>

      <View style={styles.scoreBlocks}>
        <View style={[styles.scoreBlock, iAmLeading && styles.scoreBlockLeading]}>
          <Text style={styles.scoreBlockValue}>{myScore}</Text>
          <Text style={styles.scoreBlockLabel}>Toi</Text>
          {myTime > 0 && <Text style={styles.scoreBlockTime}>{myTime}s</Text>}
        </View>
        <View style={styles.scoreBlock}>
          <Text style={styles.scoreBlockValue}>{oppScore}</Text>
          <Text style={styles.scoreBlockLabel}>Adversaire</Text>
          {oppTime > 0 && <Text style={styles.scoreBlockTime}>{oppTime}s</Text>}
        </View>
      </View>

      <View style={styles.optionsGrid}>
        {operation.options.map((opt, i) => (
          <Pressable
            key={i}
            disabled={answered}
            onPress={() => handleAnswer(opt)}
            style={({ pressed }) => [styles.mathOption, pressed && !answered && styles.optionPressed]}
          >
            <Text style={styles.mathOptionText}>{opt}</Text>
          </Pressable>
        ))}
      </View>

      {feedback && (
        <Animated.View entering={FadeIn.duration(300)} style={styles.feedbackWrap}>
          <Text style={[styles.feedbackText, feedback === 'win' ? styles.feedbackWin : styles.feedbackLoss]}>
            {feedback === 'win' ? 'Bonne réponse ! Tu gagnes cette manche.' : 'Mauvaise réponse ! Tu perds cette manche.'}
          </Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.background, padding: spacing.lg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.sm },
  headerSide: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flex: 1 },
  headerSideRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flex: 1, justifyContent: 'flex-end' },
  headerName: { color: theme.textSecondary, fontSize: typography.caption, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  headerScore: { color: theme.textPrimary, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  headerNameRight: { color: theme.textSecondary, fontSize: typography.caption, fontWeight: '600', fontFamily: typography.fontFamily.semiBold, textAlign: 'right' },
  headerScoreRight: { color: theme.textPrimary, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold, textAlign: 'right' },
  vsBadge: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: theme.surface, borderWidth: 2, borderColor: theme.border },
  vsText: { color: theme.textPrimary, fontSize: typography.caption, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  roundLabel: { color: theme.textSecondary, fontSize: typography.caption, fontFamily: typography.fontFamily.regular, textAlign: 'center', marginTop: spacing.lg },
  operationSection: { alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.xl },
  operationText: { color: theme.textPrimary, fontSize: typography.display, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -2 },
  scoreBlocks: { flexDirection: 'row', gap: spacing.md, marginVertical: spacing.lg },
  scoreBlock: { flex: 1, alignItems: 'center', backgroundColor: theme.surface, borderRadius: radii.md, padding: spacing.md, gap: 4 },
  scoreBlockLeading: { backgroundColor: 'rgba(31,174,94,0.15)', borderWidth: 2, borderColor: theme.success },
  scoreBlockValue: { color: theme.textPrimary, fontSize: typography.title, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  scoreBlockLabel: { color: theme.textSecondary, fontSize: typography.caption, fontFamily: typography.fontFamily.regular },
  scoreBlockTime: { color: theme.textSecondary, fontSize: typography.micro, fontFamily: typography.fontFamily.regular },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, justifyContent: 'center' },
  mathOption: { width: '47%', paddingVertical: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.surface, borderRadius: radii.md, borderWidth: 2, borderColor: theme.border },
  optionPressed: { opacity: 0.8, transform: [{ scale: 0.97 }] },
  mathOptionText: { color: theme.textPrimary, fontSize: typography.title, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  feedbackWrap: { alignItems: 'center', marginTop: spacing.lg },
  feedbackText: { fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold, textAlign: 'center' },
  feedbackWin: { color: theme.success },
  feedbackLoss: { color: theme.danger },
});
