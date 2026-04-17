import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions,
  Image
} from 'react-native';
import { 
  BarChart3, 
  Calendar, 
  Clock, 
  User, 
  TrendingUp, 
  MessageSquare,
  Settings,
  Plus
} from 'lucide-react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/store/useAuthStore';
import { MOCK_BOOKINGS } from '@/services/mock-data';

const { width } = Dimensions.get('window');

export default function BarberDashboard() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const { user, logout } = useAuthStore();

  const stats = [
    { label: 'Today', value: '$245', icon: TrendingUp },
    { label: 'Weekly', value: '$1.4k', icon: BarChart3 },
    { label: 'Rating', value: '4.9', icon: MessageSquare },
  ];

  const todayAppointments = MOCK_BOOKINGS.slice(0, 3);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.textSecondary }]}>Good morning,</Text>
            <Text style={[styles.name, { color: theme.text }]}>{user?.fullName || 'Barber'}</Text>
          </View>
          <TouchableOpacity style={[styles.settingsButton, { backgroundColor: theme.card }]}>
            <Settings size={20} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, i) => (
            <View key={i} style={[styles.statCard, { backgroundColor: theme.card }]}>
              <View style={[styles.statIconBox, { backgroundColor: theme.background }]}>
                <stat.icon size={18} color={theme.gold} />
              </View>
              <Text style={[styles.statValue, { color: theme.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Next Client Card */}
        <View style={[styles.nextClientCard, { backgroundColor: theme.primary }]}>
           <View style={styles.nextClientHeader}>
              <Text style={[styles.nextLabel, { color: theme.gold }]}>NEXT CLIENT</Text>
              <View style={[styles.timeTag, { backgroundColor: 'rgba(212,175,55,0.2)' }]}>
                <Text style={[styles.timeTagText, { color: theme.gold }]}>In 15 mins</Text>
              </View>
           </View>
           <View style={styles.clientInfoBox}>
              <View style={styles.clientDetails}>
                <Text style={styles.clientName}>Alexander Graham</Text>
                <Text style={styles.clientService}>Skin Fade + Beard Trim</Text>
              </View>
              <View style={styles.clientTime}>
                <Text style={styles.startTime}>14:30</Text>
              </View>
           </View>
           <TouchableOpacity style={[styles.manageButton, { backgroundColor: theme.gold }]}>
              <Text style={styles.manageButtonText}>Arrived</Text>
           </TouchableOpacity>
        </View>

        {/* Schedule Preview */}
        <View style={styles.sectionHeader}>
           <Text style={[styles.sectionTitle, { color: theme.text }]}>Today's Schedule</Text>
           <TouchableOpacity>
             <Text style={[styles.viewAll, { color: theme.gold }]}>View Calendar</Text>
           </TouchableOpacity>
        </View>

        {todayAppointments.map((item, i) => (
          <View key={i} style={[styles.scheduleRow, { borderBottomColor: theme.border }]}>
             <View style={styles.scheduleTime}>
                <Text style={[styles.schedTimeText, { color: theme.text }]}>{item.time}</Text>
                <Text style={[styles.schedDur, { color: theme.textSecondary }]}>{item.duration}m</Text>
             </View>
             <View style={styles.scheduleDivider} />
             <View style={styles.scheduleInfo}>
                <Text style={[styles.schedClient, { color: theme.text }]}>{item.clientName}</Text>
                <Text style={[styles.schedService, { color: theme.textSecondary }]}>{item.serviceName}</Text>
             </View>
             <View style={[styles.statusPoint, { backgroundColor: theme.gold }]} />
          </View>
        ))}

        <TouchableOpacity style={[styles.addSlotButton, { borderColor: theme.border }]}>
           <Plus size={20} color={theme.text} />
           <Text style={[styles.addSlotText, { color: theme.text }]}>Add Manual Booking</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '500',
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  statIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  nextClientCard: {
    padding: 24,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.xl,
  },
  nextClientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  nextLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  timeTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  timeTagText: {
    fontSize: 12,
    fontWeight: '700',
  },
  clientInfoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  clientDetails: {
    flex: 1,
  },
  clientName: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  clientService: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
  },
  clientTime: {
    alignItems: 'flex-end',
  },
  startTime: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
  },
  manageButton: {
    height: 52,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  manageButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '800',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '700',
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  scheduleTime: {
    width: 60,
  },
  schedTimeText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  schedDur: {
    fontSize: 12,
  },
  scheduleDivider: {
    width: 2,
    height: 30,
    backgroundColor: 'rgba(212,175,55,0.3)',
    marginHorizontal: 16,
    borderRadius: 1,
  },
  scheduleInfo: {
    flex: 1,
  },
  schedClient: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  schedService: {
    fontSize: 13,
  },
  statusPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  addSlotButton: {
    marginTop: Spacing.xl,
    height: 56,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  addSlotText: {
    fontSize: 15,
    fontWeight: '700',
  },
});
