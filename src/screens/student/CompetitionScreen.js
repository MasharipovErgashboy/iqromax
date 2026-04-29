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
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.headerIconBtn}>
          <Bell color="#1E293B" size={24} />
          <View style={styles.notifDot} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileBtn}>
          <Image source={require('../../../assets/avatar_1_new.png')} style={styles.profileAvatar} />
        </TouchableOpacity>
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
      {/* Mental Arithmetic Card */}
      <TouchableOpacity 
        activeOpacity={0.9} 
        style={styles.exerciseCard}
        onPress={() => navigation.navigate('MentalArithmeticPractice')}
      >
        <LinearGradient colors={['#13C296', '#0A9B78', '#06785D']} style={styles.exerciseGradient}>
          <View style={styles.exerciseLeft}>
            <View style={styles.exerciseIconBg}>
              <Brain color="white" size={28} />
            </View>
            <Text style={styles.exerciseTitle}>Mental Arifmetika</Text>
            <Text style={styles.exerciseDesc}>Xayolan tezkor{'\n'}hisoblashni o'rganing</Text>
            
            <View style={styles.tagBadge}>
              <Star color="#FBBF24" size={12} fill="#FBBF24" />
              <Text style={styles.tagText}>Boshlang'ich</Text>
            </View>

            <TouchableOpacity 
              style={styles.startBtn}
              onPress={() => navigation.navigate('MentalArithmeticPractice')}
            >
              <Text style={[styles.startBtnText, { color: '#0A9B78' }]}>Boshlash</Text>
              <ChevronRight color="#0A9B78" size={18} />
            </TouchableOpacity>
          </View>
          <Image 
            source={require('../../../assets/mental_arithmetic_3d.png')} 
            style={styles.exerciseImage} 
          />
        </LinearGradient>
      </TouchableOpacity>

      {/* Abacus Card */}
      <TouchableOpacity 
        activeOpacity={0.9} 
        style={styles.exerciseCard}
        onPress={() => navigation.navigate('AbacusPracticeSelection')}
      >
        <LinearGradient colors={['#8B7AE8', '#6B5BD6', '#5548C8']} style={styles.exerciseGradient}>
          <View style={styles.exerciseLeft}>
            <View style={styles.exerciseIconBg}>
              <Calculator color="white" size={28} />
            </View>
            <Text style={styles.exerciseTitle}>Abakus Mashqlari</Text>
            <Text style={styles.exerciseDesc}>Abakusda mahoratingizni{'\n'}oshiring</Text>
            
            <View style={styles.tagBadge}>
              <Star color="#FBBF24" size={12} fill="#FBBF24" />
              <Text style={styles.tagText}>Boshlang'ich</Text>
            </View>

            <TouchableOpacity 
              style={styles.startBtn}
              onPress={() => navigation.navigate('AbacusPracticeSelection')}
            >
              <Text style={[styles.startBtnText, { color: '#5548C8' }]}>Boshlash</Text>
              <ChevronRight color="#5548C8" size={18} />
            </TouchableOpacity>
          </View>
          <Image 
            source={require('../../../assets/abacus_3d.png')} 
            style={styles.exerciseImage} 
          />
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

  const renderStatistics = () => (
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
    </View>
  );

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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  notifDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: 'white',
  },
  profileBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    ...SHADOWS.light,
  },
  profileAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
  exerciseCard: {
    borderRadius: 24,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  exerciseGradient: {
    flexDirection: 'row',
    paddingLeft: 22,
    paddingTop: 22,
    paddingBottom: 0,
    paddingRight: 0,
    minHeight: 195,
    alignItems: 'flex-end',
  },
  exerciseLeft: {
    flex: 1,
    zIndex: 2,
    paddingBottom: 22,
    paddingRight: 8,
  },
  exerciseIconBg: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  exerciseTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: 'white',
    marginBottom: 4,
  },
  exerciseDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
    marginBottom: 12,
    lineHeight: 18,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  tagText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  startBtn: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 16,
    gap: 6,
    alignSelf: 'flex-start',
    ...SHADOWS.light,
  },
  startBtnText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F172A',
  },
  exerciseImage: {
    width: 160,
    height: 175,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
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
});

export default CompetitionScreen;
