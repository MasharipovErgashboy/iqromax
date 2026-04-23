import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { useLevels } from '../../context/LevelContext.js';
import { 
  X, 
  Timer, 
  Trophy, 
  Zap, 
  ChevronRight,
  Flame,
  Volume2,
  VolumeX,
  Target
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const CompetitionArena = ({ navigation, route }) => {
  const { competition } = route.params || { competition: { title: 'Global Challenge', colors: ['#EF4444', '#7F1D1D'] } };
  const { addXP, updateStreak, earnBadge } = useLevels();
  
  // Game State
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [currentProblem, setCurrentProblem] = useState({ q: '42 + 58', a: 100 });
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  // Animations
  const timerAnim = useRef(new Animated.Value(1)).current;
  const scoreAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Timer Logic
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Pulse timer when low
    if (timeLeft < 30) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(timerAnim, { toValue: 1.2, duration: 500, useNativeDriver: true }),
          Animated.timing(timerAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [timeLeft]);

  const handleGameOver = () => {
    Alert.alert(
      "Vaqt tugadi!",
      `Musobaqa yakunlandi. Sizning natijangiz: ${score} ball.`,
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  const handleExit = () => {
    Alert.alert(
      "Musobaqani tark etish",
      "Haqiqatdan ham chiqmoqchimisiz? Natijangiz saqlanmaydi.",
      [
        { text: "Yo'q", style: 'cancel' },
        { text: "Ha, chiqish", onPress: () => navigation.goBack(), style: 'destructive' }
      ]
    );
  };

  const submitAnswer = (num) => {
    const newAnswer = userAnswer + num;
    setUserAnswer(newAnswer);
    
    // Auto-check for 3 digit problems
    if (parseInt(newAnswer) === currentProblem.a) {
      handleCorrect();
    } else if (newAnswer.length >= currentProblem.a.toString().length) {
      handleWrong();
    }
  };

  const handleCorrect = () => {
    const points = 10 * (combo + 1);
    setScore(score + points);
    setCombo(combo + 1);
    setUserAnswer('');
    generateProblem();
    
    // XP qo'shish
    addXP(points);
    updateStreak();
    if (combo >= 5) earnBadge('Combo ustasi');
    
    // Feedback
    setFeedback('Zo\'r!');
    setTimeout(() => setFeedback(''), 1000);
    
    // Animation
    Animated.sequence([
      Animated.timing(scoreAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      Animated.timing(scoreAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  const handleWrong = () => {
    setCombo(0);
    setUserAnswer('');
    
    // Feedback
    setFeedback('Yana urinib ko\'r!');
    setTimeout(() => setFeedback(''), 1000);
    
    // Shake animation
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const generateProblem = () => {
    const a = Math.floor(Math.random() * 90) + 10;
    const b = Math.floor(Math.random() * 90) + 10;
    setCurrentProblem({ q: `${a} + ${b}`, a: a + b });
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
        
        {/* Arena HUD */}
        <SafeAreaView style={styles.hudContainer}>
          <View style={styles.hudTop}>
             <TouchableOpacity onPress={handleExit} style={styles.exitBtn}>
                <X color="white" size={24} />
             </TouchableOpacity>

             <Animated.View style={[styles.timerPill, { transform: [{ scale: timerAnim }] }]}>
                <Timer color={timeLeft < 30 ? "#EF4444" : "#10B981"} size={20} />
                <Text style={[styles.timerText, { color: timeLeft < 30 ? "#EF4444" : "white" }]}>
                  {formatTime(timeLeft)}
                </Text>
             </Animated.View>

             <TouchableOpacity onPress={() => setIsMuted(!isMuted)} style={styles.exitBtn}>
                {isMuted ? <VolumeX color="white" size={24} /> : <Volume2 color="white" size={24} />}
             </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
             <View style={styles.scoreBox}>
                <Trophy color="#F59E0B" size={20} fill="#F59E0B" />
                <View>
                   <Text style={styles.statLabel}>HISOB</Text>
                   <Text style={styles.statValue}>{score.toLocaleString()}</Text>
                </View>
             </View>
             
             {combo > 1 && (
               <Animated.View style={styles.comboBadge}>
                  <Flame color="#EF4444" fill="#EF4444" size={20} />
                  <Text style={styles.comboText}>X{combo} COMBO</Text>
               </Animated.View>
             )}
          </View>
        </SafeAreaView>

        {/* Problem Area */}
        <View style={styles.arenaCenter}>
           <Animated.View style={[styles.problemCard, { transform: [{ translateX: shakeAnim }] }]}>
              <View style={styles.arenaGlow} />
              <Text style={styles.problemLabel}>MUAMMO</Text>
              <Text style={styles.problemText}>{currentProblem.q}</Text>
              <View style={styles.answerContainer}>
                 <Text style={styles.answerText}>{userAnswer || '?'}</Text>
                 <View style={[styles.answerLine, { backgroundColor: userAnswer ? COLORS.primary : '#475569' }]} />
              </View>
              {feedback ? <Text style={styles.feedbackText}>{feedback}</Text> : null}
           </Animated.View>
        </View>

        {/* Speed Pad Controller */}
        <View style={styles.padContainer}>
           <View style={styles.numPad}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                <TouchableOpacity 
                  key={num} 
                  style={styles.key}
                  onPress={() => submitAnswer(num)}
                  activeOpacity={0.6}
                >
                   <Text style={styles.keyText}>{num}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity 
                style={[styles.key, styles.clearKey]}
                onPress={() => setUserAnswer('')}
              >
                 <Text style={[styles.keyText, { color: '#EF4444' }]}>C</Text>
              </TouchableOpacity>
           </View>
        </View>

        <View style={styles.footerGlow} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  hudContainer: { paddingHorizontal: 20 },
  hudTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 },
  exitBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  timerPill: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  timerText: { fontSize: 18, fontWeight: '900', fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  scoreBox: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(255,255,255,0.05)', padding: 15, borderRadius: 20, flex: 0.6 },
  statLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: '900', letterSpacing: 2 },
  statValue: { color: 'white', fontSize: 24, fontWeight: '900' },
  
  comboBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(239, 68, 68, 0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.3)' },
  comboText: { color: '#EF4444', fontSize: 13, fontWeight: '900' },

  arenaCenter: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
  problemCard: { width: '100%', alignItems: 'center', paddingVertical: 40, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' },
  arenaGlow: { position: 'absolute', top: -50, width: 200, height: 200, backgroundColor: COLORS.primary, borderRadius: 100, opacity: 0.1, filter: 'blur(40px)' },
  problemLabel: { color: COLORS.primary, fontSize: 12, fontWeight: '900', letterSpacing: 4, marginBottom: 15 },
  problemText: { color: 'white', fontSize: 64, fontWeight: '900', textAlign: 'center' },
  answerContainer: { marginTop: 30, alignItems: 'center', width: '60%' },
  answerText: { color: 'white', fontSize: 42, fontWeight: '900', marginBottom: 5 },
  answerLine: { width: '100%', height: 4, borderRadius: 2 },
  feedbackText: { color: COLORS.primary, fontSize: 18, fontWeight: '700', marginTop: 10 },

  padContainer: { paddingBottom: 50, paddingHorizontal: 20 },
  numPad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 },
  key: { width: (width - 80) / 3, height: 60, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  keyText: { color: 'white', fontSize: 24, fontWeight: '900' },
  clearKey: { width: (width - 80) / 3, backgroundColor: 'rgba(239, 68, 68, 0.1)' },

  footerGlow: { position: 'absolute', bottom: -100, left: 0, right: 0, height: 200, backgroundColor: COLORS.primary, opacity: 0.15, filter: 'blur(80px)', zIndex: -1 },
});

export default CompetitionArena;
