import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { ChevronLeft, ChevronRight, Medal, Search, Trophy, Users } from 'lucide-react-native';
import { colors, radii, spacing, typography, theme } from '@/src/theme/tokens';

import quizDuelBg from '../../assets/images/quiz-duel.jpg';
import mathBg from '../../assets/images/quick-math.jpg';
import checkersBg from '../../assets/images/checkers.jpg';
import cardsBg from '../../assets/images/cards.jpg';

type GameCard = {
  id: string;
  title: string;
  subtitle: string;
  mode: string;
  icon: typeof Trophy;
  players: string;
  highlighted?: boolean;
  bg: typeof quizDuelBg;
};

const games: GameCard[] = [
  { id: 'quiz', title: 'DUEL DE QUIZ', subtitle: 'Connaissances générales', mode: '1vs1', icon: Trophy, players: '1 245', highlighted: true, bg: quizDuelBg },
  { id: 'math', title: 'CALCUL RAPIDE', subtitle: 'Maths mentales', mode: '1vs1', icon: Users, players: '987', bg: mathBg },
  { id: 'checkers', title: 'JEU DE DAME', subtitle: 'Stratégie classique', mode: '1vs1', icon: Medal, players: '634', bg: checkersBg },
  { id: 'cards', title: 'JEU DE CARTE', subtitle: 'Belote & Plus', mode: '2 à 4 joueurs', icon: Users, players: '1 102', bg: cardsBg },
];

const filters = ['TOUS', 'COMPÉTITIFS', 'RAPIDES', 'CARTES', 'STRATÉGIE'];

export default function GamesScreen() {
  const [activeFilter, setActiveFilter] = useState('TOUS');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.headerBtn}>
          <ChevronLeft color={theme.textPrimary} size={22} />
        </Pressable>
        <Text style={styles.headerTitle}>JEUX</Text>
        <Pressable style={styles.headerBtn}>
          <Search color={theme.textPrimary} size={20} />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {filters.map((f) => (
          <Pressable
            key={f}
            onPress={() => setActiveFilter(f)}
            style={({ pressed }) => [styles.filterPill, activeFilter === f && styles.filterPillActive, pressed && styles.filterPillPressed]}
          >
            <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Animated.ScrollView entering={FadeIn.duration(300)} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {games.map((game, idx) => {
          const Icon = game.icon;
          return (
            <Animated.View key={game.id} entering={FadeInDown.delay(idx * 80).duration(250)}>
              <Pressable
                onPress={() => router.push(`/game?gameId=${game.id}`)}
                style={({ pressed }) => [styles.gameCard, game.highlighted && styles.gameCardHighlight, pressed && styles.gameCardPressed]}
              >
                <Animated.Image source={game.bg} style={styles.gameBg} />
                <View style={styles.gameOverlay} />
                <View style={styles.gameContent}>
                  <View style={styles.gameTopRow}>
                    <Text style={styles.gameTitle}>{game.title}</Text>
                    {game.highlighted && <View style={styles.highlightBadge} />}
                  </View>
                  <Text style={styles.gameSubtitle}>{game.subtitle}</Text>
                  <View style={styles.gameBottomRow}>
                    <View style={styles.gameModeBadge}>
                      <Text style={styles.gameModeText}>{game.mode}</Text>
                    </View>
                    <View style={styles.gameStatsRow}>
                      <Icon color={game.highlighted ? theme.link : theme.textSecondary} size={14} />
                      <Text style={[styles.gameStatsText, game.highlighted && styles.gameStatsTextHighlight]}>{game.players}</Text>
                    </View>
                    <ChevronRight color={game.highlighted ? theme.link : theme.textSecondary} size={18} />
                  </View>
                </View>
              </Pressable>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingTop: spacing.sm },
  headerBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.surface, borderRadius: 22 },
  headerTitle: { color: theme.textPrimary, fontSize: typography.heading, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1 },
  filterRow: { paddingHorizontal: spacing.lg, gap: spacing.sm, paddingVertical: spacing.md },
  filterPill: { paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: radii.pill, borderWidth: 1, borderColor: theme.border, backgroundColor: 'transparent' },
  filterPillActive: { backgroundColor: theme.action, borderWidth: 0 },
  filterPillPressed: { opacity: 0.85, transform: [{ scale: 0.97 }] },
  filterText: { color: theme.textSecondary, fontSize: typography.caption, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 0.5 },
  filterTextActive: { color: theme.textPrimary },
  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: 120, gap: spacing.md },
  gameCard: { borderRadius: radii.lg, overflow: 'hidden', minHeight: 160, position: 'relative' },
  gameCardHighlight: { borderWidth: 2, borderColor: theme.link },
  gameCardPressed: { opacity: 0.88, transform: [{ scale: 0.98 }] },
  gameBg: { position: 'absolute', width: '100%', height: '100%' },
  gameOverlay: { position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(11,15,26,0.72)' },
  gameContent: { flex: 1, padding: spacing.lg, justifyContent: 'space-between' },
  gameTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  gameTitle: { color: theme.textPrimary, fontSize: typography.title, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -0.3 },
  highlightBadge: { width: 8, height: 8, borderRadius: 4, backgroundColor: theme.link },
  gameSubtitle: { color: theme.textSecondary, fontSize: typography.caption, fontFamily: typography.fontFamily.regular, marginTop: 4 },
  gameBottomRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.md },
  gameModeBadge: { paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: radii.pill, backgroundColor: 'rgba(255,255,255,0.1)' },
  gameModeText: { color: theme.textSecondary, fontSize: typography.micro, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  gameStatsRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  gameStatsText: { color: theme.textSecondary, fontSize: typography.caption, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  gameStatsTextHighlight: { color: theme.link },
});
