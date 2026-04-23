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
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft,
  Target,
  Zap,
  Trophy,
  Clock,
  ChevronRight,
  HelpCircle,
  Play,
  X,
  Maximize2,
  Volume2,
  Star
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const AbacusLevelDetail = ({ navigation, route }) => {
  const { isDark, theme } = useTheme();
  const { level = { id: 2, title: 'Oddiy qo\'shish', sub: '1-4 sonlarni qo\'shish', xp: 100 } } = route.params || {};
  const [videoVisible, setVideoVisible] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: theme.card }]}>
          <ArrowLeft color={theme.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Level {level.id}</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Mission Card */}
        <LinearGradient
          colors={isDark ? ['#1E293B', '#0F172A'] : [COLORS.secondary, '#D97706']}
          style={styles.missionCard}
        >
           <View style={styles.missionIcon}>
              <Target color="white" size={40} />
           </View>
           <Text style={styles.missionTitle}>{level.title}</Text>
           <Text style={styles.missionSub}>{level.sub}</Text>
           
           <View style={styles.rewardsRow}>
              <View style={styles.rewardItem}>
                 <Zap color="#FBBF24" fill="#FBBF24" size={16} />
                 <Text style={styles.rewardText}>{level.xp} XP</Text>
              </View>
              <View style={styles.rewardItem}>
                 <Trophy color="#FBBF24" fill="#FBBF24" size={16} />
                 <Text style={styles.rewardText}>Badge</Text>
              </View>
           </View>
        </LinearGradient>

        <View style={styles.detailsSection}>
           <Text style={[styles.sectionTitle, { color: theme.text }]}>Missiya vazifalari</Text>
           
           <View style={[styles.taskItem, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={[styles.taskIcon, { backgroundColor: '#E0F2FE' }]}>
                 <Text style={{ fontSize: 18 }}>🔢</Text>
              </View>
              <View style={styles.taskInfo}>
                 <Text style={[styles.taskTitleText, { color: theme.text }]}>10 ta misol</Text>
                 <Text style={[styles.taskSubText, { color: theme.textSecondary }]}>Aniq va tezkor hisoblang</Text>
              </View>
           </View>

           <View style={[styles.taskItem, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={[styles.taskIcon, { backgroundColor: '#F0FDF4' }]}>
                 <Clock color="#22C55E" size={24} />
              </View>
              <View style={styles.taskInfo}>
                 <Text style={[styles.taskTitleText, { color: theme.text }]}>3 daqiqa</Text>
                 <Text style={[styles.taskSubText, { color: theme.textSecondary }]}>Vaqt tugashidan oldin bajaring</Text>
              </View>
           </View>

           <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 30 }]}>Qanday bajariladi?</Text>
           <Text style={[styles.tutorialText, { color: theme.textSecondary }]}>
             Abakus simulyatoridan foydalanib, ekranda chiqadigan misollarni yeching. 
             Har bir to'g'ri javob uchun XP beriladi. Barcha misollarni yechganingizdan so'ng keyingi level ochiladi.
           </Text>
           
           <TouchableOpacity 
              onPress={() => setVideoVisible(true)}
              style={[styles.helpLink, { backgroundColor: COLORS.primary + '10' }]}
            >
               <HelpCircle color={COLORS.primary} size={20} />
               <Text style={[styles.helpLinkText, { color: COLORS.primary }]}>Videoni ko'rish</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Video Player Modal */}
      <Modal visible={videoVisible} animationType="slide" transparent>
         <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
               <SafeAreaView style={{ flex: 1 }}>
                  <View style={styles.modalHeader}>
                     <TouchableOpacity onPress={() => setVideoVisible(false)} style={styles.closeBtn}>
                        <X color="white" size={24} />
                     </TouchableOpacity>
                     <Text style={styles.modalTitle}>{level.title} - Dars Videosi</Text>
                     <View style={{ width: 44 }} />
                  </View>

                  <View style={styles.videoPlayerMock}>
                     <LinearGradient colors={['#0F172A', '#1E293B']} style={styles.playerBg}>
                        <TouchableOpacity style={styles.playerPlayBtn}>
                           <Play color="white" fill="white" size={40} />
                        </TouchableOpacity>
                     </LinearGradient>
                     
                     <View style={styles.playerControls}>
                        <View style={styles.playerProgressBg}>
                           <View style={[styles.playerProgressFill, { width: '35%', backgroundColor: COLORS.primary }]} />
                        </View>
                        <View style={styles.playerBottomRow}>
                           <Text style={styles.playerTime}>01:12 / 05:40</Text>
                           <View style={styles.playerIcons}>
                              <Volume2 color="white" size={20} />
                              <Maximize2 color="white" size={20} />
                           </View>
                        </View>
                     </View>
                  </View>

                  <ScrollView style={styles.modalInfo}>
                     <View style={styles.modalInfoCard}>
                        <Star color="#F59E0B" fill="#F59E0B" size={24} />
                        <View>
                           <Text style={[styles.modalInfoTitle, { color: theme.text }]}>Video bo'yicha maslahat</Text>
                           <Text style={[styles.modalInfoText, { color: theme.textSecondary }]}>
                             Barmoqlaringizni abakusga to'g'ri joylashtirishni diqqat bilan kuzatib boring. 
                             Har bir harakat aniq va tezkor bo'lishi kerak.
                           </Text>
                        </View>
                     </View>
                  </ScrollView>
               </SafeAreaView>
            </View>
         </View>
      </Modal>

      <View style={[styles.footer, { backgroundColor: theme.background }]}>
         <TouchableOpacity 
           onPress={() => navigation.navigate('AbacusSimulator')}
           style={styles.startBtn}
         >
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.btnGradient}
            >
               <Play color="white" fill="white" size={24} />
               <Text style={styles.startBtnText}>SIMULYATORNI OCHISH</Text>
            </LinearGradient>
         </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 },
  backBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', ...SHADOWS.light },
  title: { fontSize: 18, fontWeight: '900' },
  scrollContent: { padding: 25 },
  missionCard: { padding: 30, borderRadius: 32, alignItems: 'center', ...SHADOWS.medium },
  missionIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  missionTitle: { fontSize: 24, fontWeight: '900', color: 'white', textAlign: 'center' },
  missionSub: { fontSize: 14, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginTop: 8, fontWeight: '600' },
  rewardsRow: { flexDirection: 'row', gap: 20, marginTop: 25 },
  rewardItem: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(0,0,0,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  rewardText: { color: 'white', fontSize: 13, fontWeight: '800' },
  detailsSection: { marginTop: 35 },
  sectionTitle: { fontSize: 18, fontWeight: '900', marginBottom: 20 },
  taskItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 22, borderWidth: 1, gap: 15, marginBottom: 12 },
  taskIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  taskInfo: { flex: 1 },
  taskTitleText: { fontSize: 16, fontWeight: '800' },
  taskSubText: { fontSize: 12, fontWeight: '600', marginTop: 2 },
  tutorialText: { fontSize: 15, lineHeight: 24, fontWeight: '500' },
  helpLink: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 15, borderRadius: 15, marginTop: 20, alignSelf: 'flex-start' },
  helpLinkText: { fontSize: 14, fontWeight: '800' },
  footer: { padding: 20, paddingBottom: Platform.OS === 'ios' ? 40 : 20 },
  startBtn: { borderRadius: 22, overflow: 'hidden', ...SHADOWS.medium },
  btnGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, gap: 12 },
  startBtnText: { color: 'white', fontSize: 16, fontWeight: '900', letterSpacing: 1 },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  modalContent: { height: '85%', borderTopLeftRadius: 35, borderTopRightRadius: 35, overflow: 'hidden' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: '#000' },
  closeBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  modalTitle: { color: 'white', fontSize: 16, fontWeight: '800' },
  videoPlayerMock: { height: 240, backgroundColor: '#000' },
  playerBg: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  playerPlayBtn: { width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  playerControls: { position: 'absolute', bottom: 15, left: 20, right: 20 },
  playerProgressBg: { height: 4, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 2, marginBottom: 12 },
  playerProgressFill: { height: '100%', borderRadius: 2 },
  playerBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  playerTime: { color: 'white', fontSize: 11, fontWeight: '700' },
  playerIcons: { flexDirection: 'row', gap: 15 },
  modalInfo: { padding: 25 },
  modalInfoCard: { flexDirection: 'row', gap: 15, padding: 20, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.03)' },
  modalInfoTitle: { fontSize: 16, fontWeight: '900', marginBottom: 4 },
  modalInfoText: { fontSize: 14, lineHeight: 22, fontWeight: '500' },
});

export default AbacusLevelDetail;
