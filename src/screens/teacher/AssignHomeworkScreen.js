import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, 
  TouchableOpacity, TextInput, StatusBar, KeyboardAvoidingView, Platform, Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { ArrowLeft, Zap, FileText, Send, Layers, Check, X } from 'lucide-react-native';
import { COLORS, SHADOWS, BORDER_RADIUS, SPACING } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';

const AssignHomeworkScreen = ({ navigation }) => {
  const { isDark, theme } = useTheme();
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('Alpha guruhi');
  const [showGroups, setShowGroups] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const GROUPS = ['Alpha guruhi', 'Beta guruhi', 'Gamma guruhi'];

  const handleSend = () => {
    if (topic.trim() && description.trim()) {
      setShowSuccess(true);
    } else {
      alert('Iltimos, mavzu va tavsifni to\'ldiring');
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
          <Text style={[styles.title, { color: theme.text }]}>Vazifa berish</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.form}>
            <View style={styles.inputGroup}>
               <Text style={[styles.label, { color: theme.textSecondary }]}>MAVZU</Text>
               <View style={[styles.inputWrapper, { backgroundColor: theme.card, borderColor: theme.border }]}>
                  <Zap color={COLORS.secondary} size={20} />
                  <TextInput 
                    style={[styles.input, { color: theme.text }]}
                    placeholder="Masalan: Abakusda qo'shish"
                    placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : COLORS.gray[400]}
                    value={topic}
                    onChangeText={setTopic}
                  />
               </View>
            </View>

            <View style={styles.inputGroup}>
               <Text style={[styles.label, { color: theme.textSecondary }]}>GURUHNI TANLANG</Text>
               <TouchableOpacity 
                 style={[styles.inputWrapper, { backgroundColor: theme.card, borderColor: theme.border }]}
                 onPress={() => setShowGroups(true)}
               >
                  <Layers color={COLORS.secondary} size={20} />
                  <Text style={[styles.input, { color: theme.text, marginTop: 12 }]}>{selectedGroup}</Text>
               </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
               <Text style={[styles.label, { color: theme.textSecondary }]}>BATAFSIL TAVSIF</Text>
               <View style={[styles.inputWrapper, styles.textAreaWrapper, { backgroundColor: theme.card, borderColor: theme.border }]}>
                  <FileText color={COLORS.secondary} size={20} />
                  <TextInput 
                    style={[styles.input, styles.textArea, { color: theme.text }]}
                    placeholder="Topshiriq haqida batafsil (masala misollar)..."
                    placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : COLORS.gray[400]}
                    multiline={true}
                    numberOfLines={4}
                    value={description}
                    onChangeText={setDescription}
                  />
               </View>
            </View>
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSend}>
             <LinearGradient colors={[COLORS.secondary, '#eab308']} style={styles.gradient}>
                <Text style={styles.submitText}>VAZIFANI YUBORISH</Text>
                <Send color="white" size={20} strokeWidth={3} />
             </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Group Picker Modal */}
      <Modal visible={showGroups} transparent animationType="slide">
         <View style={styles.modalBottomOverlay}>
            <View style={[styles.pickerContent, { backgroundColor: theme.card }]}>
               <View style={styles.pickerHeader}>
                  <Text style={[styles.pickerTitle, { color: theme.text }]}>Guruhni tanlang</Text>
                  <TouchableOpacity onPress={() => setShowGroups(false)}>
                     <X color={theme.textSecondary} size={24} />
                  </TouchableOpacity>
               </View>
               {GROUPS.map(g => (
                  <TouchableOpacity 
                    key={g} 
                    style={[styles.pickerItem, { borderBottomColor: theme.border }]}
                    onPress={() => {
                       setSelectedGroup(g);
                       setShowGroups(false);
                    }}
                  >
                     <Text style={[styles.pickerItemText, { color: theme.text }, selectedGroup === g && { color: COLORS.secondary }]}>{g}</Text>
                     {selectedGroup === g && <Check color={COLORS.secondary} size={20} />}
                  </TouchableOpacity>
               ))}
            </View>
         </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={showSuccess} transparent animationType="fade">
         <View style={styles.modalOverlay}>
            <LinearGradient
               colors={isDark ? ['#1E293B', '#0F172A'] : ['#FFFFFF', '#F8FAFC']}
               style={styles.modalContent}
            >
               <View style={styles.successIconBox}>
                  <LinearGradient colors={[COLORS.secondary, '#eab308']} style={styles.successGradient}>
                     <Send color="white" size={40} strokeWidth={3} />
                  </LinearGradient>
               </View>
               <Text style={[styles.modalTitle, { color: theme.text }]}>Topshirildi!</Text>
               <Text style={[styles.modalSub, { color: theme.textSecondary }]}>
                  Vazifalar barcha o'quvchilarga muvaffaqiyatli yuborildi.
               </Text>
               <TouchableOpacity 
                  style={styles.modalBtn} 
                  onPress={() => {
                    setShowSuccess(false);
                    navigation.goBack();
                  }}
               >
                  <LinearGradient colors={[COLORS.secondary, '#eab308']} style={styles.modalBtnGradient}>
                     <Text style={styles.modalBtnText}>YOPISH</Text>
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
  form: { gap: 20, marginTop: 10 },
  inputGroup: { gap: 8 },
  label: { fontSize: 11, fontWeight: '800', letterSpacing: 1, marginLeft: 4 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', height: 58, borderRadius: 16, paddingHorizontal: 16, borderWidth: 1, gap: 12 },
  textAreaWrapper: { height: 120, alignItems: 'flex-start', paddingTop: 15 },
  input: { flex: 1, fontSize: 16, fontWeight: '700' },
  textArea: { textAlignVertical: 'top' },
  submitBtn: { marginTop: 40, borderRadius: 18, overflow: 'hidden', ...SHADOWS.medium },
  gradient: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  submitText: { color: 'white', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  modalBottomOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  pickerContent: { borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 25, paddingBottom: 40 },
  pickerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  pickerTitle: { fontSize: 20, fontWeight: '800' },
  pickerItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1 },
  pickerItemText: { fontSize: 16, fontWeight: '600' },
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

export default AssignHomeworkScreen;
