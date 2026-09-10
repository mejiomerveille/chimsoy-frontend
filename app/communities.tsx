import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Brain, Check, Gamepad2, Users } from 'lucide-react-native';
import { Button, Card } from '@/src/components/ui';
import { colors, radius, spacing, typography } from '@/src/theme/tokens';
import { mockCommunities } from '@/src/services/mockData';
import { useAppStore } from '@/src/store/useAppStore';

export default function CommunitiesScreen() {
  const joinedCommunities = useAppStore((s) => s.joinedCommunities);
  const toggleCommunity = useAppStore((s) => s.toggleCommunity);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>COMMUNAUTÉS</Text>
        <Text style={styles.title}>Communautés</Text>
        <Text style={styles.subtitle}>Rejoins les groupes de joueurs près de chez toi.</Text>
      </View>

      <View style={styles.list}>
        {mockCommunities.map((c, idx) => {
          const isJoined = joinedCommunities.includes(c.id);
          return (
            <Animated.View key={c.id} entering={FadeInDown.delay(idx * 80).duration(300)}>
              <Card style={styles.communityCard}>
                <View style={styles.cardTop}>
                  <View style={styles.iconWrap}>
                    {c.icon === 'brain' ? <Brain color={colors.accent} size={22} /> : c.icon === 'gamepad' ? <Gamepad2 color={colors.accent} size={22} /> : <Users color={colors.accent} size={22} />}
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.name}>{c.name}</Text>
                    <Text style={styles.desc}>{c.description}</Text>
                    <View style={styles.metaRow}><Users color={colors.textSecondary} size={13} /><Text style={styles.meta}>{c.members.toLocaleString('fr-FR')} membres</Text></View>
                  </View>
                </View>
                <View style={styles.footer}>
                  {isJoined ? (
                    <View style={styles.joinedBadge}><Check color={colors.success} size={16} /><Text style={styles.joinedText}>Membre</Text></View>
                  ) : (
                    <Button label="Rejoindre" onPress={() => toggleCommunity(c.id)} />
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
  subtitle: { color: colors.textSecondary, fontSize: 14, fontFamily: typography.fontFamily.regular },
  list: { padding: spacing.lg, gap: spacing.md },
  communityCard: { gap: spacing.md },
  cardTop: { flexDirection: 'row', gap: spacing.md },
  iconWrap: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,106,44,0.12)', borderRadius: radius.md },
  cardInfo: { flex: 1, gap: 4 },
  name: { color: colors.textPrimary, fontSize: 17, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  desc: { color: colors.textSecondary, fontSize: 13, lineHeight: 18, fontFamily: typography.fontFamily.regular },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: 4 },
  meta: { color: colors.textSecondary, fontSize: 12, fontWeight: '500', fontFamily: typography.fontFamily.medium },
  footer: { flexDirection: 'row', justifyContent: 'flex-end' },
  joinedBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(31,174,94,0.15)', paddingHorizontal: spacing.md, paddingVertical: 10, borderRadius: 999 },
  joinedText: { color: colors.success, fontSize: 14, fontWeight: '700', fontFamily: typography.fontFamily.bold },
});
