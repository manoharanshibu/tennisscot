import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { SessionProvider } from '@/components/SessionContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <SessionProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </SessionProvider>
  );
}
