import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Bell, CheckCheck, CircleDollarSign, Trophy, Users } from 'lucide-react-native';
import { colors, radius, spacing, typography } from '@/src/theme/tokens';
import { mockNotifications } from '@/src/services/mockData';
import { useAppStore } from '@/src/store/useAppStore';

const typeIcon = {
  match: Users,
  tournament: Trophy,
  wallet: CircleDollarSign,
  system: Bell,
};

export default function NotificationsScreen() {
  const readNotifications = useAppStore((s) => s.readNotifications);
  const markAllRead = useAppStore((s) => s.markAllNotificationsRead);
  const markRead = useAppStore((s) => s.markNotificationRead);

  const unreadCount = mockNotifications.filter((n) => !readNotifications.includes(n.id)).length;

  const handlePress = (id: string, type: string) => {
    markRead(id);
    if (type === 'match') router.push('/(tabs)/games');
    else if (type === 'tournament') router.push('/(tabs)/tournaments');
    else if (type === 'wallet') router.push('/(tabs)/wallet');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.eyebrow}>ACTUALITÉS</Text>
            <Text style={styles.title}>Notifications</Text>
          </View>
          {unreadCount > 0 && (
            <Pressable onPress={markAllRead} style={styles.markAllBtn}>
              <CheckCheck color={colors.accent} size={16} />
              <Text style={styles.markAllText}>Tout lire</Text>
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.list}>
        {mockNotifications.map((n, idx) => {
          const Icon = typeIcon[n.type];
          const isRead = readNotifications.includes(n.id);
          return (
            <Pressable key={n.id} onPress={() => handlePress(n.id, n.type)} style={({ pressed }) => pressed && styles.rowPressed}>
              <Animated.View
                entering={FadeInDown.delay(idx * 60).duration(250)}
                style={[styles.row, !isRead && styles.rowUnread]}
              >
                <View style={[styles.iconWrap, !isRead && styles.iconWrapUnread]}>
                  <Icon color={isRead ? colors.textSecondary : colors.textPrimary} size={18} />
                </View>
                <View style={styles.info}>
                  <Text style={styles.title2}>{n.title}</Text>
                  <Text style={styles.body}>{n.body}</Text>
                  <Text style={styles.date}>{new Date(n.createdAt).toLocaleDateString('fr-FR')}</Text>
                </View>
                {!isRead && <View style={styles.unreadDot} />}
              </Animated.View>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.lg, gap: spacing.xs },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  eyebrow: { color: colors.accent, fontSize: 10, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1.4 },
  title: { color: colors.textPrimary, fontSize: 26, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -0.5 },
  markAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,106,44,0.12)', paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: 999 },
  markAllText: { color: colors.accent, fontSize: 12, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  list: { padding: spacing.lg, gap: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md },
  rowUnread: { backgroundColor: 'rgba(26,63,228,0.12)' },
  rowPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  iconWrap: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: colors.background },
  iconWrapUnread: { backgroundColor: 'rgba(255,255,255,0.06)' },
  info: { flex: 1, gap: 4 },
  title2: { color: colors.textPrimary, fontSize: 15, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  body: { color: colors.textSecondary, fontSize: 13, lineHeight: 18, fontFamily: typography.fontFamily.regular },
  date: { color: colors.textSecondary, fontSize: 11, marginTop: 2, fontFamily: typography.fontFamily.regular },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent, marginTop: 6 },
});
