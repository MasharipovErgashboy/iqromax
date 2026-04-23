import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme.js';
import { ArrowLeft, BookOpen, Star, TrendingUp, Clock, MessageCircle, ChevronRight, Award } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert } from 'react-native';

const { width } = Dimensions.get('window');

const SubjectDetail = ({ navigation, route }) => {
  const { subjectName = 'Mental Arifmetika' } = route.params || {};

  const RECENT_LESSONS = [
    { title: 'O‘nliklar bilan ishlash', date: 'Bugun', score: 95, color: COLORS.primary },
    { title: 'Abakusda tezlik mashqi', date: '2 kun oldin', score: 88, color: '#0EA5E9' },
    { title: 'Mantiqiy savollar #4', date: '4 kun oldin', score: 92, color: '#F59E0B' },
    { title: 'Yuzliklar nazariyasi', date: '1 hafta oldin', score: 85, color: '#6366F1' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft color={COLORS.gray[700]} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{subjectName}</Text>
        <TouchableOpacity style={styles.chatBtn} onPress={() => navigation.navigate('ChatScreen', { teacherName: 'Sabina R.' })}>
          <MessageCircle color={COLORS.accent} size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Progress Overview */}
        <LinearGradient
          colors={['#1E293B', '#0F172A']}
          style={styles.statsCard}
        >
          <View style={styles.statsRow}>
            <View style={styles.statContainer}>
              <Text style={styles.statValue}>85%</Text>
              <Text style={styles.statLabel}>Umumiy o'zlashtirish</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statContainer}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Yakunlangan darslar</Text>
            </View>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '85%' }]} />
          </View>
        </LinearGradient>

        {/* Teacher Comment */}
        <View style={styles.commentBox}>
          <View style={styles.commentHeader}>
            <Award color={COLORS.accent} size={18} />
            <Text style={styles.teacherName}>Sabina R. (Ustoz izohi)</Text>
          </View>
          <Text style={styles.commentText}>
            "Alisher o'nliklar va yuzliklar bilan ishlashda juda katta o'sish ko'rsatdi. Abakusdagi tezligi ham standartdan yuqori. Shu tempda davom etish kerak!"
          </Text>
        </View>

        {/* Subject Breakdown Charts (Mock) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Batafsil tahlil</Text>
        </View>
        
        <View style={styles.breakdownGrid}>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Tezkor hisoblash</Text>
            <Text style={styles.breakdownValue}>92/100</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Mantiqiy fikrlash</Text>
            <Text style={styles.breakdownValue}>78/100</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Xotira mashqlari</Text>
            <Text style={styles.breakdownValue}>85/100</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Uyga vazifalar</Text>
            <Text style={styles.breakdownValue}>100%</Text>
          </View>
        </View>

        {/* Recent Lesson History */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Oxirgi darslar natijasi</Text>
        </View>

        {RECENT_LESSONS.map((lesson, index) => (
          <TouchableOpacity
            key={index}
            style={styles.lessonCard}
            onPress={() => navigation.navigate('LessonResultDetail', { lesson: { title: lesson.title, score: lesson.score, maxScore: 100, date: lesson.date } })}
          >
            <View style={[styles.lessonColor, { backgroundColor: lesson.color }]} />
            <View style={styles.lessonContent}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <View style={styles.lessonMeta}>
                <Clock size={12} color={COLORS.gray[400]} />
                <Text style={styles.lessonDate}>{lesson.date}</Text>
              </View>
            </View>
            <View style={styles.scoreContainer}>
              <Text style={[styles.scoreValue, { color: lesson.score > 90 ? COLORS.primary : COLORS.accent }]}>
                {lesson.score}
              </Text>
              <Text style={styles.scoreMax}>/100</Text>
            </View>
            <ChevronRight color={COLORS.gray[300]} size={18} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.certBtn} onPress={() => Alert.alert('Yuklab olinmoqda...', 'Sertifikat PDF formatda yuklanmoqda. Iltimos kuting.')}> 
          <LinearGradient
            colors={[COLORS.accent, '#f59e0b']}
            style={styles.certGradient}
          >
            <Award color={COLORS.white} size={20} />
            <Text style={styles.certText}>Sertifikatni yuklab olish</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
  },
  chatBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.accent + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  statsCard: {
    borderRadius: 24,
    padding: 24,
    marginVertical: 10,
    ...SHADOWS.medium,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statContainer: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.white,
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 4,
    fontWeight: '600',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  commentBox: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 24,
    marginTop: 15,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  teacherName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  commentText: {
    fontSize: 13,
    color: COLORS.gray[500],
    lineHeight: 20,
    fontStyle: 'italic',
  },
  sectionHeader: {
    marginTop: 25,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1E293B',
  },
  breakdownGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  breakdownItem: {
    width: (width - 52) / 2,
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 18,
    ...SHADOWS.light,
  },
  breakdownLabel: {
    fontSize: 11,
    color: COLORS.gray[500],
    fontWeight: '700',
    marginBottom: 5,
  },
  breakdownValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 20,
    marginBottom: 12,
    ...SHADOWS.light,
  },
  lessonColor: {
    width: 4,
    height: '100%',
    borderRadius: 2,
    marginRight: 15,
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
  },
  lessonDate: {
    fontSize: 11,
    color: COLORS.gray[400],
    fontWeight: '600',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 10,
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: '900',
  },
  scoreMax: {
    fontSize: 10,
    color: COLORS.gray[400],
    fontWeight: '700',
    marginBottom: 2,
  },
  certBtn: {
    marginTop: 25,
    borderRadius: 20,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  certGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  certText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '900',
  },
});

export default SubjectDetail;
