import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, 
  Bell, 
  BellOff, 
  Tv, 
  BookOpen, 
  CreditCard, 
  Trash2,
  ChevronRight,
  Zap,
  Gift
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const NOTIFICATIONS = [
  {
    id: '1',
    type: 'live',
    title: 'Jonli dars boshlandi!',
    message: 'Shoxruh Ustoz bilan "Abakus sirlari" darsi boshlandi. Hozirda 200+ o\'quvchi ishtirok etmoqda.',
    time: '2 daqiqa oldin',
    isRead: false,
    icon: Tv,
    iconColor: '#22C55E',
  },
  {
    id: '2',
    type: 'homework',
    title: 'Yangi vazifa',
    message: 'Mental Arifmetika bo\'limidan yangi uy vazifasi qo\'shildi. Uni bugun bajarishingiz kerak.',
    time: '1 soat oldin',
    isRead: false,
    icon: BookOpen,
    iconColor: '#3B82F6',
  },
  {
    id: '3',
    type: 'system',
    title: 'Oltin Bilimdon unvoni',
    message: 'Tabriklaymiz! Siz "Oltin Bilimdon" unvonini qo\'lga kiritdingiz.',
    time: '3 soat oldin',
    isRead: true,
    icon: Zap,
    iconColor: '#F59E0B',
  },
  {
    id: '4',
    type: 'gift',
    title: 'Yangi mukofot',
    message: 'Sizga 500 XP mukofot taqdim etildi. Uni profil sahifangizda ko\'rishingiz mumkin.',
    time: 'Kecha',
    isRead: true,
    icon: Gift,
    iconColor: '#EC4899',
  },
];

const NotificationScreen = ({ navigation }) => {
  const { isDark, theme } = useTheme();
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const clearAll = () => {
    setNotifications([]);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

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
              <Text style={[styles.headerTitle, { color: theme.text }]}>Bildirishnomalar</Text>
              <TouchableOpacity onPress={clearAll}>
                 <Trash2 color={COLORS.gray[400]} size={20} />
              </TouchableOpacity>
           </View>
        </SafeAreaView>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
             <View style={styles.emptyIconWrap}>
                <BellOff color={COLORS.gray[300]} size={64} />
             </View>
             <Text style={[styles.emptyTitle, { color: theme.text }]}>Bildirishnomalar yo'q</Text>
             <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
               Sizda hozircha bildirishnomalar mavjud emas. Yangi xabarlar kelganda buni sizga ma'lum qilamiz.
             </Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            {notifications.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.notifCard}
                onPress={() => markAsRead(item.id)}
                activeOpacity={0.7}
              >
                <BlurView intensity={isDark ? 20 : 60} tint={isDark ? "dark" : "light"} style={styles.cardBlur}>
                   <View style={[styles.cardInner, !item.isRead && styles.unreadCard]}>
                      <View style={[styles.iconBox, { backgroundColor: item.iconColor + '20' }]}>
                         <item.icon color={item.iconColor} size={24} />
                      </View>
                      
                      <View style={styles.contentBox}>
                         <View style={styles.titleRow}>
                            <Text style={[styles.notifTitle, { color: theme.text }, !item.isRead && { fontWeight: '800' }]}>
                              {item.title}
                            </Text>
                            {!item.isRead && <View style={styles.unreadDot} />}
                         </View>
                         <Text style={[styles.notifMessage, { color: theme.textSecondary }]} numberOfLines={2}>
                           {item.message}
                         </Text>
                         <Text style={[styles.notifTime, { color: COLORS.gray[400] }]}>
                           {item.time}
                         </Text>
                      </View>
                      
                      <ChevronRight color={COLORS.gray[300]} size={16} />
                   </View>
                </BlurView>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Background Gradients for Depth */}
      <View style={styles.bgGlowTop} />
      <View style={styles.bgGlowBottom} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 15, ...SHADOWS.light, zIndex: 10 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 60 },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '900' },
  
  scrollContent: { padding: 20, flexGrow: 1 },
  listContainer: { gap: 12 },
  notifCard: { borderRadius: 24, overflow: 'hidden', ...SHADOWS.light },
  cardBlur: { borderRadius: 24 },
  cardInner: { flexDirection: 'row', alignItems: 'center', padding: 18, gap: 15 },
  unreadCard: { backgroundColor: 'rgba(59, 130, 246, 0.05)' },
  
  iconBox: { width: 54, height: 54, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  contentBox: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  notifTitle: { fontSize: 15, fontWeight: '700' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary },
  notifMessage: { fontSize: 13, lineHeight: 18, marginBottom: 6 },
  notifTime: { fontSize: 11, fontWeight: '600' },

  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  emptyIconWrap: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center', marginBottom: 25 },
  emptyTitle: { fontSize: 22, fontWeight: '900', marginBottom: 12 },
  emptySubtitle: { fontSize: 14, textAlign: 'center', lineHeight: 22 },

  bgGlowTop: { position: 'absolute', top: -100, left: -50, width: 300, height: 300, backgroundColor: COLORS.primaryLight, opacity: 0.1, borderRadius: 150, zIndex: -1 },
  bgGlowBottom: { position: 'absolute', bottom: -100, right: -50, width: 300, height: 300, backgroundColor: COLORS.primary, opacity: 0.1, borderRadius: 150, zIndex: -1 },
});

export default NotificationScreen;
