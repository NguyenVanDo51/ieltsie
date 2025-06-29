import { Tabs } from 'expo-router'
import { StyleSheet } from 'react-native'
import { Home, BookOpen, Trophy, User } from 'lucide-react-native'
import { designTokens } from '~/components/design-system'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: designTokens.colors.primary[500],
        tabBarInactiveTintColor: designTokens.colors.neutral[400],
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Học',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="lessons"
        options={{
          title: 'Bài học',
          tabBarIcon: ({ color, size }) => (
            <BookOpen size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          title: 'Thành tích',
          tabBarIcon: ({ color, size }) => (
            <Trophy size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Cá nhân',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: designTokens.colors.white,
    borderTopWidth: 1,
    borderTopColor: designTokens.colors.neutral[200],
    paddingTop: designTokens.spacing.sm,
    paddingBottom: designTokens.spacing.md,
    height: 80,
    ...designTokens.shadows.lg,
  },
  tabBarLabel: {
    fontSize: designTokens.typography.fontSize.xs,
    fontWeight: designTokens.typography.fontWeight.medium,
    marginTop: 4,
  },
  tabBarIcon: {
    marginBottom: -4,
  },
})