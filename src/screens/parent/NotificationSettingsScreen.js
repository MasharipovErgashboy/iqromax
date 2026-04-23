import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SHADOWS } from '../../constants/theme.js';
import {
  ArrowLeft, Bell, BellOff, MessageSquare, Award,
  Calendar, TrendingUp, Zap, Volume2,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const NotificationSettingsScreen = ({ navigation }) => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [settings, setSettings] = useState({
    liveLesson: true,
    scores: true,
    achievements: true,
    messages: true,
    reports: false,
    reminders: true,
    system: false,
  });

  const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  const items = [
    { key: 'liveLesson', icon: Calendar, label: "Jonli dars eslatmalari", desc: "Dars boshlanishidan 15 daqiqa oldin", color: '#EF4444' },
    { key: 'scores', icon: TrendingUp, label: "Natijalar va ballar", desc: "Yangi test natijalari kelganda", color: COLORS.primary },
    { key: 'achievements', icon: Award, label: "Yutuqlar va mukofotlar", desc: "Yangi ko'rsatmalar oldiganda", color: '#F59E0B' },
    { key: 'messages', icon: MessageSquare, label: "O'qituvchi xabarlari", desc: "Yangi suhbat kelganda", color: COLORS.accent },
    { key: 'reports', icon: Zap, label: "Haftalik hisobotlar", desc: "Har hafta dushanba kuni", color: '#6366F1' },
    { key: 'reminders', icon: Bell, label: "Uy vazifa eslatmalari", desc: "Topshiriq muddati yaqinlashganda", color: '#0EA5E9' },
  ];

  return (
    <View style={s.root}>
      <LinearGradient colors={['#0F172A', '#1E293B']} style={s.hero}>
        <SafeAreaView>
          <View style={s.topNav}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
              <ArrowLeft color="rgba(255,255,255,0.85)" size={22} />
            </TouchableOpacity>
            <Text style={s.heroTitle}>Bildirishnomalar</Text>
            <View style={{ width: 44 }} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.body}>
        {/* Master toggles */}
        <View style={s.masterCard}>
          <View style={s.masterRow}>
            <View style={[s.masterIcon, { backgroundColor: COLORS.accent + '15' }]}>
              {pushEnabled ? <Bell color={COLORS.accent} size={22} /> : <BellOff color={COLORS.gray[400]} size={22} />}
            </View>
            <View style={s.masterBody}>
              <Text style={s.masterLabel}>Push bildirishnomalar</Text>
              <Text style={s.masterDesc}>{pushEnabled ? "Yoqilgan" : "O'chirilgan"}</Text>
            </View>
            <Switch value={pushEnabled} onValueChange={setPushEnabled} trackColor={{ false: '#E2E8F0', true: COLORS.accent + '50' }} thumbColor={pushEnabled ? COLORS.accent : '#CBD5E1'} />
          </View>
          <View style={s.masterDivider} />
          <View style={s.masterRow}>
            <View style={[s.masterIcon, { backgroundColor: '#F0F9FF' }]}>
              <Volume2 color="#0EA5E9" size={22} />
            </View>
            <View style={s.masterBody}>
              <Text style={s.masterLabel}>Ovoz effektlari</Text>
              <Text style={s.masterDesc}>{soundEnabled ? "Yoqilgan" : "O'chirilgan"}</Text>
            </View>
            <Switch value={soundEnabled} onValueChange={setSoundEnabled} trackColor={{ false: '#E2E8F0', true: '#0EA5E9' + '50' }} thumbColor={soundEnabled ? '#0EA5E9' : '#CBD5E1'} />
          </View>
        </View>

        {/* Individual notification settings */}
        <Text style={s.sectionLabel}>BILDIRISHNOMA TURLARI</Text>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <View key={item.key} style={[s.itemCard, !pushEnabled && s.itemCardDisabled]}>
              <View style={[s.itemIcon, { backgroundColor: item.color + '12' }]}>
                <Icon color={item.color} size={20} />
              </View>
              <View style={s.itemBody}>
                <Text style={s.itemLabel}>{item.label}</Text>
                <Text style={s.itemDesc}>{item.desc}</Text>
              </View>
              <Switch
                value={settings[item.key]}
                onValueChange={() => toggle(item.key)}
                trackColor={{ false: '#E2E8F0', true: item.color + '50' }}
                thumbColor={settings[item.key] ? item.color : '#CBD5E1'}
                disabled={!pushEnabled}
              />
            </View>
          );
        })}
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

  masterCard: { backgroundColor: COLORS.white, borderRadius: 24, marginTop: 20, ...SHADOWS.light, overflow: 'hidden' },
  masterRow: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 18 },
  masterIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  masterBody: { flex: 1 },
  masterLabel: { fontSize: 16, fontWeight: '800', color: '#1E293B' },
  masterDesc: { fontSize: 12, color: COLORS.gray[400], fontWeight: '500', marginTop: 2 },
  masterDivider: { height: 1, backgroundColor: '#F1F5F9', marginHorizontal: 18 },

  sectionLabel: { fontSize: 11, fontWeight: '800', color: COLORS.gray[400], letterSpacing: 1, marginBottom: 14, marginTop: 28, paddingLeft: 4 },

  itemCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 22, padding: 16, marginBottom: 10, gap: 14, ...SHADOWS.light },
  itemCardDisabled: { opacity: 0.4 },
  itemIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  itemBody: { flex: 1 },
  itemLabel: { fontSize: 14, fontWeight: '800', color: '#1E293B' },
  itemDesc: { fontSize: 12, color: COLORS.gray[400], fontWeight: '500', marginTop: 2 },
});

export default NotificationSettingsScreen;
