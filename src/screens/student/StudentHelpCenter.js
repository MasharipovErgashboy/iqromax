import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  Dimensions,
  LayoutAnimation,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, 
  Search, 
  HelpCircle, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  CreditCard, 
  PlayCircle,
  ExternalLink
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const FAQS = [
  {
    id: '1',
    category: 'learning',
    question: "Abakus darslariga qanday qo'shilish mumkin?",
    answer: "Jonli darslar bo'limiga o'ting va dars boshlanishidan 5 daqiqa oldin 'Darsga kirish' tugmasini bosing. Shuningdek darslar jadvalidan foydalanishingiz mumkin."
  },
  {
    id: '2',
    category: 'payment',
    question: "Obunani qanday yangilash kerak?",
    answer: "Profil sahifasidagi 'Obuna' bo'limiga o'ting, o'zingizga ma'qul tarifni tanlang va to'lov turlaridan biri (Payme, Click) orqali to'lovni amalga oshiring."
  },
  {
    id: '3',
    category: 'technical',
    question: "Dars yozuvlari qayerda ko'rinadi?",
    answer: "Barcha o'tgan darslar 'Darslar Arxivi' bo'limida saqlanadi. Siz ularni istalgan vaqtda qayta ko'rishingiz va materiallarni yuklab olishingiz mumkin."
  },
  {
    id: '4',
    category: 'learning',
    question: "Sertifikatni qanday olsak bo'ladi?",
    answer: "Kurs darslarini 100% video ko'rib va barcha uy vazifalarini muvaffaqiyatli topshirganingizdan so'ng, profil bo'limida avtomatik ravishda sertifikat shakllanadi."
  }
];

const StudentHelpCenter = ({ navigation }) => {
  const { theme, isDark } = useTheme();
  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredFaqs = FAQS.filter(faq => 
    (activeCategory === 'all' || faq.category === activeCategory) &&
    (faq.question.toLowerCase().includes(search.toLowerCase()))
  );

  const CategoryTab = ({ id, label, icon: Icon }) => (
    <TouchableOpacity 
      onPress={() => setActiveCategory(id)}
      style={[
        styles.catTab, 
        { backgroundColor: activeCategory === id ? COLORS.primary : theme.card },
        activeCategory === id && SHADOWS.medium
      ]}
    >
       <Icon color={activeCategory === id ? 'white' : COLORS.gray[400]} size={18} />
       <Text style={[styles.catLabel, { color: activeCategory === id ? 'white' : theme.textSecondary }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <SafeAreaView edges={['top']}>
           <View style={styles.headerTop}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                 <ArrowLeft color={theme.text} size={24} />
              </TouchableOpacity>
              <Text style={[styles.headerTitle, { color: theme.text }]}>Yordam Markazi</Text>
              <View style={{ width: 40 }} />
           </View>
        </SafeAreaView>

        {/* Search Bar */}
        <View style={[styles.searchWrapper, { backgroundColor: isDark ? '#1E293B' : '#F1F5F9' }]}>
           <Search color={COLORS.gray[400]} size={20} />
           <TextInput 
             style={[styles.searchInput, { color: theme.text }]}
             placeholder="Savol bo'yicha qidirish..."
             placeholderTextColor={COLORS.gray[400]}
             value={search}
             onChangeText={setSearch}
           />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
         
         {/* Categories */}
         <View style={styles.catGrid}>
            <CategoryTab id="all" label="Hammasi" icon={HelpCircle} />
            <CategoryTab id="learning" label="O'quv" icon={BookOpen} />
            <CategoryTab id="payment" label="To'lov" icon={CreditCard} />
            <CategoryTab id="technical" label="Texnik" icon={PlayCircle} />
         </View>

         {/* FAQ List */}
         <Text style={[styles.sectionTitle, { color: theme.text }]}>Ko'p so'raladigan savollar</Text>
         <View style={styles.faqList}>
            {filteredFaqs.map((faq) => {
               const isExpanded = expandedId === faq.id;
               return (
                  <TouchableOpacity 
                    key={faq.id} 
                    onPress={() => toggleExpand(faq.id)}
                    style={[styles.faqItem, { backgroundColor: theme.card, borderColor: theme.border }]}
                    activeOpacity={0.7}
                  >
                     <View style={styles.faqHeader}>
                        <Text style={[styles.faqQuestion, { color: theme.text }]}>{faq.question}</Text>
                        {isExpanded ? <ChevronUp color={COLORS.primary} size={20} /> : <ChevronDown color={COLORS.gray[400]} size={20} />}
                     </View>
                     {isExpanded && (
                        <View style={styles.faqBody}>
                           <View style={[styles.divider, { backgroundColor: theme.border }]} />
                           <Text style={[styles.faqAnswer, { color: theme.textSecondary }]}>{faq.answer}</Text>
                        </View>
                     )}
                  </TouchableOpacity>
               );
            })}
         </View>

         {/* Contact Support */}
         <View style={[styles.supportBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.supportIcon}>
               <MessageCircle color="white" size={32} />
            </LinearGradient>
            <View style={styles.supportInfo}>
               <Text style={[styles.supportTitle, { color: theme.text }]}>Savolingiz bormi?</Text>
               <Text style={[styles.supportSub, { color: theme.textSecondary }]}>Bizning mutaxassislar sizga 24/7 yordam berishga tayyor.</Text>
            </View>
            <TouchableOpacity style={styles.chatBtn}>
               <Text style={styles.chatBtnText}>BOG'LANISH</Text>
               <ExternalLink color="white" size={14} />
            </TouchableOpacity>
         </View>

         <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 20, ...SHADOWS.light, zIndex: 10 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 60 },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '900' },
  
  searchWrapper: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, height: 50, borderRadius: 15, marginTop: 10 },
  searchInput: { flex: 1, paddingHorizontal: 12, fontSize: 14, fontWeight: '600' },

  scrollContent: { padding: 25 },
  catGrid: { flexDirection: 'row', gap: 10, marginBottom: 30 },
  catTab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 12, gap: 6 },
  catLabel: { fontSize: 11, fontWeight: '800' },

  sectionTitle: { fontSize: 18, fontWeight: '900', marginBottom: 20 },
  faqList: { gap: 12 },
  faqItem: { borderRadius: 24, borderWidth: 1, padding: 20, ...SHADOWS.light },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQuestion: { flex: 1, fontSize: 15, fontWeight: '700', lineHeight: 22, paddingRight: 10 },
  faqBody: { marginTop: 15 },
  divider: { height: 1, marginBottom: 15 },
  faqAnswer: { fontSize: 13, lineHeight: 22, fontWeight: '500' },

  supportBox: { marginTop: 40, padding: 25, borderRadius: 32, borderWidth: 1, alignItems: 'center', ...SHADOWS.medium },
  supportIcon: { width: 64, height: 64, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  supportInfo: { alignItems: 'center', marginBottom: 25 },
  supportTitle: { fontSize: 20, fontWeight: '900', marginBottom: 8 },
  supportSub: { fontSize: 13, textAlign: 'center', lineHeight: 20, paddingHorizontal: 20 },
  chatBtn: { backgroundColor: COLORS.primary, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 35, paddingVertical: 15, borderRadius: 20, ...SHADOWS.medium },
  chatBtnText: { color: 'white', fontSize: 14, fontWeight: '900', letterSpacing: 1 },
});

export default StudentHelpCenter;
