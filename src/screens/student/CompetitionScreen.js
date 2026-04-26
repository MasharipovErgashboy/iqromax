import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  Animated 
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Users, Clock, Medal, Crown, TrendingUp, Brain, Calculator, ChevronRight, Zap, Target, BarChart3, Activity, Star, Info, Flame, LayoutGrid, CheckCircle, Play, BookOpen } from 'lucide-react-native';
import StudentPremiumBackground from '../../components/StudentPremiumBackground';

const { width } = Dimensions.get('window');

const LEADERBOARD = [
  { id: '1', name: 'Azizbek K.', xp: 4520, rank: 1, avatar: require('../../../assets/avatar_yellow.png') },
  { id: '2', name: 'Madina O.', xp: 4380, rank: 2, avatar: require('../../../assets/avatar_red.png') },
  { id: '3', name: 'Jasur S.', xp: 4100, rank: 3, avatar: require('../../../assets/avatar_blue.png') },
  { id: '4', name: 'Sardor M.', xp: 3800, rank: 4, avatar: require('../../../assets/mascot.png') },
  { id: '5', name: 'Lola T.', xp: 3550, rank: 5, avatar: require('../../../assets/mascot.png') },
];

const CompetitionScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('practice');
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const renderLeaderboard = () => (
    <View style={styles.leaderboardContainer}>
      <View style={styles.podium}>
        <View style={styles.podiumItem}>
          <View style={[styles.podiumAvatarWrap, { borderColor: '#C0C0C0' }]}>
            <Image source={LEADERBOARD[1].avatar} style={styles.podiumAvatar} />
            <View style={[styles.rankBadge, { backgroundColor: '#C0C0C0' }]}>
              <Text style={styles.rankBadgeText}>2</Text>
            </View>
          </View>
          <Text style={styles.podiumName}>{LEADERBOARD[1].name}</Text>
          <Text style={styles.podiumXP}>{LEADERBOARD[1].xp} XP</Text>
        </View>

        <View style={[styles.podiumItem, styles.podiumFirst]}>
          <View style={[styles.podiumAvatarWrap, { borderColor: '#FFD700', width: 90, height: 90, borderRadius: 45 }]}>
            <Crown style={styles.crownIcon} color="#FFD700" size={24} fill="#FFD700" />
            <Image source={LEADERBOARD[0].avatar} style={[styles.podiumAvatar, { width: 80, height: 80, borderRadius: 40 }]} />
            <View style={[styles.rankBadge, { backgroundColor: '#FFD700', width: 30, height: 30, borderRadius: 15 }]}>
              <Text style={[styles.rankBadgeText, { fontSize: 16 }]}>1</Text>
            </View>
          </View>
          <Text style={[styles.podiumName, { fontSize: 16 }]}>{LEADERBOARD[0].name}</Text>
          <Text style={[styles.podiumXP, { fontSize: 14 }]}>{LEADERBOARD[0].xp} XP</Text>
        </View>

        <View style={styles.podiumItem}>
          <View style={[styles.podiumAvatarWrap, { borderColor: '#CD7F32' }]}>
            <Image source={LEADERBOARD[2].avatar} style={styles.podiumAvatar} />
            <View style={[styles.rankBadge, { backgroundColor: '#CD7F32' }]}>
              <Text style={styles.rankBadgeText}>3</Text>
            </View>
          </View>
          <Text style={styles.podiumName}>{LEADERBOARD[2].name}</Text>
          <Text style={styles.podiumXP}>{LEADERBOARD[2].xp} XP</Text>
        </View>
      </View>

      <View style={styles.rankList}>
        {LEADERBOARD.slice(3).map((user) => (
          <View key={user.id} style={styles.rankItem}>
            <Text style={styles.rankNumber}>#{user.rank}</Text>
            <Image source={user.avatar} style={styles.rankAvatar} />
            <Text style={styles.rankItemName}>{user.name}</Text>
            <Text style={styles.rankItemXP}>{user.xp} XP</Text>
            <TrendingUp color={COLORS.primary} size={16} />
          </View>
        ))}
      </View>
    </View>
  );
  
  const renderPractice = () => (
    <View style={styles.practiceContainer}>
      <TouchableOpacity 
        style={styles.practiceMainCard}
        onPress={() => navigation.navigate('MentalArithmeticPractice')}
      >
        <LinearGradient colors={['#10B981', '#059669']} style={styles.practiceMainGradient}>
          <View style={styles.practiceMainContent}>
            <View style={styles.practiceMainIconWrap}>
              <Brain color="white" size={32} />
            </View>
            <View>
              <Text style={styles.practiceMainTitle}>Mental Arifmetika</Text>
              <Text style={styles.practiceMainDesc}>Xayolan tezkor hisoblashni o'rganing</Text>
            </View>
          </View>
          <ChevronRight color="rgba(255,255,255,0.8)" size={24} />
          <Image source={require('../../../assets/mascot.png')} style={styles.practiceMainImage} />
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.practiceMainCard}
        onPress={() => navigation.navigate('AbacusPracticeSelection')}
      >
        <LinearGradient colors={['#6366F1', '#4F46E5']} style={styles.practiceMainGradient}>
          <View style={styles.practiceMainContent}>
            <View style={styles.practiceMainIconWrap}>
              <Calculator color="white" size={32} />
            </View>
            <View>
              <Text style={styles.practiceMainTitle}>Abakus Mashqlari</Text>
              <Text style={styles.practiceMainDesc}>Abakusda mahoratingizni oshiring</Text>
            </View>
          </View>
          <ChevronRight color="rgba(255,255,255,0.8)" size={24} />
          <Image source={require('../../../assets/abacus_3d.png')} style={styles.practiceMainImage} />
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.motivationCard}>
        <LinearGradient colors={['#F0FDF4', '#DCFCE7']} style={styles.motivationGradient}>
          <View style={styles.motivationIconWrap}>
            <Zap color="#10B981" size={20} fill="#10B981" />
          </View>
          <View style={styles.motivationContent}>
            <Text style={styles.motivationTitle}>Kunlik tavsiya</Text>
            <Text style={styles.motivationText}>Muvaffaqiyat kaliti — muntazam shug'ullanishdir. Bugun o'z mahoratingizni charxlang!</Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );

  const renderStatistics = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statLargeGrid}>
         <View style={styles.statLargeItem}>
            <View style={styles.statIconCircle}>
               <Target color="#10B981" size={24} />
            </View>
            <Text style={styles.statLargeValue}>114</Text>
            <Text style={styles.statLargeLabel}>Jami mashqlar</Text>
         </View>
         <View style={styles.statLargeItem}>
            <View style={[styles.statIconCircle, { backgroundColor: '#F0FDF4' }]}>
               <CheckCircle color="#10B981" size={24} />
            </View>
            <Text style={styles.statLargeValue}>49%</Text>
            <Text style={styles.statLargeLabel}>Aniqlik</Text>
         </View>
         <View style={styles.statLargeItem}>
            <View style={[styles.statIconCircle, { backgroundColor: '#EFF6FF' }]}>
               <Clock color="#3B82F6" size={24} />
            </View>
            <Text style={styles.statLargeValue}>9.4s</Text>
            <Text style={styles.statLargeLabel}>O'rtacha vaqt</Text>
         </View>
         <View style={styles.statLargeItem}>
            <View style={[styles.statIconCircle, { backgroundColor: '#FFF7ED' }]}>
               <Flame color="#F97316" size={24} />
            </View>
            <Text style={styles.statLargeValue}>5</Text>
            <Text style={styles.statLargeLabel}>Eng uzun seriya</Text>
         </View>
      </View>

      <View style={styles.chartPlaceholder}>
         <View style={styles.chartHeader}>
            <BarChart3 color="#1E293B" size={20} />
            <Text style={styles.chartTitle}>Haftalik faollik</Text>
         </View>
         <View style={styles.mockChart}>
            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
              <View key={i} style={[styles.chartBar, { height: h }]} />
            ))}
         </View>
         <View style={styles.chartDays}>
            {['D', 'S', 'C', 'P', 'J', 'Sh', 'Y'].map(d => (
              <Text key={d} style={styles.dayText}>{d}</Text>
            ))}
         </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StudentPremiumBackground color1="#F43F5E" color2="#F59E0B" color3="#D97706" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header Section */}
        <LinearGradient colors={['#F8FAFB', '#FFFFFF']} style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerTitle}>Mashqlar Markazi</Text>
              <Text style={styles.headerSubtitle}>Bilimingizni har kuni charxlab boring</Text>
            </View>
          </View>

          {/* Weekly Goal Progress Card */}
          <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.goalCard}>
            <View style={styles.goalHeader}>
               <View>
                  <Text style={styles.goalLabel}>Haftalik Maqsad</Text>
                  <Text style={styles.goalValue}>32 / 50 <Text style={styles.goalSubValue}>mashq</Text></Text>
               </View>
               <View style={styles.goalPercentWrap}>
                  <Text style={styles.goalPercent}>64%</Text>
               </View>
            </View>
            <View style={styles.goalProgressBg}>
               <View style={[styles.goalProgressFill, { width: '64%' }]} />
            </View>
            <Text style={styles.goalInfo}>Yana 18 ta mashq bajarsangiz maqsadga erishasiz!</Text>
          </LinearGradient>

          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity 
              onPress={() => setActiveTab('practice')}
              style={[styles.tab, activeTab === 'practice' && styles.activeTab]}
            >
              <Zap color={activeTab === 'practice' ? COLORS.primary : COLORS.gray[400]} size={18} />
              <Text style={[styles.tabText, activeTab === 'practice' && styles.activeTabText]}>Mashq</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setActiveTab('leaderboard')}
              style={[styles.tab, activeTab === 'leaderboard' && styles.activeTab]}
            >
              <Trophy color={activeTab === 'leaderboard' ? COLORS.primary : COLORS.gray[400]} size={18} />
              <Text style={[styles.tabText, activeTab === 'leaderboard' && styles.activeTabText]}>Reyting</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setActiveTab('stats')}
              style={[styles.tab, activeTab === 'stats' && styles.activeTab]}
            >
              <BarChart3 color={activeTab === 'stats' ? COLORS.primary : COLORS.gray[400]} size={18} />
              <Text style={[styles.tabText, activeTab === 'stats' && styles.activeTabText]}>Statistika</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {activeTab === 'practice' && renderPractice()}
        {activeTab === 'leaderboard' && renderLeaderboard()}
        {activeTab === 'stats' && renderStatistics()}
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
    padding: SPACING.xl,
    paddingTop: SPACING.lg,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    ...SHADOWS.light,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.gray[500],
    fontWeight: '600',
  },
  pointsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight + '40',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
  },
  goalCard: {
    borderRadius: 24,
    padding: 20,
    ...SHADOWS.medium,
    marginBottom: SPACING.xl,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  goalLabel: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    opacity: 0.9,
    marginBottom: 4,
  },
  goalValue: {
    color: 'white',
    fontSize: 24,
    fontWeight: '900',
  },
  goalSubValue: {
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.8,
  },
  goalPercentWrap: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  goalPercent: {
    color: 'white',
    fontSize: 14,
    fontWeight: '800',
  },
  goalProgressBg: {
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 5,
    marginBottom: 12,
  },
  goalProgressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  goalInfo: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
    opacity: 0.9,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    gap: 4,
  },
  activeTab: {
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.gray[500],
  },
  activeTabText: {
    color: COLORS.primary,
  },
  listContainer: {
    padding: SPACING.lg,
    gap: SPACING.lg,
    paddingBottom: 120, // Increased for dock spacing
  },
  contestCard: {
    borderRadius: 30,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  cardGradient: {
    flexDirection: 'row',
    padding: SPACING.xl,
    minHeight: 180,
  },
  cardInfo: {
    flex: 1,
    zIndex: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
  statusText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '900',
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.white,
    marginBottom: 4,
  },
  cardSubject: {
    fontSize: 13,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 16,
  },
  participantsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  participantsText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.8,
  },
  joinBtn: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  joinBtnText: {
    fontWeight: '800',
    fontSize: 14,
  },
  cardImage: {
    width: 130,
    height: 130,
    position: 'absolute',
    right: -10,
    bottom: -15,
    opacity: 0.9,
  },
  leaderboardContainer: {
    padding: SPACING.lg,
    paddingBottom: 110, // Increased for dock
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 60,
    marginBottom: SPACING.xxl,
  },
  podiumItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  podiumFirst: {
    marginTop: -40,
  },
  podiumAvatarWrap: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    position: 'relative',
    ...SHADOWS.medium,
  },
  podiumAvatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },
  crownIcon: {
    position: 'absolute',
    top: -30,
    zIndex: 10,
  },
  rankBadge: {
    position: 'absolute',
    bottom: -10,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  rankBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '900',
  },
  podiumName: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.gray[800],
    marginTop: 15,
  },
  podiumXP: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '700',
  },
  rankList: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    padding: SPACING.md,
    ...SHADOWS.light,
  },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  rankNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.gray[400],
    width: 40,
    textAlign: 'center',
  },
  rankAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  rankItemName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.gray[800],
  },
  rankItemXP: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.gray[900],
    marginRight: 10,
  },
  practiceContainer: {
    padding: SPACING.lg,
    gap: SPACING.lg,
    paddingBottom: 110,
  },
  dailyProgressCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    ...SHADOWS.light,
    marginBottom: 10,
  },
  dailyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dailyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  streakText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  miniStat: {
    flex: 1,
    alignItems: 'center',
  },
  miniStatVal: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
  },
  miniStatLabel: {
    fontSize: 11,
    color: COLORS.gray[400],
    fontWeight: '600',
    marginTop: 2,
  },
  statLine: {
    width: 1,
    height: 30,
    backgroundColor: '#F1F5F9',
  },
  practiceMainCard: {
    borderRadius: 30,
    overflow: 'hidden',
    ...SHADOWS.medium,
    marginBottom: 20,
  },
  practiceMainGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    minHeight: 140,
  },
  practiceMainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    zIndex: 2,
  },
  practiceMainIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  practiceMainTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: 'white',
  },
  practiceMainDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    marginTop: 4,
  },
  practiceMainImage: {
    width: 110,
    height: 110,
    position: 'absolute',
    right: 15,
    bottom: -15,
    opacity: 0.7,
    zIndex: 1,
  },
  motivationCard: {
    marginTop: 10,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#10B98120',
  },
  motivationGradient: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    gap: 16,
  },
  motivationIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  motivationContent: {
    flex: 1,
  },
  motivationTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#065F46',
    marginBottom: 4,
  },
  motivationText: {
    fontSize: 12,
    color: '#047857',
    fontWeight: '600',
    lineHeight: 18,
  },
  statsContainer: {
    padding: SPACING.lg,
    gap: SPACING.lg,
  },
  statLargeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statLargeItem: {
    width: (width - 64) / 2,
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  statIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statLargeValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
  },
  statLargeLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '700',
    marginTop: 4,
  },
  chartPlaceholder: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 25,
    ...SHADOWS.light,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 25,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
  },
  mockChart: {
    flexDirection: 'row',
    height: 120,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  chartBar: {
    width: 12,
    backgroundColor: '#10B981',
    borderRadius: 6,
    opacity: 0.8,
  },
  chartDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 15,
  },
  dayText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '700',
  },
  historyCard: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 25,
    ...SHADOWS.light,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 20,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  historyInfo: {
    gap: 4,
  },
  historyName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
  },
  historyDate: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  historyBadge: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  historyScore: {
    fontSize: 13,
    fontWeight: '900',
    color: '#10B981',
  },
});

export default CompetitionScreen;
