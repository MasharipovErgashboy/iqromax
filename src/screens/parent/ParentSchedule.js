import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SHADOWS, GLASS } from '../../constants/theme.js';
import { Calendar as CalendarIcon, Video, Book, ChevronRight, Bell, MessageCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext.js';
import ParentPremiumBackground from '../../components/ParentPremiumBackground';
import { BlurView } from 'expo-blur';

const ParentSchedule = ({ navigation }) => {
  const { isDark, theme } = useTheme();

  const SCHEDULE_DATA = [
    {
      time: '14:00',
      title: 'Mental Arifmetika',
      type: 'Jonli dars',
      teacher: 'Sabina R.',
      active: true,
      color: '#10B981'
    },
    {
      time: '16:30',
      title: 'Mantiqiy Mashqlar',
      type: 'Video dars',
      status: 'Ochilgan',
      color: '#0EA5E9'
    },
    {
      time: 'Ertaga',
      title: 'Haftalik Musobaqa',
      type: 'Turnir',
      day: 'Seshanba',
      color: COLORS.secondary
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <ParentPremiumBackground color1={isDark ? '#059669' : '#10B981'} color2={isDark ? '#0F172A' : '#1E293B'} />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Dars Jadvali</Text>
          <View style={styles.headerActions}>
             <TouchableOpacity 
               style={[styles.actionBtn, isDark ? GLASS.dark : GLASS.light, { borderColor: COLORS.secondary + '40' }]}
               onPress={() => navigation.navigate('TeacherChatList')}
             >
                <MessageCircle color={COLORS.secondary} size={22} />
             </TouchableOpacity>
             <TouchableOpacity style={[styles.actionBtn, isDark ? GLASS.dark : GLASS.light]} onPress={() => navigation.navigate('CalendarScreen')}>
                <CalendarIcon color={theme.text} size={22} />
             </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Day Strip */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayStrip}>
             <View style={[styles.dayBoxActive, { backgroundColor: '#10B981' }]}>
                <Text style={styles.dayTextActive}>DS</Text>
                <Text style={styles.dateTextActive}>12</Text>
             </View>
             {[13, 14, 15, 16, 17].map((date, i) => (
               <BlurView key={i} intensity={isDark ? 20 : 40} style={[styles.dayBox, isDark ? GLASS.dark : GLASS.light]}>
                  <Text style={[styles.dayText, { color: theme.textSecondary }]}>{['SESH', 'CHOR', 'PAY', 'JUM', 'SHAN'][i]}</Text>
                  <Text style={[styles.dateText, { color: theme.text }]}>{date}</Text>
               </BlurView>
             ))}
          </ScrollView>

          {/* Schedule List */}
          <View style={styles.listContainer}>
             {SCHEDULE_DATA.map((item, index) => (
               <View key={index} style={styles.timelineItem}>
                  <View style={styles.timeSection}>
                     <Text style={[styles.timeText, { color: theme.textSecondary }]}>{item.time}</Text>
                     {index < SCHEDULE_DATA.length - 1 && <View style={[styles.connector, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#E2E8F0' }]} />}
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.classCardWrapper}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('LessonDetail', { lessonTitle: item.title })}
                  >
                    <BlurView intensity={isDark ? 30 : 50} style={[styles.classCard, isDark ? GLASS.dark : GLASS.light, item.active && { borderColor: '#10B981', borderWidth: 1.5 }]}>
                      <View style={[styles.colorStrip, { backgroundColor: item.color }]} />
                      <View style={styles.cardMain}>
                         <View style={styles.cardHeader}>
                            <Text style={[styles.classTitle, { color: theme.text }]}>{item.title}</Text>
                            <View style={[styles.typeBadge, { backgroundColor: item.color + '20' }]}>
                               <Text style={[styles.typeText, { color: item.color }]}>{item.type}</Text>
                            </View>
                         </View>
                         
                         <View style={styles.cardFooter}>
                            <View style={styles.infoRow}>
                               {item.active ? <Video size={14} color={theme.textSecondary} /> : <Book size={14} color={theme.textSecondary} />}
                               <Text style={[styles.infoText, { color: theme.textSecondary }]}>{item.teacher || item.status || item.day}</Text>
                            </View>
                            {item.active && (
                              <View style={styles.liveNow}>
                                 <View style={styles.pulseDot} />
                                 <Text style={styles.liveText}>DAVOM ETMOQDA</Text>
                              </View>
                            )}
                         </View>
                      </View>
                      <ChevronRight color={theme.textSecondary} size={18} />
                    </BlurView>
                  </TouchableOpacity>
               </View>
             ))}
          </View>

          {/* Reminder Box */}
          <TouchableOpacity onPress={() => navigation.navigate('CalendarScreen')}>
            <LinearGradient
              colors={isDark ? ['#10B981', '#059669'] : ['#1E293B', '#0F172A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.reminderCard}
            >
               <View style={[styles.reminderIcon, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
                  <Bell color={COLORS.white} size={20} />
               </View>
               <View style={styles.reminderContent}>
                  <Text style={styles.reminderTitle}>Eslatma qo'shish</Text>
                  <Text style={styles.reminderSub}>Darslar boshlanishidan oldin xabar olish</Text>
               </View>
               <View style={styles.addBtn}>
                  <Text style={[styles.addBtnText, { color: isDark ? '#10B981' : '#0F172A' }]}>SOZLASH</Text>
               </View>
            </LinearGradient>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, paddingVertical: 15 },
  title: { fontSize: 24, fontWeight: '900' },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  actionBtn: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', ...SHADOWS.light, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  scrollContent: { paddingBottom: 110 },
  dayStrip: { paddingHorizontal: 20, gap: 12, marginTop: 10, marginBottom: 25, flexDirection: 'row' },
  dayBox: { width: 60, height: 80, borderRadius: 22, justifyContent: 'center', alignItems: 'center', ...SHADOWS.light, overflow: 'hidden' },
  dayBoxActive: { width: 65, height: 85, borderRadius: 24, justifyContent: 'center', alignItems: 'center', ...SHADOWS.medium },
  dayText: { fontSize: 10, fontWeight: '700' },
  dateText: { fontSize: 18, fontWeight: '800', marginTop: 4 },
  dayTextActive: { fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: '700' },
  dateTextActive: { fontSize: 22, fontWeight: '900', color: COLORS.white, marginTop: 4 },
  listContainer: { paddingHorizontal: 20 },
  timelineItem: { flexDirection: 'row', gap: 15, marginBottom: 12 },
  timeSection: { width: 50, alignItems: 'center' },
  timeText: { fontSize: 13, fontWeight: '800', marginTop: 15 },
  connector: { width: 2, flex: 1, marginVertical: 10, borderRadius: 1 },
  classCardWrapper: { flex: 1 },
  classCard: { flex: 1, borderRadius: 22, padding: 15, flexDirection: 'row', alignItems: 'center', ...SHADOWS.light, overflow: 'hidden' },
  colorStrip: { width: 4, height: '100%', borderRadius: 2, marginRight: 15 },
  cardMain: { flex: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  classTitle: { fontSize: 16, fontWeight: '800' },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  typeText: { fontSize: 9, fontWeight: '800' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  infoText: { fontSize: 12, fontWeight: '600' },
  liveNow: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(239, 68, 68, 0.15)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  pulseDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#EF4444' },
  liveText: { fontSize: 8, fontWeight: '900', color: '#EF4444' },
  reminderCard: { margin: 20, borderRadius: 28, padding: 20, flexDirection: 'row', alignItems: 'center', ...SHADOWS.medium },
  reminderIcon: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  reminderContent: { flex: 1 },
  reminderTitle: { color: COLORS.white, fontSize: 16, fontWeight: '800' },
  reminderSub: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: '500', marginTop: 2 },
  addBtn: { backgroundColor: COLORS.white, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 14 },
  addBtnText: { fontSize: 10, fontWeight: '900' },
});

export default ParentSchedule;
