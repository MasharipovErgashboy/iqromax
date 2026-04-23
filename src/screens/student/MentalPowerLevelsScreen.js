import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, 
  Lock, 
  Star, 
  Trophy, 
  Zap, 
  Play,
  Brain,
  ChevronRight
} from 'lucide-react-native';
import { COLORS, SHADOWS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';
import StudentPremiumBackground from '../../components/StudentPremiumBackground';

const { width, height } = Dimensions.get('window');

const MentalPowerLevelsScreen = ({ navigation }) => {
  const { isDark, theme } = useTheme();
  
  // Static levels data 1-99
  const levels = useMemo(() => {
    return Array.from({ length: 99 }, (_, i) => ({
      id: i + 1,
      unlocked: i === 0, // Only first level unlocked by default
      xp: (i + 1) * 50
    }));
  }, []);

  const getLevelX = (index) => {
    const positions = [width * 0.15, width * 0.5 - 40, width * 0.85 - 80, width * 0.5 - 40];
    return positions[index % 4];
  };

  const VERTICAL_STEP = 180;

  const journeyPath = useMemo(() => {
    const topOffset = 100;
    let d = `M ${getLevelX(0) + 40} ${topOffset}`;
    for (let i = 0; i < levels.length - 1; i++) {
        const x1 = getLevelX(i) + 40;
        const x2 = getLevelX(i + 1) + 40;
        const y1 = topOffset + (i * VERTICAL_STEP);
        const y2 = topOffset + ((i + 1) * VERTICAL_STEP);
        d += ` C ${x1} ${y1 + VERTICAL_STEP/2}, ${x2} ${y2 - VERTICAL_STEP/2}, ${x2} ${y2}`;
    }
    return d;
  }, [levels]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <StudentPremiumBackground color1="#10B981" color2="#3B82F6" color3="#8B5CF6" />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <ArrowLeft color="#1E293B" size={24} />
           </TouchableOpacity>
           <View style={styles.headerTitleContainer}>
              <Brain color="#10B981" size={20} />
              <Text style={styles.headerTitle}>Mental Power Levels</Text>
           </View>
           <View style={styles.statBadge}>
              <Trophy color="#F59E0B" size={16} fill="#F59E0B" />
              <Text style={styles.statText}>Lvl 1</Text>
           </View>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.journeyWrapper}>
             <View style={styles.svgContainer}>
                <Svg width={width} height={levels.length * VERTICAL_STEP + 200}>
                   <Path
                     d={journeyPath}
                     stroke="rgba(16, 185, 129, 0.15)"
                     strokeWidth="8"
                     fill="none"
                   />
                   <Path
                     d={journeyPath}
                     stroke="#10B981"
                     strokeWidth="3"
                     strokeDasharray="8,12"
                     fill="none"
                     opacity={0.4}
                   />
                </Svg>
             </View>

             {levels.map((lvl, index) => (
               <View 
                 key={lvl.id} 
                 style={[
                   styles.nodeContainer, 
                   { top: 100 + (index * VERTICAL_STEP) - 40, left: getLevelX(index) }
                 ]}
               >
                 <TouchableOpacity 
                   activeOpacity={0.8}
                   disabled={!lvl.unlocked}
                   onPress={() => navigation.navigate('MentalArithmetic', { levelId: lvl.id })}
                   style={[styles.node, !lvl.unlocked && styles.lockedNode]}
                 >
                   <LinearGradient
                     colors={lvl.unlocked ? ['#10B981', '#059669'] : ['#E2E8F0', '#CBD5E1']}
                     style={styles.nodeGradient}
                   >
                     {lvl.unlocked ? (
                       <Text style={styles.nodeLevelText}>{lvl.id}</Text>
                     ) : (
                       <Lock color="rgba(0,0,0,0.2)" size={20} />
                     )}
                   </LinearGradient>
                   
                   {lvl.unlocked && (
                      <View style={styles.activeIndicator}>
                         <View style={styles.dot} />
                      </View>
                   )}
                 </TouchableOpacity>
                 <Text style={[styles.nodeLabel, !lvl.unlocked && styles.lockedLabel]}>Level {lvl.id}</Text>
               </View>
             ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFB' },
  safeArea: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingVertical: 15,
    zIndex: 100 
  },
  backBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', ...SHADOWS.light },
  headerTitleContainer: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, ...SHADOWS.light },
  headerTitle: { fontSize: 16, fontWeight: '900', color: '#1E293B' },
  statBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 20, ...SHADOWS.light },
  statText: { fontSize: 14, fontWeight: '800', color: '#1E293B' },
  
  scrollContent: { paddingBottom: 100 },
  journeyWrapper: { marginTop: 20 },
  svgContainer: { position: 'absolute', top: 0, left: 0, right: 0 },
  nodeContainer: { position: 'absolute', alignItems: 'center', width: 80 },
  node: { width: 70, height: 70, borderRadius: 35, overflow: 'hidden', ...SHADOWS.medium, borderWeight: 4, borderColor: 'white' },
  nodeGradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  nodeLevelText: { color: 'white', fontSize: 24, fontWeight: '900' },
  lockedNode: { opacity: 0.8 },
  nodeLabel: { marginTop: 8, fontSize: 12, fontWeight: '800', color: '#64748B' },
  lockedLabel: { color: '#94A3B8' },
  activeIndicator: { position: 'absolute', top: -5, right: -5, width: 20, height: 20, borderRadius: 10, backgroundColor: 'white', padding: 3, ...SHADOWS.light },
  dot: { flex: 1, borderRadius: 10, backgroundColor: '#10B981' },
});

export default MentalPowerLevelsScreen;
