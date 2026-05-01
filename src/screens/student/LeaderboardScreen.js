import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Medal, Award, Crown } from 'lucide-react-native';
import StudentPremiumBackground from '../../components/StudentPremiumBackground';

const LEADERBOARD_DATA = [
  { id: '1', name: 'Ali', xp: 12500, rank: 1, avatar: require('../../../assets/avatar_child_1.png') },
  { id: '2', name: 'Zarina', xp: 11200, rank: 2, avatar: require('../../../assets/avatar_child_2.png') },
  { id: '3', name: 'Bekzod', xp: 10800, rank: 3, avatar: require('../../../assets/avatar_child_3.png') },
  { id: '4', name: 'Siz', xp: 450, rank: 4, avatar: require('../../../assets/avatar_child_4.png') },
];

const LeaderboardItem = ({ item, index }) => {
  const isCurrentUser = item.name === 'Siz';
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown color="#FFD700" size={24} />;
      case 2: return <Medal color="#C0C0C0" size={24} />;
      case 3: return <Award color="#CD7F32" size={24} />;
      default: return <Text style={styles.rankNumber}>{rank}</Text>;
    }
  };

  return (
    <View style={[styles.leaderboardItem, isCurrentUser && styles.currentUserItem]}>
      <View style={styles.rankContainer}>
        {getRankIcon(item.rank)}
      </View>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={[styles.userName, isCurrentUser && styles.currentUserText]}>{item.name}</Text>
        <Text style={styles.userXP}>{item.xp} XP</Text>
      </View>
      {isCurrentUser && (
        <View style={styles.currentUserBadge}>
          <Text style={styles.currentUserBadgeText}>Siz</Text>
        </View>
      )}
    </View>
  );
};

const LeaderboardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StudentPremiumBackground color1="#F59E0B" color2="#FFD700" color3="#F43F5E" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Global Reyting</Text>
          <Text style={styles.subtitle}>Eng zo'r o'quvchilar</Text>
        </View>

        <View style={styles.topThreeContainer}>
          {LEADERBOARD_DATA.slice(0, 3).map((item, index) => (
            <View key={item.id} style={styles.topThreeItem}>
              <LinearGradient
                colors={index === 0 ? ['#FFD700', '#FFA500'] : index === 1 ? ['#C0C0C0', '#A8A8A8'] : ['#CD7F32', '#A0522D']}
                style={styles.topThreeGradient}
              >
                <Image source={item.avatar} style={styles.topThreeAvatar} />
                <Text style={styles.topThreeName}>{item.name}</Text>
                <Text style={styles.topThreeXP}>{item.xp} XP</Text>
                <View style={styles.topThreeRank}>
                  {index === 0 && <Crown color="#FFF" size={20} />}
                  {index === 1 && <Medal color="#FFF" size={20} />}
                  {index === 2 && <Award color="#FFF" size={20} />}
                </View>
              </LinearGradient>
            </View>
          ))}
        </View>

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Barcha ishtirokchilar</Text>
          <FlatList
            data={LEADERBOARD_DATA}
            renderItem={({ item, index }) => <LeaderboardItem item={item} index={index} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.gray[900],
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray[500],
  },
  topThreeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.xl,
  },
  topThreeItem: {
    alignItems: 'center',
  },
  topThreeGradient: {
    width: 100,
    height: 120,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.sm,
    ...SHADOWS.medium,
  },
  topThreeAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: SPACING.xs,
  },
  topThreeName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
  },
  topThreeXP: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.9,
  },
  topThreeRank: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    ...SHADOWS.light,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.gray[900],
    marginBottom: SPACING.md,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[100],
  },
  currentUserItem: {
    backgroundColor: COLORS.primary + '10',
    borderRadius: BORDER_RADIUS.lg,
    marginHorizontal: -SPACING.lg,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gray[600],
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SPACING.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gray[900],
  },
  currentUserText: {
    color: COLORS.primary,
  },
  userXP: {
    fontSize: 14,
    color: COLORS.gray[500],
  },
  currentUserBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  currentUserBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
});

export default LeaderboardScreen;