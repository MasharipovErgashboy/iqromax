import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Switch, Alert, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SHADOWS } from '../../constants/theme.js';
import {
  ArrowLeft, Globe, Moon, Sun, Palette, Trash2,
  Download, Info, ChevronRight, RefreshCw,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext.js';

const AppSettingsScreen = ({ navigation }) => {
  const { isDark, theme, toggleTheme } = useTheme();
  const [autoDownload, setAutoDownload] = useState(true);
  const [lang, setLang] = useState('uz');

  const langs = [
    { key: 'uz', label: "O'zbek", flag: '🇺🇿' },
    { key: 'ru', label: "Русский", flag: '🇷🇺' },
    { key: 'en', label: "English", flag: '🇬🇧' },
  ];

  const dangerActions = [
    { icon: RefreshCw, label: "Keshni tozalash", desc: "Vaqtinchalik fayllarni o'chirish", action: () => Alert.alert("Tozalandi ✅", "Kesh muvaffaqiyatli tozalandi") },
    { icon: Trash2, label: "Hisobni o'chirish", desc: "Barcha ma'lumotlar yo'qoladi", danger: true, action: () => Alert.alert("Diqqat!", "Bu amalni bekor qilib bo'lmaydi. Davom etasizmi?", [{ text: "Bekor", style: 'cancel' }, { text: "O'chirish", style: 'destructive' }]) },
  ];

  return (
    <View style={[s.root, { backgroundColor: theme.background }]}>
      <LinearGradient colors={isDark ? ['#020617', '#0F172A'] : ['#0F172A', '#1E293B']} style={s.hero}>
        <SafeAreaView>
          <View style={s.topNav}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
              <ArrowLeft color="rgba(255,255,255,0.85)" size={22} />
            </TouchableOpacity>
            <Text style={s.heroTitle}>Sozlamalar</Text>
            <View style={{ width: 44 }} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.body}>
        {/* Appearance */}
        <Text style={[s.sectionLabel, { color: theme.textSecondary }]}>TASHQI KO'RINISH</Text>
        <View style={[s.card, { backgroundColor: theme.card }]}>
          <View style={s.cardRow}>
            <View style={[s.cardIcon, { backgroundColor: isDark ? 'rgba(99, 102, 241, 0.15)' : '#EEF2FF' }]}>
              {isDark ? <Moon color="#818CF8" size={20} /> : <Sun color="#F59E0B" size={20} />}
            </View>
            <View style={s.cardBody}>
              <Text style={[s.cardLabel, { color: theme.text }]}>Tungi rejim</Text>
              <Text style={s.cardDesc}>{isDark ? "Yoqilgan" : "O'chirilgan"}</Text>
            </View>
            <Switch 
              value={isDark} 
              onValueChange={toggleTheme} 
              trackColor={{ false: '#E2E8F0', true: '#6366F1' + '80' }} 
              thumbColor={isDark ? '#818CF8' : '#CBD5E1'} 
            />
          </View>
        </View>

        {/* Language */}
        <Text style={[s.sectionLabel, { color: theme.textSecondary }]}>TIL</Text>
        <View style={s.langRow}>
          {langs.map(l => (
            <TouchableOpacity
              key={l.key}
              style={[
                s.langCard, 
                { backgroundColor: theme.card },
                lang === l.key && (isDark ? { borderColor: theme.accent + '80', backgroundColor: 'rgba(251, 146, 60, 0.05)' } : s.langCardActive)
              ]}
              onPress={() => setLang(l.key)}
            >
              <Text style={s.langFlag}>{l.flag}</Text>
              <Text style={[s.langLabel, { color: isDark ? theme.textSecondary : COLORS.gray[500] }, lang === l.key && s.langLabelActive]}>{l.label}</Text>
              {lang === l.key && <View style={s.langDot} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Data */}
        <Text style={[s.sectionLabel, { color: theme.textSecondary }]}>MA'LUMOTLAR</Text>
        <View style={[s.card, { backgroundColor: theme.card }]}>
          <View style={s.cardRow}>
            <View style={[s.cardIcon, { backgroundColor: isDark ? 'rgba(14, 165, 233, 0.15)' : '#F0F9FF' }]}>
              <Download color={isDark ? '#38BDF8' : '#0EA5E9'} size={20} />
            </View>
            <View style={s.cardBody}>
              <Text style={[s.cardLabel, { color: theme.text }]}>Avtomatik yuklab olish</Text>
              <Text style={s.cardDesc}>Dars materiallari Wi-Fi orqali</Text>
            </View>
            <Switch value={autoDownload} onValueChange={setAutoDownload} trackColor={{ false: '#E2E8F0', true: '#0EA5E9' + '80' }} thumbColor={autoDownload ? '#0EA5E9' : '#CBD5E1'} />
          </View>
        </View>

        {/* Danger zone */}
        <Text style={[s.sectionLabel, { color: theme.textSecondary }]}>XAVFLI ZONA</Text>
        {dangerActions.map((item, i) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity 
              key={i} 
              style={[
                s.dangerCard, 
                { backgroundColor: theme.card },
                item.danger && (isDark ? { borderColor: '#7F1D1D', borderWidth: 1 } : s.dangerCardRed)
              ]} 
              onPress={item.action}
            >
              <View style={[s.dangerIcon, { backgroundColor: item.danger ? (isDark ? 'rgba(239, 68, 68, 0.1)' : '#FEF2F2') : (isDark ? 'rgba(255,255,255,0.05)' : '#F8FAFC') }]}>
                <Icon color={item.danger ? '#EF4444' : COLORS.gray[400]} size={20} />
              </View>
              <View style={s.cardBody}>
                <Text style={[s.cardLabel, { color: item.danger ? '#EF4444' : theme.text }]}>{item.label}</Text>
                <Text style={s.cardDesc}>{item.desc}</Text>
              </View>
              <ChevronRight color={COLORS.gray[300]} size={18} />
            </TouchableOpacity>
          );
        })}

        {/* App info */}
        <View style={s.infoCard}>
          <Info color={COLORS.gray[300]} size={18} />
          <View>
            <Text style={s.infoText}>IQROMAX v1.3.0</Text>
            <Text style={s.infoSub}>© 2026 IQROMAX Educational System</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F1F5F9' },
  hero: { paddingBottom: 16 },
  topNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: Platform.OS === 'ios' ? 4 : 18, paddingBottom: 10 },
  backBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  heroTitle: { color: COLORS.white, fontSize: 18, fontWeight: '900' },

  body: { paddingHorizontal: 18, paddingBottom: 48 },
  sectionLabel: { fontSize: 11, fontWeight: '800', color: COLORS.gray[400], letterSpacing: 1, marginBottom: 14, marginTop: 24, paddingLeft: 4 },

  card: { backgroundColor: COLORS.white, borderRadius: 24, overflow: 'hidden', ...SHADOWS.light },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 18 },
  cardIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  cardBody: { flex: 1 },
  cardLabel: { fontSize: 15, fontWeight: '800', color: '#1E293B' },
  cardDesc: { fontSize: 12, color: COLORS.gray[400], fontWeight: '500', marginTop: 2 },

  langRow: { flexDirection: 'row', gap: 10 },
  langCard: { flex: 1, backgroundColor: COLORS.white, borderRadius: 22, padding: 16, alignItems: 'center', ...SHADOWS.light, borderWidth: 1.5, borderColor: 'transparent' },
  langCardActive: { borderColor: COLORS.accent + '50', backgroundColor: '#FFF7ED' },
  langFlag: { fontSize: 28, marginBottom: 8 },
  langLabel: { fontSize: 13, fontWeight: '800', color: COLORS.gray[500] },
  langLabelActive: { color: COLORS.accent },
  langDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.accent, marginTop: 6 },

  dangerCard: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: COLORS.white, borderRadius: 22, padding: 16, marginBottom: 10, ...SHADOWS.light },
  dangerCardRed: { borderWidth: 1, borderColor: '#FEE2E2' },
  dangerIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },

  infoCard: { flexDirection: 'row', alignItems: 'center', gap: 12, justifyContent: 'center', marginTop: 32, paddingVertical: 16 },
  infoText: { fontSize: 13, fontWeight: '700', color: COLORS.gray[400] },
  infoSub: { fontSize: 11, color: COLORS.gray[300], fontWeight: '500', marginTop: 2 },
});

export default AppSettingsScreen;
