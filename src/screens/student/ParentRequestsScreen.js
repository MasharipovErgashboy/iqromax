import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  FlatList, 
  Image 
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme.js';
import { ChevronLeft, UserCheck, UserX, Users } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MOCK_REQUESTS = [
  { id: '1', parentName: 'Ergashboy Masharipov' },
  { id: '2', parentName: 'Zulayxo Masharipova' },
];

const ParentRequestsScreen = ({ navigation }) => {
  const [requests, setRequests] = useState(MOCK_REQUESTS);

  const handleAction = (id, type) => {
    // In a real app, this would call an API
    setRequests(prev => prev.filter(req => req.id !== id));
  };

  const renderRequestItem = ({ item }) => (
    <View style={styles.requestCard}>
      <View style={styles.parentInfo}>
        <View style={styles.iconBox}>
          <Users color={COLORS.primary} size={24} />
        </View>
        <View style={styles.nameBox}>
          <Text style={styles.parentLabel}>Ota-ona so'rovi</Text>
          <Text style={styles.parentName}>{item.parentName}</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionBtn, styles.rejectBtn]}
          onPress={() => handleAction(item.id, 'reject')}
        >
          <UserX color={COLORS.error} size={20} />
          <Text style={styles.rejectText}>Rad etish</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionBtn, styles.acceptBtn]}
          onPress={() => handleAction(item.id, 'accept')}
        >
          <UserCheck color={COLORS.white} size={20} />
          <Text style={styles.acceptText}>Tasdiqlash</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <ChevronLeft color={COLORS.gray[900]} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ota-onani tasdiqlash</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {requests.length > 0 ? (
          <FlatList
            data={requests}
            renderItem={renderRequestItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Users color={COLORS.gray[300]} size={60} />
            </View>
            <Text style={styles.emptyTitle}>Hozircha so'rovlar yo'q</Text>
            <Text style={styles.emptySub}>Ota-onangiz so'rov yuborganda bu yerda ko'rinadi</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray[50],
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.gray[900],
  },
  content: {
    flex: 1,
  },
  listContent: {
    padding: SPACING.lg,
  },
  requestCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  parentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary + '10',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  nameBox: {
    flex: 1,
  },
  parentLabel: {
    fontSize: 12,
    color: COLORS.gray[400],
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  parentName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.gray[900],
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  actionBtn: {
    flex: 1,
    height: 50,
    borderRadius: BORDER_RADIUS.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  rejectBtn: {
    backgroundColor: COLORS.gray[50],
    borderWidth: 1,
    borderColor: COLORS.gray[100],
  },
  acceptBtn: {
    backgroundColor: COLORS.primary,
  },
  rejectText: {
    color: COLORS.error,
    fontWeight: '700',
    fontSize: 14,
  },
  acceptText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xxl,
  },
  emptyIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.gray[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.gray[800],
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 14,
    color: COLORS.gray[400],
    textAlign: 'center',
    lineHeight: 20,
  }
});

export default ParentRequestsScreen;
