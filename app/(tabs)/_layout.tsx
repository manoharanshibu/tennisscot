import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function TabLayout() {
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
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require('../../assets/images/Home.png')}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="performance"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require('../../assets/images/Performance.png')}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scores"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require('../../assets/images/Scores.png')}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require('../../assets/images/Notifications.png')}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require('../../assets/images/Settings.png')}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}