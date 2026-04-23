import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, 
  Play, 
  Star, 
  Clock, 
  ChevronRight,
  Tv,
  CheckCircle2,
  Lock,
  MessageCircle,
  Calendar,
  BookOpen,
  Zap,
  Layout,
  Crown
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const CURRICULUM_DATA = [
  {
    id: 'm1',
    title: 'Modul 1: Kirish',
    lessons: [
      { id: '1', type: 'video', title: 'Abakus bilan tanishuv', duration: '12 min', completed: true },
      { id: '2', type: 'task', title: 'Oddiy sanoq mashqi', xp: 50, completed: true },
    ]
  },
  {
    id: 'm2',
    title: 'Modul 2: Qo\'shish va ayirish',
    lessons: [
      { id: '3', type: 'video', title: '1-4 sonlarni qo\'shish', duration: '15 min', completed: true },
      { id: '4', type: 'live', title: 'Jonli efir: Tezkor savol-javob', time: '18:00', isLive: true },
      { id: '5', type: 'task', title: 'Haftalik imtihon #1', xp: 150, completed: false },
    ]
  },
  {
    id: 'm3',
    title: 'Modul 3: Murakkab amallar',
    lessons: [
      { id: '6', type: 'video', title: 'Kichik do\'stlar formulasi', duration: '20 min', lock: true },
      { id: '7', type: 'video', title: 'Katta do\'stlar formulasi', duration: '25 min', lock: true },
    ]
  }
];

const CurriculumItem = ({ item, theme, onPress }) => {
  const getIcon = () => {
    if (item.lock) return <Lock size={20} color={theme.textSecondary} />;
    switch (item.type) {
      case 'video': return <View style={[styles.typeIcon, { backgroundColor: '#E0F2FE' }]}><Play size={18} color="#0284C7" fill="#0284C7" /></View>;
      case 'task': return <View style={[styles.typeIcon, { backgroundColor: '#F0FDF4' }]}><BookOpen size={18} color="#16A34A" /></View>;
      case 'live': return <View style={[styles.typeIcon, { backgroundColor: '#FEF2F2' }]}><Tv size={18} color="#DC2626" /></View>;
      default: return null;
    }
  };

  return (
    <TouchableOpacity 
      disabled={item.lock} 
      onPress={onPress}
      style={[styles.itemCard, { backgroundColor: theme.card, borderColor: theme.border }]}
    >
      <View style={styles.itemLeft}>
        {getIcon()}
        <View style={styles.itemInfo}>
          <View style={styles.itemTopRow}>
            {item.isLive && (
              <View style={styles.liveBadge}>
                 <View style={styles.liveDot} />
                 <Text style={styles.liveText}>LIVE</Text>
              </View>
            )}
            <Text style={[styles.itemTitle, { color: item.lock ? theme.textSecondary : theme.text }]}>{item.title}</Text>
          </View>
          <Text style={styles.itemSub}>
             {item.type === 'video' ? item.duration : item.type === 'task' ? `${item.xp} XP • Uyga vazifa` : `${item.time} • Jonli efir`}
          </Text>
        </View>
      </View>
      
      {item.completed ? (
        <CheckCircle2 color="#22C55E" size={22} />
      ) : item.lock ? (
        <Lock color={theme.textSecondary} size={18} />
      ) : (
        <ChevronRight color={theme.textSecondary} size={20} />
      )}
    </TouchableOpacity>
  );
};

const StudentCourseCurriculum = ({ navigation, route }) => {
  const { isDark, theme } = useTheme();
  const { 
    subject = { title: 'Mental Arifmetika', tutor: 'Shoxruh Ustoz', progress: 45 }, 
    isLocked = false 
  } = route.params || {};

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <SafeAreaView edges={['top']} style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowLeft color={theme.text} size={24} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Fan Barnomasi</Text>
          <TouchableOpacity style={styles.moreBtn}>
            <Layout color={theme.text} size={22} />
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Course Progress Card */}
        <View style={[styles.progressCard, { backgroundColor: '#1E293B' }]}>
           <View style={styles.progressTop}>
              <View>
                 <Text style={styles.progSubject}>{subject.title}</Text>
                 <Text style={styles.progTutor}>{subject.tutor}</Text>
              </View>
              <View style={styles.progBadge}>
                 <Star color="#F59E0B" fill="#F59E0B" size={14} />
                 <Text style={styles.progBadgeText}>Premium</Text>
              </View>
           </View>
           
           <View style={styles.progressBarWrapper}>
              <View style={styles.progressInfo}>
                 <Text style={styles.progressLabel}>Umumiy o'zlashtirish</Text>
                 <Text style={styles.progressPercent}>{subject.progress}%</Text>
              </View>
              <View style={styles.progressBarBg}>
                 <View style={[styles.progressBarFill, { width: `${subject.progress}%` }]} />
              </View>
           </View>

           <View style={styles.statsRow}>
              <View style={styles.statItem}>
                 <Text style={styles.statVal}>12/24</Text>
                 <Text style={styles.statLab}>Darslar</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                 <Text style={styles.statVal}>1,250</Text>
                 <Text style={styles.statLab}>XP Ball</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                 <Text style={styles.statVal}>8</Text>
                 <Text style={styles.statLab}>Vazifalar</Text>
              </View>
           </View>
        </View>

        {/* Curriculum List */}
        <View style={styles.curriculumSection}>
           {CURRICULUM_DATA.map((module) => (
             <View key={module.id} style={styles.moduleGroup}>
                <View style={styles.moduleHeader}>
                   <Text style={[styles.moduleTitle, { color: theme.text }]}>{module.title}</Text>
                   <View style={[styles.moduleBadge, { backgroundColor: theme.card }]}>
                      <Text style={[styles.moduleBadgeText, { color: theme.textSecondary }]}>{module.lessons.length} dars</Text>
                   </View>
                </View>
                
                <View style={styles.lessonsList}>
                   {module.lessons.map((lesson) => (
                     <CurriculumItem 
                       key={lesson.id} 
                       item={lesson} 
                       theme={theme} 
                       onPress={() => {
                         if (lesson.type === 'video') navigation.navigate('StudentVideoLesson', { lesson });
                         else if (lesson.type === 'task') navigation.navigate('StudentHomework', { task: lesson });
                         else if (lesson.type === 'live') navigation.navigate('StudentLive');
                       }}
                     />
                   ))}
                </View>
             </View>
           ))}
        </View>
      </ScrollView>

      {/* Action Footer */}
      <View style={[styles.footer, { backgroundColor: theme.background, borderTopColor: theme.border }]}>
         <TouchableOpacity 
           onPress={() => {
             if (isLocked) {
               navigation.navigate('StudentSubscription');
               return;
             }
             // Find first uncompleted and unlocked lesson
             const nextLesson = CURRICULUM_DATA.flatMap(m => m.lessons).find(l => !l.completed && !l.lock);
             if (nextLesson) {
               if (nextLesson.type === 'video') navigation.navigate('StudentVideoLesson', { lesson: nextLesson });
               else if (nextLesson.type === 'task') navigation.navigate('StudentHomework', { task: nextLesson });
             } else {
               // Fallback to first if all completed
               navigation.navigate('StudentVideoLesson', { lesson: CURRICULUM_DATA[0].lessons[0] });
             }
           }}
           style={styles.resumeBtn}
         >
            <LinearGradient
              colors={isLocked ? ['#F59E0B', '#D97706'] : ['#3B82F6', '#2563EB']}
              style={styles.resumeGradient}
            >
               {isLocked ? <Crown color="white" fill="white" size={20} /> : <Zap color="white" fill="white" size={20} />}
               <Text style={styles.resumeText}>{isLocked ? 'OBUNA XARID QILISH' : 'DARSNI DAVOM ETTIRISH'}</Text>
            </LinearGradient>
         </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { ...SHADOWS.light, zIndex: 10 },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 },
  backBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900' },
  moreBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { padding: 20, paddingBottom: 120 },
  progressCard: { padding: 25, borderRadius: 32, ...SHADOWS.medium },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 25 },
  progSubject: { color: 'white', fontSize: 20, fontWeight: '900' },
  progTutor: { color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: '600', marginTop: 4 },
  progBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  progBadgeText: { color: '#F59E0B', fontSize: 11, fontWeight: '900' },
  progressBarWrapper: { marginBottom: 25 },
  progressInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  progressLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: '700' },
  progressPercent: { color: 'white', fontSize: 14, fontWeight: '900' },
  progressBarBg: { height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#3B82F6', borderRadius: 4 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statItem: { alignItems: 'center' },
  statVal: { color: 'white', fontSize: 16, fontWeight: '900' },
  statLab: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '700', marginTop: 4 },
  statDivider: { width: 1, height: 20, backgroundColor: 'rgba(255,255,255,0.1)' },
  curriculumSection: { marginTop: 35 },
  moduleGroup: { marginBottom: 30 },
  moduleHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  moduleTitle: { fontSize: 17, fontWeight: '800' },
  moduleBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  moduleBadgeText: { fontSize: 11, fontWeight: '800' },
  lessonsList: { gap: 12 },
  itemCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderRadius: 22, borderWidth: 1, ...SHADOWS.light },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 15, flex: 1 },
  typeIcon: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  itemInfo: { flex: 1 },
  itemTopRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  itemTitle: { fontSize: 15, fontWeight: '800' },
  itemSub: { fontSize: 12, color: '#64748B', fontWeight: '600', marginTop: 4 },
  liveBadge: { backgroundColor: '#EF4444', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, flexDirection: 'row', alignItems: 'center', gap: 4 },
  liveDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: 'white' },
  liveText: { color: 'white', fontSize: 8, fontWeight: '900' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, paddingBottom: Platform.OS === 'ios' ? 35 : 20, borderTopWidth: 1 },
  resumeBtn: { borderRadius: 22, overflow: 'hidden', ...SHADOWS.medium },
  resumeGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, gap: 12 },
  resumeText: { color: 'white', fontSize: 14, fontWeight: '900', letterSpacing: 1 },
});

export default StudentCourseCurriculum;
