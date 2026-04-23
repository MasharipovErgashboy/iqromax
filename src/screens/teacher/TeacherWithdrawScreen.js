import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, 
  CreditCard, 
  ChevronRight, 
  CheckCircle2,
  Info,
  DollarSign
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const CardItem = ({ card, isSelected, onSelect, theme }) => (
  <TouchableOpacity 
    onPress={() => onSelect(card.id)}
    style={[
      styles.cardItem, 
      { backgroundColor: theme.card, borderColor: isSelected ? COLORS.secondary : theme.border },
      isSelected && SHADOWS.medium
    ]}
  >
    <View style={styles.cardInfo}>
       <View style={[styles.cardIconBox, { backgroundColor: isSelected ? COLORS.secondary + '20' : theme.background }]}>
          <CreditCard color={isSelected ? COLORS.secondary : theme.textSecondary} size={20} />
       </View>
       <View>
          <Text style={[styles.cardTitle, { color: theme.text }]}>{card.mask}</Text>
          <Text style={[styles.cardType, { color: theme.textSecondary }]}>{card.bank}</Text>
       </View>
    </View>
    {isSelected && <CheckCircle2 color={COLORS.secondary} size={20} />}
  </TouchableOpacity>
);

const TeacherWithdrawScreen = ({ navigation }) => {
  const { isDark, theme } = useTheme();
  const [amount, setAmount] = useState('');
  const [selectedCard, setSelectedCard] = useState('1');

  const SAVED_CARDS = [
    { id: '1', mask: '**** 8600', bank: 'Uzcard • NBU', type: 'uzcard' },
    { id: '2', mask: '**** 4444', bank: 'Humo • Agrobank', type: 'humo' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: theme.card }]}>
            <ArrowLeft color={theme.text} size={24} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.text }]}>Yechib olish</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Balance Preview */}
          <View style={styles.balancePreview}>
             <Text style={[styles.previewLabel, { color: theme.textSecondary }]}>Yechib olish mumkin</Text>
             <Text style={[styles.previewValue, { color: theme.text }]}>2,450,000 UZS</Text>
          </View>

          {/* Amount Section */}
          <View style={styles.section}>
             <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>MIQDORNI KIRITING</Text>
             <View style={[styles.amountContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <TextInput 
                   style={[styles.amountInput, { color: theme.text }]}
                   placeholder="0"
                   placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : COLORS.gray[300]}
                   keyboardType="numeric"
                   value={amount}
                   onChangeText={setAmount}
                   autoFocus
                />
                <Text style={styles.currencyLabel}>UZS</Text>
             </View>
             <View style={styles.quickAmounts}>
                {['500,000', '1,000,000', 'Barchasi'].map(val => (
                   <TouchableOpacity 
                     key={val} 
                     style={[styles.quickBtn, { backgroundColor: theme.card, borderColor: theme.border }]}
                     onPress={() => setAmount(val === 'Barchasi' ? '2450000' : val.replace(/,/g, ''))}
                   >
                      <Text style={[styles.quickText, { color: theme.text }]}>{val}</Text>
                   </TouchableOpacity>
                ))}
             </View>
          </View>

          {/* Card Selection */}
          <View style={styles.section}>
             <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>QABUL QILUVCHI KARTA</Text>
             {SAVED_CARDS.map(card => (
                <CardItem 
                  key={card.id} 
                  card={card} 
                  theme={theme} 
                  isSelected={selectedCard === card.id}
                  onSelect={setSelectedCard}
                />
             ))}
             <TouchableOpacity style={[styles.addCardBtn, { borderStyle: 'dotted', borderColor: theme.border }]}>
                <Text style={[styles.addCardText, { color: COLORS.secondary }]}>+ Yangi karta qo'shish</Text>
             </TouchableOpacity>
          </View>

          {/* Info Box */}
          <View style={[styles.infoBox, { backgroundColor: COLORS.secondary + '10' }]}>
             <Info color={COLORS.secondary} size={18} />
             <Text style={[styles.infoText, { color: isDark ? 'rgba(255,255,255,0.7)' : COLORS.gray[600] }]}>
                Pul o'tkazmasi 5-10 daqiqa ichida amalga oshiriladi. Komissiya 0%.
             </Text>
          </View>
        </ScrollView>

        <View style={[styles.footer, { backgroundColor: theme.card, borderColor: theme.border }]}>
           <TouchableOpacity 
             style={[styles.confirmBtn, !amount && { opacity: 0.5 }]}
             disabled={!amount}
             onPress={() => alert('Yechib olish so\'rovi yuborildi!')}
           >
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.gradient}
              >
                 <Text style={styles.confirmText}>TASDIQLASH</Text>
                 <ChevronRight color="white" size={20} />
              </LinearGradient>
           </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 15 },
  backBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', ...SHADOWS.light },
  title: { fontSize: 22, fontWeight: '900' },
  scrollContent: { padding: 20 },
  balancePreview: { alignItems: 'center', marginBottom: 35 },
  previewLabel: { fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  previewValue: { fontSize: 32, fontWeight: '900', marginTop: 8 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 12, fontWeight: '800', letterSpacing: 1.5, marginBottom: 15, marginLeft: 5 },
  amountContainer: { 
    height: 80, 
    borderRadius: 24, 
    borderWidth: 1.5, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 25,
    ...SHADOWS.light
  },
  amountInput: { flex: 1, fontSize: 36, fontWeight: '900' },
  currencyLabel: { fontSize: 18, fontWeight: '800', opacity: 0.5 },
  quickAmounts: { flexDirection: 'row', gap: 10, marginTop: 15 },
  quickBtn: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 12, borderWidth: 1 },
  quickText: { fontSize: 13, fontWeight: '700' },
  cardItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 18, 
    borderRadius: 22, 
    borderWidth: 2, 
    marginBottom: 12 
  },
  cardInfo: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  cardIconBox: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '800' },
  cardType: { fontSize: 12, fontWeight: '600', marginTop: 2 },
  addCardBtn: { 
    padding: 18, 
    borderRadius: 22, 
    borderWidth: 2, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  addCardText: { fontSize: 14, fontWeight: '800' },
  infoBox: { flexDirection: 'row', padding: 15, borderRadius: 18, gap: 12, marginTop: 10 },
  infoText: { flex: 1, fontSize: 13, lineHeight: 20, fontWeight: '600' },
  footer: { padding: 20, borderTopWidth: 1 },
  confirmBtn: { borderRadius: 20, overflow: 'hidden', ...SHADOWS.medium },
  gradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, gap: 10 },
  confirmText: { color: 'white', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
});

export default TeacherWithdrawScreen;
