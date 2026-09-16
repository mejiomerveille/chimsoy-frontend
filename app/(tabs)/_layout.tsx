import { Tabs } from 'expo-router';
import { ChimsoyTabBar } from '@/src/components/navigation/ChimsoyTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <ChimsoyTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: 'Accueil' }} />
      <Tabs.Screen name="games" options={{ title: 'Jeux' }} />
      <Tabs.Screen name="communities" options={{ title: 'Communautés' }} />
      <Tabs.Screen name="leaderboard" options={{ title: 'Classements' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
    </Tabs>
  );
}
