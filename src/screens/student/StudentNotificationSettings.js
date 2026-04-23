import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, 
  Bell, 
  Tv, 
  BookOpen, 
  Zap, 
  MessageSquare, 
  Smartphone, 
  Mail,
  Volume2
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';

const { width } = Dimensions.get('window');

const NotificationSettingsScreen = ({ navigation }) => {
  const { theme, isDark } = useTheme();

  const [settings, setSettings] = useState({
    liveDars: true,
    uyVazifasi: true,
    yutuqlar: true,
    xabarlar: false,
    pushNotif: true,
    emailNotif: false,
    sound: true
  });

  const toggleSwitch = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const SettingRow = ({ icon: Icon, title, subtitle, value, onToggle, color = COLORS.primary }) => (
    <View style={[styles.settingItem, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
         <Icon color={color} size={22} />
      </View>
      <View style={styles.textContainer}>
         <Text style={[styles.itemTitle, { color: theme.text }]}>{title}</Text>
         <Text style={[styles.itemSubtitle, { color: theme.textSecondary }]}>{subtitle}</Text>
      </View>
      <Switch
        trackColor={{ false: '#CBD5E1', true: COLORS.primaryLight }}
        thumbColor={value ? COLORS.primary : '#F4F4F5'}
        ios_backgroundColor="#CBD5E1"
        onValueChange={onToggle}
        value={value}
      />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <SafeAreaView edges={['top']}>
           <View style={styles.headerTop}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                 <ArrowLeft color={theme.text} size={24} />
              </TouchableOpacity>
              <Text style={[styles.headerTitle, { color: theme.text }]}>Bildirishnomalar</Text>
              <View style={{ width: 40 }} />
           </View>
        </SafeAreaView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
         <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>DARSLAR VA HARAKATLAR</Text>
         <View style={styles.group}>
            <SettingRow 
              icon={Tv} 
              title="Jonli darslar" 
              subtitle="Dars boshlanishi haqida ogohlantirish" 
              value={settings.liveDars} 
              onToggle={() => toggleSwitch('liveDars')}
              color="#22C55E"
            />
            <SettingRow 
              icon={BookOpen} 
              title="Uy vazifalari" 
              subtitle="Yangi vazifa berilganda bildirishnoma" 
              value={settings.uyVazifasi} 
              onToggle={() => toggleSwitch('uyVazifasi')}
              color="#3B82F6"
            />
            <SettingRow 
              icon={Zap} 
              title="Yutuqlar" 
              subtitle="Yangi sovrin yoki XP olganingizda" 
              value={settings.yutuqlar} 
              onToggle={() => toggleSwitch('yutuqlar')}
              color="#F59E0B"
            />
            <SettingRow 
              icon={MessageSquare} 
              title="Xabarlar" 
              subtitle="Ustoziingizdan kelgan xabarlar" 
              value={settings.xabarlar} 
              onToggle={() => toggleSwitch('xabarlar')}
              color="#8B5CF6"
            />
         </View>

         <Text style={[styles.sectionTitle, { color: theme.textSecondary, marginTop: 30 }]}>XABARDOR QILISH TURI</Text>
         <View style={styles.group}>
            <SettingRow 
              icon={Smartphone} 
              title="Push bildirishnomalar" 
              subtitle="Telefoningizda qalqib chiquvchi xabar" 
              value={settings.pushNotif} 
              onToggle={() => toggleSwitch('pushNotif')}
            />
            <SettingRow 
              icon={Mail} 
              title="Email xabarlar" 
              subtitle="Pochtaga muhim xabarlarni yuborish" 
              value={settings.emailNotif} 
              onToggle={() => toggleSwitch('emailNotif')}
              color="#EC4899"
            />
            <SettingRow 
              icon={Volume2} 
              title="Ovozli bildirish" 
              subtitle="Xabar kelganda maxsus dars ovozi" 
              value={settings.sound} 
              onToggle={() => toggleSwitch('sound')}
              color="#10B981"
            />
         </View>

         <View style={[styles.infoBox, { backgroundColor: COLORS.primary + '10' }]}>
            <Bell size={20} color={COLORS.primary} />
            <Text style={[styles.infoText, { color: COLORS.gray[600] }]}>
               Siz bildirishnomalarni yoqish orqali muhim darslar va uy vazifalarini o'tkazib yubormaysiz.
            </Text>
         </View>

         <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 15, ...SHADOWS.light },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 60 },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '900' },
  
  scrollContent: { padding: 25 },
  sectionTitle: { fontSize: 13, fontWeight: '800', marginBottom: 15, letterSpacing: 1 },
  group: { gap: 12 },
  settingItem: { flexDirection: 'row', alignItems: 'center', padding: 18, borderRadius: 24, borderWidth: 1, ...SHADOWS.light },
  iconBox: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  textContainer: { flex: 1, paddingHorizontal: 15 },
  itemTitle: { fontSize: 16, fontWeight: '700' },
  itemSubtitle: { fontSize: 12, marginTop: 2 },

  infoBox: { flexDirection: 'row', padding: 20, borderRadius: 20, marginTop: 40, gap: 15, alignItems: 'center' },
  infoText: { flex: 1, fontSize: 13, lineHeight: 20, fontWeight: '500' },
});

export default NotificationSettingsScreen;
