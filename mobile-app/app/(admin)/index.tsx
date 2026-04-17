import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/store/useAuthStore';
import { Users, Store, Calendar, Shield, Settings, LogOut, TrendingUp } from 'lucide-react-native';

export default function AdminDashboard() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const { logout } = useAuthStore();

  const stats = [
    { label: 'Total Clients', value: '1,240', icon: Users, color: '#2196F3' },
    { label: 'Active Shops', value: '85', icon: Store, color: theme.gold },
    { label: 'Bookings Today', value: '450', icon: Calendar, color: theme.success },
    { label: 'Total Revenue', value: '$12.5k', icon: TrendingUp, color: '#9C27B0' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.welcomeText, { color: theme.textSecondary }]}>Platform Control</Text>
          <Text style={[styles.title, { color: theme.text }]}>Super Admin</Text>
        </View>
        <TouchableOpacity style={[styles.settingsButton, { backgroundColor: theme.card }]}>
          <Settings size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.statsGrid}>
          {stats.map((stat, i) => (
            <View key={i} style={[styles.statCard, { backgroundColor: theme.card }]}>
              <View style={[styles.iconBox, { backgroundColor: stat.color + '20' }]}>
                <stat.icon size={24} color={stat.color} />
              </View>
              <Text style={[styles.statValue, { color: theme.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actionSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Management</Text>
          <TouchableOpacity style={[styles.actionItem, { backgroundColor: theme.card }]}>
            <Shield size={20} color={theme.text} />
            <Text style={[styles.actionLabel, { color: theme.text }]}>Pending Shop Approvals</Text>
            <View style={[styles.badge, { backgroundColor: theme.error }]}>
              <Text style={styles.badgeText}>5</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionItem, { backgroundColor: theme.card }]}>
            <Users size={20} color={theme.text} />
            <Text style={[styles.actionLabel, { color: theme.text }]}>User Moderation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionItem, { backgroundColor: theme.card }]}>
            <Settings size={20} color={theme.text} />
            <Text style={[styles.actionLabel, { color: theme.text }]}>System Settings</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.logoutButton, { borderColor: theme.error }]}
          onPress={logout}
        >
          <LogOut size={20} color={theme.error} />
          <Text style={[styles.logoutText, { color: theme.error }]}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  welcomeText: {
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  settingsButton: {
    padding: 10,
    borderRadius: 12,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: Spacing.xl,
  },
  statCard: {
    width: '47%',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 14,
  },
  actionSection: {
    gap: 12,
    marginBottom: Spacing.xxl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    gap: 12,
  },
  actionLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    gap: 8,
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
