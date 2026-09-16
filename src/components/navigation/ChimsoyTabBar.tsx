import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ComponentType } from 'react';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarChart3, Gamepad2, Home, Trophy, User, Users } from 'lucide-react-native';
import { colors, radii, spacing, typography } from '@/src/theme/tokens';

type TabIconProps = { color: string; size: number; strokeWidth?: number };
type TabItem = { route: string; label: string; icon: ComponentType<TabIconProps> };

const tabs: TabItem[] = [
  { route: 'index', label: 'Accueil', icon: Home },
  { route: 'games', label: 'Jeux', icon: Gamepad2 },
  { route: 'communities', label: 'Communautés', icon: Users },
  { route: 'leaderboard', label: 'Classements', icon: BarChart3 },
  { route: 'profile', label: 'Profil', icon: User },
];

export function ChimsoyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}>
      <View style={styles.bar}>
        {tabs.map((tab) => {
          const routeIndex = state.routes.findIndex((route) => route.name === tab.route);
          const route = state.routes[routeIndex];
          if (!route) return null;

          const focused = state.index === routeIndex;
          const { options } = descriptors[route.key];
          const Icon = tab.icon;

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
          };

          return (
            <Pressable
              key={tab.route}
              accessibilityRole="tab"
              accessibilityLabel={options.tabBarAccessibilityLabel ?? tab.label}
              accessibilityState={focused ? { selected: true } : {}}
              onPress={onPress}
              style={({ pressed }) => [styles.item, focused && styles.itemActive, pressed && styles.pressed]}
            >
              <Icon color={focused ? colors.blue : colors.inkMuted} size={23} strokeWidth={2.4} />
              {focused && <Text style={styles.label}>{tab.label}</Text>}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: spacing.md, paddingTop: spacing.sm, backgroundColor: colors.ink },
  bar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.sm, backgroundColor: colors.inkSoft, borderRadius: radii.pill, minHeight: 68 },
  item: { minWidth: 50, height: 52, paddingHorizontal: spacing.md, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: spacing.sm, borderRadius: radii.pill },
  itemActive: { flex: 1, backgroundColor: 'rgba(26,63,228,0.15)' },
  label: { color: colors.blue, fontSize: 13, fontWeight: '700', fontFamily: typography.fontFamily.bold },
  pressed: { opacity: 0.78, transform: [{ scale: 0.96 }] },
});
