import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import userPiecture from '../../assets/images/kwame.jpg';

// 👇 remplace ces chemins par tes vraies images d'icônes (assets/icons/)
import BellIcon from '../../assets/images/kwame.jpg';
import ChevronRightIcon from '../../assets/images/kwame.jpg';
import CrownIcon from '../../assets/images/kwame.jpg';
import EyeIcon from '../../assets/images/kwame.jpg';
import NewspaperIcon from '../../assets/images/kwame.jpg';
import PencilIcon from '../../assets/images/kwame.jpg';
import SwordIcon from '../../assets/images/kwame.jpg';
import TrophyIcon from '../../assets/images/kwame.jpg';
import UsersIcon from '../../assets/images/kwame.jpg';
import WalletIcon from '../../assets/images/kwame.jpg';


// import BellIcon from '../../assets/icons/bell.png';
// import ChevronRightIcon from '../../assets/icons/chevron-right.png';
// import CrownIcon from '../../assets/icons/crown.png';
// import EyeIcon from '../../assets/icons/eye.png';
// import NewspaperIcon from '../../assets/icons/newspaper.png';
// import PencilIcon from '../../assets/icons/pencil.png';
// import SwordIcon from '../../assets/icons/sword.png';
// import TrophyIcon from '../../assets/icons/trophy.png';
// import UsersIcon from '../../assets/icons/users.png';
// import WalletIcon from '../../assets/icons/wallet.png';

import { colors, radii, spacing, typography, theme } from '@/src/theme/tokens';
import { mockUser } from '@/src/services/mockData';
import { useAppStore } from '@/src/store/useAppStore';

const actionTiles = [
  { icon: SwordIcon, title: 'DÉFIER', subtitle: 'Un ami' },
  { icon: TrophyIcon, title: 'TOURNOIS', subtitle: 'En cours' },
  { icon: CrownIcon, title: 'CLASSEMENTS', subtitle: 'Voir les tops' },
  { icon: UsersIcon, title: 'COMMUNAUTÉS', subtitle: 'Rejoindre' },
  { icon: WalletIcon, title: 'PORTEFEUILLE', subtitle: 'Dépôt / Retrait' },
  { icon: NewspaperIcon, title: 'ACTUALITÉS', subtitle: 'Chimsoy' },
];

export default function HomeScreen() {
  const user = mockUser;
  const walletBalance = useAppStore((s) => s.walletBalance);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.ScrollView entering={FadeIn.duration(400)} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.wordmark}>CHIMSOY</Text>
            <Text style={styles.tagline}>JOUE. DÉFIE. GAGNE.</Text>
          </View>
          <Link href="/notifications" style={styles.bellBtn}>
            <Image source={BellIcon} style={[styles.icon20, { tintColor: theme.textPrimary }]} />
            <View style={styles.bellBadge}>
              <Text style={styles.bellBadgeText}>1</Text>
            </View>
          </Link>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.profileLeft}>
            <Image source={userPiecture} style={styles.avatarImage} />
            <View style={styles.profileInfo}>
              <Text style={styles.pseudo}>{user.username}</Text>
              <View style={styles.rankBadge}>
                <Image source={TrophyIcon} style={[styles.icon12, { tintColor: theme.reward }]} />
                <Text style={styles.rankText}>Bronze II</Text>
              </View>
            </View>
          </View>
          <Pressable style={styles.editBtn}>
            <Image source={PencilIcon} style={[styles.icon16, { tintColor: theme.textPrimary }]} />
          </Pressable>
        </View>

        <View style={styles.walletCard}>
          <View>
            <Text style={styles.walletLabel}>SOLDE PORTEFEUILLE</Text>
            <View style={styles.walletAmountRow}>
              <Text style={styles.walletAmount}>FCFA {walletBalance.toLocaleString('fr-FR')}</Text>
              <Image source={EyeIcon} style={[styles.icon18, { tintColor: theme.textSecondary }]} />
            </View>
          </View>
          <Link href="/(tabs)/wallet" style={styles.walletPlusBtn}>
          </Link>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statTop}>
              <Image source={TrophyIcon} style={[styles.icon18, { tintColor: theme.reward }]} />
              <Text style={styles.statLabel}>TROPHÉES</Text>
              <Image source={ChevronRightIcon} style={[styles.icon16, styles.chevron, { tintColor: theme.textSecondary }]} />
            </View>
            <Text style={styles.statValue}>12</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statTop}>
              <Image source={CrownIcon} style={[styles.icon18, { tintColor: theme.success }]} />
              <Text style={styles.statLabel}>VICTOIRES</Text>
              <Image source={ChevronRightIcon} style={[styles.icon16, styles.chevron, { tintColor: theme.textSecondary }]} />
            </View>
            <Text style={styles.statValue}>48</Text>
          </View>
        </View>

        <Pressable
          onPress={() => router.push('/matchmaking?gameId=quiz')}
          style={({ pressed }) => [styles.playBtn, pressed && styles.playBtnPressed]}
        >
          <View>
            <Text style={styles.playBtnTitle}>JOUER</Text>
            <Text style={styles.playBtnSub}>Match rapide</Text>
          </View>
          <Image source={ChevronRightIcon} style={[styles.icon22, { tintColor: theme.textPrimary }]} />
        </Pressable>

        <View style={styles.actionGrid}>
          {actionTiles.map((tile, idx) => (
            <Animated.View key={tile.title} entering={FadeInDown.delay(idx * 50).duration(200)} style={styles.actionTile}>
              <View style={styles.actionIconWrap}>
                <Image source={tile.icon} style={[styles.icon22, { tintColor: theme.action }]} />
              </View>
              <Text style={styles.actionTitle}>{tile.title}</Text>
              <Text style={styles.actionSub}>{tile.subtitle}</Text>
            </Animated.View>
          ))}
        </View>

        <View style={styles.promoBanner}>
          <View style={styles.promoLeft}>
            <Text style={styles.promoTitle}>COUPE CHIMSOY</Text>
            <Text style={styles.promoTitle}>AFRICA</Text>
            <Text style={styles.promoYear}>2024</Text>
            <Text style={styles.promoSub}>Compétition continentale</Text>
            <Text style={styles.promoPrize}>+ FCFA 5 000 000 à gagner</Text>
          </View>
          <View style={styles.promoTrophy}>
            <Image source={TrophyIcon} style={[styles.icon48, { tintColor: theme.reward }]} />
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.background },
  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: 120, gap: spacing.md },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: spacing.sm },
  headerLeft: { gap: 2 },
  wordmark: { color: theme.textPrimary, fontSize: 24, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -0.5 },
  tagline: { color: theme.action, fontSize: typography.micro, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1.4 },
  bellBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.surface, borderRadius: 22, position: 'relative' },
  bellBadge: { position: 'absolute', top: 6, right: 6, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: theme.danger, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  bellBadgeText: { color: theme.textPrimary, fontSize: 10, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  profileCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.surface, borderRadius: radii.md, padding: spacing.md },
  profileLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatarImage: { width: 48, height: 48, borderRadius: 24 },
  profileInfo: { gap: 4 },
  pseudo: { color: theme.textPrimary, fontSize: typography.heading, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  rankBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(242,183,5,0.15)', paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radii.pill, alignSelf: 'flex-start' },
  rankText: { color: theme.reward, fontSize: typography.micro, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  editBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 18 },
  walletCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.surface, borderRadius: radii.md, padding: spacing.md },
  walletLabel: { color: theme.textSecondary, fontSize: typography.micro, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1 },
  walletAmountRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: 4 },
  walletAmount: { color: theme.textPrimary, fontSize: typography.heading, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  walletPlusBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.link, borderRadius: radii.sm },
  statsRow: { flexDirection: 'row', gap: spacing.md },
  statCard: { flex: 1, backgroundColor: theme.surface, borderRadius: radii.md, padding: spacing.md, gap: 6 },
  statTop: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statLabel: { color: theme.textSecondary, fontSize: typography.micro, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 0.5, flex: 1 },
  chevron: { marginLeft: 'auto' },
  statValue: { color: theme.textPrimary, fontSize: typography.title, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  playBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.action, borderRadius: radii.md, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, minHeight: 64 },
  playBtnPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  playBtnTitle: { color: theme.textPrimary, fontSize: typography.heading, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  playBtnSub: { color: theme.textPrimary, fontSize: typography.caption, fontFamily: typography.fontFamily.regular, opacity: 0.8 },
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  actionTile: { width: '31%', backgroundColor: theme.surface, borderRadius: radii.md, padding: spacing.md, gap: 6, alignItems: 'flex-start' },
  actionIconWrap: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,106,44,0.12)', borderRadius: radii.sm },
  actionTitle: { color: theme.textPrimary, fontSize: typography.caption, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 0.5 },
  actionSub: { color: theme.textSecondary, fontSize: typography.micro, fontFamily: typography.fontFamily.regular },
  promoBanner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.surface, borderRadius: radii.lg, padding: spacing.lg, minHeight: 140, overflow: 'hidden' },
  promoLeft: { flex: 1, gap: 2 },
  promoTitle: { color: theme.textPrimary, fontSize: typography.heading, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -0.3 },
  promoYear: { color: theme.action, fontSize: typography.heading, fontWeight: '700', fontFamily: typography.fontFamily.bold, marginTop: 2 },
  promoSub: { color: theme.textSecondary, fontSize: typography.caption, fontFamily: typography.fontFamily.regular, marginTop: 4 },
  promoPrize: { color: theme.action, fontSize: typography.caption, fontWeight: '700', fontFamily: typography.fontFamily.bold, marginTop: 4 },
  promoTrophy: { width: 72, height: 72, alignItems: 'center', justifyContent: 'center', borderRadius: 36, backgroundColor: 'rgba(242,183,5,0.12)' },

  // tailles d'icônes (remplacent les props size= de lucide)
  icon12: { width: 12, height: 12 },
  icon16: { width: 16, height: 16 },
  icon18: { width: 18, height: 18 },
  icon20: { width: 20, height: 20 },
  icon22: { width: 22, height: 22 },
  icon48: { width: 48, height: 48 },
});