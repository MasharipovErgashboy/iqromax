import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { ArrowLeft, Wallet, TrendingUp, ArrowDownCircle, ArrowUpCircle } from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';

const TeacherBalanceScreen = ({ navigation }) => {
  const { isDark, theme } = useTheme();

  const TRANSACTIONS = [
     { id: 1, title: 'Dars uchun to\'lov', amount: '+450,000', date: 'Bugun, 15:30', type: 'in' },
     { id: 2, title: 'Kartaga o\'tkazish', amount: '-1,200,000', date: 'Kecha, 10:20', type: 'out' },
     { id: 3, title: 'Bonus (Reyting uchun)', amount: '+100,000', date: '12-aprel', type: 'in' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: theme.card }]}>
          <ArrowLeft color={theme.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Mening Balansim</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient 
          colors={['#10B981', '#059669']} 
          style={styles.balanceCard}
        >
           <Text style={styles.balanceLabel}>JAMI MABLAG'</Text>
           <Text style={styles.balanceValue}>2,450,000 UZS</Text>
           <View style={styles.balanceFooter}>
              <View style={styles.statBox}>
                 <TrendingUp color="rgba(255,255,255,0.7)" size={16} />
                 <Text style={styles.statText}>+15% bu oy</Text>
              </View>
              <TouchableOpacity 
                style={styles.withdrawBtn}
                onPress={() => navigation.navigate('TeacherWithdraw')}
              >
                 <Text style={styles.withdrawText}>YECHIB OLISH</Text>
              </TouchableOpacity>
           </View>
        </LinearGradient>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Oxirgi amallar</Text>
        {TRANSACTIONS.map(tx => (
          <View key={tx.id} style={[styles.txItem, { backgroundColor: theme.card, borderColor: theme.border }]}>
             <View style={[styles.txIcon, { backgroundColor: tx.type === 'in' ? '#DCFCE7' : '#FEE2E2' }]}>
                {tx.type === 'in' ? <ArrowDownCircle color="#10B981" size={24} /> : <ArrowUpCircle color="#EF4444" size={24} />}
             </View>
             <View style={{ flex: 1 }}>
                <Text style={[styles.txTitle, { color: theme.text }]}>{tx.title}</Text>
                <Text style={[styles.txDate, { color: theme.textSecondary }]}>{tx.date}</Text>
             </View>
             <Text style={[styles.txAmount, { color: tx.type === 'in' ? '#10B981' : '#EF4444' }]}>
                {tx.amount}
             </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 15 },
  backBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', ...SHADOWS.light },
  title: { fontSize: 22, fontWeight: '900' },
  scrollContent: { padding: 20 },
  balanceCard: { padding: 25, borderRadius: 28, ...SHADOWS.medium, marginBottom: 30 },
  balanceLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '800', letterSpacing: 1 },
  balanceValue: { color: 'white', fontSize: 32, fontWeight: '900', marginTop: 8 },
  balanceFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 25 },
  statBox: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statText: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: '600' },
  withdrawBtn: { backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 12 },
  withdrawText: { color: '#059669', fontSize: 12, fontWeight: '900' },
  sectionTitle: { fontSize: 18, fontWeight: '900', marginBottom: 15 },
  txItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 22, borderWidth: 1, marginBottom: 12, gap: 12 },
  txIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  txTitle: { fontSize: 16, fontWeight: '800' },
  txDate: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  txAmount: { fontSize: 16, fontWeight: '900' },
});

export default TeacherBalanceScreen;
