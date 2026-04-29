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
           <BlurView intensity={30} tint="light" style={styles.topNavBlur}>
              <View style={styles.topNavLeft}>
                 <View style={styles.glassIconPill}>
                    <LayoutGrid color="#6366F1" size={22} />
                 </View>
                 <View>
                    <Text style={styles.headerTitle}>O'yinlar Olami</Text>
                    <Text style={styles.headerSubtitle}>Sizning yutuqlaringiz markazi</Text>
                 </View>
              </View>
              
              <View style={styles.topNavRight}>
                 <TouchableOpacity style={styles.searchBtn}>
                    <Search color="#1E293B" size={20} />
                 </TouchableOpacity>
              </View>
           </BlurView>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.sectionHeader}>
             <Text style={styles.sectionTitle}>Barcha O'yinlar</Text>
          </View>

          <View style={styles.gamesList}>
            {games.map((game) => (
              <TouchableOpacity
                key={game.id}
                style={styles.meshCard}
                activeOpacity={0.85}
                onPress={() => navigation.navigate(game.screen)}
              >
                <LinearGradient
                  colors={game.colors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.meshGradient}
                >
                  {/* Abstract Mesh Blobs */}
                  <View style={[styles.meshBlob, { top: -20, right: -30, backgroundColor: 'rgba(255,255,255,0.2)', opacity: 0.3 }]} />
                  <View style={[styles.meshBlob, { bottom: -40, left: -20, backgroundColor: 'rgba(255,255,255,0.1)', opacity: 0.2 }]} />
                  
                  <View style={styles.meshContent}>
                    <View style={styles.meshIconContainer}>
                      <game.icon color="white" size={30} />
                      <View style={styles.meshIconGlow} />
                    </View>
                    
                    <View style={styles.meshTextContainer}>
                      <View style={styles.meshHeaderRow}>
                         <Text style={styles.meshTitle}>{game.title}</Text>
                      </View>
                      <Text style={styles.meshDesc}>{game.description}</Text>
                    </View>

                    <View style={styles.meshAction}>
                      <ChevronRight color="rgba(255,255,255,0.7)" size={24} />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}

            {/* Coming Soon Mesh Card */}
            <View style={[styles.meshCard, { opacity: 0.8 }]}>
              <LinearGradient
                colors={['#94A3B8', '#475569']}
                style={styles.meshGradient}
              >
                <View style={styles.meshContent}>
                  <View style={[styles.meshIconContainer, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                    <Star color="white" size={24} />
                  </View>
                  <View style={styles.meshTextContainer}>
                    <Text style={[styles.meshTitle, { color: 'rgba(255,255,255,0.6)' }]}>Mantiqiy O'yinlar</Text>
                    <Text style={[styles.meshDesc, { color: 'rgba(255,255,255,0.5)' }]}>Tez kunda yangi sarguzashtlar</Text>
                  </View>
                </View>
              </LinearGradient>
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
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 10,
    zIndex: 10,
  },
  topNavBlur: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 18, 
    paddingVertical: 12, 
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
    backgroundColor: 'rgba(255,255,255,0.6)',
    ...SHADOWS.light,
  },
  topNavLeft: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 14 
  },
  topNavRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  glassIconPill: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: '900', 
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  headerSubtitle: { 
    fontSize: 12, 
    color: '#64748B', 
    fontWeight: '700',
    marginTop: 1,
  },
  headerSubtitle: { 
    fontSize: 12, 
    color: '#64748B', 
    fontWeight: '700',
    marginTop: 1,
  },
  searchBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: '#0F172A' },
  gamesList: {
    gap: 16,
    marginBottom: 20,
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
    minHeight: 130,
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
    backgroundColor: 'white',
    opacity: 0.2,
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
  meshAction: {
    marginLeft: 12,
  },
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
});

export default GamesHubScreen;
