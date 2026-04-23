import React, { useState, useRef } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, 
  TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { ArrowLeft, Send, Paperclip, MoreVertical, Mic, Image as ImageIcon } from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';

const TeacherChatScreen = ({ navigation, route }) => {
  const { isDark, theme } = useTheme();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Assalomu alaykum domla, Alisherning bugungi darsi qanday o\'tdi?', sender: 'other', time: '10:00' },
    { id: 2, text: 'Va alaykum assalom. Juda yaxshi, bugun yangi mavzuni tez o\'zlashtirdi.', sender: 'me', time: '10:05' },
    { id: 3, text: 'Rahmat! Uyga vazifani ham tushuntirib yuboring iltimos.', sender: 'other', time: '10:10' },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { id: Date.now(), text: message, sender: 'me', time: '10:15' }]);
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft color={theme.text} size={24} />
        </TouchableOpacity>
        <Image source={{ uri: 'https://i.pravatar.cc/100?u=parent' }} style={styles.avatar} />
        <View style={styles.headerInfo}>
           <Text style={[styles.name, { color: theme.text }]}>Alisherning dadasi</Text>
           <Text style={styles.status}>Onlayn</Text>
        </View>
        <TouchableOpacity>
           <MoreVertical color={theme.textSecondary} size={20} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView contentContainerStyle={styles.msgContainer}>
          {messages.map((msg) => (
            <View key={msg.id} style={[styles.msgRow, msg.sender === 'me' ? styles.myMsgRow : styles.otherMsgRow]}>
               <View style={[
                 styles.bubble, 
                 msg.sender === 'me' ? { backgroundColor: COLORS.secondary } : { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }
               ]}>
                  <Text style={[styles.msgText, { color: msg.sender === 'me' ? 'white' : theme.text }]}>{msg.text}</Text>
                  <Text style={[styles.timeText, { color: msg.sender === 'me' ? 'rgba(255,255,255,0.7)' : theme.textSecondary }]}>{msg.time}</Text>
               </View>
            </View>
          ))}
        </ScrollView>

        <View style={[styles.inputContainer, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
           <TouchableOpacity style={styles.attachBtn}>
              <Paperclip color={theme.textSecondary} size={22} />
           </TouchableOpacity>
           <TextInput 
             style={[styles.input, { color: theme.text }]}
             placeholder="Xabar yozing..."
             placeholderTextColor={theme.textSecondary}
             value={message}
             onChangeText={setMessage}
             multiline
           />
           {message.length > 0 ? (
             <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
                <LinearGradient colors={[COLORS.secondary, '#eab308']} style={styles.sendGradient}>
                   <Send color="white" size={20} />
                </LinearGradient>
             </TouchableOpacity>
           ) : (
             <TouchableOpacity style={styles.attachBtn}>
                <Mic color={theme.textSecondary} size={22} />
             </TouchableOpacity>
           )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, gap: 12 },
  backBtn: { padding: 5 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  headerInfo: { flex: 1 },
  name: { fontSize: 16, fontWeight: '800' },
  status: { fontSize: 11, fontWeight: '600', color: '#10B981' },
  msgContainer: { padding: 20, gap: 15 },
  msgRow: { flexDirection: 'row', width: '100%' },
  myMsgRow: { justifyContent: 'flex-end' },
  otherMsgRow: { justifyContent: 'flex-start' },
  bubble: { maxWidth: '80%', padding: 12, borderRadius: 20 },
  msgText: { fontSize: 15, fontWeight: '500', lineHeight: 20 },
  timeText: { fontSize: 10, fontWeight: '600', textAlign: 'right', marginTop: 4 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 12, borderTopWidth: 1, gap: 10 },
  attachBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  input: { flex: 1, fontSize: 16, maxHeight: 100, paddingVertical: 8 },
  sendBtn: { ...SHADOWS.light },
  sendGradient: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
});

export default TeacherChatScreen;
