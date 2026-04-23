import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Dimensions, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, 
  Users, 
  Zap, 
  Calendar, 
  MoreVertical, 
  MessageSquare, 
  Edit, 
  Shield, 
  Trash2, 
  Archive,
  ChevronRight,
  X
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const GroupDetailScreen = ({ navigation }) => {
  const { isDark, theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: theme.card }]}>
          <ArrowLeft color={theme.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Guruh Tafsiloti</Text>
        <TouchableOpacity 
          style={[styles.backBtn, { backgroundColor: theme.card }]}
          onPress={() => setIsMenuOpen(true)}
        >
          <MoreVertical color={theme.text} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Banner Card */}
        <LinearGradient
          colors={['#0EA5E9', '#0284C7']}
          style={styles.groupHero}
        >
           <View>
              <Text style={styles.heroName}>Alpha Guruhi</Text>
              <Text style={styles.heroSubject}>Mental Arifmetika • Level 2</Text>
           </View>
           <View style={styles.heroStats}>
              <View style={styles.heroStatItem}>
                 <Text style={styles.statVal}>12</Text>
                 <Text style={styles.statLab}>O'quvchi</Text>
              </View>
              <View style={styles.heroStatItem}>
                 <Text style={styles.statVal}>85%</Text>
                 <Text style={styles.statLab}>Progress</Text>
              </View>
           </View>
        </LinearGradient>

        {/* Schedule Info */}
        <View style={[styles.infoRow, { backgroundColor: theme.card, borderColor: theme.border }]}>
           <Calendar color={COLORS.secondary} size={20} />
           <Text style={[styles.infoText, { color: theme.text }]}>Darslar: Dush, Chor, Juma — 14:00</Text>
        </View>

        {/* Students List */}
        <View style={styles.sectionHeader}>
           <Text style={[styles.sectionTitle, { color: theme.text }]}>O'quvchilar</Text>
        </View>

        {[1, 2, 3, 4].map(i => (
          <TouchableOpacity 
            key={i} 
            style={[styles.studentItem, { backgroundColor: theme.card, borderColor: theme.border }]}
            onPress={() => {}}
          >
             <Image source={{ uri: `https://i.pravatar.cc/100?u=s${i}` }} style={styles.avatar} />
             <View style={{ flex: 1 }}>
                <Text style={[styles.studentName, { color: theme.text }]}>O'quvchi Ismi {i}</Text>
                <Text style={[styles.studentMeta, { color: theme.textSecondary }]}>Reyting: 4.{i+5} • 24 ta dars</Text>
             </View>
             <TouchableOpacity 
               style={styles.msgBtn}
               onPress={() => navigation.navigate('TeacherChat', { studentId: i, name: `O'quvchi Ismi ${i}` })}
             >
                <MessageSquare color={COLORS.secondary} size={20} />
             </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Header Action Menu */}
      <Modal visible={isMenuOpen} transparent animationType="fade">
        <View style={styles.modalOverlay}>
           <BlurView intensity={20} style={StyleSheet.absoluteFill} />
           <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setIsMenuOpen(false)} />
           <View style={[styles.menuModal, { backgroundColor: theme.card }]}>
              <View style={styles.menuHeader}>
                 <Text style={[styles.menuTitle, { color: theme.text }]}>Guruh Sozlamalari</Text>
                 <TouchableOpacity onPress={() => setIsMenuOpen(false)} style={styles.closeBtn}>
                    <X color={theme.text} size={20} />
                 </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.menuItem} onPress={() => setIsMenuOpen(false)}>
                 <Edit color={theme.textSecondary} size={20} />
                 <Text style={[styles.menuText, { color: theme.text }]}>Guruhni tahrirlash</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => setIsMenuOpen(false)}>
                 <Users color={theme.textSecondary} size={20} />
                 <Text style={[styles.menuText, { color: theme.text }]}>O'quvchilarni tahrirlash</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => setIsMenuOpen(false)}>
                 <Archive color={theme.textSecondary} size={20} />
                 <Text style={[styles.menuText, { color: theme.text }]}>Guruhni arxivlash</Text>
              </TouchableOpacity>

              <View style={[styles.menuSeparator, { backgroundColor: theme.border }]} />

              <TouchableOpacity style={styles.menuItem} onPress={() => setIsMenuOpen(false)}>
                 <Trash2 color="#EF4444" size={20} />
                 <Text style={[styles.menuText, { color: '#EF4444' }]}>Guruhni butkul o'chirish</Text>
              </TouchableOpacity>
           </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  backBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', ...SHADOWS.light },
  title: { fontSize: 20, fontWeight: '900' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  groupHero: { padding: 25, borderRadius: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', ...SHADOWS.medium, marginBottom: 20 },
  heroName: { color: 'white', fontSize: 24, fontWeight: '900' },
  heroSubject: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: '600', marginTop: 4 },
  heroStats: { flexDirection: 'row', gap: 20 },
  heroStatItem: { alignItems: 'center' },
  statVal: { color: 'white', fontSize: 20, fontWeight: '900' },
  statLab: { color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: '700' },
  infoRow: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 18, borderWidth: 1, gap: 12, marginBottom: 25 },
  infoText: { fontSize: 14, fontWeight: '600' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '900' },
  addStudent: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  addText: { color: COLORS.secondary, fontWeight: '800' },
  studentItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 22, borderWidth: 1, marginBottom: 12, gap: 12, ...SHADOWS.light },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  studentName: { fontSize: 16, fontWeight: '800' },
  studentMeta: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  msgBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(234, 179, 8, 0.1)', justifyContent: 'center', alignItems: 'center' },

  // Modals
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  menuModal: { 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    padding: 25,
    paddingBottom: 40,
    ...SHADOWS.medium
  },
  menuHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  menuTitle: { fontSize: 20, fontWeight: '900' },
  closeBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.05)', justifyContent: 'center', alignItems: 'center' },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 15, 
    paddingVertical: 15 
  },
  menuText: { fontSize: 16, fontWeight: '700' },
  menuSeparator: { height: 1, marginVertical: 5, opacity: 0.5 },
});

export default GroupDetailScreen;
