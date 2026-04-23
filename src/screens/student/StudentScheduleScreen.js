import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Video, 
  Bell,
  MoreVertical,
  BookOpen,
  Users
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';
import StudentPremiumBackground from '../../components/StudentPremiumBackground';

const { width } = Dimensions.get('window');

const DAYS = [
  { id: '1', name: 'Du', date: '12', full: 'Dushanba' },
  { id: '2', name: 'Se', date: '13', full: 'Seshanba' },
  { id: '3', name: 'Cho', date: '14', full: 'Chorshanba' },
  { id: '4', name: 'Pay', date: '15', full: 'Payshanba' },
  { id: '5', name: 'Ju', date: '16', full: 'Juma' },
  { id: '6', name: 'Sha', date: '17', full: 'Shanba' },
];

const SCHEDULE_DATA = [
  {
    id: '1',
    time: '14:00',
    title: 'Mental Arifmetika Pro',
    subject: 'Abakus sirlari',
    teacher: 'Shoxruh Ustoz',
    status: 'LIVE',
    avatar: require('../../../assets/avatar_blue.png'),
    accent: '#22C55E'
  },
  {
    id: '2',
    time: '16:00',
    title: 'Mantiqiy Bilimdon',
    subject: 'Mantiqiy masalalar',
    teacher: 'Madina Ustoz',
    status: 'UPCOMING',
    avatar: require('../../../assets/avatar_red.png'),
    accent: '#3B82F6'
  },
  {
    id: '3',
    time: '18:00',
    title: 'Tezkor O\'qish',
    subject: 'Yangi metodikalar',
    teacher: 'Kamola Ustoz',
    status: 'UPCOMING',
    avatar: require('../../../assets/avatar_blue.png'),
    accent: '#F59E0B'
  },
];

const StudentScheduleScreen = ({ navigation }) => {
  const { isDark, theme } = useTheme();
  const [selectedDay, setSelectedDay] = useState('1');

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StudentPremiumBackground color1="#10B981" color2="#3B82F6" color3="#6366F1" />
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Header */}
      <LinearGradient colors={isDark ? ['#0F172A', '#1E293B'] : ['#FFFFFF', '#F8FAFB']} style={styles.header}>
        <SafeAreaView edges={['top']}>
           <View style={styles.headerTop}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                 <ArrowLeft color={theme.text} size={24} />
              </TouchableOpacity>
              <Text style={[styles.headerTitle, { color: theme.text }]}>Dars Jadvali</Text>
              <TouchableOpacity>
                 <Calendar color={theme.text} size={22} />
              </TouchableOpacity>
           </View>

           {/* Day Picker */}
           <ScrollView 
             horizontal 
             showsHorizontalScrollIndicator={false} 
             contentContainerStyle={styles.dayPicker}
           >
              {DAYS.map((day) => {
                const isActive = selectedDay === day.id;
                return (
                  <TouchableOpacity 
                    key={day.id} 
                    onPress={() => setSelectedDay(day.id)}
                    style={[
                      styles.dayItem, 
                      isActive && { backgroundColor: COLORS.primary }
                    ]}
                  >
                     <Text style={[styles.dayName, { color: isActive ? 'white' : COLORS.gray[400] }]}>{day.name}</Text>
                     <Text style={[styles.dayDate, { color: isActive ? 'white' : theme.text }]}>{day.date}</Text>
                     {isActive && <View style={styles.activeDot} />}
                  </TouchableOpacity>
                );
              })}
           </ScrollView>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.statsRow}>
           <Text style={[styles.sectionTitle, { color: theme.text }]}>Bugungi darslar</Text>
           <Text style={[styles.countText, { color: COLORS.primary }]}>3 dars mavjud</Text>
        </View>

        <View style={styles.timeline}>
           {SCHEDULE_DATA.map((item, idx) => (
             <TouchableOpacity 
               key={item.id} 
               style={styles.timelineItem}
               onPress={() => navigation.navigate('LiveLessonDetail', { lesson: item })}
             >
                {/* Time Indicator */}
                <View style={styles.timeLineCol}>
                   <Text style={[styles.timeText, { color: theme.text }]}>{item.time}</Text>
                   <View style={[styles.line, { backgroundColor: theme.border }]} />
                </View>

                {/* Lesson Card */}
                <View style={[styles.lessonCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                   <View style={styles.cardHeader}>
                      <View style={[styles.statusBadge, { backgroundColor: item.accent + '20' }]}>
                         <View style={[styles.pDot, { backgroundColor: item.accent }]} />
                         <Text style={[styles.statusText, { color: item.accent }]}>{item.status}</Text>
                      </View>
                      <MoreVertical color={COLORS.gray[400]} size={16} />
                   </View>
                   
                   <Text style={[styles.cardTitle, { color: theme.text }]}>{item.title}</Text>
                   <View style={styles.subjectRow}>
                      <BookOpen color={COLORS.gray[400]} size={14} />
                      <Text style={[styles.subjectText, { color: theme.textSecondary }]}>{item.subject}</Text>
                   </View>

                   <View style={styles.cardFooter}>
                      <View style={styles.teacherInfo}>
                         <Image source={item.avatar} style={styles.teacherAvatar} />
                         <Text style={[styles.teacherName, { color: theme.text }]}>{item.teacher}</Text>
                      </View>
                      <TouchableOpacity style={[styles.actionBtn, { backgroundColor: item.accent }]}>
                         {item.status === 'LIVE' ? (
                           <Video color="white" size={16} />
                         ) : (
                           <Bell color="white" size={16} />
                         )}
                      </TouchableOpacity>
                   </View>
                </View>
             </TouchableOpacity>
           ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 25, borderBottomLeftRadius: 36, borderBottomRightRadius: 36, ...SHADOWS.medium },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 60, marginBottom: 20 },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '900' },
  
  dayPicker: { paddingRight: 20, gap: 15 },
  dayItem: { width: 62, height: 85, borderRadius: 22, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', gap: 5 },
  dayName: { fontSize: 12, fontWeight: '700' },
  dayDate: { fontSize: 18, fontWeight: '900' },
  activeDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', position: 'absolute', bottom: 10 },

  scrollContent: { padding: 25 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  sectionTitle: { fontSize: 22, fontWeight: '900' },
  countText: { fontSize: 14, fontWeight: '700', opacity: 0.8 },

  timeline: { gap: 0 },
  timelineItem: { flexDirection: 'row', gap: 20, marginBottom: 25 },
  timeLineCol: { width: 50, alignItems: 'center' },
  timeText: { fontSize: 13, fontWeight: '900', marginBottom: 10 },
  line: { width: 4, flex: 1, borderRadius: 2 },
  
  lessonCard: { flex: 1, padding: 20, borderRadius: 30, borderWidth: 1, ...SHADOWS.light },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  pDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 10, fontWeight: '900' },
  
  cardTitle: { fontSize: 17, fontWeight: '800', marginBottom: 6 },
  subjectRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20 },
  subjectText: { fontSize: 12, fontWeight: '600' },
  
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  teacherInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  teacherAvatar: { width: 34, height: 34, borderRadius: 17 },
  teacherName: { fontSize: 13, fontWeight: '700' },
  actionBtn: { width: 40, height: 40, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
});

export default StudentScheduleScreen;
