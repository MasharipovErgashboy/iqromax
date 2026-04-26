import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ArrowLeft, 
  ChevronRight,
  Zap,
  Target,
  Clock,
  LayoutGrid,
  Trophy,
  Brain,
  Star,
  Calculator,
  Settings2
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING } from '../../constants/theme.js';

const { width } = Dimensions.get('window');

const AbacusPracticeSelection = ({ navigation }) => {
  const [formula, setFormula] = useState('oddiy');
  const [columns, setColumns] = useState(1);
  const [count, setCount] = useState(10);
  const [speed, setSpeed] = useState(1.5);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F8FAFC', '#F1F5F9']}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <ArrowLeft color="#1E293B" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Abakus sozlamalari</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Configuration Sections */}
        <View style={styles.configArea}>
          {/* Formulas */}
          <View style={styles.configSection}>
            <View style={styles.sectionHeader}>
               <Calculator color="#64748B" size={20} />
               <Text style={styles.sectionLabel}>Formula tanlash</Text>
            </View>
            <View style={styles.chipRow}>
              {['oddiy', '5 do\'stlari', '10 do\'stlari', 'aralash'].map(f => (
                <TouchableOpacity 
                  key={f}
                  onPress={() => setFormula(f)}
                  style={[styles.configChip, formula === f && styles.activeConfigChip]}
                >
                  <Text style={[styles.configChipText, formula === f && styles.activeConfigChipText]}>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Columns */}
          <View style={styles.configSection}>
            <View style={styles.sectionHeader}>
               <Settings2 color="#64748B" size={20} />
               <Text style={styles.sectionLabel}>Ustunlar soni</Text>
            </View>
            <View style={styles.chipRow}>
              {[1, 2, 3, 4, 5].map(c => (
                <TouchableOpacity 
                  key={c}
                  onPress={() => setColumns(c)}
                  style={[styles.configChip, columns === c && styles.activeConfigChip]}
                >
                  <Text style={[styles.configChipText, columns === c && styles.activeConfigChipText]}>
                    {c} ustun
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Count */}
          <View style={styles.configSection}>
            <View style={styles.sectionHeader}>
               <LayoutGrid color="#64748B" size={20} />
               <Text style={styles.sectionLabel}>Misollar soni</Text>
            </View>
            <View style={styles.chipRow}>
              {[5, 10, 15, 20, 30].map(c => (
                <TouchableOpacity 
                  key={c}
                  onPress={() => setCount(c)}
                  style={[styles.configChip, count === c && styles.activeConfigChip]}
                >
                  <Text style={[styles.configChipText, count === c && styles.activeConfigChipText]}>
                    {c} ta
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Speed */}
          <View style={styles.configSection}>
            <View style={styles.sectionHeader}>
               <Clock color="#64748B" size={20} />
               <Text style={styles.sectionLabel}>Tezlik (soniya)</Text>
            </View>
            <View style={styles.chipRow}>
              {[0.5, 1.0, 1.5, 2.0, 3.0].map(s => (
                <TouchableOpacity 
                  key={s}
                  onPress={() => setSpeed(s)}
                  style={[styles.configChip, speed === s && styles.activeConfigChip]}
                >
                  <Text style={[styles.configChipText, speed === s && styles.activeConfigChipText]}>
                    {s}s
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Promo Image / Tip */}
        <View style={styles.tipCard}>
           <View style={styles.tipIcon}>
              <Star color="#F59E0B" fill="#F59E0B" size={20} />
           </View>
           <Text style={styles.tipText}>
             Abakus Master rejimida har bir to'g'ri javob uchun 2 barobar ko'proq XP beriladi!
           </Text>
        </View>

        <TouchableOpacity 
          style={styles.startBtn}
          onPress={() => navigation.navigate('AbacusSimulator', { 
            mode: 'level',
            config: {
              formula: formula,
              range: columns,
              count: count,
              speed: speed * 1000
            }
          })}
        >
          <LinearGradient
            colors={['#6366F1', '#4F46E5']}
            style={styles.startBtnGradient}
          >
            <Text style={styles.startBtnText}>Abakusni boshlash</Text>
            <ChevronRight color="white" size={20} />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 15,
  },
  modeContainer: {
    paddingBottom: 25,
    gap: 12,
  },
  modeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    ...SHADOWS.light,
  },
  modeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  configArea: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 20,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 20,
  },
  configSection: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  configChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  activeConfigChip: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
  },
  configChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  activeConfigChipText: {
    color: '#6366F1',
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFBEB',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    gap: 12,
    marginBottom: 30,
  },
  tipIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipText: {
    flex: 1,
    fontSize: 12,
    color: '#92400E',
    fontWeight: '600',
    lineHeight: 18,
  },
  startBtn: {
    borderRadius: 22,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  startBtnGradient: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  startBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});

export default AbacusPracticeSelection;
