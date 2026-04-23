import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Share
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, 
  Share2, 
  ThumbsUp, 
  ThumbsDown,
  ChevronRight
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';

const TeacherHelpDetailScreen = ({ navigation, route }) => {
  const { isDark, theme } = useTheme();
  const { 
    title = "Dars natijalarini qanday yuklab olish mumkin?", 
    content = "Dars natijalarini yuklab olish uchun siz avval darsni yakunlashingiz kerak. Dars yakunlangach, 'Hisobotlar' bo'limiga o'ting va kerakli darsni tanlang. U yerda PDF yoki Excel formatida saqlash tugmasini ko'rasiz."
  } = route.params || {};

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${title}\n\n${content}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: theme.card }]}>
          <ArrowLeft color={theme.text} size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={[styles.actionBtn, { backgroundColor: theme.card }]}>
          <Share2 color={theme.text} size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <View style={[styles.badge, { backgroundColor: COLORS.secondary + '20' }]}>
           <Text style={[styles.badgeText, { color: COLORS.secondary }]}>QO'LLANMA</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
            {content}
          </Text>
          <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
            Agar savollaringiz qolsa, qo'llab-quvvatlash jamoamiz bilan jonli chat orqali bog'lanishingiz mumkin.
          </Text>
        </View>

        {/* Feedback Section */}
        <View style={[styles.feedbackBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
           <Text style={[styles.feedbackTitle, { color: theme.text }]}>Ushbu ma'lumot foydali bo'ldimi?</Text>
           <View style={styles.feedbackBtns}>
              <TouchableOpacity style={[styles.fBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9' }]}>
                 <ThumbsUp color={COLORS.success} size={20} />
                 <Text style={[styles.fText, { color: theme.text }]}>Ha</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.fBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9' }]}>
                 <ThumbsDown color="#EF4444" size={20} />
                 <Text style={[styles.fText, { color: theme.text }]}>Yo'q</Text>
              </TouchableOpacity>
           </View>
        </View>

        {/* Related Items */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>O'xshash maqolalar</Text>
        <TouchableOpacity style={[styles.relatedItem, { borderBottomColor: theme.border }]}>
           <Text style={[styles.relatedText, { color: theme.text }]}>Hisobotni Excelga eksport qilish</Text>
           <ChevronRight color={theme.textSecondary} size={18} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.relatedItem, { borderBottomColor: theme.border }]}>
           <Text style={[styles.relatedText, { color: theme.text }]}>O'quvchi reytingini ko'rish</Text>
           <ChevronRight color={theme.textSecondary} size={18} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 20, 
    paddingVertical: 15 
  },
  backBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', ...SHADOWS.light },
  actionBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', ...SHADOWS.light },
  scrollContent: { padding: 25, paddingBottom: 60 },
  title: { fontSize: 28, fontWeight: '900', lineHeight: 36 },
  badge: { 
    alignSelf: 'flex-start', 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 8, 
    marginTop: 15,
    marginBottom: 25 
  },
  badgeText: { fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  contentContainer: { marginBottom: 40 },
  paragraph: { fontSize: 16, lineHeight: 26, fontWeight: '500', marginBottom: 20 },
  feedbackBox: { 
    padding: 25, 
    borderRadius: 24, 
    borderWidth: 1, 
    alignItems: 'center', 
    ...SHADOWS.light,
    marginBottom: 40
  },
  feedbackTitle: { fontSize: 16, fontWeight: '800', marginBottom: 20 },
  feedbackBtns: { flexDirection: 'row', gap: 15 },
  fBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10, 
    paddingHorizontal: 25, 
    paddingVertical: 12, 
    borderRadius: 15 
  },
  fText: { fontSize: 15, fontWeight: '700' },
  sectionTitle: { fontSize: 18, fontWeight: '900', marginBottom: 15 },
  relatedItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderBottomWidth: 1
  },
  relatedText: { fontSize: 15, fontWeight: '600' },
});

export default TeacherHelpDetailScreen;
