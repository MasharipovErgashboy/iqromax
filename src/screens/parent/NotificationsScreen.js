import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Animated, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SHADOWS } from '../../constants/theme.js';
import {
  ArrowLeft, Bell, CheckCheck, Trash2, MessageSquare,
  Award, Zap, BookOpen, AlertCircle, TrendingUp, Star,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const NOTIFS = [
  {
    id: 1, unread: true, type: 'score',
    icon: Zap, iconColor: COLORS.accent, iconBg: '#FFF7ED',
    title: "Yangi ball qo'shildi!",
    body: "Alisher bugun Mental Arifmetikadan 95/100 ball oldi.",
    time: '5 daqiqa oldin', group: 'Bugun',
  },
  {
    id: 2, unread: true, type: 'live',
    icon: Bell, iconColor: '#EF4444', iconBg: '#FEF2F2',
    title: "Jonli dars boshlanmoqda",
    body: "Mental Arifmetika darsi 15 daqiqadan keyin boshlanadi.",
    time: '12 daqiqa oldin', group: 'Bugun',
  },
  {
    id: 3, unread: true, type: 'achievement',
    icon: Award, iconColor: '#F59E0B', iconBg: '#FFFBEB',
    title: "Yangi ko'rsatma olindi! 🏆",
    body: "Alisher 'Abakus Ustasi' unvonini qo'lga kiritdi.",
    time: '2 soat oldin', group: 'Bugun',
  },
  {
    id: 4, unread: false, type: 'message',
    icon: MessageSquare, iconColor: COLORS.primary, iconBg: '#F0FDF4',
    title: "Ustoz Sabina xabar yubordi",
    body: "Adisherning bugungi samaradorligi juda yaxshi bo'ldi.",
    time: 'Kecha 18:40', group: 'Kecha',
  },
  {
    id: 5, unread: false, type: 'report',
    icon: TrendingUp, iconColor: '#6366F1', iconBg: '#EEF2FF',
    title: "Haftalik hisobot tayyor",
    body: "Alisher bu hafta 94% ko'rsatkich bilan birinchi o'rinda.",
    time: 'Kecha 09:00', group: 'Kecha',
  },
  {
    id: 6, unread: false, type: 'lesson',
    icon: BookOpen, iconColor: '#0EA5E9', iconBg: '#F0F9FF',
    title: "Yangi dars materiallari",
    body: "Mantiqiy Mashqlar fani uchun yangi PDF yuklab olindi.",
    time: '2 kun oldin', group: "2 kun oldin",
  },
  {
    id: 7, unread: false, type: 'system',
    icon: AlertCircle, iconColor: COLORS.gray[400], iconBg: '#F8FAFC',
    title: "Tizim yangilandi",
    body: "IQROMAX v1.3.0 — yangi funksiyalar va tezlashtirishlar.",
    time: '3 kun oldin', group: "3 kun oldin",
  },
  {
    id: 8, unread: false, type: 'achievement',
    icon: Star, iconColor: '#8B5CF6', iconBg: '#F5F3FF',
    title: "Ko'p dars o'qildi! ⭐",
    body: "Alisher bu hafta 8 ta darsni muvaffaqiyatli yakunladi.",
    time: '5 kun oldin', group: "5 kun oldin",
  },
];

const NotifCard = ({ item, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, delay: index * 60, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, delay: index * 60, useNativeDriver: true }),
    ]).start();
  }, []);

  const Icon = item.icon;

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.notifCard, item.unread && styles.notifCardUnread]}
      >
        {item.unread && <View style={styles.unreadBar} />}

        <View style={[styles.notifIconBox, { backgroundColor: item.iconBg }]}>
          <Icon color={item.iconColor} size={20} strokeWidth={2.5} />
        </View>

        <View style={styles.notifBody}>
          <View style={styles.notifTopRow}>
            <Text style={[styles.notifTitle, item.unread && styles.notifTitleUnread]} numberOfLines={1}>
              {item.title}
            </Text>
            {item.unread && <View style={styles.unreadDot} />}
          </View>
          <Text style={styles.notifText} numberOfLines={2}>{item.body}</Text>
          <Text style={styles.notifTime}>{item.time}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const NotificationsScreen = ({ navigation }) => {
  const [filter, setFilter] = useState('all');
  const headerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  const groups = [...new Set(NOTIFS.map(n => n.group))];
  const filtered = filter === 'unread' ? NOTIFS.filter(n => n.unread) : NOTIFS;
  const unreadCount = NOTIFS.filter(n => n.unread).length;

  return (
    <View style={styles.root}>
      {/* Header */}
      <LinearGradient colors={['#0F172A', '#1E293B']} style={styles.hero}>
        <SafeAreaView>
          <Animated.View style={[styles.topRow, { opacity: headerAnim }]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <ArrowLeft color="rgba(255,255,255,0.85)" size={22} />
            </TouchableOpacity>
            <View>
              <Text style={styles.heroTitle}>Bildirishnomalar</Text>
              <Text style={styles.heroSub}>{unreadCount} ta o'qilmagan</Text>
            </View>
            <TouchableOpacity style={styles.markAllBtn}>
              <CheckCheck color={COLORS.accent} size={20} />
            </TouchableOpacity>
          </Animated.View>

          {/* Filter chips */}
          <View style={styles.filterRow}>
            {[
              { key: 'all', label: 'Barchasi' },
              { key: 'unread', label: `O'qilmagan (${unreadCount})` },
            ].map(f => (
              <TouchableOpacity
                key={f.key}
                onPress={() => setFilter(f.key)}
                style={[styles.filterChip, filter === f.key && styles.filterChipActive]}
              >
                <Text style={[styles.filterChipText, filter === f.key && styles.filterChipTextActive]}>
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {groups.map(group => {
          const items = filtered.filter(n => n.group === group);
          if (!items.length) return null;
          return (
            <View key={group}>
              <Text style={styles.groupLabel}>{group}</Text>
              {items.map((item, i) => (
                <NotifCard key={item.id} item={item} index={i} />
              ))}
            </View>
          );
        })}

        <TouchableOpacity style={styles.clearAllBtn}>
          <Trash2 color={COLORS.gray[400]} size={16} />
          <Text style={styles.clearAllText}>Barchasini o'chirish</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F1F5F9' },
  hero: { paddingBottom: 16 },
  topRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'ios' ? 6 : 20,
    paddingBottom: 14,
  },
  backBtn: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.09)',
    alignItems: 'center', justifyContent: 'center',
  },
  heroTitle: { color: COLORS.white, fontSize: 20, fontWeight: '900', textAlign: 'center' },
  heroSub: { color: 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: '600', textAlign: 'center', marginTop: 2 },
  markAllBtn: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: COLORS.accent + '20',
    alignItems: 'center', justifyContent: 'center',
  },
  filterRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 18, paddingBottom: 4 },
  filterChip: {
    paddingHorizontal: 16, paddingVertical: 9, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.09)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  filterChipActive: {
    backgroundColor: COLORS.accent, borderColor: COLORS.accent,
  },
  filterChipText: { color: 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: '700' },
  filterChipTextActive: { color: COLORS.white },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 18, paddingBottom: 40 },

  groupLabel: {
    fontSize: 11, fontWeight: '800', color: COLORS.gray[400],
    textTransform: 'uppercase', letterSpacing: 1,
    marginTop: 20, marginBottom: 10, paddingLeft: 4,
  },
  notifCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 14,
    backgroundColor: COLORS.white,
    borderRadius: 22, padding: 16, marginBottom: 10,
    ...SHADOWS.light, overflow: 'hidden',
  },
  notifCardUnread: {
    backgroundColor: '#FFFBF7',
    borderWidth: 1, borderColor: COLORS.accent + '25',
  },
  unreadBar: {
    position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
    backgroundColor: COLORS.accent, borderRadius: 99,
  },
  notifIconBox: {
    width: 46, height: 46, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  notifBody: { flex: 1 },
  notifTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  notifTitle: { fontSize: 14, fontWeight: '700', color: '#334155', flex: 1, marginRight: 8 },
  notifTitleUnread: { color: '#0F172A', fontWeight: '900' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.accent, flexShrink: 0 },
  notifText: { fontSize: 13, color: COLORS.gray[500], lineHeight: 18, fontWeight: '500' },
  notifTime: { fontSize: 11, color: COLORS.gray[300], fontWeight: '600', marginTop: 6 },

  clearAllBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    marginTop: 20, paddingVertical: 14, borderRadius: 16,
    borderWidth: 1.5, borderStyle: 'dashed', borderColor: COLORS.gray[200],
  },
  clearAllText: { fontSize: 14, fontWeight: '700', color: COLORS.gray[400] },
});

export default NotificationsScreen;
