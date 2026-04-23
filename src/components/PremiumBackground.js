import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../constants/theme';

const { width } = Dimensions.get('window');

const PremiumBackground = ({ color1 = COLORS.secondary, color2 = '#0EA5E9' }) => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={[styles.blob, styles.blob1, { backgroundColor: color1 }]} />
      <View style={[styles.blob, styles.blob2, { backgroundColor: color2 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  blob: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    opacity: 0.12,
  },
  blob1: {
    top: -width * 0.2,
    right: -width * 0.2,
  },
  blob2: {
    bottom: width * 0.1,
    left: -width * 0.2,
  },
});

export default PremiumBackground;
