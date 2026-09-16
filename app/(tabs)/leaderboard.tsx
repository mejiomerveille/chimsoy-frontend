import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Crown, Medal } from 'lucide-react-native';
import { Avatar } from '@/src/components/ui';
import { colors, radii, spacing, typography , theme} from '@/src/theme/tokens';
import { mockLeaderboard } from '@/src/services/mockData';

const scopes = ['city', 'country', 'africa', 'world'] as const;
const scopeLabels: Record<(typeof scopes)[number], string> = { city: 'Ville', country: 'Pays', africa: 'Afrique', world: 'Monde' };

export default function LeaderboardScreen() {
  const [scope, setScope] = useState<(typeof scopes)[number]>('city');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>CLASSEMENTS</Text>
        <Text style={styles.title}>Classements</Text>
      </View>

      <View style={styles.tabs}>
        {scopes.map((s) => (
          <Pressable key={s} onPress={() => setScope(s)} style={[styles.tab, scope === s && styles.tabActive]}>
            <Text style={[styles.tabText, scope === s && styles.tabTextActive]}>{scopeLabels[s]}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.podiumRow}>
        {[1, 0, 2].map((idx) => {
          const entry = mockLeaderboard[idx];
          if (!entry) return null;
          return (
            <Animated.View key={entry.rank} entering={FadeInDown.delay(idx * 100).duration(400)} style={[styles.podiumSide, idx === 0 && styles.podiumTop]}>
              {idx === 0 && <Crown color={theme.reward} size={24} />}
              <Avatar initials={entry.avatarInitials} size={idx === 0 ? 56 : 44} tone={idx === 0 ? 'accent' : idx === 1 ? 'primary' : 'gold'} />
              <Text style={[styles.podiumName, idx === 0 && styles.podiumNameTop]}>{entry.username}</Text>
              <Text style={styles.podiumPoints}>{entry.points} pts</Text>
              <View style={[styles.podiumBar, idx === 0 && styles.podiumBarTop]}>
                <Text style={styles.podiumRank}>#{entry.rank}</Text>
              </View>
            </Animated.View>
          );
        })}
      </View>

      <View style={styles.list}>
        {mockLeaderboard.map((entry, idx) => (
          <Animated.View key={entry.rank} entering={FadeInDown.delay(idx * 60).duration(250)} style={[styles.row, entry.isMe && styles.rowMe]}>
            <Text style={styles.rank}>#{entry.rank}</Text>
            <Avatar initials={entry.avatarInitials} size={36} tone={entry.isMe ? 'accent' : 'primary'} />
            <View style={styles.rowInfo}>
              <Text style={styles.rowName}>{entry.username}{entry.isMe ? ' (Toi)' : ''}</Text>
              <Text style={styles.rowCity}>{entry.city} · Niv. {entry.level}</Text>
            </View>
            <Text style={styles.rowPoints}>{entry.points}</Text>
          </Animated.View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.background },
  header: { padding: spacing.lg, gap: spacing.xs },
  eyebrow: { color: theme.action, fontSize: 10, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1.4 },
  title: { color: theme.textPrimary, fontSize: 26, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -0.5 },
  tabs: { flexDirection: 'row', paddingHorizontal: spacing.lg, gap: spacing.sm, marginBottom: spacing.md },
  tab: { paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: 999, backgroundColor: theme.surface },
  tabActive: { backgroundColor: theme.action },
  tabText: { color: theme.textSecondary, fontSize: 13, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  tabTextActive: { color: theme.background },
  podiumRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: spacing.md, paddingHorizontal: spacing.lg, marginBottom: spacing.lg },
  podiumSide: { alignItems: 'center', gap: 4 },
  podiumTop: { marginBottom: -8 },
  podiumName: { color: theme.textPrimary, fontSize: 13, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  podiumNameTop: { fontSize: 15, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  podiumPoints: { color: theme.textSecondary, fontSize: 11, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  podiumBar: { marginTop: 6, paddingHorizontal: spacing.md, paddingVertical: 10, borderRadius: radii.sm, backgroundColor: theme.surface, minWidth: 60, alignItems: 'center' },
  podiumBarTop: { backgroundColor: theme.action },
  podiumRank: { color: theme.textPrimary, fontSize: 14, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  list: { padding: spacing.lg, gap: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: theme.surface, borderRadius: radii.md, padding: spacing.md },
  rowMe: { backgroundColor: 'rgba(255,106,44,0.12)' },
  rank: { color: theme.textSecondary, fontSize: 14, fontWeight: '700', fontFamily: typography.fontFamily.bold, width: 36 },
  rowInfo: { flex: 1 },
  rowName: { color: theme.textPrimary, fontSize: 14, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  rowCity: { color: theme.textSecondary, fontSize: 12, marginTop: 2, fontFamily: typography.fontFamily.regular },
  rowPoints: { color: theme.action, fontSize: 16, fontWeight: '700', fontFamily: typography.fontFamily.bold },
});
