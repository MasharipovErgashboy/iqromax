import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme.js';
import { User, Mail, Briefcase, MapPin, ArrowLeft, Send, Smartphone, UploadCloud, FileText, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext.js';

const InputField = ({ label, placeholder, icon: Icon, value, onChangeText, multiline = false, keyboardType = 'default', isDark, theme }) => (
  <View style={styles.inputFieldContainer}>
    <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>{label}</Text>
    <View style={[
      styles.inputWrapper, 
      { backgroundColor: isDark ? theme.card : COLORS.gray[50], borderColor: theme.border },
      multiline && styles.textAreaWrapper
    ]}>
      <View style={styles.iconWrapper}>
        <Icon color={isDark ? theme.glow : COLORS.secondary} size={20} />
      </View>
      <TextInput
        style={[styles.input, { color: theme.text }, multiline && styles.textArea]}
        placeholder={placeholder}
        placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : COLORS.gray[400]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType}
      />
    </View>
  </View>
);

const TeacherRegistration = ({ navigation }) => {
  const { isDark, theme } = useTheme();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    specialization: '',
    message: '',
  });

  const handleSubmit = () => {
    Alert.alert(
      "Yuborildi!",
      "Ma'lumotlaringiz admin panelga yuborildi. Tezp orada siz bilan bog'lanamiz.",
      [{ text: "OK", onPress: () => navigation.navigate('Landing') }]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color={theme.text} size={24} />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>O'qituvchi bo'lish</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Formani to'ldiring va bizning jamoamizga qo'shiling. Adminlarimiz siz bilan bog'lanishadi.
            </Text>
          </View>

          <View style={styles.form}>
            <InputField
              label="To'liq ism sharifingiz"
              placeholder="Masalan: Azizbek Karimov"
              icon={User}
              value={formData.fullName}
              onChangeText={(val) => setFormData({...formData, fullName: val})}
              isDark={isDark}
              theme={theme}
            />

            <InputField
              label="Telefon raqamingiz"
              placeholder="+998 90 123 45 67"
              icon={Smartphone}
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(val) => setFormData({...formData, phone: val})}
              isDark={isDark}
              theme={theme}
            />

            <InputField
              label="Email manzilingiz"
              placeholder="namuna@misol.uz"
              icon={Mail}
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(val) => setFormData({...formData, email: val})}
              isDark={isDark}
              theme={theme}
            />

            <InputField
              label="Mutaxassislik"
              placeholder="masalan: Mental arifmetika"
              icon={Briefcase}
              value={formData.specialization}
              onChangeText={(val) => setFormData({...formData, specialization: val})}
              isDark={isDark}
              theme={theme}
            />

            <View style={styles.inputFieldContainer}>
              <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>CV (Rezyume) yuklash</Text>
              <TouchableOpacity style={[styles.cvUpload, { backgroundColor: isDark ? theme.card : COLORS.gray[50], borderColor: isDark ? theme.border : COLORS.gray[200] }]}>
                 <View style={[styles.cvIcon, { backgroundColor: isDark ? 'rgba(251, 146, 60, 0.1)' : COLORS.gray[100] }]}>
                    <UploadCloud color={isDark ? theme.glow : COLORS.secondary} size={24} />
                 </View>
                 <View style={{ flex: 1 }}>
                    <Text style={[styles.cvTitle, { color: theme.text }]}>Tanlash (PDF, Word)</Text>
                    <Text style={[styles.cvSub, { color: theme.textSecondary }]}>Maksimal o'lcham: 5 MB</Text>
                 </View>
                 <FileText color={theme.textSecondary} size={20} />
              </TouchableOpacity>
            </View>

            <InputField
              label="Ish tajribangiz haqida"
              placeholder="Qancha muddat va qaysi o'quv markazlarida?"
              icon={MapPin}
              multiline={true}
              value={formData.experience}
              onChangeText={(val) => setFormData({...formData, experience: val})}
              isDark={isDark}
              theme={theme}
            />

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={handleSubmit}
            >
              <LinearGradient
                colors={isDark ? [theme.glow, '#059669'] : [COLORS.secondary, '#eab308']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Arizani yuborish</Text>
                <Send color={COLORS.white} size={20} />
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.loginOption}>
               <Text style={[styles.loginText, { color: theme.textSecondary }]}>Allaqachon o'qituvchisiz?</Text>
               <TouchableOpacity 
                 style={styles.loginBtn}
                 onPress={() => navigation.navigate('TeacherLogin')}
                 activeOpacity={0.7}
                >
                  <Text style={styles.loginBtnText}>Tizimga kirish</Text>
                  <ChevronRight color={COLORS.secondary} size={16} strokeWidth={3} />
               </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardView: {
    flex: 1,
  },
  backButton: {
    padding: SPACING.md,
    marginTop: SPACING.sm,
  },
  scrollContent: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.gray[900],
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray[500],
    lineHeight: 22,
  },
  form: {
    gap: SPACING.lg,
  },
  inputFieldContainer: {
    gap: SPACING.xs,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray[700],
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray[50],
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 56,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  textAreaWrapper: {
    height: 120,
    alignItems: 'flex-start',
    paddingTop: SPACING.sm,
  },
  iconWrapper: {
    marginRight: SPACING.sm,
    marginTop: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.gray[900],
  },
  textArea: {
    textAlignVertical: 'top',
  },
  button: {
    marginTop: SPACING.md,
    ...SHADOWS.medium,
  },
  buttonGradient: {
    height: 60,
    borderRadius: BORDER_RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cvUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    gap: 12,
  },
  cvIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cvTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  cvSub: {
    fontSize: 12,
    marginTop: 2,
  },
  loginOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.lg,
    gap: 8,
  },
  loginText: {
    fontSize: 14,
    fontWeight: '500',
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  loginBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.secondary,
  },
});

export default TeacherRegistration;
