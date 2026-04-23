import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../constants/theme';

const { width, height } = Dimensions.get('window');

/**
 * StudentPremiumBackground
 * 
 * A specialized background for the student section with a vibrant, 
 * energetic color palette (Indigo/Violet/Cyan) to stimulate learning.
 */
const StudentPremiumBackground = ({ color1 = '#6366F1', color2 = '#8B5CF6', color3 = '#06B6D4' }) => {
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={[styles.blob, styles.blob1, { backgroundColor: color1 }]} />
      <View style={[styles.blob, styles.blob2, { backgroundColor: color2 }]} />
      <View style={[styles.blob, styles.blob3, { backgroundColor: color3 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  blob: {
    position: 'absolute',
    borderRadius: 200,
    opacity: 0.12,
  },
  blob1: {
    width: width * 1.1,
    height: width * 1.1,
    top: -width * 0.4,
    right: -width * 0.3,
  },
  blob2: {
    width: width * 0.8,
    height: width * 0.8,
    bottom: height * 0.1,
    left: -width * 0.3,
  },
  blob3: {
    width: width * 0.6,
    height: width * 0.6,
    top: height * 0.3,
    left: width * 0.1,
    opacity: 0.08,
  },
});

export default StudentPremiumBackground;
