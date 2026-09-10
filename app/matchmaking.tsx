import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { CheckCircle2, X, Zap } from 'lucide-react-native';
import { Avatar, Button } from '@/src/components/ui';
import { colors, spacing, typography } from '@/src/theme/tokens';
import { useAppStore } from '@/src/store/useAppStore';
import { mockUser } from '@/src/services/mockData';
import type { Match, GameId } from '@/src/types';

const opponents = [
  { username: 'Marc237', avatarInitials: 'MA', level: 3 },
  { username: 'Sam237', avatarInitials: 'SA', level: 5 },
  { username: 'Queen237', avatarInitials: 'QU', level: 6 },
  { username: 'BafoussamX', avatarInitials: 'BX', level: 4 },
];

export default function MatchmakingScreen() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const [searching, setSearching] = useState(true);
  const [match, setMatch] = useState<Match | null>(null);
  const setCurrentMatch = useAppStore((s) => s.setCurrentMatch);
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 2000, easing: Easing.linear }), -1, false);
    const timer = setTimeout(() => {
      const opponent = opponents[Math.floor(Math.random() * opponents.length)];
      const newMatch: Match = {
        id: `m_${Date.now()}`,
        gameId: (gameId as GameId) || 'quiz',
        mode: '1v1',
        opponent,
        status: 'playing',
        createdAt: new Date().toISOString(),
      };
      setMatch(newMatch);
      setCurrentMatch(newMatch);
      setSearching(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const handleStart = () => {
    router.push(`/game?gameId=${gameId || 'quiz'}`);
  };

  const handleClose = () => {
    router.replace('/(tabs)/games');
  };

  return (
    <LinearGradient colors={[colors.background, colors.surface]} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.closeRow}>
          <Text style={styles.title}>Matchmaking</Text>
          <Pressable onPress={handleClose} style={styles.closeBtn}><X color={colors.textPrimary} size={20} /></Pressable>
        </View>

        <View style={styles.center}>
          {searching ? (
            <>
              <Animated.View style={[styles.searchRingOuter, ringStyle]} />
              <View style={styles.searchRingInner}><Zap color={colors.accent} size={40} /></View>
              <Animated.Text entering={FadeIn.delay(200)} style={styles.searchingText}>Recherche d'adversaire…</Animated.Text>
              <Animated.Text entering={FadeIn.delay(400)} style={styles.searchingSub}>On te trouve un joueur de ton niveau</Animated.Text>
              <Animated.View entering={FadeInDown.delay(600)} style={styles.searchDots}>
                {[0, 1, 2].map((i) => (
                  <View key={i} style={styles.searchDot} />
                ))}
              </Animated.View>
            </>
          ) : match ? (
            <>
              <Animated.View entering={FadeIn.duration(300)}>
                <View style={styles.foundBadge}>
                  <CheckCircle2 color={colors.success} size={18} />
                  <Text style={styles.foundLabel}>Adversaire trouvé !</Text>
                </View>
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(200).springify().damping(15)} style={styles.versusRow}>
                <View style={styles.versusSide}>
                  <Avatar initials={mockUser.avatarInitials} size={72} tone="accent" />
                  <Text style={styles.versusName}>{mockUser.username}</Text>
                  <Text style={styles.versusLevel}>Niveau {mockUser.level}</Text>
                </View>
                <Text style={styles.vs}>VS</Text>
                <View style={styles.versusSide}>
                  <Avatar initials={match.opponent.avatarInitials} size={72} tone="primary" />
                  <Text style={styles.versusName}>{match.opponent.username}</Text>
                  <Text style={styles.versusLevel}>Niveau {match.opponent.level}</Text>
                </View>
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(500)} style={styles.startWrap}>
                <Button label="Commencer la partie" fullWidth icon={<Zap color={colors.background} size={18} />} onPress={handleStart} />
              </Animated.View>
            </>
          ) : null}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  closeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  title: { color: colors.textPrimary, fontSize: 20, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  closeBtn: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface, borderRadius: 21 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.lg, gap: spacing.md },
  searchRingOuter: { position: 'absolute', width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: colors.accent, borderTopColor: 'transparent', borderRightColor: 'transparent' },
  searchRingInner: { width: 100, height: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: colors.surface },
  searchingText: { color: colors.textPrimary, fontSize: 18, fontWeight: '700', fontFamily: typography.fontFamily.bold, textAlign: 'center' },
  searchingSub: { color: colors.textSecondary, fontSize: 14, fontFamily: typography.fontFamily.regular },
  searchDots: { flexDirection: 'row', gap: 8, marginTop: spacing.sm },
  searchDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent },
  foundBadge: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: 'rgba(31,174,94,0.12)', paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 999 },
  foundLabel: { color: colors.success, fontSize: 16, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 0.5 },
  versusRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.lg, marginVertical: spacing.xl },
  versusSide: { alignItems: 'center', gap: spacing.xs },
  versusName: { color: colors.textPrimary, fontSize: 16, fontWeight: '700', fontFamily: typography.fontFamily.bold, marginTop: spacing.xs },
  versusLevel: { color: colors.textSecondary, fontSize: 12, fontFamily: typography.fontFamily.regular },
  vs: { color: colors.accent, fontSize: 28, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  startWrap: { width: '100%' },
});
