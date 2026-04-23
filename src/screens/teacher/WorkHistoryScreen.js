import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { ArrowLeft, Clock, Calendar, CheckCircle2 } from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING } from '../../constants/theme.js';

const WorkHistoryScreen = ({ navigation }) => {
  const { isDark, theme } = useTheme();

  const HISTORY = [
    { id: 1, title: 'Mental Arifmetika L1', group: 'Alpha', duration: '90 daqiqa', date: 'Bugun, 14:00', status: 'Yakunlandi' },
    { id: 2, title: 'Abakus Pro', group: 'Beta', duration: '60 daqiqa', date: 'Kecha, 16:30', status: 'Yakunlandi' },
    { id: 3, title: 'Tezkor Hisob', group: 'Gamma', duration: '90 daqiqa', date: '12-aprel, 10:00', status: 'Yakunlandi' },
    { id: 4, title: 'Mental Arifmetika L2', group: 'Alpha', duration: '90 daqiqa', date: '11-aprel, 14:00', status: 'Yakunlandi' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: theme.card }]}>
          <ArrowLeft color={theme.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Ish tarixi</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {HISTORY.map(item => (
          <View key={item.id} style={[styles.historyCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
             <View style={styles.cardHeader}>
                <View style={styles.iconBox}>
                   <Clock color={COLORS.secondary} size={20} />
                </View>
                <View style={{ flex: 1 }}>
                   <Text style={[styles.lessonTitle, { color: theme.text }]}>{item.title}</Text>
                   <Text style={[styles.groupName, { color: theme.textSecondary }]}>{item.group} guruhi</Text>
                </View>
                <View style={styles.statusBadge}>
                   <CheckCircle2 color="#10B981" size={14} />
                   <Text style={styles.statusText}>{item.status}</Text>
                </View>
             </View>
             <View style={[styles.divider, { backgroundColor: theme.border }]} />
             <View style={styles.cardFooter}>
                <View style={styles.infoItem}>
                   <Calendar color={theme.textSecondary} size={14} />
                   <Text style={[styles.infoText, { color: theme.textSecondary }]}>{item.date}</Text>
                </View>
                <View style={styles.infoItem}>
                   <Clock color={theme.textSecondary} size={14} />
                   <Text style={[styles.infoText, { color: theme.textSecondary }]}>{item.duration}</Text>
                </View>
             </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 15 },
  backBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', ...SHADOWS.light },
  title: { fontSize: 22, fontWeight: '900' },
  scrollContent: { padding: 20 },
  historyCard: { padding: 18, borderRadius: 24, borderWidth: 1, marginBottom: 15, ...SHADOWS.light },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: { width: 42, height: 42, borderRadius: 12, backgroundColor: 'rgba(234, 179, 8, 0.1)', justifyContent: 'center', alignItems: 'center' },
  lessonTitle: { fontSize: 16, fontWeight: '800' },
  groupName: { fontSize: 13, fontWeight: '600', marginTop: 2 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#DCFCE7', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  statusText: { color: '#10B981', fontSize: 10, fontWeight: '900' },
  divider: { height: 1, marginVertical: 15, opacity: 0.5 },
  cardFooter: { flexDirection: 'row', gap: 20 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  infoText: { fontSize: 12, fontWeight: '700' },
});

export default WorkHistoryScreen;
