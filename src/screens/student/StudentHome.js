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
  require('../../../assets/avatar_child_1.png'),
  require('../../../assets/avatar_child_2.png'),
  require('../../../assets/avatar_child_3.png'),
  require('../../../assets/avatar_child_4.png'),
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
          <TouchableOpacity 
            activeOpacity={0.9} 
            onPress={() => navigation.navigate('Subjects')}
            style={styles.heroTouch}
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.heroGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {/* Abstract Mesh Blobs */}
              <View style={[styles.meshBlob, { top: -40, right: -20, backgroundColor: 'rgba(255,255,255,0.2)', opacity: 0.3 }]} />
              <View style={[styles.meshBlob, { bottom: -60, left: -30, backgroundColor: 'rgba(255,255,255,0.1)', opacity: 0.2 }]} />
              
              <View style={styles.heroContent}>
                <View style={styles.heroBadge}>
                  <Zap color="white" size={12} fill="white" />
                  <Text style={styles.heroBadgeText}>FAOL MASHG'ULOT</Text>
                </View>
                <Text style={styles.heroTitle}>Darsni davom ettirishga tayyormisan?</Text>
                <Text style={styles.heroSub}>Bugun +250 XP ishlash imkoniyati bor!</Text>
                
                <View style={styles.heroActionRow}>
                  <View style={styles.heroButtonMock}>
                    <Text style={styles.heroButtonText}>DARSNI BOSHLASH</Text>
                    <PlayCircle color="white" size={20} />
                  </View>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
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
    borderRadius: 32,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  heroTouch: {
    flex: 1,
  },
  heroGradient: {
    padding: 25,
    minHeight: 180,
    position: 'relative',
    justifyContent: 'center',
  },
  meshBlob: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  heroContent: {
    zIndex: 2,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  heroBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.white,
    lineHeight: 30,
    marginBottom: 8,
  },
  heroSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
    marginBottom: 20,
  },
  heroActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroButtonMock: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  heroButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
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
