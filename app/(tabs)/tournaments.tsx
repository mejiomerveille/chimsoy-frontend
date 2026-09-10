import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Brain, Check, Gamepad2, Trophy, Users, Zap } from 'lucide-react-native';
import { Badge, Button, Card } from '@/src/components/ui';
import { colors, radius, spacing, typography } from '@/src/theme/tokens';
import { mockTournaments } from '@/src/services/mockData';
import { useAppStore } from '@/src/store/useAppStore';

export default function TournamentsScreen() {
  const joinedTournaments = useAppStore((s) => s.joinedTournaments);
  const toggleTournament = useAppStore((s) => s.toggleTournament);
  const [filter, setFilter] = useState<'all' | 'live' | 'upcoming'>('all');

  const filtered = mockTournaments.filter((t) => filter === 'all' || t.status === filter);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>COMPÉTITIONS</Text>
        <Text style={styles.title}>Tournois</Text>
      </View>

      <View style={styles.filterRow}>
        {(['all', 'live', 'upcoming'] as const).map((f) => (
          <Pressable key={f} onPress={() => setFilter(f)} style={[styles.filterTab, filter === f && styles.filterTabActive]}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f === 'all' ? 'Tous' : f === 'live' ? 'En direct' : 'À venir'}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.list}>
        {filtered.map((t, idx) => {
          const isJoined = joinedTournaments.includes(t.id);
          const isFull = t.participants >= t.maxParticipants;
          return (
            <Animated.View key={t.id} entering={FadeInDown.delay(idx * 80).duration(300)}>
              <Card style={styles.tournamentCard}>
                <View style={styles.cardTop}>
                  <View style={styles.iconWrap}>
                    {t.gameId === 'quiz' ? <Brain color={colors.accent} size={22} /> : <Gamepad2 color={colors.accent} size={22} />}
                  </View>
                  {t.status === 'live' ? (
                    <View style={styles.liveBadge}><View style={styles.liveDot} /><Text style={styles.liveBadgeText}>EN DIRECT</Text></View>
                  ) : (
                    <Badge label="À VENIR" tone="primary" />
                  )}
                </View>
                <Text style={styles.name}>{t.name}</Text>
                <View style={styles.stats}>
                  <View style={styles.stat}><Users color={colors.textSecondary} size={15} /><Text style={styles.statText}>{t.participants}/{t.maxParticipants}</Text></View>
                  <Text style={styles.prize}>Cagnotte: {t.prizePool.toLocaleString('fr-FR')} FCFA</Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${(t.participants / t.maxParticipants) * 100}%` }]} />
                  </View>
                </View>
                <View style={styles.footer}>
                  <Text style={styles.fee}>{t.entryFee === 0 ? 'Gratuit' : `${t.entryFee} FCFA`}</Text>
                  {isJoined ? (
                    <View style={styles.joinedBadge}><Check color={colors.success} size={16} /><Text style={styles.joinedText}>Inscrit</Text></View>
                  ) : (
                    <Button
                      label={isFull ? 'Complet' : "S'inscrire"}
                      disabled={isFull}
                      icon={!isFull && <Zap color={colors.background} size={16} />}
                      onPress={() => toggleTournament(t.id)}
                    />
                  )}
                </View>
              </Card>
            </Animated.View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.lg, gap: spacing.xs },
  eyebrow: { color: colors.accent, fontSize: 10, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1.4 },
  title: { color: colors.textPrimary, fontSize: 26, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -0.5 },
  filterRow: { flexDirection: 'row', paddingHorizontal: spacing.lg, gap: spacing.sm, marginBottom: spacing.md },
  filterTab: { paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: 999, backgroundColor: colors.surface },
  filterTabActive: { backgroundColor: colors.accent },
  filterText: { color: colors.textSecondary, fontSize: 13, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  filterTextActive: { color: colors.background },
  list: { padding: spacing.lg, gap: spacing.md },
  tournamentCard: { gap: spacing.sm },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconWrap: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,106,44,0.12)', borderRadius: radius.sm },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,106,44,0.15)', paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: 999 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accent },
  liveBadgeText: { color: colors.accent, fontSize: 10, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 0.8 },
  name: { color: colors.textPrimary, fontSize: 18, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  stats: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stat: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  statText: { color: colors.textSecondary, fontSize: 13, fontWeight: '500', fontFamily: typography.fontFamily.medium },
  prize: { color: colors.gold, fontSize: 13, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  progressBar: { marginVertical: 4 },
  progressTrack: { height: 6, backgroundColor: colors.background, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.accent, borderRadius: 3 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.xs },
  fee: { color: colors.textPrimary, fontSize: 14, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  joinedBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(31,174,94,0.15)', paddingHorizontal: spacing.md, paddingVertical: 10, borderRadius: 999 },
  joinedText: { color: colors.success, fontSize: 14, fontWeight: '700', fontFamily: typography.fontFamily.bold },
});
