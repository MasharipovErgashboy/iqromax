import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { ArrowLeft, Bell, MessageSquare, Zap, Clock, Shield } from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';

const NotifSettingItem = ({ icon: Icon, title, sub, value, onToggle, theme }) => (
  <View style={[styles.item, { borderBottomColor: theme.border }]}>
     <View style={[styles.itemIconBg, { backgroundColor: COLORS.secondary + '15' }]}>
        <Icon color={COLORS.secondary} size={22} />
     </View>
     <View style={styles.itemTextContent}>
        <Text style={[styles.itemTitle, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.itemSub, { color: theme.textSecondary }]}>{sub}</Text>
     </View>
     <Switch 
       value={value} 
       onValueChange={onToggle} 
       trackColor={{ false: '#767577', true: COLORS.secondary }} 
       thumbColor={COLORS.white} 
     />
  </View>
);

const TeacherNotifSettings = ({ navigation }) => {
  const { isDark, theme } = useTheme();
  const [settings, setSettings] = useState({
    push: true,
    messages: true,
    live: true,
    attendance: false,
    security: true
  });

  const toggleSetting = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: theme.card }]}>
          <ArrowLeft color={theme.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Bildirishnomalar</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionHeader}>
           <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>YALPI SOZLAMALAR</Text>
        </View>
        <View style={[styles.group, { backgroundColor: theme.card, borderColor: theme.border }]}>
           <NotifSettingItem 
             icon={Bell} 
             title="Push bildirishnomalar" 
             sub="Barcha turdagi xabarnomalarni yoqish" 
             value={settings.push}
             onToggle={() => toggleSetting('push')}
             theme={theme} 
           />
        </View>

        <View style={styles.sectionHeader}>
           <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>KATEGORIYALAR</Text>
        </View>
        <View style={[styles.group, { backgroundColor: theme.card, borderColor: theme.border }]}>
           <NotifSettingItem 
             icon={MessageSquare} 
             title="Xabarlar" 
             sub="Chatdagi yangi xabarlar haqida" 
             value={settings.messages}
             onToggle={() => toggleSetting('messages')}
             theme={theme} 
           />
           <NotifSettingItem 
             icon={Zap} 
             title="Jonli darslar" 
             sub="Dars boshlanishi haqida ogohlantirish" 
             value={settings.live}
             onToggle={() => toggleSetting('live')}
             theme={theme} 
           />
           <NotifSettingItem 
             icon={Clock} 
             title="Davomat hisoboti" 
             sub="Darsdan keyingi avtomatik hisobotlar" 
             value={settings.attendance}
             onToggle={() => toggleSetting('attendance')}
             theme={theme} 
           />
           <NotifSettingItem 
             icon={Shield} 
             title="Xavfsizlik" 
             sub="Kirish va profil o'zgarishlari" 
             value={settings.security}
             onToggle={() => toggleSetting('security')}
             theme={theme} 
           />
        </View>
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
  itemIconBg: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  itemTextContent: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: '700' },
  itemSub: { fontSize: 12, fontWeight: '500', marginTop: 2, opacity: 0.7 },
});

export default TeacherNotifSettings;
