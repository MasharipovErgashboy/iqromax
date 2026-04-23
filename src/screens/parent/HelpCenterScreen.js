import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Linking, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SHADOWS } from '../../constants/theme.js';
import {
  ArrowLeft, Search, MessageCircle, Phone, Mail,
  HelpCircle, BookOpen, ChevronRight, ExternalLink,
  FileText, Zap, Users, CreditCard,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const FAQ = [
  { q: "Farzandim qanday qilib darsga kiradi?", a: "O'quvchi o'z login va paroli orqali ilovaga kirishi kerak. Ota-ona panelidan ham kuzatish mumkin." },
  { q: "Obuna narxi qancha?", a: "Premium obuna oyiga 120,000 so'm. Bunda barcha darslar, musobaqalar va qo'shimcha materiallar mavjud." },
  { q: "To'lov qanday amalga oshiriladi?", a: "Payme, Click va Uzcard orqali to'lov qilish mumkin. Avtomatik yechilish funksiyasi ham mavjud." },
  { q: "O'qituvchi bilan qanday bog'lanaman?", a: "Jadval sahifasidagi 'Xabar' tugmasi yoki O'qituvchilar ro'yxatidan ustoz bilan suhbatlashishingiz mumkin." },
  { q: "Sertifikatni qanday yuklab olaman?", a: "Fan tafsilotlari sahifasining pastida 'Sertifikatni yuklab olish' tugmasi mavjud." },
];

const HelpCenterScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  const filtered = search
    ? FAQ.filter(f => f.q.toLowerCase().includes(search.toLowerCase()))
    : FAQ;

  const contactOptions = [
    { icon: MessageCircle, label: "Jonli chat", desc: "Tezkor javob olish", color: COLORS.primary, action: () => {} },
    { icon: Phone, label: "Qo'ng'iroq", desc: "+998 71 200 00 00", color: COLORS.accent, action: () => Linking.openURL('tel:+998712000000') },
    { icon: Mail, label: "Elektron pochta", desc: "help@iqromax.uz", color: '#6366F1', action: () => Linking.openURL('mailto:help@iqromax.uz') },
  ];

  const guides = [
    { icon: BookOpen, label: "Boshlang'ich qo'llanma", color: COLORS.primary },
    { icon: Users, label: "Ota-ona paneli", color: COLORS.accent },
    { icon: CreditCard, label: "To'lov tizimi", color: '#8B5CF6' },
    { icon: Zap, label: "Musobaqalar qoidasi", color: '#0EA5E9' },
  ];

  return (
    <View style={s.root}>
      <LinearGradient colors={['#0F172A', '#1E293B']} style={s.hero}>
        <SafeAreaView>
          <View style={s.topNav}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
              <ArrowLeft color="rgba(255,255,255,0.85)" size={22} />
            </TouchableOpacity>
            <Text style={s.heroTitle}>Yordam markazi</Text>
            <View style={{ width: 44 }} />
          </View>
          <View style={s.searchWrap}>
            <Search color={COLORS.gray[400]} size={18} />
            <TextInput
              style={s.searchInput}
              value={search}
              onChangeText={setSearch}
              placeholder="Savolingizni yozing..."
              placeholderTextColor="rgba(255,255,255,0.35)"
            />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.body}>
        {/* Contact options */}
        <Text style={s.sectionLabel}>BOG'LANISH</Text>
        <View style={s.contactRow}>
          {contactOptions.map((c, i) => {
            const Icon = c.icon;
            return (
              <TouchableOpacity key={i} style={s.contactCard} onPress={c.action} activeOpacity={0.8}>
                <View style={[s.contactIcon, { backgroundColor: c.color + '15' }]}>
                  <Icon color={c.color} size={22} />
                </View>
                <Text style={s.contactLabel}>{c.label}</Text>
                <Text style={s.contactDesc}>{c.desc}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* FAQ */}
        <Text style={s.sectionLabel}>KO'P SO'RALADIGAN SAVOLLAR</Text>
        {filtered.map((faq, i) => (
          <TouchableOpacity
            key={i}
            style={[s.faqCard, expanded === i && s.faqCardExpanded]}
            onPress={() => setExpanded(expanded === i ? null : i)}
            activeOpacity={0.85}
          >
            <View style={s.faqTop}>
              <HelpCircle color={expanded === i ? COLORS.accent : COLORS.gray[400]} size={18} />
              <Text style={[s.faqQ, expanded === i && s.faqQActive]}>{faq.q}</Text>
              <ChevronRight
                color={COLORS.gray[300]}
                size={16}
                style={{ transform: [{ rotate: expanded === i ? '90deg' : '0deg' }] }}
              />
            </View>
            {expanded === i && (
              <Text style={s.faqA}>{faq.a}</Text>
            )}
          </TouchableOpacity>
        ))}

        {filtered.length === 0 && (
          <View style={s.emptyState}>
            <Search color={COLORS.gray[300]} size={36} />
            <Text style={s.emptyText}>Hech narsa topilmadi</Text>
          </View>
        )}

        {/* Guides */}
        <Text style={[s.sectionLabel, { marginTop: 28 }]}>QO'LLANMALAR</Text>
        <View style={s.guidesGrid}>
          {guides.map((g, i) => {
            const Icon = g.icon;
            return (
              <TouchableOpacity key={i} style={s.guideCard} activeOpacity={0.8}>
                <View style={[s.guideIcon, { backgroundColor: g.color + '12' }]}>
                  <Icon color={g.color} size={20} />
                </View>
                <Text style={s.guideLabel}>{g.label}</Text>
                <ExternalLink color={COLORS.gray[300]} size={14} />
              </TouchableOpacity>
            );
          })}
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

  searchWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, marginHorizontal: 18, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 16, paddingHorizontal: 16, paddingVertical: Platform.OS === 'ios' ? 13 : 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  searchInput: { flex: 1, color: COLORS.white, fontSize: 14, fontWeight: '600' },

  body: { paddingHorizontal: 18, paddingBottom: 48 },
  sectionLabel: { fontSize: 11, fontWeight: '800', color: COLORS.gray[400], letterSpacing: 1, marginBottom: 14, marginTop: 24, paddingLeft: 4 },

  contactRow: { flexDirection: 'row', gap: 10 },
  contactCard: { flex: 1, backgroundColor: COLORS.white, borderRadius: 22, padding: 16, alignItems: 'center', ...SHADOWS.light },
  contactIcon: { width: 50, height: 50, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  contactLabel: { fontSize: 13, fontWeight: '800', color: '#1E293B', marginBottom: 4 },
  contactDesc: { fontSize: 10, color: COLORS.gray[400], fontWeight: '600', textAlign: 'center' },

  faqCard: { backgroundColor: COLORS.white, borderRadius: 22, padding: 18, marginBottom: 10, ...SHADOWS.light },
  faqCardExpanded: { borderWidth: 1.5, borderColor: COLORS.accent + '30' },
  faqTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  faqQ: { flex: 1, fontSize: 14, fontWeight: '700', color: '#334155' },
  faqQActive: { color: COLORS.accent, fontWeight: '800' },
  faqA: { fontSize: 13, color: COLORS.gray[500], lineHeight: 20, fontWeight: '500', marginTop: 14, paddingLeft: 30 },

  emptyState: { alignItems: 'center', paddingVertical: 40, gap: 12 },
  emptyText: { fontSize: 14, color: COLORS.gray[400], fontWeight: '600' },

  guidesGrid: { gap: 10 },
  guideCard: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: COLORS.white, borderRadius: 22, padding: 16, ...SHADOWS.light },
  guideIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  guideLabel: { flex: 1, fontSize: 15, fontWeight: '800', color: '#1E293B' },
});

export default HelpCenterScreen;
