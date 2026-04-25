import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput, 
  Image, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme.js';
import { Camera, Check, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLevels } from '../../context/LevelContext.js';

const AVATARS = [
  require('../../../assets/avatar_1_new.png'),
  require('../../../assets/avatar_2_new.png'),
  require('../../../assets/avatar_3_new.png'),
  require('../../../assets/avatar_4_new.png'),
];

const StudentProfileSetup = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const { updateUserProfile } = useLevels();

  const handleContinue = () => {
    if (username.trim().length < 3) {
      alert("Iltimos, ismingizni kiriting (kamida 3 ta belgi)");
      return;
    }
    
    // Save to context
    updateUserProfile(username, selectedAvatar);
    
    // Navigate to OTP (or directly to Dashboard for now if user wants)
    navigation.navigate('StudentDashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* Step Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '33.3%' }]} />
            </View>
            <View style={styles.progressTextContainer}>
              <Text style={styles.progressStepText}>1-bosqich: Qahramonni tanlash</Text>
              <Text style={styles.progressTotalText}>1 / 3</Text>
            </View>
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>O'z qahramoningni tanla</Text>
            <Text style={styles.subtitle}>Qahramon va ism tanlang</Text>
          </View>

          {/* Avatar Selection */}
          <View style={styles.avatarSection}>
            <View style={styles.mainAvatarContainer}>
              <View style={styles.mainAvatarCircle}>
                <Image source={AVATARS[selectedAvatar]} style={styles.mainAvatar} />
              </View>
              <View style={styles.cameraIcon}>
                <Camera color={COLORS.white} size={18} />
              </View>
            </View>

            <View style={styles.avatarList}>
              {AVATARS.map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  onPress={() => setSelectedAvatar(index)}
                  style={[
                    styles.avatarThumb,
                    selectedAvatar === index && styles.selectedThumb
                  ]}
                >
                  <Image source={item} style={styles.thumbImage} />
                  {selectedAvatar === index && (
                    <View style={styles.checkBadge}>
                      <Check color={COLORS.white} size={10} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Name Input */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Ismingiz</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Ism va sharifingizni kiriting..."
                placeholderTextColor={COLORS.gray[300]}
                value={username}
                onChangeText={setUsername}
                autoFocus={true}
              />
            </View>
            <Text style={styles.inputHint}>Bu ism ilovada foydalanuvchi nomi sifatida ko'rinadi</Text>
          </View>

          {/* Continue Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleContinue}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryDark]}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Davom etish</Text>
                <ArrowRight color={COLORS.white} size={20} />
              </LinearGradient>
            </TouchableOpacity>
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
  scrollContent: {
    flexGrow: 1,
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  progressContainer: {
    marginBottom: SPACING.lg,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.gray[100],
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressStepText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.gray[500],
  },
  progressTotalText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
  },
  header: {
    marginTop: SPACING.md,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.primary,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '600',
  },
  avatarSection: {
    alignItems: 'center',
    marginVertical: SPACING.xxl,
  },
  mainAvatarContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
    marginBottom: SPACING.xl,
    padding: 6,
    borderWidth: 2,
    borderColor: COLORS.primary + '30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainAvatarCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 70,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  mainAvatar: {
    width: 110,
    height: 110,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.secondary,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: COLORS.white,
    ...SHADOWS.medium,
  },
  avatarList: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 10,
  },
  avatarThumb: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#F8FAFC',
    borderWidth: 2,
    borderColor: COLORS.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  selectedThumb: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
    transform: [{ scale: 1.05 }],
  },
  thumbImage: {
    width: 52,
    height: 52,
  },
  checkBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: COLORS.primary,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
    ...SHADOWS.light,
  },
  inputSection: {
    marginTop: SPACING.md,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.gray[600],
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    backgroundColor: COLORS.gray[50],
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.gray[100],
    paddingHorizontal: SPACING.lg,
    height: 60,
    justifyContent: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray[900],
  },
  inputHint: {
    fontSize: 12,
    color: COLORS.gray[400],
    marginTop: 8,
    marginLeft: 4,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: SPACING.xl,
  },
  button: {
    ...SHADOWS.medium,
  },
  buttonGradient: {
    height: 64,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default StudentProfileSetup;
