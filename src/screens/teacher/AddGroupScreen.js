import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, 
  TouchableOpacity, TextInput, StatusBar, KeyboardAvoidingView, Platform, Modal, Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { ArrowLeft, BookOpen, Users, Clock, Calendar, Check, X, UserCheck } from 'lucide-react-native';
import { COLORS, SHADOWS, BORDER_RADIUS, SPACING } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';

const AddGroupScreen = ({ navigation }) => {
  const { isDark, theme } = useTheme();
  const [groupName, setGroupName] = useState('');
  const [subject, setSubject] = useState('Mental Arifmetika');
  const [selectedDays, setSelectedDays] = useState(['Du', 'Ch', 'Ju']);
  const [showSuccess, setShowSuccess] = useState(false);

  const DAYS = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sha'];
  
  const mockStudents = [
    { id: 1, name: 'Alisher Axmedov', status: 'Yangi' },
    { id: 2, name: 'Malika Rixsiyeva', status: 'Yangi' },
    { id: 3, name: 'Jasur Bekmurodov', status: 'Yangi' },
  ];

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleCreate = () => {
    if (groupName.trim()) {
      setShowSuccess(true);
    } else {
      alert('Iltimos, guruh nomini kiriting');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: theme.card }]}>
            <ArrowLeft color={theme.text} size={24} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.text }]}>Yangi guruh</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            {/* Auto-fill Info Box */}
            <LinearGradient
               colors={isDark ? ['#1E293B', '#0F172A'] : ['#F0F9FF', '#E0F2FE']}
               style={styles.infoBox}
            >
               <UserCheck color="#0EA5E9" size={24} />
               <View style={{ flex: 1 }}>
                  <Text style={[styles.infoTitle, { color: '#0EA5E9' }]}>3 ta yangi o'quvchi biriktirildi</Text>
                  <Text style={[styles.infoSub, { color: theme.textSecondary }]}>Admin tomonidan sizga yangi o'quvchilar tavsiya etildi.</Text>
               </View>
            </LinearGradient>

            <View style={styles.inputGroup}>
               <Text style={[styles.label, { color: theme.textSecondary }]}>GURUH NOMI</Text>
               <View style={[styles.inputWrapper, { backgroundColor: theme.card, borderColor: theme.border }]}>
                  <Users color={COLORS.secondary} size={20} />
                  <TextInput 
                    style={[styles.input, { color: theme.text }]}
                    placeholder="Masalan: Alpha"
                    placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : COLORS.gray[400]}
                    value={groupName}
                    onChangeText={setGroupName}
                  />
               </View>
            </View>

            <View style={styles.inputGroup}>
               <Text style={[styles.label, { color: theme.textSecondary }]}>FAN (AVTOMATIK)</Text>
               <View style={[styles.inputWrapper, { backgroundColor: theme.card, borderColor: theme.border, opacity: 0.8 }]}>
                  <BookOpen color={COLORS.secondary} size={20} />
                  <TextInput 
                    style={[styles.input, { color: theme.text }]}
                    editable={false}
                    value={subject}
                  />
               </View>
            </View>

            <View style={styles.inputGroup}>
               <Text style={[styles.label, { color: theme.textSecondary }]}>DARS KUNLARI</Text>
               <View style={styles.daysPadding}>
                  {DAYS.map(day => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <TouchableOpacity 
                        key={day} 
                        onPress={() => toggleDay(day)}
                        style={[
                          styles.dayChip, 
                          { backgroundColor: isSelected ? COLORS.secondary : theme.card, borderColor: isSelected ? COLORS.secondary : theme.border }
                        ]}
                      >
                        <Text style={[styles.dayText, { color: isSelected ? 'white' : theme.text }]}>{day}</Text>
                      </TouchableOpacity>
                    );
                  })}
               </View>
            </View>

            <View style={styles.inputGroup}>
               <Text style={[styles.label, { color: theme.textSecondary }]}>DAKIKA VAQTI</Text>
               <TouchableOpacity style={[styles.inputWrapper, { backgroundColor: theme.card, borderColor: theme.border }]}>
                  <Clock color={COLORS.secondary} size={20} />
                  <Text style={[styles.input, { color: theme.text, marginTop: 12 }]}>14:00 - 15:30</Text>
               </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
               <Text style={[styles.label, { color: theme.textSecondary }]}>O'QUVCHILAR (AVTOMATIK)</Text>
               <View style={styles.studentList}>
                  {mockStudents.map(s => (
                     <View key={s.id} style={[styles.studentCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                        <Image source={{ uri: `https://i.pravatar.cc/100?u=${s.id}` }} style={styles.studentAvatar} />
                        <Text style={[styles.studentName, { color: theme.text }]}>{s.name}</Text>
                        <View style={styles.tag}>
                           <Text style={styles.tagText}>{s.status}</Text>
                        </View>
                     </View>
                  ))}
               </View>
            </View>
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleCreate}>
             <LinearGradient colors={[COLORS.secondary, '#eab308']} style={styles.gradient}>
                <Text style={styles.submitText}>GURUHNI YARATISH</Text>
                <Check color="white" size={20} strokeWidth={3} />
             </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Success Modal */}
      <Modal visible={showSuccess} transparent animationType="fade">
         <View style={styles.modalOverlay}>
            <LinearGradient
               colors={isDark ? ['#1E293B', '#0F172A'] : ['#FFFFFF', '#F8FAFC']}
               style={styles.modalContent}
            >
               <View style={styles.successIconBox}>
                  <LinearGradient colors={['#10B981', '#059669']} style={styles.successGradient}>
                     <Check color="white" size={40} strokeWidth={3} />
                  </LinearGradient>
               </View>
               <Text style={[styles.modalTitle, { color: theme.text }]}>Muvaffaqiyatli!</Text>
               <Text style={[styles.modalSub, { color: theme.textSecondary }]}>
                  "{groupName}" guruhi muvaffaqiyatli yaratildi va o'quvchilar biriktirildi.
               </Text>
               <TouchableOpacity 
                  style={styles.modalBtn} 
                  onPress={() => {
                    setShowSuccess(false);
                    navigation.goBack();
                  }}
               >
                  <LinearGradient colors={[COLORS.secondary, '#eab308']} style={styles.modalBtnGradient}>
                     <Text style={styles.modalBtnText}>DASHBOARDGA QAYTISH</Text>
                  </LinearGradient>
               </TouchableOpacity>
            </LinearGradient>
         </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 15 },
  backBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', ...SHADOWS.light },
  title: { fontSize: 24, fontWeight: '900' },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 40 },
  infoBox: { flexDirection: 'row', padding: 15, borderRadius: 20, gap: 12, marginBottom: 20, alignItems: 'center' },
  infoTitle: { fontSize: 13, fontWeight: '900' },
  infoSub: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  form: { gap: 20, marginTop: 10 },
  inputGroup: { gap: 8 },
  label: { fontSize: 11, fontWeight: '800', letterSpacing: 1, marginLeft: 4 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', height: 58, borderRadius: 16, paddingHorizontal: 16, borderWidth: 1, gap: 12 },
  input: { flex: 1, fontSize: 15, fontWeight: '700' },
  daysPadding: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  dayChip: { width: 45, height: 45, borderRadius: 12, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  dayText: { fontSize: 12, fontWeight: '900' },
  studentList: { gap: 10 },
  studentCard: { flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 16, borderWidth: 1, gap: 12 },
  studentAvatar: { width: 32, height: 32, borderRadius: 16 },
  studentName: { flex: 1, fontSize: 14, fontWeight: '700' },
  tag: { backgroundColor: COLORS.secondary + '20', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  tagText: { color: COLORS.secondary, fontSize: 10, fontWeight: '900' },
  submitBtn: { marginTop: 40, borderRadius: 18, overflow: 'hidden', ...SHADOWS.medium },
  gradient: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  submitText: { color: 'white', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', padding: 30 },
  modalContent: { width: '100%', borderRadius: 32, padding: 30, alignItems: 'center', ...SHADOWS.medium },
  successIconBox: { width: 80, height: 80, borderRadius: 40, overflow: 'hidden', marginBottom: 20 },
  successGradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalTitle: { fontSize: 24, fontWeight: '900', marginBottom: 10 },
  modalSub: { fontSize: 14, fontWeight: '600', textAlign: 'center', lineHeight: 22, marginBottom: 30 },
  modalBtn: { width: '100%', borderRadius: 16, overflow: 'hidden' },
  modalBtnGradient: { height: 54, justifyContent: 'center', alignItems: 'center' },
  modalBtnText: { color: 'white', fontSize: 14, fontWeight: '900', letterSpacing: 1 },
});

export default AddGroupScreen;
