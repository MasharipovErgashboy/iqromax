import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, 
  Trophy, 
  Users, 
  Clock, 
  ShieldCheck, 
  Info, 
  ChevronRight,
  Medal,
  Star,
  Zap,
  Gift
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const StudentCompetitionDetail = ({ navigation, route }) => {
  const { isDark, theme } = useTheme();
  const { competition } = route.params || {
    competition: {
      id: '1',
      title: 'Global Algebra Challenge',
      subject: 'Mental Arifmetika',
      participants: 1240,
      time: '02:45:10',
      status: 'LIVE',
      colors: ['#3B82F6', '#2563EB'],
    }
  };

  const [timeLeft, setTimeLeft] = useState(competition.time);

  // Mock participants
  const PARTICIPANTS = [
    { id: '1', name: 'Azizbek K.', xp: 4520, avatar: require('../../../assets/avatar_yellow.png') },
    { id: '2', name: 'Madina O.', xp: 4380, avatar: require('../../../assets/avatar_red.png') },
    { id: '3', name: 'Jasur S.', xp: 4100, avatar: require('../../../assets/avatar_blue.png') },
    { id: '4', name: 'Sardor M.', xp: 3800, avatar: require('../../../assets/mascot.png') },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Hero Header */}
      <View style={styles.heroContainer}>
        <LinearGradient
          colors={competition.colors}
          style={styles.heroGradient}
        >
          <SafeAreaView>
            <View style={styles.headerTop}>
              <TouchableOpacity 
                onPress={() => navigation.goBack()} 
                style={styles.backBtn}
              >
                <ArrowLeft color="white" size={24} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Musobaqa Tafsiloti</Text>
              <View style={{ width: 44 }} />
            </View>

            <View style={styles.heroContent}>
              <View style={styles.statusPill}>
                 <View style={styles.pulseDot} />
                 <Text style={styles.statusText}>{competition.status}</Text>
              </View>
              <Text style={styles.mainTitle}>{competition.title}</Text>
              <View style={styles.subjectChip}>
                <Text style={styles.subjectText}>{competition.subject}</Text>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {/* Prize Pool Card */}
        <View style={styles.prizeCardContainer}>
           <BlurView intensity={isDark ? 40 : 80} tint={isDark ? "dark" : "light"} style={styles.prizeBlur}>
              <LinearGradient 
                colors={isDark ? ['rgba(255,255,255,0.05)', 'transparent'] : ['rgba(255,255,255,0.8)', 'transparent']}
                style={styles.prizeInner}
              >
                 <View style={styles.prizeIconWrap}>
                    <Trophy color="#F59E0B" fill="#F59E0B" size={32} />
                 </View>
                 <View>
                    <Text style={[styles.prizeLabel, { color: theme.textSecondary }]}>MUKOFOT JAMG'ARMASI</Text>
                    <Text style={[styles.prizeAmount, { color: theme.text }]}>5,000,000 UZS</Text>
                 </View>
              </LinearGradient>
           </BlurView>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
           <View style={[styles.statItem, { backgroundColor: theme.card }]}>
              <Users color={COLORS.primary} size={20} />
              <View>
                 <Text style={[styles.statValue, { color: theme.text }]}>{competition.participants}</Text>
                 <Text style={[styles.statLabel, { color: theme.textSecondary }]}>O'quvchilar</Text>
              </View>
           </View>
           <View style={[styles.statItem, { backgroundColor: theme.card }]}>
              <Clock color="#EF4444" size={20} />
              <View>
                 <Text style={[styles.statValue, { color: theme.text }]}>{timeLeft}</Text>
                 <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Qolgan vaqt</Text>
              </View>
           </View>
        </View>

        {/* Content Section */}
        <View style={styles.section}>
           <Text style={[styles.sectionTitle, { color: theme.text }]}>Musobaqa haqida</Text>
           <Text style={[styles.description, { color: theme.textSecondary }]}>
             Ushbu global musobaqada dunyo bo'ylab eng kuchli o'quvchilar bilan bellashing. 
             Sizga 30 ta murakkab misollar beriladi va eng yuqori natija ko'rsatgan 3 ta o'quvchi bosh sovrinni qo'lga kiritadi.
           </Text>
           
           <View style={[styles.ruleCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={styles.ruleItem}>
                 <ShieldCheck color="#10B981" size={20} />
                 <Text style={[styles.ruleText, { color: theme.text }]}>Simulyatordan foydalanish taqiqlanadi</Text>
              </View>
              <View style={styles.ruleItem}>
                 <Info color="#3B82F6" size={20} />
                 <Text style={[styles.ruleText, { color: theme.text }]}>Har bir misol uchun 20 soniya vaqt</Text>
              </View>
           </View>
        </View>

        {/* Participants Mosaic */}
        <View style={styles.section}>
           <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Ishtirokchilar</Text>
              <TouchableOpacity>
                 <Text style={{ color: COLORS.primary, fontWeight: '700' }}>Barchasi</Text>
              </TouchableOpacity>
           </View>
           <View style={styles.participantsList}>
              {PARTICIPANTS.map((p, idx) => (
                <View key={p.id} style={[styles.participantItem, { backgroundColor: theme.card }]}>
                   <Image source={p.avatar} style={styles.pAvatar} />
                   <View style={styles.pInfo}>
                      <Text style={[styles.pName, { color: theme.text }]}>{p.name}</Text>
                      <Text style={[styles.pXp, { color: theme.textSecondary }]}>{p.xp} XP</Text>
                   </View>
                   {idx === 0 && <Medal color="#FFD700" size={20} fill="#FFD700" />}
                </View>
              ))}
           </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Floating Action Bar */}
      <BlurView intensity={isDark ? 50 : 90} tint={isDark ? "dark" : "light"} style={styles.actionBar}>
         <TouchableOpacity 
           activeOpacity={0.9} 
           style={[styles.joinBtn, { backgroundColor: competition.colors[1] }]}
           onPress={() => navigation.navigate('CompetitionArena', { competition })}
         >
            <LinearGradient 
              colors={['rgba(255,255,255,0.2)', 'transparent']} 
              start={{ x: 0, y: 0 }} 
              end={{ x: 1, y: 1 }}
              style={styles.joinInner}
            >
               <Text style={styles.joinText}>MUSOBAQAGA QO'SHILISH</Text>
               <ChevronRight color="white" size={20} />
            </LinearGradient>
         </TouchableOpacity>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroContainer: { height: 280, width: '100%' },
  heroGradient: { flex: 1, paddingHorizontal: 20 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { color: 'white', fontSize: 16, fontWeight: '800' },
  heroContent: { marginTop: 30, alignItems: 'center' },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginBottom: 15 },
  pulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444' },
  statusText: { color: 'white', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  mainTitle: { color: 'white', fontSize: 26, fontWeight: '900', textAlign: 'center' },
  subjectChip: { marginTop: 10, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.1)' },
  subjectText: { color: 'white', fontSize: 13, fontWeight: '700', opacity: 0.9 },
  
  scrollView: { marginTop: -40 },
  scrollContent: { paddingHorizontal: 20 },
  prizeCardContainer: { borderRadius: 30, overflow: 'hidden', ...SHADOWS.medium },
  prizeBlur: { borderRadius: 30 },
  prizeInner: { flexDirection: 'row', alignItems: 'center', padding: 25, gap: 20 },
  prizeIconWrap: { width: 64, height: 64, borderRadius: 20, backgroundColor: 'rgba(245, 158, 11, 0.1)', justifyContent: 'center', alignItems: 'center' },
  prizeLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  prizeAmount: { fontSize: 24, fontWeight: '900', marginTop: 4 },

  statsRow: { flexDirection: 'row', gap: 15, marginTop: 25 },
  statItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 18, borderRadius: 22, ...SHADOWS.light },
  statValue: { fontSize: 16, fontWeight: '900' },
  statLabel: { fontSize: 11, fontWeight: '700' },

  section: { marginTop: 35 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '900', marginBottom: 15 },
  description: { fontSize: 14, lineHeight: 22, fontWeight: '500' },
  ruleCard: { marginTop: 20, padding: 20, borderRadius: 22, borderWidth: 1, gap: 12 },
  ruleItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  ruleText: { fontSize: 13, fontWeight: '600' },

  participantsList: { gap: 10 },
  participantItem: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 18, ...SHADOWS.light },
  pAvatar: { width: 44, height: 44, borderRadius: 22, marginRight: 15 },
  pInfo: { flex: 1 },
  pName: { fontSize: 14, fontWeight: '800' },
  pXp: { fontSize: 12, fontWeight: '600', marginTop: 2 },

  actionBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 25, paddingBottom: Platform.OS === 'ios' ? 40 : 25, borderTopLeftRadius: 30, borderTopRightRadius: 30, overflow: 'hidden' },
  joinBtn: { borderRadius: 20, overflow: 'hidden', ...SHADOWS.medium },
  joinInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, gap: 10 },
  joinText: { color: 'white', fontSize: 15, fontWeight: '900', letterSpacing: 1 },
});

export default StudentCompetitionDetail;
