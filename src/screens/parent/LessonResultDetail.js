import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Animated, Alert, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SHADOWS } from '../../constants/theme.js';
import {
  ArrowLeft, Star, TrendingUp, AlertCircle, CheckCircle,
  Clock, Award, BarChart2, BookOpen,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LESSON_DATA = {
  title: "O'nliklar bilan ishlash",
  date: "12 Aprel, 2026",
  teacher: "Sabina Raxmonova",
  subject: "Mental Arifmetika",
  duration: "45 daqiqa",
  score: 95,
  maxScore: 100,
  grade: 'A+',
  rank: 1,
  totalStudents: 18,
  strengths: ["Tezkor hisoblash", "Mantiqiy fikrlash", "Diqqat"],
  improvements: ["Xotira mashqlari"],
  exercises: [
    { name: "Kirish testi", score: 10, max: 10, time: "1:45" },
    { name: "Abakus – 3 xonali", score: 18, max: 20, time: "4:20" },
    { name: "Tezlik musobaqasi", score: 24, max: 25, time: "3:10" },
    { name: "Mantiq vazifasi", score: 28, max: 30, time: "6:50" },
    { name: "Yakuniy nazorat", score: 15, max: 15, time: "2:05" },
  ],
};

const AnimBar = ({ value, max, color, delay = 0 }) => {
  const w = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(w, { toValue: (value / max) * 100, duration: 1200, delay, useNativeDriver: false }).start();
  }, []);
  const width = w.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] });
  return (
    <View style={{ flex: 1, height: 8, backgroundColor: '#F1F5F9', borderRadius: 99, overflow: 'hidden' }}>
      <Animated.View style={{ width, height: '100%', backgroundColor: color, borderRadius: 99 }} />
    </View>
  );
};

const ScoreRing = ({ score, max }) => {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => { Animated.timing(anim, { toValue: 1, duration: 1000, delay: 300, useNativeDriver: true }).start(); }, []);
  const pct = Math.round((score / max) * 100);
  const grade = score >= 95 ? 'A+' : score >= 90 ? 'A' : score >= 80 ? 'B+' : 'B';
  const gradeColor = score >= 90 ? COLORS.primary : COLORS.accent;

  return (
    <Animated.View style={[sr.wrap, { opacity: anim, transform: [{ scale: anim }] }]}>
      <View style={sr.ring}>
        <Text style={[sr.score, { color: gradeColor }]}>{score}</Text>
        <Text style={sr.max}>/ {max}</Text>
      </View>
      <View style={[sr.grade, { backgroundColor: gradeColor + '20', borderColor: gradeColor + '40' }]}>
        <Text style={[sr.gradeText, { color: gradeColor }]}>{grade}</Text>
      </View>
      <Text style={sr.pctText}>{pct}% to'g'ri</Text>
    </Animated.View>
  );
};
const sr = StyleSheet.create({
  wrap: { alignItems: 'center' },
  ring: { width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: 'rgba(255,255,255,0.1)' },
  score: { fontSize: 32, fontWeight: '900', lineHeight: 36 },
  max: { color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: '600' },
  grade: { borderRadius: 10, paddingHorizontal: 12, paddingVertical: 4, marginTop: 8, borderWidth: 1 },
  gradeText: { fontSize: 14, fontWeight: '900' },
  pctText: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '600', marginTop: 6 },
});

const LessonResultDetail = ({ navigation, route }) => {
  const lesson = { ...LESSON_DATA, ...(route.params?.lesson || {}) };
  const scoreColor = lesson.score >= 90 ? COLORS.primary : COLORS.accent;

  return (
    <View style={styles.root}>
      <LinearGradient colors={['#060D1F', '#0D1B3E', '#0F172A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <View style={styles.blob1} />
        <SafeAreaView>
          {/* Nav */}
          <View style={styles.topNav}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <ArrowLeft color="rgba(255,255,255,0.85)" size={22} />
            </TouchableOpacity>
            <View style={{ flex: 1, marginHorizontal: 12 }}>
              <Text style={styles.navTitle} numberOfLines={1}>{lesson.title}</Text>
              <Text style={styles.navSub}>{lesson.date}</Text>
            </View>
            <View style={styles.rankChip}>
              <Award color={COLORS.accent} size={14} />
              <Text style={styles.rankText}>{lesson.rank}-o'rin</Text>
            </View>
          </View>

          {/* Hero Score */}
          <View style={styles.heroBody}>
            <ScoreRing score={lesson.score} max={lesson.maxScore} />
            <View style={styles.heroMeta}>
              <View style={styles.metaItem}>
                <Clock color="rgba(255,255,255,0.45)" size={13} />
                <Text style={styles.metaText}>{lesson.duration}</Text>
              </View>
              <View style={styles.metaItem}>
                <BookOpen color="rgba(255,255,255,0.45)" size={13} />
                <Text style={styles.metaText}>{lesson.subject}</Text>
              </View>
              <View style={styles.metaItem}>
                <TrendingUp color="rgba(255,255,255,0.45)" size={13} />
                <Text style={styles.metaText}>{lesson.rank}/{lesson.totalStudents} reyting</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
        {/* — Mini stat row — */}
        <View style={styles.miniRow}>
          {[
            { label: "Ball", val: `${lesson.score}/${lesson.maxScore}`, color: scoreColor, bg: scoreColor + '12' },
            { label: "Davomiyligi", val: lesson.duration, color: '#0EA5E9', bg: '#F0F9FF' },
            { label: "Reyting", val: `#${lesson.rank}`, color: '#8B5CF6', bg: '#F5F3FF' },
          ].map((s, i) => (
            <View key={i} style={styles.miniTile}>
              <Text style={[styles.miniVal, { color: s.color }]}>{s.val}</Text>
              <Text style={styles.miniLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* — Exercises breakdown — */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <BarChart2 color={COLORS.accent} size={18} strokeWidth={2.5} />
            <Text style={styles.sectionTitle}>Topshiriqlar tahlili</Text>
          </View>
          {lesson.exercises.map((ex, i) => {
            const pct = Math.round((ex.score / ex.max) * 100);
            const color = pct >= 90 ? COLORS.primary : pct >= 70 ? COLORS.accent : '#EF4444';
            return (
              <View key={i} style={styles.exCard}>
                <View style={styles.exTop}>
                  <Text style={styles.exName}>{ex.name}</Text>
                  <View style={styles.exRight}>
                    <View style={styles.exTimePill}>
                      <Clock color={COLORS.gray[400]} size={10} />
                      <Text style={styles.exTimeText}>{ex.time}</Text>
                    </View>
                    <Text style={[styles.exScore, { color }]}>{ex.score}/{ex.max}</Text>
                  </View>
                </View>
                <View style={styles.exBarRow}>
                  <AnimBar value={ex.score} max={ex.max} color={color} delay={i * 100} />
                  <Text style={[styles.exPct, { color }]}>{pct}%</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* — Strengths & improvements — */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Star color={COLORS.primary} size={18} strokeWidth={2.5} />
            <Text style={styles.sectionTitle}>Kuchli tomonlar</Text>
          </View>
          {lesson.strengths.map((s, i) => (
            <View key={i} style={styles.strengthItem}>
              <CheckCircle color={COLORS.primary} size={18} strokeWidth={2.5} />
              <Text style={styles.strengthText}>{s}</Text>
            </View>
          ))}

          <View style={[styles.sectionHead, { marginTop: 20 }]}>
            <AlertCircle color={COLORS.accent} size={18} strokeWidth={2.5} />
            <Text style={styles.sectionTitle}>Rivojlantirish kerak</Text>
          </View>
          {lesson.improvements.map((s, i) => (
            <View key={i} style={[styles.strengthItem, { borderColor: COLORS.accent + '25', backgroundColor: '#FFF7ED' }]}>
              <AlertCircle color={COLORS.accent} size={18} strokeWidth={2.5} />
              <Text style={[styles.strengthText, { color: COLORS.accent }]}>{s}</Text>
            </View>
          ))}
        </View>

        {/* — Teacher commentary — */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <BookOpen color="#6366F1" size={18} strokeWidth={2.5} />
            <Text style={styles.sectionTitle}>Ustoz izohi</Text>
          </View>
          <LinearGradient colors={['#EEF2FF', '#F5F3FF']} style={styles.commentCard}>
            <View style={styles.commentAvatar}>
              <Text style={styles.commentAvatarText}>SR</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.commentName}>{lesson.teacher}</Text>
              <Text style={styles.commentText}>
                "Alisher bu darsda o'nliklar bo'yicha juda yuqori natija ko'rsatdi. Tezligi va aniqligi hammadan ustun. Shu tempni davom ettirsak, keyingi oyda yangi darajaga chiqamiz!"
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Back Button */}
        <TouchableOpacity style={styles.doneBtn} onPress={() => navigation.goBack()}>
          <LinearGradient colors={[COLORS.primary, '#16A34A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.doneBtnGrad}>
            <Text style={styles.doneBtnText}>Ortga qaytish</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F1F5F9' },
  hero: { paddingBottom: 20 },
  blob1: { position: 'absolute', top: -60, right: -40, width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(251,146,60,0.07)' },
  topNav: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingTop: Platform.OS === 'ios' ? 4 : 18, paddingBottom: 16 },
  backBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  navTitle: { color: COLORS.white, fontSize: 16, fontWeight: '900' },
  navSub: { color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: '600', marginTop: 2 },
  rankChip: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: COLORS.accent + '20', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 14 },
  rankText: { color: COLORS.accent, fontSize: 12, fontWeight: '900' },
  heroBody: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, gap: 24, marginTop: 4 },
  heroMeta: { flex: 1, gap: 10 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  metaText: { color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: '600' },

  body: { paddingBottom: 48 },
  miniRow: { flexDirection: 'row', marginHorizontal: 18, marginTop: 20, gap: 10 },
  miniTile: { flex: 1, backgroundColor: COLORS.white, borderRadius: 20, padding: 16, alignItems: 'center', ...SHADOWS.light },
  miniVal: { fontSize: 16, fontWeight: '900' },
  miniLabel: { fontSize: 10, color: COLORS.gray[400], fontWeight: '700', marginTop: 4, textTransform: 'uppercase' },

  section: { marginHorizontal: 18, marginTop: 28 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  sectionTitle: { fontSize: 19, fontWeight: '900', color: '#0F172A' },

  exCard: { backgroundColor: COLORS.white, borderRadius: 20, padding: 16, marginBottom: 10, ...SHADOWS.light },
  exTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  exName: { fontSize: 14, fontWeight: '700', color: '#1E293B', flex: 1 },
  exRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  exTimePill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#F8FAFC', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  exTimeText: { fontSize: 10, color: COLORS.gray[400], fontWeight: '700' },
  exScore: { fontSize: 14, fontWeight: '900', minWidth: 38, textAlign: 'right' },
  exBarRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  exPct: { fontSize: 11, fontWeight: '800', width: 36, textAlign: 'right' },

  strengthItem: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#F0FDF4', borderRadius: 16, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: COLORS.primary + '20' },
  strengthText: { fontSize: 14, fontWeight: '700', color: '#166534', flex: 1 },

  commentCard: { flexDirection: 'row', gap: 14, borderRadius: 22, padding: 18, alignItems: 'flex-start' },
  commentAvatar: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#6366F1', alignItems: 'center', justifyContent: 'center' },
  commentAvatarText: { color: COLORS.white, fontSize: 14, fontWeight: '900' },
  commentName: { fontSize: 13, fontWeight: '800', color: '#4338CA', marginBottom: 6 },
  commentText: { fontSize: 13, color: '#3730A3', lineHeight: 20, fontWeight: '500' },

  doneBtn: { marginHorizontal: 18, marginTop: 30, borderRadius: 22, overflow: 'hidden', ...SHADOWS.medium },
  doneBtnGrad: { alignItems: 'center', paddingVertical: 18 },
  doneBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '900' },
});

export default LessonResultDetail;
