import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  Switch
} from 'react-native';
import { 
  User, 
  Settings, 
  CreditCard, 
  HelpCircle, 
  Shield, 
  LogOut, 
  ChevronRight,
  Bell,
  Moon
} from 'lucide-react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/store/useAuthStore';

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const { user, logout } = useAuthStore();

  const MenuItem = ({ icon: Icon, label, value, onPress, showChevron = true }: any) => (
    <TouchableOpacity 
      style={[styles.menuItem, { borderBottomColor: theme.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <View style={[styles.iconBox, { backgroundColor: theme.card }]}>
          <Icon size={20} color={theme.text} />
        </View>
        <Text style={[styles.menuLabel, { color: theme.text }]}>{label}</Text>
      </View>
      <View style={styles.menuItemRight}>
        {value && <Text style={[styles.menuValue, { color: theme.textSecondary }]}>{value}</Text>}
        {showChevron && <ChevronRight size={18} color={theme.icon} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={[styles.avatarBox, { backgroundColor: theme.card, borderColor: theme.gold }]}>
            <Text style={[styles.avatarText, { color: theme.text }]}>
              {user?.fullName?.charAt(0) || 'U'}
            </Text>
            <TouchableOpacity style={[styles.editBadge, { backgroundColor: theme.gold }]}>
              <Settings size={14} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.name, { color: theme.text }]}>{user?.fullName || 'Guest User'}</Text>
          <Text style={[styles.email, { color: theme.textSecondary }]}>{user?.email || 'Sign in to sync data'}</Text>
          
          <TouchableOpacity style={[styles.premiumBadge, { backgroundColor: theme.primary }]}>
            <Text style={[styles.premiumText, { color: theme.gold }]}>PREMIUM MEMBER</Text>
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>ACCOUNT</Text>
          <MenuItem 
            icon={User} 
            label="Personal Details" 
            onPress={() => {}} 
          />
          <MenuItem 
            icon={CreditCard} 
            label="Payment Methods" 
            value="Visa **** 4242"
            onPress={() => {}} 
          />
          <MenuItem 
            icon={Bell} 
            label="Notifications" 
            onPress={() => {}} 
          />
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>PREFERENCES</Text>
          <View style={[styles.menuItem, { borderBottomColor: theme.border }]}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconBox, { backgroundColor: theme.card }]}>
                <Moon size={20} color={theme.text} />
              </View>
              <Text style={[styles.menuLabel, { color: theme.text }]}>Dark Mode</Text>
            </View>
            <Switch 
              value={colorScheme === 'dark'}
              trackColor={{ false: theme.border, true: theme.gold }}
              thumbColor={colorScheme === 'dark' ? '#FFF' : '#FFF'}
            />
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>SUPPORT</Text>
          <MenuItem icon={HelpCircle} label="Help Center" onPress={() => {}} />
          <MenuItem icon={Shield} label="Privacy & Security" onPress={() => {}} />
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={logout}
        >
          <LogOut size={20} color={theme.error} />
          <Text style={[styles.logoutText, { color: theme.error }]}>Log Out</Text>
        </TouchableOpacity>

        <Text style={[styles.version, { color: theme.textSecondary }]}>Version 1.2.4 (Premium)</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  avatarBox: {
    width: 90,
    height: 90,
    borderRadius: BorderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: Spacing.md,
    position: 'relative',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '800',
  },
  editBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    marginBottom: Spacing.md,
  },
  premiumBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
  },
  premiumText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  section: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: Spacing.sm,
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuValue: {
    fontSize: 14,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: Spacing.xl,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.sm,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: Spacing.xl,
  },
});
