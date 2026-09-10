import { Redirect } from 'expo-router';
import { useAppStore } from '@/src/store/useAppStore';

export default function Index() {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  return <Redirect href={isAuthenticated ? '/(tabs)' : '/(auth)/splash'} />;
}
