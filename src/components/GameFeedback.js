import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { COLORS, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { Star, XCircle } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const GameFeedback = ({ visible, type = "success", text, onAnimationComplete }) => {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  const isSuccess = type === "success";
  const feedbackColor = isSuccess ? '#10B981' : '#EF4444';
  const feedbackBg = isSuccess ? '#ECFDF5' : '#FEF2F2';

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.sequence([
          Animated.spring(scale, { toValue: 1.2, friction: 4, useNativeDriver: true }),
          Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }),
        ]),
        Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.spring(translateY, { toValue: 0, friction: 4, useNativeDriver: true }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0, duration: 500, useNativeDriver: true }),
          Animated.timing(translateY, { toValue: -100, duration: 500, useNativeDriver: true }),
        ]).start(() => {
          if (onAnimationComplete) onAnimationComplete();
        });
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      scale.setValue(0);
      opacity.setValue(0);
      translateY.setValue(50);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      <Animated.View 
        style={[
          styles.card, 
          {
            opacity,
            backgroundColor: feedbackBg,
            borderColor: feedbackColor,
            transform: [{ scale }, { translateY }]
          }
        ]}
      >
        <View style={styles.iconContainer}>
          {isSuccess ? (
            <Star color={feedbackColor} size={48} fill={feedbackColor} />
          ) : (
            <XCircle color={feedbackColor} size={48} fill="white" />
          )}
        </View>
        <Text style={[styles.text, { color: feedbackColor }]}>
          {text || (isSuccess ? "BARAKALLA!" : "XATO!")}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  card: {
    paddingVertical: 35,
    paddingHorizontal: 60,
    borderRadius: 30,
    alignItems: 'center',
    ...SHADOWS.medium,
    borderWidth: 4,
  },
  iconContainer: {
    marginBottom: 15,
  },
  text: {
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'center',
  },
});

export default GameFeedback;
