import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, Platform } from 'react-native';
import { COLORS, SHADOWS, BORDER_RADIUS, SPACING } from '../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

const GamifiedButton = ({ 
  onPress, 
  title, 
  color = COLORS.primary, 
  style, 
  textStyle,
  gradient,
  children
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
      friction: 10,
      tension: 100,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 0,
      useNativeDriver: true,
      friction: 10,
      tension: 100,
    }).start();
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 4],
  });

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.98],
  });

  const Container = gradient ? LinearGradient : TouchableOpacity;
  const containerProps = gradient 
    ? { colors: gradient, style: [styles.button, { backgroundColor: 'transparent' }, style] }
    : { style: [styles.button, { backgroundColor: color }, style] };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={styles.wrapper}
    >
      <Animated.View style={[
        styles.shadow, 
        { transform: [{ scale }] }
      ]} />
      <Animated.View style={[
        styles.buttonContainer,
        { transform: [{ translateY }, { scale }] }
      ]}>
        {gradient ? (
          <LinearGradient
            colors={gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.button, style]}
          >
            {children || <Text style={[styles.text, textStyle]}>{title}</Text>}
          </LinearGradient>
        ) : (
          <View style={[styles.button, { backgroundColor: color }, style]}>
            {children || <Text style={[styles.text, textStyle]}>{title}</Text>}
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    marginVertical: SPACING.sm,
  },
  buttonContainer: {
    zIndex: 2,
  },
  button: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  shadow: {
    position: 'absolute',
    bottom: -4,
    left: 0,
    right: 0,
    top: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: BORDER_RADIUS.lg,
    zIndex: 1,
  },
  text: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

import { View } from 'react-native';

export default GamifiedButton;
