import React, { useEffect } from 'react';
import { router, Tabs, usePathname } from 'expo-router';
import { Image, ImageSourcePropType } from 'react-native';
import { useSession } from '@/components/SessionContext';

// Icon map for each tab
const TAB_ICONS: Record<string, ImageSourcePropType> = {
  index: require('../../assets/images/Home.png'),
  performance: require('../../assets/images/Performance.png'),
  scores: require('../../assets/images/Scores.png'),
  notifications: require('../../assets/images/Notifications.png'),
  settings: require('../../assets/images/Settings.png'),
};

// Tab icon component that updates based on login state
const TabIcon = ({
  source,
  enabled,
}: {
  source: ImageSourcePropType;
  enabled: boolean;
}) => (
  <Image
    source={source}
    resizeMode="contain"
    style={{
      tintColor: enabled ? undefined : 'white',
      opacity: enabled ? 1 : 0.3,
    }}
  />
);

export default function TabLayout() {
  const { session } = useSession();
  const isLoggedIn = session?.loggedIn;
  const pathname = usePathname();

  // 🔒 Redirect to login/home screen if not logged in
  useEffect(() => {
    console.log(pathname)
    if (pathname !== '/' && !session?.loggedIn) {
      try {
        router.replace('/(tabs)');

      } catch (error) {
        console.error(error);

      }
    }
  }, [session]);

  const screenOptions = {
    headerShown: false,
    tabBarActiveTintColor: '#059669',
    tabBarInactiveTintColor: '#6b7280',
    tabBarStyle: {
      backgroundColor: '#0061a8',
      paddingBottom: 8,
      paddingTop: 8,
      height: 80,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '600',
      marginTop: 4,
    },
  };

  const guardedScreens = ['performance', 'scores', 'notifications', 'settings'];

  return (
    // 👇 Key changes when isLoggedIn changes = force re-render
    <Tabs key={isLoggedIn ? 'loggedIn' : 'loggedOut'} screenOptions={screenOptions}>
      {Object.entries(TAB_ICONS).map(([name, icon]) => (
        <Tabs.Screen
          key={name}
          name={name}
          listeners={
            guardedScreens.includes(name)
              ? {
                tabPress: e => {
                  if (!isLoggedIn) e.preventDefault();
                  if (name === 'scores' || name === 'notifications') e.preventDefault();
                },
              }
              : undefined
          }
          options={{
            title: '',
            tabBarIcon: () => (
              <TabIcon source={icon} enabled={(name !== 'scores' && name !== 'notifications') && (name === 'index' || isLoggedIn)} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
