import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  Dimensions,
  StatusBar,
  Platform
} from 'react-native';
import { COLORS, SHADOWS } from '../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Calculator, 
  Zap, 
  Trophy, 
  Play, 
  Star,
  Users,
  Search,
  LayoutGrid,
  ChevronRight
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import StudentPremiumBackground from '../../components/StudentPremiumBackground';

const { width } = Dimensions.get('window');

const GamesHubScreen = ({ navigation }) => {
  const games = [
    {
      id: 'abacus',
      title: 'Abakus Master',
      subtitle: 'Fast Calculation',
      description: 'Tezkor hisoblash mahoratini oshiring',
      icon: Calculator,
      colors: ['#6366F1', '#4F46E5'],
      screen: 'AbacusLevels',
      image: require('../../../assets/abacus_3d.png'),
      stats: '12K+',
      rating: '4.9'
    },
    {
      id: 'mental',
      title: 'Mental Power',
      subtitle: 'Mind Focus',
      description: 'Xayolan mo\'jizalar yarating',
      icon: Zap,
      colors: ['#10B981', '#059669'],
      screen: 'MentalPowerLevels',
      image: require('../../../assets/mascot.png'),
      stats: '8K+',
      rating: '4.8'
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <StudentPremiumBackground color1="#F0F9FF" color2="#E0F2FE" color3="#DBEAFE" />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topNav}>
           <BlurView intensity={20} tint="light" style={styles.topNavBlur}>
              <View style={styles.topNavLeft}>
                 <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.iconPill}>
                    <LayoutGrid color="white" size={20} />
                 </LinearGradient>
                 <View>
                    <Text style={styles.headerTitle}>O'yinlar Olami</Text>
                    <Text style={styles.headerSubtitle}>Bilimingizni sinovdan o'tkazing</Text>
                 </View>
              </View>
              <TouchableOpacity style={styles.searchBtn}>
                 <Search color="#64748B" size={20} />
              </TouchableOpacity>
           </BlurView>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
        >
          {/* Featured Tournament Card */}
          <TouchableOpacity 
            style={styles.heroCard}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Contest')}
          >
            <LinearGradient
              colors={['#8B5CF6', '#6D28D9']}
              style={styles.heroGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.heroContent}>
                <View style={styles.tournamentBadge}>
                  <Trophy color="white" size={14} fill="white" />
                  <Text style={styles.tournamentText}>YANGI TURNIR</Text>
                </View>
                <Text style={styles.heroTitle}>Haftalik Chempionat</Text>
                <Text style={styles.heroDesc}>Abakus bo'yicha eng yaxshi natijani ko'rsat va sovrin yut!</Text>
                
                <View style={styles.heroFooter}>
                   <View style={styles.participants}>
                      {[1, 2, 3].map(i => (
                         <View key={i} style={[styles.avatarMini, { marginLeft: i === 1 ? 0 : -8 }]}>
                            <Image source={{ uri: `https://api.dicebear.com/7.x/avataaars/png?seed=${i}` }} style={styles.miniImg} />
                         </View>
                      ))}
                      <Text style={styles.participantText}>+450 o'quvchi</Text>
                   </View>
                   <View style={styles.heroPlayBtn}>
                      <Play color="#6D28D9" size={14} fill="#6D28D9" />
                   </View>
                </View>
              </View>
              <Image source={require('../../../assets/abacus_3d.png')} style={styles.heroImage} />
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.sectionHeader}>
             <Text style={styles.sectionTitle}>Siz uchun tanlangan</Text>
             <TouchableOpacity>
                <Text style={styles.seeAll}>Barchasi</Text>
             </TouchableOpacity>
          </View>

          {/* Bento Grid Games */}
          <View style={styles.bentoGrid}>
            {games.map((game, index) => (
              <TouchableOpacity
                key={game.id}
                style={[styles.bentoCard, index === 0 ? styles.bigBento : styles.smallBento]}
                activeOpacity={0.9}
                onPress={() => navigation.navigate(game.screen)}
              >
                <LinearGradient
                  colors={game.colors}
                  style={styles.gameGradient}
                >
                  <View style={styles.gameTop}>
                    <View style={styles.gameIconWrapper}>
                      <game.icon color="white" size={24} />
                    </View>
                    <View style={styles.gameRating}>
                      <Star color="#FFD700" size={10} fill="#FFD700" />
                      <Text style={styles.ratingValue}>{game.rating}</Text>
                    </View>
                  </View>

                  <View style={styles.gameBottom}>
                    <Text style={styles.gameType}>{game.subtitle}</Text>
                    <Text style={styles.gameTitleText}>{game.title}</Text>
                    
                    <View style={styles.gameStatsRow}>
                       <View style={styles.statItem}>
                          <Users color="rgba(255,255,255,0.8)" size={12} />
                          <Text style={styles.statValueText}>{game.stats}</Text>
                       </View>
                       <BlurView intensity={20} style={styles.miniPlay}>
                          <Play color="white" size={12} fill="white" />
                       </BlurView>
                    </View>
                  </View>

                  <Image source={game.image} style={styles.bentoImage} resizeMode="contain" />
                </LinearGradient>
              </TouchableOpacity>
            ))}
            
            {/* Third Bento - Coming Soon */}
            <View style={[styles.bentoCard, styles.thirdBento]}>
               <BlurView intensity={40} tint="light" style={styles.comingSoonInner}>
                  <View style={styles.lockBox}>
                     <Star color="#94A3B8" size={20} fill="#CBD5E1" />
                  </View>
                  <Text style={styles.comingSoonLabel}>TEZ KUNDA</Text>
                  <Text style={styles.comingSoonTitle}>Mantiqiy O'yinlar</Text>
               </BlurView>
            </View>
          </View>
          
          <View style={[styles.sectionHeader, { marginTop: 10 }]}>
             <Text style={styles.sectionTitle}>Maxsus Mashqlar</Text>
          </View>

          <View style={styles.extraTools}>
             <TouchableOpacity 
               style={styles.toolCardLarge}
               onPress={() => navigation.navigate('MentalArithmeticPractice')}
             >
                <LinearGradient 
                  colors={['#F59E0B', '#F97316']} 
                  style={styles.toolGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                   <View style={styles.toolIconCircle}>
                      <Zap color="white" size={28} fill="white" />
                   </View>
                   <View style={styles.toolTextContent}>
                      <Text style={styles.toolTitleLarge}>Tezkor Mashq</Text>
                      <Text style={styles.toolDesc}>Xayolan hisoblash</Text>
                   </View>
                   <View style={styles.toolArrow}>
                      <ChevronRight color="rgba(255,255,255,0.7)" size={20} />
                   </View>
                </LinearGradient>
             </TouchableOpacity>

             <TouchableOpacity 
               style={styles.toolCardSmall}
               onPress={() => navigation.navigate('AbacusSimulator', { mode: 'free' })}
             >
                <LinearGradient 
                  colors={['#10B981', '#059669']} 
                  style={styles.toolGradientSmall}
                >
                   <View style={styles.toolIconCircleSmall}>
                      <Calculator color="white" size={24} />
                   </View>
                   <Text style={styles.toolLabelSmall}>Abakus</Text>
                </LinearGradient>
             </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFB' },
  safeArea: { flex: 1 },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  topNavLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconPill: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  headerTitle: { fontSize: 22, fontWeight: '900', color: '#0F172A' },
  headerSubtitle: { fontSize: 13, color: '#64748B', fontWeight: '600' },
  searchBtn: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  scrollContent: { paddingHorizontal: 25, paddingTop: 10 },
  heroCard: {
    height: 200,
    borderRadius: 35,
    overflow: 'hidden',
    marginBottom: 30,
    ...SHADOWS.medium,
  },
  heroGradient: { flex: 1, flexDirection: 'row', padding: 25 },
  heroContent: { flex: 1, justifyContent: 'space-between', zIndex: 2 },
  tournamentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 8,
  },
  tournamentText: { color: 'white', fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  heroTitle: { fontSize: 24, fontWeight: '900', color: 'white', marginTop: 10 },
  heroDesc: { fontSize: 12, color: 'rgba(255,255,255,0.85)', lineHeight: 18, marginTop: 5 },
  heroFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },
  participants: { flexDirection: 'row', alignItems: 'center' },
  avatarMini: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)', overflow: 'hidden' },
  miniImg: { width: '100%', height: '100%' },
  participantText: { color: 'white', fontSize: 11, fontWeight: '700', marginLeft: 10 },
  heroPlayBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' },
  heroImage: { width: 150, height: 150, position: 'absolute', right: -20, bottom: -20, opacity: 0.9 },
  
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: '#0F172A' },
  seeAll: { fontSize: 14, color: COLORS.primary, fontWeight: '800' },
  
  bentoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15 },
  bentoCard: { borderRadius: 32, overflow: 'hidden', ...SHADOWS.medium },
  bigBento: { width: width - 50, height: 180 },
  smallBento: { width: (width - 65) / 2, height: 220 },
  thirdBento: { width: (width - 65) / 2, height: 220, backgroundColor: 'white' },
  
  gameGradient: { flex: 1, padding: 20, justifyContent: 'space-between' },
  gameTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  gameIconWrapper: { width: 44, height: 44, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center' },
  gameRating: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(0,0,0,0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  ratingValue: { color: 'white', fontSize: 11, fontWeight: '800' },
  
  gameBottom: { zIndex: 2 },
  gameType: { fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: '900', letterSpacing: 1, textTransform: 'uppercase' },
  gameTitleText: { fontSize: 20, fontWeight: '900', color: 'white', marginTop: 4 },
  gameStatsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statValueText: { color: 'white', fontSize: 12, fontWeight: '700' },
  miniPlay: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  bentoImage: { width: 100, height: 100, position: 'absolute', right: -5, bottom: 20, opacity: 0.8 },
  
  comingSoonInner: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  lockBox: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
  comingSoonLabel: { fontSize: 10, color: '#94A3B8', fontWeight: '900', letterSpacing: 2 },
  comingSoonTitle: { fontSize: 15, fontWeight: '800', color: '#475569', marginTop: 5, textAlign: 'center' },
  
  floatingScore: { 
    position: 'absolute', 
    bottom: Platform.OS === 'ios' ? 30 : 20, 
    left: 20, 
    right: 20, 
    borderRadius: 25, 
    overflow: 'hidden', 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.5)',
    ...SHADOWS.medium 
  },
  scoreContent: { flexDirection: 'row', padding: 15, alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.7)' },
  userSection: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  userAvatar: { width: 44, height: 44, borderRadius: 15, borderWidth: 2, borderColor: COLORS.primary },
  userName: { fontSize: 14, fontWeight: '900', color: '#1E293B' },
  userRank: { fontSize: 11, color: COLORS.primary, fontWeight: '700' },
  scoreBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, ...SHADOWS.light },
  scoreVal: { fontSize: 15, fontWeight: '900', color: '#0F172A' },
  extraTools: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  toolCardLarge: { flex: 1.8, height: 100, borderRadius: 28, overflow: 'hidden', ...SHADOWS.medium },
  toolCardSmall: { flex: 1, height: 100, borderRadius: 28, overflow: 'hidden', ...SHADOWS.medium },
  toolGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, gap: 12 },
  toolGradientSmall: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  toolIconCircle: { width: 44, height: 44, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  toolIconCircleSmall: { width: 40, height: 40, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  toolTextContent: { flex: 1 },
  toolTitleLarge: { color: 'white', fontSize: 16, fontWeight: '900' },
  toolDesc: { color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: '600', marginTop: 1 },
  toolArrow: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  toolLabelSmall: { color: 'white', fontSize: 13, fontWeight: '900' },
  topNavBlur: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    paddingVertical: 10, 
    marginHorizontal: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});

export default GamesHubScreen;
