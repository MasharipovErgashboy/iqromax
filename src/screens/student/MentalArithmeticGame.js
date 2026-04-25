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

const MentalArithmeticGame = ({ navigation, route }) => {
  const { config } = route.params || {};
  const gameConfig = {
    totalNumbers: config?.count || 10,
    displayDuration: config?.speed || 1200,
    range: config?.range || 1
  };

  const [gameState, setGameState] = useState('idle'); // idle, playing, answering, result
  const [currentNumber, setCurrentNumber] = useState(null);
  const [correctSum, setCorrectSum] = useState(0);
  const [step, setStep] = useState(0);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState({ visible: false, type: 'success', text: '' });
  const [timeLeft, setTimeLeft] = useState(ANSWER_TIMEOUT);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  
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
    if (index >= gameConfig.totalNumbers) {
      setTimeout(() => {
        setGameState('answering');
        generateOptions(currentSum);
        startTimer();
      }, 800);
      return;
    }

    let val;
    if (gameConfig.range === 1) {
      val = (Math.floor(Math.random() * 9) + 1) * (Math.random() > 0.4 ? 1 : -1);
    } else if (gameConfig.range === 2) {
      val = (Math.floor(Math.random() * 90) + 10) * (Math.random() > 0.4 ? 1 : -1);
    } else {
      val = (Math.floor(Math.random() * 99) + 1) * (Math.random() > 0.4 ? 1 : -1);
    }
    
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
    }, gameConfig.displayDuration);
  }, [fadeAnim, scaleAnim, slideAnim, startTimer, gameConfig]);

  const startGame = () => {
    setGameState('playing');
    setCorrectSum(0);
    setStep(0);
    setSelectedOption(null);
    setUserAnswer('');
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

  const handleAnswer = (finalAnswer) => {
    stopTimer();
    const numericAnswer = parseInt(finalAnswer);
    setSelectedOption(numericAnswer);
    
    if (finalAnswer === null) {
      Vibration.vibrate(500);
      setFeedback({ visible: true, type: 'error', text: 'VAQT TUGADI!\nJAVOB: ' + correctSum });
    } else if (numericAnswer === correctSum) {
      setFeedback({ visible: true, type: 'success', text: 'DAHSHAT!\nTO\'G\'RI JAVOB' });
    } else {
      Vibration.vibrate(300);
      setFeedback({ visible: true, type: 'error', text: 'XATO!\nTO\'G\'RI JAVOB: ' + correctSum });
    }
  };

  const handleKeyPress = (key) => {
    if (key === 'delete') {
      setUserAnswer(prev => prev.slice(0, -1));
    } else if (key === 'minus') {
      setUserAnswer(prev => prev.startsWith('-') ? prev.slice(1) : '-' + prev);
    } else {
      if (userAnswer.length < 6) {
        setUserAnswer(prev => prev + key);
      }
    }
  };

  const NumericKeypad = () => {
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '0', 'delete'];
    return (
      <View style={styles.keypadGrid}>
        {keys.map((key) => (
          <TouchableOpacity 
            key={key} 
            style={[styles.keyBtn, key === 'delete' && styles.deleteBtn]}
            onPress={() => key === 'delete' ? handleKeyPress('delete') : (key === '-' ? handleKeyPress('minus') : handleKeyPress(key))}
          >
            {key === 'delete' ? (
              <RotateCcw color="#EF4444" size={24} />
            ) : (
              <Text style={styles.keyText}>{key}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
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
                <Text style={styles.heroSub}>{gameConfig.totalNumbers} ta son ketma-ket chiqadi. Javob uchun 10 soniya bor!</Text>
                <TouchableOpacity style={styles.startBtn} onPress={startGame}>
                  <Play color="white" fill="white" size={24} />
                  <Text style={styles.startBtnText}>BOSHLASH</Text>
                </TouchableOpacity>
              </View>
            )}

            {gameState === 'playing' && (
              <View style={styles.playingArea}>
                <View style={styles.stepContainer}>
                   <Text style={styles.stepText}>{step} / {gameConfig.totalNumbers}</Text>
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

                <View style={styles.answerDisplay}>
                   <Text style={styles.answerLabel}>Javobingizni kiriting:</Text>
                   <View style={styles.inputBox}>
                      <Text style={[styles.inputText, !userAnswer && styles.placeholderText]}>
                        {userAnswer || '?'}
                      </Text>
                   </View>
                </View>
                
                <NumericKeypad />

                <TouchableOpacity 
                  style={[styles.submitBtn, !userAnswer && styles.disabledSubmit]} 
                  disabled={!userAnswer}
                  onPress={() => handleAnswer(userAnswer)}
                >
                   <Text style={styles.submitBtnText}>TASDIQLASH</Text>
                   <Zap color="white" size={18} fill="white" />
                </TouchableOpacity>

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
  answerDisplay: { width: '100%', alignItems: 'center', marginBottom: 25 },
  answerLabel: { fontSize: 14, fontWeight: '700', color: '#64748B', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
  inputBox: { 
    width: '100%', 
    height: 70, 
    backgroundColor: 'white', 
    borderRadius: 20, 
    alignItems: 'center', 
    justifyContent: 'center',
    ...SHADOWS.medium,
    borderWidth: 2,
    borderColor: COLORS.primary + '30'
  },
  inputText: { fontSize: 36, fontWeight: '900', color: '#0F172A' },
  placeholderText: { color: '#CBD5E1' },
  keypadGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: 25 },
  keyBtn: {
    width: (width - 100) / 3,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  deleteBtn: { backgroundColor: '#FEF2F2' },
  keyText: { fontSize: 24, fontWeight: '800', color: '#1E293B' },
  submitBtn: {
    width: '100%',
    height: 65,
    backgroundColor: COLORS.primary,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    ...SHADOWS.medium,
  },
  submitBtnText: { color: 'white', fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  disabledSubmit: { opacity: 0.5, backgroundColor: '#94A3B8' },
  errorHint: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 25, backgroundColor: '#FEF2F2', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15 },
  errorHintText: { color: '#EF4444', fontWeight: '800', fontSize: 14 },
});

export default MentalArithmeticGame;
