import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Trophy, Zap } from 'lucide-react-native';
import { Avatar } from '@/src/components/ui';
import { colors, radii, spacing, typography, theme } from '@/src/theme/tokens';
import { useAppStore } from '@/src/store/useAppStore';
import { mockUser } from '@/src/services/mockData';

export default function OpponentFoundScreen() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const currentMatch = useAppStore((s) => s.currentMatch);
  const [countdown, setCountdown] = useState(5);

  const opponent = currentMatch?.opponent || { username: 'Sam237', avatarInitials: 'SA', level: 5 };
  const gameName = gameId === 'math' ? 'Calcul rapide' : 'Duel de Quiz';
  const stake = 500;
  const reward = 1000;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          router.replace(`/quiz?gameId=${gameId || 'quiz'}`);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStart = () => {
    router.replace(`/quiz?gameId=${gameId || 'quiz'}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
        <Text style={styles.title}>Adversaire trouvé !</Text>
      </Animated.View>

      <View style={styles.versusSection}>
        <Animated.View entering={FadeInDown.delay(100).springify().damping(15)} style={styles.playerCard}>
          <Avatar initials={mockUser.avatarInitials} size={72} tone="accent" />
          <Text style={styles.playerName}>{mockUser.username}</Text>
          <Text style={styles.playerMeta}>Niv. {mockUser.level} · {mockUser.city}</Text>
          <View style={styles.playerPoints}>
            <Trophy color={theme.reward} size={14} />
            <Text style={styles.playerPointsValue}>{mockUser.points}</Text>
          </View>
        </Animated.View>

        <View style={styles.vsBadge}>
          <Text style={styles.vsText}>VS</Text>
        </View>

        <Animated.View entering={FadeInDown.delay(200).springify().damping(15)} style={styles.playerCard}>
          <Avatar initials={opponent.avatarInitials} size={72} tone="primary" />
          <Text style={styles.playerName}>{opponent.username}</Text>
          <Text style={styles.playerMeta}>Niv. {opponent.level}</Text>
          <View style={styles.playerPoints}>
            <Trophy color={theme.reward} size={14} />
            <Text style={styles.playerPointsValue}>410</Text>
          </View>
        </Animated.View>
      </View>

      <Animated.View entering={FadeInDown.delay(400).duration(300)} style={styles.recapCard}>
        <Text style={styles.recapGame}>{gameName}</Text>
        <View style={styles.recapRow}>
          <Text style={styles.recapLabel}>Enjeu</Text>
          <Text style={styles.recapStake}>{stake.toLocaleString('fr-FR')} FCFA</Text>
        </View>
        <View style={styles.recapRow}>
          <Text style={styles.recapLabel}>Gain potentiel</Text>
          <Text style={styles.recapReward}>{reward.toLocaleString('fr-FR')} FCFA</Text>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(600).duration(300)} style={styles.footer}>
        <Pressable
          onPress={handleStart}
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
        >
          <Zap color={theme.textPrimary} size={18} />
          <Text style={styles.ctaText}>COMMENCER</Text>
        </Pressable>
        <Text style={styles.countdownText}>Début dans {countdown} sec...</Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.background },
  header: { alignItems: 'center', paddingTop: spacing.lg, paddingHorizontal: spacing.lg },
  title: { color: theme.textPrimary, fontSize: typography.title, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -0.5 },
  versusSection: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.md, paddingHorizontal: spacing.lg, marginVertical: spacing.xl },
  playerCard: { alignItems: 'center', gap: spacing.xs, flex: 1 },
  playerName: { color: theme.textPrimary, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold, marginTop: spacing.xs },
  playerMeta: { color: theme.textSecondary, fontSize: typography.caption, fontFamily: typography.fontFamily.regular },
  playerPoints: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: theme.surface, paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: radii.pill, marginTop: 4 },
  playerPointsValue: { color: theme.reward, fontSize: typography.caption, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  vsBadge: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 24, backgroundColor: theme.surface, borderWidth: 2, borderColor: theme.border },
  vsText: { color: theme.textPrimary, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  recapCard: { marginHorizontal: spacing.lg, backgroundColor: theme.surface, borderRadius: radii.lg, padding: spacing.lg, gap: spacing.sm },
  recapGame: { color: theme.textPrimary, fontSize: typography.heading, fontWeight: '700', fontFamily: typography.fontFamily.bold, marginBottom: spacing.xs },
  recapRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  recapLabel: { color: theme.textSecondary, fontSize: typography.body, fontFamily: typography.fontFamily.regular },
  recapStake: { color: theme.money, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  recapReward: { color: theme.reward, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, marginTop: 'auto', alignItems: 'center', gap: spacing.sm },
  cta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: theme.action, borderRadius: radii.pill, paddingVertical: 16, minHeight: 54, width: '100%' },
  ctaPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  ctaText: { color: theme.textPrimary, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1 },
  countdownText: { color: theme.textSecondary, fontSize: typography.caption, fontFamily: typography.fontFamily.regular },
});
