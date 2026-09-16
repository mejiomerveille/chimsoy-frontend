import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { ChevronLeft, Gem, Globe } from 'lucide-react-native';
import { colors, radii, spacing, typography, theme } from '@/src/theme/tokens';
import { useAppStore } from '@/src/store/useAppStore';
import type { Match, GameId } from '@/src/types';

const opponents = [
  { username: 'Aboubakar_221', avatarInitials: 'AB', level: 7 },
  { username: 'Marc237', avatarInitials: 'MA', level: 3 },
  { username: 'Sam237', avatarInitials: 'SA', level: 5 },
  { username: 'Queen237', avatarInitials: 'QU', level: 6 },
];

export default function MatchmakingScreen() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const [searching, setSearching] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const setCurrentMatch = useAppStore((s) => s.setCurrentMatch);
  const pulse = useSharedValue(0);
  const pulse2 = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.ease) }), -1, true);
    pulse2.value = withRepeat(withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.ease) }), -1, true);
    const matchTimer = setTimeout(() => {
      setSearching(false);
      const opponent = opponents[Math.floor(Math.random() * opponents.length)];
      const newMatch: Match = {
        id: `m_${Date.now()}`,
        gameId: (gameId as GameId) || 'quiz',
        mode: '1v1',
        opponent,
        status: 'playing',
        createdAt: new Date().toISOString(),
      };
      setCurrentMatch(newMatch);
    }, 3000);
    return () => clearTimeout(matchTimer);
  }, []);

  useEffect(() => {
    if (searching) return;
    if (countdown <= 0) {
      router.replace(`/quiz?gameId=${gameId || 'quiz'}`);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [searching, countdown]);

  const ringStyle = useAnimatedStyle(() => ({
    opacity: 0.3 + pulse.value * 0.4,
    transform: [{ scale: 1 + pulse.value * 0.5 }],
  }));

  const ringStyle2 = useAnimatedStyle(() => ({
    opacity: 0.15 + pulse2.value * 0.3,
    transform: [{ scale: 1 + pulse2.value * 0.8 }],
  }));

  const ringStyle3 = useAnimatedStyle(() => ({
    opacity: 0.08 + pulse.value * 0.2,
    transform: [{ scale: 1 + pulse.value * 1.1 }],
  }));

  const handleCancel = () => {
    router.replace('/(tabs)/games');
  };

  const opponent = useAppStore((s) => s.currentMatch?.opponent);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Pressable onPress={handleCancel} style={styles.backBtn}>
            <ChevronLeft color={theme.textPrimary} size={22} />
          </Pressable>
          <Text style={styles.headerTitle}>RECHERCHE D'ADVERSAIRE</Text>
          <View style={styles.backBtnPlaceholder} />
        </View>

        {searching ? (
          <View style={styles.centerContent}>
            <View style={styles.radarWrap}>
              <Animated.View style={[styles.ring3, ringStyle3]} />
              <Animated.View style={[styles.ring2, ringStyle2]} />
              <Animated.View style={[styles.ring1, ringStyle]} />
              <View style={styles.ringCore}>
                <Text style={styles.ringCoreText}>C</Text>
              </View>
            </View>

            <Text style={styles.searchingTitle}>Recherche en cours...</Text>
            <Text style={styles.searchingSub}>Cela peut prendre quelques secondes</Text>
          </View>
        ) : (
          <Animated.View entering={FadeIn.duration(400)} style={styles.foundContent}>
            <View style={styles.separator} />

            <Text style={styles.foundTitle}>ADVERSAIRE TROUVÉ !</Text>

            <View style={styles.opponentCard}>
              <View style={styles.opponentTop}>
                <View style={styles.opponentAvatarWrap}>
                  <Text style={styles.opponentAvatarText}>AB</Text>
                </View>
                <View style={styles.opponentInfo}>
                  <Text style={styles.opponentName}>Aboubakar_221</Text>
                  <View style={styles.opponentMetaRow}>
                    <Globe color={theme.textSecondary} size={14} />
                    <Text style={styles.opponentMeta}>Sénégal</Text>
                  </View>
                  <View style={styles.opponentMetaRow}>
                    <Gem color={theme.link} size={14} />
                    <Text style={styles.opponentRank}>Diamant III</Text>
                  </View>
                </View>
              </View>

              <View style={styles.opponentStatsRow}>
                <View style={styles.opponentStat}>
                  <Text style={styles.opponentStatLabel}>TAUX DE VICTOIRE</Text>
                  <Text style={styles.opponentStatValue}>71%</Text>
                </View>
                <View style={styles.opponentStatDivider} />
                <View style={styles.opponentStat}>
                  <Text style={styles.opponentStatLabel}>PARTIES JOUÉES</Text>
                  <Text style={styles.opponentStatValue}>2 341</Text>
                </View>
              </View>
            </View>

            <View style={styles.separator} />

            <View style={styles.countdownSection}>
              <Text style={styles.countdownLabel}>Le match commence dans</Text>
              <View style={styles.countdownCircle}>
                <Text style={styles.countdownNumber}>{countdown}</Text>
              </View>
            </View>
          </Animated.View>
        )}

        <View style={styles.footer}>
          <Pressable
            onPress={handleCancel}
            style={({ pressed }) => [styles.cancelBtn, pressed && styles.cancelBtnPressed]}
          >
            <Text style={styles.cancelBtnText}>ANNULER</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  safe: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingTop: spacing.sm },
  backBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.surface, borderRadius: 22 },
  backBtnPlaceholder: { width: 44 },
  headerTitle: { color: theme.textPrimary, fontSize: typography.caption, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1 },
  centerContent: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.lg },
  radarWrap: { width: 240, height: 240, alignItems: 'center', justifyContent: 'center' },
  ring3: { position: 'absolute', width: 220, height: 220, borderRadius: 110, borderWidth: 1.5, borderColor: theme.link },
  ring2: { position: 'absolute', width: 160, height: 160, borderRadius: 80, borderWidth: 1.5, borderColor: theme.link },
  ring1: { position: 'absolute', width: 110, height: 110, borderRadius: 55, borderWidth: 2, borderColor: theme.link },
  ringCore: { width: 72, height: 72, alignItems: 'center', justifyContent: 'center', borderRadius: 36, backgroundColor: theme.action },
  ringCoreText: { color: theme.textPrimary, fontSize: 32, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  searchingTitle: { color: theme.textPrimary, fontSize: typography.heading, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  searchingSub: { color: theme.textSecondary, fontSize: typography.caption, fontFamily: typography.fontFamily.regular },
  foundContent: { flex: 1, paddingHorizontal: spacing.lg, gap: spacing.lg, justifyContent: 'center' },
  separator: { height: 1, backgroundColor: theme.border },
  foundTitle: { color: theme.success, fontSize: typography.heading, fontWeight: '700', fontFamily: typography.fontFamily.bold, textAlign: 'center', letterSpacing: 1 },
  opponentCard: { backgroundColor: theme.surface, borderRadius: radii.lg, padding: spacing.lg, gap: spacing.md },
  opponentTop: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  opponentAvatarWrap: { width: 56, height: 56, borderRadius: 28, backgroundColor: theme.link, alignItems: 'center', justifyContent: 'center' },
  opponentAvatarText: { color: theme.textPrimary, fontSize: typography.heading, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  opponentInfo: { flex: 1, gap: 4 },
  opponentName: { color: theme.textPrimary, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  opponentMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  opponentMeta: { color: theme.textSecondary, fontSize: typography.caption, fontFamily: typography.fontFamily.regular },
  opponentRank: { color: theme.link, fontSize: typography.caption, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  opponentStatsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  opponentStat: { flex: 1, alignItems: 'center', gap: 4 },
  opponentStatDivider: { width: 1, height: 32, backgroundColor: theme.border },
  opponentStatLabel: { color: theme.textSecondary, fontSize: typography.micro, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 0.5 },
  opponentStatValue: { color: theme.textPrimary, fontSize: typography.heading, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  countdownSection: { alignItems: 'center', gap: spacing.md },
  countdownLabel: { color: theme.textSecondary, fontSize: typography.body, fontFamily: typography.fontFamily.regular },
  countdownCircle: { width: 80, height: 80, alignItems: 'center', justifyContent: 'center', borderRadius: 40, borderWidth: 4, borderColor: theme.action },
  countdownNumber: { color: theme.textPrimary, fontSize: 32, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg },
  cancelBtn: { alignItems: 'center', justifyContent: 'center', backgroundColor: theme.surface, borderRadius: radii.pill, paddingVertical: 16, minHeight: 54 },
  cancelBtnPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  cancelBtnText: { color: theme.textPrimary, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1 },
});
