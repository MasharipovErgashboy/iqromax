import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Video, 
  ChevronLeft, 
  ChevronRight,
  Plus
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS, GLASS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';
import PremiumBackground from '../../components/PremiumBackground';

const { width } = Dimensions.get('window');

const DateItem = ({ date, day, isSelected, isDark, theme }) => (
  <TouchableOpacity 
    style={[
      styles.dateItem, 
      isSelected ? { backgroundColor: COLORS.secondary } : (isDark ? GLASS.dark : GLASS.light)
    ]}
  >
    <Text style={[styles.dayText, { color: isSelected ? COLORS.white : theme.textSecondary }]}>{day}</Text>
    <Text style={[styles.dateText, { color: isSelected ? COLORS.white : theme.text }]}>{date}</Text>
  </TouchableOpacity>
);

const LessonItem = ({ lesson, isLast, isDark, theme, navigation }) => (
  <View style={styles.timelineRow}>
    <View style={styles.timeColumn}>
       <Text style={[styles.startTime, { color: theme.text }]}>{lesson.start}</Text>
       <Text style={[styles.endTime, { color: theme.textSecondary }]}>{lesson.end}</Text>
    </View>

    <View style={styles.indicatorColumn}>
       <View style={[styles.dot, { backgroundColor: lesson.active ? COLORS.secondary : theme.border }]}>
          {lesson.active && <View style={styles.pulseDot} />}
       </View>
       {!isLast && <View style={[styles.line, { backgroundColor: theme.border }]} />}
    </View>

    <TouchableOpacity 
      style={[
        styles.lessonCard, 
        isDark ? GLASS.dark : GLASS.light,
        lesson.active && { borderColor: COLORS.secondary, borderWidth: 1.5 }
      ]}
    >
       <View style={styles.lessonHeader}>
          <Text style={[styles.lessonName, { color: theme.text }]}>{lesson.title}</Text>
          {lesson.type === 'online' ? (
            <View style={styles.onlineBadge}>
               <Video color="#0EA5E9" size={12} />
               <Text style={styles.onlineText}>ONLINE</Text>
            </View>
          ) : (
            <View style={styles.offlineBadge}>
               <MapPin color="#F59E0B" size={12} />
               <Text style={styles.offlineText}>A-302</Text>
            </View>
          )}
       </View>

       <Text style={[styles.groupInfo, { color: theme.textSecondary }]}>{lesson.group} • {lesson.students} o'quvchi</Text>
       
       {lesson.active && (
         <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('TeacherLiveLesson')}>
            <LinearGradient
               colors={[COLORS.secondary, '#eab308']}
               style={styles.actionGradient}
            >
               <Text style={styles.actionBtnText}>DARSNI BOSHLASH</Text>
               <ChevronRight color={COLORS.white} size={14} strokeWidth={3} />
            </LinearGradient>
         </TouchableOpacity>
       )}
    </TouchableOpacity>
  </View>
);

const TeacherSchedule = ({ navigation }) => {
  const { isDark, theme } = useTheme();
  
  const DATES = [
    { date: '12', day: 'Dush' },
    { date: '13', day: 'Sesh', selected: true },
    { date: '14', day: 'Chor' },
    { date: '15', day: 'Pay' },
    { date: '16', day: 'Jum' },
    { date: '17', day: 'Shan' },
  ];

  const LESSONS = [
    { id: '1', start: '09:00', end: '10:30', title: 'Mental Arifmetika', group: 'Alpha', students: 12, type: 'offline', active: false },
    { id: '2', start: '11:00', end: '12:30', title: 'Abakus Pro', group: 'Bravo', students: 15, type: 'online', active: true },
    { id: '3', start: '14:00', end: '15:30', title: 'Tezkor Hisob', group: 'Gamma', students: 8, type: 'offline', active: false },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <PremiumBackground color1={COLORS.secondary} color2={COLORS.primary} />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.month, { color: theme.textSecondary }]}>Aprel, 2026</Text>
            <Text style={[styles.title, { color: theme.text }]}>Dars Jadvali</Text>
          </View>
        </View>

        <View style={styles.calendarStrip}>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.datesContainer}>
              {DATES.map((d, i) => (
                <DateItem key={i} date={d.date} day={d.day} isSelected={d.selected} isDark={isDark} theme={theme} />
              ))}
           </ScrollView>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.timelineContent}>
           {LESSONS.map((lesson, index) => (
             <LessonItem 
               key={lesson.id} 
               lesson={lesson} 
               isLast={index === LESSONS.length - 1} 
               isDark={isDark} 
               theme={theme}
               navigation={navigation} 
             />
           ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: {
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  month: { fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  title: { fontSize: 28, fontWeight: '900', marginTop: 2 },
  calendarStrip: { marginTop: 10, marginBottom: 20 },
  datesContainer: { paddingHorizontal: 20, gap: 12 },
  dateItem: {
    width: 60,
    height: 80,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    ...SHADOWS.light,
  },
  dayText: { fontSize: 12, fontWeight: '700' },
  dateText: { fontSize: 20, fontWeight: '900' },
  timelineContent: { paddingHorizontal: 20, paddingBottom: 100 },
  timelineRow: { flexDirection: 'row', gap: 15 },
  timeColumn: { width: 55, alignItems: 'flex-end', paddingTop: 5 },
  startTime: { fontSize: 14, fontWeight: '900' },
  endTime: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  indicatorColumn: { width: 20, alignItems: 'center' },
  dot: { width: 14, height: 14, borderRadius: 7, marginTop: 8, zIndex: 2, justifyContent: 'center', alignItems: 'center' },
  pulseDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: COLORS.secondary + '40', position: 'absolute' },
  line: { width: 2, flex: 1, marginTop: -5, marginBottom: -15 },
  lessonCard: {
    flex: 1,
    borderRadius: 24,
    padding: 18,
    marginBottom: 25,
    ...SHADOWS.light,
  },
  lessonHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lessonName: { fontSize: 16, fontWeight: '800' },
  onlineBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E0F2FE', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 4 },
  onlineText: { color: '#0EA5E9', fontSize: 10, fontWeight: '900' },
  offlineBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 4 },
  offlineText: { color: '#F59E0B', fontSize: 10, fontWeight: '900' },
  groupInfo: { fontSize: 13, fontWeight: '500', marginTop: 6 },
  actionBtn: { marginTop: 15, borderRadius: 12, overflow: 'hidden' },
  actionGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, gap: 8 },
  actionBtnText: { color: COLORS.white, fontSize: 11, fontWeight: '900' },
});

export default TeacherSchedule;
