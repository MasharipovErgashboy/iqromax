import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING } from '../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

const XPProgressBar = ({ currentXP, totalXP, level }) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const percentage = Math.min(currentXP / totalXP, 1);
    Animated.spring(progress, {
      toValue: percentage,
      useNativeDriver: false,
      friction: 8,
      tension: 40,
    }).start();
  }, [currentXP, totalXP]);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.levelText}>LEVEL {level}</Text>
        <Text style={styles.xpText}>{currentXP} / {totalXP} XP</Text>
      </View>
      <View style={styles.barBackground}>
        <Animated.View style={[styles.barForeground, { width }]}>
          <LinearGradient
            colors={[COLORS.xp, '#a78bfa']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: SPACING.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.level,
    letterSpacing: 1,
  },
  xpText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.gray[500],
  },
  barBackground: {
    height: 12,
    backgroundColor: COLORS.gray[200],
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  barForeground: {
    height: '100%',
    borderRadius: BORDER_RADIUS.full,
  },
  gradient: {
    flex: 1,
  },
});

export default XPProgressBar;
