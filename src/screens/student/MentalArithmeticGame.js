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
  Vibration,
  Platform
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Play, RotateCcw, Home, Brain, Zap, Clock, AlertTriangle } from 'lucide-react-native';
import GameFeedback from '../../components/GameFeedback';

const { width, height } = Dimensions.get('window');

const MentalArithmeticGame = ({ navigation, route }) => {
  const { config } = route.params || {};
  const gameConfig = {
    totalNumbers: config?.count || 10,
    displayDuration: config?.speed || 1000,
    range: config?.range || 1
  };

  const [gameState, setGameState] = useState('idle'); // idle, playing, answering, result
  const [currentNumber, setCurrentNumber] = useState(null);
  const [correctSum, setCorrectSum] = useState(0);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(30);
  const [combo, setCombo] = useState(2);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState({ visible: false, type: 'success', text: '' });
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const numberAnim = useRef(new Animated.Value(0)).current;

  const nextNumber = useCallback((index, currentSum) => {
    if (index >= gameConfig.totalNumbers) {
      setTimeout(() => {
        setGameState('answering');
      }, 500);
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

    // Animation for the number
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.5);
    
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 8, useNativeDriver: true }),
    ]).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }).start(() => {
        nextNumber(index + 1, newSum);
      });
    }, gameConfig.displayDuration);
  }, [fadeAnim, scaleAnim, gameConfig]);

  const startGame = () => {
    setGameState('playing');
    setCorrectSum(0);
    setStep(0);
    setUserAnswer('');
    nextNumber(0, 0);
  };

  const handleAnswer = () => {
    const numericAnswer = parseInt(userAnswer);
    if (isNaN(numericAnswer)) return;

    if (numericAnswer === correctSum) {
      setScore(prev => prev + 10 * combo);
      setCombo(prev => prev + 1);
      setFeedback({ visible: true, type: 'success', text: 'BARAKALLA!' });
    } else {
      setCombo(1);
      Vibration.vibrate(400);
      setFeedback({ visible: true, type: 'error', text: `XATO!\nTO'G'RI JAVOB: ${correctSum}` });
    }
  };

  const handleKeyPress = (key) => {
    if (key === 'C') {
      setUserAnswer('');
    } else if (key === 'OK') {
      handleAnswer();
    } else if (key === '-') {
      setUserAnswer(prev => prev.startsWith('-') ? prev.slice(1) : '-' + prev);
    } else {
      if (userAnswer.length < 6) {
        setUserAnswer(prev => prev + key);
      }
    }
  };

  const NumericKeypad = () => {
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '0', 'C', 'OK'];
    return (
      <View style={styles.keypadWrapper}>
        <View style={styles.keypadGrid}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(key => (
            <TouchableOpacity key={key} style={styles.keyBtn} onPress={() => handleKeyPress(key)}>
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[styles.keyBtn, { backgroundColor: '#334155' }]} onPress={() => handleKeyPress('-')}>
            <Text style={styles.keyText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keyBtn} onPress={() => handleKeyPress('0')}>
            <Text style={styles.keyText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyBtn, { backgroundColor: '#7f1d1d' }]} onPress={() => handleKeyPress('C')}>
            <Text style={[styles.keyText, { color: '#ef4444' }]}>C</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.okBtn} onPress={() => handleKeyPress('OK')}>
          <Text style={styles.okBtnText}>TASDIQLASH (OK)</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
            <X color="white" size={24} />
          </TouchableOpacity>
          <View style={styles.timerBadge}>
             <Clock color="#10b981" size={16} />
             <Text style={styles.timerText}>02:43</Text>
          </View>
          <TouchableOpacity style={styles.soundBtn}>
             <Zap color="white" size={20} />
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
           <View style={styles.statBox}>
              <Text style={styles.statLabel}>HISOB</Text>
              <Text style={styles.statValue}>{score}</Text>
           </View>
           <View style={styles.comboBadge}>
              <Text style={styles.comboText}>🔥 X{combo} COMBO</Text>
           </View>
        </View>

        <View style={styles.mainContent}>
           {gameState === 'idle' && (
             <View style={styles.startArea}>
                <View style={styles.heroBox}>
                   <Brain color="#10b981" size={80} strokeWidth={1.5} />
                </View>
                <Text style={styles.startTitle}>Ruhiy Arifmetika</Text>
                <Text style={styles.startSub}>Sonlar ketma-ket chiqadi. Ularni qo'shing yoki ayiring.</Text>
                <TouchableOpacity style={styles.beginBtn} onPress={startGame}>
                   <Text style={styles.beginText}>BOSHLASH</Text>
                </TouchableOpacity>
             </View>
           )}

           {gameState === 'playing' && (
             <View style={styles.displayCard}>
                <Text style={styles.problemLabel}>MUAMMO</Text>
                <Animated.View style={{ 
                  opacity: fadeAnim, 
                  transform: [{ scale: scaleAnim }] 
                }}>
                  <Text style={[styles.displayNumber, { color: currentNumber >= 0 ? 'white' : '#ef4444' }]}>
                    {currentNumber > 0 ? `+${currentNumber}` : currentNumber}
                  </Text>
                </Animated.View>
                <View style={styles.progressDots}>
                   {Array.from({ length: gameConfig.totalNumbers }).map((_, i) => (
                     <View key={i} style={[styles.dot, i < step && styles.dotActive]} />
                   ))}
                </View>
             </View>
           )}

           {gameState === 'answering' && (
             <View style={{ flex: 1, width: '100%' }}>
                <View style={styles.displayCard}>
                   <Text style={styles.problemLabel}>MUAMMO</Text>
                   <Text style={styles.questionMark}>?</Text>
                   <View style={styles.inputUnderline} />
                   <Text style={styles.userInput}>{userAnswer || ''}</Text>
                </View>

                <NumericKeypad />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // Dark Slate matching screenshot
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  closeBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  timerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  soundBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 25,
    marginTop: 30,
  },
  statBox: {
    gap: 4,
  },
  statLabel: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  statValue: {
    color: 'white',
    fontSize: 32,
    fontWeight: '900',
  },
  comboBadge: {
    backgroundColor: '#450a0a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#991b1b',
  },
  comboText: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: '900',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  displayCard: {
    width: '100%',
    aspectRatio: 1.2,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  problemLabel: {
    position: 'absolute',
    top: 40,
    color: '#10b981',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  displayNumber: {
    fontSize: 100,
    fontWeight: '900',
    textAlign: 'center',
  },
  questionMark: {
    fontSize: 80,
    fontWeight: '900',
    color: 'white',
    marginTop: 20,
  },
  inputUnderline: {
    width: 120,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    marginTop: 10,
  },
  userInput: {
    position: 'absolute',
    bottom: 60,
    fontSize: 40,
    fontWeight: '900',
    color: '#10b981',
  },
  keypadWrapper: {
    width: '100%',
    marginTop: 30,
    gap: 15,
  },
  keypadGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  keyBtn: {
    width: (width - 70) / 3,
    height: 65,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  okBtn: {
    width: '100%',
    height: 70,
    backgroundColor: '#10b981',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  okBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },
  startArea: {
    alignItems: 'center',
  },
  heroBox: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#10b981',
  },
  startTitle: {
    color: 'white',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 10,
  },
  startSub: {
    color: '#64748b',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 24,
    marginBottom: 40,
  },
  beginBtn: {
    backgroundColor: '#10b981',
    paddingHorizontal: 50,
    paddingVertical: 18,
    borderRadius: 20,
    ...SHADOWS.medium,
  },
  beginText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '900',
  },
  progressDots: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  dotActive: {
    backgroundColor: '#10b981',
    width: 12,
  }
});

export default MentalArithmeticGame;
