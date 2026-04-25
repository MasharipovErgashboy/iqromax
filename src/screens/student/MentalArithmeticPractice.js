import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView,
  Dimensions,
  StatusBar
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Play, Clock, Zap, Hash, ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const MentalArithmeticPractice = ({ navigation }) => {
  const [count, setCount] = useState(10);
  const [speed, setSpeed] = useState(1.0);
  const [range, setRange] = useState(1); // 1-digit, 2-digits

  const counts = [5, 10, 15, 20, 30, 50];
  const speeds = [0.3, 0.5, 0.8, 1.0, 1.5, 2.0];
  const ranges = [
    { label: '1 xonali (1-9)', val: 1 },
    { label: '2 xonali (10-99)', val: 2 },
    { label: 'Aralash', val: 3 }
  ];

  const handleStart = () => {
    navigation.navigate('MentalArithmetic', {
      config: { count, speed: speed * 1000, range }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient colors={['#F0FDFA', '#E0F2FE']} style={styles.gradient}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <ArrowLeft color="#1E293B" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Mashqlar</Text>
            <View style={{ width: 44 }} />
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.heroSection}>
               <View style={styles.heroIcon}>
                  <Zap color={COLORS.primary} size={40} fill={COLORS.primary} />
               </View>
               <Text style={styles.heroTitle}>O'zingizga moslang</Text>
               <Text style={styles.heroSub}>Tezlik va sonlar miqdorini belgilab, mahoratingizni oshiring</Text>
            </View>

            {/* Config Sections */}
            <View style={styles.section}>
               <View style={styles.sectionHeader}>
                  <Hash color={COLORS.primary} size={20} />
                  <Text style={styles.sectionLabel}>Sonlar miqdori</Text>
               </View>
               <View style={styles.optionsGrid}>
                  {counts.map(c => (
                    <TouchableOpacity 
                      key={c} 
                      style={[styles.optionBtn, count === c && styles.activeOption]}
                      onPress={() => setCount(c)}
                    >
                       <Text style={[styles.optionText, count === c && styles.activeOptionText]}>{c}</Text>
                    </TouchableOpacity>
                  ))}
               </View>
            </View>

            <View style={styles.section}>
               <View style={styles.sectionHeader}>
                  <Clock color={COLORS.primary} size={20} />
                  <Text style={styles.sectionLabel}>Tezlik (soniya)</Text>
               </View>
               <View style={styles.optionsGrid}>
                  {speeds.map(s => (
                    <TouchableOpacity 
                      key={s} 
                      style={[styles.optionBtn, speed === s && styles.activeOption]}
                      onPress={() => setSpeed(s)}
                    >
                       <Text style={[styles.optionText, speed === s && styles.activeOptionText]}>{s}s</Text>
                    </TouchableOpacity>
                  ))}
               </View>
            </View>

            <View style={styles.section}>
               <View style={styles.sectionHeader}>
                  <Zap color={COLORS.primary} size={20} />
                  <Text style={styles.sectionLabel}>Murakkablik</Text>
               </View>
               {ranges.map(r => (
                 <TouchableOpacity 
                   key={r.val} 
                   style={[styles.rangeItem, range === r.val && styles.activeRange]}
                   onPress={() => setRange(r.val)}
                 >
                    <Text style={[styles.rangeText, range === r.val && styles.activeRangeText]}>{r.label}</Text>
                    {range === r.val && <View style={styles.activeDot} />}
                 </TouchableOpacity>
               ))}
            </View>

            <View style={{ height: 40 }} />
          </ScrollView>

          <View style={styles.footer}>
             <TouchableOpacity style={styles.startBtn} onPress={handleStart}>
                <Text style={styles.startBtnText}>MASHQNI BOSHLASH</Text>
                <ChevronRight color="white" size={24} />
             </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  safeArea: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backBtn: { width: 44, height: 44, borderRadius: 15, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', ...SHADOWS.light },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#1E293B' },
  scrollContent: { paddingHorizontal: 25, paddingTop: 10 },
  heroSection: { alignItems: 'center', marginBottom: 35 },
  heroIcon: { width: 80, height: 80, borderRadius: 25, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginBottom: 20, ...SHADOWS.medium },
  heroTitle: { fontSize: 24, fontWeight: '900', color: '#0F172A', marginBottom: 8 },
  heroSub: { fontSize: 14, color: '#64748B', textAlign: 'center', fontWeight: '600', paddingHorizontal: 20 },
  section: { marginBottom: 30 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15 },
  sectionLabel: { fontSize: 16, fontWeight: '800', color: '#1E293B' },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  optionBtn: { width: (width - 80) / 3, height: 50, backgroundColor: 'white', borderRadius: 15, alignItems: 'center', justifyContent: 'center', ...SHADOWS.light },
  activeOption: { backgroundColor: COLORS.primary },
  optionText: { fontSize: 15, fontWeight: '800', color: '#475569' },
  activeOptionText: { color: 'white' },
  rangeItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    backgroundColor: 'white', 
    padding: 18, 
    borderRadius: 18, 
    marginBottom: 10,
    ...SHADOWS.light 
  },
  activeRange: { backgroundColor: COLORS.primary + '10', borderWidth: 1, borderColor: COLORS.primary },
  rangeText: { fontSize: 15, fontWeight: '700', color: '#475569' },
  activeRangeText: { color: COLORS.primary, fontWeight: '900' },
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary },
  footer: { padding: 25, backgroundColor: 'rgba(255,255,255,0.8)' },
  startBtn: { 
    flexDirection: 'row', 
    backgroundColor: COLORS.primary, 
    height: 65, 
    borderRadius: 22, 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 12, 
    ...SHADOWS.medium 
  },
  startBtnText: { color: 'white', fontSize: 18, fontWeight: '900', letterSpacing: 1 },
});

export default MentalArithmeticPractice;
