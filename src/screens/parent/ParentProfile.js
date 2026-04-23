import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SHADOWS, GLASS } from '../../constants/theme.js';
import { User, Settings, Shield, Bell, CreditCard, LogOut, ChevronRight, HelpCircle, Crown } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext.js';
import ParentPremiumBackground from '../../components/ParentPremiumBackground';
import { BlurView } from 'expo-blur';

const ParentProfile = ({ navigation, route }) => {
  const { isDark, theme } = useTheme();
  const parentName = route.params?.parentName || 'Azizbekning Otasi';
  
  const MENU_SECTIONS = [
    {
      title: 'Hisob sozlamalari',
      items: [
        { icon: User, label: 'Shaxsiy ma\'lumotlar', color: '#6366F1', screen: 'PersonalInfo' },
        { icon: Shield, label: 'Xavfsizlik', color: '#10B981', screen: 'Security' },
        { icon: CreditCard, label: "To'lovlar tarixi", color: '#F59E0B', screen: 'PaymentHistory' },
      ]
    },
    {
      title: 'Ilova',
      items: [
        { icon: Bell, label: 'Bildirishnomalar', color: '#EF4444', screen: 'NotificationSettings' },
        { icon: HelpCircle, label: 'Yordam markazi', color: '#0EA5E9', screen: 'HelpCenter' },
        { icon: Settings, label: 'Sozlamalar', color: '#64748B', screen: 'AppSettings' },
      ]
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <ParentPremiumBackground color1={isDark ? '#059669' : '#10B981'} color2={isDark ? '#0F172A' : '#1E293B'} />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
             <View style={styles.avatarContainer}>
                <BlurView intensity={isDark ? 40 : 60} style={[styles.avatarOutline, isDark ? GLASS.dark : GLASS.light]}>
                   <Image 
                     source={require('../../../assets/avatar_blue.png')} 
                     style={styles.avatar} 
                   />
                </BlurView>
                <TouchableOpacity style={[styles.editBadge, { backgroundColor: isDark ? '#10B981' : '#0F172A' }]} onPress={() => navigation.navigate('AppSettings')}>
                   <Settings color={COLORS.white} size={14} />
                </TouchableOpacity>
             </View>
             <Text style={[styles.userName, { color: theme.text }]}>{parentName}</Text>
             <TouchableOpacity 
               style={[styles.roleBadge, { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)' }]}
               onPress={() => navigation.navigate('Subscription')}
             >
                <Crown color="#10B981" size={10} fill="#10B981" style={{ marginRight: 4 }} />
                <Text style={[styles.roleText, { color: '#10B981' }]}>PREMIUMGA O'TISH</Text>
             </TouchableOpacity>
          </View>

          {/* Menu Sections */}
          {MENU_SECTIONS.map((section, sIndex) => (
            <View key={sIndex} style={styles.section}>
               <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>{section.title}</Text>
               <BlurView intensity={isDark ? 30 : 50} style={[styles.menuCard, isDark ? GLASS.dark : GLASS.light]}>
                  {section.items.map((item, iIndex) => (
                     <TouchableOpacity 
                       key={iIndex} 
                       style={[styles.menuItem, iIndex < section.items.length - 1 && { borderBottomWidth: 1, borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9' }]}
                       activeOpacity={0.7}
                       onPress={() => item.screen && navigation.navigate(item.screen)}
                     >
                        <View style={[styles.iconBox, { backgroundColor: item.color + '20' }]}>
                           <item.icon color={item.color} size={20} />
                        </View>
                        <Text style={[styles.menuLabel, { color: theme.text }]}>{item.label}</Text>
                        <ChevronRight color={theme.textSecondary} size={18} />
                     </TouchableOpacity>
                  ))}
               </BlurView>
            </View>
          ))}

          {/* Logout */}
          <TouchableOpacity 
            style={styles.logoutBtnWrapper}
            onPress={() => navigation.navigate('Landing')}
          >
             <BlurView intensity={isDark ? 20 : 40} style={[styles.logoutBtn, isDark ? GLASS.dark : GLASS.light, { borderColor: '#EF444440', borderWidth: 1 }]}>
                <View style={[styles.logoutIconBox, { backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)' }]}>
                   <LogOut color="#EF4444" size={20} strokeWidth={2.5} />
                </View>
                <Text style={[styles.logoutText, { color: '#EF4444' }]}>Tizimdan chiqish</Text>
             </BlurView>
          </TouchableOpacity>
          
          <Text style={[styles.versionText, { color: theme.textSecondary }]}>Versiya 1.2.0 (Stable)</Text>
        </ScrollView>
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
  scrollContent: {
    paddingBottom: 110,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatarOutline: {
    width: 100,
    height: 100,
    borderRadius: 50,
    padding: 3,
    ...SHADOWS.medium,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  editBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  userName: {
    fontSize: 22,
    fontWeight: '900',
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  roleText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 12,
    paddingLeft: 5,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  menuCard: {
    borderRadius: 24,
    overflow: 'hidden',
    ...SHADOWS.light,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
  },
  logoutBtnWrapper: {
    marginHorizontal: 20,
    marginTop: 40,
    borderRadius: 24,
    overflow: 'hidden',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'center',
    gap: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '900',
  },
  logoutIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 20,
    fontWeight: '600',
  },
});

export default ParentProfile;
