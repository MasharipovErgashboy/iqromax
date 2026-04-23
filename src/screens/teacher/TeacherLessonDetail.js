import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { ArrowLeft, Clock, Users, BookOpen, MapPin, CheckCircle2 } from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';

const TeacherLessonDetail = ({ navigation, route }) => {
  const { isDark, theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: theme.card }]}>
          <ArrowLeft color={theme.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Dars Tafsiloti</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.infoCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <LinearGradient
            colors={isDark ? ['#1E293B', '#0F172A'] : [COLORS.secondary, '#d97706']}
            style={styles.cardHeader}
          >
            <Text style={styles.lessonName}>Mental Arifmetika (Junior)</Text>
            <Text style={styles.groupName}>"Beta" guruhi</Text>
          </LinearGradient>

          <View style={styles.detailsList}>
            <View style={styles.detailItem}>
              <Clock color={COLORS.secondary} size={20} />
              <View>
                <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>VAQT</Text>
                <Text style={[styles.detailValue, { color: theme.text }]}>Bugun, 16:00 - 17:30</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <Users color={COLORS.secondary} size={20} />
              <View>
                <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>O'QUVCHILAR</Text>
                <Text style={[styles.detailValue, { color: theme.text }]}>15 nafar</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <MapPin color={COLORS.secondary} size={20} />
              <View>
                <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>XONA</Text>
                <Text style={[styles.detailValue, { color: theme.text }]}>A-302 (Asosiy bino)</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>O'quvchilar ro'yxati</Text>
        {[1, 2, 3, 4, 5].map(i => (
          <View key={i} style={[styles.studentCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
             <Image source={{ uri: `https://i.pravatar.cc/100?u=${i}` }} style={styles.studentAvatar} />
             <View style={{ flex: 1 }}>
                <Text style={[styles.studentName, { color: theme.text }]}>O'quvchi Ismi {i}</Text>
                <Text style={[styles.studentStatus, { color: '#10B981' }]}>Davomat: Bor</Text>
             </View>
             <TouchableOpacity>
                <CheckCircle2 color="#10B981" size={24} />
             </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
         <TouchableOpacity style={styles.startBtn} onPress={() => navigation.navigate('TeacherLiveLesson')}>
            <LinearGradient colors={[COLORS.secondary, '#eab308']} style={styles.btnGradient}>
               <Text style={styles.btnText}>DARSNI BOSHLASH</Text>
            </LinearGradient>
         </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 15 },
  backBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', ...SHADOWS.light },
  title: { fontSize: 24, fontWeight: '900' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  infoCard: { borderRadius: 24, borderWidth: 1, overflow: 'hidden', ...SHADOWS.light, marginBottom: 30 },
  cardHeader: { padding: 25 },
  lessonName: { color: 'white', fontSize: 22, fontWeight: '900' },
  groupName: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '700', marginTop: 4 },
  detailsList: { padding: 20, gap: 20 },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  detailLabel: { fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  detailValue: { fontSize: 14, fontWeight: '700', marginTop: 2 },
  sectionTitle: { fontSize: 18, fontWeight: '900', marginBottom: 15 },
  studentCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 16, borderWidth: 1, marginBottom: 10, gap: 12 },
  studentAvatar: { width: 44, height: 44, borderRadius: 22 },
  studentName: { fontSize: 15, fontWeight: '700' },
  studentStatus: { fontSize: 12, fontWeight: '600', marginTop: 2 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: 'transparent' },
  startBtn: { borderRadius: 18, overflow: 'hidden', ...SHADOWS.medium },
  btnGradient: { height: 60, alignItems: 'center', justifyContent: 'center' },
  btnText: { color: 'white', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
});

export default TeacherLessonDetail;
