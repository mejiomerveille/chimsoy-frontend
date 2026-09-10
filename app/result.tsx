import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInDown } from 'react-native-reanimated';
import { Home, RotateCcw, Trophy, Zap } from 'lucide-react-native';
import { Avatar, Button, Card } from '@/src/components/ui';
import { colors, spacing, typography } from '@/src/theme/tokens';
import { useAppStore } from '@/src/store/useAppStore';
import { mockUser } from '@/src/services/mockData';

export default function ResultScreen() {
  const lastResult = useAppStore((s) => s.lastResult);
  const isWin = lastResult?.result === 'win';

  const handleReplay = () => {
    router.replace(`/matchmaking?gameId=${lastResult?.gameId || 'quiz'}`);
  };

  const handleHome = () => {
    router.replace('/(tabs)');
  };

  if (!lastResult) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackText}>Aucun résultat à afficher</Text>
        <Button label="Retour à l'accueil" onPress={handleHome} />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={isWin ? [colors.success, colors.background] : [colors.danger, colors.background]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Animated.View entering={SlideInDown.springify().damping(12)} style={styles.trophyRing}>
            <Trophy color={isWin ? colors.success : colors.accent} size={48} />
          </Animated.View>

          <Animated.Text entering={FadeIn.delay(200)} style={styles.resultLabel}>
            {isWin ? 'Victoire' : 'Défaite'}
          </Animated.Text>
          <Animated.Text entering={FadeIn.delay(300)} style={styles.resultSub}>
            Tu as {isWin ? 'battu' : 'perdu contre'} {lastResult.opponentName}
          </Animated.Text>

          <Animated.View entering={FadeInDown.delay(400)} style={styles.scoreBoard}>
            <View style={styles.scoreSide}>
              <Avatar initials={mockUser.avatarInitials} size={56} tone="accent" />
              <Text style={styles.scoreName}>{mockUser.username}</Text>
              <Text style={styles.scoreValue}>{lastResult.myScore}</Text>
            </View>
            <Text style={styles.scoreVs}>—</Text>
            <View style={styles.scoreSide}>
              <Avatar initials={lastResult.opponentInitials} size={56} tone="primary" />
              <Text style={styles.scoreName}>{lastResult.opponentName}</Text>
              <Text style={styles.scoreValue}>{lastResult.opponentScore}</Text>
            </View>
          </Animated.View>

          {isWin && (
            <Animated.View entering={FadeInDown.delay(600)}>
              <Card tone="primary" style={styles.rewardCard}>
                <Text style={styles.rewardLabel}>RÉCOMPENSE</Text>
                <Text style={styles.rewardValue}>+{lastResult.pointsAwarded} points</Text>
                <Text style={styles.rewardSub}>+{lastResult.coinsAwarded} FCFA ajoutés au portefeuille</Text>
              </Card>
            </Animated.View>
          )}

          <Animated.View entering={FadeInDown.delay(800)} style={styles.actions}>
            <Button label="Rejouer" icon={<RotateCcw color={colors.background} size={18} />} onPress={handleReplay} />
            <Button label="Accueil" variant="ghost" icon={<Home color={colors.textSecondary} size={18} />} onPress={handleHome} />
          </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.lg, gap: spacing.md },
  trophyRing: { width: 100, height: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 2, borderColor: 'rgba(255,255,255,0.12)' },
  resultLabel: { color: colors.textPrimary, fontSize: 36, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -1 },
  resultSub: { color: 'rgba(255,255,255,0.6)', fontSize: 15, fontFamily: typography.fontFamily.regular },
  scoreBoard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.lg, marginVertical: spacing.xl },
  scoreSide: { alignItems: 'center', gap: 4 },
  scoreName: { color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: '600', fontFamily: typography.fontFamily.semiBold, marginTop: 6 },
  scoreValue: { color: colors.textPrimary, fontSize: 32, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  scoreVs: { color: 'rgba(255,255,255,0.3)', fontSize: 24, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  rewardCard: { width: '100%', alignItems: 'center', gap: spacing.xs },
  rewardLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1 },
  rewardValue: { color: colors.gold, fontSize: 28, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  rewardSub: { color: 'rgba(255,255,255,0.5)', fontSize: 13, fontFamily: typography.fontFamily.regular },
  actions: { flexDirection: 'row', gap: spacing.sm, width: '100%' },
  fallback: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, backgroundColor: colors.background },
  fallbackText: { color: colors.textPrimary, fontSize: 16, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
});
