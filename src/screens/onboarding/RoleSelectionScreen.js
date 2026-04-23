import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme.js';
import { User, Users, GraduationCap, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const RoleCard = ({ title, subtitle, icon: Icon, color, onPress }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={onPress}
    activeOpacity={0.9}
  >
    <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
      <Icon color={color} size={32} />
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
    <View style={styles.chevronContainer}>
      <ChevronRight color={COLORS.gray[400]} size={24} />
    </View>
  </TouchableOpacity>
);

const RoleSelectionScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Kim bo'lib kirasiz?</Text>
          <Text style={styles.subtitle}>O'zingizga mos rolni tanlang</Text>
        </View>

        <View style={styles.cardsContainer}>
          <RoleCard
            title="O'quvchi"
            subtitle="Mashq qiling va XP to'plang"
            icon={GraduationCap}
            color={COLORS.primary}
            onPress={() => navigation.navigate('StudentAuth')}
          />
          
          <RoleCard
            title="Ota-ona"
            subtitle="Bolangiz progressini kuzating"
            icon={Users}
            color={COLORS.accent}
            onPress={() => navigation.navigate('ParentAuth')}
          />

          <RoleCard
            title="O'qituvchi"
            subtitle="Dars o'ting va boshqaring"
            icon={User}
            color={COLORS.secondary}
            onPress={() => navigation.navigate('TeacherRegistration')}
          />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Tizimga kirish orqali siz bizning foydalanish shartlarimizga rozilik bildirasiz.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.xl,
  },
  header: {
    marginTop: SPACING.xxl,
    marginBottom: SPACING.xxl,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.gray[900],
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.gray[500],
  },
  cardsContainer: {
    gap: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.light,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray[900],
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.gray[500],
  },
  chevronContainer: {
    paddingLeft: SPACING.sm,
  },
  infoBox: {
    marginTop: SPACING.xxl,
    padding: SPACING.lg,
    backgroundColor: COLORS.gray[100],
    borderRadius: BORDER_RADIUS.md,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: COLORS.gray[300],
  },
  infoText: {
    fontSize: 12,
    color: COLORS.gray[500],
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default RoleSelectionScreen;
