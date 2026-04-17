import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';
import { UserRole } from '@/types'; // Consolidated type
import { Scissors, Briefcase, User, Info, Smartphone, ShieldCheck } from 'lucide-react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width } = Dimensions.get('window');

export default function RoleSelection() {
  const [selected, setSelected] = useState<UserRole | null>(null);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const roles: { id: UserRole; title: string; description: string; icon: any }[] = [
    {
      id: 'client',
      title: 'I want to Book',
      description: 'Discover the best barbers in your area and book in seconds.',
      icon: User,
    },
    {
      id: 'barber',
      title: 'I am a Barber',
      description: 'Manage your personal schedule, portfolio, and earnings.',
      icon: Scissors,
    },
    {
      id: 'owner',
      title: 'I own a Shop',
      description: 'Run your business, manage staff, and grow your brand.',
      icon: Briefcase,
    },
  ];

  const handleContinue = () => {
    if (selected) {
      setUser({
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email: 'demo@barberhub.com',
        fullName: 'Demo User',
        role: selected,
        createdAt: new Date().toISOString(),
      });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>How will you use BarberHub?</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Select your primary role to customize your experience.
          </Text>
        </View>

        <View style={styles.rolesContainer}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={[
                styles.card,
                { backgroundColor: theme.card },
                selected === role.id && { borderColor: theme.gold, borderWidth: 2 }
              ]}
              onPress={() => setSelected(role.id)}
              activeOpacity={0.8}
            >
              <View style={[
                styles.iconContainer, 
                { backgroundColor: selected === role.id ? theme.gold : theme.background }
              ]}>
                <role.icon 
                  size={28} 
                  color={selected === role.id ? '#000' : theme.icon} 
                />
              </View>
              <View style={styles.cardInfo}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>{role.title}</Text>
                <Text style={[styles.cardDesc, { color: theme.textSecondary }]}>{role.description}</Text>
              </View>
              {selected === role.id && (
                <View style={[styles.checkBadge, { backgroundColor: theme.gold }]}>
                  <ShieldCheck size={14} color="#000" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.button, 
              { backgroundColor: selected ? theme.gold : theme.border }
            ]}
            onPress={handleContinue}
            disabled={!selected}
          >
            <Text style={[styles.buttonText, { color: selected ? '#000' : theme.textSecondary }]}>
              Get Started
            </Text>
          </TouchableOpacity>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            You can change your role later in settings.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.xl,
    justifyContent: 'center',
  },
  header: {
    marginBottom: Spacing.xxl,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  rolesContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
  checkBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 56,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
