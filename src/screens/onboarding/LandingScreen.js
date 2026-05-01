import React, { useEffect, useRef, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions, 
  Animated, 
  StatusBar,
  FlatList
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, BookOpen, Trophy, BarChart3 } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - SPACING.xl * 2;

const SLIDES = [
  {
    id: '1',
    image: require('../../../assets/mental_arithmetic_live.png'),
    title: 'Intellektual Ta\'lim',
    subtitle: 'Farzandingiz kelajagini bugundan quring',
    color: '#F0FDF4',
  },
  {
    id: '2',
    image: require('../../../assets/math_games_no_owl.png'),
    title: 'Qiziqarli O\'yinlar',
    subtitle: 'O\'yin orqali bilim olish — eng samarali yo\'l',
    color: '#FFFBEB',
  },
  {
    id: '3',
    image: require('../../../assets/live_class_live.png'),
    title: 'Jonli Muloqot',
    subtitle: 'O\'qituvchi bilan yuzma-yuz — uyda o\'tirib',
    color: '#F5F3FF',
  },
];

const LandingScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);
  
  // Floating animation for mascot
  const floatAnim = useRef(new Animated.Value(0)).current;
  // Pulse animation for background
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade in screen
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Floating Mascot Animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -15,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Pulse Effect for BG
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const interval = setInterval(() => {
      let nextIndex = activeIndex === SLIDES.length - 1 ? 0 : activeIndex + 1;
      slideRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const onScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    if (roundIndex !== activeIndex) {
      setActiveIndex(roundIndex);
    }
  };

  const renderSlide = ({ item }) => (
    <View style={styles.slide}>
      <View style={styles.card}>
        <View style={[styles.imageBg, { backgroundColor: item.color }]}>
          {/* LIVE Badge */}
          <View style={styles.liveBadge}>
             <Animated.View style={[styles.liveDot, { opacity: pulseAnim }]} />
             <Text style={styles.liveText}>LIVE</Text>
          </View>

          {/* Animated decorative backgrounds for "Live" effect */}
          <Animated.View 
            style={[
              styles.livePulse, 
              { 
                backgroundColor: item.color, 
                transform: [{ scale: pulseAnim }],
                borderColor: COLORS.primary + '20'
              }
            ]} 
          />
          <Animated.View 
            style={[
              styles.liveCircle, 
              { 
                backgroundColor: COLORS.white, 
                opacity: 0.3,
                transform: [{ translateY: floatAnim }, { scale: 0.8 }] 
              }
            ]} 
          />
          
          <Animated.View style={{ width: '100%', height: '100%', transform: [{ translateY: floatAnim }] }}>
            <Image
              source={item.image}
              style={styles.mascot}
              resizeMode="cover"
            />
          </Animated.View>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      {/* Dynamic Background Elements */}
      <View style={styles.bgDecorCircle1} />
      <View style={styles.bgDecorCircle2} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          
          {/* Premium Header Branding */}
          <View style={styles.header}>
            <View style={styles.brandBox}>
              <Text style={styles.brandTitle}>IQROMAX</Text>
              <View style={styles.taglineBox}>
                <View style={styles.tagLine} />
                <Text style={styles.taglineText}>INTELLEKTUAL TA'LIM</Text>
                <View style={styles.tagLine} />
              </View>
            </View>
          </View>

          {/* Swiper Section */}
          <Animated.View style={[styles.swiperContainer, { opacity: fadeAnim }]}>
            <FlatList
              ref={slideRef}
              data={SLIDES}
              renderItem={renderSlide}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
              keyExtractor={(item) => item.id}
              snapToAlignment="center"
              decelerationRate="fast"
            />
            
            {/* Pagination Dots - Moved closer to the card and styled better */}
            <View style={styles.pagination}>
              {SLIDES.map((_, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.dot, 
                    activeIndex === index ? styles.dotActive : styles.dotInactive
                  ]} 
                />
              ))}
            </View>
          </Animated.View>

          {/* Redesigned Features Section - Now with Icons and clear separation */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureBox}>
              <View style={[styles.featureIconContainer, { backgroundColor: COLORS.primary + '15' }]}>
                <BookOpen color={COLORS.primary} size={20} />
              </View>
              <Text style={styles.featureText}>Mashqlar</Text>
            </View>
            
            <View style={styles.featureBox}>
              <View style={[styles.featureIconContainer, { backgroundColor: COLORS.secondary + '15' }]}>
                <Trophy color={COLORS.secondary} size={20} />
              </View>
              <Text style={styles.featureText}>Musobaqalar</Text>
            </View>
            
            <View style={styles.featureBox}>
              <View style={[styles.featureIconContainer, { backgroundColor: COLORS.accent + '15' }]}>
                <BarChart3 color={COLORS.accent} size={20} />
              </View>
              <Text style={styles.featureText}>Reyting</Text>
            </View>
          </View>

          {/* Action Button Section */}
          <View style={styles.actionSection}>
            <TouchableOpacity
              style={styles.ctaButton}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('RoleSelection')}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryDark]}
                style={styles.ctaGradient}
              >
                <Text style={styles.ctaText}>Boshlash</Text>
                <View style={styles.ctaIconBg}>
                  <ArrowRight color={COLORS.white} size={20} />
                </View>
              </LinearGradient>
            </TouchableOpacity>
            
            <Text style={styles.copyright}>© 2026 IQROMAX Educational System</Text>
          </View>
          
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  bgDecorCircle1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.primaryLight + '20',
  },
  bgDecorCircle2: {
    position: 'absolute',
    bottom: -100,
    left: -50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: COLORS.secondary + '10',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    justifyContent: 'space-between',
    paddingBottom: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  brandBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 40,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: -1.5,
  },
  taglineBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: -5,
  },
  tagLine: {
    width: 20,
    height: 1.5,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 1,
  },
  taglineText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.gray[400],
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  swiperContainer: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
  },
  slide: {
    width: CARD_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
  },
  card: {
    width: '100%',
    height: width * 0.9,
    borderRadius: 32,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.gray[50],
  },
  imageBg: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#000', // Black base for photo contrast
  },
  livePulse: {
    position: 'absolute',
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: width * 0.45,
    borderWidth: 1,
    opacity: 0.15,
  },
  liveCircle: {
    position: 'absolute',
    width: width,
    height: width,
    borderRadius: width / 2,
    top: '10%',
  },
  mascot: {
    width: CARD_WIDTH,
    height: '100%',
    zIndex: 5,
  },
  liveBadge: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    gap: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
  },
  liveText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  cardContent: {
    flex: 0.5,
    padding: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primaryDark,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.gray[500],
    marginTop: 6,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 18,
  },
  pagination: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
    gap: 8,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    width: 20,
    backgroundColor: COLORS.primary,
  },
  dotInactive: {
    width: 6,
    backgroundColor: COLORS.gray[200],
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    marginVertical: SPACING.md,
  },
  featureBox: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  featureIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 12,
    color: COLORS.gray[700],
    fontWeight: '700',
  },
  actionSection: {
    width: '100%',
    alignItems: 'center',
  },
  ctaButton: {
    width: '100%',
    ...SHADOWS.large,
    marginBottom: SPACING.md,
  },
  ctaGradient: {
    height: 64,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
  },
  ctaText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  ctaIconBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyright: {
    fontSize: 11,
    color: COLORS.gray[400],
    fontWeight: '500',
  },
});

export default LandingScreen;
