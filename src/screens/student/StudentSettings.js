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
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, 
  Globe, 
  Moon, 
  Volume2, 
  RotateCcw, 
  ChevronRight, 
  Info, 
  Monitor,
  Eye,
  Settings,
  Check,
  X
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';

const { width, height } = Dimensions.get('window');

const LANGUAGES = [
  { id: 'uz', name: "O'zbek tili", code: 'UZ' },
  { id: 'ru', name: "Русский язык", code: 'RU' },
  { id: 'en', name: "English", code: 'EN' },
];

const StudentSettings = ({ navigation }) => {
  const { theme, isDark, toggleTheme } = useTheme();
  
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [selectedLang, setSelectedLang] = useState('uz');
  const [showLangModal, setShowLangModal] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCache = () => {
    setIsClearing(true);
    setTimeout(() => {
      setIsClearing(false);
      Alert.alert("Muvaffaqiyatli", "Kesh tozalandi! 64.5 MB joy bo'shatildi.");
    }, 2000);
  };

  const SettingCard = ({ icon: Icon, title, subtitle, value, onToggle, onPress, color = COLORS.primary, rightElement }) => (
    <TouchableOpacity 
      onPress={onPress}
      disabled={!onPress}
      style={[styles.settingItem, { backgroundColor: theme.card, borderColor: theme.border }]}
    >
      <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
         <Icon color={color} size={22} />
      </View>
      <View style={styles.textContainer}>
         <Text style={[styles.itemTitle, { color: theme.text }]}>{title}</Text>
         {subtitle && <Text style={[styles.itemSubtitle, { color: theme.textSecondary }]}>{subtitle}</Text>}
      </View>
      
      {onToggle ? (
        <Switch
          trackColor={{ false: '#CBD5E1', true: COLORS.primaryLight }}
          thumbColor={value ? COLORS.primary : '#F4F4F5'}
          onValueChange={onToggle}
          value={value}
        />
      ) : rightElement ? (
        rightElement
      ) : (
        <ChevronRight color={COLORS.gray[300]} size={20} />
      )}
    </TouchableOpacity>
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
              <Text style={[styles.headerTitle, { color: theme.text }]}>Sozlamalar</Text>
              <View style={{ width: 40 }} />
           </View>
        </SafeAreaView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
         
         <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>ILOVA INTERFEYSI</Text>
         <View style={styles.group}>
            <SettingCard 
              icon={Globe} 
              title="Ilova tili" 
              subtitle={`Hozirgi til: ${LANGUAGES.find(l => l.id === selectedLang)?.name}`}
              rightElement={<Text style={styles.langText}>{LANGUAGES.find(l => l.id === selectedLang)?.code}</Text>}
              onPress={() => setShowLangModal(true)}
              color="#3B82F6"
            />
            <SettingCard 
              icon={Moon} 
              title="Tungi mavzu" 
              subtitle="Ilova ko'rinishi rejimi"
              value={isDark}
              onToggle={toggleTheme}
              color="#6366F1"
            />
         </View>

         <Text style={[styles.sectionHeader, { color: theme.textSecondary, marginTop: 30 }]}>AUDIO VA TA'SIRLAR</Text>
         <View style={styles.group}>
            <SettingCard 
              icon={Volume2} 
              title="Ovozli effektlar" 
              subtitle="O'yin va tugma tovushlari"
              value={soundEnabled}
              onToggle={() => setSoundEnabled(!soundEnabled)}
              color="#10B981"
            />
            <SettingCard 
              icon={Monitor} 
              title="Vibratsiya (Haptic)" 
              subtitle="Harakatlarga sensorli javob"
              value={hapticEnabled}
              onToggle={() => setHapticEnabled(!hapticEnabled)}
              color="#F59E0B"
            />
         </View>

         <Text style={[styles.sectionHeader, { color: theme.textSecondary, marginTop: 30 }]}>MAXFIYLIK</Text>
         <View style={styles.group}>
            <SettingCard 
              icon={Eye} 
              title="Profil ko'rinishi" 
              subtitle="Boshqalar sizning natijangizni ko'rishi"
              onPress={() => {}}
              color="#EC4899"
            />
            <SettingCard 
              icon={RotateCcw} 
              title="Keshlarni tozalash" 
              subtitle={isClearing ? "Tozalanyapti..." : "64.5 MB joy bo'shatish"}
              onPress={handleClearCache}
              color={COLORS.gray[400]}
              rightElement={isClearing ? <ActivityIndicator size="small" color={COLORS.primary} /> : null}
            />
         </View>

         <Text style={[styles.sectionHeader, { color: theme.textSecondary, marginTop: 30 }]}>ILOVA HAQIDA</Text>
         <View style={styles.group}>
            <SettingCard 
              icon={Info} 
              title="Ilova haqida" 
              subtitle="Versiya 1.0.4, Yangilanish mavjud emas"
              onPress={() => {}}
            />
         </View>

         <View style={styles.footerInfo}>
             <Settings size={64} color={COLORS.gray[200]} />
             <Text style={[styles.versionText, { color: COLORS.gray[400] }]}>IqroMax Student App</Text>
             <Text style={[styles.copyright, { color: COLORS.gray[300] }]}>© 2024 Barcha huquqlar himoyalangan</Text>
         </View>

         <View style={{ height: 100 }} />
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        visible={showLangModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLangModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowLangModal(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
             <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.text }]}>Tilni tanlang</Text>
                <TouchableOpacity onPress={() => setShowLangModal(false)}>
                   <X color={theme.text} size={24} />
                </TouchableOpacity>
             </View>
             
             {LANGUAGES.map((lang) => (
                <TouchableOpacity 
                  key={lang.id} 
                  style={[styles.langItem, selectedLang === lang.id && { backgroundColor: COLORS.primary + '10' }]}
                  onPress={() => {
                    setSelectedLang(lang.id);
                    setShowLangModal(false);
                  }}
                >
                   <Text style={[styles.langName, { color: theme.text }, selectedLang === lang.id && { color: COLORS.primary, fontWeight: '800' }]}>{lang.name}</Text>
                   {selectedLang === lang.id && <Check color={COLORS.primary} size={20} />}
                </TouchableOpacity>
             ))}
          </View>
        </TouchableOpacity>
      </Modal>
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
  sectionHeader: { fontSize: 12, fontWeight: '800', marginBottom: 15, letterSpacing: 1 },
  group: { gap: 12 },
  settingItem: { flexDirection: 'row', alignItems: 'center', padding: 18, borderRadius: 24, borderWidth: 1, ...SHADOWS.light },
  iconBox: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  textContainer: { flex: 1, paddingHorizontal: 15 },
  itemTitle: { fontSize: 16, fontWeight: '700' },
  itemSubtitle: { fontSize: 12, marginTop: 2 },
  langText: { fontSize: 14, fontWeight: '800', color: COLORS.primary },

  footerInfo: { marginTop: 60, alignItems: 'center', gap: 12 },
  versionText: { fontSize: 13, fontWeight: '800' },
  copyright: { fontSize: 11, fontWeight: '600' },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 25, paddingBottom: 50 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  modalTitle: { fontSize: 20, fontWeight: '900' },
  langItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 18, paddingHorizontal: 20, borderRadius: 18, marginBottom: 10 },
  langName: { fontSize: 16, fontWeight: '600' },
});

export default StudentSettings;
