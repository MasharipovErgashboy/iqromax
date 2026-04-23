import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Switch,
  Modal,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  Shield, 
  Bell, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Star,
  Award,
  Wallet,
  Clock,
  Moon,
  Sun,
  Languages,
  UserCheck,
  TrendingUp,
  Briefcase
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS, GLASS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';
import PremiumBackground from '../../components/PremiumBackground';

const { width } = Dimensions.get('window');

const SettingsItem = ({ icon: Icon, title, sub, color, onPress, theme, isLast = false, rightElement }) => (
  <TouchableOpacity 
    onPress={onPress}
    activeOpacity={0.7}
    style={[
      styles.settingsItem, 
      !isLast && { borderBottomWidth: 1, borderBottomColor: theme.border }
    ]}
  >
    <View style={[styles.itemIconBg, { backgroundColor: color + '12' }]}>
       <Icon color={color} size={22} />
    </View>
    <View style={styles.itemTextContainer}>
       <Text style={[styles.itemTitle, { color: theme.text }]}>{title}</Text>
       {sub && <Text style={[styles.itemSub, { color: theme.textSecondary }]}>{sub}</Text>}
    </View>
    {rightElement || <ChevronRight color={theme.textSecondary} size={18} strokeWidth={2.5} />}
  </TouchableOpacity>
);

const LanguageModal = ({ visible, onClose, theme, currentLang, onSelect, isDark }) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.modalOverlay}>
       <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} activeOpacity={1} />
       <View style={[styles.langModal, isDark ? GLASS.dark : GLASS.light, { borderColor: theme.border, borderWidth: 1 }]}>
          <View style={[styles.modalIndicator, { backgroundColor: theme.border }]} />
          <Text style={[styles.modalTitle, { color: theme.text }]}>Platforma tilini tanlang</Text>
          
          <View style={styles.langList}>
            {[
              { id: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
              { id: 'ru', name: "Русский", flag: '🇷🇺' },
              { id: 'en', name: "English", flag: '🇺🇸' }
            ].map((lang) => (
              <TouchableOpacity 
                key={lang.id} 
                activeOpacity={0.6}
                style={[styles.langItem, { backgroundColor: currentLang === lang.id ? COLORS.secondary + '10' : 'transparent' }]}
                onPress={() => onSelect(lang)}
              >
                 <View style={styles.langLeft}>
                    <Text style={styles.langFlag}>{lang.flag}</Text>
                    <Text style={[styles.langName, { color: theme.text, fontWeight: currentLang === lang.id ? '800' : '600' }]}>{lang.name}</Text>
                 </View>
                 {currentLang === lang.id && (
                   <View style={styles.checkCircle}>
                     <View style={styles.checkInner} />
                   </View>
                 )}
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
             <LinearGradient
               colors={[COLORS.secondary, '#d97706']}
               style={styles.closeBtnGradient}
             >
               <Text style={styles.closeBtnText}>Tasdiqlash</Text>
             </LinearGradient>
          </TouchableOpacity>
       </View>
    </View>
  </Modal>
);

const TeacherProfile = ({ navigation }) => {
  const { isDark, theme, toggleTheme } = useTheme();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({ id: 'uz', name: "O'zbekcha" });

  const handleLogout = () => {
    navigation.navigate('Landing');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" />
      <PremiumBackground color1={COLORS.secondary} color2={COLORS.primary} />
      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
        stickyHeaderIndices={[0]}
      >
        {/* Transparent Spacer for Sticky Feel */}
        <View style={{ height: 0 }} />

        {/* Header Section */}
        <View style={styles.headerWrapper}>
          <LinearGradient
            colors={[COLORS.secondary, '#d97706', COLORS.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <SafeAreaView edges={['top']} style={styles.safeHeader}>
              <View style={styles.headerTop}>
                <Text style={styles.headerTitle}>Profil</Text>
                <TouchableOpacity 
                  style={styles.headerIconBtn}
                  onPress={() => navigation.navigate('TeacherSettings')}
                >
                  <Award color={COLORS.white} size={22} />
                </TouchableOpacity>
              </View>
            </SafeAreaView>

            <View style={styles.profileHero}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatarGlow} />
                <Image 
                  source={{ uri: 'https://i.pravatar.cc/150?u=teacher' }} 
                  style={styles.avatar} 
                />
                <LinearGradient
                  colors={['#FBBF24', '#D97706']}
                  style={styles.proBadge}
                >
                  <UserCheck color={COLORS.white} size={14} strokeWidth={3} />
                </LinearGradient>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Sardor Karimov</Text>
                <View style={styles.tagRow}>
                  <View style={styles.tagPill}>
                    <Briefcase color={COLORS.white} size={12} />
                    <Text style={styles.tagText}>Senior Mentor</Text>
                  </View>
                  <Text style={styles.locationText}>Toshkent, UZ</Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Stats Bar */}
          <View style={[styles.statsBar, isDark ? GLASS.dark : GLASS.light]}>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: theme.text }]}>4.9</Text>
              <View style={styles.statLabelRow}>
                <Star color="#FBBF24" fill="#FBBF24" size={12} />
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Reyting</Text>
              </View>
            </View>
            <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: theme.text }]}>128</Text>
              <View style={styles.statLabelRow}>
                <TrendingUp color={COLORS.secondary} size={12} />
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>O'quvchilar</Text>
              </View>
            </View>
            <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: theme.text }]}>8.4k</Text>
              <View style={styles.statLabelRow}>
                <Clock color="#10B981" size={12} />
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Soat</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.mainContent}>
          {/* Account Card */}
          <View style={styles.contentSection}>
            <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>MOLIYAVIY HISOB</Text>
            <View style={[styles.glassCard, isDark ? GLASS.dark : GLASS.light]}>
              <SettingsItem 
                icon={Wallet} 
                title="Mening balansim" 
                sub="2,450,000 UZS" 
                color="#10B981" 
                theme={theme}
                onPress={() => navigation.navigate('TeacherBalance')}
              />
              <SettingsItem 
                icon={Clock} 
                title="Ish tarixi va to'lovlar" 
                sub="Oxirgi tranzaksiyalar" 
                color="#0EA5E9" 
                theme={theme}
                isLast={true}
                onPress={() => navigation.navigate('WorkHistory')}
              />
            </View>
          </View>

          {/* Settings Card */}
          <View style={styles.contentSection}>
            <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>ILOVA SOZLAMALARI</Text>
            <View style={[styles.glassCard, isDark ? GLASS.dark : GLASS.light]}>
              <SettingsItem 
                icon={Shield} 
                title="Xavfsizlik markazi" 
                sub="Biometrika va parollar" 
                color="#6366F1" 
                theme={theme}
                onPress={() => navigation.navigate('TeacherSecurity')}
              />
              <SettingsItem 
                icon={isDark ? Moon : Sun} 
                title="Tizim mavzusi" 
                sub={isDark ? "Tungi rejim faol" : "Kunduzgi rejim faol"}
                color="#F59E0B" 
                theme={theme}
                rightElement={
                  <Switch 
                     value={isDark} 
                     onValueChange={toggleTheme} 
                     trackColor={{ false: '#CBD5E1', true: COLORS.secondary }}
                     thumbColor={COLORS.white}
                     ios_backgroundColor="#CBD5E1"
                  />
                }
              />
              <SettingsItem 
                icon={Bell} 
                title="Bildirishnomalar" 
                sub="Push va SMS sozlamalari"
                color="#EC4899" 
                theme={theme}
                onPress={() => navigation.navigate('TeacherNotifSettings')}
              />
              <SettingsItem 
                icon={Languages} 
                title="Platforma tili" 
                sub={selectedLang.name}
                color="#14B8A6" 
                theme={theme}
                onPress={() => setIsLanguageOpen(true)}
              />
              <SettingsItem 
                icon={HelpCircle} 
                title="Yordam va texnik xizmat" 
                color="#8B5CF6" 
                theme={theme}
                isLast={true}
                onPress={() => navigation.navigate('TeacherHelpCenter')}
              />
            </View>
          </View>

          <LanguageModal 
            visible={isLanguageOpen} 
            onClose={() => setIsLanguageOpen(false)}
            theme={theme}
            currentLang={selectedLang.id}
            isDark={isDark}
            onSelect={(lang) => {
              setSelectedLang(lang);
              setIsLanguageOpen(false);
            }}
          />

          {/* Logout Section */}
          <TouchableOpacity 
            activeOpacity={0.8}
            style={[styles.logoutButton, { backgroundColor: isDark ? 'rgba(239, 68, 68, 0.08)' : '#FFF1F2' }]}
            onPress={handleLogout}
          >
             <LinearGradient
               colors={['#EF4444', '#DC2626']}
               style={styles.logoutIconBg}
             >
               <LogOut color={COLORS.white} size={18} />
             </LinearGradient>
             <Text style={styles.logoutBtnLabel}>Tizimdan xavfsiz chiqish</Text>
          </TouchableOpacity>

          <View style={styles.footerInfo}>
            <Text style={[styles.versionTag, { color: theme.textSecondary }]}>IQROMAX PRO • VERSYA 2.1.0</Text>
            <Text style={[styles.copyright, { color: theme.textSecondary }]}>Designed for Educators by Punyo Team</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 60 },
  headerWrapper: {
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  headerGradient: {
    paddingBottom: 50,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    ...SHADOWS.medium,
  },
  safeHeader: {
    paddingHorizontal: 25,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  headerIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHero: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginTop: 20,
    gap: 20,
  },
  avatarContainer: {
    position: 'relative',
    width: 90,
    height: 90,
  },
  avatarGlow: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.3)',
    top: -5,
    left: -5,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  proBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 12,
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 5,
  },
  tagText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },
  locationText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '600',
  },
  statsBar: {
    flexDirection: 'row',
    marginHorizontal: 25,
    marginTop: -35,
    borderRadius: 24,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
    ...SHADOWS.medium,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
  },
  statLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  statDivider: {
    width: 1,
    height: 30,
    opacity: 0.3,
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  contentSection: {
    marginTop: 25,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 12,
    marginLeft: 8,
  },
  glassCard: {
    borderRadius: 24,
    overflow: 'hidden',
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 15,
  },
  itemIconBg: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  itemSub: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    padding: 18,
    borderRadius: 22,
    gap: 15,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.1)',
  },
  logoutIconBg: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutBtnLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#EF4444',
  },
  footerInfo: {
    alignItems: 'center',
    marginTop: 35,
    paddingBottom: 20,
  },
  versionTag: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  copyright: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
    opacity: 0.6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 25,
  },
  langModal: {
    borderRadius: 32,
    padding: 24,
    ...SHADOWS.medium,
  },
  modalIndicator: {
    width: 40,
    height: 5,
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 20,
    opacity: 0.3,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 25,
  },
  langList: {
    gap: 12,
  },
  langItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 18,
  },
  langLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  langFlag: {
    fontSize: 24,
  },
  langName: {
    fontSize: 17,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.secondary,
  },
  closeBtn: {
    marginTop: 25,
  },
  closeBtnGradient: {
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  closeBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '900',
  },
});

export default TeacherProfile;
