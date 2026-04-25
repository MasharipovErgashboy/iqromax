import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme.js';
import { ArrowLeft, ShieldCheck, Timer } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ParentOTP = ({ navigation, route }) => {
  const { phoneNumber, fullName } = route.params || {};
  const [otp, setOtp] = useState(['', '', '', '']);
  const [counter, setCounter] = useState(59);
  const inputRefs = useRef([]);

  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  // Auto-fill simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      const autoOtp = ['4', '5', '8', '2'];
      setOtp(autoOtp);
      
      // Navigate after auto-fill
      setTimeout(() => {
        navigation.navigate('ParentLanding', { fullName });
      }, 800);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    // Auto verify if all digits are entered
    if (newOtp.every(digit => digit !== '') && index === 3) {
      setTimeout(() => {
        navigation.navigate('ParentLanding', { fullName });
      }, 500);
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft color={COLORS.gray[700]} size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.iconCircle}>
            <ShieldCheck color={COLORS.accent} size={40} />
          </View>
          
          <Text style={styles.title}>Tasdiqlash kodi</Text>
          <Text style={styles.subtitle}>
            +998 {phoneNumber} raqamiga yuborilgan 4 xonali kodni kiriting
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => inputRefs.current[index] = ref}
                style={[
                  styles.otpInput,
                  digit ? styles.otpInputActive : null
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={value => handleOtpChange(value, index)}
                onKeyPress={e => handleKeyPress(e, index)}
              />
            ))}
          </View>

          <View style={styles.timerContainer}>
            <Timer size={16} color={COLORS.gray[400]} />
            <Text style={styles.timerText}>
              00:{counter < 10 ? `0${counter}` : counter}
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.resendBtn}
            disabled={counter > 0}
          >
            <Text style={[styles.resendText, counter > 0 && { opacity: 0.5 }]}>
              Kodni qayta yuborish
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainBtn}
            onPress={() => navigation.navigate('ParentLanding', { fullName })}
          >
            <LinearGradient
              colors={[COLORS.accent, '#F59E0B']}
              style={styles.btnGradient}
            >
              <Text style={styles.btnText}>Tasdiqlash</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
  header: {
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
  content: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    paddingTop: 40,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.accent + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.gray[900],
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray[500],
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  otpInput: {
    width: 64,
    height: 72,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#F1F5F9',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.gray[900],
    ...SHADOWS.light,
  },
  otpInputActive: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.white,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.gray[400],
  },
  resendBtn: {
    padding: 10,
    marginBottom: 40,
  },
  resendText: {
    color: COLORS.accent,
    fontWeight: '800',
    fontSize: 14,
  },
  mainBtn: {
    width: '100%',
    borderRadius: 20,
    ...SHADOWS.medium,
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
});

export default ParentOTP;
