import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Dimensions, 
  Animated,
  Platform,
  Image,
  StatusBar
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme.js';
import { useLevels } from '../../context/LevelContext.js';
import { Modal } from 'react-native';
import { 
  ArrowLeft, 
  RotateCcw, 
  Target, 
  Zap, 
  Lightbulb, 
  ChevronRight, 
  Play, 
  Info,
  Clock,
  Volume2,
  Trophy,
  Calculator
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 7;
const FRAME_HEIGHT = 380; // Reduced to give breathing room

const COLUMN_GEMS = [
  ['#8B5CF6', '#6D28D9', '#4C1D95'], // Amethyst
  ['#EF4444', '#B91C1C', '#7F1D1D'], // Ruby
  ['#F59E0B', '#D97706', '#92400E'], // Amber
  ['#10B981', '#047857', '#064E3B'], // Emerald
  ['#3B82F6', '#1D4ED8', '#1E3A8A'], // Sapphire
  ['#EC4899', '#BE185D', '#831843'], // Pink Tourmaline
  ['#06B6D4', '#0891B2', '#164E63'], // Aquamarine
];

const AnimatedJewel = ({ active, type, onPress, colIndex, style }) => {
  const animValue = useRef(new Animated.Value(active ? 1 : 0)).current;
  const gemColors = COLUMN_GEMS[colIndex % COLUMN_GEMS.length];

  useEffect(() => {
    Animated.spring(animValue, {
      toValue: active ? 1 : 0,
      friction: 5,
      tension: 65,
      useNativeDriver: true
    }).start();
  }, [active]);

  const travelDist = type === 'upper' ? 38 : -32;
  const translation = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, travelDist]
  });

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[styles.jewelTapArea, style]}>
      <Animated.View style={[
        styles.jewelContainer,
        { transform: [{ translateY: translation }, { scale: active ? 1.08 : 1 }] }
      ]}>
        <LinearGradient
          colors={active ? [gemColors[0], gemColors[1], gemColors[2]] : ['#CBD5E1', '#94A3B8', '#475569']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.jewel}
        >
          {/* Inner Light Refraction */}
          <View style={[styles.jewelGlitter, { backgroundColor: active ? 'white' : 'rgba(255,255,255,0.4)' }]} />
          <LinearGradient
            colors={['rgba(255,255,255,0.4)', 'transparent']}
            style={styles.jewelSurface}
          />
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

const AbacusColumn = ({ value, onBeadPress, colIndex }) => {
  const isUpperActive = value >= 5;
  const lowerCount = value % 5;

  return (
    <View style={styles.columnContainer}>
      <LinearGradient colors={['#1E293B', '#475569', '#1E293B']} style={styles.metallicRod} />
      
      {/* Upper Section */}
      <View style={styles.upperSection}>
        <AnimatedJewel 
          type="upper" 
          active={isUpperActive} 
          onPress={() => onBeadPress('upper', 0)} 
          colIndex={colIndex}
        />
      </View>

      <View style={styles.columnSpacer} />

      {/* Lower Section */}
      <View style={styles.lowerSection}>
        {[1, 2, 3, 4].map((i) => (
          <AnimatedJewel
            key={i}
            type="lower"
            active={lowerCount >= i}
            onPress={() => onBeadPress('lower', i)}
            colIndex={colIndex}
            style={{ marginBottom: 5 }}
          />
        ))}
      </View>
    </View>
  );
};

const AbacusSimulator = ({ navigation, route }) => {
  const { mode = 'level' } = route.params || {};
  const isFreeMode = mode === 'free';

  const { unlockLevel, addXP, updateStreak, earnBadge } = useLevels();
  const [columns, setColumns] = useState(isFreeMode ? [0, 0, 0, 0, 0, 0, 0] : [0, 0, 0, 0, 7, 3, 1]);
  const [task, setTask] = useState({ target: 1250, time: '02:45' });
  const [isSuccess, setIsSuccess] = useState(false);
  
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scanAnim = useRef(new Animated.Value(0)).current;
  const successAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Hologram Pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: 2000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
      ])
    ).start();

    // Scan Line
    Animated.loop(
      Animated.timing(scanAnim, { toValue: 1, duration: 3000, useNativeDriver: true })
    ).start();
  }, []);

  const handleBeadPress = (colIndex, section, beadIdx) => {
    const newColumns = [...columns];
    let currentValue = newColumns[colIndex];
    let isUpper = currentValue >= 5;
    let lowerPart = currentValue % 5;

    if (section === 'upper') {
      newColumns[colIndex] = isUpper ? lowerPart : lowerPart + 5;
    } else {
      if (lowerPart >= beadIdx) {
        newColumns[colIndex] = isUpper ? (beadIdx - 1) + 5 : (beadIdx - 1);
      } else {
        newColumns[colIndex] = isUpper ? beadIdx + 5 : beadIdx;
      }
    }
    setColumns(newColumns);
  };

  const totalValue = useMemo(() => {
    return columns.reduce((acc, val, i) => acc + val * Math.pow(10, columns.length - 1 - i), 0);
  }, [columns]);

  useEffect(() => {
    if (!isFreeMode && totalValue === task.target && !isSuccess) {
      setIsSuccess(true);
      // Muvaffaqiyat animatsiyasi
      Animated.sequence([
        Animated.timing(successAnim, { toValue: 1.2, duration: 300, useNativeDriver: true }),
        Animated.timing(successAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
      // Logic for unlocking next level
      // Assuming level 1 is currently active, unlock level 2
      unlockLevel(2); 
      addXP(150); // Oshirildi
      updateStreak(); // Streak yangilash
      earnBadge('Abakus ustasi'); // Badge berish
    }
  }, [totalValue]);

  const resetAbacus = () => setColumns([0, 0, 0, 0, 0, 0, 0]);

  const scanLineTranslate = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100]
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient colors={['#F1F5F9', '#CBD5E1']} style={styles.container}>
        
        {/* Zen Quest Header */}
        <View style={styles.questHeader}>
           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
              <ArrowLeft color="#475569" size={24} />
           </TouchableOpacity>

           <View style={styles.questCard}>
              {isFreeMode ? (
                <View style={styles.freeModeHeader}>
                   <Calculator color={COLORS.primary} size={18} />
                   <Text style={styles.freeModeTitle}>Abakus Kalkulyatori</Text>
                   <Text style={styles.freeModeSub}>Erkin hisoblash rejimi</Text>
                </View>
              ) : (
                <>
                  <View style={styles.questTop}>
                    <View style={styles.targetBadge}>
                        <Target color={COLORS.primary} size={14} />
                        <Text style={styles.targetLabel}>Target: {task.target}</Text>
                    </View>
                    <View style={styles.timerBadge}>
                        <Clock color="#64748B" size={14} />
                        <Text style={styles.timerText}>{task.time}</Text>
                    </View>
                  </View>
                  <View style={styles.questProgressBg}>
                    <LinearGradient 
                      colors={[COLORS.primary, COLORS.primaryDark]} 
                      style={[styles.questProgressFill, { width: `${(totalValue / task.target) * 100}%` }]} 
                    />
                  </View>
                </>
              )}
           </View>

           <TouchableOpacity onPress={resetAbacus} style={styles.iconBtn}>
              <RotateCcw color={COLORS.primary} size={24} />
           </TouchableOpacity>
        </View>

        {/* Masterpiece HUD Area */}
        <View style={styles.hudArea}>
           <Animated.View style={[styles.hologramRing, { transform: [{ scale: pulseAnim }] }]}>
              <LinearGradient colors={['rgba(34, 197, 94, 0.15)', 'transparent']} style={styles.hologramGlow} />
           </Animated.View>
           
           <Animated.View style={[styles.hologramDisplay, { transform: [{ scale: successAnim }] }]}>
              <Animated.View style={[styles.scanLine, { transform: [{ translateY: scanLineTranslate }] }]} />
              <Text style={styles.hologramValue}>{totalValue.toLocaleString()}</Text>
              <Text style={styles.hologramSub}>{isFreeMode ? 'NATIJA' : 'HISOB-KITOBLAR'}</Text>
           </Animated.View>
        </View>

        {/* Zen Abacus Frame */}
        <View style={styles.abacusCore}>
           <View style={styles.zenFrame}>
              {/* Outer Wood Bezel */}
              <LinearGradient 
                colors={['#1E293B', '#0F172A', '#1E293B']} 
                style={styles.masterFrame}
              >
                 {/* Internal Brushed Metal Rails */}
                 <View style={styles.railHeader} />
                 <View style={styles.railDivider}>
                    <LinearGradient 
                      colors={['#111', '#475569', '#111']} 
                      horizontal 
                      style={styles.dividerInside} 
                    />
                 </View>
                 <View style={styles.railFooter} />

                 <View style={styles.columnsWrapper}>
                    {columns.map((val, idx) => (
                      <AbacusColumn 
                        key={idx} 
                        value={val} 
                        colIndex={idx}
                        onBeadPress={(sec, bIdx) => handleBeadPress(idx, sec, bIdx)} 
                      />
                    ))}
                 </View>
              </LinearGradient>
              <View style={styles.frameShadow} />
           </View>
        </View>

        {/* Dash Controls */}
        <View style={styles.footerUI}>
           <View style={styles.sideControls}>
              <TouchableOpacity style={styles.actionBtn}>
                 <Volume2 color="#64748B" size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                 <Lightbulb color="#F59E0B" size={24} />
              </TouchableOpacity>
           </View>

           <TouchableOpacity activeOpacity={0.9} style={styles.mainStartBtn} onPress={() => !isFreeMode && navigation.navigate('AbacusLevels')}>
              <LinearGradient
                colors={['#1E293B', '#0F172A']}
                style={styles.startGradient}
              >
                  <Zap color={COLORS.secondary} fill={COLORS.secondary} size={28} />
                  <Text style={styles.startLabel}>{isFreeMode ? 'MASHQ QILISH' : "LEVELGA O'TISH"}</Text>
              </LinearGradient>
           </TouchableOpacity>

           <TouchableOpacity style={styles.actionBtn}>
              <ChevronRight color="#64748B" size={24} />
           </TouchableOpacity>
        </View>

        <Modal visible={isSuccess} transparent animationType="fade">
           <View style={styles.modalOverlay}>
              <View style={styles.successModal}>
                 <LinearGradient 
                   colors={['#10B981', '#059669']} 
                   style={styles.successIconBox}
                 >
                    <Trophy color="white" size={40} />
                 </LinearGradient>
                 <Text style={styles.successTitle}>Muvaffaqiyat!</Text>
                 <Text style={styles.successDesc}>
                    Siz vazifani to'g'ri bajardingiz! Keyingi level qulfi ochildi.
                 </Text>
                 <View style={styles.xpGainRow}>
                    <Zap color="#F59E0B" fill="#F59E0B" size={18} />
                    <Text style={styles.xpGainText}>+150 XP To'pladingiz</Text>
                 </View>
                 <TouchableOpacity 
                   style={styles.doneBtn}
                   onPress={() => {
                     setIsSuccess(false);
                     navigation.navigate('AbacusLevels');
                   }}
                 >
                    <Text style={styles.doneBtnText}>KEYINGI LEVELGA O'TISH</Text>
                    <ChevronRight color="white" size={20} />
                 </TouchableOpacity>
              </View>
           </View>
        </Modal>

      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  container: {
    flex: 1,
  },
  questHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 12,
  },
  iconBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  questCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    ...SHADOWS.medium,
  },
  questTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  targetBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
  },
  targetLabel: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.primaryDark,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  timerText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#475569',
  },
  questProgressBg: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  questProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  freeModeHeader: { alignItems: 'center', justifyContent: 'center' },
  freeModeTitle: { fontSize: 16, fontWeight: '900', color: '#0F172A', marginTop: 4 },
  freeModeSub: { fontSize: 11, fontWeight: '700', color: COLORS.primary, letterSpacing: 1, textTransform: 'uppercase' },
  hudArea: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    position: 'relative',
    height: 140,
    marginTop: 15,
    marginBottom: 10, // Separation from abacus
  },
  hologramRing: {
    position: 'absolute',
    width: 280,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  hologramGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 70,
  },
  hologramDisplay: {
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  scanLine: {
    position: 'absolute',
    width: '150%',
    height: 2,
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    zIndex: 10,
  },
  hologramValue: {
    fontSize: 64,
    fontWeight: '900',
    color: '#0F172A',
    textShadowColor: 'rgba(34, 197, 94, 0.4)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
  hologramSub: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 4,
  },
  abacusCore: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zenFrame: {
    width: '94%',
    height: FRAME_HEIGHT,
    position: 'relative',
    transform: [{ perspective: 1200 }, { rotateX: '10deg' }],
  },
  masterFrame: {
    flex: 1,
    borderRadius: 40,
    borderWidth: 12,
    borderColor: '#020617',
    padding: 8,
    ...SHADOWS.large,
    position: 'relative',
  },
  frameShadow: {
    position: 'absolute',
    bottom: -15,
    left: '2%',
    right: '2%',
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 45,
    transform: [{ scaleY: 0.7 }],
    filter: 'blur(20px)',
    zIndex: -1,
  },
  railHeader: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  railDivider: {
    position: 'absolute',
    top: 110,
    left: 0,
    right: 0,
    height: 16,
    zIndex: 20,
    backgroundColor: '#020617',
    ...SHADOWS.medium,
  },
  dividerInside: {
    flex: 1,
    marginVertical: 4,
    height: 8,
  },
  railFooter: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  columnsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 10,
  },
  columnContainer: {
    width: 44,
    height: '100%',
    alignItems: 'center',
  },
  metallicRod: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 4,
    borderRadius: 2,
    zIndex: -1,
  },
  upperSection: {
    height: 100,
    paddingTop: 10,
  },
  columnSpacer: {
    height: 16,
  },
  lowerSection: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  jewelTapArea: {
    width: 44,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jewelContainer: {
    width: 40,
    height: 28,
  },
  jewel: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  jewelGlitter: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 12,
    height: 4,
    borderRadius: 2,
    opacity: 0.6,
  },
  jewelSurface: {
    ...StyleSheet.absoluteFillObject,
  },
  footerUI: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingBottom: Platform.OS === 'ios' ? 120 : 100,
    marginTop: 20, // Separation from abacus shadow
    zIndex: 10,
  },
  sideControls: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  mainStartBtn: {
    flex: 1,
    marginHorizontal: 15,
    borderRadius: 26,
    ...SHADOWS.medium,
    overflow: 'hidden',
  },
  startGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 10,
  },
  startLabel: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  successModal: {
    backgroundColor: 'white',
    borderRadius: 35,
    padding: 30,
    width: '100%',
    alignItems: 'center',
    ...SHADOWS.large,
  },
  successIconBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -70,
    ...SHADOWS.medium,
  },
  successTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#1E293B',
    marginBottom: 10,
  },
  successDesc: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  xpGainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 30,
  },
  xpGainText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#F59E0B',
  },
  doneBtn: {
    backgroundColor: '#1E293B',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  doneBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
});

export default AbacusSimulator;
