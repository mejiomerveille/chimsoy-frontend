import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ArrowDownToLine, ArrowDownUp, ArrowUpFromLine, Check, X } from 'lucide-react-native';
import { Button, Card } from '@/src/components/ui';
import { colors, radius, spacing, typography } from '@/src/theme/tokens';
import { mockWallet } from '@/src/services/mockData';
import { useAppStore } from '@/src/store/useAppStore';

export default function WalletScreen() {
  const walletBalance = useAppStore((s) => s.walletBalance);
  const addCoins = useAppStore((s) => s.addCoins);
  const [modalType, setModalType] = useState<'deposit' | 'withdraw' | null>(null);
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState(false);

  const handleConfirm = () => {
    const num = parseInt(amount, 10);
    if (!num || num <= 0) return;
    if (modalType === 'deposit') addCoins(num);
    else addCoins(-num);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setModalType(null);
      setAmount('');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>TON ARGENT</Text>
        <Text style={styles.title}>Portefeuille</Text>
      </View>

      <Card tone="primary" style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>SOLDE DISPONIBLE</Text>
        <Text style={styles.balanceValue}>{walletBalance.toLocaleString('fr-FR')} FCFA</Text>
        <View style={styles.actions}>
          <Pressable onPress={() => setModalType('deposit')} style={({ pressed }) => [styles.actionBtn, pressed && styles.actionPressed]}>
            <ArrowDownToLine color={colors.background} size={18} /><Text style={styles.actionLabel}>Déposer</Text>
          </Pressable>
          <Pressable onPress={() => setModalType('withdraw')} style={({ pressed }) => [styles.actionBtn, styles.actionBtnSecondary, pressed && styles.actionPressed]}>
            <ArrowUpFromLine color={colors.textPrimary} size={18} /><Text style={styles.actionLabelSecondary}>Retirer</Text>
          </Pressable>
        </View>
      </Card>

      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>Historique</Text>
        <ArrowDownUp color={colors.textSecondary} size={16} />
      </View>

      <View style={styles.history}>
        {mockWallet.transactions.map((tx, idx) => (
          <Animated.View key={tx.id} entering={FadeInDown.delay(idx * 60).duration(200)} style={styles.txRow}>
            <View style={[styles.txIcon, { backgroundColor: tx.amount >= 0 ? 'rgba(31,174,94,0.15)' : 'rgba(255,106,44,0.15)' }]}>
              {tx.amount >= 0 ? <ArrowDownToLine color={colors.success} size={16} /> : <ArrowUpFromLine color={colors.accent} size={16} />}
            </View>
            <View style={styles.txInfo}>
              <Text style={styles.txLabel}>{tx.label}</Text>
              <Text style={styles.txDate}>{new Date(tx.createdAt).toLocaleDateString('fr-FR')}</Text>
            </View>
            <Text style={[styles.txAmount, { color: tx.amount >= 0 ? colors.success : colors.accent }]}>
              {tx.amount >= 0 ? '+' : ''}{tx.amount.toLocaleString('fr-FR')} F
            </Text>
          </Animated.View>
        ))}
      </View>

      <Modal visible={modalType !== null} transparent animationType="fade" onRequestClose={() => setModalType(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {success ? (
              <View style={styles.successView}>
                <View style={styles.successIcon}><Check color={colors.success} size={32} /></View>
                <Text style={styles.successText}>{modalType === 'deposit' ? 'Dépôt réussi !' : 'Retrait réussi !'}</Text>
              </View>
            ) : (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{modalType === 'deposit' ? 'Déposer' : 'Retirer'}</Text>
                  <Pressable onPress={() => setModalType(null)} style={styles.modalClose}><X color={colors.textSecondary} size={20} /></Pressable>
                </View>
                <Text style={styles.modalLabel}>Montant en FCFA</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Ex: 2000"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                />
                <View style={styles.quickAmounts}>
                  {[1000, 2000, 5000].map((amt) => (
                    <Pressable key={amt} onPress={() => setAmount(String(amt))} style={styles.quickBtn}>
                      <Text style={styles.quickBtnText}>{amt.toLocaleString('fr-FR')}</Text>
                    </Pressable>
                  ))}
                </View>
                <Button label="Confirmer" fullWidth onPress={handleConfirm} disabled={!amount} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.lg, gap: spacing.xs },
  eyebrow: { color: colors.accent, fontSize: 10, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1.4 },
  title: { color: colors.textPrimary, fontSize: 26, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -0.5 },
  balanceCard: { margin: spacing.lg, gap: spacing.md },
  balanceLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1 },
  balanceValue: { color: '#fff', fontSize: 34, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -1 },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs, backgroundColor: colors.accent, borderRadius: radius.full, paddingVertical: 12, minHeight: 44 },
  actionBtnSecondary: { backgroundColor: colors.surface },
  actionPressed: { opacity: 0.8, transform: [{ scale: 0.97 }] },
  actionLabel: { color: colors.background, fontSize: 13, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  actionLabelSecondary: { color: colors.textPrimary, fontSize: 13, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  historyHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, marginTop: spacing.sm },
  historyTitle: { color: colors.textPrimary, fontSize: 18, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  history: { padding: spacing.lg, gap: spacing.sm },
  txRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md },
  txIcon: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20 },
  txInfo: { flex: 1 },
  txLabel: { color: colors.textPrimary, fontSize: 14, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  txDate: { color: colors.textSecondary, fontSize: 12, marginTop: 2, fontFamily: typography.fontFamily.regular },
  txAmount: { fontSize: 15, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: spacing.lg },
  modalCard: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, width: '100%', gap: spacing.md },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  modalTitle: { color: colors.textPrimary, fontSize: 20, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  modalClose: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 18, backgroundColor: colors.background },
  modalLabel: { color: colors.textSecondary, fontSize: 13, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  modalInput: { backgroundColor: colors.background, borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: 14, fontSize: 18, fontWeight: '700', fontFamily: typography.fontFamily.bold, color: colors.textPrimary },
  quickAmounts: { flexDirection: 'row', gap: spacing.sm },
  quickBtn: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: radius.sm, backgroundColor: 'rgba(255,106,44,0.12)' },
  quickBtnText: { color: colors.accent, fontSize: 13, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  successView: { alignItems: 'center', gap: spacing.md, paddingVertical: spacing.lg },
  successIcon: { width: 64, height: 64, alignItems: 'center', justifyContent: 'center', borderRadius: 32, backgroundColor: 'rgba(31,174,94,0.15)' },
  successText: { color: colors.textPrimary, fontSize: 18, fontWeight: '700', fontFamily: typography.fontFamily.bold },
});
