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
import { Trophy, Users, Clock, Medal, Crown, TrendingUp } from 'lucide-react-native';
import StudentPremiumBackground from '../../components/StudentPremiumBackground';

const { width } = Dimensions.get('window');

const CONTESTS = [
  {
    id: '1',
    title: 'Global Algebra Challenge',
    subject: 'Mental Arifmetika',
    participants: 1240,
    time: '02:45:10',
    status: 'LIVE',
    colors: ['#3B82F6', '#2563EB'],
    image: require('../../../assets/abacus_3d.png'),
  },
  {
    id: '2',
    title: 'Mantiqiy Bilimdon 2026',
    subject: 'Mantiqiy fikrlash',
    participants: 850,
    time: 'Starts in 1h',
    status: 'UPCOMING',
    colors: ['#F59E0B', '#D97706'],
    image: require('../../../assets/avatar_red.png'),
  },
  {
    id: '3',
    title: 'Tezkor O\'qish Marafoni',
    subject: 'Tez O\'qish',
    participants: 2100,
    time: '24:00:00',
    status: 'UPCOMING',
    colors: ['#8B5CF6', '#7C3AED'],
    image: require('../../../assets/avatar_blue.png'),
  },
];

const LEADERBOARD = [
  { id: '1', name: 'Azizbek K.', xp: 4520, rank: 1, avatar: require('../../../assets/avatar_yellow.png') },
  { id: '2', name: 'Madina O.', xp: 4380, rank: 2, avatar: require('../../../assets/avatar_red.png') },
  { id: '3', name: 'Jasur S.', xp: 4100, rank: 3, avatar: require('../../../assets/avatar_blue.png') },
  { id: '4', name: 'Sardor M.', xp: 3800, rank: 4, avatar: require('../../../assets/mascot.png') },
  { id: '5', name: 'Lola T.', xp: 3550, rank: 5, avatar: require('../../../assets/mascot.png') },
];

const CompetitionScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('contests');
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

  const renderContests = () => (
    <View style={styles.listContainer}>
      {CONTESTS.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          style={styles.contestCard} 
          activeOpacity={0.9}
          onPress={() => navigation.navigate('CompetitionDetail', { competition: item })}
        >
          <LinearGradient colors={item.colors} style={styles.cardGradient}>
            <View style={styles.cardInfo}>
              <View style={styles.statusRow}>
                <View style={styles.statusBadge}>
                  {item.status === 'LIVE' && (
                    <Animated.View style={[styles.pulseDot, { transform: [{ scale: pulseAnim }] }]} />
                  )}
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
                <View style={styles.timeWrapper}>
                  <Clock color={COLORS.white} size={14} />
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubject}>{item.subject}</Text>
              <View style={styles.participantsRow}>
                <Users color={COLORS.white} size={16} opacity={0.8} />
                <Text style={styles.participantsText}>{item.participants} o'quvchi qo'shildi</Text>
              </View>
              <TouchableOpacity 
                style={styles.joinBtn}
                onPress={() => navigation.navigate('CompetitionDetail', { competition: item })}
              >
                <Text style={[styles.joinBtnText, { color: item.colors[1] }]}>Ishtirok etish</Text>
              </TouchableOpacity>
            </View>
            <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderLeaderboard = () => (
    <View style={styles.leaderboardContainer}>
      {/* Top 3 Podium Placeholder Style */}
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

      {/* Other Ranks */}
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

  return (
    <SafeAreaView style={styles.container}>
      <StudentPremiumBackground color1="#F43F5E" color2="#F59E0B" color3="#D97706" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <LinearGradient colors={['#F8FAFB', '#FFFFFF']} style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerTitle}>Musobaqalar</Text>
              <Text style={styles.headerSubtitle}>Dunyo bo'ylab bilimlar jangi</Text>
            </View>
            <View style={styles.pointsWrap}>
              <Trophy color={COLORS.primary} size={20} fill={COLORS.primary} />
              <Text style={styles.pointsText}>2,450</Text>
            </View>
          </View>

          {/* User Rank Summary Card */}
          <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.rankCard}>
            <View style={styles.rankCardLeft}>
              <Text style={styles.rankCardLabel}>Sizning o'rningiz</Text>
              <Text style={styles.rankCardValue}>#458</Text>
            </View>
            <View style={styles.rankCardDivider} />
            <View style={styles.rankCardRight}>
              <Text style={styles.rankCardLabel}>Jami ochkolar</Text>
              <Text style={styles.rankCardValue}>2.4k pts</Text>
            </View>
          </LinearGradient>

          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity 
              onPress={() => setActiveTab('contests')}
              style={[styles.tab, activeTab === 'contests' && styles.activeTab]}
            >
              <Text style={[styles.tabText, activeTab === 'contests' && styles.activeTabText]}>Musobaqalar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setActiveTab('leaderboard')}
              style={[styles.tab, activeTab === 'leaderboard' && styles.activeTab]}
            >
              <Text style={[styles.tabText, activeTab === 'leaderboard' && styles.activeTabText]}>Reyting</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {activeTab === 'contests' ? renderContests() : renderLeaderboard()}
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
  rankCard: {
    flexDirection: 'row',
    borderRadius: 24,
    padding: SPACING.xl,
    alignItems: 'center',
    ...SHADOWS.medium,
    marginBottom: SPACING.xl,
  },
  rankCardLeft: {
    flex: 1,
    alignItems: 'center',
  },
  rankCardRight: {
    flex: 1,
    alignItems: 'center',
  },
  rankCardDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  rankCardLabel: {
    color: COLORS.white,
    opacity: 0.8,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  rankCardValue: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '900',
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
    borderRadius: 12,
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
});

export default CompetitionScreen;
