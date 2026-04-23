import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Dimensions, 
  Animated,
  StatusBar,
  Vibration
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Play, RotateCcw, Home, Brain, Zap, Clock, AlertTriangle } from 'lucide-react-native';
import GameFeedback from '../../components/GameFeedback';

const { width } = Dimensions.get('window');

const TOTAL_NUMBERS = 10;
const DISPLAY_DURATION = 1200;
const ANSWER_TIMEOUT = 10; // 10 seconds

const MentalArithmeticGame = ({ navigation }) => {
  const [gameState, setGameState] = useState('idle'); // idle, playing, answering, result
  const [currentNumber, setCurrentNumber] = useState(null);
  const [correctSum, setCorrectSum] = useState(0);
  const [step, setStep] = useState(0);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState({ visible: false, type: 'success', text: '' });
  const [timeLeft, setTimeLeft] = useState(ANSWER_TIMEOUT);
  const [selectedOption, setSelectedOption] = useState(null);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const timerWidth = useRef(new Animated.Value(1)).current;
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    setTimeLeft(ANSWER_TIMEOUT);
    timerWidth.setValue(1);
    
    Animated.timing(timerWidth, {
      toValue: 0,
      duration: ANSWER_TIMEOUT * 1000,
      useNativeDriver: false,
    }).start();

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAnswer(null, true); // Timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [timerWidth]);

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerWidth.stopAnimation();
  };

  const nextNumber = useCallback((index, currentSum) => {
    if (index >= TOTAL_NUMBERS) {
      setTimeout(() => {
        setGameState('answering');
        generateOptions(currentSum);
        startTimer();
      }, 800);
      return;
    }

    const randomNum = Math.floor(Math.random() * 9) + 1;
    const sign = Math.random() > 0.4 ? 1 : -1;
    const val = randomNum * sign;
    const newSum = currentSum + val;
    
    setStep(index + 1);
    setCurrentNumber(val);
    setCorrectSum(newSum);

    fadeAnim.setValue(0);
    scaleAnim.setValue(0.7);
    slideAnim.setValue(30);
    
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 6, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true })
    ]).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
        nextNumber(index + 1, newSum);
      });
    }, DISPLAY_DURATION);
  }, [fadeAnim, scaleAnim, slideAnim, startTimer]);

  const startGame = () => {
    setGameState('playing');
    setCorrectSum(0);
    setStep(0);
    setSelectedOption(null);
    nextNumber(0, 0);
  };

  const generateOptions = (sum) => {
    const opts = [sum];
    while (opts.length < 4) {
      const offset = Math.floor(Math.random() * 14) - 7;
      const wrong = sum + offset;
      if (!opts.includes(wrong) && wrong !== sum) {
        opts.push(wrong);
      }
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
  };

  const handleAnswer = (selected, isTimeout = false) => {
    stopTimer();
    setSelectedOption(selected);
    
    if (isTimeout) {
      Vibration.vibrate(500);
      setFeedback({ visible: true, type: 'error', text: 'VAQT TUGADI!\nJAVOB: ' + correctSum });
    } else if (selected === correctSum) {
      setFeedback({ visible: true, type: 'success', text: 'DAHSHAT!\nTO\'G\'RI JAVOB' });
    } else {
      Vibration.vibrate(300);
      setFeedback({ visible: true, type: 'error', text: 'XATO!\nTO\'G\'RI JAVOB: ' + correctSum });
    }
  };

  useEffect(() => {
    return () => stopTimer();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient colors={['#F0FDFA', '#E0F2FE']} style={styles.gradient}>
        <SafeAreaView style={styles.safeArea}>
          
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
              <X color="#64748B" size={24} />
            </TouchableOpacity>
            
            <View style={styles.levelBadge}>
              <Brain color={COLORS.primary} size={16} />
              <Text style={styles.levelText}>Mental Power</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('StudentHome')} style={styles.iconBtn}>
              <Home color="#64748B" size={22} />
            </TouchableOpacity>
          </View>

          <View style={styles.main}>
            {gameState === 'idle' && (
              <View style={styles.centerBox}>
                <View style={styles.heroCircle}>
                   <Zap color={COLORS.primary} size={60} fill={COLORS.primary} />
                </View>
                <Text style={styles.heroTitle}>Tayyormisiz?</Text>
                <Text style={styles.heroSub}>{TOTAL_NUMBERS} ta son ketma-ket chiqadi. Javob uchun 10 soniya bor!</Text>
                <TouchableOpacity style={styles.startBtn} onPress={startGame}>
                  <Play color="white" fill="white" size={24} />
                  <Text style={styles.startBtnText}>BOSHLASH</Text>
                </TouchableOpacity>
              </View>
            )}

            {gameState === 'playing' && (
              <View style={styles.playingArea}>
                <View style={styles.stepContainer}>
                   <Text style={styles.stepText}>{step} / {TOTAL_NUMBERS}</Text>
                </View>
                <Animated.View style={[
                  styles.numberBox,
                  { opacity: fadeAnim, transform: [{ scale: scaleAnim }, { translateY: slideAnim }] }
                ]}>
                  <Text style={[styles.numberText, { color: currentNumber >= 0 ? '#10B981' : '#EF4444' }]}>
                    {currentNumber > 0 ? `+${currentNumber}` : currentNumber}
                  </Text>
                </Animated.View>
              </View>
            )}

            {gameState === 'answering' && (
              <View style={styles.answerArea}>
                <View style={styles.timerHeader}>
                   <View style={styles.timerInfo}>
                      <Clock color={timeLeft < 4 ? '#EF4444' : COLORS.primary} size={20} />
                      <Text style={[styles.timerText, timeLeft < 4 && { color: '#EF4444' }]}>{timeLeft}s</Text>
                   </View>
                   <View style={styles.timerBarBg}>
                      <Animated.View 
                        style={[
                          styles.timerBarFill, 
                          { 
                            width: timerWidth.interpolate({
                              inputRange: [0, 1],
                              outputRange: ['0%', '100%']
                            }),
                            backgroundColor: timeLeft < 4 ? '#EF4444' : COLORS.primary
                          }
                        ]} 
                      />
                   </View>
                </View>

                <Text style={styles.questionText}>Javobingiz qanday?</Text>
                
                <View style={styles.optionsGrid}>
                  {options.map((opt, i) => (
                    <TouchableOpacity 
                      key={i} 
                      disabled={selectedOption !== null}
                      style={[
                        styles.optionBtn,
                        selectedOption === opt && opt === correctSum && styles.correctOption,
                        selectedOption === opt && opt !== correctSum && styles.wrongOption,
                        selectedOption !== null && opt === correctSum && styles.correctOptionHighlight
                      ]}
                      onPress={() => handleAnswer(opt)}
                    >
                      <Text style={[
                        styles.optionText,
                        selectedOption === opt && { color: 'white' },
                        selectedOption !== null && opt === correctSum && { color: 'white' }
                      ]}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {selectedOption !== null && selectedOption !== correctSum && (
                   <View style={styles.errorHint}>
                      <AlertTriangle color="#EF4444" size={18} />
                      <Text style={styles.errorHintText}>To'g'ri javob: {correctSum}</Text>
                   </View>
                )}
              </View>
            )}
          </View>

          <GameFeedback 
            visible={feedback.visible}
            type={feedback.type}
            text={feedback.text}
            onAnimationComplete={() => {
              setFeedback({ ...feedback, visible: false });
              setGameState('idle');
            }}
          />

        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
    ...SHADOWS.light,
  },
  levelText: { fontSize: 13, fontWeight: '800', color: '#1E293B' },
  main: { flex: 1, justifyContent: 'center', paddingHorizontal: 25 },
  centerBox: { alignItems: 'center' },
  heroCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    ...SHADOWS.medium,
  },
  heroTitle: { fontSize: 32, fontWeight: '900', color: '#0F172A', marginBottom: 10 },
  heroSub: { fontSize: 16, color: '#64748B', fontWeight: '600', textAlign: 'center', marginBottom: 40 },
  startBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    gap: 12,
    ...SHADOWS.medium,
  },
  startBtnText: { color: 'white', fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  playingArea: { alignItems: 'center' },
  stepContainer: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
    marginBottom: 40,
  },
  stepText: { fontSize: 18, fontWeight: '900', color: COLORS.primary },
  numberBox: { alignItems: 'center', justifyContent: 'center' },
  numberText: { fontSize: 140, fontWeight: '900' },
  answerArea: { alignItems: 'center' },
  timerHeader: { width: '100%', marginBottom: 30, alignItems: 'center' },
  timerInfo: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  timerText: { fontSize: 18, fontWeight: '900', color: COLORS.primary },
  timerBarBg: { width: '100%', height: 8, backgroundColor: '#E2E8F0', borderRadius: 4, overflow: 'hidden' },
  timerBarFill: { height: '100%', borderRadius: 4 },
  questionText: { fontSize: 26, fontWeight: '900', color: '#0F172A', marginBottom: 30 },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 20 },
  optionBtn: {
    width: (width - 90) / 2,
    height: 90,
    backgroundColor: 'white',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  optionText: { fontSize: 30, fontWeight: '900', color: '#1E293B' },
  correctOption: { backgroundColor: '#10B981', borderColor: '#10B981' },
  wrongOption: { backgroundColor: '#EF4444', borderColor: '#EF4444' },
  correctOptionHighlight: { backgroundColor: '#10B981', borderColor: '#10B981' },
  errorHint: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 25, backgroundColor: '#FEF2F2', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15 },
  errorHintText: { color: '#EF4444', fontWeight: '800', fontSize: 14 },
});

export default MentalArithmeticGame;
