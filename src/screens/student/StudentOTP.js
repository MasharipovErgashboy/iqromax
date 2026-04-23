import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme.js';
import { ArrowLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const StudentOTP = ({ navigation, route }) => {
  const { phoneNumber } = route.params || { phoneNumber: '+998 00 000 00 00' };
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(59);

  useEffect(() => {
    // Timer Logic
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // OTP Simulation Logic
    const simulationTimeout = setTimeout(() => {
      setOtp('1234');
      // Briefly show the code then navigate
      setTimeout(() => {
        navigation.navigate('StudentDashboard', {
          user: {
            name: route.params?.username || 'O\'quvchi',
            avatar: route.params?.avatarIndex || 0
          }
        });
      }, 800);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(simulationTimeout);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color={COLORS.gray[700]} size={24} />
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Tasdiqlash</Text>
            <Text style={styles.subtitle}>
              Sms kod <Text style={styles.phoneHighlight}>{phoneNumber}</Text> raqamiga yuborildi
            </Text>
          </View>

          <View style={styles.otpContainer}>
            <TextInput
              style={styles.otpInput}
              placeholder="— — — —"
              keyboardType="number-pad"
              maxLength={4}
              value={otp}
              onChangeText={setOtp}
              letterSpacing={10}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('StudentDashboard')}
          >
            <LinearGradient
              colors={[COLORS.primary, COLORS.primaryDark]}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Tasdiqlash</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.resendContainer}>
            {timer > 0 ? (
              <Text style={styles.resendText}>
                Kodni qayta yuborish: <Text style={styles.timerText}>00:{timer < 10 ? `0${timer}` : timer}</Text>
              </Text>
            ) : (
              <TouchableOpacity>
                <Text style={[styles.resendText, styles.resendLink]}>Kodni qayta yuborish</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
  },
  header: {
    marginBottom: SPACING.xxl,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.gray[900],
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray[500],
    lineHeight: 24,
  },
  phoneHighlight: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  otpContainer: {
    backgroundColor: COLORS.gray[100],
    borderRadius: BORDER_RADIUS.md,
    height: 80,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpInput: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.gray[900],
    textAlign: 'center',
    width: '100%',
  },
  button: {
    width: '100%',
    ...SHADOWS.medium,
    marginBottom: SPACING.xl,
  },
  buttonGradient: {
    height: 60,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    fontSize: 14,
    color: COLORS.gray[500],
  },
  timerText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  resendLink: {
    color: COLORS.primary,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default StudentOTP;
