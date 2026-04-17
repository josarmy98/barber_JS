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
  Users, 
  DollarSign, 
  TrendingUp, 
  Store, 
  Plus, 
  ChevronRight,
  MoreVertical,
  Briefcase
} from 'lucide-react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/store/useAuthStore';
import { MOCK_BARBERS } from '@/services/mock-data';

const { width } = Dimensions.get('window');

export default function OwnerDashboard() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const { user, logout } = useAuthStore();

  const businessStats = [
    { label: 'Revenue', value: '$14.2k', change: '+12%', icon: DollarSign },
    { label: 'Customers', value: '452', change: '+5%', icon: Users },
    { label: 'Avg Ticket', value: '$45', change: '+2%', icon: TrendingUp },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
           <View>
              <Text style={[styles.shopTitle, { color: theme.text }]}>The Golden Scissor</Text>
              <Text style={[styles.ownerBadge, { color: theme.gold }]}>MANAGEMENT CONSOLE</Text>
           </View>
           <TouchableOpacity style={[styles.profileButton, { backgroundColor: theme.card }]}>
              <View style={[styles.avatarPlaceholder, { backgroundColor: theme.gold }]}>
                 <Text style={{ color: '#000', fontWeight: '800' }}>{user?.fullName[0]}</Text>
              </View>
           </TouchableOpacity>
        </View>

        {/* Business Analytics Horizontal */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.statsScroll}
        >
          {businessStats.map((stat, i) => (
            <View key={i} style={[styles.statCard, { backgroundColor: theme.card }]}>
               <View style={styles.statHeader}>
                  <View style={[styles.statIconBox, { backgroundColor: theme.background }]}>
                    <stat.icon size={18} color={theme.gold} />
                  </View>
                  <Text style={[styles.changeText, { color: theme.success }]}>{stat.change}</Text>
               </View>
               <Text style={[styles.statValue, { color: theme.text }]}>{stat.value}</Text>
               <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Main Actions */}
        <View style={styles.actionGrid}>
           <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.primary }]}>
              <Plus size={24} color={theme.gold} />
              <Text style={[styles.actionBtnText, { color: '#FFF' }]}>Add Service</Text>
           </TouchableOpacity>
           <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.card }]}>
              <Store size={24} color={theme.text} />
              <Text style={[styles.actionBtnText, { color: theme.text }]}>Edit Shop</Text>
           </TouchableOpacity>
        </View>

        {/* Staff Management Section */}
        <View style={styles.sectionHeader}>
           <Text style={[styles.sectionTitle, { color: theme.text }]}>Staff Performance</Text>
           <TouchableOpacity>
              <Text style={[styles.viewAll, { color: theme.gold }]}>Manage All</Text>
           </TouchableOpacity>
        </View>

        {MOCK_BARBERS.map((barber) => (
          <TouchableOpacity 
            key={barber.id} 
            style={[styles.staffRow, { backgroundColor: theme.card }]}
          >
             <Image source={{ uri: barber.avatarUrl }} style={styles.staffAvatar} />
             <View style={styles.staffInfo}>
                <Text style={[styles.staffName, { color: theme.text }]}>{barber.fullName}</Text>
                <Text style={[styles.staffRole, { color: theme.textSecondary }]}>Senior Barber</Text>
                <View style={styles.performanceRow}>
                   <Text style={[styles.perfText, { color: theme.textSecondary }]}>{barber.rating} ★</Text>
                   <View style={styles.dot} />
                   <Text style={[styles.perfText, { color: theme.textSecondary }]}>$2.4k sales</Text>
                </View>
             </View>
             <ChevronRight size={18} color={theme.icon} />
          </TouchableOpacity>
        ))}

        {/* Subscription Info */}
        <View style={[styles.subscriptionCard, { borderColor: theme.gold }]}>
           <View style={styles.subHeader}>
              <Briefcase size={20} color={theme.gold} />
              <Text style={[styles.subTitle, { color: theme.gold }]}>PRO PLAN ACTIVE</Text>
           </View>
           <Text style={[styles.subDesc, { color: theme.textSecondary }]}>
              Your subscription renews on June 15th. You have 4/5 barber slots filled.
           </Text>
           <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.gold }]}>
              <Text style={styles.upgradeBtnText}>Manage Subscription</Text>
           </TouchableOpacity>
        </View>

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
    marginBottom: Spacing.xl,
    marginTop: Spacing.sm,
  },
  shopTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 2,
  },
  ownerBadge: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    padding: 3,
  },
  avatarPlaceholder: {
    flex: 1,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsScroll: {
    gap: 12,
    marginBottom: Spacing.xl,
    paddingRight: Spacing.md,
  },
  statCard: {
    width: width * 0.45,
    padding: 20,
    borderRadius: BorderRadius.xl,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: Spacing.xl,
  },
  actionBtn: {
    flex: 1,
    height: 60,
    borderRadius: BorderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  actionBtnText: {
    fontSize: 15,
    fontWeight: '700',
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
  staffRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
  },
  staffAvatar: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.md,
    marginRight: 16,
  },
  staffInfo: {
    flex: 1,
  },
  staffName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  staffRole: {
    fontSize: 12,
    marginBottom: 6,
  },
  performanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  perfText: {
    fontSize: 12,
    fontWeight: '500',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#999',
  },
  subscriptionCard: {
    marginTop: Spacing.lg,
    padding: 24,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  subDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  upgradeBtn: {
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upgradeBtnText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '800',
  },
});
