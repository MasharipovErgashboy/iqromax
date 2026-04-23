import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SHADOWS, GLASS } from '../../constants/theme.js';
import { BarChart2, TrendingUp, Info, Download, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext.js';
import ParentPremiumBackground from '../../components/ParentPremiumBackground';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const ParentReports = ({ navigation }) => {
  const { isDark, theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <ParentPremiumBackground color1={isDark ? '#059669' : '#10B981'} color2={isDark ? '#0F172A' : '#1E293B'} />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Hisobotlar</Text>
          <TouchableOpacity 
            style={[styles.downloadBtn, isDark ? GLASS.dark : GLASS.light, { borderColor: COLORS.accent + '40' }]}
            onPress={() => Alert.alert('Hisobot tayyorlanmoqda', "Farzandingizning barcha ko'rsatkichlari PDF formatga o'tkazilmoqda. Tez orada yakunlanadi.")}
          >
            <Download color={COLORS.accent} size={20} />
            <Text style={styles.downloadText}>PDF</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Performance Overview Chart */}
          <BlurView intensity={isDark ? 30 : 50} style={[styles.chartCard, isDark ? GLASS.dark : GLASS.light]}>
            <View style={styles.cardHeader}>
               <View style={[styles.iconBox, { backgroundColor: COLORS.primary + '20' }]}>
                 <BarChart2 color={COLORS.primary} size={20} />
               </View>
               <Text style={[styles.cardTitle, { color: theme.text }]}>Oylik O'zlashtirish</Text>
            </View>
            
            <View style={styles.chartContainer}>
              {[40, 70, 45, 90, 65, 80].map((height, index) => (
                <View key={index} style={styles.barGroup}>
                  <LinearGradient
                    colors={[isDark ? '#10B981' : COLORS.primaryLight, COLORS.primary]}
                    style={[styles.bar, { height: height * 1.5 }]}
                  />
                  <Text style={[styles.barLabel, { color: theme.textSecondary }]}>{['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun'][index]}</Text>
                </View>
              ))}
            </View>
            
            <View style={[styles.chartInfo, { borderTopColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
              <TrendingUp color={isDark ? '#4ADE80' : COLORS.success} size={16} />
              <Text style={[styles.trendText, { color: isDark ? '#4ADE80' : COLORS.success }]}>O'tgan oyga nisbatan +12% o'sish</Text>
            </View>
          </BlurView>

          {/* Level Progress */}
          <View style={styles.sectionHeader}>
             <Text style={[styles.sectionTitle, { color: theme.text }]}>Fanlar bo'yicha tahlil</Text>
          </View>

          <TouchableOpacity 
            style={styles.subjectCardWrapper}
            onPress={() => navigation.navigate('SubjectDetail', { subjectName: 'Mental Arifmetika' })}
          >
            <BlurView intensity={isDark ? 20 : 40} style={[styles.subjectCard, isDark ? GLASS.dark : GLASS.light]}>
              <View style={[styles.subjectIcon, { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#F0F9FF' }]}>
                  <Text style={styles.subjectEmoji}>🧮</Text>
              </View>
              <View style={styles.subjectInfo}>
                  <Text style={[styles.subjectName, { color: theme.text }]}>Mental Arifmetika</Text>
                  <View style={[styles.progressBarBg, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9' }]}>
                    <View style={[styles.progressBarFill, { width: '85%', backgroundColor: '#10B981' }]} />
                  </View>
                  <Text style={[styles.progressText, { color: theme.textSecondary }]}>85% yakunlangan</Text>
              </View>
              <ChevronRight color={theme.textSecondary} size={20} />
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.subjectCardWrapper}
            onPress={() => navigation.navigate('SubjectDetail', { subjectName: 'Mantiqiy Mashqlar' })}
          >
            <BlurView intensity={isDark ? 20 : 40} style={[styles.subjectCard, isDark ? GLASS.dark : GLASS.light]}>
              <View style={[styles.subjectIcon, { backgroundColor: isDark ? 'rgba(236, 72, 153, 0.15)' : '#FDF2F8' }]}>
                  <Text style={styles.subjectEmoji}>🧩</Text>
              </View>
              <View style={styles.subjectInfo}>
                  <Text style={[styles.subjectName, { color: theme.text }]}>Mantiqiy Mashqlar</Text>
                  <View style={[styles.progressBarBg, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9' }]}>
                    <View style={[styles.progressBarFill, { width: '45%', backgroundColor: '#EC4899' }]} />
                  </View>
                  <Text style={[styles.progressText, { color: theme.textSecondary }]}>45% yakunlangan</Text>
              </View>
              <ChevronRight color={theme.textSecondary} size={20} />
            </BlurView>
          </TouchableOpacity>

          <BlurView intensity={isDark ? 30 : 50} style={[styles.insightBox, isDark ? GLASS.dark : GLASS.light, { borderColor: COLORS.accent + '30' }]}>
             <View style={styles.insightHeader}>
                <Info color={COLORS.accent} size={18} />
                <Text style={styles.insightTitle}>Tizim maslahati</Text>
             </View>
             <Text style={[styles.insightText, { color: isDark ? 'rgba(255,255,255,0.7)' : '#92400E' }]}>
               Farzandingiz Abakus simulyatorida juda faol, ammo Mantiq darslariga ko'proq vaqt ajratish tavsiya etiladi.
             </Text>
          </BlurView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.accent + '15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  downloadText: {
    color: COLORS.accent,
    fontWeight: '800',
    fontSize: 12,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 110,
  },
  chartCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    ...SHADOWS.medium,
    marginTop: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
    paddingHorizontal: 5,
  },
  barGroup: {
    alignItems: 'center',
    gap: 8,
  },
  bar: {
    width: 30,
    borderRadius: 6,
  },
  barLabel: {
    fontSize: 10,
    color: COLORS.gray[400],
    fontWeight: '600',
  },
  chartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  trendText: {
    fontSize: 12,
    color: COLORS.success,
    fontWeight: '700',
  },
  sectionHeader: {
    marginTop: 30,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1E293B',
  },
  subjectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 20,
    marginBottom: 12,
    ...SHADOWS.light,
  },
  subjectIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  subjectEmoji: {
    fontSize: 22,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    marginTop: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: COLORS.gray[400],
    marginTop: 5,
    fontWeight: '600',
  },
  insightBox: {
    backgroundColor: COLORS.accent + '10',
    borderRadius: 20,
    padding: 20,
    marginTop: 25,
    borderWidth: 1,
    borderColor: COLORS.accent + '20',
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  insightTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.accent,
  },
  insightText: {
    fontSize: 13,
    color: '#92400E',
    lineHeight: 18,
    fontWeight: '500',
  },
});

export default ParentReports;
