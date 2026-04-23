import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, TextInput, Dimensions, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { ArrowLeft, Search, HelpCircle, MessageCircle, Phone, Book } from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';

const { width } = Dimensions.get('window');

const HelpCard = ({ icon: Icon, title, sub, theme, onPress }) => (
  <TouchableOpacity 
    onPress={onPress}
    style={[styles.helpCard, { backgroundColor: theme.card, borderColor: theme.border }]}
  >
     <View style={styles.helpIconBox}>
        <Icon color={COLORS.secondary} size={24} />
     </View>
     <Text style={[styles.helpTitle, { color: theme.text }]}>{title}</Text>
     <Text style={[styles.helpSub, { color: theme.textSecondary }]}>{sub}</Text>
  </TouchableOpacity>
);

const TeacherHelpCenter = ({ navigation }) => {
  const { isDark, theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: theme.card }]}>
          <ArrowLeft color={theme.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Yordam Markazi</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
           <Search color={theme.textSecondary} size={20} />
           <TextInput 
             style={[styles.searchInput, { color: theme.text }]}
             placeholder="Qanday yordam bera olamiz?"
             placeholderTextColor={theme.textSecondary}
           />
        </View>

        <View style={styles.helpGrid}>
           <HelpCard 
             icon={HelpCircle} 
             title="Ko'p so'raladiganlar" 
             sub="Barcha FAQ savollar" 
             theme={theme} 
             onPress={() => navigation.navigate('TeacherHelpDetail', { title: "Ko'p so'raladigan savollar", content: "Bu yerda siz foydalanuvchilar tomonidan eng ko'p beriladigan savollarga javob topishingiz mumkin." })}
           />
           <HelpCard 
             icon={MessageCircle} 
             title="Jonli chat" 
             sub="Admin bilan muloqot" 
             theme={theme} 
             onPress={() => navigation.navigate('TeacherChat')}
           />
           <HelpCard 
             icon={Phone} 
             title="Qo'ng'iroq" 
             sub="Texnik yordam" 
             theme={theme} 
             onPress={() => Linking.openURL('tel:+998901234567')}
           />
           <HelpCard 
             icon={Book} 
             title="Qo'llanma" 
             sub="Ilovadan foydalanish" 
             theme={theme} 
             onPress={() => navigation.navigate('TeacherHelpDetail', { title: "Ilova qo'llanmasi", content: "IQROMAX ilovasi o'qituvchilar uchun darslarni samarali tashkil etish va o'quvchilar natijalarini kuzatish imkonini beradi." })}
           />
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Ommabop savollar</Text>
        {[
          { q: "Dars natijalarini qanday yuklab olish mumkin?", a: "Hisobotlar bo'limidan darsni tanlang va yuklash tugmasini bosing." },
          { q: "O'quvchi qo'shish tartibi qanday?", a: "Guruhlar bo'limidan yangi o'quvchi qo'shish qismini tanlang." },
          { q: "Parolni qanday o'zgartirsam bo'ladi?", a: "Xavfsizlik sozlamalaridan yangi parolni o'rnatishingiz mumkin." }
        ].map((item, i) => (
          <TouchableOpacity 
            key={i} 
            style={[styles.faqItem, { borderBottomColor: theme.border }]}
            onPress={() => navigation.navigate('TeacherHelpDetail', { title: item.q, content: item.a })}
          >
             <Text style={[styles.faqText, { color: theme.text }]}>{item.q}</Text>
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
  title: { fontSize: 22, fontWeight: '900' },
  scrollContent: { padding: 20 },
  searchBar: { flexDirection: 'row', alignItems: 'center', height: 58, borderRadius: 18, paddingHorizontal: 16, borderWidth: 1, gap: 12, marginBottom: 25 },
  searchInput: { flex: 1, fontSize: 16, fontWeight: '600' },
  helpGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15 },
  helpCard: { width: (width - 55) / 2, padding: 20, borderRadius: 24, borderWidth: 1, ...SHADOWS.light, alignItems: 'center', gap: 10 },
  helpIconBox: { width: 50, height: 50, borderRadius: 15, backgroundColor: 'rgba(234, 179, 8, 0.1)', justifyContent: 'center', alignItems: 'center' },
  helpTitle: { fontSize: 13, fontWeight: '800', textAlign: 'center' },
  helpSub: { fontSize: 10, fontWeight: '600', textAlign: 'center', opacity: 0.7 },
  sectionTitle: { fontSize: 18, fontWeight: '900', marginTop: 30, marginBottom: 15 },
  faqItem: { paddingVertical: 18, borderBottomWidth: 1 },
  faqText: { fontSize: 15, fontWeight: '600' },
});

export default TeacherHelpCenter;
