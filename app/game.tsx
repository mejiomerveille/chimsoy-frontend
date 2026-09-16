import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { BarChart3, ChevronLeft, CircleDot, Coins, Share2, Trophy, Users } from 'lucide-react-native';
import { colors, radii, spacing, typography, theme } from '@/src/theme/tokens';

import quizDuelBg from '../assets/images/quiz-duel.jpg';

const categories = ['Football Africain', 'Musique', 'Culture Générale', 'Actualité', 'Histoire', 'Et plus...'];

type GameMode = {
  title: string;
  mode: string;
  stake: string;
  selected?: boolean;
};

const modes: GameMode[] = [
  { title: 'Match Rapide', mode: '1vs1', stake: 'Sans enjeu' },
  { title: 'Match Classé', mode: '1vs1', stake: 'Avec enjeu', selected: true },
  { title: 'Tournoi', mode: 'Multi-joueurs', stake: 'Avec enjeu' },
];

export default function GameDetailScreen() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const [selectedMode, setSelectedMode] = useState(1);

  const gameName = gameId === 'math' ? 'CALCUL RAPIDE' : gameId === 'checkers' ? 'JEU DE DAME' : gameId === 'cards' ? 'JEU DE CARTE' : 'DUEL DE QUIZ';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.headerBtn}>
          <ChevronLeft color={theme.textPrimary} size={22} />
        </Pressable>
        <Pressable style={styles.headerBtn}>
          <Share2 color={theme.textPrimary} size={18} />
        </Pressable>
      </View>

      <Animated.ScrollView entering={FadeIn.duration(300)} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrap}>
          <Animated.Image source={quizDuelBg} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.gameTitle}>{gameName}</Text>
          <View style={styles.titleMetaRow}>
            <Text style={styles.competitiveLabel}>COMPÉTITIF</Text>
            <Text style={styles.modeLabel}>1vs1</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>JOUEURS</Text>
            <Text style={styles.statValue}>1 245</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>TAUX DE VICTOIRE</Text>
            <Text style={styles.statValue}>62%</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>PARTIES JOUÉES</Text>
            <Text style={styles.statValue}>3 456</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DESCRIPTION</Text>
          <Text style={styles.description}>
            Affronte un adversaire en répondant à des questions à choix multiples. 5 à 8 secondes par question. Le plus rapide et le plus juste gagne.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CATÉGORIES</Text>
          <View style={styles.categoriesRow}>
            {categories.map((cat, idx) => (
              <Animated.View key={cat} entering={FadeInDown.delay(idx * 40).duration(150)} style={styles.categoryPill}>
                <Text style={styles.categoryText}>{cat}</Text>
              </Animated.View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MODES DE JEU</Text>
          <View style={styles.modesList}>
            {modes.map((mode, idx) => {
              const isSelected = idx === selectedMode;
              return (
                <Pressable
                  key={mode.title}
                  onPress={() => setSelectedMode(idx)}
                  style={({ pressed }) => [styles.modeCard, isSelected && styles.modeCardSelected, pressed && styles.modeCardPressed]}
                >
                  <View style={styles.modeLeft}>
                    <Text style={styles.modeTitle}>{mode.title}</Text>
                    <Text style={styles.modeMode}>{mode.mode}</Text>
                    <Text style={styles.modeStake}>{mode.stake}</Text>
                  </View>
                  <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <View style={styles.infoTopRow}>
              <Coins color={theme.reward} size={16} />
              <Text style={styles.infoLabel}>MISE POSSIBLE</Text>
            </View>
            <Text style={styles.infoValue}>FCFA 100 - 10 000</Text>
          </View>
          <View style={styles.infoCard}>
            <View style={styles.infoTopRow}>
              <BarChart3 color={theme.link} size={16} />
              <Text style={styles.infoLabel}>NIVEAU RECOMMANDÉ</Text>
            </View>
            <Text style={styles.infoValue}>Débutant à Expert</Text>
          </View>
        </View>
      </Animated.ScrollView>

      <View style={styles.footer}>
        <Pressable
          onPress={() => router.push('/stake?gameId=quiz')}
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
        >
          <Text style={styles.ctaText}>JOUER</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingTop: spacing.sm },
  headerBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.surface, borderRadius: 22 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: 100, gap: spacing.lg },
  heroWrap: { borderRadius: radii.lg, overflow: 'hidden', height: 180 },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(11,15,26,0.4)' },
  titleSection: { gap: 8 },
  gameTitle: { color: theme.textPrimary, fontSize: typography.title, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -0.5 },
  titleMetaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  competitiveLabel: { color: theme.action, fontSize: typography.caption, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1 },
  modeLabel: { color: theme.textSecondary, fontSize: typography.caption, fontFamily: typography.fontFamily.regular },
  statsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.surface, borderRadius: radii.md, padding: spacing.md },
  statItem: { flex: 1, alignItems: 'center', gap: 4 },
  statDivider: { width: 1, height: 36, backgroundColor: theme.border },
  statLabel: { color: theme.textSecondary, fontSize: typography.micro, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 0.5, textAlign: 'center' },
  statValue: { color: theme.textPrimary, fontSize: typography.heading, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  section: { gap: spacing.sm },
  sectionTitle: { color: theme.textSecondary, fontSize: typography.micro, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1.4 },
  description: { color: theme.textPrimary, fontSize: typography.body, fontFamily: typography.fontFamily.regular, lineHeight: 22 },
  categoriesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  categoryPill: { paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: radii.pill, backgroundColor: theme.surface },
  categoryText: { color: theme.textPrimary, fontSize: typography.caption, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  modesList: { gap: spacing.sm },
  modeCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.surface, borderRadius: radii.md, padding: spacing.md, borderWidth: 2, borderColor: 'transparent' },
  modeCardSelected: { borderColor: theme.link },
  modeCardPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  modeLeft: { gap: 4 },
  modeTitle: { color: theme.textPrimary, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  modeMode: { color: theme.textSecondary, fontSize: typography.caption, fontFamily: typography.fontFamily.regular },
  modeStake: { color: theme.textSecondary, fontSize: typography.caption, fontFamily: typography.fontFamily.regular },
  radioOuter: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: theme.border, alignItems: 'center', justifyContent: 'center' },
  radioOuterSelected: { borderColor: theme.link },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: theme.link },
  infoRow: { flexDirection: 'row', gap: spacing.md },
  infoCard: { flex: 1, backgroundColor: theme.surface, borderRadius: radii.md, padding: spacing.md, gap: 6 },
  infoTopRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  infoLabel: { color: theme.textSecondary, fontSize: typography.micro, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 0.5 },
  infoValue: { color: theme.textPrimary, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, backgroundColor: theme.background },
  cta: { alignItems: 'center', justifyContent: 'center', backgroundColor: theme.action, borderRadius: radii.pill, paddingVertical: 16, minHeight: 54 },
  ctaPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  ctaText: { color: theme.textPrimary, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1 },
});
