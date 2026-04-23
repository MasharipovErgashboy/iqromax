import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Modal, Animated, Alert, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SHADOWS } from '../../constants/theme.js';
import {
  ArrowLeft, Calendar, ChevronLeft, ChevronRight,
  Plus, Bell, Check, X, Clock, Trash2, BookOpen,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MONTHS_UZ = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];
const DAYS_UZ = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];

const REMINDERS_INIT = [
  { id: 1, title: 'Mental Arifmetika darsi', time: '13:45', date: '12-Aprel', color: COLORS.primary, active: true },
  { id: 2, title: 'Haftalik hisobotni ko\'rish', time: '09:00', date: '13-Aprel', color: '#6366F1', active: true },
  { id: 3, title: 'Mantiqiy mashqlar', time: '16:15', date: '15-Aprel', color: COLORS.accent, active: false },
];

const CalendarScreen = ({ navigation }) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState(today.getDate());
  const [showModal, setShowModal] = useState(false);
  const [reminders, setReminders] = useState(REMINDERS_INIT);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const modalAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  useEffect(() => {
    if (showModal) {
      Animated.spring(modalAnim, { toValue: 1, friction: 8, tension: 50, useNativeDriver: true }).start();
    } else {
      Animated.timing(modalAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start();
    }
  }, [showModal]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // Mon=0

  const prev = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const next = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  // Dots for days with lessons
  const markedDays = { 12: COLORS.primary, 15: COLORS.accent, 18: '#6366F1', 22: COLORS.primary };

  const addReminder = () => {
    if (!newTitle.trim()) return;
    setReminders(prev => [...prev, {
      id: Date.now(), title: newTitle, time: newTime || '09:00',
      date: `${selected}-${MONTHS_UZ[month].slice(0, 3)}`,
      color: [COLORS.primary, COLORS.accent, '#6366F1', '#0EA5E9'][Math.floor(Math.random() * 4)],
      active: true,
    }]);
    setNewTitle(''); setNewTime('');
    setShowModal(false);
  };

  const toggleReminder = (id) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const deleteReminder = (id) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <View style={styles.root}>
      <LinearGradient colors={['#0F172A', '#1E293B']} style={styles.hero}>
        <SafeAreaView>
          <View style={styles.topNav}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <ArrowLeft color="rgba(255,255,255,0.85)" size={22} />
            </TouchableOpacity>
            <Text style={styles.heroTitle}>Kalendar</Text>
            <TouchableOpacity onPress={() => setShowModal(true)} style={styles.addBtn}>
              <Plus color={COLORS.white} size={22} />
            </TouchableOpacity>
          </View>

          {/* Month selector */}
          <View style={styles.monthRow}>
            <TouchableOpacity onPress={prev} style={styles.monthArrow}>
              <ChevronLeft color="rgba(255,255,255,0.7)" size={22} />
            </TouchableOpacity>
            <Text style={styles.monthLabel}>{MONTHS_UZ[month]} {year}</Text>
            <TouchableOpacity onPress={next} style={styles.monthArrow}>
              <ChevronRight color="rgba(255,255,255,0.7)" size={22} />
            </TouchableOpacity>
          </View>

          {/* Day headers */}
          <View style={styles.dayHeaders}>
            {DAYS_UZ.map(d => <Text key={d} style={styles.dayHeader}>{d}</Text>)}
          </View>

          {/* Calendar grid */}
          <Animated.View style={[styles.grid, { opacity: fadeAnim }]}>
            {cells.map((day, i) => {
              if (!day) return <View key={`e${i}`} style={styles.emptyCell} />;
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isSel = day === selected;
              const dot = markedDays[day];
              return (
                <TouchableOpacity
                  key={day}
                  onPress={() => setSelected(day)}
                  style={[styles.dayCell, isSel && styles.dayCellSelected, isToday && !isSel && styles.dayCellToday]}
                >
                  <Text style={[styles.dayNum, isSel && styles.dayNumSelected, isToday && !isSel && styles.dayNumToday]}>
                    {day}
                  </Text>
                  {dot && <View style={[styles.dot, { backgroundColor: isSel ? COLORS.white : dot }]} />}
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>

      {/* Reminders list */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.remTitle}>
          <Bell color={COLORS.accent} size={18} strokeWidth={2.5} />
          <Text style={styles.remTitleText}>Eslatmalar</Text>
          <TouchableOpacity onPress={() => setShowModal(true)} style={styles.addSmallBtn}>
            <Plus color={COLORS.accent} size={16} />
            <Text style={styles.addSmallText}>Qo'shish</Text>
          </TouchableOpacity>
        </View>

        {reminders.map(r => (
          <View key={r.id} style={[styles.remCard, !r.active && styles.remCardInactive]}>
            <View style={[styles.remColorBar, { backgroundColor: r.color }]} />
            <View style={[styles.remIcon, { backgroundColor: r.color + '15' }]}>
              <BookOpen color={r.color} size={18} />
            </View>
            <View style={styles.remBody}>
              <Text style={[styles.remCardTitle, !r.active && styles.remCardTitleOff]}>{r.title}</Text>
              <View style={styles.remMeta}>
                <Clock color={COLORS.gray[400]} size={11} />
                <Text style={styles.remMetaText}>{r.time} • {r.date}</Text>
              </View>
            </View>
            <View style={styles.remActions}>
              <TouchableOpacity onPress={() => toggleReminder(r.id)} style={[styles.remToggle, r.active && styles.remToggleOn]}>
                <Check color={r.active ? COLORS.white : COLORS.gray[300]} size={14} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteReminder(r.id)} style={styles.remDelete}>
                <Trash2 color={COLORS.gray[300]} size={14} />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {reminders.length === 0 && (
          <View style={styles.emptyState}>
            <Bell color={COLORS.gray[300]} size={40} />
            <Text style={styles.emptyStateText}>Hali eslatma yo'q</Text>
            <TouchableOpacity onPress={() => setShowModal(true)} style={styles.emptyStateBtn}>
              <Text style={styles.emptyStateBtnText}>Birinchi eslatmani qo'shing</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Add reminder modal */}
      <Modal transparent visible={showModal} animationType="fade" onRequestClose={() => setShowModal(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowModal(false)} />
        <Animated.View style={[styles.modalSheet, { transform: [{ translateY: modalAnim.interpolate({ inputRange: [0, 1], outputRange: [300, 0] }) }] }]}>
          <View style={styles.modalHandle} />
          <View style={styles.modalHead}>
            <Text style={styles.modalTitle}>Yangi eslatma</Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <X color={COLORS.gray[400]} size={22} />
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>Mavzu</Text>
          <TextInput
            style={styles.input}
            value={newTitle}
            onChangeText={setNewTitle}
            placeholder="Eslatma nomini kiriting..."
            placeholderTextColor={COLORS.gray[400]}
          />

          <Text style={styles.inputLabel}>Vaqt (HH:MM)</Text>
          <TextInput
            style={styles.input}
            value={newTime}
            onChangeText={setNewTime}
            placeholder="14:00"
            placeholderTextColor={COLORS.gray[400]}
            keyboardType="numeric"
          />

          <Text style={styles.inputLabel}>Tanlangan kun: <Text style={{ color: COLORS.accent }}>{selected} {MONTHS_UZ[month]}</Text></Text>

          <TouchableOpacity onPress={addReminder} style={styles.modalSaveBtn}>
            <LinearGradient colors={[COLORS.accent, '#F59E0B']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.modalSaveGrad}>
              <Plus color={COLORS.white} size={20} />
              <Text style={styles.modalSaveText}>Qo'shish</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F1F5F9' },
  hero: { paddingBottom: 16 },
  topNav: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 18, paddingTop: Platform.OS === 'ios' ? 4 : 18, paddingBottom: 14,
  },
  backBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  heroTitle: { color: COLORS.white, fontSize: 20, fontWeight: '900' },
  addBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: COLORS.accent + '30', alignItems: 'center', justifyContent: 'center' },

  monthRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, paddingBottom: 16 },
  monthArrow: { padding: 8 },
  monthLabel: { color: COLORS.white, fontSize: 17, fontWeight: '800', minWidth: 160, textAlign: 'center' },

  dayHeaders: { flexDirection: 'row', paddingHorizontal: 16, paddingBottom: 8 },
  dayHeader: { flex: 1, textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 14, paddingBottom: 8 },
  emptyCell: { width: `${100 / 7}%`, aspectRatio: 1 },
  dayCell: { width: `${100 / 7}%`, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 99 },
  dayCellSelected: { backgroundColor: COLORS.accent },
  dayCellToday: { backgroundColor: 'rgba(255,255,255,0.12)' },
  dayNum: { color: 'rgba(255,255,255,0.65)', fontSize: 14, fontWeight: '700' },
  dayNumSelected: { color: COLORS.white, fontWeight: '900' },
  dayNumToday: { color: COLORS.white, fontWeight: '900' },
  dot: { width: 4, height: 4, borderRadius: 2, marginTop: 2 },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 18, paddingBottom: 48 },

  remTitle: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 24, marginBottom: 14 },
  remTitleText: { fontSize: 18, fontWeight: '900', color: '#0F172A', flex: 1 },
  addSmallBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: COLORS.accent + '15', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 12 },
  addSmallText: { fontSize: 12, fontWeight: '800', color: COLORS.accent },

  remCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white,
    borderRadius: 22, padding: 16, marginBottom: 12, gap: 14, ...SHADOWS.light, overflow: 'hidden',
  },
  remCardInactive: { opacity: 0.5 },
  remColorBar: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4 },
  remIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  remBody: { flex: 1 },
  remCardTitle: { fontSize: 15, fontWeight: '800', color: '#1E293B' },
  remCardTitleOff: { color: COLORS.gray[400], textDecorationLine: 'line-through' },
  remMeta: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  remMetaText: { fontSize: 11, color: COLORS.gray[400], fontWeight: '600' },
  remActions: { flexDirection: 'row', gap: 8 },
  remToggle: { width: 30, height: 30, borderRadius: 9, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  remToggleOn: { backgroundColor: COLORS.primary },
  remDelete: { width: 30, height: 30, borderRadius: 9, backgroundColor: '#FEF2F2', alignItems: 'center', justifyContent: 'center' },

  emptyState: { alignItems: 'center', paddingVertical: 50, gap: 14 },
  emptyStateText: { fontSize: 15, color: COLORS.gray[400], fontWeight: '600' },
  emptyStateBtn: { backgroundColor: COLORS.accent + '15', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 14 },
  emptyStateBtnText: { color: COLORS.accent, fontWeight: '800', fontSize: 14 },

  // Modal
  modalOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  modalSheet: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: COLORS.white, borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, paddingBottom: 40 },
  modalHandle: { width: 40, height: 4, backgroundColor: '#E2E8F0', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  modalHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: '900', color: '#0F172A' },
  inputLabel: { fontSize: 13, fontWeight: '700', color: COLORS.gray[600], marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: '#F8FAFC', borderRadius: 16, padding: 16, fontSize: 15, fontWeight: '600', color: '#1E293B', borderWidth: 1.5, borderColor: '#E2E8F0' },
  modalSaveBtn: { marginTop: 24, borderRadius: 18, overflow: 'hidden', ...SHADOWS.medium },
  modalSaveGrad: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 17 },
  modalSaveText: { color: COLORS.white, fontSize: 16, fontWeight: '900' },
});

export default CalendarScreen;
