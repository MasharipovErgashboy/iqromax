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
  Animated,
  Platform,
  StatusBar
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Trophy, 
  Bell, 
  Zap, 
  Trophy as TrophyIcon, 
  BarChart3, 
  ChevronRight, 
  Brain, 
  Calculator,
  Flame,
  Target,
  CheckCircle,
  Clock,
  TrendingUp,
  Star
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const LEADERBOARD = [
  { id: '1', name: 'Azizbek K.', xp: 4520, rank: 1, avatar: require('../../../assets/avatar_1_new.png') },
  { id: '2', name: 'Madina O.', xp: 4380, rank: 2, avatar: require('../../../assets/avatar_2_new.png') },
  { id: '3', name: 'Jasur S.', xp: 4100, rank: 3, avatar: require('../../../assets/avatar_3_new.png') },
  { id: '4', name: 'Sardor M.', xp: 3800, rank: 4, avatar: require('../../../assets/avatar_4_new.png') },
  { id: '5', name: 'Lola T.', xp: 3550, rank: 5, avatar: require('../../../assets/mascot.png') },
];

const CompetitionScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('practice');
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let toValue = 0;
    if (activeTab === 'leaderboard') toValue = 1;
    if (activeTab === 'stats') toValue = 2;

    Animated.spring(slideAnim, {
      toValue,
      useNativeDriver: true,
      friction: 8,
      tension: 50,
    }).start();
  }, [activeTab]);

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerTitle}>Mashqlar Markazi</Text>
        <Text style={styles.headerSubtitle}>Bilimingizni har kuni charxlab boring</Text>
      </View>
    </View>
  );

  const renderGoalCard = () => (
    <LinearGradient 
      colors={['#10B981', '#059669']} 
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.goalCard}
    >
      <View style={styles.goalTop}>
        <View style={styles.goalHeaderRow}>
          <View style={styles.goalTitleRow}>
             <Target color="white" size={16} style={{ marginRight: 6 }} />
             <Text style={styles.goalLabel}>Haftalik Maqsad</Text>
          </View>
          <View style={styles.streakBadge}>
             <Flame color="#F59E0B" size={14} fill="#F59E0B" />
             <Text style={styles.streakText}>Streak: 5 kun</Text>
          </View>
        </View>
        
        <View style={styles.goalMainInfo}>
           <View>
             <Text style={styles.goalValue}>32 / 50 <Text style={styles.goalSubValue}>mashq</Text></Text>
             <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBg}>
                   <View style={[styles.progressBarFill, { width: '64%' }]} />
                </View>
                <View style={styles.percentBadge}>
                   <Text style={styles.percentText}>64%</Text>
                </View>
             </View>
           </View>
        </View>
        <Text style={styles.goalMessage}>Yana 18 ta mashq bajarsangiz maqsadga erishasiz!</Text>
      </View>
      <Image 
        source={{ uri: 'C:\\Users\\Mirshoxid\\.gemini\\antigravity\brain\\3a78a5d8-7b3f-4dfb-a86c-cd92bcf53709\\3d_trophy_mashqlar_1777311419965.png' }} 
        style={styles.trophyImage} 
      />
    </LinearGradient>
  );

  const renderTabs = () => {
    const tabWidth = (width - 40) / 3;
    const translateX = slideAnim.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, tabWidth, tabWidth * 2]
    });

    return (
      <View style={styles.tabsContainer}>
        <Animated.View style={[styles.tabIndicator, { width: tabWidth - 8, transform: [{ translateX }] }]} />
        <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('practice')}>
          <Zap color={activeTab === 'practice' ? '#10B981' : '#94A3B8'} size={20} style={{ marginRight: 8 }} />
          <Text style={[styles.tabText, activeTab === 'practice' && styles.activeTabText]}>Mashq</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('leaderboard')}>
          <TrophyIcon color={activeTab === 'leaderboard' ? '#10B981' : '#94A3B8'} size={20} style={{ marginRight: 8 }} />
          <Text style={[styles.tabText, activeTab === 'leaderboard' && styles.activeTabText]}>Reyting</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('stats')}>
          <BarChart3 color={activeTab === 'stats' ? '#10B981' : '#94A3B8'} size={20} style={{ marginRight: 8 }} />
          <Text style={[styles.tabText, activeTab === 'stats' && styles.activeTabText]}>Statistika</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderPractice = () => (
    <View style={styles.practiceList}>
      {/* Mental Arithmetic - Minimalist Mesh Card */}
      <TouchableOpacity 
        activeOpacity={0.85} 
        style={styles.meshCard}
        onPress={() => navigation.navigate('MentalArithmeticPractice')}
      >
        <LinearGradient 
          colors={['#059669', '#064E3B']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.meshGradient}
        >
          {/* Abstract Mesh Blobs */}
          <View style={[styles.meshBlob, { top: -20, right: -30, backgroundColor: '#10B981', opacity: 0.4 }]} />
          <View style={[styles.meshBlob, { bottom: -40, left: -20, backgroundColor: '#34D399', opacity: 0.2 }]} />
          
          <View style={styles.meshContent}>
            <View style={styles.meshIconContainer}>
              <Brain color="white" size={32} />
              <View style={styles.meshIconGlow} />
            </View>
            
            <View style={styles.meshTextContainer}>
              <View style={styles.meshHeaderRow}>
                 <Text style={styles.meshTitle}>Mental Arifmetika</Text>
              </View>
              <Text style={styles.meshDesc}>Xayolan tezkor hisoblash mahorati</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Abacus - Minimalist Mesh Card */}
      <TouchableOpacity 
        activeOpacity={0.85} 
        style={styles.meshCard}
        onPress={() => navigation.navigate('AbacusPracticeSelection')}
      >
        <LinearGradient 
          colors={['#4F46E5', '#1E1B4B']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.meshGradient}
        >
          {/* Abstract Mesh Blobs */}
          <View style={[styles.meshBlob, { top: -30, right: -20, backgroundColor: '#818CF8', opacity: 0.3 }]} />
          <View style={[styles.meshBlob, { bottom: -20, left: 20, backgroundColor: '#6366F1', opacity: 0.2 }]} />
          
          <View style={styles.meshContent}>
            <View style={styles.meshIconContainer}>
              <Calculator color="white" size={32} />
              <View style={[styles.meshIconGlow, { backgroundColor: '#818CF8' }]} />
            </View>
            
            <View style={styles.meshTextContainer}>
              <View style={styles.meshHeaderRow}>
                 <Text style={styles.meshTitle}>Abakus Mashqlari</Text>
              </View>
              <Text style={styles.meshDesc}>Abakusda professionallik sari</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

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
           <View style={[styles.podiumAvatarWrap, { borderColor: '#FFD700', width: 100, height: 100, borderRadius: 50 }]}>
             <Image source={LEADERBOARD[0].avatar} style={[styles.podiumAvatar, { width: 88, height: 88, borderRadius: 44 }]} />
             <View style={[styles.rankBadge, { backgroundColor: '#FFD700', width: 32, height: 32, borderRadius: 16 }]}>
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
             <TrendingUp color="#10B981" size={16} />
           </View>
         ))}
       </View>
     </View>
  );

  const renderStatistics = () => {
    const weeklyData = [
      { day: 'Du', value: 45 },
      { day: 'Se', value: 75 },
      { day: 'Cho', value: 60 },
      { day: 'Pa', value: 90 },
      { day: 'Ju', value: 40 },
      { day: 'Sha', value: 30 },
      { day: 'Ya', value: 20 },
    ];

    return (
      <View style={styles.statsContainer}>
        <View style={styles.statGrid}>
          <View style={styles.statCard}>
            <View style={styles.statIconCircle}>
              <Target color="#10B981" size={24} />
            </View>
            <Text style={styles.statValue}>114</Text>
            <Text style={styles.statLabel}>Jami mashqlar</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, { backgroundColor: '#ECFDF5' }]}>
              <CheckCircle color="#10B981" size={24} />
            </View>
            <Text style={styles.statValue}>49%</Text>
            <Text style={styles.statLabel}>Aniqlik</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, { backgroundColor: '#EEF2FF' }]}>
              <Clock color="#6366F1" size={24} />
            </View>
            <Text style={styles.statValue}>9.4s</Text>
            <Text style={styles.statLabel}>O'rtacha vaqt</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, { backgroundColor: '#FFF7ED' }]}>
              <Flame color="#F97316" size={24} />
            </View>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Eng uzun seriya</Text>
          </View>
        </View>

        {/* Weekly Activity Chart */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartTitle}>Haftalik Faollik</Text>
              <Text style={styles.chartSubtitle}>Oxirgi 7 kunlik ko'rsatkich</Text>
            </View>
            <View style={styles.chartPeriodBadge}>
              <Text style={styles.chartPeriodText}>Shu hafta</Text>
            </View>
          </View>

          <View style={styles.chartBody}>
            {weeklyData.map((item, index) => (
              <View key={index} style={styles.barWrapper}>
                <View style={styles.barBackground}>
                  <LinearGradient
                    colors={index === 3 ? ['#10B981', '#059669'] : ['#E2E8F0', '#CBD5E1']}
                    style={[styles.barFill, { height: `${item.value}%` }]}
                  />
                </View>
                <Text style={[styles.barDay, index === 3 && styles.activeBarDay]}>{item.day}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {renderHeader()}
        <View style={styles.mainContent}>
          {renderGoalCard()}
          {renderTabs()}
          
          <Animated.View style={{ opacity: 1 }}>
            {activeTab === 'practice' && renderPractice()}
            {activeTab === 'leaderboard' && renderLeaderboard()}
            {activeTab === 'stats' && renderStatistics()}
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
  },
  mainContent: {
    paddingHorizontal: 20,
  },
  goalCard: {
    borderRadius: 32,
    padding: 24,
    minHeight: 180,
    position: 'relative',
    overflow: 'hidden',
    ...SHADOWS.medium,
    marginBottom: 25,
  },
  goalTop: {
    zIndex: 2,
    flex: 1,
  },
  goalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalLabel: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    opacity: 0.9,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 4,
  },
  streakText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '800',
  },
  goalValue: {
    color: 'white',
    fontSize: 32,
    fontWeight: '900',
  },
  goalSubValue: {
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.8,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 12,
  },
  progressBarBg: {
    flex: 1,
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 6,
  },
  percentBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  percentText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '900',
  },
  goalMessage: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.9,
    marginTop: 16,
  },
  trophyImage: {
    width: 140,
    height: 140,
    position: 'absolute',
    right: -10,
    bottom: 5,
    zIndex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(241, 245, 249, 0.8)',
    borderRadius: 20,
    padding: 4,
    marginBottom: 25,
    position: 'relative',
    height: 56,
    alignItems: 'center',
  },
  tabIndicator: {
    position: 'absolute',
    height: 48,
    backgroundColor: 'white',
    borderRadius: 16,
    left: 4,
    ...SHADOWS.light,
  },
  tab: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94A3B8',
  },
  activeTabText: {
    color: '#1E293B',
    fontWeight: '800',
  },
  practiceList: {
    gap: 18,
  },
  meshCard: {
    borderRadius: 28,
    overflow: 'hidden',
    ...SHADOWS.medium,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  meshGradient: {
    padding: 28,
    minHeight: 140,
    position: 'relative',
    justifyContent: 'center',
  },
  meshBlob: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  meshContent: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  meshIconContainer: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    position: 'relative',
  },
  meshIconGlow: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#34D399',
    opacity: 0.35,
    zIndex: -1,
  },
  meshTextContainer: {
    flex: 1,
    gap: 4,
  },
  meshHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 2,
  },
  meshTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: 'white',
    letterSpacing: 0.3,
  },
  meshDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '600',
    lineHeight: 19,
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    marginTop: 20,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  leaderboardContainer: {
    paddingBottom: 20,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 40,
    marginBottom: 30,
  },
  podiumItem: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
  podiumFirst: {
    marginTop: -30,
  },
  podiumAvatarWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'relative',
    ...SHADOWS.medium,
  },
  podiumAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  rankBadge: {
    position: 'absolute',
    bottom: -12,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  rankBadgeText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '900',
  },
  podiumName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 18,
  },
  podiumXP: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '700',
    marginTop: 2,
  },
  rankList: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 12,
    ...SHADOWS.light,
  },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  rankNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: '#94A3B8',
    width: 40,
    textAlign: 'center',
  },
  rankAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
  rankItemName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  rankItemXP: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginRight: 10,
  },
  statsContainer: {
    paddingBottom: 20,
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: (width - 52) / 2,
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  statIconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '700',
    marginTop: 4,
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    marginTop: 20,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  chartSubtitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
  },
  chartPeriodBadge: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  chartPeriodText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
  },
  chartBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
    paddingHorizontal: 5,
  },
  barWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  barBackground: {
    width: 12,
    height: 120,
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 6,
  },
  barDay: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    marginTop: 10,
  },
  activeBarDay: {
    color: '#0F172A',
    fontWeight: '900',
  },
});

export default CompetitionScreen;
