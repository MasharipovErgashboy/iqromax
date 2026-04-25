import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Dimensions
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme.js';
import { ArrowRight, Fingerprint, Sparkles, CheckCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const ParentLanding = ({ navigation, route }) => {
  const { fullName } = route.params || {};
  const [childId, setChildId] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Loop floating animations
    const float = (anim, toValue) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    float(floatAnim1, -20);
    float(floatAnim2, 15);
  }, []);

  const handleConnect = () => {
    if (childId.length < 4) {
      alert("Iltimos, farzandingizning to'g'ri ID raqamini kiriting");
      return;
    }
    navigation.navigate('ParentDashboard', { childId });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Dynamic Background Elements */}
      <Animated.View style={[styles.bgCircle1, { transform: [{ translateY: floatAnim1 }] }]} />
      <Animated.View style={[styles.bgCircle2, { transform: [{ translateY: floatAnim2 }] }]} />
      <LinearGradient
        colors={['#FFFFFF', '#F0FDF4', '#F8FAFB']}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <Animated.View style={[
            styles.content,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}>
            
            <View style={styles.header}>
              <View style={styles.badge}>
                <Sparkles color={COLORS.primary} size={14} />
                <Text style={styles.badgeText}>MUVAFFAQIYATLI RO'YXATDAN O'TINGIZ</Text>
              </View>
              <Text style={styles.welcomeText}>Xush kelibsiz, {fullName?.split(' ')[0]}!</Text>
              <Text style={styles.title}>Farzandingiz hisobini ulaymiz</Text>
              <Text style={styles.subtitle}>
                Farzandingiz yutuqlarini kuzatish uchun uning ID raqamini kiriting
              </Text>
            </View>

            <View style={[styles.glassCard, isFocused && styles.glassCardActive]}>
              <View style={styles.iconContainer}>
                <LinearGradient
                  colors={[COLORS.primary, COLORS.primaryDark]}
                  style={styles.iconCircle}
                >
                  <Fingerprint color={COLORS.white} size={32} />
                </LinearGradient>
                {childId.length >= 5 && (
                  <View style={styles.successCheck}>
                    <CheckCircle color={COLORS.white} size={16} />
                  </View>
                )}
              </View>
              
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Farzandingiz ID raqami</Text>
                <View style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}>
                  <TextInput
                    style={styles.input}
                    placeholder="45892"
                    value={childId}
                    onChangeText={setChildId}
                    keyboardType="number-pad"
                    placeholderTextColor={COLORS.gray[300]}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    selectionColor={COLORS.primary}
                  />
                </View>
                <View style={styles.tipBox}>
                  <Text style={styles.tipText}>
                    💡 ID raqamni farzandingiz profilidan topishingiz mumkin
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.mainBtn}
                onPress={handleConnect}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={[COLORS.primary, COLORS.primaryDark]}
                  style={styles.btnGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.btnText}>Davom etish</Text>
                  <ArrowRight color={COLORS.white} size={20} />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Xavfsiz va ishonchli ta'lim platformasi
              </Text>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bgCircle1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.primaryLight + '40',
    zIndex: 0,
  },
  bgCircle2: {
    position: 'absolute',
    bottom: height * 0.2,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: COLORS.primaryLight + '20',
    zIndex: 0,
  },
  content: {
    flex: 1,
    padding: SPACING.xl,
    justifyContent: 'center',
    zIndex: 1,
  },
  header: {
    marginBottom: 50,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.primary + '10',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.primary + '20',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.gray[500],
    marginBottom: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.gray[800],
    letterSpacing: -1.5,
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray[400],
    lineHeight: 26,
    marginTop: 16,
    fontWeight: '400',
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 40,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    ...SHADOWS.large,
    alignItems: 'center',
  },
  glassCardActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: COLORS.primary + '30',
  },
  iconContainer: {
    marginTop: -72,
    marginBottom: 32,
    position: 'relative',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  successCheck: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: COLORS.success,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  inputSection: {
    width: '100%',
    marginBottom: 32,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray[400],
    marginBottom: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  inputWrapper: {
    backgroundColor: '#F8FAFC',
    borderRadius: 24,
    height: 80,
    borderWidth: 2,
    borderColor: '#F1F5F9',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  inputWrapperFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  input: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.gray[800],
    textAlign: 'center',
    letterSpacing: 8,
  },
  tipBox: {
    marginTop: 20,
    backgroundColor: COLORS.gray[50],
    padding: 12,
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  tipText: {
    fontSize: 12,
    color: COLORS.gray[500],
    textAlign: 'center',
    fontWeight: '500',
  },
  mainBtn: {
    width: '100%',
    borderRadius: 22,
    ...SHADOWS.medium,
  },
  btnGradient: {
    height: 68,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  btnText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: COLORS.gray[300],
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

export default ParentLanding;
