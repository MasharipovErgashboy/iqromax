import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme.js';
import { Phone, ArrowLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const StudentLogin = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('+998');

  const handlePhoneChange = (text) => {
    // Prevent deleting the prefix
    if (text.startsWith('+998')) {
      setPhoneNumber(text);
    } else if (text === '' || text === '+') {
      setPhoneNumber('+998');
    }
  };

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
            <Text style={styles.title}>Kirish</Text>
            <Text style={styles.subtitle}>O'quvchi profili uchun telefon raqamingizni kiriting</Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.iconWrapper}>
              <Phone color={COLORS.primary} size={20} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="+998 (00) 000-00-00"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              placeholderTextColor={COLORS.gray[400]}
              maxLength={13}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('StudentProfileSetup', { phoneNumber })}
          >
            <LinearGradient
              colors={[COLORS.primary, COLORS.primaryDark]}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Kodni yuborish</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Sms kod orqali ro'yxatdan o'tishni tasdiqlashingiz kerak bo'ladi.
          </Text>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray[100],
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 60,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  iconWrapper: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: COLORS.gray[900],
    fontWeight: '500',
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
  footerText: {
    fontSize: 14,
    color: COLORS.gray[400],
    textAlign: 'center',
  },
});

export default StudentLogin;
