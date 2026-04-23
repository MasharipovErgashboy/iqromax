import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Platform,
  Animated,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, GLASS } from '../../constants/theme.js';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Bell, 
  Search, 
  Plus, 
  Calendar, 
  Clock, 
  ChevronRight,
  MoreVertical,
  Star,
  Zap,
  LayoutGrid,
  X,
  History,
  TrendingUp as TrendingUpIcon
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext.js';
import PremiumBackground from '../../components/PremiumBackground';
import GamifiedButton from '../../components/GamifiedButton';

const { width, height } = Dimensions.get('window');

const StatCard = ({ title, value, icon: Icon, color, theme, isDark }) => (
  <View style={[styles.statCard, isDark ? GLASS.dark : GLASS.light]}>
    <View style={[styles.statIconBox, { backgroundColor: color + '15' }]}>
      <Icon color={color} size={22} />
    </View>
    <View>
      <Text style={[styles.statTitle, { color: theme.textSecondary }]}>{title}</Text>
      <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
    </View>
  </View>
);

const TeacherDashboard = ({ navigation }) => {
  const { isDark, theme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pulse animation for Add Group button
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const hasNewStudents = true; 

  useEffect(() => {
    if (hasNewStudents) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <PremiumBackground color1={COLORS.secondary} color2={COLORS.primary} />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Top Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.textSecondary }]}>Xayrli kun,</Text>
            <Text style={[styles.name, { color: theme.text }]}>Sardor Karimov</Text>
          </View>
          <View style={styles.headerRight}>
             <TouchableOpacity 
                style={[styles.headerBtn, isDark ? GLASS.dark : GLASS.light]} 
                onPress={() => setIsSearchOpen(true)}
             >
                <Search color={theme.textSecondary} size={22} />
             </TouchableOpacity>
             <TouchableOpacity style={[styles.headerBtn, isDark ? GLASS.dark : GLASS.light]} onPress={() => navigation.navigate('TeacherNotifications')}>
                <Bell color={theme.textSecondary} size={22} />
                <View style={styles.notifDot} />
             </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Main Hero Card - Current Class */}
          <View style={styles.heroWrapper}>
            <LinearGradient
              colors={['#4F46E5', '#312E81']}
              style={styles.heroCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.heroTop}>
                 <View style={styles.liveBadge}>
                    <View style={styles.pulseDot} />
                    <Text style={styles.liveText}>HOZIR FAOLLIK</Text>
                 </View>
                 <TouchableOpacity>
                    <MoreVertical color="rgba(255,255,255,0.6)" size={20} />
                 </TouchableOpacity>
              </View>
              
              <View style={styles.heroMiddle}>
                 <Text style={styles.lessonTitle}>Abakus - Pro daraja</Text>
                 <Text style={styles.groupName}>"Alfa" guruhi • 12 nafar o'quvchi</Text>
              </View>

              <View style={styles.heroFooter}>
                 <View style={styles.timeTag}>
                    <Clock color="rgba(255,255,255,0.8)" size={14} />
                    <Text style={styles.timeText}>14:00 - 15:30</Text>
                 </View>
                 <GamifiedButton 
                    title="BOSHLASH"
                    onPress={() => navigation.navigate('TeacherLiveLesson')}
                    color={COLORS.white}
                    textStyle={{ color: '#4F46E5', fontSize: 12 }}
                    style={styles.heroButton}
                 />
              </View>
              <Image 
                 source={require('../../../assets/mascot.png')} 
                 style={styles.heroMascot}
                 opacity={0.15}
              />
            </LinearGradient>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
             <StatCard 
                title="O'quvchilar" 
                value="128" 
                icon={Users} 
                color="#0EA5E9" 
                theme={theme}
                isDark={isDark}
             />
             <StatCard 
                title="Darslar" 
                value="24" 
                icon={BookOpen} 
                color="#10B981" 
                theme={theme}
                isDark={isDark}
             />
             <StatCard 
                title="Reyting" 
                value="4.9" 
                icon={Star} 
                color="#FBBF24" 
                theme={theme}
                isDark={isDark}
             />
          </View>

          {/* Quick Actions */}
          <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 30, marginBottom: 15 }]}>Tezkor amallar</Text>
          
          <View style={styles.actionsGrid}>
             <Animated.View style={{ flex: 1, transform: [{ scale: pulseAnim }] }}>
               <TouchableOpacity 
                  style={[
                    styles.actionBtn, 
                    isDark ? GLASS.dark : GLASS.light,
                    { borderColor: COLORS.secondary, borderWidth: 1 }
                  ]} 
                  onPress={() => navigation.navigate('AddGroup')}
               >
                  <View style={[styles.actionIcon, { backgroundColor: '#F0FDF4' }]}>
                     <Plus color="#10B981" size={24} />
                  </View>
                  <Text style={[styles.actionLabel, { color: theme.text }]}>Guruh qo'shish</Text>
               </TouchableOpacity>
             </Animated.View>

             <TouchableOpacity style={[styles.actionBtn, isDark ? GLASS.dark : GLASS.light]} onPress={() => navigation.navigate('AssignHomework')}>
                <View style={[styles.actionIcon, { backgroundColor: '#F0F9FF' }]}>
                   <Zap color="#0EA5E9" size={24} />
                </View>
                <Text style={[styles.actionLabel, { color: theme.text }]}>Vazifa berish</Text>
             </TouchableOpacity>

             <TouchableOpacity style={[styles.actionBtn, isDark ? GLASS.dark : GLASS.light]} onPress={() => navigation.navigate('TeacherReports')}>
                <View style={[styles.actionIcon, { backgroundColor: '#FEFCE8' }]}>
                   <LayoutGrid color="#FBBF24" size={24} />
                </View>
                <Text style={[styles.actionLabel, { color: theme.text }]}>Hisobotlar</Text>
             </TouchableOpacity>
          </View>

          {/* Upcoming Schedule */}
          <View style={styles.sectionHeader}>
             <Text style={[styles.sectionTitle, { color: theme.text }]}>Bugungi darslar</Text>
             <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
                <Text style={styles.seeAll}>Barchasi</Text>
             </TouchableOpacity>
          </View>

          {[1, 2].map((item) => (
            <TouchableOpacity 
              key={item} 
              style={[styles.scheduleCard, isDark ? GLASS.dark : GLASS.light]}
              onPress={() => navigation.navigate('TeacherLessonDetail')}
            >
               <View style={[styles.timeSlot, { borderRightColor: theme.border }]}>
                  <Text style={[styles.timeStart, { color: theme.text }]}>16:00</Text>
                  <Text style={[styles.timeEnd, { color: theme.textSecondary }]}>17:30</Text>
               </View>
               <View style={styles.lessonInfo}>
                  <Text style={[styles.lessonName, { color: theme.text }]}>Mental Arifmetika</Text>
                  <Text style={[styles.lessonSub, { color: theme.textSecondary }]}>"Beta" guruhi</Text>
               </View>
               <ChevronRight color={theme.textSecondary} size={20} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
      
      {/* Floating Plus Button */}
      <TouchableOpacity style={styles.fab}>
         <LinearGradient
            colors={[COLORS.secondary, '#eab308']}
            style={styles.fabGradient}
         >
            <Plus color={COLORS.white} size={30} strokeWidth={3} />
         </LinearGradient>
      </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '600',
  },
  name: {
    fontSize: 22,
    fontWeight: '900',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  headerBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  notifDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  heroWrapper: {
    borderRadius: 32,
    ...SHADOWS.medium,
    marginTop: 10,
    overflow: 'hidden',
  },
  heroCard: {
    height: 190,
    padding: 25,
    justifyContent: 'space-between',
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4ADE80',
  },
  liveText: {
    color: '#4ADE80',
    fontSize: 10,
    fontWeight: '900',
  },
  heroMiddle: {
    marginTop: 5,
  },
  lessonTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '900',
  },
  groupName: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  heroFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  timeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },
  heroButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  heroMascot: {
    position: 'absolute',
    right: -20,
    bottom: -20,
    width: 130,
    height: 130,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 15,
    borderRadius: 24,
    ...SHADOWS.light,
    gap: 10,
  },
  statIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 11,
    fontWeight: '700',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  seeAll: {
    color: COLORS.secondary,
    fontWeight: '800',
    fontSize: 13,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 24,
    ...SHADOWS.light,
    gap: 12,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 11,
    fontWeight: '800',
  },
  scheduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 22,
    marginBottom: 12,
    ...SHADOWS.light,
  },
  timeSlot: {
    paddingRight: 15,
    borderRightWidth: 1,
    marginRight: 15,
    minWidth: 60,
  },
  timeStart: {
    fontSize: 15,
    fontWeight: '800',
  },
  timeEnd: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonName: {
    fontSize: 15,
    fontWeight: '800',
  },
  lessonSub: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 25,
    ...SHADOWS.medium,
  },
  fabGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TeacherDashboard;
