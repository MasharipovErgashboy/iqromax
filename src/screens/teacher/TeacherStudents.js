import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  StatusBar,
  Modal,
  Pressable,
  Animated,
  Easing
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  Filter,
  Users,
  Search,
  LayoutGrid,
  List,
  Edit,
  BarChart3,
  Trash2,
  Check,
  X,
  Target,
  Clock,
  ArrowUpRight,
  ChevronRight,
  MessageCircle,
  AlertCircle,
  MoreHorizontal
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS, GLASS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import PremiumBackground from '../../components/PremiumBackground';

const { width, height } = Dimensions.get('window');

const ScaleButton = ({ children, onPress, style }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      tension: 40,
      friction: 3
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 40,
      friction: 3
    }).start();
  };

  return (
    <Pressable 
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={style}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }], flex: 1 }}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

const GroupCard = ({ group, isDark, theme, navigation, onViewMenu, viewMode, index }) => {
  if (viewMode === 'list') {
    return (
      <ScaleButton
        style={[styles.listCard, isDark ? GLASS.dark : GLASS.light]}
        onPress={() => navigation.navigate('GroupDetail')}
      >
        <LinearGradient
          colors={[group.color + '20', group.color + '08']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          style={styles.listGradient}
        />
        <View style={[styles.listAccent, { backgroundColor: group.color }]} />
        <View style={[styles.listIcon, { backgroundColor: group.color + '18' }]}>
           <Target color={group.color} size={20} />
        </View>
        <View style={styles.listContent}>
           <Text style={[styles.listName, { color: theme.text }]}>{group.name}</Text>
           <Text style={[styles.listSub, { color: theme.textSecondary }]}>{group.subject}</Text>
        </View>
        <View style={styles.listRight}>
           <Text style={[styles.listProgress, { color: group.color }]}>{group.progress}%</Text>
           <Text style={[styles.listCount, { color: theme.textSecondary }]}>{group.count} ta</Text>
        </View>
        <TouchableOpacity onPress={onViewMenu} style={styles.listMenu}>
           <MoreHorizontal color={theme.textSecondary} size={18} />
        </TouchableOpacity>
      </ScaleButton>
    );
  }

  return (
    <ScaleButton
      style={[
        styles.groupCard,
        isDark ? GLASS.dark : GLASS.light,
        isDark && { shadowColor: group.color, shadowOpacity: 0.2, shadowRadius: 16 }
      ]}
      onPress={() => navigation.navigate('GroupDetail')}
    >
      {/* Top accent bar */}
      <LinearGradient
        colors={[group.color, group.color + 'AA']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={styles.cardAccentBar}
      />

      {/* Subtle inner glow */}
      <LinearGradient
        colors={[group.color + '10', 'transparent']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      />

      {/* Header */}
      <View style={styles.groupHeader}>
        <View style={[styles.groupIcon, { backgroundColor: group.color + '18' }]}>
          <Target color={group.color} size={26} />
        </View>
        <View style={styles.groupMainInfo}>
          <Text style={[styles.groupName, { color: theme.text }]}>{group.name}</Text>
          <Text style={[styles.groupSubject, { color: theme.textSecondary }]}>{group.subject}</Text>
        </View>
        <TouchableOpacity onPress={onViewMenu} style={styles.menuBtn}>
          <MoreHorizontal color={theme.textSecondary} size={20} />
        </TouchableOpacity>
      </View>

      {/* Stats Row */}
      <View style={styles.groupStats}>
        <View style={[styles.statPill, { backgroundColor: group.color + '12' }]}>
          <Users color={group.color} size={13} />
          <Text style={[styles.statPillText, { color: group.color }]}>{group.count} o'quvchi</Text>
        </View>
        <View style={[styles.statPill, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }]}>
          <Clock color={theme.textSecondary} size={13} />
          <Text style={[styles.statPillText, { color: theme.textSecondary }]}>{group.schedule}</Text>
        </View>
      </View>

      {/* Progress */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressLabel, { color: theme.textSecondary }]}>O'zlashtirish</Text>
          <Text style={[styles.progressValue, { color: group.color }]}>{group.progress}%</Text>
        </View>
        <View style={[styles.progressBarBg, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#EFF2F7' }]}>
          <LinearGradient
            colors={[group.color, group.color + 'BB']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={[styles.progressBarFill, { width: `${group.progress}%` }]}
          />
        </View>
      </View>

      {/* Footer */}
      <View style={[styles.cardFooter, { borderTopColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)' }]}>
        <Text style={[styles.footerText, { color: theme.textSecondary }]}>Batafsil ko'rish</Text>
        <View style={[styles.footerBtn, { backgroundColor: group.color + '15' }]}>
          <ChevronRight color={group.color} size={15} />
        </View>
      </View>
    </ScaleButton>
  );
};


const TeacherStudents = ({ navigation }) => {
  const { isDark, theme } = useTheme();
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('Barchasi');

  const GROUPS = [
    { id: '1', name: 'Alpha', subject: 'Mental Arifmetika', count: 12, schedule: 'Dush, Chor, Juma', progress: 85, color: '#0EA5E9', status: 'Faol', statusColor: '#0EA5E9' },
    { id: '2', name: 'Bravo', subject: 'Abakus Pro', count: 15, schedule: 'Sesh, Pay, Shan', progress: 72, color: '#10B981', status: 'Yaqinda', statusColor: '#10B981' },
    { id: '3', name: 'Gamma', subject: 'Tezkor Hisob', count: 8, schedule: 'Har kuni', progress: 94, color: '#F59E0B', status: 'To\'la', statusColor: '#EF4444' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <PremiumBackground color1={COLORS.secondary} color2={COLORS.primary} />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>O'quvchilar</Text>
          <ScaleButton 
            style={[styles.filterBtn, isDark ? GLASS.dark : GLASS.light]}
            onPress={() => setIsFilterOpen(true)}
          >
             <View style={styles.filterIconContent}>
               <Filter color={isFilterOpen ? COLORS.secondary : theme.textSecondary} size={20} />
             </View>
          </ScaleButton>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Search Bar */}
          <View style={[styles.searchWrapper, isDark ? GLASS.dark : GLASS.light]}>
             <Search color={theme.textSecondary} size={20} />
             <TextInput 
                placeholder="Guruh yoki o'quvchini qidiring..."
                placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : COLORS.gray[400]}
                style={[styles.searchInput, { color: theme.text }]}
                value={search}
                onChangeText={setSearch}
             />
          </View>

          {/* Highlights */}
          <View style={styles.highlights}>
             <ScaleButton style={{ width: (width - 52) / 2 }}>
               <LinearGradient
                colors={isDark ? ['#1E293B', '#0F172A'] : ['#F0F9FF', '#E0F2FE']}
                style={[styles.highlightCard, { borderColor: isDark ? 'rgba(14, 165, 233, 0.2)' : '#BAE6FD', borderWidth: 1 }]}
               >
                  <Text style={[styles.highlightValue, { color: '#0EA5E9' }]}>35</Text>
                  <Text style={[styles.highlightLabel, { color: theme.textSecondary }]}>Jami o'quvchi</Text>
                  <ArrowUpRight color="#0EA5E9" size={20} style={styles.highlightIcon} />
               </LinearGradient>
             </ScaleButton>

             <ScaleButton style={{ width: (width - 52) / 2 }}>
               <LinearGradient
                colors={isDark ? ['#1E293B', '#0F172A'] : ['#F0FDF4', '#DCFCE7']}
                style={[styles.highlightCard, { borderColor: isDark ? 'rgba(16, 185, 129, 0.2)' : '#BBF7D0', borderWidth: 1 }]}
               >
                  <Text style={[styles.highlightValue, { color: '#10B981' }]}>3</Text>
                  <Text style={[styles.highlightLabel, { color: theme.textSecondary }]}>Faol guruh</Text>
                  <ArrowUpRight color="#10B981" size={20} style={styles.highlightIcon} />
               </LinearGradient>
             </ScaleButton>
          </View>

          {/* Groups List Header */}
          <View style={styles.listHeader}>
             <Text style={[styles.listTitle, { color: theme.text }]}>Barcha guruhlaringiz</Text>
             <View style={styles.viewToggle}>
                <TouchableOpacity 
                  style={[styles.toggleItem, viewMode === 'grid' && { backgroundColor: COLORS.secondary + '15' }]} 
                  onPress={() => setViewMode('grid')}
                >
                  <LayoutGrid color={viewMode === 'grid' ? COLORS.secondary : theme.textSecondary} size={18} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.toggleItem, viewMode === 'list' && { backgroundColor: COLORS.secondary + '15' }]} 
                  onPress={() => setViewMode('list')}
                >
                  <List color={viewMode === 'list' ? COLORS.secondary : theme.textSecondary} size={18} />
                </TouchableOpacity>
             </View>
          </View>

          {GROUPS.map((group, index) => (
            <GroupCard 
              key={group.id} 
              index={index}
              group={group} 
              isDark={isDark} 
              theme={theme} 
              navigation={navigation} 
              viewMode={viewMode}
              onViewMenu={() => setActiveMenu(group)}
            />
          ))}
        </ScrollView>
      </SafeAreaView>

      {/* Filter Modal */}
      <Modal visible={isFilterOpen} transparent animationType="fade">
        <View style={styles.modalOverlay}>
           <BlurView intensity={20} style={StyleSheet.absoluteFill} />
           <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setIsFilterOpen(false)} />
           <View style={[styles.filterModal, isDark ? GLASS.dark : GLASS.light]}>
              <View style={styles.modalHeader}>
                 <Text style={[styles.modalTitle, { color: theme.text }]}>Saralash va Filtr</Text>
                 <TouchableOpacity onPress={() => setIsFilterOpen(false)} style={styles.closeBtn}>
                    <X color={theme.text} size={20} />
                 </TouchableOpacity>
              </View>
              
              <View style={styles.filterSection}>
                 <Text style={[styles.filterLabel, { color: theme.textSecondary }]}>Fan Bo'yicha</Text>
                 <View style={styles.filtersRow}>
                    {['Barchasi', 'Mental Arif.', 'Abakus Pro'].map(f => (
                       <TouchableOpacity 
                          key={f} 
                          onPress={() => setSelectedFilter(f)}
                          style={[styles.filterTag, selectedFilter === f && styles.activeTag, { backgroundColor: isDark ? '#1E293B' : '#F8FAFC' }]}
                       >
                          <Text style={[styles.tagText, { color: selectedFilter === f ? 'white' : theme.textSecondary }]}>{f}</Text>
                       </TouchableOpacity>
                    ))}
                 </View>
              </View>

              <TouchableOpacity style={styles.applyBtn} onPress={() => setIsFilterOpen(false)}>
                 <Text style={styles.applyText}>Filtrni qo'llash</Text>
              </TouchableOpacity>
           </View>
        </View>
      </Modal>

      {/* Action Menu Modal */}
      <Modal visible={activeMenu !== null} transparent animationType="fade">
        <View style={styles.modalOverlay}>
           <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setActiveMenu(null)} />
           <View style={[styles.menuModal, isDark ? GLASS.dark : GLASS.light]}>
              <Text style={[styles.menuTitle, { color: theme.text }]}>{activeMenu?.name} Guruhi</Text>
              
              <TouchableOpacity style={styles.menuItem} onPress={() => setActiveMenu(null)}>
                 <Edit color={theme.textSecondary} size={20} />
                 <Text style={[styles.menuText, { color: theme.text }]}>Guruhni tahrirlash</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => setActiveMenu(null)}>
                 <BarChart3 color={theme.textSecondary} size={20} />
                 <Text style={[styles.menuText, { color: theme.text }]}>Guruh hisoboti</Text>
              </TouchableOpacity>

              <View style={[styles.menuSeparator, { backgroundColor: theme.border }]} />

              <TouchableOpacity style={styles.menuItem} onPress={() => setActiveMenu(null)}>
                 <Trash2 color="#EF4444" size={20} />
                 <Text style={[styles.menuText, { color: '#EF4444' }]}>Guruhni o'chirish</Text>
              </TouchableOpacity>
           </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  title: { fontSize: 28, fontWeight: '900' },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  filterIconContent: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    borderRadius: 16,
    paddingHorizontal: 15,
    marginTop: 10,
    gap: 12,
    ...SHADOWS.light,
  },
  searchInput: { flex: 1, fontSize: 16, fontWeight: '600' },
  highlights: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  highlightCard: {
    padding: 15,
    borderRadius: 20,
    position: 'relative',
    overflow: 'hidden',
    height: 100,
  },
  highlightValue: { fontSize: 24, fontWeight: '900' },
  highlightLabel: { fontSize: 11, fontWeight: '700', marginTop: 2 },
  highlightIcon: { position: 'absolute', right: 10, top: 10, opacity: 0.5 },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15,
  },
  listTitle: { fontSize: 18, fontWeight: '900' },
  viewToggle: { 
    flexDirection: 'row', 
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    padding: 4,
    borderRadius: 12
  },
  toggleItem: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  groupCard: {
    borderRadius: 24,
    marginBottom: 16,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  cardAccentBar: {
    height: 5,
    width: '100%',
    marginBottom: 0,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 20,
    paddingBottom: 12,
  },
  groupIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupMainInfo: { flex: 1 },
  groupName: { fontSize: 19, fontWeight: '800', letterSpacing: -0.3 },
  groupSubject: { fontSize: 13, fontWeight: '600', marginTop: 3, opacity: 0.75 },
  menuBtn: { width: 34, height: 34, justifyContent: 'center', alignItems: 'center' },
  groupStats: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },
  statPillText: { fontSize: 12, fontWeight: '700' },
  progressSection: { paddingHorizontal: 20, marginTop: 18 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { fontSize: 12, fontWeight: '700' },
  progressValue: { fontSize: 13, fontWeight: '900' },
  progressBarBg: { height: 8, borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 18,
    borderTopWidth: 1,
  },
  footerText: { fontSize: 12, fontWeight: '700' },
  footerBtn: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },

  // List card
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 12,
    gap: 12,
    overflow: 'hidden',
    ...SHADOWS.light,
  },
  listAccent: { width: 4, height: 36, borderRadius: 2 },
  listGradient: { ...StyleSheet.absoluteFillObject, opacity: 0.6 },
  listIcon: { width: 44, height: 44, borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
  listContent: { flex: 1 },
  listName: { fontSize: 15, fontWeight: '800' },
  listSub: { fontSize: 12, fontWeight: '600', marginTop: 2, opacity: 0.7 },
  listRight: { alignItems: 'flex-end' },
  listProgress: { fontSize: 15, fontWeight: '900' },
  listCount: { fontSize: 10, fontWeight: '700', marginTop: 2, opacity: 0.7 },
  listMenu: { padding: 6 },
  
  // Modals
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  filterModal: { 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    padding: 25,
    paddingBottom: 40,
    ...SHADOWS.medium 
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  modalTitle: { fontSize: 20, fontWeight: '900' },
  closeBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.05)', justifyContent: 'center', alignItems: 'center' },
  filterSection: { marginBottom: 25 },
  filterLabel: { fontSize: 14, fontWeight: '800', marginBottom: 12 },
  filtersRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  filterTag: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 14, borderWidth: 1, borderColor: 'transparent' },
  activeTag: { backgroundColor: COLORS.secondary, borderColor: COLORS.secondary },
  tagText: { fontSize: 13, fontWeight: '700' },
  applyBtn: { 
    backgroundColor: COLORS.secondary, 
    height: 56, 
    borderRadius: 18, 
    justifyContent: 'center', 
    alignItems: 'center',
    ...SHADOWS.medium 
  },
  applyText: { color: 'white', fontSize: 16, fontWeight: '900' },

  menuModal: { 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    padding: 25,
    paddingBottom: 40 
  },
  menuTitle: { fontSize: 18, fontWeight: '900', marginBottom: 20, textAlign: 'center' },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 15, 
    paddingVertical: 15 
  },
  menuText: { fontSize: 16, fontWeight: '700' },
  menuSeparator: { height: 1, marginVertical: 5, opacity: 0.5 },
});

export default TeacherStudents;
