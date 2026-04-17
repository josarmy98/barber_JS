import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/store/useAuthStore';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated, role } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Basic Auth Guard Logic
    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to login if not authenticated and not in auth group
      // router.replace('/(auth)/login'); 
      // For now, we allow access to start building, but this is where the logic goes
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect based on role if logged in
      if (role === 'client') router.replace('/(client)');
      if (role === 'barber') router.replace('/(barber)');
      if (role === 'owner') router.replace('/(owner)');
      if (role === 'admin') router.replace('/(admin)');
    }
  }, [isAuthenticated, segments, role]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
        <Stack.Screen name="(client)" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="(barber)" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="(owner)" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="(admin)" options={{ animation: 'fade' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: true, title: 'Settings' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

