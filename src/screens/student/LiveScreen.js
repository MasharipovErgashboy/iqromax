import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  Animated,
  Platform
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Play, 
  Users, 
  Bell, 
  Tv, 
  Info, 
  MessageCircle, 
  Heart, 
  Star, 
  ChevronRight, 
  Zap,
  Plus,
  X 
} from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext.js';
import StudentPremiumBackground from '../../components/StudentPremiumBackground';

const { width } = Dimensions.get('window');

const TEACHERS = [
  { id: '1', name: 'Shoxruh', avatar: require('../../../assets/avatar_blue.png'), active: true },
  { id: '2', name: 'Madina', avatar: require('../../../assets/avatar_red.png'), active: true },
  { id: '3', name: 'Aziz', avatar: require('../../../assets/avatar_yellow.png'), active: false },
  { id: '4', name: 'Kamola', avatar: require('../../../assets/avatar_blue.png'), active: true },
  { id: '5', name: 'Alisher', avatar: require('../../../assets/avatar_red.png'), active: false },
];

const LIVE_DATA = [
  {
    id: '1',
    subject: 'Mental Arifmetika',
    title: 'Abakus sirlari: Tezkor hisoblash',
    teacher: 'Shoxruh Ustoz',
    viewers: 245,
    rating: 4.9,
    image: require('../../../assets/live_promo.png'),
    accent: '#22C55E'
  },
  {
    id: '2',
    subject: 'Mantiqiy Bilimdon',
    title: 'Mantiqiy masalalar yechimi',
    teacher: 'Madina Ustoz',
    viewers: 180,
    rating: 5.0,
    image: require('../../../assets/games_promo.png'),
    accent: '#F59E0B'
  }
];

const CHAT_LOG = [
  { id: '1', user: 'Aziz', text: 'Ustoz, juda qiziqarli dars! 😍' },
  { id: '2', user: 'Lola', text: '20-misolni tushunmadim.' },
  { id: '3', user: 'Jasur', text: 'Men birinchi tushundim! 🔥' },
];

const FloatingEmoji = ({ emoji, onComplete }) => {
  const anim = useRef(new Animated.Value(0)).current;
  const xOffset = useRef(Math.random() * 60 - 30).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => onComplete());
  }, []);

  const opacity = anim.interpolate({ inputRange: [0, 0.2, 0.8, 1], outputRange: [0, 1, 1, 0] });
  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -150] });
  const scale = anim.interpolate({ inputRange: [0, 0.2], outputRange: [0.5, 1.2] });

  return (
    <Animated.Text style={[
      styles.floatingEmoji, 
      { opacity, transform: [{ translateY }, { translateX: xOffset }, { scale }] }
    ]}>
      {emoji}
    </Animated.Text>
  );
};

const LiveScreen = ({ navigation }) => {
  const { theme, isDark } = useTheme();
  const [activeChannel, setActiveChannel] = useState(0);
  const [studioTab, setStudioTab] = useState('preview'); // 'preview', 'chat', 'info'
  const [emojis, setEmojis] = useState([]);
  const channel = LIVE_DATA[activeChannel];

  const addEmoji = (emoji) => {
    const id = Date.now();
    setEmojis(prev => [...prev, { id, emoji }]);
  };

  const removeEmoji = (id) => {
    setEmojis(prev => prev.filter(e => e.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StudentPremiumBackground color1="#F43F5E" color2="#8B5CF6" color3="#EC4899" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Live Studio</Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Notification')}
            style={styles.bellBtn}
          >
            <Bell color={COLORS.gray[400]} size={22} />
          </TouchableOpacity>
        </View>

        {/* Teacher Stories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storiesScroll}>
          {TEACHERS.map((t) => (
            <TouchableOpacity 
              key={t.id} 
              style={styles.storyItem}
              onPress={() => navigation.navigate('StudentLiveLesson', { channel: { teacher: t.name, viewers: '250+' } })}
            >
              <View style={[styles.avatarRing, t.active && styles.activeRing]}>
                <Image source={t.avatar} style={styles.storyAvatar} />
                {t.active && <View style={styles.liveIndicator}><Text style={styles.liveIndicatorText}>LIVE</Text></View>}
              </View>
              <Text style={styles.storyName}>{t.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Modular Live Studio Card */}
        <View style={styles.studioContainer}>
          <View style={styles.studioCard}>
            {/* Top Internal Tab Switcher */}
            <View style={styles.studioTabs}>
              <TouchableOpacity onPress={() => setStudioTab('preview')} style={[styles.studioTab, studioTab === 'preview' && styles.activeStudioTab]}>
                <Tv size={16} color={studioTab === 'preview' ? COLORS.primary : COLORS.gray[400]} />
                <Text style={[styles.studioTabText, studioTab === 'preview' && styles.activeStudioTabText]}>Efir</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setStudioTab('chat')} style={[styles.studioTab, studioTab === 'chat' && styles.activeStudioTab]}>
                <MessageCircle size={16} color={studioTab === 'chat' ? COLORS.primary : COLORS.gray[400]} />
                <Text style={[styles.studioTabText, studioTab === 'chat' && styles.activeStudioTabText]}>Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setStudioTab('info')} style={[styles.studioTab, studioTab === 'info' && styles.activeStudioTab]}>
                <Info size={16} color={studioTab === 'info' ? COLORS.primary : COLORS.gray[400]} />
                <Text style={[styles.studioTabText, studioTab === 'info' && styles.activeStudioTabText]}>Ma'lumot</Text>
              </TouchableOpacity>
            </View>

            {/* Studio Content Area */}
            <View style={styles.studioContent}>
              {studioTab === 'preview' && (
                <View style={styles.previewContainer}>
                  <Image source={channel.image} style={styles.previewImage} resizeMode="cover" />
                  <LinearGradient colors={['transparent', 'rgba(0,0,0,0.6)']} style={styles.previewOverlay}>
                    <View style={styles.previewTop}>
                      <View style={styles.viewBadge}>
                        <Users size={12} color={COLORS.white} />
                        <Text style={styles.viewText}>{channel.viewers} online</Text>
                      </View>
                    </View>
                    <View style={styles.previewTitleRow}>
                      <Text style={styles.previewSubject}>{channel.subject}</Text>
                      <Text style={styles.previewTitle}>{channel.title}</Text>
                    </View>
                  </LinearGradient>
                  
                  {/* Floating Emojis Animation Root */}
                  <View style={styles.emojiRoot}>
                    {emojis.map(e => <FloatingEmoji key={e.id} emoji={e.emoji} onComplete={() => removeEmoji(e.id)} />)}
                  </View>
                </View>
              )}

              {studioTab === 'chat' && (
                <View style={styles.chatContainer}>
                  <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.chatScroll}>
                    {CHAT_LOG.map(chat => (
                      <View key={chat.id} style={styles.chatItem}>
                        <View style={styles.chatUserIcon}><Text style={styles.chatUserInitial}>{chat.user[0]}</Text></View>
                        <View style={styles.chatBalloon}>
                          <Text style={styles.chatUserName}>{chat.user}</Text>
                          <Text style={styles.chatBubbleText}>{chat.text}</Text>
                        </View>
                      </View>
                    ))}
                    <Text style={styles.liveIndicatorBottom}>Efir davom etmoqda...</Text>
                  </ScrollView>
                </View>
              )}

              {studioTab === 'info' && (
                <View style={styles.infoContainer}>
                  <Text style={styles.infoTitle}>Dars Haqida</Text>
                  <Text style={styles.infoText}>Ushbu darsda biz mental arifmetikaning eng murakkab bo'limlarini o'rganamiz. Shoxruh Ustoz bilan birgalikda siz 3 xonali sonlarni hayolan qo'shishni o'rganib olasiz.</Text>
                  <View style={styles.teacherStats}>
                    <View style={styles.teacherBadge}>
                      <Star size={14} color="#FBBF24" fill="#FBBF24" />
                      <Text style={styles.teacherBadgeText}>{channel.rating} Reyting</Text>
                    </View>
                    <View style={[styles.teacherBadge, { backgroundColor: '#F0FDF4' }]}>
                      <Zap size={14} color="#22C55E" fill="#22C55E" />
                      <Text style={[styles.teacherBadgeText, { color: '#22C55E' }]}>15k+ O'quvchi</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>

            {/* Integrated Action Bar with Reactions */}
            <View style={styles.studioFooter}>
              <View style={styles.reactionPills}>
                <TouchableOpacity onPress={() => addEmoji('❤️')} style={styles.reactionBtn}><Text>❤️</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => addEmoji('🔥')} style={styles.reactionBtn}><Text>🔥</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => addEmoji('⭐️')} style={styles.reactionBtn}><Text>⭐️</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => addEmoji('👏')} style={styles.reactionBtn}><Text>👏</Text></TouchableOpacity>
              </View>
              <TouchableOpacity 
                onPress={() => navigation.navigate('StudentLiveLesson', { channel })}
                style={styles.joinStudioBtn}
              >
                <Text style={styles.joinStudioText}>Darsga Kirish</Text>
                <ChevronRight size={18} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Breaking News Ticker */}
        <View style={styles.ticker}>
          <View style={styles.tickerTag}><Text style={styles.tickerTagText}>YANGILIK</Text></View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Text style={styles.tickerText}>📣 Azizbek K. hozirgina "Oltin Bilimdon" unvonini qo'lga kiritdi! Tabriklaymiz!</Text>
          </ScrollView>
        </View>

        {/* Today's Schedule Section */}
        <View style={styles.sectionHeader}>
           <Text style={[styles.sectionTitle, { color: theme.text }]}>Bugungi Jadval</Text>
           <TouchableOpacity onPress={() => navigation.navigate('StudentSchedule')}>
              <Text style={styles.seeAll}>Hammasi</Text>
           </TouchableOpacity>
        </View>

        <View style={styles.scheduleGrid}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('LiveLessonDetail', { lesson: { title: "Tezkor O'qish", teacher: "Kamola Ustoz", time: "18:00" } })}
            style={styles.scheduleCard}
          >
             <View style={styles.timeLabel}><Text style={styles.timeLabelText}>18:00</Text></View>
             <Text style={styles.schTitle}>Tezkor O'qish</Text>
             <Text style={styles.schSub}>Kamola Ustoz</Text>
             <TouchableOpacity style={styles.schNotify}><Bell size={14} color={COLORS.primary} /></TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => navigation.navigate('LiveLessonDetail', { lesson: { title: "Scratch (IT)", teacher: "Aziz Ustoz", time: "20:00" } })}
            style={styles.scheduleCard}
          >
             <View style={[styles.timeLabel, { backgroundColor: '#F0F9FF' }]}><Text style={[styles.timeLabelText, { color: '#0369A1' }]}>20:00</Text></View>
             <Text style={styles.schTitle}>Scratch (IT)</Text>
             <Text style={styles.schSub}>Aziz Ustoz</Text>
             <TouchableOpacity style={styles.schNotify}><Bell size={14} color={COLORS.primary} /></TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Masonry Archive Sections */}
        <View style={[styles.sectionHeader, { marginTop: 30 }]}>
          <Text style={styles.sectionTitle}>Darslar Arxivi</Text>
        </View>

        <View style={styles.archiveMasonry}>
           <View style={styles.masonryColumn}>
              <TouchableOpacity 
                onPress={() => navigation.navigate('LiveLessonDetail', { lesson: { title: 'Abakus 101' } })}
                style={[styles.masonryCard, { height: 220 }]}
              >
                <Image source={require('../../../assets/abacus_3d.png')} style={styles.masonryImg} />
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.6)']} style={styles.masonryOverlay}>
                  <Text style={styles.masonryTitle}>Abakus 101</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => navigation.navigate('LiveLessonDetail', { lesson: { title: 'Sanoq tizimi' } })}
                style={[styles.masonryCard, { height: 160 }]}
              >
                <Image source={require('../../../assets/avatar_blue.png')} style={styles.masonryImg} />
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.6)']} style={styles.masonryOverlay}>
                  <Text style={styles.masonryTitle}>Sanoq tizimi</Text>
                </LinearGradient>
              </TouchableOpacity>
           </View>
           <View style={styles.masonryColumn}>
              <TouchableOpacity 
                onPress={() => navigation.navigate('LiveLessonDetail', { lesson: { title: 'Mantiq' } })}
                style={[styles.masonryCard, { height: 170 }]}
              >
                <Image source={require('../../../assets/games_promo.png')} style={styles.masonryImg} />
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.6)']} style={styles.masonryOverlay}>
                  <Text style={styles.masonryTitle}>Mantiq</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => navigation.navigate('LiveLessonDetail', { lesson: { title: 'Amaliyot' } })}
                style={[styles.masonryCard, { height: 210 }]}
              >
                <Image source={require('../../../assets/live_promo.png')} style={styles.masonryImg} />
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.6)']} style={styles.masonryOverlay}>
                  <Text style={styles.masonryTitle}>Amaliyot</Text>
                </LinearGradient>
              </TouchableOpacity>
           </View>
        </View>
        
        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
  },
  header: {
    padding: SPACING.xl,
    paddingTop: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0F172A',
  },
  bellBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  storiesScroll: {
    paddingLeft: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  avatarRing: {
    width: 70,
    height: 70,
    borderRadius: 35,
    padding: 3,
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeRing: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  liveIndicator: {
    position: 'absolute',
    bottom: -5,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  liveIndicatorText: {
    color: COLORS.white,
    fontSize: 8,
    fontWeight: '900',
  },
  storyName: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 8,
    color: COLORS.gray[600],
  },
  studioContainer: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  studioCard: {
    backgroundColor: COLORS.white,
    borderRadius: 36,
    overflow: 'hidden',
    ...SHADOWS.medium,
    minHeight: 400,
  },
  studioTabs: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    padding: 4,
    margin: 12,
    borderRadius: 18,
  },
  studioTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
    borderRadius: 14,
  },
  activeStudioTab: {
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  studioTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.gray[400],
  },
  activeStudioTabText: {
    color: COLORS.primary,
  },
  studioContent: {
    flex: 1,
  },
  previewContainer: {
    height: 250,
    marginHorizontal: 15,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  previewOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 15,
    justifyContent: 'space-between',
  },
  viewBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
    gap: 6,
  },
  viewText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
  previewTitleRow: {
    marginBottom: 5,
  },
  previewSubject: {
    color: COLORS.primaryLight,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  previewTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '900',
  },
  emojiRoot: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingEmoji: {
    fontSize: 40,
    position: 'absolute',
    bottom: 0,
  },
  chatContainer: {
    height: 250,
    paddingHorizontal: 20,
  },
  chatScroll: {
    gap: 15,
    paddingBottom: 20,
  },
  chatItem: {
    flexDirection: 'row',
    gap: 10,
  },
  chatUserIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight + '40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatUserInitial: {
    fontWeight: '800',
    color: COLORS.primary,
    fontSize: 12,
  },
  chatBalloon: {
    backgroundColor: '#F1F5F9',
    padding: 10,
    borderRadius: 14,
    flex: 1,
  },
  chatUserName: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.gray[800],
    marginBottom: 2,
  },
  chatBubbleText: {
    fontSize: 13,
    color: COLORS.gray[600],
  },
  liveIndicatorBottom: {
    textAlign: 'center',
    fontSize: 11,
    color: COLORS.gray[400],
    fontStyle: 'italic',
    marginTop: 10,
  },
  infoContainer: {
    padding: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.gray[500],
    lineHeight: 20,
  },
  teacherStats: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
  },
  teacherBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  teacherBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#D97706',
  },
  studioFooter: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reactionPills: {
    flexDirection: 'row',
    gap: 8,
  },
  reactionBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  joinStudioBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    ...SHADOWS.medium,
  },
  joinStudioText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 14,
  },
  ticker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    marginHorizontal: SPACING.xl,
    padding: 10,
    borderRadius: 14,
    marginBottom: SPACING.xl,
  },
  tickerTag: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 12,
  },
  tickerTagText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '900',
  },
  tickerText: {
    fontSize: 12,
    color: COLORS.gray[600],
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  seeAll: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  scheduleGrid: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.xl,
    gap: 12,
  },
  scheduleCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 15,
    ...SHADOWS.light,
  },
  timeLabel: {
    backgroundColor: '#FFF7ED',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  timeLabelText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#C2410C',
  },
  schTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.gray[800],
  },
  schSub: {
    fontSize: 12,
    color: COLORS.gray[400],
    fontWeight: '600',
    marginTop: 2,
    marginBottom: 12,
  },
  schNotify: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  archiveMasonry: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.xl,
    gap: 12,
  },
  masonryColumn: {
    flex: 1,
    gap: 12,
  },
  masonryCard: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#DDD',
  },
  masonryImg: {
    width: '100%',
    height: '100%',
  },
  masonryOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 15,
    justifyContent: 'flex-end',
  },
  masonryTitle: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
  },
});

export default LiveScreen;
