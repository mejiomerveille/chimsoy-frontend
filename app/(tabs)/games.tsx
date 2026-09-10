import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Clock, Users } from 'lucide-react-native';
import { Badge } from '@/src/components/ui';
import { colors, radius, spacing, typography } from '@/src/theme/tokens';
import { mockGames } from '@/src/services/mockData';

export default function GamesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>TON ARÈNE</Text>
        <Text style={styles.title}>Choisis ton terrain</Text>
        <Text style={styles.subtitle}>Sélectionne un jeu et commence à jouer immédiatement.</Text>
      </View>

      <View style={styles.list}>
        {mockGames.map((game, idx) => (
          <Animated.View key={game.id} entering={FadeInDown.delay(idx * 80).duration(300)}>
            <Pressable
              onPress={() => router.push(`/matchmaking?gameId=${game.id}`)}
              style={({ pressed }) => pressed && styles.cardPressed}
            >
              <View style={styles.gameCard}>
                <View style={styles.gameImageWrap}>
                  <Image source={{ uri: game.image }} style={styles.gameImage} />
                  <View style={styles.gameImageOverlay} />
                  <View style={styles.gameTopRow}>
                    <Badge label={game.category.toUpperCase()} tone="surface" />
                    <Badge label={game.mode.toUpperCase()} tone={game.mode === '1v1' ? 'accent' : 'primary'} />
                  </View>
                  <View style={styles.gameNameOverlay}>
                    <Text style={styles.gameName}>{game.name}</Text>
                  </View>
                </View>
                <View style={styles.gameBody}>
                  <Text style={styles.gameDesc}>{game.description}</Text>
                  <View style={styles.gameFooter}>
                    <View style={styles.metaItem}>
                      <Clock color={colors.textSecondary} size={14} />
                      <Text style={styles.metaText}>{game.durationLabel}</Text>
                    </View>
                    <View style={styles.metaDot} />
                    <View style={styles.metaItem}>
                      <Users color={colors.textSecondary} size={14} />
                      <Text style={styles.metaText}>{game.playersOnline} en ligne</Text>
                    </View>
                    <View style={styles.playBtn}>
                      <Text style={styles.playBtnText}>Jouer</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          </Animated.View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.lg, gap: spacing.xs },
  eyebrow: { color: colors.accent, fontSize: 10, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1.4 },
  title: { color: colors.textPrimary, fontSize: 26, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -0.5 },
  subtitle: { color: colors.textSecondary, fontSize: 14, fontFamily: typography.fontFamily.regular },
  list: { padding: spacing.lg, gap: spacing.md },
  cardPressed: { opacity: 0.88, transform: [{ scale: 0.98 }] },
  gameCard: { borderRadius: radius.lg, overflow: 'hidden', backgroundColor: colors.surface },
  gameImageWrap: { height: 180, position: 'relative' },
  gameImage: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, resizeMode: 'cover' },
  gameImageOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11,15,26,0.45)' },
  gameTopRow: { position: 'absolute', top: spacing.sm, left: spacing.sm, right: spacing.sm, flexDirection: 'row', justifyContent: 'space-between' },
  gameNameOverlay: { position: 'absolute', bottom: spacing.md, left: spacing.md },
  gameName: { color: colors.textPrimary, fontSize: 22, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -0.5 },
  gameBody: { padding: spacing.md, gap: spacing.sm },
  gameDesc: { color: colors.textSecondary, fontSize: 14, lineHeight: 20, fontFamily: typography.fontFamily.regular },
  gameFooter: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: colors.textSecondary, fontSize: 12, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  metaDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: colors.textSecondary },
  playBtn: { marginLeft: 'auto', backgroundColor: colors.accent, paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: radius.full },
  playBtnText: { color: colors.background, fontSize: 13, fontWeight: '700', fontFamily: typography.fontFamily.bold },
});
