import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme.js';
import { ArrowLeft, Search, MessageSquare, Phone, ChevronRight, Circle } from 'lucide-react-native';

const TeacherChatList = ({ navigation }) => {
  const TEACHERS = [
    { 
      name: 'Sabina Raxmonova', 
      subject: 'Mental Arifmetika', 
      online: true, 
      lastMsg: 'Bugun darsda Alisher juda faol qatnashdi.',
      time: '14:20'
    },
    { 
      name: 'Javohir K.', 
      subject: 'Mantiqiy Matematika', 
      online: false, 
      lastMsg: 'Uyga vazifalarni tekshirib chiqdim.',
      time: 'Kecha'
    },
    { 
      name: 'Gulnoza M.', 
      subject: 'Muntazam O\'qish', 
      online: true, 
      lastMsg: 'Yangi kitoblar ro\'yxatini yubordim.',
      time: 'Dushanba'
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft color={COLORS.gray[700]} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>O'qituvchilar</Text>
        <TouchableOpacity style={styles.callBtn}>
          <Phone color={COLORS.gray[700]} size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
           <Search color={COLORS.gray[400]} size={20} />
           <TextInput 
             placeholder="Ustozlarni izlash..." 
             style={styles.searchInput}
             placeholderTextColor={COLORS.gray[400]}
           />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Farzandingiz ustozlari</Text>
        
        {TEACHERS.map((teacher, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.teacherCard}
            onPress={() => navigation.navigate('ChatScreen', { teacherName: teacher.name })}
          >
             <View style={styles.avatarContainer}>
                <Image 
                  source={require('../../../assets/avatar_blue.png')} 
                  style={styles.avatar} 
                />
                {teacher.online && <View style={styles.onlineBadge} />}
             </View>
             <View style={styles.teacherInfo}>
                <View style={styles.nameRow}>
                   <Text style={styles.teacherName}>{teacher.name}</Text>
                   <Text style={styles.timeText}>{teacher.time}</Text>
                </View>
                <Text style={styles.subjectText}>{teacher.subject}</Text>
                <Text style={styles.lastMsg} numberOfLines={1}>{teacher.lastMsg}</Text>
             </View>
          </TouchableOpacity>
        ))}

        <View style={styles.serviceBox}>
           <View style={styles.serviceIcon}>
              <Circle color={COLORS.accent} size={24} fill={COLORS.accent} />
           </View>
           <View style={styles.serviceInfo}>
              <Text style={styles.serviceTitle}>Texnik ko'mak</Text>
              <Text style={styles.serviceSub}>Ilova bo'yicha savollar bormi?</Text>
           </View>
           <TouchableOpacity style={styles.supportBtn}>
              <MessageSquare color={COLORS.white} size={18} />
           </TouchableOpacity>
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
  },
  callBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    borderRadius: 15,
    ...SHADOWS.light,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.gray[400],
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 15,
    paddingLeft: 5,
  },
  teacherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 24,
    marginBottom: 12,
    ...SHADOWS.light,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 18,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  teacherInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teacherName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
  },
  timeText: {
    fontSize: 11,
    color: COLORS.gray[400],
    fontWeight: '600',
  },
  subjectText: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '700',
    marginTop: 2,
  },
  lastMsg: {
    fontSize: 13,
    color: COLORS.gray[400],
    marginTop: 6,
    fontWeight: '500',
  },
  serviceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    padding: 20,
    borderRadius: 24,
    marginTop: 25,
  },
  serviceIcon: {
    marginRight: 15,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  serviceSub: {
    fontSize: 11,
    color: COLORS.gray[500],
    fontWeight: '600',
    marginTop: 2,
  },
  supportBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
});

export default TeacherChatList;
