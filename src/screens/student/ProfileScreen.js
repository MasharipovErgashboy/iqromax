import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme.js';
import { Settings, Shield, Bell, HelpCircle, LogOut, ChevronRight, Trophy, Star, Zap, User, Users } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StudentPremiumBackground from '../../components/StudentPremiumBackground';
import { useLevels } from '../../context/LevelContext.js';

const AVATARS = [
  require('../../../assets/avatar_1_new.png'),
  require('../../../assets/avatar_2_new.png'),
  require('../../../assets/avatar_3_new.png'),
  require('../../../assets/avatar_4_new.png'),
];

const ProfileItem = ({ icon: Icon, title, subtitle, color, onPress, isLast = false }) => (
  <TouchableOpacity 
    style={[styles.profileItem, !isLast && styles.profileItemBorder]} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={[styles.itemIconContainer, { backgroundColor: color + '15' }]}>
      <Icon color={color} size={22} />
    </View>
    <View style={styles.itemContent}>
      <Text style={styles.itemTitle}>{title}</Text>
      {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
    </View>
    <ChevronRight color={COLORS.gray[300]} size={20} />
  </TouchableOpacity>
);

const ProfileScreen = ({ navigation }) => {
  const { userProfile, userXP, rank } = useLevels();
  const userName = userProfile.name;
  const userAvatar = AVATARS[userProfile.avatarIndex];

  const handleLogout = () => {
    Alert.alert(
      "Chiqish",
      "Haqiqatdan ham tizimdan chiqmoqchimisiz?",
      [
        { text: "Bekor qilish", style: "cancel" },
        { 
          text: "Chiqish", 
          style: "destructive", 
          onPress: () => navigation.navigate('Landing') 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StudentPremiumBackground color1="#6366F1" color2="#8B5CF6" color3="#4F46E5" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarCircle}>
              <Image 
                source={userAvatar} 
                style={styles.avatar}
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity 
              onPress={() => navigation.navigate('StudentSettings')}
              style={styles.editBadge}
            >
              <Settings color={COLORS.white} size={14} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userId}>ID: 45892</Text>
        </View>

        {/* Stats Summary */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
          <View style={[styles.statItem, styles.statBorder]}>
            <Text style={styles.statValue}>4.5k</Text>
            <Text style={styles.statLabel}>XP</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>#4</Text>
            <Text style={styles.statLabel}>Rank</Text>
          </View>
        </View>

        {/* My Achievements Preview */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Yutuqlarim</Text>
          <TouchableOpacity onPress={() => navigation.navigate('StudentAchievements')}>
            <Text style={styles.seeAll}>Hammasi</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgeScroll}>
          <View style={[styles.badgeItem, { backgroundColor: '#F0FDF4' }]}>
            <Trophy color={COLORS.primary} size={28} />
          </View>
          <View style={[styles.badgeItem, { backgroundColor: '#FFFBEB' }]}>
            <Star color={COLORS.secondary} size={28} />
          </View>
          <View style={[styles.badgeItem, { backgroundColor: '#FFF7ED' }]}>
            <Zap color={COLORS.accent} size={28} />
          </View>
          <View style={[styles.badgeItem, { backgroundColor: '#F5F3FF' }]}>
            <Shield color="#8B5CF6" size={28} />
          </View>
        </ScrollView>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <ProfileItem 
            icon={User} 
            title="Shaxsiy ma'lumotlar" 
            subtitle="Profilni tahrirlash"
            color="#3B82F6"
            onPress={() => navigation.navigate('StudentPersonalInfo')}
          />
          <ProfileItem 
            icon={Bell} 
            title="Bildirishnomalar" 
            color="#F59E0B"
            onPress={() => navigation.navigate('StudentNotificationSettings')}
          />
          <ProfileItem 
            icon={Shield} 
            title="Xavfsizlik" 
            color="#10B981"
            onPress={() => navigation.navigate('StudentSecurity')}
          />
          <ProfileItem 
            icon={HelpCircle} 
            title="Yordam markazi" 
            color="#6366F1"
            onPress={() => navigation.navigate('StudentHelpCenter')}
          />
          <ProfileItem 
            icon={Users} 
            title="Ota-onani tasdiqlash" 
            subtitle="Ota-ona so'rovlarini boshqarish"
            color={COLORS.primary}
            onPress={() => navigation.navigate('ParentRequests')}
          />
          <ProfileItem 
            icon={Settings} 
            title="Sozlamalar" 
            subtitle="Ilova tili va rejimi"
            color="#64748B"
            onPress={() => navigation.navigate('StudentSettings')}
            isLast={true}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <LogOut color={COLORS.error} size={22} />
          <Text style={styles.logoutText}>Tizimdan chiqish</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Versiya 1.0.4 (SDK 54)</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

// Help with user icon
const UserIcon = ({ color, size }) => (
  <View><Text style={{ color, fontSize: size, fontWeight: 'bold' }}>👤</Text></View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: SPACING.xxl,
  },
  header: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
    borderBottomLeftRadius: BORDER_RADIUS.xl,
    borderBottomRightRadius: BORDER_RADIUS.xl,
  },
  avatarContainer: {
    padding: 6,
    borderRadius: 75,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.primary + '30',
  },
  avatarCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  editBadge: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: COLORS.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.gray[900],
  },
  userId: {
    fontSize: 14,
    color: COLORS.gray[400],
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.xl,
    marginTop: -30,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg,
    ...SHADOWS.medium,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.gray[100],
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.gray[900],
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray[500],
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.xxl,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.gray[900],
  },
  seeAll: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  badgeScroll: {
    paddingLeft: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  badgeItem: {
    width: 64,
    height: 64,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    ...SHADOWS.light,
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.light,
    overflow: 'hidden',
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  profileItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[50],
  },
  itemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray[800],
  },
  itemSubtitle: {
    fontSize: 12,
    color: COLORS.gray[400],
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.xl,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.error + '30',
    gap: SPACING.sm,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.error,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.gray[400],
    marginTop: SPACING.xxl,
  },
});

export default ProfileScreen;
