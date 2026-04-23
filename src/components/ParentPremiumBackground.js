import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../constants/theme';

const { width } = Dimensions.get('window');

const ParentPremiumBackground = ({ color1 = '#10B981', color2 = '#0F172A' }) => {
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
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: (width * 0.85) / 2,
    opacity: 0.1,
  },
  blob1: {
    top: -width * 0.3,
    left: -width * 0.2,
  },
  blob2: {
    bottom: width * 0.1,
    right: -width * 0.2,
  },
});

export default ParentPremiumBackground;
