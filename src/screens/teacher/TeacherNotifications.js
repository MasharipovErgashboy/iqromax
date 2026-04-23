import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { ArrowLeft, Bell, MessageSquare, BookOpen, Clock, AlertCircle } from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING } from '../../constants/theme.js';

const NOTIFS = [
  { id: 1, title: 'Yangi o\'quvchi', body: 'Alisher Alpha guruhiga qo\'shildi.', time: '10 daqiqa oldin', type: 'user', unread: true },
  { id: 2, title: 'Vazifa topshirildi', body: 'Beta guruhi o\'quvchilari vazifani yakunlashdi.', time: '1 soat oldin', type: 'homework', unread: true },
  { id: 3, title: 'Admin xabari', body: 'Dars jadvalida o\'zgarishlar mavjud.', time: '3 soat oldin', type: 'system', unread: false },
];

const TeacherNotifications = ({ navigation }) => {
  const { isDark, theme } = useTheme();

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
        {NOTIFS.map(notif => (
          <TouchableOpacity 
            key={notif.id} 
            style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }, notif.unread && { borderLeftColor: COLORS.secondary, borderLeftWidth: 4 }]}
          >
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>{notif.title}</Text>
              <Text style={[styles.cardTime, { color: theme.textSecondary }]}>{notif.time}</Text>
            </View>
            <Text style={[styles.cardBody, { color: theme.textSecondary }]}>{notif.body}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 15 },
  backBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', ...SHADOWS.light },
  title: { fontSize: 24, fontWeight: '900' },
  scrollContent: { padding: 20 },
  card: { padding: 18, borderRadius: 18, marginBottom: 12, borderWidth: 1, ...SHADOWS.light },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  cardTitle: { fontSize: 16, fontWeight: '800' },
  cardTime: { fontSize: 11, fontWeight: '600' },
  cardBody: { fontSize: 14, lineHeight: 20 },
});

export default TeacherNotifications;
