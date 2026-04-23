import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Star, 
  Play, 
  ShieldCheck, 
  Download,
  Share2,
  Calendar,
  ChevronRight
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const LiveLessonDetail = ({ navigation, route }) => {
  const { isDark, theme } = useTheme();
  const { lesson } = route.params || {
    lesson: {
      id: '1',
      title: 'Mental Arifmetika Pro',
      subject: 'Abakus sirlari',
      teacher: 'Shoxruh Ustoz',
      status: 'UPCOMING',
      time: '18:00',
      avatar: require('../../../assets/avatar_blue.png'),
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" translucent />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Image 
            source={require('../../../assets/live_promo.png')} 
            style={styles.heroImage} 
            resizeMode="cover"
          />
          <LinearGradient 
            colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.8)']} 
            style={styles.heroOverlay}
          />
          
          <SafeAreaView style={styles.headerBtns}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
               <ArrowLeft color="white" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
               <Share2 color="white" size={22} />
            </TouchableOpacity>
          </SafeAreaView>

          <View style={styles.heroContent}>
             <View style={styles.subjectPill}>
                <Text style={styles.subjectText}>{lesson.subject}</Text>
             </View>
             <Text style={styles.mainTitle}>{lesson.title}</Text>
          </View>
        </View>

        {/* Info Stats */}
        <View style={styles.statsRow}>
           <View style={[styles.statItem, { backgroundColor: theme.card }]}>
              <Star color="#F59E0B" fill="#F59E0B" size={18} />
              <Text style={[styles.statValue, { color: theme.text }]}>4.9</Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Reyting</Text>
           </View>
           <View style={[styles.statItem, { backgroundColor: theme.card }]}>
              <Users color={COLORS.primary} size={18} />
              <Text style={[styles.statValue, { color: theme.text }]}>1.2k</Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>O'quvchi</Text>
           </View>
           <View style={[styles.statItem, { backgroundColor: theme.card }]}>
              <Clock color="#EF4444" size={18} />
              <Text style={[styles.statValue, { color: theme.text }]}>60m</Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Davomiylik</Text>
           </View>
        </View>

        {/* Teacher Section */}
        <View style={styles.section}>
           <Text style={[styles.sectionTitle, { color: theme.text }]}>Ustoz</Text>
           <TouchableOpacity style={[styles.teacherCard, { backgroundColor: theme.card }]}>
              <Image source={lesson.avatar} style={styles.teacherAvatar} />
              <View style={styles.teacherInfo}>
                 <Text style={[styles.teacherName, { color: theme.text }]}>{lesson.teacher}</Text>
                 <Text style={[styles.teacherRole, { color: theme.textSecondary }]}>Mental Arifmetika bo'yicha ekspert</Text>
              </View>
              <ChevronRight color={COLORS.gray[400]} size={20} />
           </TouchableOpacity>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
           <Text style={[styles.sectionTitle, { color: theme.text }]}>Dars haqida</Text>
           <Text style={[styles.description, { color: theme.textSecondary }]}>
             Ushbu darsda biz mental arifmetikaning eng muhim qoidalarini va tezkor hisoblash texnikalarini o'rganamiz. 
             Dars yakunida siz 2 xonali sonlarni bir necha soniyada qo'shishni va ayirishni o'rganib olasiz.
           </Text>
        </View>

        {/* Requisites / Highlights */}
        <View style={styles.section}>
           <View style={[styles.highlightItem, { backgroundColor: theme.card }]}>
              <ShieldCheck color="#10B981" size={20} />
              <Text style={[styles.highlightText, { color: theme.text }]}>Sertifikat taqdim etiladi</Text>
           </View>
           <View style={[styles.highlightItem, { backgroundColor: theme.card, marginTop: 10 }]}>
              <Download color={COLORS.primary} size={20} />
              <Text style={[styles.highlightText, { color: theme.text }]}>Materiallarni yuklab olish (.pdf)</Text>
           </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <BlurView intensity={isDark ? 40 : 80} tint={isDark ? "dark" : "light"} style={styles.actionBar}>
         <TouchableOpacity 
           activeOpacity={0.9} 
           style={styles.mainBtn}
           onPress={() => {
             if (lesson.status === 'LIVE') {
               navigation.navigate('StudentLiveLesson', { channel: lesson });
             } else {
               navigation.navigate('LiveLessonArchivePlayer', { lesson: lesson });
             }
           }}
         >
            <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.btnGradient}>
               <Play color="white" fill="white" size={20} />
               <Text style={styles.btnText}>
                 {lesson.status === 'LIVE' ? "EFIRGA KIRISH" : "YOZUVNI KO'RISH"}
               </Text>
            </LinearGradient>
         </TouchableOpacity>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroContainer: { height: 350, width: '100%' },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFillObject },
  headerBtns: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10 },
  iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  
  heroContent: { position: 'absolute', bottom: 30, left: 20, right: 20 },
  subjectPill: { backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10, alignSelf: 'flex-start', marginBottom: 10 },
  subjectText: { color: 'white', fontSize: 11, fontWeight: '900', textTransform: 'uppercase' },
  mainTitle: { color: 'white', fontSize: 26, fontWeight: '900', lineHeight: 32 },

  statsRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 12, marginTop: -30 },
  statItem: { flex: 1, padding: 15, borderRadius: 24, alignItems: 'center', ...SHADOWS.medium },
  statValue: { fontSize: 16, fontWeight: '900', marginTop: 8 },
  statLabel: { fontSize: 11, fontWeight: '600', marginTop: 2 },

  section: { paddingHorizontal: 20, marginTop: 30 },
  sectionTitle: { fontSize: 18, fontWeight: '900', marginBottom: 15 },
  teacherCard: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 22, ...SHADOWS.light },
  teacherAvatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  teacherInfo: { flex: 1 },
  teacherName: { fontSize: 15, fontWeight: '800' },
  teacherRole: { fontSize: 12, fontWeight: '500', marginTop: 2 },

  description: { fontSize: 14, lineHeight: 24, fontWeight: '500' },
  highlightItem: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 18, borderRadius: 20 },
  highlightText: { fontSize: 14, fontWeight: '700' },

  actionBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingVertical: 20, paddingBottom: Platform.OS === 'ios' ? 40 : 20, borderTopLeftRadius: 30, borderTopRightRadius: 30, overflow: 'hidden' },
  mainBtn: { borderRadius: 20, overflow: 'hidden', ...SHADOWS.medium },
  btnGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, gap: 10 },
  btnText: { color: 'white', fontSize: 15, fontWeight: '900', letterSpacing: 1 },
});

export default LiveLessonDetail;
