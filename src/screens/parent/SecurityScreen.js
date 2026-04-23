import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Switch, Alert, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SHADOWS } from '../../constants/theme.js';
import {
  ArrowLeft, Shield, Lock, Eye, EyeOff, Fingerprint,
  Smartphone, Key, AlertTriangle, CheckCircle,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SecurityScreen = ({ navigation }) => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [biometric, setBiometric] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [loginAlert, setLoginAlert] = useState(true);

  const handleChangePass = () => {
    if (!oldPass || !newPass) return Alert.alert("Xatolik", "Barcha maydonlarni to'ldiring");
    if (newPass !== confirmPass) return Alert.alert("Xatolik", "Parollar mos emas");
    if (newPass.length < 8) return Alert.alert("Xatolik", "Parol kamida 8 belgi bo'lishi kerak");
    Alert.alert("Muvaffaqiyat ✅", "Parolingiz o'zgartirildi");
    setOldPass(''); setNewPass(''); setConfirmPass('');
  };

  const securityItems = [
    { icon: Fingerprint, label: "Biometrik kirish", desc: "Barmoq izi / Face ID", value: biometric, setter: setBiometric, color: COLORS.primary },
    { icon: Key, label: "Ikki bosqichli tekshiruv", desc: "SMS orqali tasdiqlash", value: twoFactor, setter: setTwoFactor, color: '#8B5CF6' },
    { icon: AlertTriangle, label: "Kirish bildirishnomalari", desc: "Yangi qurilmadan kirilganda xabar", value: loginAlert, setter: setLoginAlert, color: COLORS.accent },
  ];

  const sessions = [
    { device: 'iPhone 15 Pro', location: "Toshkent", time: "Hozir faol", current: true },
    { device: 'iPad Air', location: "Toshkent", time: "2 kun oldin", current: false },
  ];

  return (
    <View style={s.root}>
      <LinearGradient colors={['#0F172A', '#1E293B']} style={s.hero}>
        <SafeAreaView>
          <View style={s.topNav}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
              <ArrowLeft color="rgba(255,255,255,0.85)" size={22} />
            </TouchableOpacity>
            <Text style={s.heroTitle}>Xavfsizlik</Text>
            <View style={{ width: 44 }} />
          </View>
          <View style={s.heroIcon}>
            <Shield color={COLORS.primary} size={40} strokeWidth={1.5} />
            <Text style={s.heroDesc}>Hisobingiz himoyalangan</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.body}>
        {/* Password change */}
        <Text style={s.sectionLabel}>PAROLNI O'ZGARTIRISH</Text>
        <View style={s.passCard}>
          <View style={s.passField}>
            <Lock color={COLORS.gray[400]} size={18} />
            <TextInput style={s.passInput} value={oldPass} onChangeText={setOldPass} placeholder="Joriy parol" secureTextEntry={!showOld} placeholderTextColor={COLORS.gray[400]} />
            <TouchableOpacity onPress={() => setShowOld(!showOld)}>
              {showOld ? <EyeOff color={COLORS.gray[400]} size={18} /> : <Eye color={COLORS.gray[400]} size={18} />}
            </TouchableOpacity>
          </View>
          <View style={s.divider} />
          <View style={s.passField}>
            <Key color={COLORS.gray[400]} size={18} />
            <TextInput style={s.passInput} value={newPass} onChangeText={setNewPass} placeholder="Yangi parol (8+ belgi)" secureTextEntry={!showNew} placeholderTextColor={COLORS.gray[400]} />
            <TouchableOpacity onPress={() => setShowNew(!showNew)}>
              {showNew ? <EyeOff color={COLORS.gray[400]} size={18} /> : <Eye color={COLORS.gray[400]} size={18} />}
            </TouchableOpacity>
          </View>
          <View style={s.divider} />
          <View style={s.passField}>
            <CheckCircle color={COLORS.gray[400]} size={18} />
            <TextInput style={s.passInput} value={confirmPass} onChangeText={setConfirmPass} placeholder="Parolni tasdiqlash" secureTextEntry={!showNew} placeholderTextColor={COLORS.gray[400]} />
          </View>
        </View>

        <TouchableOpacity onPress={handleChangePass} style={s.changeBtn}>
          <LinearGradient colors={[COLORS.primary, '#16A34A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.changeBtnGrad}>
            <Lock color={COLORS.white} size={18} />
            <Text style={s.changeBtnText}>Parolni yangilash</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Security toggles */}
        <Text style={[s.sectionLabel, { marginTop: 30 }]}>XAVFSIZLIK SOZLAMALARI</Text>
        {securityItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <View key={i} style={s.toggleCard}>
              <View style={[s.toggleIcon, { backgroundColor: item.color + '12' }]}>
                <Icon color={item.color} size={20} />
              </View>
              <View style={s.toggleBody}>
                <Text style={s.toggleLabel}>{item.label}</Text>
                <Text style={s.toggleDesc}>{item.desc}</Text>
              </View>
              <Switch
                value={item.value}
                onValueChange={item.setter}
                trackColor={{ false: '#E2E8F0', true: item.color + '50' }}
                thumbColor={item.value ? item.color : '#CBD5E1'}
              />
            </View>
          );
        })}

        {/* Active sessions */}
        <Text style={[s.sectionLabel, { marginTop: 30 }]}>FAOL SEANSLAR</Text>
        {sessions.map((ses, i) => (
          <View key={i} style={[s.sessionCard, ses.current && s.sessionCardActive]}>
            <View style={[s.sessionIcon, { backgroundColor: ses.current ? COLORS.primary + '15' : '#F8FAFC' }]}>
              <Smartphone color={ses.current ? COLORS.primary : COLORS.gray[400]} size={20} />
            </View>
            <View style={s.sessionBody}>
              <Text style={s.sessionDevice}>{ses.device}</Text>
              <Text style={s.sessionMeta}>{ses.location} • {ses.time}</Text>
            </View>
            {ses.current ? (
              <View style={s.currentBadge}><Text style={s.currentBadgeText}>JORIY</Text></View>
            ) : (
              <TouchableOpacity style={s.logoutBtn} onPress={() => Alert.alert("Chiqarildi", "Qurilma tizimdan chiqarildi")}>
                <Text style={s.logoutBtnText}>Chiqarish</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F1F5F9' },
  hero: { paddingBottom: 24 },
  topNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: Platform.OS === 'ios' ? 4 : 18, paddingBottom: 10 },
  backBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  heroTitle: { color: COLORS.white, fontSize: 18, fontWeight: '900' },
  heroIcon: { alignItems: 'center', paddingVertical: 12, gap: 8 },
  heroDesc: { color: 'rgba(255,255,255,0.45)', fontSize: 13, fontWeight: '600' },

  body: { paddingHorizontal: 18, paddingBottom: 48 },
  sectionLabel: { fontSize: 11, fontWeight: '800', color: COLORS.gray[400], letterSpacing: 1, marginBottom: 14, marginTop: 20, paddingLeft: 4 },

  passCard: { backgroundColor: COLORS.white, borderRadius: 24, padding: 4, ...SHADOWS.light, overflow: 'hidden' },
  passField: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  passInput: { flex: 1, fontSize: 15, fontWeight: '600', color: '#1E293B' },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginHorizontal: 16 },

  changeBtn: { marginTop: 18, borderRadius: 20, overflow: 'hidden', ...SHADOWS.medium },
  changeBtnGrad: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 17 },
  changeBtnText: { color: COLORS.white, fontSize: 15, fontWeight: '900' },

  toggleCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 22, padding: 16, marginBottom: 10, gap: 14, ...SHADOWS.light },
  toggleIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  toggleBody: { flex: 1 },
  toggleLabel: { fontSize: 15, fontWeight: '800', color: '#1E293B' },
  toggleDesc: { fontSize: 12, color: COLORS.gray[400], fontWeight: '500', marginTop: 2 },

  sessionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 22, padding: 16, marginBottom: 10, gap: 14, ...SHADOWS.light },
  sessionCardActive: { borderWidth: 1.5, borderColor: COLORS.primary + '35' },
  sessionIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  sessionBody: { flex: 1 },
  sessionDevice: { fontSize: 15, fontWeight: '800', color: '#1E293B' },
  sessionMeta: { fontSize: 12, color: COLORS.gray[400], fontWeight: '500', marginTop: 2 },
  currentBadge: { backgroundColor: COLORS.primary + '15', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  currentBadgeText: { color: COLORS.primary, fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  logoutBtn: { backgroundColor: '#FEF2F2', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10 },
  logoutBtnText: { color: '#EF4444', fontSize: 12, fontWeight: '800' },
});

export default SecurityScreen;
