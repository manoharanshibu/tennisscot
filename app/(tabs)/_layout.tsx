import React from 'react'; import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import { useSession } from '@/components/SessionContext';

export default function TabLayout() {
  const { session } = useSession(); // Use context instead of local state
  const tabIcon = (source: any, enabled: boolean) => (<Image source={source} resizeMode="contain" style={!enabled ? { tintColor: 'gray', opacity: 0.5 } : undefined} />);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#059669',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#0061a8',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: () => tabIcon(require('../../assets/images/Home.png'), true),
        }}
      />

      <Tabs.Screen
        name="performance"
        listeners={{
          tabPress: e => {
            if (!session?.loggedIn) e.preventDefault();
          },
        }}
        options={{
          title: '',
          tabBarIcon: () => tabIcon(require('../../assets/images/Performance.png'), session?.loggedIn),
        }}
      />

      <Tabs.Screen
        name="scores"
        listeners={{
          tabPress: e => {
            if (!session?.loggedIn) e.preventDefault();
          },
        }}
        options={{
          title: '',
          tabBarIcon: () => tabIcon(require('../../assets/images/Scores.png'), session?.loggedIn),
        }}
      />

      <Tabs.Screen
        name="notifications"
        listeners={{
          tabPress: e => {
            if (!session?.loggedIn) e.preventDefault();
          },
        }}
        options={{
          title: '',
          tabBarIcon: () => tabIcon(require('../../assets/images/Notifications.png'), session?.loggedIn),
        }}
      />

      <Tabs.Screen
        name="settings"
        listeners={{
          tabPress: e => {
            if (!session?.loggedIn) e.preventDefault();
          },
        }}
        options={{
          title: '',
          tabBarIcon: () => tabIcon(require('../../assets/images/Settings.png'), session?.loggedIn),
        }}
      />
    </Tabs>
  );
} 
