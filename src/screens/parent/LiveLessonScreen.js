import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SHADOWS } from '../../constants/theme.js';
import {
  ArrowLeft,
  Users,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  MessageSquare,
  Award,
  Zap,
  CheckCircle,
  Clock,
  TrendingUp,
  Brain,
  Target,
  Flame,
  Shield,
  Star,
  BookOpen,
  Activity,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// ─────────────────────────────────────────────
// CONSTANTS & MOCK DATA
// ─────────────────────────────────────────────

const LIVE_EVENTS = [
  { id: 1, emoji: '🏆', text: "10/10 ball — mukammal natija!", time: '14:02', type: 'gold' },
  { id: 2, emoji: '⚡', text: "Tezlik rekordi: 3.2 soniyada javob", time: '14:05', type: 'orange' },
  { id: 3, emoji: '🎯', text: "5ta misoldan 5tasi to'g'ri", time: '14:08', type: 'green' },
  { id: 4, emoji: '🧠', text: "Yangi mavzu: O'nlik kasrlar", time: '14:11', type: 'blue' },
  { id: 5, emoji: '🚀', text: "Birinchi bo'lib javob berdi!", time: '14:14', type: 'orange' },
  { id: 6, emoji: '🛡️', text: "Ustoz: 'Juda zo'r!'", time: '14:17', type: 'green' },
];

const CLASSMATES = [
  { id: 1, name: 'Alisher K.', score: 48, max: 50, avatar: require('../../../assets/avatar_blue.png'), isChild: true, medal: '🥇' },
  { id: 2, name: 'Zulfiya M.', score: 45, max: 50, avatar: require('../../../assets/avatar_red.png'), medal: '🥈' },
  { id: 3, name: 'Jasur T.', score: 43, max: 50, avatar: require('../../../assets/avatar_yellow.png'), medal: '🥉' },
  { id: 4, name: 'Nodira A.', score: 38, max: 50, avatar: require('../../../assets/avatar_blue.png'), medal: null },
  { id: 5, name: 'Sardor B.', score: 35, max: 50, avatar: require('../../../assets/avatar_red.png'), medal: null },
];

const STATS = [
  { icon: Flame, label: "Faollik", value: "97%", color: '#EF4444', bg: '#FEF2F2' },
  { icon: Target, label: "Aniqlik", value: "94%", color: '#8B5CF6', bg: '#F5F3FF' },
  { icon: Brain, label: "Diqqat", value: "89%", color: '#0EA5E9', bg: '#F0F9FF' },
  { icon: Zap, label: "Tezlik", value: "1-o'rin", color: COLORS.accent, bg: '#FFF7ED' },
];

const EVENT_THEMES = {
  gold: { bg: '#FFFBEB', border: '#FDE68A', text: '#92400E', dot: '#F59E0B' },
  orange: { bg: '#FFF7ED', border: '#FED7AA', text: '#9A3412', dot: COLORS.accent },
  green: { bg: '#F0FDF4', border: '#BBF7D0', text: '#166534', dot: '#22C55E' },
  blue: { bg: '#F0F9FF', border: '#BAE6FD', text: '#075985', dot: '#0EA5E9' },
};

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

/** Pulsing red live dot */
const LiveDot = () => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, { toValue: 2, duration: 800, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: 800, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(scale, { toValue: 1, duration: 0, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.8, duration: 0, useNativeDriver: true }),
        ]),
      ])
    ).start();
  }, []);

  return (
    <View style={lsd.wrap}>
      <Animated.View style={[lsd.ring, { transform: [{ scale }], opacity }]} />
      <View style={lsd.core} />
    </View>
  );
};
const lsd = StyleSheet.create({
  wrap: { width: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  ring: { position: 'absolute', width: 14, height: 14, borderRadius: 7, backgroundColor: '#EF4444' },
  core: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444' },
});

/** Animated progress bar */
const AnimatedBar = ({ value, max, color, height: h = 6 }) => {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, {
      toValue: (value / max) * 100,
      duration: 1400,
      delay: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={[barS.track, { height: h }]}>
      <Animated.View
        style={[
          barS.fill,
          {
            width: anim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }),
            backgroundColor: color,
            height: h,
          },
        ]}
      />
    </View>
  );
};
const barS = StyleSheet.create({
  track: { backgroundColor: '#F1F5F9', borderRadius: 99, overflow: 'hidden', flex: 1 },
  fill: { borderRadius: 99 },
});

/** Single stat tile */
const StatTile = ({ icon: Icon, label, value, color, bg, delay }) => {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, { toValue: 1, duration: 500, delay, useNativeDriver: true }).start();
  }, []);

  return (
    <Animated.View style={[st.tile, { opacity: anim, transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }]}>
      <View style={[st.iconBox, { backgroundColor: bg }]}>
        <Icon color={color} size={18} strokeWidth={2.5} />
      </View>
      <Text style={[st.value, { color }]}>{value}</Text>
      <Text style={st.label}>{label}</Text>
    </Animated.View>
  );
};
const st = StyleSheet.create({
  tile: { flex: 1, alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 20, padding: 14, ...SHADOWS.light },
  iconBox: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  value: { fontSize: 15, fontWeight: '900', marginBottom: 2 },
  label: { fontSize: 10, color: COLORS.gray[400], fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
});

// ─────────────────────────────────────────────
// MAIN SCREEN
// ─────────────────────────────────────────────

const LiveLessonScreen = ({ navigation, route }) => {
  const { lessonTitle = "O'nliklar bilan ishlash" } = route.params || {};
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [elapsed, setElapsed] = useState(14 * 60 + 22);
  const [score, setScore] = useState(48);
  const [viewerDelta, setViewerDelta] = useState(0);

  // Animation refs
  const heroFade = useRef(new Animated.Value(0)).current;
  const heroSlide = useRef(new Animated.Value(-20)).current;
  const cardScale = useRef(new Animated.Value(0.94)).current;
  const scoreAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heroFade, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(heroSlide, { toValue: 0, duration: 700, useNativeDriver: true }),
      Animated.spring(cardScale, { toValue: 1, friction: 8, tension: 50, useNativeDriver: true }),
      Animated.timing(scoreAnim, { toValue: score, duration: 1500, useNativeDriver: false }),
    ]).start();

    const timer = setInterval(() => setElapsed(p => p + 1), 1000);
    // Simulate occasional score bump
    const scoreTimer = setInterval(() => {
      setScore(p => Math.min(p + 1, 50));
    }, 15000);

    return () => { clearInterval(timer); clearInterval(scoreTimer); };
  }, []);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const pct = Math.round((elapsed - 14 * 60) / (45 * 60) * 100 + 32);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* ══════════════════════════════════════
          DARK HERO  
      ══════════════════════════════════════ */}
      <LinearGradient
        colors={['#060D1F', '#0D1B3E', '#0F172A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        {/* Decorative blobs */}
        <View style={styles.blob1} />
        <View style={styles.blob2} />

        <SafeAreaView style={styles.heroSafe}>
          {/* ── TOP NAV ── */}
          <Animated.View style={[styles.topNav, { opacity: heroFade, transform: [{ translateY: heroSlide }] }]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navBtn}>
              <ArrowLeft color="rgba(255,255,255,0.9)" size={22} />
            </TouchableOpacity>

            <View style={styles.liveTag}>
              <LiveDot />
              <Text style={styles.liveLabel}>JONLI</Text>
              <View style={styles.liveDivider} />
              <Text style={styles.liveTimer}>{fmt(elapsed)}</Text>
            </View>

            <TouchableOpacity
              style={[styles.navBtn, styles.navBtnAccent]}
              onPress={() => navigation.navigate('ChatScreen', { teacherName: 'Sabina Raxmonova' })}
            >
              <MessageSquare color={COLORS.white} size={20} />
            </TouchableOpacity>
          </Animated.View>

          {/* ── VIDEO AREA ── */}
          <Animated.View style={[styles.videoWrap, { opacity: heroFade, transform: [{ translateY: heroSlide }] }]}>
            <LinearGradient colors={['#0E2240', '#061227']} style={styles.videoInner}>
              {/* Radial glow behind teacher */}
              <View style={styles.videoGlow} />

              {/* Teacher */}
              <Image source={require('../../../assets/avatar_blue.png')} style={styles.teacherAvatar} />

              <View style={styles.teacherRow}>
                <View style={styles.onlineDot} />
                <Text style={styles.teacherName}>Sabina Raxmonova</Text>
                <View style={styles.teacherBadge}>
                  <Text style={styles.teacherBadgeText}>USTOZ</Text>
                </View>
              </View>

              {/* IQROMAX brand mark */}
              <View style={styles.brandMark}>
                <Text style={styles.brandText}>IQROMAX LIVE</Text>
              </View>

              {/* Viewers */}
              <View style={styles.viewersChip}>
                <View style={styles.viewersDot} />
                <Users color="rgba(255,255,255,0.8)" size={11} />
                <Text style={styles.viewersText}>12 kuzatmoqda</Text>
              </View>

              {/* Duration top-right */}
              <View style={styles.durationChip}>
                <Clock color="rgba(255,255,255,0.7)" size={11} />
                <Text style={styles.durationText}>45 daqiqa</Text>
              </View>
            </LinearGradient>

            {/* ── CONTROL BAR ── */}
            <View style={styles.controlBar}>
              <TouchableOpacity
                style={[styles.ctrlBtn, isMuted && styles.ctrlBtnRed]}
                onPress={() => setIsMuted(!isMuted)}
              >
                {isMuted
                  ? <MicOff color={COLORS.white} size={17} />
                  : <Mic color="rgba(255,255,255,0.6)" size={17} />
                }
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.ctrlBtn, !isSpeaker && styles.ctrlBtnRed]}
                onPress={() => setIsSpeaker(!isSpeaker)}
              >
                {isSpeaker
                  ? <Volume2 color="rgba(255,255,255,0.6)" size={17} />
                  : <VolumeX color={COLORS.white} size={17} />
                }
              </TouchableOpacity>

              <View style={styles.ctrlSpacer} />

              <TouchableOpacity
                style={styles.ctrlBtnPrimary}
                onPress={() => navigation.navigate('ChatScreen', { teacherName: 'Sabina Raxmonova' })}
              >
                <MessageSquare color={COLORS.white} size={16} />
                <Text style={styles.ctrlPrimaryText}>Savol</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* ── PROGRESS ── */}
          <Animated.View style={[styles.progressWrap, { opacity: heroFade }]}>
            <View style={styles.progressHeader}>
              <View style={styles.lessonTitleRow}>
                <BookOpen color="rgba(255,255,255,0.5)" size={14} />
                <Text style={styles.lessonTitleText} numberOfLines={1}>{lessonTitle}</Text>
              </View>
              <Text style={styles.progressPct}>{Math.min(pct, 99)}%</Text>
            </View>
            <View style={styles.progressBg}>
              <LinearGradient
                colors={[COLORS.accent, '#FBBF24']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressFill, { width: `${Math.min(pct, 99)}%` }]}
              />
            </View>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>

      {/* ══════════════════════════════════════
          SCROLLABLE BODY
      ══════════════════════════════════════ */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.body}
        bounces
      >
        {/* ── CHILD HERO CARD ── */}
        <Animated.View style={[styles.heroCard, { transform: [{ scale: cardScale }] }]}>
          <LinearGradient
            colors={['#1E293B', '#0F172A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCardInner}
          >
            {/* Glow accent */}
            <View style={styles.heroCardGlow} />

            <View style={styles.heroCardLeft}>
              <View style={styles.heroAvatarWrap}>
                <Image source={require('../../../assets/avatar_blue.png')} style={styles.heroAvatar} />
                <View style={styles.heroAvatarBadge}>
                  <Text style={styles.heroAvatarBadgeText}>🥇</Text>
                </View>
              </View>
              <View>
                <Text style={styles.heroName}>Alisher K.</Text>
                <Text style={styles.heroSub}>Farzandingiz • Faol</Text>
              </View>
            </View>

            <View style={styles.heroCardRight}>
              <Text style={styles.heroScore}>{score}</Text>
              <Text style={styles.heroScoreMax}>/ 50 ball</Text>
              <View style={styles.heroRankChip}>
                <Award color={COLORS.accent} size={13} />
                <Text style={styles.heroRankText}>1-o'rin</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* ── 4 STAT TILES ── */}
        <View style={styles.statsRow}>
          {STATS.map((s, i) => (
            <StatTile key={i} {...s} delay={i * 80} />
          ))}
        </View>

        {/* ── LIVE ACTIVITY FEED ── */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <View style={styles.sectionHeadLeft}>
              <Activity color={COLORS.accent} size={18} strokeWidth={2.5} />
              <Text style={styles.sectionTitle}>Jonli faoliyat</Text>
            </View>
            <View style={styles.livePill}>
              <LiveDot />
              <Text style={styles.livePillText}>LIVE</Text>
            </View>
          </View>

          {LIVE_EVENTS.map((ev, i) => {
            const theme = EVENT_THEMES[ev.type];
            const slideIn = useRef(new Animated.Value(30)).current;
            const fIn = useRef(new Animated.Value(0)).current;
            useEffect(() => {
              Animated.parallel([
                Animated.timing(slideIn, { toValue: 0, duration: 400, delay: i * 100, useNativeDriver: true }),
                Animated.timing(fIn, { toValue: 1, duration: 400, delay: i * 100, useNativeDriver: true }),
              ]).start();
            }, []);

            return (
              <Animated.View
                key={ev.id}
                style={[styles.evCard, { backgroundColor: theme.bg, borderColor: theme.border, opacity: fIn, transform: [{ translateX: slideIn }] }]}
              >
                <View style={[styles.evDotBar, { backgroundColor: theme.dot }]} />
                <Text style={styles.evEmoji}>{ev.emoji}</Text>
                <View style={styles.evBody}>
                  <Text style={[styles.evText, { color: theme.text }]}>{ev.text}</Text>
                  <View style={styles.evMeta}>
                    <Clock color={theme.dot} size={10} />
                    <Text style={[styles.evTime, { color: theme.dot }]}>{ev.time}</Text>
                  </View>
                </View>
                <CheckCircle color={theme.dot} size={18} strokeWidth={2.5} />
              </Animated.View>
            );
          })}
        </View>

        {/* ── LEADERBOARD ── */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <View style={styles.sectionHeadLeft}>
              <TrendingUp color={COLORS.primary} size={18} strokeWidth={2.5} />
              <Text style={styles.sectionTitle}>Reyting jadvali</Text>
            </View>
            <Text style={styles.sectionSub}>{CLASSMATES.length} o'quvchi</Text>
          </View>

          {/* Header row */}
          <View style={styles.lbHeader}>
            <Text style={styles.lbHeaderText}>#</Text>
            <Text style={[styles.lbHeaderText, { flex: 1, marginLeft: 52 }]}>O'quvchi</Text>
            <Text style={styles.lbHeaderText}>Ball</Text>
          </View>

          {CLASSMATES.map((s, i) => {
            const isTop3 = i < 3;
            const highlight = s.isChild;
            const barColor = s.isChild ? COLORS.accent : isTop3 ? COLORS.primary : COLORS.gray[300];

            return (
              <View
                key={s.id}
                style={[
                  styles.lbRow,
                  highlight && styles.lbRowHighlight,
                  i === 0 && styles.lbRowFirst,
                ]}
              >
                {/* Rank */}
                <View style={styles.lbRankBox}>
                  {s.medal
                    ? <Text style={styles.lbMedal}>{s.medal}</Text>
                    : <Text style={styles.lbRankNum}>{i + 1}</Text>
                  }
                </View>

                {/* Avatar */}
                <View style={styles.lbAvatarWrap}>
                  <Image source={s.avatar} style={styles.lbAvatar} />
                  {s.isChild && <View style={styles.lbChildBadge} />}
                </View>

                {/* Info */}
                <View style={styles.lbInfo}>
                  <Text style={[styles.lbName, highlight && styles.lbNameHL]}>{s.name}</Text>
                  <View style={styles.lbBarRow}>
                    <AnimatedBar value={s.score} max={s.max} color={barColor} />
                    <Text style={[styles.lbPct, { color: barColor }]}>{Math.round(s.score / s.max * 100)}%</Text>
                  </View>
                </View>

                {/* Score */}
                <Text style={[styles.lbScore, highlight && styles.lbScoreHL]}>{s.score}</Text>
              </View>
            );
          })}
        </View>

        {/* ── BOTTOM ACTIONS ── */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actSecondary}
            onPress={() => navigation.navigate('ChatScreen', { teacherName: 'Sabina Raxmonova' })}
            activeOpacity={0.8}
          >
            <MessageSquare color={COLORS.accent} size={20} strokeWidth={2.5} />
            <Text style={styles.actSecondaryText}>Ustoz bilan suhbat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actPrimary}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[COLORS.primary, '#16A34A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.actPrimaryGrad}
            >
              <Shield color={COLORS.white} size={20} strokeWidth={2.5} />
              <Text style={styles.actPrimaryText}>Dars tugadi</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* ── FOOTER NOTE ── */}
        <Text style={styles.footerNote}>
          🔒 Ushbu kuzatuv faqat ota-onalar uchun. Barcha ma'lumotlar shifrlangan.
        </Text>
      </ScrollView>
    </View>
  );
};

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F1F5F9' },

  // ── HERO ──
  hero: { paddingBottom: 22 },
  heroSafe: {},
  blob1: {
    position: 'absolute', top: -80, right: -60,
    width: 220, height: 220, borderRadius: 110,
    backgroundColor: 'rgba(251,146,60,0.08)',
  },
  blob2: {
    position: 'absolute', bottom: 0, left: -40,
    width: 180, height: 180, borderRadius: 90,
    backgroundColor: 'rgba(59,130,246,0.06)',
  },

  // ── TOP NAV ──
  topNav: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'ios' ? 4 : 20,
    paddingBottom: 14,
  },
  navBtn: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  navBtnAccent: { backgroundColor: COLORS.accent + '25', borderColor: COLORS.accent + '40' },
  liveTag: {
    flexDirection: 'row', alignItems: 'center', gap: 7,
    backgroundColor: 'rgba(239,68,68,0.18)',
    paddingHorizontal: 14, paddingVertical: 9,
    borderRadius: 22,
    borderWidth: 1, borderColor: 'rgba(239,68,68,0.35)',
  },
  liveLabel: { color: '#FCA5A5', fontSize: 11, fontWeight: '900', letterSpacing: 1.5 },
  liveDivider: { width: 1, height: 12, backgroundColor: 'rgba(252,165,165,0.35)' },
  liveTimer: { color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: '800', fontVariant: ['tabular-nums'] },

  // ── VIDEO ──
  videoWrap: { marginHorizontal: 18, borderRadius: 26, overflow: 'hidden', ...SHADOWS.medium },
  videoInner: { height: 210, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  videoGlow: {
    position: 'absolute', width: 180, height: 180, borderRadius: 90,
    backgroundColor: 'rgba(59,130,246,0.12)',
    top: '50%', left: '50%',
    marginTop: -90, marginLeft: -90,
  },
  teacherAvatar: { width: 88, height: 88, borderRadius: 28, borderWidth: 3, borderColor: 'rgba(255,255,255,0.18)' },
  teacherRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 12, backgroundColor: 'rgba(255,255,255,0.09)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 22 },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E' },
  teacherName: { color: 'rgba(255,255,255,0.92)', fontSize: 13, fontWeight: '700' },
  teacherBadge: { backgroundColor: 'rgba(255,255,255,0.12)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  teacherBadgeText: { color: 'rgba(255,255,255,0.6)', fontSize: 8, fontWeight: '900', letterSpacing: 1 },

  brandMark: { position: 'absolute', top: 14, right: 16 },
  brandText: { color: 'rgba(255,255,255,0.18)', fontSize: 8, fontWeight: '900', letterSpacing: 2.5 },

  viewersChip: { position: 'absolute', bottom: 14, left: 14, flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(0,0,0,0.55)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  viewersDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#22C55E' },
  viewersText: { color: 'rgba(255,255,255,0.85)', fontSize: 10, fontWeight: '700' },

  durationChip: { position: 'absolute', bottom: 14, right: 14, flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(0,0,0,0.55)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  durationText: { color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: '700' },

  // ── CONTROL BAR ──
  controlBar: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#050E22', paddingHorizontal: 16, paddingVertical: 12 },
  ctrlBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.07)', alignItems: 'center', justifyContent: 'center' },
  ctrlBtnRed: { backgroundColor: '#EF4444' },
  ctrlSpacer: { flex: 1 },
  ctrlBtnPrimary: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: COLORS.accent, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 },
  ctrlPrimaryText: { color: COLORS.white, fontSize: 13, fontWeight: '800' },

  // ── PROGRESS ──
  progressWrap: { paddingHorizontal: 18, marginTop: 20 },
  progressHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  lessonTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 7, flex: 1, marginRight: 10 },
  lessonTitleText: { color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: '700', flex: 1 },
  progressPct: { color: COLORS.accent, fontSize: 13, fontWeight: '900' },
  progressBg: { height: 7, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 99, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 99 },

  // ── BODY ──
  body: { paddingBottom: 48 },

  // ── HERO CARD ──
  heroCard: { marginHorizontal: 18, marginTop: -6, borderRadius: 30, overflow: 'hidden', ...SHADOWS.medium },
  heroCardInner: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 16 },
  heroCardGlow: { position: 'absolute', right: -20, top: -20, width: 150, height: 150, borderRadius: 75, backgroundColor: COLORS.accent + '12' },
  heroCardLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 14 },
  heroAvatarWrap: { position: 'relative' },
  heroAvatar: { width: 56, height: 56, borderRadius: 18, borderWidth: 2.5, borderColor: COLORS.accent + '50' },
  heroAvatarBadge: { position: 'absolute', bottom: -6, right: -6, backgroundColor: '#1E293B', borderRadius: 10, padding: 2, borderWidth: 1.5, borderColor: '#0F172A' },
  heroAvatarBadgeText: { fontSize: 14 },
  heroName: { color: COLORS.white, fontSize: 17, fontWeight: '900' },
  heroSub: { color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: '600', marginTop: 2 },
  heroCardRight: { alignItems: 'flex-end' },
  heroScore: { color: COLORS.accent, fontSize: 42, fontWeight: '900', lineHeight: 44 },
  heroScoreMax: { color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: '600' },
  heroRankChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: COLORS.accent + '20', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, marginTop: 6 },
  heroRankText: { color: COLORS.accent, fontSize: 11, fontWeight: '900' },

  // ── STATS ──
  statsRow: { flexDirection: 'row', gap: 10, marginHorizontal: 18, marginTop: 18 },

  // ── SECTIONS ──
  section: { marginHorizontal: 18, marginTop: 28 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  sectionHeadLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitle: { fontSize: 19, fontWeight: '900', color: '#0F172A' },
  sectionSub: { fontSize: 12, color: COLORS.gray[400], fontWeight: '700' },
  livePill: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#FEF2F2', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  livePillText: { color: '#EF4444', fontSize: 10, fontWeight: '900', letterSpacing: 1 },

  // ── EVENT CARDS ──
  evCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 20, marginBottom: 10, padding: 14, borderWidth: 1, gap: 12, overflow: 'hidden' },
  evDotBar: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, borderRadius: 99 },
  evEmoji: { fontSize: 24, width: 32, textAlign: 'center' },
  evBody: { flex: 1 },
  evText: { fontSize: 13, fontWeight: '700', lineHeight: 19 },
  evMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  evTime: { fontSize: 10, fontWeight: '700' },

  // ── LEADERBOARD ──
  lbHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingBottom: 8 },
  lbHeaderText: { fontSize: 10, fontWeight: '800', color: COLORS.gray[300], textTransform: 'uppercase', letterSpacing: 0.8 },
  lbRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 22, marginBottom: 10, padding: 14, gap: 12, ...SHADOWS.light },
  lbRowHighlight: { backgroundColor: '#FFF7ED', borderWidth: 1.5, borderColor: COLORS.accent + '45' },
  lbRowFirst: { borderWidth: 1.5, borderColor: '#FDE68A' },
  lbRankBox: { width: 28, alignItems: 'center' },
  lbMedal: { fontSize: 22 },
  lbRankNum: { fontSize: 15, fontWeight: '900', color: COLORS.gray[300] },
  lbAvatarWrap: { position: 'relative' },
  lbAvatar: { width: 42, height: 42, borderRadius: 14 },
  lbChildBadge: { position: 'absolute', bottom: -2, right: -2, width: 11, height: 11, borderRadius: 5.5, backgroundColor: COLORS.accent, borderWidth: 2, borderColor: COLORS.white },
  lbInfo: { flex: 1, gap: 7 },
  lbName: { fontSize: 14, fontWeight: '800', color: '#1E293B' },
  lbNameHL: { color: COLORS.accent },
  lbBarRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  lbPct: { fontSize: 10, fontWeight: '800', width: 32, textAlign: 'right' },
  lbScore: { fontSize: 18, fontWeight: '900', color: COLORS.gray[400] },
  lbScoreHL: { color: COLORS.accent },

  // ── ACTIONS ──
  actions: { flexDirection: 'row', gap: 12, marginHorizontal: 18, marginTop: 32 },
  actSecondary: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    paddingVertical: 17, borderRadius: 22,
    backgroundColor: COLORS.accent + '12',
    borderWidth: 1.5, borderColor: COLORS.accent + '30',
  },
  actSecondaryText: { fontSize: 13, fontWeight: '800', color: COLORS.accent },
  actPrimary: { flex: 1, borderRadius: 22, overflow: 'hidden', ...SHADOWS.medium },
  actPrimaryGrad: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 17 },
  actPrimaryText: { color: COLORS.white, fontSize: 13, fontWeight: '900' },

  // ── FOOTER ──
  footerNote: {
    textAlign: 'center', fontSize: 11, color: COLORS.gray[400],
    fontWeight: '600', marginHorizontal: 30, marginTop: 24, lineHeight: 17,
  },
});

export default LiveLessonScreen;
