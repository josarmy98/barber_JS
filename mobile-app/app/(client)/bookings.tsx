import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  Image
} from 'react-native';
import { Calendar, Clock, MapPin, ChevronRight, User } from 'lucide-react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MOCK_BOOKINGS } from '@/services/mock-data';

export default function BookingsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const renderBooking = ({ item }: { item: typeof MOCK_BOOKINGS[0] }) => (
    <TouchableOpacity 
      style={[styles.bookingCard, { backgroundColor: theme.card }]}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'CONFIRMED' ? '#DEEFE1' : theme.background }]}>
          <Text style={[styles.statusText, { color: item.status === 'CONFIRMED' ? '#2E7D32' : theme.textSecondary }]}>
            {item.status}
          </Text>
        </View>
        <Text style={[styles.price, { color: theme.gold }]}>${item.totalPrice}</Text>
      </View>
      
      <View style={styles.mainInfo}>
        <View>
          <Text style={[styles.shopName, { color: theme.text }]}>{item.shopName}</Text>
          <Text style={[styles.serviceName, { color: theme.textSecondary }]}>{item.serviceName}</Text>
        </View>
        <ChevronRight size={20} color={theme.icon} />
      </View>

      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Calendar size={14} color={theme.textSecondary} />
          <Text style={[styles.detailText, { color: theme.textSecondary }]}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Clock size={14} color={theme.textSecondary} />
          <Text style={[styles.detailText, { color: theme.textSecondary }]}>{item.time}</Text>
        </View>
        <View style={styles.detailItem}>
          <User size={14} color={theme.textSecondary} />
          <Text style={[styles.detailText, { color: theme.textSecondary }]}>{item.barberName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>My Appointments</Text>
      </View>
      
      <FlatList
        data={MOCK_BOOKINGS}
        keyExtractor={(item) => item.id}
        renderItem={renderBooking}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Calendar size={48} color={theme.border} />
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No appointments yet</Text>
            <TouchableOpacity 
              style={[styles.browseButton, { backgroundColor: theme.gold }]}
              onPress={() => {}} // Navigate to shop discovery
            >
              <Text style={styles.browseButtonText}>Browse Shops</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  bookingCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.xs,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  shopName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    marginBottom: Spacing.md,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  browseButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: BorderRadius.md,
  },
  browseButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
  },
});
