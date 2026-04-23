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

const AVATARS = [
  require('../../../assets/mascot.png'),
  require('../../../assets/avatar_blue.png'),
  require('../../../assets/avatar_red.png'),
  require('../../../assets/avatar_yellow.png'),
];

const StudentProfileSetup = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const handleContinue = () => {
    if (username.trim().length < 3) {
      alert("Iltimos, ismingizni kiriting (kamida 3 ta belgi)");
      return;
    }
    // Navigate to OTP
    navigation.navigate('StudentOTP', { username, avatarIndex: selectedAvatar });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.header}>
            <Text style={styles.title}>Profilingizni yarating</Text>
            <Text style={styles.subtitle}>O'zingizga yoqadigan rasm va ism tanlang</Text>
          </View>

          {/* Avatar Selection */}
          <View style={styles.avatarSection}>
            <View style={styles.mainAvatarContainer}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryDark]}
                style={styles.mainAvatarGradient}
              >
                <Image source={AVATARS[selectedAvatar]} style={styles.mainAvatar} />
              </LinearGradient>
              <View style={styles.cameraIcon}>
                <Camera color={COLORS.white} size={16} />
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
    padding: SPACING.xl,
  },
  header: {
    marginTop: SPACING.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.gray[900],
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray[500],
    textAlign: 'center',
    marginTop: 8,
  },
  avatarSection: {
    alignItems: 'center',
    marginVertical: SPACING.xxl,
  },
  mainAvatarContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    padding: 5,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
    marginBottom: SPACING.xl,
  },
  mainAvatarGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  mainAvatar: {
    width: 100,
    height: 100,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: COLORS.secondary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  avatarList: {
    flexDirection: 'row',
    gap: 15,
  },
  avatarThumb: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.gray[100],
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedThumb: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  thumbImage: {
    width: 45,
    height: 45,
  },
  checkBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: COLORS.primary,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
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
