import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  TextInput,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, 
  Clock, 
  Zap, 
  Camera, 
  FilePlus, 
  Send,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ChevronRight
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const StudentHomework = ({ navigation, route }) => {
  const { isDark, theme } = useTheme();
  const { task = { title: 'Oddiy sanoq mashqi', xp: 50, deadline: '24-Aprel, 20:00' } } = route.params || {};
  const [solution, setSolution] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
    // In a real app, this would be an API call
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <SafeAreaView edges={['top']} style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowLeft color={theme.text} size={24} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Uyga Vazifa</Text>
          <View style={{ width: 44 }} />
        </SafeAreaView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Task Info Card */}
        <LinearGradient
          colors={isDark ? ['#1E293B', '#0F172A'] : ['#F8FAFB', '#F1F5F9']}
          style={[styles.taskCard, { borderColor: theme.border }]}
        >
          <View style={styles.taskHeader}>
             <View style={styles.taskBadge}>
                <Zap color="#FBBF24" fill="#FBBF24" size={14} />
                <Text style={styles.xpText}>{task.xp} XP Ball</Text>
             </View>
             <View style={styles.deadlineRow}>
                <Clock color="#EF4444" size={14} />
                <Text style={styles.deadlineText}>{task.deadline}</Text>
             </View>
          </View>
          <Text style={[styles.taskTitle, { color: theme.text }]}>{task.title}</Text>
        </LinearGradient>

        <View style={styles.section}>
           <Text style={[styles.sectionTitle, { color: theme.text }]}>Topshiriq matni</Text>
           <Text style={[styles.taskDescription, { color: theme.textSecondary }]}>
              Abakusda 1 dan 10 gacha bo'lgan sonlarni terib chiqing. Har bir sonning to'g'ri terilganligini 
              rasmga tushirib, pastdagi bo'limga ilova qiling. {"\n\n"}
              Shuningdek, ushbu jarayon davomida qaysi sonni terishda qiynalganingizni yozib qoldiring.
           </Text>
           <Image 
             source={require('../../../assets/abacus_3d.png')} 
             style={styles.taskImage} 
             resizeMode="contain" 
           />
        </View>

        <View style={styles.section}>
           <Text style={[styles.sectionTitle, { color: theme.text }]}>Sizning javobingiz</Text>
           <View style={[styles.inputBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <TextInput 
                placeholder="Bu yerga yozing..." 
                placeholderTextColor={theme.textSecondary}
                multiline
                numberOfLines={6}
                value={solution}
                onChangeText={setSolution}
                style={[styles.textInput, { color: theme.text }]}
              />
           </View>

           <View style={styles.attachmentRow}>
              <TouchableOpacity style={[styles.attachmentBtn, { backgroundColor: theme.card, borderColor: theme.border }]}>
                 <Camera color={COLORS.primary} size={20} />
                 <Text style={[styles.attachmentLabel, { color: theme.text }]}>Rasm biriktirish</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.attachmentBtn, { backgroundColor: theme.card, borderColor: theme.border }]}>
                 <FilePlus color={COLORS.primary} size={20} />
                 <Text style={[styles.attachmentLabel, { color: theme.text }]}>Fayl tanlash</Text>
              </TouchableOpacity>
           </View>
        </View>

        {isSubmitted && (
          <View style={[styles.successBox, { backgroundColor: '#F0FDF4' }]}>
             <CheckCircle2 color="#22C55E" size={24} />
             <View style={{ flex: 1 }}>
                <Text style={styles.successTitle}>Vazifa yuborildi!</Text>
                <Text style={styles.successSub}>Tez orada ustoz tomonidan tekshiriladi.</Text>
             </View>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Footer Button */}
      {!isSubmitted && (
        <View style={[styles.footer, { backgroundColor: theme.background, borderTopColor: theme.border }]}>
          <TouchableOpacity 
            onPress={handleSubmit}
            style={styles.submitBtn}
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.btnGradient}
            >
               <Send color="white" size={20} />
               <Text style={styles.submitText}>VAZIFANI TOPSHIRISH</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { borderBottomWidth: 1 },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 },
  backBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900' },
  scrollContent: { padding: 25 },
  taskCard: { padding: 20, borderRadius: 25, borderWidth: 1, marginBottom: 30, ...SHADOWS.light },
  taskHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  taskBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(251, 191, 36, 0.15)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  xpText: { fontSize: 12, fontWeight: '900', color: '#D97706' },
  deadlineRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  deadlineText: { fontSize: 13, fontWeight: '700', color: '#EF4444' },
  taskTitle: { fontSize: 22, fontWeight: '900' },
  section: { marginBottom: 35 },
  sectionTitle: { fontSize: 18, fontWeight: '900', marginBottom: 15 },
  taskDescription: { fontSize: 15, lineHeight: 24, fontWeight: '500' },
  taskImage: { width: '100%', height: 200, marginTop: 20, borderRadius: 20 },
  inputBox: { borderRadius: 20, borderWidth: 1, padding: 15, minHeight: 150 },
  textInput: { fontSize: 15, lineHeight: 24, padding: 0 },
  attachmentRow: { flexDirection: 'row', gap: 12, marginTop: 15 },
  attachmentBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 15, borderRadius: 15, borderWidth: 1, borderStyle: 'dashed' },
  attachmentLabel: { fontSize: 13, fontWeight: '700' },
  successBox: { flexDirection: 'row', gap: 15, padding: 20, borderRadius: 22, alignItems: 'center' },
  successTitle: { fontSize: 16, fontWeight: '900', color: '#166534' },
  successSub: { fontSize: 13, fontWeight: '600', color: '#16A34A', marginTop: 2 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 25, paddingVertical: 20, paddingBottom: Platform.OS === 'ios' ? 40 : 25, borderTopWidth: 1 },
  submitBtn: { borderRadius: 22, overflow: 'hidden', ...SHADOWS.medium },
  btnGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, gap: 12 },
  submitText: { color: 'white', fontSize: 14, fontWeight: '900', letterSpacing: 1 },
});

export default StudentHomework;
