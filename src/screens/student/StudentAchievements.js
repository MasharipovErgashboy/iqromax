import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, 
  Trophy, 
  Star, 
  Zap, 
  Shield, 
  Lock, 
  ChevronRight,
  TrendingUp,
  Medal
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const BADGES = [
  { id: '1', title: 'Ilk Qadam', icon: Medal, color: '#3B82F6', unlocked: true, date: '12.03.2024' },
  { id: '2', title: 'Abakus Ustasi', icon: Trophy, color: '#F59E0B', unlocked: true, date: '15.03.2024' },
  { id: '3', title: 'Chaqmoq Tezlik', icon: Zap, color: '#10B981', unlocked: true, date: '18.03.2024' },
  { id: '4', title: 'Oltin Bilimdon', icon: Star, color: '#FCD34D', unlocked: false, progress: 0.8 },
  { id: '5', title: 'Qalqon Himoyachi', icon: Shield, color: '#8B5CF6', unlocked: false, progress: 0.4 },
  { id: '6', title: 'Mantiq Qiroli', icon: Medal, color: '#EC4899', unlocked: false, progress: 0.1 },
];

const StudentAchievements = ({ navigation }) => {
  const { theme, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <SafeAreaView edges={['top']}>
           <View style={styles.headerTop}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                 <ArrowLeft color={theme.text} size={24} />
              </TouchableOpacity>
              <Text style={[styles.headerTitle, { color: theme.text }]}>Yutuqlarim</Text>
              <View style={{ width: 40 }} />
           </View>
        </SafeAreaView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
         {/* XP Hero Card */}
         <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.heroCard}>
            <View style={styles.heroRow}>
               <View>
                  <Text style={styles.xpLabel}>Umumiy Tajriba (XP)</Text>
                  <Text style={styles.xpValue}>4,580 XP</Text>
               </View>
               <View style={styles.rankBadge}>
                  <TrendingUp color="white" size={20} />
                  <Text style={styles.rankText}>#4 Rank</Text>
               </View>
            </View>
            <View style={styles.progressContainer}>
               <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: '75%' }]} />
               </View>
               <View style={styles.progressLabels}>
                  <Text style={styles.pLabel}>Level 12</Text>
                  <Text style={styles.pLabel}>5,000 XP gacha 420 qoldi</Text>
               </View>
            </View>
         </LinearGradient>

         {/* Stats Row */}
         <View style={styles.statsRow}>
            <View style={[styles.statBox, { backgroundColor: theme.card }]}>
               <Trophy color="#F59E0B" size={24} />
               <Text style={[styles.statNum, { color: theme.text }]}>12</Text>
               <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Yutuqlar</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: theme.card }]}>
               <Star color="#FCD34D" size={24} />
               <Text style={[styles.statNum, { color: theme.text }]}>45</Text>
               <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Yulduzlar</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: theme.card }]}>
               <Zap color="#10B981" size={24} />
               <Text style={[styles.statNum, { color: theme.text }]}>8</Text>
               <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Streak</Text>
            </View>
         </View>

         {/* Badges Grid */}
         <Text style={[styles.sectionTitle, { color: theme.text }]}>Barcha unvonlar</Text>
         <View style={styles.badgesGrid}>
            {BADGES.map((badge) => (
               <TouchableOpacity 
                 key={badge.id} 
                 style={[styles.badgeCard, { backgroundColor: theme.card, borderColor: theme.border }]}
                 disabled={!badge.unlocked}
               >
                  {!badge.unlocked && (
                     <View style={styles.lockOverlay}>
                        <Lock color={COLORS.gray[400]} size={20} />
                     </View>
                  )}
                  <View style={[styles.iconWrap, { backgroundColor: badge.color + '15' }]}>
                     <badge.icon color={badge.unlocked ? badge.color : COLORS.gray[300]} size={32} />
                  </View>
                  <Text style={[styles.badgeTitle, { color: badge.unlocked ? theme.text : COLORS.gray[400] }]}>{badge.title}</Text>
                  
                  {badge.unlocked ? (
                     <Text style={styles.badgeDate}>{badge.date}</Text>
                  ) : (
                     <View style={styles.miniProgressBg}>
                        <View style={[styles.miniProgressFill, { width: `${badge.progress * 100}%`, backgroundColor: badge.color }]} />
                     </View>
                  )}
               </TouchableOpacity>
            ))}
         </View>

         <View style={{ height: 100 }} />
      </ScrollView>

      {/* Background Glow */}
      <View style={styles.glow} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 15, ...SHADOWS.light },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 60 },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '900' },
  
  scrollContent: { padding: 25 },
  heroCard: { padding: 25, borderRadius: 32, ...SHADOWS.medium, marginBottom: 25 },
  heroRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 25 },
  xpLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: '600' },
  xpValue: { color: 'white', fontSize: 32, fontWeight: '900', marginTop: 4 },
  rankBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  rankText: { color: 'white', fontSize: 13, fontWeight: '800' },
  
  progressContainer: { marginTop: 10 },
  progressBarBg: { height: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: 'white', borderRadius: 4 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  pLabel: { color: 'white', fontSize: 11, fontWeight: '700' },

  statsRow: { flexDirection: 'row', gap: 15, marginBottom: 35 },
  statBox: { flex: 1, padding: 20, borderRadius: 24, alignItems: 'center', ...SHADOWS.light },
  statNum: { fontSize: 18, fontWeight: '900', marginTop: 10 },
  statLabel: { fontSize: 11, fontWeight: '600', marginTop: 2 },

  sectionTitle: { fontSize: 22, fontWeight: '900', marginBottom: 20, paddingHorizontal: 5 },
  badgesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15 },
  badgeCard: { width: (width - 65) / 2, padding: 20, borderRadius: 28, alignItems: 'center', borderWidth: 1, ...SHADOWS.light, position: 'relative' },
  lockOverlay: { position: 'absolute', top: 15, right: 15, zIndex: 2 },
  iconWrap: { width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  badgeTitle: { fontSize: 14, fontWeight: '800', textAlign: 'center', marginBottom: 8 },
  badgeDate: { fontSize: 11, color: COLORS.gray[400], fontWeight: '600' },
  miniProgressBg: { width: '80%', height: 4, backgroundColor: '#E2E8F0', borderRadius: 2, overflow: 'hidden' },
  miniProgressFill: { height: '100%', borderRadius: 2 },

  glow: { position: 'absolute', top: -150, right: -150, width: 400, height: 400, backgroundColor: COLORS.primary, opacity: 0.05, borderRadius: 200, zIndex: -1 },
});

export default StudentAchievements;
