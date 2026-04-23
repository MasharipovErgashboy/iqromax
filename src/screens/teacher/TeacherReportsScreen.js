import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { ArrowLeft, TrendingUp, BarChart3, PieChart, Download, Users, CheckCircle2, Star, Clock } from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const MetricCard = ({ title, value, sub, icon: Icon, color, theme }) => (
  <View style={[styles.metricCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
     <View style={[styles.metricHeader]}>
        <View style={[styles.metricIcon, { backgroundColor: color + '20' }]}>
           <Icon color={color} size={20} />
        </View>
        <Text style={[styles.metricValue, { color: theme.text }]}>{value}</Text>
     </View>
     <Text style={[styles.metricTitle, { color: theme.textSecondary }]}>{title}</Text>
     <Text style={[styles.metricSub, { color: color }]}>{sub}</Text>
  </View>
);

const TeacherReportsScreen = ({ navigation }) => {
  const { isDark, theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: theme.card }]}>
          <ArrowLeft color={theme.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Hisobotlar</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Stats Summary */}
        <View style={styles.metricsGrid}>
           <MetricCard 
              title="Davomat" 
              value="94%" 
              sub="+2% o'sish" 
              icon={Users} 
              color="#0EA5E9" 
              theme={theme} 
           />
           <MetricCard 
              title="Vazifalar" 
              value="88%" 
              sub="Yaxshi" 
              icon={CheckCircle2} 
              color="#10B981" 
              theme={theme} 
           />
           <MetricCard 
              title="Reyting" 
              value="4.8" 
              sub="A'lo" 
              icon={Star} 
              color="#FBBF24" 
              theme={theme} 
           />
           <MetricCard 
              title="Faollik" 
              value="92%" 
              sub="+5% o'sish" 
              icon={TrendingUp} 
              color="#F43F5E" 
              theme={theme} 
           />
        </View>

        {/* Learning Progress Chart */}
        <View style={[styles.chartCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
           <View style={styles.chartHeader}>
              <View>
                 <Text style={[styles.chartTitle, { color: theme.text }]}>O'zlashtirish darajasi</Text>
                 <Text style={[styles.chartSub, { color: theme.textSecondary }]}>Guruhlar kesimida (oylik)</Text>
              </View>
              <View style={styles.legend}>
                 <View style={[styles.dot, { backgroundColor: COLORS.secondary }]} />
                 <Text style={[styles.legendText, { color: theme.textSecondary }]}>Joriy</Text>
              </View>
           </View>

           <View style={styles.mockChart}>
              {[
                { label: 'Alpha', h: '85%' },
                { label: 'Beta', h: '60%' },
                { label: 'Gamma', h: '95%' },
                { label: 'Delta', h: '75%' },
                { label: 'Sigma', h: '90%' },
              ].map((item, index) => (
                <View key={index} style={styles.chartCol}>
                   <LinearGradient 
                     colors={[COLORS.secondary, '#FB923C']} 
                     style={[styles.chartBar, { height: item.h }]} 
                   >
                      <View style={styles.barTop} />
                   </LinearGradient>
                   <Text style={[styles.labelText, { color: theme.textSecondary }]}>{item.label}</Text>
                </View>
              ))}
           </View>
        </View>

        {/* Detailed Insights */}
        <View style={[styles.insightCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
           <Text style={[styles.insightTitle, { color: theme.text }]}>Muhim ko'rsatkichlar</Text>
           
           <View style={styles.insightRow}>
              <Clock color={theme.textSecondary} size={18} />
              <View style={styles.insightInfo}>
                 <Text style={[styles.insightLabel, { color: theme.textSecondary }]}>O'rtacha dars davomiyligi</Text>
                 <Text style={[styles.insightValue, { color: theme.text }]}>84 daqiqa</Text>
              </View>
           </View>

           <View style={styles.insightDivider} />

           <View style={styles.insightRow}>
              <Star color={theme.textSecondary} size={18} />
              <View style={styles.insightInfo}>
                 <Text style={[styles.insightLabel, { color: theme.textSecondary }]}>Eng yuqori natija (Gamma)</Text>
                 <Text style={[styles.insightValue, { color: theme.text }]}>98.4 ball</Text>
              </View>
           </View>
        </View>

        <TouchableOpacity style={styles.downloadBtn}>
           <LinearGradient colors={['#1F2937', '#111827']} style={styles.downloadGradient}>
              <Download color="white" size={20} />
              <Text style={styles.downloadText}>HISOBOTNI YUKLAB OLISH (PDF)</Text>
           </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 15 },
  backBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', ...SHADOWS.light },
  title: { fontSize: 24, fontWeight: '900' },
  scrollContent: { padding: 20 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  metricCard: { width: (width - 52) / 2, padding: 15, borderRadius: 24, borderWidth: 1, ...SHADOWS.light, gap: 10 },
  metricHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metricIcon: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  metricValue: { fontSize: 20, fontWeight: '900' },
  metricTitle: { fontSize: 13, fontWeight: '700' },
  metricSub: { fontSize: 11, fontWeight: '800' },
  chartCard: { padding: 20, borderRadius: 28, borderWidth: 1, ...SHADOWS.light, marginBottom: 20 },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 30 },
  chartTitle: { fontSize: 18, fontWeight: '900' },
  chartSub: { fontSize: 12, fontWeight: '600', marginTop: 4 },
  legend: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 11, fontWeight: '700' },
  mockChart: { height: 180, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: 5 },
  chartCol: { alignItems: 'center', gap: 12 },
  chartBar: { width: 32, borderRadius: 10, justifyContent: 'flex-start' },
  barTop: { height: 10, width: '100%', backgroundColor: 'rgba(255,255,255,0.2)', borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  labelText: { fontSize: 10, fontWeight: '800' },
  insightCard: { padding: 20, borderRadius: 28, borderWidth: 1, ...SHADOWS.light, marginBottom: 30 },
  insightTitle: { fontSize: 16, fontWeight: '900', marginBottom: 20 },
  insightRow: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  insightInfo: { flex: 1 },
  insightLabel: { fontSize: 12, fontWeight: '600' },
  insightValue: { fontSize: 15, fontWeight: '800', marginTop: 2 },
  insightDivider: { height: 1, backgroundColor: 'rgba(0,0,0,0.05)', marginVertical: 15 },
  downloadBtn: { borderRadius: 20, overflow: 'hidden', ...SHADOWS.medium },
  downloadGradient: { height: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  downloadText: { color: 'white', fontSize: 13, fontWeight: '900', letterSpacing: 1 },
});

export default TeacherReportsScreen;
