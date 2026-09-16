import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ArrowDownToLine, ArrowUpFromLine, Trophy, Zap } from 'lucide-react-native';
import { colors, radii, spacing, typography, theme } from '@/src/theme/tokens';
import { mockWallet } from '@/src/services/mockData';
import { useAppStore } from '@/src/store/useAppStore';

type Tab = 'deposit' | 'withdraw' | 'history';

export default function WalletScreen() {
  const walletBalance = useAppStore((s) => s.walletBalance);
  const addCoins = useAppStore((s) => s.addCoins);
  const [activeTab, setActiveTab] = useState<Tab>('deposit');
  const [amount, setAmount] = useState('');

  const handleConfirm = () => {
    const num = parseInt(amount, 10);
    if (!num || num <= 0) return;
    if (activeTab === 'deposit') addCoins(num);
    else addCoins(-num);
    setAmount('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.ScrollView entering={FadeInDown.duration(300)} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Portefeuille</Text>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Solde disponible</Text>
          <Text style={styles.balanceValue}>{walletBalance.toLocaleString('fr-FR')} FCFA</Text>
        </View>

        <View style={styles.tabsRow}>
          {(['deposit', 'withdraw', 'history'] as Tab[]).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={({ pressed }) => [styles.tab, activeTab === tab && styles.tabActive, pressed && styles.tabPressed]}
            >
              <Text style={[styles.tabText, activeTab === tab ? styles.tabTextActive : styles.tabTextInactive]}>
                {tab === 'deposit' ? 'DÉPÔT' : tab === 'withdraw' ? 'RETRAIT' : 'HISTORIQUE'}
              </Text>
            </Pressable>
          ))}
        </View>

        {activeTab === 'deposit' && (
          <View style={styles.formSection}>
            <Text style={styles.formLabel}>Montant à déposer (FCFA)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 2000"
              placeholderTextColor={theme.textSecondary}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <View style={styles.quickAmounts}>
              {[1000, 2000, 5000].map((amt) => (
                <Pressable key={amt} onPress={() => setAmount(String(amt))} style={({ pressed }) => [styles.quickBtn, pressed && styles.quickBtnPressed]}>
                  <Text style={styles.quickBtnText}>{amt.toLocaleString('fr-FR')}</Text>
                </Pressable>
              ))}
            </View>
            <Pressable onPress={handleConfirm} style={({ pressed }) => [styles.confirmBtn, pressed && styles.confirmBtnPressed]}>
              <Text style={styles.confirmBtnText}>Confirmer le dépôt</Text>
            </Pressable>
          </View>
        )}

        {activeTab === 'withdraw' && (
          <View style={styles.formSection}>
            <Text style={styles.formLabel}>Montant à retirer (FCFA)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 1000"
              placeholderTextColor={theme.textSecondary}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <View style={styles.quickAmounts}>
              {[500, 1000, 2000].map((amt) => (
                <Pressable key={amt} onPress={() => setAmount(String(amt))} style={({ pressed }) => [styles.quickBtn, pressed && styles.quickBtnPressed]}>
                  <Text style={styles.quickBtnText}>{amt.toLocaleString('fr-FR')}</Text>
                </Pressable>
              ))}
            </View>
            <Pressable onPress={handleConfirm} style={({ pressed }) => [styles.confirmBtn, { backgroundColor: theme.money }, pressed && styles.confirmBtnPressed]}>
              <Text style={styles.confirmBtnText}>Confirmer le retrait</Text>
            </Pressable>
          </View>
        )}

        {activeTab === 'history' && (
          <View style={styles.historyList}>
            <Text style={styles.historyTitle}>Transactions récentes</Text>
            {mockWallet.transactions.map((tx, idx) => (
              <Animated.View key={tx.id} entering={FadeInDown.delay(idx * 60).duration(200)} style={styles.txRow}>
                <View style={[styles.txIcon, { backgroundColor: tx.amount >= 0 ? 'rgba(31,174,94,0.15)' : 'rgba(225,59,59,0.15)' }]}>
                  {tx.type === 'win' ? <Trophy color={theme.success} size={16} /> :
                   tx.type === 'deposit' ? <ArrowDownToLine color={theme.success} size={16} /> :
                   tx.type === 'withdrawal' ? <ArrowUpFromLine color={theme.reward} size={16} /> :
                   <Zap color={theme.danger} size={16} />}
                </View>
                <View style={styles.txInfo}>
                  <Text style={styles.txLabel}>{tx.label}</Text>
                  <Text style={styles.txDate}>{new Date(tx.createdAt).toLocaleDateString('fr-FR')}</Text>
                </View>
                <Text style={[styles.txAmount, { color: tx.amount >= 0 ? theme.success : theme.danger }]}>
                  {tx.amount >= 0 ? '+' : ''}{tx.amount.toLocaleString('fr-FR')} F
                </Text>
              </Animated.View>
            ))}
          </View>
        )}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.background },
  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: 120, gap: spacing.lg },
  title: { color: theme.textPrimary, fontSize: typography.title, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -0.5, paddingTop: spacing.sm },
  balanceCard: { backgroundColor: theme.surface, borderRadius: radii.lg, padding: spacing.lg, gap: spacing.xs },
  balanceLabel: { color: theme.textSecondary, fontSize: typography.caption, fontFamily: typography.fontFamily.regular },
  balanceValue: { color: theme.reward, fontSize: typography.display, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -1 },
  tabsRow: { flexDirection: 'row', gap: spacing.sm },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 12, borderRadius: radii.pill, backgroundColor: theme.surface },
  tabActive: { backgroundColor: theme.link },
  tabPressed: { opacity: 0.85, transform: [{ scale: 0.97 }] },
  tabText: { fontSize: typography.caption, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 0.5 },
  tabTextActive: { color: theme.textPrimary },
  tabTextInactive: { color: theme.textSecondary },
  formSection: { gap: spacing.md },
  formLabel: { color: theme.textSecondary, fontSize: typography.caption, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  input: { backgroundColor: theme.surface, borderRadius: radii.md, paddingHorizontal: spacing.lg, paddingVertical: 16, fontSize: typography.heading, fontWeight: '700', fontFamily: typography.fontFamily.bold, color: theme.textPrimary },
  quickAmounts: { flexDirection: 'row', gap: spacing.sm },
  quickBtn: { flex: 1, alignItems: 'center', paddingVertical: 12, borderRadius: radii.md, backgroundColor: 'rgba(255,106,44,0.12)' },
  quickBtnPressed: { opacity: 0.8, transform: [{ scale: 0.96 }] },
  quickBtnText: { color: theme.action, fontSize: typography.caption, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  confirmBtn: { alignItems: 'center', justifyContent: 'center', backgroundColor: theme.action, borderRadius: radii.pill, paddingVertical: 16, minHeight: 54 },
  confirmBtnPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  confirmBtnText: { color: theme.textPrimary, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  historyList: { gap: spacing.sm },
  historyTitle: { color: theme.textPrimary, fontSize: typography.heading, fontWeight: '700', fontFamily: typography.fontFamily.bold, marginBottom: spacing.xs },
  txRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: theme.surface, borderRadius: radii.md, padding: spacing.md },
  txIcon: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20 },
  txInfo: { flex: 1 },
  txLabel: { color: theme.textPrimary, fontSize: typography.body, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  txDate: { color: theme.textSecondary, fontSize: typography.micro, fontFamily: typography.fontFamily.regular, marginTop: 2 },
  txAmount: { fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold },
});
