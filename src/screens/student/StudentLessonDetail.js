import React, { useState } from 'react';
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
  Modal,
  Alert,
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, 
  Play, 
  Star, 
  Clock, 
  ChevronRight,
  CheckCircle2,
  Lock,
  MessageCircle,
  Share2,
  Crown,
  X,
  Volume2,
  Maximize2,
  PlayCircle,
  Trophy,
  User,
  Medal
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const StudentLessonDetail = ({ navigation, route }) => {
  const { isDark, theme } = useTheme();
  const { 
    lesson = {
      title: 'Mental Arifmetika',
      subtitle: '12-dars: Qo\'shish va ayirish',
      xp: 250,
      duration: '45 daqiqa',
      rating: 4.8,
      image: require('../../../assets/abacus_3d.png'),
      color: '#F0FDF4',
      accent: '#22C55E'
    },
    isLocked = false 
  } = route.params || {};

  const [activeTab, setActiveTab] = useState('dars');
  const [videoVisible, setVideoVisible] = useState(false);

  const LEADERBOARD_DATA = [
    { id: '1', name: 'Alisher S.', xp: 2850, rank: 1, avatar: null },
    { id: '2', name: 'Madina B.', xp: 2620, rank: 2, avatar: null },
    { id: '3', name: 'Jasur M.', xp: 2450, rank: 3, avatar: null },
    { id: '4', name: 'Sardor A.', xp: 2100, rank: 4, avatar: null },
    { id: '5', name: 'Xadicha K.', xp: 1950, rank: 5, avatar: null },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Hero Section */}
      <View style={styles.hero}>
        <Image source={lesson.image} style={styles.heroImage} resizeMode="contain" />
        <LinearGradient 
          colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.8)']}
          style={StyleSheet.absoluteFill}
        />
        
        <SafeAreaView style={styles.header}>
           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <ArrowLeft color="white" size={24} />
           </TouchableOpacity>
           <View style={styles.headerActions}>
              <TouchableOpacity style={styles.actionBtn}>
                 <Share2 color="white" size={22} />
              </TouchableOpacity>
           </View>
        </SafeAreaView>

        <View style={styles.heroContent}>
           <View style={[styles.badge, { backgroundColor: lesson.accent + '30' }]}>
              <Text style={[styles.badgeText, { color: lesson.accent }]}>MODUL 3 • DARS 12</Text>
           </View>
           <Text style={styles.heroTitle}>{lesson.title}</Text>
           <Text style={styles.heroSub}>{lesson.subtitle}</Text>
        </View>
      </View>

      <View style={[styles.mainContent, { backgroundColor: theme.background }]}>
        {/* Stats Bar */}
        <View style={[styles.statsBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
           <View style={styles.statItem}>
              <Star color="#F59E0B" fill="#F59E0B" size={16} />
              <Text style={[styles.statValue, { color: theme.text }]}>{lesson.rating || '4.8'}</Text>
           </View>
           <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
           <View style={styles.statItem}>
              <Clock color="#64748B" size={16} />
              <Text style={[styles.statValue, { color: theme.text }]}>{lesson.duration || '45 daq'}</Text>
           </View>
           <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
           <View style={styles.statItem}>
              <View style={styles.xpCircle}>
                 <Text style={styles.xpText}>{lesson.xp || '250'}</Text>
              </View>
              <Text style={[styles.statValue, { color: theme.text }]}>XP</Text>
           </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
           {['dars', 'vazifa', 'reyting'].map((tab) => (
             <TouchableOpacity 
               key={tab}
               onPress={() => setActiveTab(tab)}
               style={[styles.tab, activeTab === tab && { borderBottomColor: lesson.accent }]}
             >
                <Text style={[
                   styles.tabText, 
                   { color: activeTab === tab ? theme.text : theme.textSecondary },
                   activeTab === tab && styles.activeTabText
                ]}>
                  {tab === 'dars' ? 'Darslik' : tab === 'vazifa' ? 'Vazifalar' : 'Reyting'}
                </Text>
             </TouchableOpacity>
           ))}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
           {activeTab === 'dars' && (
             <View>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Mavzu haqida</Text>
                <Text style={[styles.description, { color: theme.textSecondary }]}>
                  Ushbu darsda biz abakusda o'nliklar va yuzliklar bilan qanday ishlashni o'rganamiz. 
                  Murakkabroq qo'shish formulalari va ularni amalda qo'llashni ko'rib chiqamiz.
                </Text>

                <TouchableOpacity 
                   onPress={() => setVideoVisible(true)}
                   style={[styles.videoCard, { backgroundColor: theme.card, borderColor: theme.border }]}
                >
                   <View style={styles.videoPreview}>
                      <Image source={lesson.image} style={styles.videoThumb} />
                      <View style={styles.playBtn}>
                         <Play color="white" fill="white" size={24} />
                      </View>
                   </View>
                   <View style={styles.videoInfo}>
                      <Text style={[styles.videoTitle, { color: theme.text }]}>Videodarsni ko'rish</Text>
                      <Text style={[styles.videoMeta, { color: theme.textSecondary }]}>8:45 daqiqa • HD</Text>
                   </View>
                </TouchableOpacity>
                 
                <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 25 }]}>Dars materiallari</Text>
                {[1, 2].map(i => (
                  <TouchableOpacity 
                    key={i} 
                    onPress={() => Alert.alert('Hujjat', `Dars konspekti #${i} ochilmoqda...`)}
                    style={[styles.materialItem, { borderBottomColor: theme.border }]}
                  >
                     <View style={styles.materialLeft}>
                        <View style={[styles.materialIcon, { backgroundColor: '#FEE2E2' }]}>
                           <Text style={{ fontSize: 18 }}>📄</Text>
                        </View>
                        <View>
                           <Text style={[styles.materialName, { color: theme.text }]}>Dars konspekti #{i}</Text>
                           <Text style={[styles.materialSize, { color: theme.textSecondary }]}>PDF • 2.4 MB</Text>
                        </View>
                     </View>
                     <ChevronRight color={theme.textSecondary} size={20} />
                  </TouchableOpacity>
                ))}
             </View>
           )}

           {activeTab === 'vazifa' && (
             <View style={styles.taskContainer}>
                <View style={[styles.taskCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                   <View style={styles.taskHeader}>
                      <Text style={[styles.taskTitle, { color: theme.text }]}>Uyga vazifa #12</Text>
                      <Text style={styles.taskStatus}>TOPHIRILMAGAN</Text>
                   </View>
                   <Text style={[styles.taskDesc, { color: theme.textSecondary }]}>
                      Berilgan 20 ta misolni 5 daqiqa ichida abakus yordamida yeching. 
                      Xatolik 5% dan oshmasligi kerak.
                   </Text>
                   <TouchableOpacity style={[styles.taskBtn, { backgroundColor: lesson.accent }]}>
                      <Text style={styles.taskBtnText}>MASHQNI BOSHLASH</Text>
                   </TouchableOpacity>
                </View>
             </View>
           )}

           {activeTab === 'reyting' && (
             <View style={styles.rankingContainer}>
                <View style={[styles.rankingHeader, { backgroundColor: theme.card }]}>
                   <Trophy color="#F59E0B" size={24} />
                   <Text style={[styles.rankingTitle, { color: theme.text }]}>Eng yaxshi natijalar</Text>
                </View>
                
                {LEADERBOARD_DATA.map((student, i) => (
                  <View key={student.id} style={[styles.rankItem, { backgroundColor: theme.card, borderColor: theme.border }]}>
                     <View style={styles.rankLeft}>
                        <View style={[styles.rankBadge, { backgroundColor: i < 3 ? '#F59E0B' : theme.background }]}>
                           <Text style={[styles.rankNumber, { color: i < 3 ? 'white' : theme.textSecondary }]}>{student.rank}</Text>
                        </View>
                        <View style={[styles.userAvatar, { backgroundColor: COLORS.primary + '20' }]}>
                           <User color={COLORS.primary} size={20} />
                        </View>
                        <Text style={[styles.userName, { color: theme.text }]}>{student.name}</Text>
                     </View>
                     <View style={styles.rankRight}>
                        <Text style={[styles.rankXP, { color: COLORS.primary }]}>{student.xp}</Text>
                        <Text style={[styles.xpLabel, { color: theme.textSecondary }]}>XP</Text>
                     </View>
                  </View>
                ))}
             </View>
           )}
        </ScrollView>
      </View>

      {/* Video Player Modal */}
      <Modal visible={videoVisible} animationType="slide" transparent>
         <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
               <SafeAreaView style={{ flex: 1 }}>
                  <View style={styles.modalHeader}>
                     <TouchableOpacity onPress={() => setVideoVisible(false)} style={styles.closeBtn}>
                        <X color="white" size={24} />
                     </TouchableOpacity>
                     <Text style={styles.modalTitle}>{lesson.title}</Text>
                     <View style={{ width: 44 }} />
                  </View>

                  <View style={styles.videoPlayerMock}>
                     <ImageBackground source={lesson.image} style={styles.playerBg} blurRadius={10}>
                        <LinearGradient colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.6)']} style={StyleSheet.absoluteFill} />
                        <TouchableOpacity style={styles.playerPlayBtn}>
                           <Play color="white" fill="white" size={40} />
                        </TouchableOpacity>
                     </ImageBackground>
                     
                     <View style={styles.playerControls}>
                        <View style={styles.playerProgressBg}>
                           <View style={[styles.playerProgressFill, { width: '40%' }]} />
                        </View>
                        <View style={styles.playerBottomRow}>
                           <Text style={styles.playerTime}>03:24 / 08:45</Text>
                           <View style={styles.playerIcons}>
                              <Volume2 color="white" size={20} />
                              <Maximize2 color="white" size={20} />
                           </View>
                        </View>
                     </View>
                  </View>

                  <ScrollView style={styles.modalInfo}>
                     <Text style={[styles.modalInfoTitle, { color: theme.text }]}>Dars mazmuni</Text>
                     <Text style={[styles.modalInfoText, { color: theme.textSecondary }]}>
                        Ushbu videoda biz abakusda o'nliklar va yuzliklar bilan ishlashni amaliy mashqlar misolida ko'rib chiqamiz. 
                        Asosiy e'tibor formulalarni to'g'ri qo'llashga qaratiladi.
                     </Text>
                  </ScrollView>
               </SafeAreaView>
            </View>
         </View>
      </Modal>

      {/* Floating Action Bar */}
      <View style={[styles.floatingFooter, { backgroundColor: theme.background }]}>
         <TouchableOpacity 
           style={styles.mainPlayBtn}
           onPress={() => {
             if (isLocked) {
               navigation.navigate('StudentSubscription');
             } else {
               navigation.navigate('StudentCourseCurriculum', { subject: lesson });
             }
           }}
         >
            <LinearGradient
              colors={isLocked ? ['#F59E0B', '#D97706'] : [lesson.accent || COLORS.primary, lesson.accent || COLORS.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.mainPlayGradient}
            >
               {isLocked ? <Crown color="white" fill="white" size={24} /> : <Play color="white" fill="white" size={24} />}
               <Text style={styles.mainPlayText}>
                 {isLocked ? 'OBUNA XARID QILISH' : 'DARSNI BOSHLASH'}
               </Text>
            </LinearGradient>
         </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { height: 320, backgroundColor: '#000' },
  heroImage: { width: '100%', height: '100%', opacity: 0.7 },
  header: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20 
  },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  headerActions: { flexDirection: 'row', gap: 10 },
  actionBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  heroContent: { position: 'absolute', bottom: 30, left: 25, right: 25 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 12 },
  badgeText: { fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  heroTitle: { fontSize: 32, fontWeight: '900', color: 'white' },
  heroSub: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 4, fontWeight: '600' },
  mainContent: { flex: 1, marginTop: -30, borderTopLeftRadius: 35, borderTopRightRadius: 35, paddingHorizontal: 25 },
  statsBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-around', 
    height: 70, 
    borderRadius: 20, 
    marginTop: 20, 
    borderWidth: 1, 
    ...SHADOWS.light 
  },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statValue: { fontSize: 14, fontWeight: '800' },
  statDivider: { width: 1, height: 25 },
  xpCircle: { width: 22, height: 22, borderRadius: 11, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  xpText: { color: 'white', fontSize: 10, fontWeight: '900' },
  tabs: { flexDirection: 'row', gap: 15, marginTop: 25, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  tab: { paddingBottom: 12, borderBottomWidth: 3, borderBottomColor: 'transparent' },
  tabText: { fontSize: 15, fontWeight: '700' },
  activeTabText: { fontWeight: '900' },
  scrollContent: { paddingTop: 25, paddingBottom: 150 },
  sectionTitle: { fontSize: 18, fontWeight: '900', marginBottom: 12 },
  description: { fontSize: 15, lineHeight: 24, fontWeight: '500' },
  videoCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 12, 
    borderRadius: 22, 
    borderWidth: 1, 
    marginTop: 20,
    gap: 15,
    ...SHADOWS.light
  },
  videoPreview: { width: 100, height: 70, borderRadius: 12, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  videoThumb: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%', borderRadius: 12, opacity: 0.6 },
  playBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  videoTitle: { fontSize: 15, fontWeight: '800' },
  videoMeta: { fontSize: 12, fontWeight: '600', marginTop: 2 },
  materialItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 18, borderBottomWidth: 1 },
  materialLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  materialIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  materialName: { fontSize: 15, fontWeight: '700' },
  materialSize: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  taskContainer: { paddingTop: 10 },
  taskCard: { padding: 25, borderRadius: 28, borderWidth: 1, ...SHADOWS.light },
  taskHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  taskTitle: { fontSize: 18, fontWeight: '900' },
  taskStatus: { fontSize: 10, fontWeight: '900', color: '#EF4444', backgroundColor: '#FEE2E2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  taskDesc: { fontSize: 14, lineHeight: 22, fontWeight: '500', marginBottom: 25 },
  taskBtn: { paddingVertical: 16, borderRadius: 18, alignItems: 'center' },
  taskBtnText: { color: 'white', fontSize: 14, fontWeight: '900', letterSpacing: 1 },
  floatingFooter: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, paddingBottom: Platform.OS === 'ios' ? 35 : 20 },
  mainPlayBtn: { borderRadius: 22, overflow: 'hidden', ...SHADOWS.medium },
  mainPlayGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, gap: 12 },
  mainPlayText: { color: 'white', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  
  // New Styles
  rankingContainer: { paddingTop: 10, gap: 15 },
  rankingHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 20, borderRadius: 22, ...SHADOWS.light },
  rankingTitle: { fontSize: 16, fontWeight: '900' },
  rankItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderRadius: 22, borderWidth: 1, ...SHADOWS.light },
  rankLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rankBadge: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  rankNumber: { fontSize: 12, fontWeight: '900' },
  userAvatar: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  userName: { fontSize: 14, fontWeight: '800' },
  rankRight: { alignItems: 'flex-end' },
  rankXP: { fontSize: 16, fontWeight: '900' },
  xpLabel: { fontSize: 10, fontWeight: '700', marginTop: 2 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  modalContent: { height: '90%', borderTopLeftRadius: 35, borderTopRightRadius: 35, overflow: 'hidden' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: '#000' },
  closeBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  modalTitle: { color: 'white', fontSize: 16, fontWeight: '800' },
  videoPlayerMock: { height: 240, backgroundColor: '#000' },
  playerBg: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  playerPlayBtn: { width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  playerControls: { position: 'absolute', bottom: 15, left: 20, right: 20 },
  playerProgressBg: { height: 4, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 2, marginBottom: 12 },
  playerProgressFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 2 },
  playerBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  playerTime: { color: 'white', fontSize: 11, fontWeight: '700' },
  playerIcons: { flexDirection: 'row', gap: 15 },
  modalInfo: { padding: 25 },
  modalInfoTitle: { fontSize: 18, fontWeight: '900', marginBottom: 12 },
  modalInfoText: { fontSize: 15, lineHeight: 24, fontWeight: '500' },
});

export default StudentLessonDetail;
