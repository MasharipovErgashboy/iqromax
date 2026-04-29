import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  TextInput,
  StatusBar,
  ScrollView
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, GLASS } from '../../constants/theme.js';
import { Lock, Star, Play, ChevronLeft, ChevronRight, Search, Filter, Calculator, Users, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useLevels } from '../../context/LevelContext.js';
import StudentPremiumBackground from '../../components/StudentPremiumBackground';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 50) / 2;
const ITEMS_PER_PAGE = 10;

const ASSETS = {
  abacus: require('../../../assets/abacus_3d.png'),
  blue: require('../../../assets/avatar_blue.png'),
  red: require('../../../assets/avatar_red.png'),
  yellow: require('../../../assets/avatar_yellow.png'),
  mascot: require('../../../assets/mascot.png'),
};

const ALL_SUBJECTS = [
  { id: '1', title: 'Mental Arifmetika 1', image: ASSETS.abacus, color: '#10B981', cat: 'Matematika', progress: 0.65 },
  { id: '2', title: 'Tez O\'qish', image: ASSETS.blue, color: '#3B82F6', cat: 'Tillar', progress: 0.4 },
  { id: '3', title: 'Mantiqiy o\'yinlar', image: ASSETS.red, color: '#EF4444', cat: 'Mantiq', progress: 0.1 },
  { id: '4', title: 'Karra jadvali', image: ASSETS.yellow, color: '#F59E0B', cat: 'Matematika', progress: 1.0 },
  { id: '5', title: 'Robototexnika', image: ASSETS.mascot, color: '#6366F1', cat: 'IT', progress: 0 },
  { id: '6', title: 'Mental Arifmetika 2', image: ASSETS.abacus, color: '#10B981', cat: 'Matematika', progress: 0.2 },
  { id: '7', title: 'Ingliz tili', image: ASSETS.blue, color: '#3B82F6', cat: 'Tillar', progress: 0.8 },
  { id: '8', title: 'Kalligrafiya', image: ASSETS.red, color: '#EF4444', cat: 'San\'at', progress: 0.15 },
  { id: '9', title: 'Scratch', image: ASSETS.yellow, color: '#F59E0B', cat: 'IT', progress: 0.3 },
  { id: '10', title: 'Astronomiya', image: ASSETS.mascot, color: '#6366F1', cat: 'Fan', progress: 0 },
];

const SubjectCard = ({ item, navigation, isLocked }) => (
  <TouchableOpacity 
    style={[styles.card, isLocked && styles.lockedCard]}
    activeOpacity={0.9}
    onPress={() => navigation.navigate('StudentLessonDetail', { lesson: item, isLocked })}
  >
    <LinearGradient
      colors={['#FFFFFF', '#F8FAFB']}
      style={styles.cardGradient}
    >
      <View style={[styles.imageBox, { backgroundColor: item.color + '15' }]}>
        <Image source={item.image} style={styles.subjectImage} resizeMode="cover" />
        {isLocked && (
          <BlurView intensity={20} style={styles.lockOverlay}>
            <View style={styles.lockCircle}>
              <Lock color="white" size={16} fill="rgba(0,0,0,0.3)" />
            </View>
          </BlurView>
        )}
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.catRow}>
          <Text style={[styles.catBadge, { color: item.color }]}>{item.cat}</Text>
          {item.progress === 1 && <Star color="#F59E0B" size={12} fill="#F59E0B" />}
        </View>
        
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        
        {!isLocked && (
          <View style={styles.progressRow}>
            <View style={styles.barBg}>
               <View style={[styles.barFill, { width: `${item.progress * 100}%`, backgroundColor: item.color }]} />
            </View>
            <Text style={styles.progressText}>{Math.round(item.progress * 100)}%</Text>
          </View>
        )}
      </View>

      <View style={[styles.playFab, { backgroundColor: isLocked ? COLORS.gray[200] : item.color }]}>
         {isLocked ? <Lock color="white" size={14} /> : <Play color="white" size={14} fill="white" />}
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const SubjectsScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { subscriptionStatus } = useLevels();

  const displayedSubjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return ALL_SUBJECTS.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  const totalPages = Math.ceil(ALL_SUBJECTS.length / ITEMS_PER_PAGE);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <StudentPremiumBackground color1="#06B6D4" color2="#3B82F6" color3="#10B981" />
      
      <View style={styles.floatingHeader}>
        <BlurView intensity={60} style={styles.glassPill}>
          <View style={styles.pillContent}>
            <View style={styles.pillLeft}>
               <Text style={styles.pillTitle}>Darslar</Text>
               <View style={styles.dotSeparator} />
               <Text style={styles.pillCount}>{ALL_SUBJECTS.length} ta</Text>
            </View>
            
            <View style={styles.pillDivider} />
            
            <TouchableOpacity style={styles.pillSearch}>
               <Search color={COLORS.primary} size={18} />
               <Text style={styles.pillSearchText}>Qidirish...</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.pillFilter}>
               <Filter color="white" size={16} />
            </TouchableOpacity>
          </View>
        </BlurView>
        
      </View>

      <FlatList
        data={displayedSubjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SubjectCard 
            item={item} 
            navigation={navigation} 
            isLocked={subscriptionStatus === 'free' && parseInt(item.id) > 4}
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={styles.pagination}>
            <TouchableOpacity 
              disabled={currentPage === 1}
              onPress={() => setCurrentPage(p => p - 1)}
              style={[styles.pageBtn, currentPage === 1 && styles.disabledBtn]}
            >
              <ChevronLeft color={currentPage === 1 ? "#CBD5E1" : COLORS.primary} size={24} />
            </TouchableOpacity>
            
            <View style={styles.pageInfo}>
              <Text style={styles.pageText}>{currentPage} / {totalPages}</Text>
            </View>

            <TouchableOpacity 
              disabled={currentPage === totalPages}
              onPress={() => setCurrentPage(p => p + 1)}
              style={[styles.pageBtn, currentPage === totalPages && styles.disabledBtn]}
            >
              <ChevronRight color={currentPage === totalPages ? "#CBD5E1" : COLORS.primary} size={24} />
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
  },
  floatingHeader: {
    paddingTop: 15,
    paddingBottom: 10,
    zIndex: 10,
  },
  glassPill: {
    marginHorizontal: 20,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    ...SHADOWS.medium,
    overflow: 'hidden',
  },
  pillContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingLeft: 20,
  },
  pillLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pillTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
  },
  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
    marginHorizontal: 8,
  },
  pillCount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  pillDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 15,
  },
  pillSearch: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pillSearchText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
  },
  pillFilter: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  catBarWrapper: {
    marginTop: 18,
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  catBarScroll: {
    gap: 4,
  },
  catBarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    gap: 8,
  },
  activeCatBarItem: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.light,
  },
  catIcon: {
    opacity: 0.9,
  },
  catBarText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#64748B',
  },
  activeCatBarText: {
    color: 'white',
  },
  listContent: {
    padding: 20,
    paddingBottom: 120,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: COLUMN_WIDTH,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: 'white',
    ...SHADOWS.medium,
  },
  cardGradient: {
    padding: 12,
    flex: 1,
  },
  imageBox: {
    height: 120,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  subjectImage: {
    width: '100%',
    height: '100%',
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  lockCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    marginTop: 12,
    paddingHorizontal: 4,
  },
  catRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  catBadge: {
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
    height: 40,
    lineHeight: 20,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  barBg: {
    flex: 1,
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    width: 32,
  },
  playFab: {
    position: 'absolute',
    top: 102,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
    borderWidth: 2,
    borderColor: 'white',
  },
  lockedCard: {
    opacity: 0.85,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 15,
  },
  pageBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  disabledBtn: {
    opacity: 0.5,
  },
  pageInfo: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 14,
  },
  pageText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
  },
});

export default SubjectsScreen;
