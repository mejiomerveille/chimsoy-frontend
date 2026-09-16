import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Flame, Settings as SettingsIcon, Trophy, Zap } from 'lucide-react-native';
import { Avatar, Badge, Card, ProgressBar } from '@/src/components/ui';
import { colors, radii, spacing, typography , theme} from '@/src/theme/tokens';
import { mockUser } from '@/src/services/mockData';

export default function ProfileScreen() {
  const user = mockUser;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topbar}>
        <Text style={styles.title}>Profil</Text>
        <Link href="/settings" style={styles.iconBtn}><SettingsIcon color={theme.textPrimary} size={20} /></Link>
      </View>

      <View style={styles.content}>
        <Animated.View entering={FadeInDown.duration(400)}>
          <Card tone="primary" style={styles.profileCard}>
            <View style={styles.profileTop}>
              <Avatar initials={user.avatarInitials} size={64} tone="accent" />
              <View style={styles.profileInfo}>
                <Text style={styles.username}>{user.username}</Text>
                <Text style={styles.userMeta}>{user.city} · {user.country}</Text>
                <View style={styles.badgesRow}>
                  <Badge label={`NIV. ${user.level}`} tone="accent" />
                  <Badge label={user.rankLabel.toUpperCase()} tone="gold" />
                </View>
              </View>
            </View>
            <View style={styles.progressSection}>
              <View style={styles.progressLabels}>
                <Text style={styles.progressCaption}>PROGRESSION NIVEAU {user.level + 1}</Text>
                <Text style={styles.progressValue}>72%</Text>
              </View>
              <ProgressBar value={0.72} color={theme.action} />
            </View>
          </Card>
        </Animated.View>

        <View style={styles.statsGrid}>
          {[
            { icon: Trophy, color: theme.action, value: user.stats.wins, label: 'Victoires' },
            { icon: Zap, color: theme.danger, value: user.stats.losses, label: 'Défaites' },
            { icon: Flame, color: theme.success, value: `${user.stats.winRate}%`, label: 'Taux victoire' },
            { icon: Zap, color: theme.link, value: user.stats.currentStreak, label: 'Série actuelle' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Animated.View key={idx} entering={FadeInDown.delay(idx * 60).duration(250)} style={{ flex: 1 }}>
                <Card compact style={styles.statCard}>
                  <Icon color={stat.color} size={18} />
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </Card>
              </Animated.View>
            );
          })}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Badges</Text>
          <Text style={styles.sectionCount}>{user.badges.length} obtenus</Text>
        </View>
        <View style={styles.badgesList}>
          {user.badges.map((badge, idx) => (
            <Animated.View key={badge.id} entering={FadeInDown.delay(idx * 80).duration(250)} style={{ flex: 1 }}>
              <Card compact style={styles.badgeCard}>
                <View style={styles.badgeIcon}><Trophy color={theme.background} size={22} /></View>
                <Text style={styles.badgeLabel}>{badge.label}</Text>
                <Text style={styles.badgeDesc}>{badge.description}</Text>
              </Card>
            </Animated.View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Historique des parties</Text>
        </View>
        <View style={styles.historyList}>
          <Card compact style={styles.historyRow}>
            <View style={[styles.historyIcon, styles.historyWin]}><Trophy color={theme.success} size={16} /></View>
            <View style={styles.historyInfo}>
              <Text style={styles.historyLabel}>Victoire · Quiz Arena</Text>
              <Text style={styles.historyOpp}>contre Marc237</Text>
            </View>
            <Text style={styles.historyPoints}>+32</Text>
          </Card>
          <Card compact style={styles.historyRow}>
            <View style={[styles.historyIcon, styles.historyLoss]}><Flame color={theme.action} size={16} /></View>
            <View style={styles.historyInfo}>
              <Text style={styles.historyLabel}>Défaite · Ludo Clash</Text>
              <Text style={styles.historyOpp}>contre Bot</Text>
            </View>
            <Text style={styles.historyPointsLoss}>+0</Text>
          </Card>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.background },
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  title: { color: theme.textPrimary, fontSize: 26, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -0.5 },
  iconBtn: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.surface, borderRadius: 21 },
  content: { padding: spacing.lg, gap: spacing.lg },
  profileCard: { gap: spacing.lg },
  profileTop: { flexDirection: 'row', gap: spacing.md },
  profileInfo: { flex: 1, gap: spacing.xs },
  username: { color: '#fff', fontSize: 24, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  userMeta: { color: 'rgba(255,255,255,0.5)', fontSize: 13, fontFamily: typography.fontFamily.regular },
  badgesRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs },
  progressSection: { gap: spacing.sm },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  progressCaption: { color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 0.5 },
  progressValue: { color: theme.action, fontSize: 12, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  statsGrid: { flexDirection: 'row', gap: spacing.sm },
  statCard: { gap: spacing.xs },
  statValue: { color: theme.textPrimary, fontSize: 22, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  statLabel: { color: theme.textSecondary, fontSize: 10, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { color: theme.textPrimary, fontSize: 18, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  sectionCount: { color: theme.textSecondary, fontSize: 12, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  badgesList: { flexDirection: 'row', gap: spacing.md },
  badgeCard: { gap: spacing.xs },
  badgeIcon: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.reward, borderRadius: 22 },
  badgeLabel: { color: theme.textPrimary, fontSize: 14, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  badgeDesc: { color: theme.textSecondary, fontSize: 12, lineHeight: 16, fontFamily: typography.fontFamily.regular },
  historyList: { gap: spacing.sm },
  historyRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  historyIcon: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 18 },
  historyWin: { backgroundColor: 'rgba(31,174,94,0.15)' },
  historyLoss: { backgroundColor: 'rgba(255,106,44,0.15)' },
  historyInfo: { flex: 1 },
  historyLabel: { color: theme.textPrimary, fontSize: 14, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  historyOpp: { color: theme.textSecondary, fontSize: 12, marginTop: 2, fontFamily: typography.fontFamily.regular },
  historyPoints: { color: theme.success, fontSize: 16, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  historyPointsLoss: { color: theme.textSecondary, fontSize: 16, fontWeight: '700', fontFamily: typography.fontFamily.bold },
});
