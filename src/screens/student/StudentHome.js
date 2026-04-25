import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  FlatList,
  Animated,
  Platform
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, GLASS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';
import { Star, Zap, Trophy, ChevronRight, BookOpen, HelpCircle, Flame, PlayCircle } from 'lucide-react-native';
import { useLevels } from '../../context/LevelContext.js';
import XPProgressBar from '../../components/XPProgressBar';
import GamifiedButton from '../../components/GamifiedButton';
import StudentPremiumBackground from '../../components/StudentPremiumBackground';

const AVATARS = [
  require('../../../assets/avatar_1_new.png'),
  require('../../../assets/avatar_2_new.png'),
  require('../../../assets/avatar_3_new.png'),
  require('../../../assets/avatar_4_new.png'),
];

const StudentHome = ({ navigation, route }) => {
  const { userXP, dailyStreak, rank, currentLevel, badges, userProfile } = useLevels();
  const userName = userProfile.name;
  const userAvatar = AVATARS[userProfile.avatarIndex];
  
  // Calculate total XP needed for next level (example logic)
  const nextLevelXP = (currentLevel + 1) * 1000;

  return (
    <SafeAreaView style={styles.container}>
      <StudentPremiumBackground />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Gamified Header */}
        <View style={styles.topHeader}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarCircle}>
                <Image
                  source={userAvatar}
                  style={styles.avatar}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.levelBadge}>
                <Text style={styles.levelBadgeText}>{currentLevel}</Text>
              </View>
            </View>
            <View style={styles.userTextSection}>
              <Text style={styles.welcomeText}>Salom, {userName}!</Text>
              <View style={styles.streakBadge}>
                <Flame color={COLORS.streak} size={14} fill={COLORS.streak} />
                <Text style={styles.streakBadgeText}>{dailyStreak} KUNLIK STREAK</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.xpSection}>
            <XPProgressBar 
              currentXP={userXP} 
              totalXP={nextLevelXP} 
              level={currentLevel} 
            />
          </View>
        </View>

        {/* Main "Start Lesson" Hero Area */}
        <View style={styles.heroSection}>
          <LinearGradient
            colors={['#4ade80', '#22c55e']}
            style={styles.heroGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Darsni davom ettirishga tayyormisan?</Text>
              <Text style={styles.heroSub}>Bugun +250 XP ishlash imkoniyati bor!</Text>
              
              <GamifiedButton 
                title="DARSNI BOSHLASH"
                onPress={() => navigation.navigate('Subjects')}
                color={COLORS.white}
                textStyle={{ color: COLORS.primary, fontSize: 16 }}
                style={styles.heroButton}
              />
            </View>
            <Image
              source={require('../../../assets/abacus_3d.png')}
              style={styles.heroImage}
              resizeMode="contain"
            />
          </LinearGradient>
        </View>

        {/* Stats Summary Grid */}
        <View style={styles.statsGrid}>
          <View style={[styles.statItem, { borderLeftColor: COLORS.xp }]}>
            <Zap size={20} color={COLORS.xp} fill={COLORS.xp} />
            <Text style={styles.statVal}>{userXP}</Text>
            <Text style={styles.statLab}>Jami XP</Text>
          </View>
          <View style={[styles.statItem, { borderLeftColor: COLORS.secondary }]}>
            <Trophy size={20} color={COLORS.secondary} fill={COLORS.secondary} />
            <Text style={styles.statVal}>{rank}</Text>
            <Text style={styles.statLab}>Reyting</Text>
          </View>
          <View style={[styles.statItem, { borderLeftColor: COLORS.accent }]}>
            <Star size={20} color={COLORS.accent} fill={COLORS.accent} />
            <Text style={styles.statVal}>{badges.length}</Text>
            <Text style={styles.statLab}>Yutuqlar</Text>
          </View>
        </View>

        {/* Quick Access Section */}
        <Text style={styles.sectionTitle}>Tezkor kirish</Text>
        <View style={styles.quickGrid}>
          <TouchableOpacity 
            style={styles.quickCard}
            onPress={() => navigation.navigate('Games')}
          >
            <LinearGradient
              colors={['#8b5cf6', '#6d28d9']}
              style={styles.quickIconBg}
            >
              <Zap color="white" size={24} />
            </LinearGradient>
            <Text style={styles.quickLabel}>O'yinlar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickCard}
            onPress={() => navigation.navigate('Contest')}
          >
            <LinearGradient
              colors={['#f59e0b', '#d97706']}
              style={styles.quickIconBg}
            >
              <Trophy color="white" size={24} />
            </LinearGradient>
            <Text style={styles.quickLabel}>Musobaqa</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickCard}
            onPress={() => navigation.navigate('Subjects')}
          >
            <LinearGradient
              colors={['#3b82f6', '#2563eb']}
              style={styles.quickIconBg}
            >
              <BookOpen color="white" size={24} />
            </LinearGradient>
            <Text style={styles.quickLabel}>Darslar</Text>
          </TouchableOpacity>
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
    paddingBottom: 120,
  },
  topHeader: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.medium,
    marginBottom: SPACING.xl,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: SPACING.md,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    ...SHADOWS.light,
  },
  avatar: {
    width: 48,
    height: 48,
  },
  levelBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: COLORS.level,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  levelBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '900',
  },
  userTextSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.gray[900],
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.streak + '15',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  streakBadgeText: {
    color: COLORS.streak,
    fontSize: 10,
    fontWeight: '800',
    marginLeft: 4,
  },
  xpSection: {
    marginTop: SPACING.xs,
  },
  heroSection: {
    marginBottom: SPACING.xl,
    borderRadius: BORDER_RADIUS.xxl || 32,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  heroGradient: {
    padding: SPACING.xl,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 180,
  },
  heroContent: {
    flex: 1,
    zIndex: 2,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.white,
    marginBottom: 8,
  },
  heroSub: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: SPACING.lg,
  },
  heroButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    alignSelf: 'flex-start',
  },
  heroImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -10,
    bottom: -10,
    opacity: 0.8,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  statItem: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderLeftWidth: 4,
    ...SHADOWS.light,
  },
  statVal: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.gray[900],
    marginTop: 4,
  },
  statLab: {
    fontSize: 10,
    color: COLORS.gray[500],
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.gray[900],
    marginBottom: SPACING.md,
  },
  quickGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  quickCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
    ...SHADOWS.light,
  },
  quickIconBg: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.gray[700],
  },
});

export default StudentHome;
