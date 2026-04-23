import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  Image,
  Animated,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SHADOWS, GLASS } from '../../constants/theme.js';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  Bell, 
  TrendingUp, 
  Award, 
  ChevronRight, 
  ShieldCheck, 
  BarChart2,
  Zap,
  Lightbulb,
  Crown
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import ParentPremiumBackground from '../../components/ParentPremiumBackground';

const { width } = Dimensions.get('window');

const ParentDashboard = ({ navigation, route }) => {
  const { isDark, theme } = useTheme();
  const [parentID] = useState(route.params?.parentID || 'PR-882299');
  const [childName] = useState(route.params?.username || 'Alisher K.');
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <ParentPremiumBackground color1={isDark ? '#059669' : '#10B981'} color2={isDark ? '#0F172A' : '#1E293B'} />
      
      <SafeAreaView style={styles.safeArea}>
        <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
          <View>
            <Text style={[styles.greeting, { color: theme.textSecondary }]}>Xush kelibsiz,</Text>
            <Text style={[styles.parentName, { color: theme.text }]}>Ota-ona paneli</Text>
          </View>
          <TouchableOpacity 
            style={[styles.bellBtn, isDark ? GLASS.dark : GLASS.light]} 
            onPress={() => navigation.navigate('Notifications')}
          >
            <Bell color={theme.text} size={24} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </Animated.View>

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          <LinearGradient
            colors={isDark ? ['#1E293B', '#020617'] : ['#1E293B', '#0F172A']}
            style={[styles.idCard, { borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', borderWidth: 1 }]}
          >
            <View style={styles.idCardTop}>
               <View style={styles.idBrand}>
                  <View style={[styles.dot, { backgroundColor: '#10B981' }]} />
                  <Text style={styles.idBrandText}>IQROMAX PARENT PRO</Text>
               </View>
               <ShieldCheck color="rgba(255,255,255,0.25)" size={40} strokeWidth={1.5} />
            </View>
            <View style={styles.idCardMiddle}>
               <Text style={styles.idNumber}>{parentID}</Text>
               <Text style={styles.idLabel}>SHAXSIY IDENTIFIKATOR</Text>
            </View>
            <View style={styles.idCardFooter}>
               <View>
                  <Text style={styles.footerLabel}>BIRIKTIRILGAN FARZAND</Text>
                  <Text style={styles.footerValue}>{childName}</Text>
               </View>
               <View style={[styles.statusBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)', borderColor: 'rgba(16, 185, 129, 0.4)' }]}>
                  <Text style={styles.statusText}>ACTIVE</Text>
               </View>
            </View>
          </LinearGradient>

          <View style={styles.sectionHeader}>
             <Text style={[styles.sectionTitle, { color: theme.text }]}>Farzandingiz natijalari</Text>
             <TouchableOpacity onPress={() => navigation.navigate('Reports')}>
                <Text style={styles.seeAll}>Batafsil</Text>
             </TouchableOpacity>
          </View>

          <View style={styles.statsGrid}>
             <View style={[styles.statCard, isDark ? GLASS.dark : GLASS.light]}>
                <View style={[styles.statIconBox, { backgroundColor: 'rgba(79, 70, 229, 0.12)' }]}>
                   <TrendingUp color={isDark ? '#818CF8' : '#4F46E5'} size={20} />
                </View>
                <Text style={[styles.statValue, { color: theme.text }]}>1,250</Text>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>To'plangan XP</Text>
             </View>
             <View style={[styles.statCard, isDark ? GLASS.dark : GLASS.light]}>
                <View style={[styles.statIconBox, { backgroundColor: 'rgba(194, 65, 12, 0.12)' }]}>
                   <Award color={isDark ? '#FB923C' : '#C2410C'} size={20} />
                </View>
                <Text style={[styles.statValue, { color: theme.text }]}>Lv. 12</Text>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>IQ Darajasi</Text>
             </View>
          </View>

          <View style={styles.goalSection}>
             <View style={[styles.goalCard, isDark ? GLASS.dark : GLASS.light]}>
                <View style={styles.goalInfo}>
                   <Text style={[styles.goalLabel, { color: theme.textSecondary }]}>KUNLIK REJA</Text>
                   <Text style={[styles.goalValue, { color: theme.text }]}>80%</Text>
                </View>
                <View style={styles.goalCircle}>
                   <Zap color={COLORS.secondary} size={24} fill={COLORS.secondary} />
                </View>
             </View>
             <View style={[styles.achievementsCard, isDark ? GLASS.dark : GLASS.light]}>
                <Text style={[styles.achTitle, { color: theme.textSecondary }]}>SO'NGGI YUTUQLAR</Text>
                <View style={styles.badgeRow}>
                   {['🥇', '🚀', '🧠', '📚'].map((emoji, i) => (
                     <View key={i} style={[styles.badgeIcon, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }]}>
                        <Text style={styles.badgeEmoji}>{emoji}</Text>
                     </View>
                   ))}
                </View>
             </View>
          </View>

          <TouchableOpacity style={[styles.monitorCard, isDark ? GLASS.dark : GLASS.light]} onPress={() => navigation.navigate('LessonDetail')}>
             <View style={styles.monitorContent}>
                <View style={styles.monitorLeft}>
                   <Text style={[styles.activityTitle, { color: theme.text }]}>Abakus Simulyatori</Text>
                   <Text style={[styles.activityDesc, { color: theme.textSecondary }]}>Farzandingiz hozirda misollar yechmoqda...</Text>
                </View>
                <BarChart2 color={COLORS.primary} size={32} />
             </View>
          </TouchableOpacity>

          <View style={[styles.insightCard, isDark ? GLASS.dark : GLASS.light]}>
             <View style={styles.insightContent}>
                <Lightbulb color={COLORS.secondary} size={24} />
                <View style={styles.insightTextContent}>
                   <Text style={[styles.insightTitle, { color: COLORS.secondary }]}>Tizim Maslahati</Text>
                   <Text style={[styles.insightText, { color: theme.textSecondary }]}>Xotira mashqlarini ko'paytirish foydali bo'ladi.</Text>
                </View>
             </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, paddingVertical: 15, zIndex: 10 },
  greeting: { fontSize: 14, fontWeight: '600' },
  parentName: { fontSize: 24, fontWeight: '900' },
  bellBtn: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', ...SHADOWS.light },
  notifDot: { position: 'absolute', top: 15, right: 15, width: 10, height: 10, borderRadius: 5, backgroundColor: '#EF4444', borderWidth: 2, borderColor: '#fff' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  idCard: { height: 200, borderRadius: 32, padding: 25, justifyContent: 'space-between', ...SHADOWS.medium, marginVertical: 10 },
  idCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  idBrand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  idBrandText: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '900', letterSpacing: 2 },
  idCardMiddle: { marginVertical: 10 },
  idNumber: { color: COLORS.white, fontSize: 32, fontWeight: '900', letterSpacing: 3 },
  idLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: '700', marginTop: 5 },
  idCardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  footerLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 9, fontWeight: '700', marginBottom: 4 },
  footerValue: { color: COLORS.white, fontSize: 16, fontWeight: '800' },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1 },
  statusText: { color: '#4ADE80', fontSize: 10, fontWeight: '900' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 25, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '900' },
  seeAll: { color: COLORS.accent, fontWeight: '800', fontSize: 14 },
  statsGrid: { flexDirection: 'row', gap: 15 },
  statCard: { flex: 1, borderRadius: 24, padding: 20, ...SHADOWS.light },
  statIconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  statValue: { fontSize: 22, fontWeight: '900' },
  statLabel: { fontSize: 12, fontWeight: '600', marginTop: 2 },
  monitorCard: { marginTop: 20, borderRadius: 24, overflow: 'hidden' },
  monitorContent: { flexDirection: 'row', padding: 20, alignItems: 'center', justifyContent: 'space-between' },
  activityTitle: { fontSize: 18, fontWeight: '900' },
  activityDesc: { fontSize: 12, marginTop: 4, fontWeight: '500' },
  insightCard: { marginTop: 20, borderRadius: 24, overflow: 'hidden' },
  insightContent: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 15 },
  insightTextContent: { flex: 1 },
  insightTitle: { fontSize: 16, fontWeight: '800' },
  insightText: { fontSize: 12, marginTop: 4, lineHeight: 18, fontWeight: '500' },
  goalSection: { flexDirection: 'row', gap: 15, marginTop: 20 },
  goalCard: { flex: 1.2, borderRadius: 24, padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...SHADOWS.light },
  goalInfo: { flex: 1 },
  goalLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  goalValue: { fontSize: 20, fontWeight: '900', marginVertical: 2 },
  goalCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(250, 204, 21, 0.1)', justifyContent: 'center', alignItems: 'center' },
  achievementsCard: { flex: 1, borderRadius: 24, padding: 15, ...SHADOWS.light },
  achTitle: { fontSize: 9, fontWeight: '800', letterSpacing: 1, marginBottom: 8 },
  badgeRow: { flexDirection: 'row' },
  badgeIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 6 },
  badgeEmoji: { fontSize: 16 }
});

export default ParentDashboard;
