import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
  Platform,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Maximize, 
  Settings, 
  Download, 
  FileText, 
  MessageCircle, 
  Clock, 
  ChevronRight,
  List,
  Star
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const CHAPTERS = [
  { id: '1', title: 'Kirish va Abakus tarixi', time: '00:00', duration: '05:20', completed: true },
  { id: '2', title: 'Tayanch qoidalar', time: '05:20', duration: '12:45', completed: true },
  { id: '3', title: 'Amaliy hisoblashlar', time: '18:05', duration: '20:10', completed: false },
  { id: '4', title: 'Xulosa va uy vazifasi', time: '38:15', duration: '08:00', completed: false },
];

const MATERIALS = [
  { id: '1', title: 'Dars prezentatsiyasi', type: 'PDF', size: '2.4 MB' },
  { id: '2', title: 'Abakus mashqlar to\'plami', type: 'PDF', size: '4.8 MB' },
  { id: '3', title: 'Qoidalar mundarijasi', type: 'JPG', size: '1.2 MB' },
];

const LiveLessonArchivePlayer = ({ navigation, route }) => {
  const { theme, isDark } = useTheme();
  const { lesson = { title: 'Abakus Sirlari', teacher: 'Shoxruh Ustoz' } } = route.params || {};
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('chapters');
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0x');
  
  const progressAnim = useRef(new Animated.Value(30)).current; // Mock 30% progress

  const toggleTab = (tab) => setActiveTab(tab);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent />
      
      {/* Video Player Area */}
      <View style={styles.playerContainer}>
        <Image 
          source={require('../../../assets/live_promo.png')} 
          style={styles.mainThumb} 
          resizeMode="cover"
        />
        <LinearGradient 
          colors={['rgba(0,0,0,0.5)', 'transparent', 'rgba(0,0,0,0.7)']} 
          style={styles.playerOverlay}
        >
          {/* Header Controls */}
          <SafeAreaView style={styles.playerHeader}>
             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <ArrowLeft color="white" size={24} />
             </TouchableOpacity>
             <View style={styles.lessonMeta}>
                <Text style={styles.miniTitle} numberOfLines={1}>{lesson.title}</Text>
                <Text style={styles.miniTeacher}>{lesson.teacher}</Text>
             </View>
             <TouchableOpacity style={styles.backBtn}>
                <Settings color="white" size={22} />
             </TouchableOpacity>
          </SafeAreaView>

          {/* Center Play Control */}
          <TouchableOpacity 
            onPress={() => setIsPlaying(!isPlaying)}
            style={styles.playTrigger}
          >
             <BlurView intensity={30} tint="light" style={styles.playBlur}>
                {isPlaying ? <Pause color="white" size={36} fill="white" /> : <Play color="white" size={36} fill="white" />}
             </BlurView>
          </TouchableOpacity>

          {/* Progress & Bottom Controls */}
          <View style={styles.playerBottom}>
             <View style={styles.progressBarBg}>
                <Animated.View style={[styles.progressBarFill, { width: '45%' }]} />
                <View style={styles.progressHandle} />
             </View>
             
             <View style={styles.controlsRow}>
                <View style={styles.timeInfo}>
                   <Text style={styles.currentTime}>22:45</Text>
                   <Text style={styles.totalTime}> / 46:15</Text>
                </View>

                <View style={styles.rightControls}>
                   <TouchableOpacity 
                     onPress={() => setPlaybackSpeed(prev => prev === '1.0x' ? '1.5x' : prev === '1.5x' ? '2.0x' : '1.0x')}
                     style={styles.speedBtn}
                   >
                      <Text style={styles.speedText}>{playbackSpeed}</Text>
                   </TouchableOpacity>
                   <TouchableOpacity>
                      <Maximize color="white" size={20} />
                   </TouchableOpacity>
                </View>
             </View>
          </View>
        </LinearGradient>
      </View>

      {/* Content Tabs Area */}
      <View style={[styles.contentArea, { backgroundColor: theme.background }]}>
         <View style={[styles.tabBar, { borderBottomColor: theme.border }]}>
            <TouchableOpacity onPress={() => toggleTab('chapters')} style={[styles.tabItem, activeTab === 'chapters' && styles.activeTab]}>
               <List size={18} color={activeTab === 'chapters' ? COLORS.primary : COLORS.gray[400]} />
               <Text style={[styles.tabText, { color: activeTab === 'chapters' ? COLORS.primary : COLORS.gray[400] }]}>Mavzular</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleTab('materials')} style={[styles.tabItem, activeTab === 'materials' && styles.activeTab]}>
               <Download size={18} color={activeTab === 'materials' ? COLORS.primary : COLORS.gray[400]} />
               <Text style={[styles.tabText, { color: activeTab === 'materials' ? COLORS.primary : COLORS.gray[400] }]}>Materiallar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleTab('qa')} style={[styles.tabItem, activeTab === 'qa' && styles.activeTab]}>
               <MessageCircle size={18} color={activeTab === 'qa' ? COLORS.primary : COLORS.gray[400]} />
               <Text style={[styles.tabText, { color: activeTab === 'qa' ? COLORS.primary : COLORS.gray[400] }]}>Savollar</Text>
            </TouchableOpacity>
         </View>

         <ScrollView 
           showsVerticalScrollIndicator={false} 
           contentContainerStyle={styles.scrollContent}
         >
            {activeTab === 'chapters' && (
              <View style={styles.listContainer}>
                 {CHAPTERS.map((item, index) => (
                   <TouchableOpacity key={item.id} style={[styles.listItem, { backgroundColor: theme.card }]}>
                      <View style={[styles.indexBox, item.completed && { backgroundColor: COLORS.primary + '20' }]}>
                         {item.completed ? <Star size={14} color={COLORS.primary} fill={COLORS.primary} /> : <Text style={styles.indexNum}>{index + 1}</Text>}
                      </View>
                      <View style={styles.listInfo}>
                         <Text style={[styles.listTitle, { color: theme.text }]}>{item.title}</Text>
                         <View style={styles.timeRow}>
                            <Clock size={12} color={COLORS.gray[400]} />
                            <Text style={styles.timeMeta}>{item.time} ({item.duration})</Text>
                         </View>
                      </View>
                      <Play size={16} color={COLORS.gray[300]} />
                   </TouchableOpacity>
                 ))}
              </View>
            )}

            {activeTab === 'materials' && (
              <View style={styles.listContainer}>
                 {MATERIALS.map((item) => (
                   <TouchableOpacity key={item.id} style={[styles.listItem, { backgroundColor: theme.card }]}>
                      <View style={[styles.fileIcon, { backgroundColor: COLORS.primaryLight + '20' }]}>
                         <FileText size={20} color={COLORS.primary} />
                      </View>
                      <View style={styles.listInfo}>
                         <Text style={[styles.listTitle, { color: theme.text }]}>{item.title}</Text>
                         <Text style={styles.timeMeta}>{item.type} • {item.size}</Text>
                      </View>
                      <Download size={20} color={COLORS.gray[400]} />
                   </TouchableOpacity>
                 ))}
                 <TouchableOpacity style={[styles.downloadAllBtn, { backgroundColor: COLORS.primary }]}>
                    <Download color="white" size={20} />
                    <Text style={styles.downloadAllText}>Barcha fayllarni yuklash</Text>
                 </TouchableOpacity>
              </View>
            )}

            {activeTab === 'qa' && (
               <View style={styles.listContainer}>
                  <View style={[styles.qaEmpty, { backgroundColor: theme.card }]}>
                     <MessageCircle size={48} color={COLORS.gray[300]} />
                     <Text style={[styles.qaEmptyTitle, { color: theme.text }]}>Savollar mavjud emas</Text>
                     <Text style={[styles.qaEmptySub, { color: theme.textSecondary }]}>Siz ushbu darsga oid ilk savolni qoldirishingiz mumkin.</Text>
                     <TouchableOpacity style={[styles.askBtn, { borderColor: COLORS.primary }]}>
                        <Text style={[styles.askBtnText, { color: COLORS.primary }]}>Savol berish</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            )}

            <View style={{ height: 100 }} />
         </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  playerContainer: { height: 320, width: '100%', position: 'relative' },
  mainThumb: { width: '100%', height: '100%' },
  playerOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'space-between' },
  
  playerHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 0 : 40 },
  backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  lessonMeta: { flex: 1, paddingHorizontal: 10 },
  miniTitle: { color: 'white', fontSize: 14, fontWeight: '800' },
  miniTeacher: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: '600' },

  playTrigger: { alignSelf: 'center' },
  playBlur: { width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },

  playerBottom: { paddingHorizontal: 20, paddingBottom: 20 },
  progressBarBg: { height: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2, position: 'relative', marginBottom: 15 },
  progressBarFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 2 },
  progressHandle: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.primary, position: 'absolute', top: -4, left: '44%' },
  
  controlsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timeInfo: { flexDirection: 'row', alignItems: 'center' },
  currentTime: { color: 'white', fontSize: 12, fontWeight: '700' },
  totalTime: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: '500' },
  rightControls: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  speedBtn: { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  speedText: { color: 'white', fontSize: 11, fontWeight: '900' },

  contentArea: { flex: 1, borderTopLeftRadius: 36, borderTopRightRadius: 36, marginTop: -30 },
  tabBar: { flexDirection: 'row', paddingHorizontal: 20, paddingTop: 20, borderBottomWidth: 1 },
  tabItem: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 15, gap: 8 },
  activeTab: { borderBottomWidth: 3, borderBottomColor: COLORS.primary },
  tabText: { fontSize: 13, fontWeight: '800' },

  scrollContent: { padding: 25 },
  listContainer: { gap: 12 },
  listItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 24, ...SHADOWS.light },
  indexBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  indexNum: { fontSize: 14, fontWeight: '800', color: COLORS.gray[400] },
  listInfo: { flex: 1, paddingHorizontal: 15 },
  listTitle: { fontSize: 14, fontWeight: '800', marginBottom: 4 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  timeMeta: { fontSize: 12, color: COLORS.gray[400], fontWeight: '600' },

  fileIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  downloadAllBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, borderRadius: 20, gap: 12, marginTop: 10, ...SHADOWS.medium },
  downloadAllText: { color: 'white', fontSize: 15, fontWeight: '900' },

  qaEmpty: { padding: 40, alignItems: 'center', borderRadius: 30, textAlign: 'center' },
  qaEmptyTitle: { fontSize: 18, fontWeight: '900', marginTop: 15, marginBottom: 8 },
  qaEmptySub: { fontSize: 13, textAlign: 'center', lineHeight: 20 },
  askBtn: { marginTop: 20, paddingHorizontal: 30, paddingVertical: 12, borderRadius: 15, borderWidth: 1.5 },
  askBtnText: { fontSize: 14, fontWeight: '900' },
});

export default LiveLessonArchivePlayer;
