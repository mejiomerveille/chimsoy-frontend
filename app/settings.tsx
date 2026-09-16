import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, ChevronRight, Fingerprint, Globe, Lock, LogOut, Shield, User, Volume2 } from 'lucide-react-native';
import { colors, radii, spacing, typography , theme} from '@/src/theme/tokens';
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
            <Globe color={theme.textSecondary} size={18} />
            <Text style={styles.rowLabel}>Langue</Text>
            <Text style={styles.rowValue}>Français</Text>
            <ChevronRight color={theme.textSecondary} size={18} />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SÉCURITÉ</Text>
          <View style={styles.row}>
            <Fingerprint color={theme.textSecondary} size={18} />
            <Text style={styles.rowLabel}>Verrouillage biométrique</Text>
            <Switch value={settings.biometricEnabled} onValueChange={() => toggle('biometricEnabled')} trackColor={{ false: theme.surface, true: theme.action }} />
          </View>
          <Pressable style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
            <Lock color={theme.textSecondary} size={18} />
            <Text style={styles.rowLabel}>Confidentialité</Text>
            <ChevronRight color={theme.textSecondary} size={18} />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>NOTIFICATIONS</Text>
          <View style={styles.row}>
            <Bell color={theme.textSecondary} size={18} />
            <Text style={styles.rowLabel}>Notifications</Text>
            <Switch value={settings.notificationsEnabled} onValueChange={() => toggle('notificationsEnabled')} trackColor={{ false: theme.surface, true: theme.action }} />
          </View>
          <View style={styles.row}>
            <Volume2 color={theme.textSecondary} size={18} />
            <Text style={styles.rowLabel}>Sons</Text>
            <Switch value={settings.soundEnabled} onValueChange={() => toggle('soundEnabled')} trackColor={{ false: theme.surface, true: theme.action }} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CONFIDENTIALITÉ</Text>
          <View style={styles.row}>
            <Shield color={theme.textSecondary} size={18} />
            <Text style={styles.rowLabel}>Profil privé</Text>
            <Switch value={settings.privateProfile} onValueChange={() => toggle('privateProfile')} trackColor={{ false: theme.surface, true: theme.action }} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>COMPTE</Text>
          <Pressable style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
            <User color={theme.textSecondary} size={18} />
            <Text style={styles.rowLabel}>Mon compte</Text>
            <ChevronRight color={theme.textSecondary} size={18} />
          </Pressable>
          <Pressable onPress={handleLogout} style={({ pressed }) => [styles.row, styles.logoutRow, pressed && styles.rowPressed]}>
            <LogOut color={theme.danger} size={18} />
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.background },
  header: { padding: spacing.lg, gap: spacing.xs },
  eyebrow: { color: theme.action, fontSize: 10, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1.4 },
  title: { color: theme.textPrimary, fontSize: 26, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -0.5 },
  content: { padding: spacing.lg, gap: spacing.lg },
  section: { gap: spacing.sm },
  sectionLabel: { color: theme.textSecondary, fontSize: 10, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: theme.surface, borderRadius: radii.md, padding: spacing.md, minHeight: 48 },
  rowPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  rowLabel: { flex: 1, color: theme.textPrimary, fontSize: 15, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  rowValue: { color: theme.textSecondary, fontSize: 14, fontWeight: '500', fontFamily: typography.fontFamily.medium },
  logoutRow: { marginTop: spacing.xs },
  logoutText: { flex: 1, color: theme.danger, fontSize: 15, fontWeight: '700', fontFamily: typography.fontFamily.bold },
});
