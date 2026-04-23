import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Platform,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, 
  Play, 
  Pause,
  Download,
  Share2,
  MessageSquare,
  FileText,
  ChevronRight,
  Maximize2,
  Volume2,
  Star,
  Send
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const StudentVideoLesson = ({ navigation, route }) => {
  const { isDark, theme } = useTheme();
  const { lesson = { title: 'Abakus bilan tanishuv', duration: '12 min' } } = route.params || {};
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('notes'); // 'notes', 'resources', 'chat'

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Video Player Section */}
      <View style={styles.videoSection}>
        <Image 
          source={require('../../../assets/abacus_3d.png')} 
          style={styles.videoPlaceholder} 
          resizeMode="cover" 
        />
        <LinearGradient 
          colors={['rgba(0,0,0,0.4)', 'transparent', 'rgba(0,0,0,0.6)']}
          style={StyleSheet.absoluteFill}
        />
        
        <SafeAreaView style={styles.videoHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.videoBackBtn}>
            <ArrowLeft color="white" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.videoBackBtn}>
            <Share2 color="white" size={20} />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.videoControls}>
          <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)} style={styles.playCenterBtn}>
            {isPlaying ? <Pause color="white" fill="white" size={40} /> : <Play color="white" fill="white" size={40} />}
          </TouchableOpacity>
          
          <View style={styles.videoBottomControls}>
             <View style={styles.progressRow}>
                <View style={styles.progressBar}>
                   <View style={[styles.progressFill, { width: '45%' }]} />
                </View>
                <Text style={styles.videoTime}>04:20 / 12:00</Text>
             </View>
             <View style={styles.controlIcons}>
                <Volume2 color="white" size={20} />
                <Maximize2 color="white" size={20} />
             </View>
          </View>
        </View>
      </View>

      {/* Content Section */}
      <View style={[styles.contentSection, { backgroundColor: theme.background }]}>
         <View style={styles.titleArea}>
            <Text style={[styles.lessonTitle, { color: theme.text }]}>{lesson.title}</Text>
            <View style={styles.ratingRow}>
               <Star color="#F59E0B" fill="#F59E0B" size={14} />
               <Text style={[styles.ratingText, { color: theme.textSecondary }]}>4.9 (125 fikrlar)</Text>
            </View>
         </View>

         {/* Sub Tabs */}
         <View style={[styles.tabBar, { borderBottomColor: theme.border }]}>
            {['notes', 'resources', 'chat'].map((tab) => (
              <TouchableOpacity 
                key={tab} 
                onPress={() => setActiveTab(tab)}
                style={[styles.tab, activeTab === tab && { borderBottomColor: COLORS.primary }]}
              >
                <Text style={[
                  styles.tabText, 
                  { color: activeTab === tab ? theme.text : theme.textSecondary },
                  activeTab === tab && styles.activeTabText
                ]}>
                  {tab === 'notes' ? 'Konspekt' : tab === 'resources' ? 'Materiallar' : 'Muhokama'}
                </Text>
              </TouchableOpacity>
            ))}
         </View>

         <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {activeTab === 'notes' && (
              <View style={styles.notesContainer}>
                 <Text style={[styles.notesHeading, { color: theme.text }]}>Bugungi dars haqida</Text>
                 <Text style={[styles.notesBody, { color: theme.textSecondary }]}>
                    Abakus - bu qadimiy hisoblash asbobi. Bugungi darsda biz uning tuzilishi, "osmon" va "yer" toshlari 
                    hamda ularning qiymatlarini ko'rib chiqamiz. {"\n\n"}
                    O'quvchilar bu darsdan so'ng 1 dan 10 gacha bo'lgan sonlarni abakusda ko'rsata olishlari kerak.
                 </Text>
                 <View style={[styles.tipCard, { backgroundColor: COLORS.primary + '10' }]}>
                    <Text style={[styles.tipTitle, { color: COLORS.primary }]}>💡 Foydali maslahat</Text>
                    <Text style={[styles.tipText, { color: theme.textSecondary }]}>
                       Barmoqlardan to'g'ri foydalanish tezkorlikning asosidir. Ko'rsatkich va bosh barmoq pozisiyasiga e'tibor bering.
                    </Text>
                 </View>
              </View>
            )}

            {activeTab === 'resources' && (
              <View style={styles.resourcesContainer}>
                 {[
                   { name: 'Abakus_asoslari.pdf', size: '2.4 MB' },
                   { name: 'Mashqlar_toplami.pdf', size: '1.8 MB' },
                   { name: 'Qoshish_formulalari.jpg', size: '800 KB' }
                 ].map((res, i) => (
                   <TouchableOpacity key={i} style={[styles.resourceCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                      <View style={styles.resIconBox}>
                         <FileText color={COLORS.primary} size={24} />
                      </View>
                      <View style={styles.resInfo}>
                         <Text style={[styles.resName, { color: theme.text }]}>{res.name}</Text>
                         <Text style={[styles.resSize, { color: theme.textSecondary }]}>{res.size}</Text>
                      </View>
                      <Download color={theme.textSecondary} size={20} />
                   </TouchableOpacity>
                 ))}
              </View>
            )}

            {activeTab === 'chat' && (
              <View style={styles.chatContainer}>
                 {[
                   { user: 'Azizbek', text: 'Ustoz, 5-formulani qaytadan tushuntira olasizmi?' },
                   { user: 'Madina', text: 'Juda zo\'r dars bo\'ldi, rahmat!' }
                 ].map((msg, i) => (
                   <View key={i} style={styles.chatItem}>
                      <View style={[styles.avatarBox, { backgroundColor: COLORS.primary + '20' }]}>
                         <Text style={{ color: COLORS.primary, fontWeight: '800' }}>{msg.user[0]}</Text>
                      </View>
                      <View style={[styles.messageBox, { backgroundColor: theme.card }]}>
                         <Text style={[styles.userName, { color: theme.text }]}>{msg.user}</Text>
                         <Text style={[styles.userText, { color: theme.textSecondary }]}>{msg.text}</Text>
                      </View>
                   </View>
                 ))}
              </View>
            )}
         </ScrollView>
      </View>

      {/* Absolute Chat Input (Only on Chat tab) */}
      {activeTab === 'chat' && (
        <View style={[styles.inputArea, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
           <TextInput 
             placeholder="Savol berish..." 
             placeholderTextColor={theme.textSecondary}
             style={[styles.input, { color: theme.text, backgroundColor: theme.background }]}
           />
           <TouchableOpacity style={styles.sendBtn}>
              <Send color="white" size={20} />
           </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  videoSection: { height: 260, backgroundColor: '#000' },
  videoPlaceholder: { width: '100%', height: '100%', opacity: 0.6 },
  videoHeader: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  videoBackBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  videoControls: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' },
  playCenterBtn: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(59, 130, 246, 0.8)', justifyContent: 'center', alignItems: 'center' },
  videoBottomControls: { position: 'absolute', bottom: 15, left: 15, right: 15 },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  progressBar: { flex: 1, height: 4, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 2 },
  progressFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 2 },
  videoTime: { color: 'white', fontSize: 10, fontWeight: '700' },
  controlIcons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 15, marginTop: 10 },
  contentSection: { flex: 1, marginTop: -20, borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingHorizontal: 20 },
  titleArea: { marginVertical: 20 },
  lessonTitle: { fontSize: 22, fontWeight: '900' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 5 },
  ratingText: { fontSize: 13, fontWeight: '600' },
  tabBar: { flexDirection: 'row', borderBottomWidth: 1, marginBottom: 15 },
  tab: { paddingVertical: 12, paddingHorizontal: 15, borderBottomWidth: 3, borderBottomColor: 'transparent' },
  tabText: { fontSize: 14, fontWeight: '700' },
  activeTabText: { fontWeight: '900' },
  scrollContent: { paddingBottom: 100 },
  notesContainer: { paddingTop: 5 },
  notesHeading: { fontSize: 18, fontWeight: '800', marginBottom: 10 },
  notesBody: { fontSize: 15, lineHeight: 24, fontWeight: '500' },
  tipCard: { padding: 15, borderRadius: 15, marginTop: 25 },
  tipTitle: { fontSize: 15, fontWeight: '800', marginBottom: 5 },
  tipText: { fontSize: 13, fontWeight: '600', lineHeight: 20 },
  resourcesContainer: { gap: 12 },
  resourceCard: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 18, borderWidth: 1, ...SHADOWS.light },
  resIconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', ...SHADOWS.light },
  resInfo: { flex: 1, marginLeft: 15 },
  resName: { fontSize: 14, fontWeight: '700' },
  resSize: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  chatContainer: { gap: 20 },
  chatItem: { flexDirection: 'row', gap: 15 },
  avatarBox: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  messageBox: { flex: 1, padding: 12, borderRadius: 15, ...SHADOWS.light },
  userName: { fontSize: 13, fontWeight: '800' },
  userText: { fontSize: 14, marginTop: 4, lineHeight: 20 },
  inputArea: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingVertical: 15, borderTopWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  input: { flex: 1, height: 50, borderRadius: 15, paddingHorizontal: 15, fontSize: 14 },
  sendBtn: { width: 50, height: 50, borderRadius: 15, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
});

export default StudentVideoLesson;
