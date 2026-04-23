import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Image, Platform, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SHADOWS } from '../../constants/theme.js';
import {
  ArrowLeft, Camera, User, Mail, Phone, MapPin,
  Calendar, Save, CheckCircle,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const PersonalInfoScreen = ({ navigation }) => {
  const [name, setName] = useState('Karimov Sardor');
  const [email, setEmail] = useState('sardor.k@gmail.com');
  const [phone, setPhone] = useState('+998 90 123 45 67');
  const [address, setAddress] = useState("Toshkent sh., Chilonzor t.");
  const [childName, setChildName] = useState('Alisher Karimov');
  const [childAge, setChildAge] = useState('8');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    Alert.alert("Saqlandi ✅", "Ma'lumotlar muvaffaqiyatli yangilandi.");
  };

  const fields = [
    { icon: User, label: "To'liq ism", value: name, setter: setName, placeholder: "Ism sharifingiz" },
    { icon: Mail, label: "Elektron pochta", value: email, setter: setEmail, placeholder: "email@example.com", keyboard: 'email-address' },
    { icon: Phone, label: "Telefon raqam", value: phone, setter: setPhone, placeholder: "+998 XX XXX XX XX", keyboard: 'phone-pad' },
    { icon: MapPin, label: "Manzil", value: address, setter: setAddress, placeholder: "Shahar, tuman..." },
  ];

  return (
    <View style={s.root}>
      <LinearGradient colors={['#0F172A', '#1E293B']} style={s.hero}>
        <SafeAreaView>
          <View style={s.topNav}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
              <ArrowLeft color="rgba(255,255,255,0.85)" size={22} />
            </TouchableOpacity>
            <Text style={s.heroTitle}>Shaxsiy ma'lumotlar</Text>
            <View style={{ width: 44 }} />
          </View>

          <View style={s.avatarSection}>
            <View style={s.avatarWrap}>
              <Image source={require('../../../assets/avatar_blue.png')} style={s.avatar} />
              <TouchableOpacity style={s.cameraBtn}>
                <Camera color={COLORS.white} size={16} />
              </TouchableOpacity>
            </View>
            <Text style={s.avatarName}>{name}</Text>
            <View style={s.verifiedRow}>
              <CheckCircle color={COLORS.primary} size={14} />
              <Text style={s.verifiedText}>Tasdiqlangan profil</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.body}>
        {/* Parent info */}
        <Text style={s.sectionLabel}>OTA-ONA MA'LUMOTLARI</Text>
        {fields.map((f, i) => {
          const Icon = f.icon;
          return (
            <View key={i} style={s.fieldCard}>
              <View style={s.fieldIcon}><Icon color={COLORS.accent} size={18} /></View>
              <View style={s.fieldBody}>
                <Text style={s.fieldLabel}>{f.label}</Text>
                <TextInput
                  style={s.fieldInput}
                  value={f.value}
                  onChangeText={f.setter}
                  placeholder={f.placeholder}
                  placeholderTextColor={COLORS.gray[400]}
                  keyboardType={f.keyboard || 'default'}
                />
              </View>
            </View>
          );
        })}

        {/* Child info */}
        <Text style={[s.sectionLabel, { marginTop: 28 }]}>FARZAND MA'LUMOTLARI</Text>
        <View style={s.fieldCard}>
          <View style={s.fieldIcon}><User color="#6366F1" size={18} /></View>
          <View style={s.fieldBody}>
            <Text style={s.fieldLabel}>Farzand ismi</Text>
            <TextInput style={s.fieldInput} value={childName} onChangeText={setChildName} placeholderTextColor={COLORS.gray[400]} />
          </View>
        </View>
        <View style={s.fieldCard}>
          <View style={s.fieldIcon}><Calendar color="#0EA5E9" size={18} /></View>
          <View style={s.fieldBody}>
            <Text style={s.fieldLabel}>Yoshi</Text>
            <TextInput style={s.fieldInput} value={childAge} onChangeText={setChildAge} keyboardType="numeric" placeholderTextColor={COLORS.gray[400]} />
          </View>
        </View>

        <TouchableOpacity onPress={handleSave} style={s.saveBtn}>
          <LinearGradient colors={[COLORS.accent, '#F59E0B']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.saveGrad}>
            <Save color={COLORS.white} size={20} />
            <Text style={s.saveText}>{saved ? "Saqlandi ✅" : "Saqlash"}</Text>
          </LinearGradient>
        </TouchableOpacity>
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
  avatarSection: { alignItems: 'center', paddingBottom: 8 },
  avatarWrap: { position: 'relative', marginBottom: 14 },
  avatar: { width: 90, height: 90, borderRadius: 30, borderWidth: 3, borderColor: 'rgba(255,255,255,0.15)' },
  cameraBtn: { position: 'absolute', bottom: -4, right: -4, width: 34, height: 34, borderRadius: 12, backgroundColor: COLORS.accent, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#1E293B' },
  avatarName: { color: COLORS.white, fontSize: 20, fontWeight: '900' },
  verifiedRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  verifiedText: { color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: '700' },

  body: { paddingHorizontal: 18, paddingBottom: 48, paddingTop: 4 },
  sectionLabel: { fontSize: 11, fontWeight: '800', color: COLORS.gray[400], letterSpacing: 1, marginBottom: 14, marginTop: 20, paddingLeft: 4 },

  fieldCard: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: COLORS.white, borderRadius: 22, padding: 16, marginBottom: 10, gap: 14, ...SHADOWS.light },
  fieldIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: '#FFF7ED', alignItems: 'center', justifyContent: 'center' },
  fieldBody: { flex: 1 },
  fieldLabel: { fontSize: 11, fontWeight: '700', color: COLORS.gray[400], marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  fieldInput: { fontSize: 15, fontWeight: '700', color: '#1E293B', padding: 0 },

  saveBtn: { marginTop: 32, borderRadius: 22, overflow: 'hidden', ...SHADOWS.medium },
  saveGrad: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 18 },
  saveText: { color: COLORS.white, fontSize: 16, fontWeight: '900' },
});

export default PersonalInfoScreen;
