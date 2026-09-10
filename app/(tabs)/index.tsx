import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Bell, ChevronRight, CircleDollarSign, Flame, Medal, Play, TrendingUp, Trophy, Users, Zap } from 'lucide-react-native';
import { Avatar, Badge, Card, ProgressBar } from '@/src/components/ui';
import { colors, radius, spacing, typography } from '@/src/theme/tokens';
import { mockUser, mockMatches, mockTournaments, mockGames } from '@/src/services/mockData';

export default function HomeScreen() {
  const user = mockUser;
  const recentMatch = mockMatches[0];
  const liveTournament = mockTournaments.find((t) => t.status === 'live');
  const featuredGames = mockGames.slice(0, 4);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.ScrollView entering={FadeIn.duration(400)} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topbar}>
          <View style={styles.topbarLeft}>
            <Avatar initials={user.avatarInitials} size={46} tone="accent" />
            <View>
              <Text style={styles.kicker}>{user.city.toUpperCase()} · NIV. {user.level}</Text>
              <Text style={styles.greeting}>Salut, {user.username}</Text>
            </View>
          </View>
          <Link href="/notifications" style={styles.notification}><Bell color={colors.textPrimary} size={18} /><View style={styles.dot} /></Link>
        </View>

        <LinearGradient colors={[colors.primary, colors.surface]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <View style={styles.heroGlow} />
          <View style={styles.heroBadge}><Badge label="NOUVEAU · DOUALA" tone="gold" /></View>
          <Text style={styles.heroTitle}>Joue fort.{"\n"}Monte plus haut.</Text>
          <Text style={styles.heroCopy}>La compétition africaine commence ici. Défie ta ville, gagne des points, écris ton classement.</Text>
          <Pressable onPress={() => router.push('/matchmaking')} style={({ pressed }) => [styles.heroCta, pressed && styles.heroCtaPressed]}>
            <Play color={colors.background} size={17} fill={colors.background} />
            <Text style={styles.heroCtaText}>Lancer une partie</Text>
          </Pressable>
          <Text style={styles.heroFootnote}>Aucun hasard. Que du talent.</Text>
        </LinearGradient>

        <View style={styles.sectionHeader}>
          <View><Text style={styles.sectionEyebrow}>TON ARÈNE</Text><Text style={styles.sectionTitle}>Choisis ton terrain</Text></View>
          <Link href="/games"><Text style={styles.seeAll}>Voir tout <ChevronRight color={colors.accent} size={16} /></Text></Link>
        </View>

        <View style={styles.gameGrid}>
          {featuredGames.map((game, idx) => (
            <Animated.View key={game.id} entering={FadeInDown.delay(idx * 80).duration(400)} style={styles.gameCardOuter}>
              <Pressable onPress={() => router.push(`/matchmaking?gameId=${game.id}`)} style={({ pressed }) => pressed && styles.cardPressed}>
                <View style={styles.gameCard}>
                  <View style={styles.gameImageWrap}>
                    <Image source={{ uri: game.image }} style={styles.gameImage} />
                    <View style={styles.gameImageOverlay} />
                    <View style={styles.gameBadgeWrap}>
                      <Badge label={game.mode.toUpperCase()} tone={game.id === 'quiz' || game.id === 'checkers' ? 'surface' : 'gold'} />
                    </View>
                  </View>
                  <View style={styles.gameInfo}>
                    <Text style={styles.gameTitle}>{game.name}</Text>
                    <Text style={styles.gameMeta}>{game.category} · {game.durationLabel}</Text>
                  </View>
                </View>
              </Pressable>
            </Animated.View>
          ))}
        </View>

        <View style={styles.shortcutRow}>
          <Link href="/tournaments" style={styles.shortcut}><Trophy color={colors.accent} size={22} /><Text style={styles.shortcutLabel}>Tournois</Text></Link>
          <Link href="/leaderboard" style={styles.shortcut}><Medal color={colors.gold} size={22} /><Text style={styles.shortcutLabel}>Classement</Text></Link>
          <Link href="/communities" style={styles.shortcut}><Users color={colors.success} size={22} /><Text style={styles.shortcutLabel}>Communautés</Text></Link>
          <Link href="/(tabs)/wallet" style={styles.shortcut}><CircleDollarSign color={colors.primary} size={22} /><Text style={styles.shortcutLabel}>Portefeuille</Text></Link>
        </View>

        {liveTournament && (
          <Animated.View entering={FadeInDown.delay(300).duration(400)}>
            <Card tone="primary" style={styles.liveCard}>
              <View style={styles.liveTop}>
                <View style={styles.liveBadge}><View style={styles.liveDot} /><Text style={styles.liveBadgeText}>EN DIRECT</Text></View>
                <Trophy color={colors.gold} size={20} />
              </View>
              <Text style={styles.liveName}>{liveTournament.name}</Text>
              <View style={styles.liveStats}>
                <Text style={styles.liveStat}>{liveTournament.participants} joueurs</Text>
                <Text style={styles.livePrize}>Cagnotte {liveTournament.prizePool.toLocaleString('fr-FR')} FCFA</Text>
              </View>
              <Pressable onPress={() => router.push('/tournaments')} style={({ pressed }) => [styles.liveCta, pressed && styles.liveCtaPressed]}>
                <Zap color={colors.background} size={16} />
                <Text style={styles.liveCtaText}>Rejoindre le tournoi</Text>
              </Pressable>
            </Card>
          </Animated.View>
        )}

        <View style={styles.sectionHeader}>
          <View><Text style={styles.sectionEyebrow}>DERNIÈRE PARTIE</Text><Text style={styles.sectionTitle}>Ton résultat</Text></View>
        </View>

        <Card style={styles.progressCard}>
          <View style={styles.progressTop}>
            <View style={styles.progressIdentity}>
              <Avatar initials={user.avatarInitials} size={38} tone="accent" />
              <View><Text style={styles.progressName}>{user.username}</Text><Text style={styles.progressMeta}>Niveau {user.level} · {user.rankLabel}</Text></View>
            </View>
            <Medal color={colors.gold} size={24} />
          </View>
          <View style={styles.progressLabels}><Text style={styles.progressCaption}>PROGRESSION VERS NIVEAU 5</Text><Text style={styles.progressValue}>72%</Text></View>
          <ProgressBar value={0.72} />
        </Card>

        {recentMatch && (
          <Card style={styles.recentCard}>
            <View style={styles.recentTop}>
              <View style={[styles.recentIcon, recentMatch.result === 'win' && styles.recentIconWin]}><Flame color={recentMatch.result === 'win' ? colors.success : colors.accent} size={18} /></View>
              <View style={styles.recentInfo}>
                <Text style={styles.recentLabel}>{recentMatch.result === 'win' ? 'Victoire' : 'Défaite'} · {recentMatch.gameId === 'quiz' ? 'Quiz Arena' : 'Ludo Clash'}</Text>
                <Text style={styles.recentOpp}>contre {recentMatch.opponent.username}</Text>
              </View>
              {recentMatch.result === 'win' && <Text style={styles.recentPoints}>+{recentMatch.pointsAwarded}</Text>}
            </View>
          </Card>
        )}

        <View style={styles.statRow}>
          <Card compact style={styles.statCard}><TrendingUp color={colors.accent} size={18} /><Text style={styles.statValue}>{user.stats.winRate}%</Text><Text style={styles.statLabel}>Taux victoire</Text></Card>
          <Card compact style={styles.statCard}><Flame color={colors.gold} size={18} /><Text style={styles.statValue}>{user.stats.currentStreak}</Text><Text style={styles.statLabel}>Série en cours</Text></Card>
          <Card compact style={styles.statCard}><Trophy color={colors.success} size={18} /><Text style={styles.statValue}>{user.stats.wins}</Text><Text style={styles.statLabel}>Victoires</Text></Card>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: 100, gap: spacing.lg },
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: spacing.sm },
  topbarLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  kicker: { color: colors.textSecondary, fontSize: 10, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1.2 },
  greeting: { color: colors.textPrimary, fontSize: 20, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -0.5 },
  notification: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface, borderRadius: 22 },
  dot: { position: 'absolute', top: 10, right: 11, width: 7, height: 7, borderRadius: 3.5, backgroundColor: colors.accent },
  hero: { position: 'relative', overflow: 'hidden', padding: spacing.lg, minHeight: 300, justifyContent: 'flex-end', borderRadius: radius.lg, gap: spacing.md },
  heroGlow: { position: 'absolute', width: 240, height: 240, right: -80, top: -80, borderRadius: 120, backgroundColor: 'rgba(255,255,255,0.08)' },
  heroBadge: { alignSelf: 'flex-start' },
  heroTitle: { color: '#fff', fontSize: 34, lineHeight: 38, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -1.5 },
  heroCopy: { maxWidth: 390, color: 'rgba(255,255,255,0.82)', fontSize: 14, lineHeight: 21, fontFamily: typography.fontFamily.regular },
  heroCta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: colors.accent, borderRadius: radius.full, paddingVertical: 14, minHeight: 50, alignSelf: 'flex-start' },
  heroCtaPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  heroCtaText: { color: colors.background, fontSize: 15, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  heroFootnote: { color: 'rgba(255,255,255,0.54)', fontSize: 11, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  sectionHeader: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  sectionEyebrow: { color: colors.accent, fontSize: 10, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1.4 },
  sectionTitle: { color: colors.textPrimary, fontSize: 20, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -0.5 },
  seeAll: { color: colors.accent, fontSize: 12, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  gameGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  gameCardOuter: { width: '48%' },
  cardPressed: { opacity: 0.88, transform: [{ scale: 0.98 }] },
  gameCard: { borderRadius: radius.md, overflow: 'hidden', backgroundColor: colors.surface },
  gameImageWrap: { height: 130, position: 'relative', justifyContent: 'flex-start', alignItems: 'flex-end', padding: spacing.sm },
  gameImage: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, resizeMode: 'cover' },
  gameImageOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11,15,26,0.35)' },
  gameBadgeWrap: { position: 'relative' },
  gameInfo: { padding: spacing.md, gap: 4 },
  gameTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  gameMeta: { color: colors.textSecondary, fontSize: 12, fontWeight: '500', fontFamily: typography.fontFamily.medium },
  shortcutRow: { flexDirection: 'row', gap: spacing.sm },
  shortcut: { flex: 1, alignItems: 'center', gap: spacing.xs, backgroundColor: colors.surface, borderRadius: radius.md, paddingVertical: spacing.md },
  shortcutLabel: { color: colors.textPrimary, fontSize: 11, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  liveCard: { gap: spacing.sm },
  liveTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,106,44,0.2)', paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: 999 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accent },
  liveBadgeText: { color: colors.accent, fontSize: 10, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 0.8 },
  liveName: { color: '#fff', fontSize: 18, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  liveStats: { flexDirection: 'row', justifyContent: 'space-between' },
  liveStat: { color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: '500', fontFamily: typography.fontFamily.medium },
  livePrize: { color: colors.gold, fontSize: 13, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  liveCta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: colors.accent, borderRadius: radius.full, paddingVertical: 12, minHeight: 46 },
  liveCtaPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  liveCtaText: { color: colors.background, fontSize: 14, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  progressCard: { gap: spacing.md },
  progressTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  progressIdentity: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  progressName: { color: colors.textPrimary, fontSize: 15, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  progressMeta: { color: colors.textSecondary, fontSize: 12, marginTop: 2, fontFamily: typography.fontFamily.regular },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  progressCaption: { color: colors.textSecondary, fontSize: 10, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 0.5 },
  progressValue: { color: colors.accent, fontSize: 12, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  recentCard: { gap: spacing.sm },
  recentTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  recentIcon: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: 'rgba(255,106,44,0.15)' },
  recentIconWin: { backgroundColor: 'rgba(31,174,94,0.15)' },
  recentInfo: { flex: 1 },
  recentLabel: { color: colors.textPrimary, fontSize: 14, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  recentOpp: { color: colors.textSecondary, fontSize: 12, marginTop: 2, fontFamily: typography.fontFamily.regular },
  recentPoints: { color: colors.success, fontSize: 18, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  statRow: { flexDirection: 'row', gap: spacing.sm },
  statCard: { flex: 1, gap: spacing.xs },
  statValue: { color: colors.textPrimary, fontSize: 20, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  statLabel: { color: colors.textSecondary, fontSize: 10, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
});
