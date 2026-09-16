import { Redirect, Stack } from 'expo-router';
import { useAppStore } from '@/src/store/useAppStore';

export default function AuthLayout() {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="language" />
      <Stack.Screen name="login" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="reset-password" />
      <Stack.Screen name="create-profile" />
    </Stack>
  );
}
