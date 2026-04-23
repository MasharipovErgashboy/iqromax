import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Switch, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { ArrowLeft, Lock, Fingerprint, ShieldCheck, ChevronRight } from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';

const SecurityItem = ({ icon: Icon, title, sub, rightElement, theme }) => (
  <View style={[styles.item, { borderBottomColor: theme.border }]}>
     <View style={styles.itemIconBg}>
        <Icon color={COLORS.secondary} size={22} />
     </View>
     <View style={styles.itemTextContent}>
        <Text style={[styles.itemTitle, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.itemSub, { color: theme.textSecondary }]}>{sub}</Text>
     </View>
     {rightElement || <ChevronRight color={theme.textSecondary} size={20} />}
  </View>
);

const TeacherSecurityScreen = ({ navigation }) => {
  const { isDark, theme } = useTheme();
  const [fa2Enabled, setFa2Enabled] = useState(true);
  const [faceIdEnabled, setFaceIdEnabled] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: theme.card }]}>
          <ArrowLeft color={theme.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Xavfsizlik</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionHeader}>
           <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>KIRISH SOZLAMALARI</Text>
        </View>
        <View style={[styles.group, { backgroundColor: theme.card, borderColor: theme.border }]}>
           <SecurityItem 
             icon={Lock} 
             title="Parolni o'zgartirish" 
             sub="Oxirgi marta 3 oy oldin o'zgartirilgan" 
             theme={theme} 
           />
           <SecurityItem 
             icon={ShieldCheck} 
             title="Ikki bosqichli autentifikatsiya" 
             sub="Hisobingizni qo'shimcha himoya qiling" 
             theme={theme}
             rightElement={<Switch value={fa2Enabled} onValueChange={setFa2Enabled} trackColor={{ false: '#767577', true: COLORS.secondary }} thumbColor={COLORS.white} />}
           />
           <SecurityItem 
             icon={Fingerprint} 
             title="Face ID / Barmoq izi" 
             sub="Tezkor va xavfsiz kirish" 
             theme={theme}
             rightElement={<Switch value={faceIdEnabled} onValueChange={setFaceIdEnabled} trackColor={{ false: '#767577', true: COLORS.secondary }} thumbColor={COLORS.white} />}
           />
        </View>

        <View style={styles.sectionHeader}>
           <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>QURILMALAR</Text>
        </View>
        <View style={[styles.group, { backgroundColor: theme.card, borderColor: theme.border }]}>
           <TouchableOpacity style={styles.deviceItem}>
              <View style={styles.activeDot} />
              <View style={{ flex: 1 }}>
                 <Text style={[styles.deviceName, { color: theme.text }]}>iPhone 14 Pro (Siz)</Text>
                 <Text style={[styles.deviceLocation, { color: theme.textSecondary }]}>Toshkent • Hozir faol</Text>
              </View>
           </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveBtn}>
           <Text style={styles.saveBtnText}>SAQLASH</Text>
        </TouchableOpacity>
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
  sectionHeader: { marginTop: 20, marginBottom: 12, marginLeft: 8 },
  sectionTitle: { fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  group: { borderRadius: 24, borderWidth: 1, overflow: 'hidden' },
  item: { flexDirection: 'row', alignItems: 'center', padding: 18, borderBottomWidth: 1, gap: 15 },
  itemIconBg: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(234, 179, 8, 0.1)', justifyContent: 'center', alignItems: 'center' },
  itemTextContent: { flex: 1 },
  itemTitle: { fontSize: 15, fontWeight: '700' },
  itemSub: { fontSize: 12, fontWeight: '500', marginTop: 2, opacity: 0.7 },
  deviceItem: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 15 },
  activeDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#10B981' },
  deviceName: { fontSize: 15, fontWeight: '700' },
  deviceLocation: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  saveBtn: { marginTop: 40, backgroundColor: COLORS.secondary, height: 58, borderRadius: 18, justifyContent: 'center', alignItems: 'center', ...SHADOWS.medium },
  saveBtnText: { color: 'white', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
});

export default TeacherSecurityScreen;
