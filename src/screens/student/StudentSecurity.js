import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, 
  Shield, 
  Lock, 
  Fingerprint, 
  Eye, 
  EyeOff, 
  Smartphone, 
  AlertTriangle,
  ChevronRight
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const StudentSecurity = ({ navigation }) => {
  const { theme, isDark } = useTheme();
  
  const [faceId, setFaceId] = useState(true);
  const [showPass, setShowPass] = useState(false);
  
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const SecurityItem = ({ icon: Icon, title, subtitle, value, onToggle, color = COLORS.primary, hasArrow = false }) => (
    <View style={[styles.securityItem, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
         <Icon color={color} size={22} />
      </View>
      <View style={styles.textContainer}>
         <Text style={[styles.itemTitle, { color: theme.text }]}>{title}</Text>
         <Text style={[styles.itemSubtitle, { color: theme.textSecondary }]}>{subtitle}</Text>
      </View>
      {onToggle ? (
        <Switch
          trackColor={{ false: '#CBD5E1', true: COLORS.primaryLight }}
          thumbColor={value ? COLORS.primary : '#F4F4F5'}
          onValueChange={onToggle}
          value={value}
        />
      ) : hasArrow ? (
        <ChevronRight color={COLORS.gray[300]} size={20} />
      ) : null}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <SafeAreaView edges={['top']}>
           <View style={styles.headerTop}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                 <ArrowLeft color={theme.text} size={24} />
              </TouchableOpacity>
              <Text style={[styles.headerTitle, { color: theme.text }]}>Xavfsizlik</Text>
              <View style={{ width: 40 }} />
           </View>
        </SafeAreaView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
         
         <View style={styles.heroSection}>
            <View style={[styles.shieldContainer, { backgroundColor: COLORS.primary + '10' }]}>
               <Shield color={COLORS.primary} size={64} />
               <View style={styles.checkBadge}>
                  <Text style={styles.checkText}>✓</Text>
               </View>
            </View>
            <Text style={[styles.heroTitle, { color: theme.text }]}>Hisobingiz himoyalangan</Text>
            <Text style={[styles.heroSub, { color: theme.textSecondary }]}>Sizning shaxsiy ma'lumotlaringiz va natijalaringiz xavfsiz holatda.</Text>
         </View>

         <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>BIOMETRIYA VA KIRISH</Text>
         <View style={styles.group}>
            <SecurityItem 
               icon={Fingerprint} 
               title="Biometrik kirish" 
               subtitle="FaceID yoki Barmoq izi orqali kirish"
               value={faceId}
               onToggle={() => setFaceId(!faceId)}
               color="#3B82F6"
            />
            <SecurityItem 
               icon={Smartphone} 
               title="Tanib olingan qurilmalar" 
               subtitle="Hozirda 1 ta qurilma faol"
               hasArrow={true}
               color="#10B981"
            />
         </View>

         <Text style={[styles.sectionHeader, { color: theme.textSecondary, marginTop: 30 }]}>PAROLNI O'ZGARTIRISH</Text>
         <View style={[styles.passwordBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.inputWrapper}>
               <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Joriy parol</Text>
               <View style={styles.inputRow}>
                  <TextInput 
                    style={[styles.input, { color: theme.text }]}
                    secureTextEntry={!showPass}
                    placeholder="••••••••"
                    placeholderTextColor={COLORS.gray[400]}
                  />
                  <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                     {showPass ? <EyeOff color={COLORS.gray[400]} size={20} /> : <Eye color={COLORS.gray[400]} size={20} />}
                  </TouchableOpacity>
               </View>
            </View>
            
            <View style={[styles.divider, { backgroundColor: theme.border }]} />

            <View style={styles.inputWrapper}>
               <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Yangi parol</Text>
               <TextInput 
                 style={[styles.input, { color: theme.text }]}
                 secureTextEntry={!showPass}
                 placeholder="Kamida 8 ta belgidan iborat"
                 placeholderTextColor={COLORS.gray[400]}
               />
            </View>
            
            <TouchableOpacity style={styles.updateBtn}>
               <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.btnGradient}>
                  <Text style={styles.btnText}>PAROLNI YANGILASH</Text>
               </LinearGradient>
            </TouchableOpacity>
         </View>

         <View style={[styles.dangerBox, { borderColor: COLORS.error + '40' }]}>
            <AlertTriangle color={COLORS.error} size={20} />
            <View style={{ flex: 1 }}>
               <Text style={[styles.dangerTitle, { color: COLORS.error }]}>Hisobni o'chirish</Text>
               <Text style={styles.dangerSub}>Bu amalni ortga qaytarib bo'lmaydi.</Text>
            </View>
         </View>

         <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 15, ...SHADOWS.light },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 60 },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '900' },
  
  scrollContent: { padding: 25 },
  heroSection: { alignItems: 'center', marginBottom: 40 },
  shieldContainer: { width: 120, height: 120, borderRadius: 60, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  checkBadge: { position: 'absolute', bottom: 5, right: 5, backgroundColor: COLORS.primary, width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: 'white' },
  checkText: { color: 'white', fontWeight: '900', fontSize: 16 },
  heroTitle: { fontSize: 22, fontWeight: '900', marginBottom: 10 },
  heroSub: { fontSize: 13, textAlign: 'center', lineHeight: 20, paddingHorizontal: 20 },

  sectionHeader: { fontSize: 12, fontWeight: '800', marginBottom: 15, letterSpacing: 1 },
  group: { gap: 12 },
  securityItem: { flexDirection: 'row', alignItems: 'center', padding: 18, borderRadius: 24, borderWidth: 1, ...SHADOWS.light },
  iconBox: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  textContainer: { flex: 1, paddingHorizontal: 15 },
  itemTitle: { fontSize: 16, fontWeight: '700' },
  itemSubtitle: { fontSize: 12, marginTop: 2 },

  passwordBox: { borderRadius: 30, borderWidth: 1, padding: 25, ...SHADOWS.light },
  inputWrapper: { paddingVertical: 10 },
  inputLabel: { fontSize: 12, fontWeight: '800', marginBottom: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, fontSize: 16, fontWeight: '600', paddingVertical: 5 },
  divider: { height: 1, marginVertical: 10 },
  
  updateBtn: { marginTop: 20, borderRadius: 18, overflow: 'hidden', ...SHADOWS.medium },
  btnGradient: { paddingVertical: 15, alignItems: 'center' },
  btnText: { color: 'white', fontSize: 14, fontWeight: '900', letterSpacing: 0.5 },

  dangerBox: { flexDirection: 'row', alignItems: 'center', gap: 15, padding: 20, borderRadius: 24, borderWidth: 1, marginTop: 30, backgroundColor: COLORS.error + '05' },
  dangerTitle: { fontSize: 16, fontWeight: '800' },
  dangerSub: { fontSize: 12, color: COLORS.gray[500], marginTop: 2 },
});

export default StudentSecurity;
