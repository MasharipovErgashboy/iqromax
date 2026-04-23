import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SHADOWS } from '../../constants/theme.js';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  Crown, 
  Zap, 
  Star, 
  Trophy, 
  PieChart, 
  Lock,
  MessageCircle,
  TrendingUp,
  Award
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const SubscriptionScreen = ({ navigation }) => {
  const { isDark, theme } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState('standard');

  const PLANS = [
    {
      id: 'basic',
      title: 'Boshlang\'ich',
      price: "45,000",
      period: 'oy',
      desc: 'Asosiy tahlillar va 2 ta fanga kirish',
      popular: false,
    },
    {
      id: 'standard',
      title: 'Standart',
      price: "95,000",
      period: 'oy',
      desc: 'AI maslahatlar va 10 ta fanga kirish',
      popular: true,
    },
    {
      id: 'pro',
      title: 'Professional',
      price: "155,000",
      period: 'oy',
      desc: 'Barcha fanlar va sertifikatlar',
      popular: false,
    }
  ];

  const FEATURES = [
    { icon: PieChart, text: "Batafsil AI tahlilli hisobotlar", color: '#6366F1' },
    { icon: Lock, text: "Barcha 50+ fanlarga to'liq kirish", color: '#10B981' },
    { icon: Trophy, text: "Xalqaro darajadagi musobaqalar", color: '#F59E0B' },
    { icon: MessageCircle, text: "Ustozlar bilan 24/7 yordam", color: '#0EA5E9' },
    { icon: TrendingUp, text: "Farzandingiz uchun maxsus yo'nalish", color: '#8B5CF6' },
    { icon: Award, text: "Rasmiy IQROMAX sertifikatlari", color: '#EF4444' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Premium Header */}
      <LinearGradient
        colors={isDark ? ['#020617', '#0F172A'] : ['#0F172A', '#1E293B']}
        style={styles.header}
      >
        <SafeAreaView>
          <View style={styles.topNav}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={[styles.backBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.08)' }]}
            >
              <ArrowLeft color={COLORS.white} size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Premium Obuna</Text>
            <View style={{ width: 44 }} />
          </View>

          <View style={styles.headerContent}>
            <View style={styles.crownContainer}>
              <LinearGradient
                colors={isDark ? ['#FDBA74', '#F97316'] : [COLORS.accent, '#f59e0b']}
                style={styles.crownBg}
              >
                <Crown color={COLORS.white} size={40} fill={COLORS.white} />
              </LinearGradient>
            </View>
            <Text style={styles.headerMainTitle}>Farzandingiz salohiyatini oching</Text>
            <Text style={styles.headerSub}>IQROMAX Premium bilan cheksiz imkoniyatlarga ega bo'ling</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView 
        style={[styles.content, { backgroundColor: theme.background }]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollPadding}
      >
        {/* Features Section */}
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Siz nimalarga ega bo'lasiz?</Text>
          {FEATURES.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: isDark ? feature.color + '20' : feature.color + '15' }]}>
                <feature.icon color={feature.color} size={18} strokeWidth={2.5} />
              </View>
              <Text style={[styles.featureText, { color: theme.textSecondary }]}>{feature.text}</Text>
              <Check color={isDark ? theme.glow : COLORS.primary} size={18} />
            </View>
          ))}
        </View>

        {/* Plans Section */}
        <View style={styles.plansSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Tarifni tanlang</Text>
          <View style={styles.plansGap}>
            {PLANS.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                onPress={() => setSelectedPlan(plan.id)}
                activeOpacity={0.9}
                style={[
                  styles.planCard,
                  { backgroundColor: theme.card, borderColor: theme.border },
                  selectedPlan === plan.id && (isDark ? { backgroundColor: theme.cardElevated, borderColor: COLORS.accent } : styles.planCardSelected)
                ]}
              >
                {plan.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>ENG FOYDALI</Text>
                  </View>
                )}
                
                <View style={styles.planHeader}>
                  <View>
                    <Text style={[styles.planTitle, { color: theme.text }, selectedPlan === plan.id && (isDark ? { color: COLORS.white } : styles.whiteText)]}>{plan.title}</Text>
                    <Text style={[styles.planDesc, { color: theme.textSecondary }, selectedPlan === plan.id && (isDark ? { color: 'rgba(255,255,255,0.7)' } : styles.opacityText)]}>{plan.desc}</Text>
                  </View>
                  <View style={[styles.radio, { borderColor: theme.border }, (isDark && selectedPlan === plan.id) ? { borderColor: COLORS.accent } : (selectedPlan === plan.id && styles.radioSelected)]}>
                    {selectedPlan === plan.id && <View style={[styles.radioInner, { backgroundColor: COLORS.accent }]} />}
                  </View>
                </View>

                <View style={styles.planFooter}>
                  <View style={styles.priceContainer}>
                    <Text style={[styles.currency, { color: theme.textSecondary }, selectedPlan === plan.id && (isDark ? { color: COLORS.white } : styles.whiteText)]}>UZS</Text>
                    <Text style={[styles.price, { color: theme.text }, selectedPlan === plan.id && (isDark ? { color: COLORS.white } : styles.whiteText)]}>{plan.price}</Text>
                    <Text style={[styles.period, { color: theme.textSecondary }, selectedPlan === plan.id && (isDark ? { color: 'rgba(255,255,255,0.7)' } : styles.opacityText)]}>/{plan.period}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Button */}
        <TouchableOpacity 
          style={styles.actionBtn}
          onPress={() => {
            const planDetails = PLANS.find(p => p.id === selectedPlan);
            navigation.navigate('PaymentCheckout', { plan: planDetails });
          }}
        >
          <LinearGradient
            colors={[COLORS.accent, '#f59e0b']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.btnGradient}
          >
            <ShieldCheck color={COLORS.white} size={20} />
            <Text style={styles.btnText}>OBUNANI TASDIQLASH</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={[styles.disclaimer, { color: theme.textSecondary }]}>
          Xaridni tasdiqlash orqali siz xizmat ko'rsatish shartlariga rozilik bildirasiz. 
          Istalgan vaqtda obunani bekor qilishingiz mumkin.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: Platform.OS === 'ios' ? 0 : 20,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 30,
  },
  crownContainer: {
    marginBottom: 20,
  },
  crownBg: {
    width: 80,
    height: 80,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  headerMainTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
    lineHeight: 34,
  },
  headerSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
  content: {
    flex: 1,
    marginTop: -30,
  },
  scrollPadding: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  section: {
    borderRadius: 30,
    padding: 24,
    ...SHADOWS.medium,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  plansSection: {
    marginBottom: 30,
  },
  plansGap: {
    gap: 15,
  },
  planCard: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    ...SHADOWS.light,
    position: 'relative',
  },
  planCardSelected: {
    backgroundColor: '#0F172A',
    borderColor: COLORS.accent,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  popularText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '900',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  planDesc: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: COLORS.accent,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.accent,
  },
  planFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  currency: {
    fontSize: 14,
    fontWeight: '700',
  },
  price: {
    fontSize: 24,
    fontWeight: '900',
  },
  period: {
    fontSize: 14,
    fontWeight: '600',
  },
  whiteText: {
    color: COLORS.white,
  },
  opacityText: {
    color: 'rgba(255,255,255,0.5)',
  },
  actionBtn: {
    borderRadius: 22,
    overflow: 'hidden',
    ...SHADOWS.medium,
    marginBottom: 20,
  },
  btnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  btnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  disclaimer: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 20,
  }
});

export default SubscriptionScreen;
