import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, ChevronRight, Fingerprint, Globe, Lock, LogOut, Shield, User, Volume2 } from 'lucide-react-native';
import { colors, radius, spacing, typography } from '@/src/theme/tokens';
import { useAppStore } from '@/src/store/useAppStore';

export default function SettingsScreen() {
  const settings = useAppStore((s) => s.settings);
  const updateSettings = useAppStore((s) => s.updateSettings);
  const logout = useAppStore((s) => s.logout);

  const toggle = (key: 'notificationsEnabled' | 'soundEnabled' | 'biometricEnabled' | 'privateProfile') => {
    updateSettings({ [key]: !settings[key] } as never);
  };

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>CONFIGURATION</Text>
        <Text style={styles.title}>Paramètres</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>LANGUE</Text>
          <Pressable style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
            <Globe color={colors.textSecondary} size={18} />
            <Text style={styles.rowLabel}>Langue</Text>
            <Text style={styles.rowValue}>Français</Text>
            <ChevronRight color={colors.textSecondary} size={18} />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SÉCURITÉ</Text>
          <View style={styles.row}>
            <Fingerprint color={colors.textSecondary} size={18} />
            <Text style={styles.rowLabel}>Verrouillage biométrique</Text>
            <Switch value={settings.biometricEnabled} onValueChange={() => toggle('biometricEnabled')} trackColor={{ false: colors.surface, true: colors.accent }} />
          </View>
          <Pressable style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
            <Lock color={colors.textSecondary} size={18} />
            <Text style={styles.rowLabel}>Confidentialité</Text>
            <ChevronRight color={colors.textSecondary} size={18} />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>NOTIFICATIONS</Text>
          <View style={styles.row}>
            <Bell color={colors.textSecondary} size={18} />
            <Text style={styles.rowLabel}>Notifications</Text>
            <Switch value={settings.notificationsEnabled} onValueChange={() => toggle('notificationsEnabled')} trackColor={{ false: colors.surface, true: colors.accent }} />
          </View>
          <View style={styles.row}>
            <Volume2 color={colors.textSecondary} size={18} />
            <Text style={styles.rowLabel}>Sons</Text>
            <Switch value={settings.soundEnabled} onValueChange={() => toggle('soundEnabled')} trackColor={{ false: colors.surface, true: colors.accent }} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CONFIDENTIALITÉ</Text>
          <View style={styles.row}>
            <Shield color={colors.textSecondary} size={18} />
            <Text style={styles.rowLabel}>Profil privé</Text>
            <Switch value={settings.privateProfile} onValueChange={() => toggle('privateProfile')} trackColor={{ false: colors.surface, true: colors.accent }} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>COMPTE</Text>
          <Pressable style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
            <User color={colors.textSecondary} size={18} />
            <Text style={styles.rowLabel}>Mon compte</Text>
            <ChevronRight color={colors.textSecondary} size={18} />
          </Pressable>
          <Pressable onPress={handleLogout} style={({ pressed }) => [styles.row, styles.logoutRow, pressed && styles.rowPressed]}>
            <LogOut color={colors.danger} size={18} />
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.lg, gap: spacing.xs },
  eyebrow: { color: colors.accent, fontSize: 10, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1.4 },
  title: { color: colors.textPrimary, fontSize: 26, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -0.5 },
  content: { padding: spacing.lg, gap: spacing.lg },
  section: { gap: spacing.sm },
  sectionLabel: { color: colors.textSecondary, fontSize: 10, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, minHeight: 48 },
  rowPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  rowLabel: { flex: 1, color: colors.textPrimary, fontSize: 15, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  rowValue: { color: colors.textSecondary, fontSize: 14, fontWeight: '500', fontFamily: typography.fontFamily.medium },
  logoutRow: { marginTop: spacing.xs },
  logoutText: { flex: 1, color: colors.danger, fontSize: 15, fontWeight: '700', fontFamily: typography.fontFamily.bold },
});
