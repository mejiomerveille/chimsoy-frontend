import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { AlertTriangle, Brain, Calculator } from 'lucide-react-native';
import { colors, radii, spacing, typography, theme } from '@/src/theme/tokens';

const stakes = [
  { amount: 0, label: 'Entraînement', reward: 0 },
  { amount: 100, label: '100 FCFA', reward: 200 },
  { amount: 500, label: '500 FCFA', reward: 1000 },
  { amount: 1000, label: '1 000 FCFA', reward: 2000 },
  { amount: 5000, label: '5 000 FCFA', reward: 10000 },
];

export default function StakeSelectionScreen() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const [mode, setMode] = useState<'training' | 'money'>('training');
  const [selectedStake, setSelectedStake] = useState(0);

  const gameName = gameId === 'math' ? 'Calcul rapide' : 'Duel de Quiz';
  const GameIcon = gameId === 'math' ? Calculator : Brain;

  const handleContinue = () => {
    router.push(`/matchmaking?gameId=${gameId || 'quiz'}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.ScrollView entering={FadeIn.duration(400)} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.gameIconWrap}>
            <GameIcon color={theme.textPrimary} size={28} />
          </View>
          <Text style={styles.title}>{gameName}</Text>
        </View>

        <View style={styles.toggleRow}>
          <Pressable
            onPress={() => setMode('training')}
            style={({ pressed }) => [styles.toggleTab, mode === 'training' && styles.toggleActive, pressed && styles.togglePressed]}
          >
            <Text style={[styles.toggleText, mode === 'training' && styles.toggleTextActive]}>Entraînement</Text>
          </Pressable>
          <Pressable
            onPress={() => setMode('money')}
            style={({ pressed }) => [styles.toggleTab, mode === 'money' && styles.toggleMoneyActive, pressed && styles.togglePressed]}
          >
            <Text style={[styles.toggleText, mode === 'money' && styles.toggleTextActive]}>Argent réel</Text>
          </Pressable>
        </View>

        {mode === 'money' && (
          <Animated.View entering={FadeInDown.duration(300)} style={styles.warningBanner}>
            <AlertTriangle color={theme.money} size={16} />
            <Text style={styles.warningText}>Cette partie engage de l'argent réel. Joue de manière responsable.</Text>
          </Animated.View>
        )}

        <View style={styles.stakeList}>
          {stakes.filter((s) => mode === 'training' ? s.amount === 0 : s.amount > 0).map((stake, idx) => {
            const isSelected = selectedStake === stake.amount;
            return (
              <Animated.View key={stake.amount} entering={FadeInDown.delay(idx * 60).duration(200)}>
                <Pressable
                  onPress={() => setSelectedStake(stake.amount)}
                  style={({ pressed }) => [styles.stakeCard, isSelected && styles.stakeCardSelected, pressed && styles.stakeCardPressed]}
                >
                  <Text style={styles.stakeAmount}>{stake.label}</Text>
                  {stake.reward > 0 && (
                    <Text style={styles.stakeReward}>Gain potentiel : {stake.reward.toLocaleString('fr-FR')} FCFA</Text>
                  )}
                </Pressable>
              </Animated.View>
            );
          })}
        </View>

        <Pressable
          onPress={handleContinue}
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
        >
          <Text style={styles.ctaText}>CONTINUER</Text>
        </Pressable>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.background },
  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: 120, gap: spacing.lg },
  header: { alignItems: 'center', gap: spacing.sm, paddingTop: spacing.lg },
  gameIconWrap: { width: 56, height: 56, alignItems: 'center', justifyContent: 'center', borderRadius: 28, backgroundColor: theme.surface },
  title: { color: colors.white, fontSize: typography.title, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -0.5 },
  toggleRow: { flexDirection: 'row', gap: spacing.sm },
  toggleTab: { flex: 1, alignItems: 'center', paddingVertical: 14, borderRadius: radii.pill, backgroundColor: theme.surface },
  toggleActive: { backgroundColor: theme.surface },
  toggleMoneyActive: { backgroundColor: theme.money },
  togglePressed: { opacity: 0.85, transform: [{ scale: 0.97 }] },
  toggleText: { color: theme.textSecondary, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  toggleTextActive: { color: theme.textPrimary },
  warningBanner: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: theme.moneySoft, borderRadius: radii.md, padding: spacing.md },
  warningText: { flex: 1, color: theme.money, fontSize: typography.caption, fontFamily: typography.fontFamily.regular, lineHeight: 18 },
  stakeList: { gap: spacing.sm },
  stakeCard: { backgroundColor: theme.surface, borderRadius: radii.md, padding: spacing.lg, borderWidth: 2, borderColor: theme.border, gap: 4 },
  stakeCardSelected: { borderColor: theme.money },
  stakeCardPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  stakeAmount: { color: theme.textPrimary, fontSize: typography.heading, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  stakeReward: { color: theme.reward, fontSize: typography.caption, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  cta: { alignItems: 'center', justifyContent: 'center', backgroundColor: theme.action, borderRadius: radii.pill, paddingVertical: 16, minHeight: 54 },
  ctaPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  ctaText: { color: theme.textPrimary, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1 },
});
