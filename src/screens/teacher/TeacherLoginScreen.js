import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme.js';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext.js';

const { width } = Dimensions.get('window');

const TeacherLoginScreen = ({ navigation }) => {
  const { isDark, theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Simulated login
    navigation.navigate('TeacherDashboard');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Back Button */}
          <TouchableOpacity 
             style={styles.backBtn}
             onPress={() => navigation.goBack()}
          >
             <ArrowLeft color={theme.text} size={24} />
          </TouchableOpacity>

          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <View style={[styles.logoContainer, { backgroundColor: isDark ? theme.card : COLORS.white }]}>
                <Image 
                   source={require('../../../assets/mascot.png')} 
                   style={styles.logo} 
                   resizeMode="contain"
                />
              </View>
              <Text style={[styles.title, { color: theme.text }]}>Xush kelibsiz!</Text>
              <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                O'qituvchi profiliga kirish uchun ma'lumotlaringizni kiriting
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>LOGINGIZ</Text>
                <View style={[styles.inputWrapper, { backgroundColor: isDark ? theme.card : COLORS.gray[50], borderColor: theme.border }]}>
                  <Mail color={isDark ? theme.glow : COLORS.secondary} size={20} />
                  <TextInput
                    style={[styles.input, { color: theme.text }]}
                    placeholder="Email yoki foydalanuvchi nomi"
                    placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : COLORS.gray[400]}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                   <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>PAROL</Text>
                   <TouchableOpacity>
                      <Text style={styles.forgotPass}>Parolni unutdingizmi?</Text>
                   </TouchableOpacity>
                </View>
                <View style={[styles.inputWrapper, { backgroundColor: isDark ? theme.card : COLORS.gray[50], borderColor: theme.border }]}>
                  <Lock color={isDark ? theme.glow : COLORS.secondary} size={20} />
                  <TextInput
                    style={[styles.input, { color: theme.text }]}
                    placeholder="••••••••"
                    placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : COLORS.gray[400]}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff color={COLORS.gray[400]} size={20} />
                    ) : (
                      <Eye color={COLORS.gray[400]} size={20} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity 
                 style={styles.loginBtn}
                 onPress={handleLogin}
              >
                <LinearGradient
                   colors={isDark ? [theme.glow, '#059669'] : [COLORS.secondary, '#eab308']}
                   style={styles.btnGradient}
                >
                   <Text style={styles.btnText}>KIRISH</Text>
                   <ArrowRight color={COLORS.white} size={20} strokeWidth={3} />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
               <Text style={[styles.footerText, { color: theme.textSecondary }]}>Hali hisobingiz yo'qmi?</Text>
               <TouchableOpacity onPress={() => navigation.navigate('TeacherRegistration')}>
                  <Text style={styles.registerLink}>Ro'yxatdan o'tish</Text>
               </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  backBtn: {
    padding: 20,
    width: 64,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    ...SHADOWS.medium,
  },
  logo: {
    width: 70,
    height: 70,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginLeft: 4,
  },
  forgotPass: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0ea5e9',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 58,
    borderRadius: 18,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  loginBtn: {
    marginTop: 10,
    borderRadius: 18,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  btnGradient: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  btnText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    gap: 8,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.secondary,
  },
});

export default TeacherLoginScreen;
