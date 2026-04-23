import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, 
  Check, 
  Crown, 
  Zap, 
  Star, 
  Trophy, 
  Lock,
  MessageCircle,
  TrendingUp,
  Award,
  Video,
  Play,
  Gamepad2,
  ShieldCheck
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const StudentSubscription = ({ navigation }) => {
  const { isDark, theme } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState('quarterly');

  const PLANS = [
    {
      id: 'monthly',
      title: '1 Oylik',
      price: "49,000",
      period: 'oy',
      desc: 'Asosiy darsliklar va mashqlar',
      popular: false,
    },
    {
      id: 'quarterly',
      title: '3 Oylik',
      price: "119,000",
      period: '3 oy',
      desc: 'Barcha darslar va musobaqalar',
      popular: true,
      save: '20% tejash'
    },
    {
      id: 'annual',
      title: '1 Yillik',
      price: "399,000",
      period: 'yil',
      desc: 'Cheksiz bilim va sertifikatlar',
      popular: false,
      save: '35% tejash'
    }
  ];

  const STUDENT_FEATURES = [
    { icon: Video, text: "Barcha 50+ video darsliklar", color: '#3B82F6' },
    { icon: Gamepad2, text: "Matematik o'yinlar va simulyatorlar", color: '#10B981' },
    { icon: Trophy, text: "Xalqaro reytingda qatnashish", color: '#F59E0B' },
    { icon: Zap, text: "Kunlik XP ballar va yutuqlar", color: '#8B5CF6' },
    { icon: MessageCircle, text: "Ustozlar bilan bevosita aloqa", color: '#0EA5E9' },
    { icon: Award, text: "Rasmiy IQROMAX sertifikatlari", color: '#EF4444' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <LinearGradient
          colors={['#1E293B', '#0F172A']}
          style={styles.headerGradient}
        >
          <SafeAreaView edges={['top']}>
            <View style={styles.topNav}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <ArrowLeft color="white" size={24} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Premium Obuna</Text>
              <View style={{ width: 44 }} />
            </View>

            <View style={styles.heroContent}>
               <View style={styles.crownWrapper}>
                  <LinearGradient
                    colors={['#F59E0B', '#D97706']}
                    style={styles.crownBg}
                  >
                     <Crown color="white" fill="white" size={40} />
                  </LinearGradient>
               </View>
               <Text style={styles.heroMain}>Bilimingni cheksiz qil!</Text>
               <Text style={styles.heroSub}>Premium bilan barcha fanlar va o'yinlar senga muntazir</Text>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Features List */}
        <View style={[styles.section, { backgroundColor: theme.card }]}>
           <Text style={[styles.sectionTitle, { color: theme.text }]}>Premium imkoniyatlari</Text>
           {STUDENT_FEATURES.map((feat, i) => (
             <View key={i} style={styles.featureItem}>
                <View style={[styles.featIconBox, { backgroundColor: feat.color + '15' }]}>
                   <feat.icon color={feat.color} size={18} />
                </View>
                <Text style={[styles.featText, { color: theme.textSecondary }]}>{feat.text}</Text>
                <Check color="#22C55E" size={18} />
             </View>
           ))}
        </View>

        {/* Plans */}
        <View style={styles.plansSection}>
           <Text style={[styles.sectionTitle, { color: theme.text, marginLeft: 20, marginBottom: 15 }]}>Tarifni tanla</Text>
           <View style={styles.plansList}>
              {PLANS.map((plan) => (
                <TouchableOpacity 
                  key={plan.id} 
                  onPress={() => setSelectedPlan(plan.id)}
                  style={[
                    styles.planCard, 
                    { backgroundColor: theme.card, borderColor: theme.border },
                    selectedPlan === plan.id && { borderColor: COLORS.primary, borderWidth: 2 }
                  ]}
                >
                   {plan.popular && (
                     <View style={styles.popularBadge}>
                        <Text style={styles.popularText}>ENG MASHHUR</Text>
                     </View>
                   )}
                   <View style={styles.planInfo}>
                      <View>
                        <Text style={[styles.planTitle, { color: theme.text }]}>{plan.title}</Text>
                        <Text style={[styles.planDesc, { color: theme.textSecondary }]}>{plan.desc}</Text>
                      </View>
                      <View style={[styles.radio, selectedPlan === plan.id && { borderColor: COLORS.primary }]}>
                         {selectedPlan === plan.id && <View style={styles.radioInner} />}
                      </View>
                   </View>
                   <View style={styles.planFooter}>
                      <View style={styles.priceRow}>
                         <Text style={[styles.currency, { color: theme.textSecondary }]}>UZS</Text>
                         <Text style={[styles.price, { color: theme.text }]}>{plan.price}</Text>
                         <Text style={[styles.period, { color: theme.textSecondary }]}>/{plan.period}</Text>
                      </View>
                      {plan.save && (
                        <View style={styles.saveBadge}>
                           <Text style={styles.saveText}>{plan.save}</Text>
                        </View>
                      )}
                   </View>
                </TouchableOpacity>
              ))}
           </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Payment Action */}
      <View style={[styles.actionFooter, { backgroundColor: theme.background, borderTopColor: theme.border }]}>
         <TouchableOpacity 
           style={styles.confirmBtn}
           onPress={() => {
             const plan = PLANS.find(p => p.id === selectedPlan);
             navigation.navigate('PaymentCheckout', { plan });
           }}
         >
            <LinearGradient
              colors={['#3B82F6', '#2563EB']}
              style={styles.btnGradient}
            >
               <ShieldCheck color="white" size={20} />
               <Text style={styles.btnText}>OBUNANI TASDIQLASH</Text>
            </LinearGradient>
         </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { borderBottomLeftRadius: 35, borderBottomRightRadius: 35, overflow: 'hidden' },
  headerGradient: { paddingBottom: 30 },
  topNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 },
  backBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: '800' },
  heroContent: { alignItems: 'center', marginTop: 25, paddingHorizontal: 30 },
  crownWrapper: { marginBottom: 15 },
  crownBg: { width: 70, height: 70, borderRadius: 22, justifyContent: 'center', alignItems: 'center', ...SHADOWS.medium },
  heroMain: { color: 'white', fontSize: 24, fontWeight: '900', textAlign: 'center' },
  heroSub: { color: 'rgba(255,255,255,0.6)', fontSize: 13, textAlign: 'center', marginTop: 8, lineHeight: 20 },
  scrollContent: { paddingVertical: 25 },
  section: { marginHorizontal: 20, borderRadius: 25, padding: 20, ...SHADOWS.light, marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: '900', marginBottom: 20 },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 15 },
  featIconBox: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  featText: { flex: 1, fontSize: 14, fontWeight: '600' },
  plansSection: {},
  plansList: { paddingHorizontal: 20, gap: 15 },
  planCard: { borderRadius: 22, padding: 18, borderWidth: 1, ...SHADOWS.light, position: 'relative' },
  popularBadge: { position: 'absolute', top: -10, right: 20, backgroundColor: COLORS.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  popularText: { color: 'white', fontSize: 9, fontWeight: '900' },
  planInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 },
  planTitle: { fontSize: 18, fontWeight: '800' },
  planDesc: { fontSize: 12, marginTop: 2, fontWeight: '500' },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary },
  planFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  currency: { fontSize: 12, fontWeight: '700' },
  price: { fontSize: 22, fontWeight: '900' },
  period: { fontSize: 12, fontWeight: '600' },
  saveBadge: { backgroundColor: '#F0FDF4', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  saveText: { color: '#16A34A', fontSize: 11, fontWeight: '800' },
  actionFooter: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingVertical: 20, paddingBottom: Platform.OS === 'ios' ? 35 : 20, borderTopWidth: 1 },
  confirmBtn: { borderRadius: 22, overflow: 'hidden', ...SHADOWS.medium },
  btnGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, gap: 10 },
  btnText: { color: 'white', fontSize: 15, fontWeight: '900', letterSpacing: 1 },
});

export default StudentSubscription;
