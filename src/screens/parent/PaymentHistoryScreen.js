import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SHADOWS } from '../../constants/theme.js';
import {
  ArrowLeft, CreditCard, CheckCircle, Clock, Download,
  ChevronRight, Wallet, TrendingUp,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const PAYMENTS = [
  { id: 1, title: "Premium obuna — Aprel", amount: "120,000 so'm", date: "01 Aprel, 2026", status: 'paid', method: "Payme" },
  { id: 2, title: "Premium obuna — Mart", amount: "120,000 so'm", date: "01 Mart, 2026", status: 'paid', method: "Click" },
  { id: 3, title: "Qo'shimcha fan: Mantiq", amount: "50,000 so'm", date: "15 Fevral, 2026", status: 'paid', method: "Payme" },
  { id: 4, title: "Premium obuna — Fevral", amount: "120,000 so'm", date: "01 Fevral, 2026", status: 'paid', method: "Uzcard" },
  { id: 5, title: "Premium obuna — Yanvar", amount: "120,000 so'm", date: "01 Yanvar, 2026", status: 'paid', method: "Click" },
];

const PaymentHistoryScreen = ({ navigation }) => {
  const totalPaid = "530,000 so'm";

  return (
    <View style={s.root}>
      <LinearGradient colors={['#0F172A', '#1E293B']} style={s.hero}>
        <SafeAreaView>
          <View style={s.topNav}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
              <ArrowLeft color="rgba(255,255,255,0.85)" size={22} />
            </TouchableOpacity>
            <Text style={s.heroTitle}>To'lovlar tarixi</Text>
            <View style={{ width: 44 }} />
          </View>

          {/* Summary card */}
          <View style={s.summaryCard}>
            <View style={s.summaryLeft}>
              <Text style={s.summaryLabel}>UMUMIY TO'LANGAN</Text>
              <Text style={s.summaryAmount}>{totalPaid}</Text>
              <View style={s.activeBadge}>
                <CheckCircle color={COLORS.primary} size={12} />
                <Text style={s.activeText}>Premium faol</Text>
              </View>
            </View>
            <View style={s.summaryRight}>
              <Wallet color={COLORS.accent} size={36} strokeWidth={1.5} />
            </View>
          </View>

          {/* Quick stats */}
          <View style={s.statsRow}>
            <View style={s.statTile}>
              <Text style={s.statVal}>{PAYMENTS.length}</Text>
              <Text style={s.statLab}>To'lovlar</Text>
            </View>
            <View style={s.statTile}>
              <Text style={s.statVal}>5 oy</Text>
              <Text style={s.statLab}>Obuna muddati</Text>
            </View>
            <View style={s.statTile}>
              <Text style={[s.statVal, { color: COLORS.primary }]}>Faol</Text>
              <Text style={s.statLab}>Holat</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.body}>
        <Text style={s.sectionLabel}>BARCHA TO'LOVLAR</Text>

        {PAYMENTS.map((p) => (
          <TouchableOpacity key={p.id} style={s.payCard} activeOpacity={0.8}>
            <View style={s.payLeft}>
              <View style={s.payIcon}>
                <CreditCard color={COLORS.accent} size={20} />
              </View>
            </View>
            <View style={s.payBody}>
              <Text style={s.payTitle}>{p.title}</Text>
              <View style={s.payMeta}>
                <Clock color={COLORS.gray[300]} size={11} />
                <Text style={s.payDate}>{p.date} • {p.method}</Text>
              </View>
            </View>
            <View style={s.payRight}>
              <Text style={s.payAmount}>{p.amount}</Text>
              <View style={s.payStatus}>
                <CheckCircle color={COLORS.primary} size={12} />
                <Text style={s.payStatusText}>To'langan</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={s.downloadBtn}>
          <Download color={COLORS.accent} size={18} />
          <Text style={s.downloadText}>To'lovlar hisobotini yuklab olish</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F1F5F9' },
  hero: { paddingBottom: 16 },
  topNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: Platform.OS === 'ios' ? 4 : 18, paddingBottom: 10 },
  backBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  heroTitle: { color: COLORS.white, fontSize: 18, fontWeight: '900' },

  summaryCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 18, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  summaryLeft: { flex: 1 },
  summaryLabel: { color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: '800', letterSpacing: 1, marginBottom: 6 },
  summaryAmount: { color: COLORS.white, fontSize: 26, fontWeight: '900' },
  activeBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 8, backgroundColor: COLORS.primary + '20', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, alignSelf: 'flex-start' },
  activeText: { color: COLORS.primary, fontSize: 11, fontWeight: '800' },
  summaryRight: { width: 60, height: 60, borderRadius: 20, backgroundColor: COLORS.accent + '15', alignItems: 'center', justifyContent: 'center' },

  statsRow: { flexDirection: 'row', gap: 10, marginHorizontal: 18, marginTop: 14 },
  statTile: { flex: 1, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 18, padding: 14, alignItems: 'center' },
  statVal: { color: COLORS.white, fontSize: 16, fontWeight: '900' },
  statLab: { color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: '600', marginTop: 4 },

  body: { paddingHorizontal: 18, paddingBottom: 48 },
  sectionLabel: { fontSize: 11, fontWeight: '800', color: COLORS.gray[400], letterSpacing: 1, marginBottom: 14, marginTop: 20, paddingLeft: 4 },

  payCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 22, padding: 16, marginBottom: 10, gap: 14, ...SHADOWS.light },
  payLeft: {},
  payIcon: { width: 46, height: 46, borderRadius: 15, backgroundColor: '#FFF7ED', alignItems: 'center', justifyContent: 'center' },
  payBody: { flex: 1 },
  payTitle: { fontSize: 14, fontWeight: '800', color: '#1E293B' },
  payMeta: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  payDate: { fontSize: 11, color: COLORS.gray[400], fontWeight: '500' },
  payRight: { alignItems: 'flex-end' },
  payAmount: { fontSize: 14, fontWeight: '900', color: '#0F172A' },
  payStatus: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  payStatusText: { fontSize: 10, color: COLORS.primary, fontWeight: '700' },

  downloadBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 20, paddingVertical: 16, borderRadius: 20, borderWidth: 1.5, borderColor: COLORS.accent + '30', borderStyle: 'dashed' },
  downloadText: { fontSize: 14, fontWeight: '800', color: COLORS.accent },
});

export default PaymentHistoryScreen;
