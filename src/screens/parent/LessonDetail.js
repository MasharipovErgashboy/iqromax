import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, BlurView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme.js';
import { ArrowLeft, Play, FileText, User as UserIcon, Calendar, Clock, Share2, Video } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LessonDetail = ({ navigation, route }) => {
  const { lessonTitle = 'O‘nliklar bilan ishlash' } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft color={COLORS.gray[700]} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dars Tafsilotlari</Text>
        <TouchableOpacity style={styles.shareBtn}>
          <Share2 color={COLORS.gray[700]} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Lesson Preview / Video Cover */}
        <View style={styles.videoWrapper}>
           <Image 
             source={{ uri: 'https://images.unsplash.com/photo-1510172951991-856a654273f5?q=80&w=1000' }} 
             style={styles.coverImage} 
           />
           <LinearGradient
             colors={['transparent', 'rgba(0,0,0,0.8)']}
             style={styles.coverOverlay}
           >
              <TouchableOpacity style={styles.playBtnLarge}>
                 <Play color={COLORS.white} size={30} fill={COLORS.white} />
              </TouchableOpacity>
              <View style={styles.tagRow}>
                 <View style={styles.liveTag}>
                    <Video color={COLORS.white} size={14} />
                    <Text style={styles.liveTagText}>JONLI DARS</Text>
                 </View>
                 <Text style={styles.duration}>45 min</Text>
              </View>
           </LinearGradient>
        </View>

        {/* Title and Meta */}
        <View style={styles.titleSection}>
           <Text style={styles.lessonTitle}>{lessonTitle}</Text>
           <View style={styles.metaGrid}>
              <View style={styles.metaItem}>
                 <Calendar color={COLORS.gray[400]} size={14} />
                 <Text style={styles.metaText}>12-Aprel, 2026</Text>
              </View>
              <View style={styles.metaItem}>
                 <Clock color={COLORS.gray[400]} size={14} />
                 <Text style={styles.metaText}>14:00 - 14:45</Text>
              </View>
           </View>
        </View>

        {/* Instructor info */}
        <View style={styles.instructorCard}>
           <Image 
             source={require('../../../assets/avatar_blue.png')} 
             style={styles.instructorAvatar} 
           />
           <View style={styles.instructorInfo}>
              <Text style={styles.instructorName}>Sabina Raxmonova</Text>
              <Text style={styles.instructorRole}>Mental Arifmetika Ustoz</Text>
           </View>
           <TouchableOpacity 
             style={styles.msgBtn} 
             onPress={() => navigation.navigate('ChatScreen', { teacherName: 'Sabina R.' })}
           >
              <Text style={styles.msgBtnText}>SAVOL BERISH</Text>
           </TouchableOpacity>
        </View>

        {/* Lesson Content Section */}
        <View style={styles.section}>
           <Text style={styles.sectionTitle}>Mavzu haqida</Text>
           <Text style={styles.description}>
             Ushbu darsda biz abakusda o'nliklar va yuzliklar bilan ishlashni mukammallashtiramiz. 
             O'quvchilar tezkor hisoblash texnikasini va mantiqiy fikrlashni rivojlantiruvchi maxsus rejalarni o'rganadilar.
           </Text>
        </View>

        {/* Materials */}
        <View style={styles.section}>
           <Text style={styles.sectionTitle}>Dars materiallari</Text>
           <TouchableOpacity style={styles.materialItem}>
              <View style={styles.fileIcon}>
                 <FileText color="#EF4444" size={20} />
              </View>
              <Text style={styles.fileName}>Uyga vazifa #12 (PDF)</Text>
              <Text style={styles.fileSize}>1.2 MB</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.materialItem}>
              <View style={[styles.fileIcon, { backgroundColor: '#F0F9FF' }]}>
                 <Play color="#0EA5E9" size={16} />
              </View>
              <Text style={styles.fileName}>Dars videosi (MP4)</Text>
              <Text style={styles.fileSize}>245 MB</Text>
           </TouchableOpacity>
        </View>

        {/* Join btn for Live */}
        <TouchableOpacity
          style={styles.joinBtn}
          onPress={() => navigation.navigate('LiveLesson', { lessonTitle })}
        >
           <LinearGradient
             colors={['#EF4444', '#B91C1C']}
             style={styles.joinGradient}
           >
              <Video color={COLORS.white} size={22} />
              <Text style={styles.joinText}>JONLI DARSNI KUZATISH</Text>
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
  shareBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  videoWrapper: {
    height: 220,
    marginHorizontal: 20,
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 10,
    ...SHADOWS.medium,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playBtnLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  tagRow: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  liveTagText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '900',
  },
  duration: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '700',
  },
  titleSection: {
    paddingHorizontal: 25,
    marginTop: 25,
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
    lineHeight: 30,
  },
  metaGrid: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 15,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: COLORS.gray[500],
    fontWeight: '600',
  },
  instructorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginTop: 30,
    padding: 15,
    borderRadius: 24,
    ...SHADOWS.light,
  },
  instructorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    marginRight: 15,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
  },
  instructorRole: {
    fontSize: 11,
    color: COLORS.gray[400],
    fontWeight: '600',
    marginTop: 2,
  },
  msgBtn: {
    backgroundColor: COLORS.accent + '15',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  msgBtnText: {
    fontSize: 10,
    color: COLORS.accent,
    fontWeight: '900',
  },
  section: {
    paddingHorizontal: 25,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1E293B',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: COLORS.gray[500],
    lineHeight: 22,
    fontWeight: '500',
  },
  materialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 20,
    marginBottom: 12,
    ...SHADOWS.light,
  },
  fileIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  fileName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  fileSize: {
    fontSize: 11,
    color: COLORS.gray[400],
    fontWeight: '600',
  },
  joinBtn: {
    margin: 25,
    borderRadius: 24,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  joinGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 12,
  },
  joinText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
});

export default LessonDetail;
