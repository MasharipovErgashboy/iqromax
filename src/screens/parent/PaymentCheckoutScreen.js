import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Modal,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SHADOWS } from '../../constants/theme.js';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, 
  CreditCard, 
  ShieldCheck, 
  ChevronRight, 
  CheckCircle2,
  Lock,
  Smartphone,
  Phone,
  KeyRound
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const PaymentCheckoutScreen = ({ navigation, route }) => {
  const { isDark, theme } = useTheme();
  const { plan = { title: 'Standart', price: '95,000' } } = route.params || {};
  
  const [method, setMethod] = useState('payme');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [step, setStep] = useState('checkout'); // 'checkout' | 'verify'
  
  // Form states
  const [cardNumber, setCardNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsCode, setSmsCode] = useState('');

  const PAYMENT_METHODS = [
    { id: 'payme', name: 'Payme', logo: require('../../../assets/payme_logo.png'), color: '#00BAE0' },
    { id: 'click', name: 'Click', logo: require('../../../assets/click_logo.png'), color: '#00A3FF' },
    { id: 'uzcard', name: 'Uzcard', logo: require('../../../assets/uzcard_logo.png'), color: '#1E40AF' },
    { id: 'humo', name: 'Humo', logo: require('../../../assets/humo_logo.png'), color: '#F97316' },
  ];

  const handleAction = () => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      if ((method === 'uzcard' || method === 'humo') && step === 'checkout') {
        setStep('verify');
      } else {
        setShowSuccess(true);
      }
    }, 1500);
  };

  const handleFinish = () => {
    setShowSuccess(false);
    navigation.navigate('Dashboard');
  };

  const isRegional = method === 'uzcard' || method === 'humo';

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => step === 'verify' ? setStep('checkout') : navigation.goBack()} 
            style={[styles.backBtn, { backgroundColor: theme.card }]}
          >
            <ArrowLeft color={isDark ? theme.text : COLORS.gray[700]} size={24} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            {step === 'verify' ? 'SMS Tasdiqlash' : 'To\'lov'}
          </Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {step === 'checkout' ? (
            <>
              {/* Order Summary */}
              <View style={[styles.summaryCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <View style={styles.summaryTop}>
                  <View style={[styles.planIcon, { backgroundColor: isDark ? 'rgba(251, 146, 60, 0.1)' : '#FFF7ED' }]}>
                    <ShieldCheck color={COLORS.accent} size={24} />
                  </View>
                  <View style={styles.planInfo}>
                    <Text style={[styles.planLabel, { color: theme.textSecondary }]}>Tanlangan tarif</Text>
                    <Text style={[styles.planName, { color: theme.text }]}>{plan.title} Fanlari</Text>
                  </View>
                  <Text style={[styles.planPrice, { color: COLORS.accent }]}>{plan.price} UZS</Text>
                </View>
                <View style={[styles.divider, { backgroundColor: theme.border }]} />
                <View style={styles.summaryRow}>
                  <Text style={[styles.rowLabel, { color: theme.textSecondary }]}>To'lov muddati</Text>
                  <Text style={[styles.rowValue, { color: theme.text }]}>1 oy (Har oylik)</Text>
                </View>
              </View>

              {/* Payment Method Selector */}
              <Text style={[styles.sectionTitle, { color: theme.text }]}>To'lov usuli</Text>
              <View style={styles.methodsGrid}>
                {PAYMENT_METHODS.map((m) => (
                  <TouchableOpacity
                    key={m.id}
                    onPress={() => setMethod(m.id)}
                    style={[
                      styles.methodCard,
                      { backgroundColor: theme.card, borderColor: theme.border },
                      method === m.id && { borderColor: m.color, backgroundColor: isDark ? m.color + '15' : m.color + '05' }
                    ]}
                  >
                    <Image source={m.logo} style={styles.methodLogo} resizeMode="contain" />
                    {method === m.id && (
                      <View style={[styles.checkDot, { backgroundColor: m.color }]}>
                        <CheckCircle2 color={COLORS.white} size={10} />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              {/* Dynamic Form */}
              {isRegional ? (
                <View style={[styles.cardForm, { backgroundColor: theme.card, borderColor: theme.border }]}>
                   <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Karta raqami</Text>
                   <View style={[styles.inputWrapper, { backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', borderColor: theme.border }]}>
                     <CreditCard color={isDark ? theme.textSecondary : COLORS.gray[400]} size={20} />
                     <TextInput
                       style={[styles.input, { color: theme.text }]}
                       placeholder="8600 .... .... ...."
                       placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : COLORS.gray[400]}
                       keyboardType="numeric"
                       maxLength={19}
                       value={cardNumber}
                       onChangeText={setCardNumber}
                     />
                   </View>

                   <View style={styles.rowInputs}>
                     <View style={{ flex: 1.2 }}>
                       <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Telefon raqamingiz</Text>
                       <View style={[styles.inputWrapper, { backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', borderColor: theme.border }]}>
                         <Phone color={isDark ? theme.textSecondary : COLORS.gray[400]} size={18} />
                         <TextInput
                           style={[styles.input, { color: theme.text }]}
                           placeholder="+998 90 ..."
                           placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : COLORS.gray[400]}
                           keyboardType="phone-pad"
                           value={phoneNumber}
                           onChangeText={setPhoneNumber}
                         />
                       </View>
                     </View>
                     <View style={{ flex: 1 }}>
                       <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Muddati</Text>
                       <View style={[styles.inputWrapper, { backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', borderColor: theme.border }]}>
                         <TextInput
                           style={[styles.input, { color: theme.text }]}
                           placeholder="MM/YY"
                           placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : COLORS.gray[400]}
                           keyboardType="numeric"
                           maxLength={5}
                         />
                       </View>
                     </View>
                   </View>
                </View>
              ) : (
                <View style={[styles.infoBox, { backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#F1F5F9' }]}>
                  <Smartphone color={theme.textSecondary} size={20} />
                  <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                    Siz {method === 'payme' ? 'Payme' : 'Click'} ilovasiga yo'naltirilasiz.
                  </Text>
                </View>
              )}
            </>
          ) : (
            /* SMS Verification Step */
            <View style={styles.verifyContainer}>
               <View style={[styles.verifyBadge, { backgroundColor: isDark ? 'rgba(251, 146, 60, 0.1)' : COLORS.accent + '15' }]}>
                  <KeyRound color={COLORS.accent} size={32} />
               </View>
               <Text style={[styles.verifyTitle, { color: theme.text }]}>SMS Tasdiqlash</Text>
               <Text style={[styles.verifySub, { color: theme.textSecondary }]}>
                 Karta ulangan telefon raqamingizga 6 xonali kod yuborildi. Uni quyida kiriting.
               </Text>
               
               <View style={[styles.smsInputWrapper, { backgroundColor: theme.card, borderColor: isDark ? COLORS.accent + '60' : COLORS.accent + '30' }]}>
                 <TextInput
                   style={[styles.smsInput, { color: theme.text }]}
                   placeholder="0 0 0 0 0 0"
                   placeholderTextColor={isDark ? 'rgba(255,255,255,0.1)' : COLORS.gray[200]}
                   keyboardType="numeric"
                   maxLength={6}
                   letterSpacing={10}
                   autoFocus
                   value={smsCode}
                   onChangeText={setSmsCode}
                 />
               </View>

               <TouchableOpacity style={styles.resendBtn}>
                 <Text style={styles.resendText}>Kodni qayta yuborish (45s)</Text>
               </TouchableOpacity>
            </View>
          )}

          <View style={styles.securityBox}>
            <Lock color={COLORS.success} size={14} />
            <Text style={[styles.securityText, { color: theme.textSecondary }]}>IQROMAX xavfsiz to'lov tizimi</Text>
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={[styles.footer, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <TouchableOpacity 
            style={styles.payBtn}
            onPress={handleAction}
            disabled={loading}
          >
            <LinearGradient
              colors={isDark ? ['#1E293B', '#0F172A'] : ['#0F172A', '#1E293B']}
              style={styles.btnGradient}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                  <Text style={styles.payBtnText}>
                    {step === 'verify' ? 'TASDIQLASH' : (isRegional ? 'TO\'LOVNI TASDIQLASH' : 'TO\'LOVGA O\'TISH')}
                  </Text>
                  <ChevronRight color={COLORS.white} size={20} />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Success Modal */}
        <Modal visible={showSuccess} transparent={true} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
              <View style={styles.successIcon}>
                <CheckCircle2 color={isDark ? theme.glow : COLORS.success} size={64} />
              </View>
              <Text style={[styles.successTitle, { color: theme.text }]}>Muvaffaqiyatli!</Text>
              <Text style={[styles.successDesc, { color: theme.textSecondary }]}>
                Sizning Premium obunangiz faollashtirildi. Barkamol avlod sari olg'a!
              </Text>
              <TouchableOpacity style={[styles.finishBtn, { backgroundColor: isDark ? theme.primary : '#0F172A' }]} onPress={handleFinish}>
                <Text style={styles.finishBtnText}>DAVOM ETISH</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFB' },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 15,
  },
  backBtn: {
    width: 44, height: 44, borderRadius: 14, backgroundColor: COLORS.white,
    justifyContent: 'center', alignItems: 'center', ...SHADOWS.light,
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  
  summaryCard: {
    backgroundColor: COLORS.white, borderRadius: 24, padding: 20,
    ...SHADOWS.light, marginTop: 10, marginBottom: 25,
  },
  summaryTop: { flexDirection: 'row', alignItems: 'center' },
  planIcon: {
    width: 44, height: 44, borderRadius: 12, backgroundColor: COLORS.accent + '15',
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  planInfo: { flex: 1 },
  planLabel: { fontSize: 11, color: COLORS.gray[400], fontWeight: '600' },
  planName: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
  planPrice: { fontSize: 16, fontWeight: '900', color: COLORS.accent },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 15 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  rowLabel: { fontSize: 13, color: COLORS.gray[500], fontWeight: '500' },
  rowValue: { fontSize: 13, color: '#0F172A', fontWeight: '700' },

  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginBottom: 15 },
  methodsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 25 },
  methodCard: {
    width: (width - 50) / 2, backgroundColor: COLORS.white, borderRadius: 16,
    height: 90, padding: 15, borderWidth: 2, borderColor: 'transparent',
    alignItems: 'center', justifyContent: 'center', ...SHADOWS.light,
  },
  methodLogo: { width: '85%', height: 45 },
  methodName: { fontSize: 12, fontWeight: '700', color: '#1E293B', marginTop: 5 },
  checkDot: {
    position: 'absolute', top: 8, right: 8, width: 16, height: 16,
    borderRadius: 8, justifyContent: 'center', alignItems: 'center',
  },

  cardForm: { gap: 12, marginBottom: 20 },
  inputLabel: { fontSize: 12, fontWeight: '700', color: '#64748B', marginBottom: 4 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white,
    borderRadius: 14, paddingHorizontal: 15, height: 50,
    borderWidth: 1, borderColor: '#E2E8F0', gap: 10,
  },
  input: { flex: 1, fontSize: 14, fontWeight: '600', color: '#0F172A' },
  rowInputs: { flexDirection: 'row', gap: 12 },

  infoBox: {
    flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 16,
    padding: 15, gap: 12, marginBottom: 20,
  },
  infoText: { flex: 1, fontSize: 13, color: '#64748B', lineHeight: 18, fontWeight: '500' },

  verifyContainer: { alignItems: 'center', marginTop: 20 },
  verifyBadge: {
    width: 80, height: 80, borderRadius: 25, backgroundColor: COLORS.accent + '15',
    justifyContent: 'center', alignItems: 'center', marginBottom: 20,
  },
  verifyTitle: { fontSize: 24, fontWeight: '900', color: '#0F172A', marginBottom: 10 },
  verifySub: {
    fontSize: 14, color: COLORS.gray[500], textAlign: 'center',
    lineHeight: 22, paddingHorizontal: 20, marginBottom: 30,
  },
  smsInputWrapper: {
    backgroundColor: COLORS.white, borderRadius: 20, paddingHorizontal: 25,
    height: 70, justifyContent: 'center', ...SHADOWS.medium,
    borderWidth: 2, borderColor: COLORS.accent + '30',
  },
  smsInput: { fontSize: 28, fontWeight: '900', color: '#0F172A', textAlign: 'center' },
  resendBtn: { marginTop: 20 },
  resendText: { color: COLORS.accent, fontSize: 13, fontWeight: '700' },

  securityBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginVertical: 20 },
  securityText: { fontSize: 11, color: COLORS.gray[400], fontWeight: '600' },

  footer: { padding: 20, backgroundColor: COLORS.white, borderTopWidth: 1, borderColor: '#F1F5F9' },
  payBtn: { borderRadius: 18, overflow: 'hidden' },
  btnGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, gap: 10 },
  payBtnText: { color: COLORS.white, fontSize: 15, fontWeight: '900', letterSpacing: 1 },

  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center',
    alignItems: 'center', padding: 30,
  },
  modalContent: {
    backgroundColor: COLORS.white, borderRadius: 30, width: '100%',
    padding: 30, alignItems: 'center',
  },
  successIcon: { marginBottom: 20 },
  successTitle: { fontSize: 22, fontWeight: '900', color: '#0F172A', marginBottom: 10 },
  successDesc: {
    fontSize: 14, color: COLORS.gray[500], textAlign: 'center',
    lineHeight: 22, marginBottom: 25, fontWeight: '500',
  },
  finishBtn: { backgroundColor: '#0F172A', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 14 },
  finishBtnText: { color: COLORS.white, fontSize: 14, fontWeight: '900', letterSpacing: 1 },
});

export default PaymentCheckoutScreen;
