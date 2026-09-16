import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Calendar, Camera, Check, ChevronDown, MapPin, User } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, radii, spacing, typography, shadows, theme } from '@/src/theme/tokens';
import { useAppStore } from '@/src/store/useAppStore';

const countries = ['Cameroun', "Côte d'Ivoire", 'Sénégal', 'Nigeria', 'Ghana', 'Kenya'];
const citiesByCountry: Record<string, string[]> = {
  'Cameroun': ['Douala', 'Yaoundé', 'Bafoussam', 'Bamenda', 'Garoua', 'Maroua'],
  "Côte d'Ivoire": ['Abidjan', 'Bouaké', 'Yamoussoukro', 'San-Pédro'],
  'Sénégal': ['Dakar', 'Thiès', 'Saint-Louis', 'Touba'],
  'Nigeria': ['Lagos', 'Abuja', 'Kano', 'Ibadan'],
  'Ghana': ['Accra', 'Kumasi', 'Tamale', 'Takoradi'],
  'Kenya': ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru'],
};
const languages = ['Français', 'English'];

export default function CreateProfileScreen() {
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const [avatarEmoji, setAvatarEmoji] = useState('🦁');
  const [pseudo, setPseudo] = useState('');
  const [country, setCountry] = useState('Cameroun');
  const [city, setCity] = useState('Douala');
  const [language, setLanguage] = useState('Français');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pseudoValid, setPseudoValid] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);

  const availableCities = citiesByCountry[country] || [];

  const handlePseudoChange = (value: string) => {
    setPseudo(value);
    setPseudoValid(value.length >= 3 && /^[a-zA-Z0-9_]+$/.test(value));
  };

  const handleSubmit = () => {
    if (!pseudoValid) return;
    setAuthenticated({
      id: 'u_001',
      phone: '+237 6 90 00 00 00',
      username: pseudo,
      level: 1,
      rankLabel: 'Débutant',
      points: 0,
      city,
      country,
      avatarInitials: avatarEmoji,
      badges: [],
      stats: { gamesPlayed: 0, wins: 0, losses: 0, winRate: 0, bestStreak: 0, currentStreak: 0 },
    });
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
            <Text style={styles.eyebrow}>CRÉATION DE PROFIL</Text>
            <Text style={styles.title}>Configure ton profil</Text>
            <Text style={styles.subtitle}>Ces informations seront visibles par tes adversaires</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.avatarSection}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatar}>
                <Text style={styles.avatarEmoji}>{avatarEmoji}</Text>
              </View>
              <Pressable style={styles.cameraBadge}>
                <Camera color={colors.white} size={16} />
              </Pressable>
            </View>
          </Animated.View>

          <View style={styles.emojiRow}>
            {['🦁', '🦅', '🐆', '🐘', '🦓', '🐊'].map((emoji) => (
              <Pressable
                key={emoji}
                onPress={() => setAvatarEmoji(emoji)}
                style={({ pressed }) => [styles.emojiOption, avatarEmoji === emoji && styles.emojiOptionSelected, pressed && styles.emojiPressed]}
              >
                <Text style={styles.emojiText}>{emoji}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.fields}>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Pseudo</Text>
              <View style={styles.inputWrap}>
                <User color={theme.textSecondary} size={18} />
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Leo237"
                  placeholderTextColor={theme.textSecondary}
                  value={pseudo}
                  onChangeText={handlePseudoChange}
                />
                {pseudoValid && <Check color={colors.mintDeep} size={18} strokeWidth={3} />}
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Pays</Text>
              <Pressable onPress={() => setShowCountryPicker(!showCountryPicker)} style={styles.inputWrap}>
                <MapPin color={theme.textSecondary} size={18} />
                <Text style={styles.pickerValue}>{country}</Text>
                <ChevronDown color={theme.textSecondary} size={18} />
              </Pressable>
              {showCountryPicker && (
                <View style={styles.dropdown}>
                  {countries.map((c) => (
                    <Pressable key={c} onPress={() => { setCountry(c); setCity(citiesByCountry[c][0]); setShowCountryPicker(false); }} style={styles.dropdownItem}>
                      <Text style={[styles.dropdownText, c === country && styles.dropdownTextActive]}>{c}</Text>
                      {c === country && <Check color={colors.mintDeep} size={16} />}
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Ville</Text>
              <Pressable onPress={() => setShowCityPicker(!showCityPicker)} style={styles.inputWrap}>
                <MapPin color={theme.textSecondary} size={18} />
                <Text style={styles.pickerValue}>{city}</Text>
                <ChevronDown color={theme.textSecondary} size={18} />
              </Pressable>
              {showCityPicker && (
                <View style={styles.dropdown}>
                  {availableCities.map((c) => (
                    <Pressable key={c} onPress={() => { setCity(c); setShowCityPicker(false); }} style={styles.dropdownItem}>
                      <Text style={[styles.dropdownText, c === city && styles.dropdownTextActive]}>{c}</Text>
                      {c === city && <Check color={colors.mintDeep} size={16} />}
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Langue</Text>
              <Pressable onPress={() => setShowLangPicker(!showLangPicker)} style={styles.inputWrap}>
                <Text style={styles.pickerValue}>{language}</Text>
                <ChevronDown color={theme.textSecondary} size={18} />
              </Pressable>
              {showLangPicker && (
                <View style={styles.dropdown}>
                  {languages.map((l) => (
                    <Pressable key={l} onPress={() => { setLanguage(l); setShowLangPicker(false); }} style={styles.dropdownItem}>
                      <Text style={[styles.dropdownText, l === language && styles.dropdownTextActive]}>{l}</Text>
                      {l === language && <Check color={colors.mintDeep} size={16} />}
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Date de naissance</Text>
              <Pressable onPress={() => setShowDatePicker(true)} style={styles.inputWrap}>
                <Calendar color={colors.inkMuted} size={18} />
                <Text style={[styles.input, !birthDate && styles.inputPlaceholder]}>
                  {birthDate ? birthDate.toLocaleDateString('fr-FR') : 'JJ/MM/AAAA'}
                </Text>
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  value={birthDate || new Date(2000, 0, 1)}
                  mode="date"
                  display="default"
                  maximumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (event.type === 'set' && selectedDate) setBirthDate(selectedDate);
                  }}
                />
              )}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable
            onPress={handleSubmit}
            disabled={!pseudoValid}
            style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed, !pseudoValid && styles.ctaDisabled]}
          >
            <Text style={styles.ctaText}>CRÉER MON PROFIL</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ink },
  safe: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: 100, gap: spacing.lg },
  header: { alignItems: 'center', paddingTop: spacing.lg, gap: spacing.xs },
  eyebrow: { color: colors.orange, fontSize: typography.micro, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1.4 },
  title: { color: colors.white, fontSize: typography.title, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: -0.5, textAlign: 'center' },
  subtitle: { color: colors.inkMuted, fontSize: typography.caption, fontFamily: typography.fontFamily.regular, textAlign: 'center' },
  avatarSection: { alignItems: 'center', marginVertical: spacing.md },
  avatarWrap: { position: 'relative' },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.inkSoft, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.orange },
  avatarEmoji: { fontSize: 44 },
  cameraBadge: { position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderRadius: 16, backgroundColor: colors.orange, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: colors.ink },
  emojiRow: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm },
  emojiOption: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.inkSoft, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'transparent' },
  emojiOptionSelected: { borderColor: colors.orange, backgroundColor: colors.orangeSoft },
  emojiPressed: { opacity: 0.8, transform: [{ scale: 0.95 }] },
  emojiText: { fontSize: 24 },
  fields: { gap: spacing.md },
  field: { gap: spacing.xs },
  fieldLabel: { color: colors.inkMuted, fontSize: typography.caption, fontWeight: '600', fontFamily: typography.fontFamily.semiBold },
  inputWrap: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.inkSoft, borderRadius: radii.md, paddingHorizontal: spacing.md, minHeight: 54, borderWidth: 1, borderColor: colors.line },
  input: { flex: 1, color: colors.white, fontSize: 15, fontWeight: '500', fontFamily: typography.fontFamily.medium },
  inputPlaceholder: { color: theme.textSecondary },
  pickerValue: { flex: 1, color: colors.white, fontSize: 15, fontWeight: '500', fontFamily: typography.fontFamily.medium },
  dropdown: { backgroundColor: colors.inkSoft, borderRadius: radii.md, borderWidth: 1, borderColor: colors.line, marginTop: 4, overflow: 'hidden' },
  dropdownItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingVertical: 12 },
  dropdownText: { color: colors.white, fontSize: typography.caption, fontFamily: typography.fontFamily.regular },
  dropdownTextActive: { fontWeight: '700', fontFamily: typography.fontFamily.bold },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, ...shadows.card, backgroundColor: colors.ink },
  cta: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.orange, borderRadius: radii.pill, paddingVertical: 16, minHeight: 54 },
  ctaPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  ctaDisabled: { opacity: 0.4 },
  ctaText: { color: colors.white, fontSize: typography.body, fontWeight: '700', fontFamily: typography.fontFamily.bold, letterSpacing: 1 },
});
