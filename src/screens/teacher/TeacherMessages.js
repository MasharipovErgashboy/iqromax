import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  Search, 
  MessageSquare, 
  Users, 
  ShieldCheck, 
  CheckCheck,
  Plus
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS, GLASS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';
import PremiumBackground from '../../components/PremiumBackground';

const { width } = Dimensions.get('window');

const ChatItem = ({ chat, isDark, theme, navigation }) => (
  <TouchableOpacity 
    style={[styles.chatCard, isDark ? GLASS.dark : GLASS.light]}
    onPress={() => navigation.navigate('TeacherChat', { chatId: chat.id, name: chat.name })}
  >
     <View style={styles.avatarContainer}>
        <Image source={{ uri: `https://i.pravatar.cc/150?u=${chat.id}` }} style={styles.avatar} />
        {chat.online && <View style={styles.onlineDot} />}
     </View>
     <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
           <Text style={[styles.chatName, { color: theme.text }]}>{chat.name}</Text>
           <Text style={[styles.chatTime, { color: theme.textSecondary }]}>{chat.time}</Text>
        </View>
        <View style={styles.chatFooter}>
           <Text 
             style={[styles.chatLastMsg, { color: chat.unread ? theme.text : theme.textSecondary, fontWeight: chat.unread ? '700' : '400' }]}
             numberOfLines={1}
            >
              {chat.lastMsg}
           </Text>
           {chat.unread ? (
             <View style={[styles.unreadBadge, { backgroundColor: COLORS.secondary }]}>
                <Text style={styles.unreadText}>{chat.unread}</Text>
             </View>
           ) : (
             <CheckCheck color={COLORS.secondary} size={16} />
           )}
        </View>
     </View>
  </TouchableOpacity>
);

const TeacherMessages = ({ navigation }) => {
  const { isDark, theme } = useTheme();
  const [activeTab, setActiveTab] = useState('Parents');

  const TABS = ['Parents', 'Groups', 'Admin'];
  
  const CHATS_BY_TAB = {
    Parents: [
      { id: '1', name: 'Alisherning dadasi', lastMsg: 'Rahmat domla, bugun dars zo\'r o\'tdi!', time: '12:45', unread: 2, online: true },
      { id: '4', name: 'Malikaning onasi', lastMsg: 'Malika ertaga bora olmaydi', time: 'Dushanba', unread: 0, online: false },
    ],
    Groups: [
      { id: '3', name: 'Mental Arifmetika Group', lastMsg: 'Vazifa yuborildi: 15-bet', time: 'Kecha', unread: 5, online: true },
    ],
    Admin: [
      { id: '2', name: 'Zilola opaga (Admin)', lastMsg: 'Guruhlar jadvalini ko\'rib chiqing', time: '10:20', unread: 0, online: false },
    ]
  };
  
  const currentChats = CHATS_BY_TAB[activeTab] || [];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <PremiumBackground color1={COLORS.secondary} color2={COLORS.primary} />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Xabarlar</Text>
          <TouchableOpacity 
            style={[styles.newBtn, isDark ? GLASS.dark : GLASS.light]} 
            onPress={() => alert('Yangi chat yaratish')}
          >
             <Plus color={COLORS.secondary} size={24} />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchSection}>
           <View style={[styles.searchBar, isDark ? GLASS.dark : GLASS.light]}>
              <Search color={theme.textSecondary} size={18} />
              <TextInput 
                 placeholder="Chatlar yoki odamlarni qidiring..."
                 placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : COLORS.gray[400]}
                 style={[styles.searchInput, { color: theme.text }]}
              />
           </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
           {TABS.map(tab => (
             <TouchableOpacity 
               key={tab} 
               onPress={() => setActiveTab(tab)}
               style={[
                 styles.tabItem, 
                 activeTab === tab && { borderBottomColor: COLORS.secondary, borderBottomWidth: 3 }
               ]}
             >
                <Text 
                  style={[
                    styles.tabText, 
                    { color: activeTab === tab ? COLORS.secondary : theme.textSecondary }
                  ]}
                >
                  {tab === 'Parents' ? 'Ota-onalar' : tab === 'Groups' ? 'Guruhlar' : 'Admin'}
                </Text>
             </TouchableOpacity>
           ))}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
           {currentChats.map(chat => (
             <ChatItem key={chat.id} chat={chat} isDark={isDark} theme={theme} navigation={navigation} />
           ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  title: { fontSize: 28, fontWeight: '900' },
  newBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  searchSection: { paddingHorizontal: 20, marginBottom: 15 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 16,
    paddingHorizontal: 15,
    gap: 12,
    ...SHADOWS.light,
  },
  searchInput: { flex: 1, fontSize: 15, fontWeight: '600' },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    marginBottom: 10,
  },
  tabItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  tabText: { fontSize: 14, fontWeight: '800' },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 22,
    marginBottom: 12,
    ...SHADOWS.light,
  },
  avatarContainer: { position: 'relative' },
  avatar: { width: 54, height: 54, borderRadius: 27 },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  chatInfo: { flex: 1, marginLeft: 15 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  chatName: { fontSize: 16, fontWeight: '800' },
  chatTime: { fontSize: 11, fontWeight: '500' },
  chatFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  chatLastMsg: { fontSize: 13, flex: 1, marginRight: 10 },
  unreadBadge: {
    minWidth: 20,
    paddingHorizontal: 6,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: { color: COLORS.white, fontSize: 10, fontWeight: '900' },
});

export default TeacherMessages;
