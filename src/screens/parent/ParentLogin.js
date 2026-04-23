import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Platform, 
  ScrollView,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme.js';
import { User, Lock, ArrowLeft, Eye, EyeOff, ShieldCheck, CheckCircle2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ParentLogin = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isSetupMode, setIsSetupMode] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const isPasswordMatch = isSetupMode && password.length > 0 && password === confirmPassword;

  const handleRegister = () => {
    if (!username || !password) {
      alert("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate ID Generation & Profile Creation
    setTimeout(() => {
      const generatedID = `PR-${Math.floor(100000 + Math.random() * 900000)}`;
      setIsLoading(false);
      navigation.navigate('ParentDashboard', { 
        parentID: generatedID,
        username: username 
      });
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Header Section */}
          <View style={styles.navHeader}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <ArrowLeft color={COLORS.gray[700]} size={24} />
            </TouchableOpacity>
            <View style={styles.securityBadge}>
              <ShieldCheck color={COLORS.accent} size={16} />
              <Text style={styles.securityText}>Xavfsiz Tizim</Text>
            </View>
          </View>

          <View style={styles.introSection}>
            <Text style={styles.title}>
              {isSetupMode ? "Hisobingizni sozlang" : "Xush kelibsiz!"}
            </Text>
            <Text style={styles.subtitle}>
              {isSetupMode 
                ? "Farzandingiz hisobiga ulanish uchun quyidagi ma'lumotlarni to'ldiring" 
                : "Farzandingiz progressini kuzatish uchun profilingizga kiring"}
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Farzandingiz Username'si</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.iconBox}>
                  <User color={COLORS.accent} size={20} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="masalan: azizbek_2012"
                  value={username}
                  onChangeText={setUsername}
                  placeholderTextColor={COLORS.gray[400]}
                />
              </View>

              <Text style={styles.inputLabel}>Yangi parolingiz</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.iconBox}>
                  <Lock color={COLORS.accent} size={20} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="•••••••• (8 ta belgi)"
                  secureTextEntry={!showPass}
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor={COLORS.gray[400]}
                />
                <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.eyeBtn}>
                  {showPass ? <EyeOff color={COLORS.gray[400]} size={20} /> : <Eye color={COLORS.gray[400]} size={20} />}
                </TouchableOpacity>
              </View>

              {isSetupMode && (
                <>
                  <Text style={styles.inputLabel}>Parolni tasdiqlash</Text>
                  <View style={[styles.inputWrapper, isPasswordMatch && styles.inputSuccess]}>
                    <View style={styles.iconBox}>
                      <Lock color={isPasswordMatch ? COLORS.primary : COLORS.accent} size={20} />
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="•••••••• (tasdiqlash)"
                      secureTextEntry={!showPass}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      placeholderTextColor={COLORS.gray[400]}
                    />
                    {isPasswordMatch && (
                      <View style={styles.checkIcon}>
                        <CheckCircle2 color={COLORS.primary} size={20} />
                      </View>
                    )}
                  </View>
                </>
              )}
            </View>

            <TouchableOpacity
              style={styles.mainBtn}
              activeOpacity={0.8}
              onPress={handleRegister}
              disabled={isLoading}
            >
              <LinearGradient
                colors={[COLORS.accent, '#F59E0B']}
                style={styles.btnGradient}
              >
                <Text style={styles.btnText}>
                  {isLoading ? "Tayyorlanmoqda..." : (isSetupMode ? "Hisobni yaratish" : "Kirish")}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.toggleMode}
              onPress={() => setIsSetupMode(!isSetupMode)}
            >
              <Text style={styles.toggleText}>
                {isSetupMode 
                  ? "Profiliz bormi? Kirish" 
                  : "Yangi foydalanuvchimisiz? Ro'yxatdan o'ting"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer Info */}
          <View style={styles.footerInfo}>
             <ShieldCheck color={COLORS.gray[300]} size={40} />
             <Text style={styles.footerText}>
               Barcha ma'lumotlar IQROMAX xavfsizlik standarti bo'yicha himoyalangan.
             </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  navHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent + '15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  securityText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.accent,
  },
  introSection: {
    paddingHorizontal: 30,
    paddingVertical: 35,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.gray[900],
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray[500],
    lineHeight: 24,
    marginTop: 10,
    fontWeight: '500',
  },
  formCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 32,
    padding: 24,
    ...SHADOWS.medium,
  },
  inputGroup: {
    gap: 12,
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.gray[700],
    marginLeft: 4,
    marginTop: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 64,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
  },
  inputSuccess: {
    borderColor: COLORS.primary + '50',
    backgroundColor: COLORS.primary + '05',
  },
  iconBox: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.gray[900],
    fontWeight: '600',
  },
  eyeBtn: {
    padding: 8,
  },
  checkIcon: {
    marginLeft: 8,
  },
  mainBtn: {
    width: '100%',
    borderRadius: 20,
    ...SHADOWS.medium,
    marginBottom: 20,
  },
  btnGradient: {
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '900',
  },
  toggleMode: {
    alignItems: 'center',
    padding: 10,
  },
  toggleText: {
    color: COLORS.accent,
    fontWeight: '800',
    fontSize: 14,
  },
  footerInfo: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 50,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.gray[400],
    marginTop: 15,
    lineHeight: 18,
    fontWeight: '500',
  },
});

export default ParentLogin;
