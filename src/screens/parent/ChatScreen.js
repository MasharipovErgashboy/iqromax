import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme.js';
import { ArrowLeft, Send, Plus, Mic, MoreVertical, CheckCheck } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ChatScreen = ({ navigation, route }) => {
  const { teacherName = 'Sabina Raxmonova' } = route.params || {};
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef(null);

  const MOCK_MESSAGES = [
    { id: 1, text: "Assalomu alaykum, Sabina opa! Alisherning bugungi darsi qanday o'tdi?", sender: 'parent', time: '14:05' },
    { id: 2, text: "Va alaykum assalom! Bugun Alisher juda faol qatnashdi. Ayniqsa o'nliklar bilan ishlashda uning natijasi juda yaxshi.", sender: 'teacher', time: '14:08' },
    { id: 3, text: "Rahmat, o'qishlari bo'yicha yana qanday maslahat bera olasiz?", sender: 'parent', time: '14:10' },
    { id: 4, text: "Mantiqiy savollar ustida biroz ko'proq ishlashimiz kerak. Men uyga vazifa uchun maxsus materiallar yubordim.", sender: 'teacher', time: '14:12' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft color={COLORS.gray[700]} size={24} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
           <Image 
             source={require('../../../assets/avatar_blue.png')} 
             style={styles.avatarMini} 
           />
           <View>
              <Text style={styles.teacherName}>{teacherName}</Text>
              <Text style={styles.statusText}>Onlayn</Text>
           </View>
        </View>
        <TouchableOpacity style={styles.moreBtn}>
          <MoreVertical color={COLORS.gray[700]} size={22} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.chatWrapper}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
           {MOCK_MESSAGES.map((msg) => (
             <View 
               key={msg.id} 
               style={[
                 styles.messageRow, 
                 msg.sender === 'parent' ? styles.parentRow : styles.teacherRow
               ]}
             >
                <View style={[
                  styles.bubble, 
                  msg.sender === 'parent' ? styles.parentBubble : styles.teacherBubble
                ]}>
                   <Text style={[
                     styles.messageText, 
                     msg.sender === 'parent' ? styles.parentText : styles.teacherText
                   ]}>
                     {msg.text}
                   </Text>
                   <View style={styles.msgFooter}>
                      <Text style={[
                        styles.msgTime,
                        msg.sender === 'parent' ? styles.parentTime : styles.teacherTime
                      ]}>
                        {msg.time}
                      </Text>
                      {msg.sender === 'parent' && <CheckCheck size={12} color={COLORS.white} />}
                   </View>
                </View>
             </View>
           ))}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputBar}>
           <TouchableOpacity style={styles.attachBtn}>
              <Plus color={COLORS.gray[400]} size={24} />
           </TouchableOpacity>
           <View style={styles.inputWrapper}>
              <TextInput 
                placeholder="Xabar yozing..." 
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                multiline
                placeholderTextColor={COLORS.gray[400]}
              />
              <TouchableOpacity style={[styles.micBtn, message.length > 0 && styles.sendBtnBg]}>
                 {message.length > 0 ? (
                    <Send color={COLORS.white} size={20} />
                 ) : (
                    <Mic color={COLORS.gray[400]} size={20} />
                 )}
              </TouchableOpacity>
           </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    backgroundColor: COLORS.white,
  },
  backBtn: {
    padding: 8,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    gap: 12,
  },
  avatarMini: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  teacherName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  statusText: {
    fontSize: 11,
    color: COLORS.success,
    fontWeight: '700',
  },
  moreBtn: {
    padding: 8,
  },
  chatWrapper: {
    flex: 1,
  },
  messageList: {
    padding: 20,
    paddingBottom: 20,
  },
  messageRow: {
    marginBottom: 15,
    maxWidth: '85%',
  },
  parentRow: {
    alignSelf: 'flex-end',
  },
  teacherRow: {
    alignSelf: 'flex-start',
  },
  bubble: {
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    ...SHADOWS.light,
  },
  parentBubble: {
    backgroundColor: COLORS.accent,
    borderBottomRightRadius: 4,
  },
  teacherBubble: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
  },
  parentText: {
    color: COLORS.white,
  },
  teacherText: {
    color: '#1E293B',
  },
  msgFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 5,
    marginTop: 4,
  },
  msgTime: {
    fontSize: 10,
    fontWeight: '600',
  },
  parentTime: {
    color: 'rgba(255,255,255,0.7)',
  },
  teacherTime: {
    color: COLORS.gray[400],
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
  },
  attachBtn: {
    padding: 10,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    maxHeight: 100,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  },
  micBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnBg: {
    backgroundColor: COLORS.accent,
  },
});

export default ChatScreen;
