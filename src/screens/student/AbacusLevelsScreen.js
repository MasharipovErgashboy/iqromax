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
  Platform,
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
  ChevronRight,
  Play,
  Award,
  Sparkles,
  Rocket,
  Sun
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';
import { useLevels } from '../../context/LevelContext.js';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const WORLD_DATA = [
  {
    id: 'w1',
    title: 'BOSHLANG\'ICH VODIYS',
    subtitle: 'Abakus asoslari va oddiy amallar',
    levels: [
      { id: 1, title: 'Kirish', sub: 'Abakus bilan tanishish', type: 'intro', xp: 50 },
      { id: 2, title: 'Oddiy qo\'shish', sub: '1-4 sonlar', type: 'lesson', xp: 100 },
      { id: 3, title: 'Kichik do\'stlar', sub: '5 bilan qo\'shish', type: 'lesson', xp: 150 },
    ]
  },
  {
    id: 'w2',
    title: 'KATAROQ QADAM',
    subtitle: 'Katta do\'stlar va tezkor hisob',
    levels: [
      { id: 4, title: 'Musobaqa #1', sub: 'Tezlikka misollar', type: 'quiz', xp: 200 },
      { id: 5, title: 'Katta do\'stlar', sub: '10 bilan qo\'shish', type: 'lesson', xp: 150 },
      { id: 6, title: 'Aralash amallar', sub: 'Master klass', type: 'lesson', xp: 300 },
    ]
  }
];

const getLevelX = (index) => {
  // Smoother horizontal spread
  const positions = [width * 0.1, width * 0.5 - 45, width * 0.9 - 90, width * 0.5 - 45];
  return positions[index % 4];
};

const LevelNode = ({ level, index, theme, navigation, isUnlocked, isCompleted, isDark, style }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -8, duration: 2500, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 2500, useNativeDriver: true }),
      ])
    ).start();

    if (isUnlocked && !isCompleted) {
      Animated.loop(
        Animated.timing(rotateAnim, { toValue: 1, duration: 3000, useNativeDriver: true })
      ).start();
    }
  }, [isUnlocked, isCompleted]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <Animated.View style={[
      styles.nodeContainer, 
      style,
      { transform: [{ translateY: floatAnim }, { scale: scaleAnim }], left: getLevelX(index) }
    ]}>
      <TouchableOpacity 
        onPress={() => navigation.navigate('AbacusLevelDetail', { level })}
        disabled={!isUnlocked}
        onPressIn={() => Animated.spring(scaleAnim, { toValue: 0.9, useNativeDriver: true }).start()}
        onPressOut={() => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start()}
        activeOpacity={0.9}
        style={styles.nodeTouchable}
      >
        <BlurView intensity={isDark ? 40 : 60} tint={isDark ? "dark" : "light"} style={styles.nodeBlur}>
          <LinearGradient
            colors={!isUnlocked ? (isDark ? ['#1E293B', '#0F172A'] : ['#E2E8F0', '#CBD5E1']) : isCompleted ? ['#10B981', '#059669'] : ['#3B82F6', '#2563EB']}
            style={[styles.nodeBody, !isUnlocked && styles.lockedBody]}
          >
            <View style={styles.nodeReflection} />
            {!isUnlocked && <Lock color={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"} size={24} />}
            {isCompleted && <Star color="white" fill="white" size={24} />}
            {isUnlocked && !isCompleted && <Play color="white" fill="white" size={24} style={{ marginLeft: 4 }} />}
          </LinearGradient>
        </BlurView>

        {isUnlocked && !isCompleted && (
          <Animated.View style={[styles.halo, { transform: [{ rotate: rotation }] }]}>
            <LinearGradient
               colors={['#60A5FA', 'transparent', '#60A5FA']}
               style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        )}
      </TouchableOpacity>

      <View style={styles.nodeInfo}>
         <Text style={[styles.nodeTitle, { color: isUnlocked ? (isDark ? 'white' : '#1E293B') : (isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)') }]}>{level.title}</Text>
         <View style={[styles.xpBadge, { backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.8)' }]}>
            <Zap color={isUnlocked ? '#F59E0B' : 'rgba(100,116,139,0.3)'} fill={isUnlocked ? '#F59E0B' : 'transparent'} size={10} />
            <Text style={[styles.xpText, { color: isUnlocked ? (isDark ? '#F59E0B' : '#D97706') : 'rgba(100,116,139,0.5)' }]}>{level.xp} XP</Text>
         </View>
      </View>
    </Animated.View>
  );
};

const AtmosphericElement = ({ type, isDark, size, top, left, duration }) => {
  const moveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, { toValue: 1, duration, useNativeDriver: true }),
        Animated.timing(moveAnim, { toValue: 0, duration, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const translateX = moveAnim.interpolate({ inputRange: [0, 1], outputRange: [-25, 25] });
  const translateY = moveAnim.interpolate({ inputRange: [0, 1], outputRange: [-15, 15] });

  const color = isDark 
    ? (type === 'primary' ? 'rgba(59,130,246,0.15)' : 'rgba(147,51,234,0.15)')
    : (type === 'primary' ? 'rgba(255,255,255,0.7)' : 'rgba(224,242,254,0.6)');

  return (
    <Animated.View style={[
      styles.atmosphereNode, 
      { 
        backgroundColor: color, 
        width: size, 
        height: size, 
        top, 
        left, 
        borderRadius: size / 2,
        transform: [{ translateX }, { translateY }],
        filter: isDark ? 'blur(40px)' : 'blur(30px)',
        opacity: isDark ? 0.6 : 0.4
      }
    ]} />
  );
};

const AbacusLevelsScreen = ({ navigation }) => {
  const { isDark, theme } = useTheme();
  const { userXP, isLevelUnlocked, isLevelCompleted } = useLevels();
  const scrollY = useRef(new Animated.Value(0)).current;

  // Flattened levels for easier global positioning
  const ALL_LEVELS = useMemo(() => {
    return WORLD_DATA.reduce((acc, world) => [...acc, ...world.levels], []);
  }, []);

  const VERTICAL_STEP = 240;
  const HEADER_HEIGHT = 120;

  const journeyPath = useMemo(() => {
    const topOffset = 80; // First node center
    let d = "M " + (getLevelX(0) + 42) + " " + topOffset;
    let y = topOffset;
    
    for (let i = 0; i < ALL_LEVELS.length - 1; i++) {
        const x1 = getLevelX(i) + 42;
        const x2 = getLevelX(i + 1) + 42;
        const y1 = y;
        
        // Add extra space for world header between index 2 and 3
        const step = i === 2 ? VERTICAL_STEP + HEADER_HEIGHT : VERTICAL_STEP;
        const y2 = y + step;
        
        d += ` C ${x1} ${y1 + step/2}, ${x2} ${y2 - step/2}, ${x2} ${y2}`;
        y = y2;
    }
    return d;
  }, [ALL_LEVELS]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <LinearGradient 
        colors={isDark ? ['#020617', '#0F172A', '#020617'] : ['#E0F2FE', '#BAE6FD', '#F0FDFA']} 
        style={StyleSheet.absoluteFill} 
      />

      <View style={StyleSheet.absoluteFill}>
        {!isDark && (
          <View style={styles.sunFlare}>
             <LinearGradient colors={['rgba(254,240,138,0.4)', 'transparent']} style={StyleSheet.absoluteFill} />
          </View>
        )}

        <AtmosphericElement isDark={isDark} type="primary" size={400} top={-100} left={-100} duration={20000} />
        <AtmosphericElement isDark={isDark} type="secondary" size={300} top={400} left={width - 200} duration={15000} />
        <AtmosphericElement isDark={isDark} type="primary" size={350} top={800} left={0} duration={25000} />
        
        {/* Parallax Stars/Particles */}
        {[1, 2, 3].map(layer => (
          <Animated.View 
            key={layer}
            style={[
              styles.particleLayer, 
              { transform: [{ translateY: scrollY.interpolate({ inputRange: [0, 1000], outputRange: [0, -layer * 40] }) }] }
            ]}
          >
            {[...Array(25)].map((_, i) => (
              <View key={i} style={[
                styles.star, 
                { 
                  top: Math.random() * height * 3, 
                  left: Math.random() * width, 
                  width: layer + 1, 
                  height: layer + 1,
                  backgroundColor: isDark ? 'white' : '#60A5FA',
                  opacity: isDark ? Math.random() * 0.4 + 0.2 : 0.3
                }
              ]} />
            ))}
          </Animated.View>
        ))}
      </View>

      <SafeAreaView style={styles.safeArea}>
        {/* Adaptive HUD Header */}
        <View style={styles.header}>
           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtnWrapper}>
              <BlurView intensity={isDark ? 30 : 50} tint={isDark ? "dark" : "light"} style={styles.headerBtnBlur}>
                 <ArrowLeft color={isDark ? "white" : "#1E293B"} size={24} />
              </BlurView>
           </TouchableOpacity>
           
           <BlurView intensity={isDark ? 40 : 80} tint={isDark ? "dark" : "light"} style={styles.hudBlur}>
              <View style={styles.hudContent}>
                 <View style={styles.hudGroup}>
                    <Trophy color="#F59E0B" size={16} />
                    <Text style={[styles.hudValue, { color: isDark ? "white" : "#1E293B" }]}>{userXP}</Text>
                 </View>
                 <View style={[styles.hudDivider, { backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }]} />
                 <View style={styles.hudGroup}>
                    <Award color="#3B82F6" size={16} />
                    <Text style={[styles.hudValue, { color: isDark ? "white" : "#1E293B" }]}>14</Text>
                 </View>
              </View>
           </BlurView>

           <TouchableOpacity style={[styles.profileBtn, { borderColor: COLORS.primary }]}>
              <Image source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=Felix' }} style={styles.avatar} />
           </TouchableOpacity>
        </View>

        <Animated.ScrollView 
          showsVerticalScrollIndicator={false} 
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.journeyContainer}>
             {/* Single Continuous SVG Path */}
             <View style={styles.svgOverlay}>
                <Svg width={width} height={1800}>
                  <Path
                    d={journeyPath}
                    stroke={isDark ? "rgba(59,130,246,0.2)" : "rgba(59,130,246,0.1)"}
                    strokeWidth="5"
                    fill="none"
                  />
                  <Path
                    d={journeyPath}
                    stroke="#3B82F6"
                    strokeWidth="2.5"
                    strokeDasharray="6,12"
                    fill="none"
                    opacity={isDark ? 0.6 : 0.4}
                  />
                </Svg>
             </View>

             {/* World 1 Header */}
             <View style={[styles.worldHeader, { top: 0 }]}>
                <Text style={[styles.worldLabel, { color: isDark ? '#60A5FA' : '#3B82F6' }]}>{WORLD_DATA[0].title}</Text>
                <Text style={[styles.worldTitle, { color: isDark ? 'white' : '#0F172A' }]}>{WORLD_DATA[0].subtitle}</Text>
             </View>

             {/* Level Nodes */}
             {ALL_LEVELS.map((level, index) => {
               // Calculate Y position with gap for world header
               let topPos = 80 + (index * VERTICAL_STEP);
               if (index >= 3) topPos += HEADER_HEIGHT;

               // Render second world header before level 4 (index 3)
               const showSecondHeader = index === 3;

               return (
                 <React.Fragment key={level.id}>
                    {showSecondHeader && (
                      <View style={[styles.worldHeader, { top: topPos - HEADER_HEIGHT - 60 }]}>
                         <Text style={[styles.worldLabel, { color: isDark ? '#60A5FA' : '#3B82F6' }]}>{WORLD_DATA[1].title}</Text>
                         <Text style={[styles.worldTitle, { color: isDark ? 'white' : '#0F172A' }]}>{WORLD_DATA[1].subtitle}</Text>
                      </View>
                    )}
                    <LevelNode 
                      level={level}
                      index={index}
                      style={{ top: topPos - 40 }} // center alignment
                      theme={theme}
                      navigation={navigation}
                      isUnlocked={isLevelUnlocked(level.id)}
                      isCompleted={isLevelCompleted(level.id)}
                      isDark={isDark}
                    />
                 </React.Fragment>
               );
             })}
          </View>
          <View style={{ height: 160 }} />
        </Animated.ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingVertical: 15,
    zIndex: 100
  },
  headerBtnWrapper: { borderRadius: 15, overflow: 'hidden' },
  headerBtnBlur: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  hudBlur: { borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  hudContent: { flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10, alignItems: 'center', gap: 12 },
  hudGroup: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  hudValue: { fontSize: 16, fontWeight: '900' },
  hudDivider: { width: 1, height: 20 },
  profileBtn: { width: 44, height: 44, borderRadius: 22, overflow: 'hidden', borderWidth: 2 },
  avatar: { width: '100%', height: '100%' },
  
  scrollContent: { paddingBottom: 150 },
  worldSection: { marginTop: 40 },
  worldHeader: { position: 'absolute', width: '100%', alignItems: 'center', paddingHorizontal: 40, zIndex: 5 },
  worldLabel: { fontSize: 12, fontWeight: '900', letterSpacing: 4 },
  worldTitle: { fontSize: 28, fontWeight: '900', textAlign: 'center', marginTop: 10 },
  
  journeyContainer: { minHeight: 1800, marginTop: 40 },
  svgOverlay: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 0 },
  nodeContainer: { position: 'absolute', alignItems: 'center', width: 90, zIndex: 10 },
  nodeTouchable: { width: 85, height: 85, zIndex: 10 },
  nodeBlur: { borderRadius: 42, overflow: 'hidden', borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)' },
  nodeBody: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  nodeReflection: { position: 'absolute', top: 5, left: 15, width: 40, height: 20, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, transform: [{ rotate: '-15deg' }] },
  lockedBody: { opacity: 0.6 },
  halo: { position: 'absolute', top: -14, left: -14, right: -14, bottom: -14, borderRadius: 60, borderStyle: 'dotted', borderWidth: 4, borderColor: 'transparent', opacity: 0.7 },
  
  nodeInfo: { marginTop: 15, alignItems: 'center' },
  nodeTitle: { fontSize: 14, fontWeight: '800', textAlign: 'center' },
  xpBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 5, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, ...SHADOWS.light },
  xpText: { fontSize: 11, fontWeight: '900' },

  particleLayer: { position: 'absolute', width: width, height: height * 4 },
  star: { position: 'absolute', borderRadius: 4 },
  atmosphereNode: { position: 'absolute' },
  sunFlare: { position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: 100 },

  footer: { position: 'absolute', bottom: 30, left: 20, right: 20, zIndex: 1000 },
  footerBlur: { borderRadius: 25, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  footerInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  nextInfo: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  nextLabel: { fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  nextTitle: { fontSize: 17, fontWeight: '900' },
  playBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 24, 
    paddingVertical: 14, 
    borderRadius: 16, 
    gap: 12,
    ...SHADOWS.medium 
  },
  playText: { color: 'white', fontSize: 14, fontWeight: '900', letterSpacing: 0.8 }
});

export default AbacusLevelsScreen;
