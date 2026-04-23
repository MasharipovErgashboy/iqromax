import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, 
  Camera, 
  User, 
  Phone, 
  Mail, 
  GraduationCap, 
  Check,
  Calendar
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const StudentPersonalInfo = ({ navigation }) => {
  const { theme, isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form State
  const [form, setForm] = useState({
    fullName: 'Azizbek Karimov',
    phone: '+998 90 123 45 67',
    email: 'azizbek@iqromax.uz',
    age: '12',
    school: '144-maktab',
    city: 'Toshkent'
  });

  const handleSave = () => {
    setLoading(true);
    // Mock save
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  const InputField = ({ label, value, onChange, icon: Icon, placeholder, keyboardType = 'default' }) => (
    <View style={styles.inputGroup}>
      <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>{label}</Text>
      <View style={[styles.inputWrapper, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={[styles.iconBox, { backgroundColor: isDark ? '#1E293B' : '#F1F5F9' }]}>
           <Icon color={COLORS.primary} size={20} />
        </View>
        <TextInput
          style={[styles.input, { color: theme.text }]}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray[400]}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <SafeAreaView edges={['top']}>
           <View style={styles.headerTop}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                 <ArrowLeft color={theme.text} size={24} />
              </TouchableOpacity>
              <Text style={[styles.headerTitle, { color: theme.text }]}>Shaxsiy Ma'lumotlar</Text>
              <View style={{ width: 40 }} />
           </View>
        </SafeAreaView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
         {/* Profile Photo Section */}
         <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
               <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.avatarGradient}>
                  <Image source={require('../../../assets/mascot.png')} style={styles.avatarImg} />
               </LinearGradient>
               <TouchableOpacity style={styles.cameraBtn}>
                  <Camera color="white" size={16} />
               </TouchableOpacity>
            </View>
            <Text style={[styles.avatarTip, { color: theme.textSecondary }]}>Profil rasmini o'zgartirish</Text>
         </View>

         {/* Form Section */}
         <View style={styles.formSection}>
            <InputField 
              label="To'liq ism-familiya" 
              value={form.fullName} 
              onChange={(t) => setForm({...form, fullName: t})}
              icon={User}
              placeholder="Ismingizni kiriting"
            />
            <InputField 
              label="Telefon raqami" 
              value={form.phone} 
              onChange={(t) => setForm({...form, phone: t})}
              icon={Phone}
              placeholder="+998"
              keyboardType="phone-pad"
            />
            <InputField 
              label="Elektron pochta" 
              value={form.email} 
              onChange={(t) => setForm({...form, email: t})}
              icon={Mail}
              placeholder="email@example.com"
              keyboardType="email-address"
            />
            <View style={styles.rowInputs}>
               <View style={{ flex: 1 }}>
                  <InputField 
                    label="Yosh" 
                    value={form.age} 
                    onChange={(t) => setForm({...form, age: t})}
                    icon={Calendar}
                    placeholder="12"
                    keyboardType="numeric"
                  />
               </View>
               <View style={{ flex: 2, marginLeft: 15 }}>
                  <InputField 
                    label="Maktab" 
                    value={form.school} 
                    onChange={(t) => setForm({...form, school: t})}
                    icon={GraduationCap}
                    placeholder="Maktab raqami"
                  />
               </View>
            </View>
         </View>

         <View style={{ height: 40 }} />

         {/* Save Button */}
         <TouchableOpacity 
           onPress={handleSave} 
           style={styles.saveBtn}
           disabled={loading}
         >
            <LinearGradient 
              colors={success ? ['#10B981', '#059669'] : [COLORS.primary, COLORS.primaryDark]} 
              style={styles.btnGradient}
            >
               {success ? (
                 <View style={styles.btnContent}>
                    <Check color="white" size={22} />
                    <Text style={styles.btnText}>MUVAFFARIYATLI SAQLANDI</Text>
                 </View>
               ) : (
                 <Text style={styles.btnText}>{loading ? "SAQLANMOQDA..." : "O'ZGARIYISHLARNI SAQLASH"}</Text>
               )}
            </LinearGradient>
         </TouchableOpacity>

         <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 15, ...SHADOWS.light },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 60 },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '900' },
  
  scrollContent: { padding: 25 },
  avatarSection: { alignItems: 'center', marginBottom: 40 },
  avatarWrapper: { width: 130, height: 130, position: 'relative' },
  avatarGradient: { width: '100%', height: '100%', borderRadius: 65, padding: 4, justifyContent: 'center', alignItems: 'center' },
  avatarImg: { width: 110, height: 110, borderRadius: 55, backgroundColor: 'white' },
  cameraBtn: { position: 'absolute', right: 5, bottom: 5, backgroundColor: COLORS.primary, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: 'white' },
  avatarTip: { fontSize: 13, fontWeight: '600', marginTop: 15 },

  formSection: { gap: 20 },
  inputGroup: { gap: 10 },
  inputLabel: { fontSize: 14, fontWeight: '800', marginLeft: 5 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderRadius: 20, borderWidth: 1, padding: 6, ...SHADOWS.light },
  iconBox: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  input: { flex: 1, paddingHorizontal: 15, fontSize: 16, fontWeight: '600' },
  rowInputs: { flexDirection: 'row' },

  saveBtn: { borderRadius: 24, overflow: 'hidden', ...SHADOWS.medium },
  btnGradient: { paddingVertical: 20, alignItems: 'center', justifyContent: 'center' },
  btnText: { color: 'white', fontSize: 14, fontWeight: '900', letterSpacing: 0.5 },
  btnContent: { flexDirection: 'row', alignItems: 'center', gap: 10 },
});

export default StudentPersonalInfo;
