import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, AppState } from 'react-native';
import { router } from 'expo-router';

interface Session {
  username?: string;
  role?: string;
  loggedIn: boolean;
}

interface SessionContextValue {
  session: Session;
  setSession: (session: Session) => void;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session>({ loggedIn: false });
  const [appState, setAppState] = useState(AppState.currentState);
  const idleTime = .1;

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: string) => {
      if (nextAppState === 'background') {
        const now = new Date().toISOString();
        await AsyncStorage.setItem('lastBackgrounded', now);
        console.log('App went to background at:', now);
      }

      if (nextAppState === 'active') {
        const lastTime = await AsyncStorage.getItem('lastBackgrounded');
        if (lastTime) {
          const diffMs = new Date().getTime() - new Date(lastTime).getTime();
          const diffMins = diffMs / 1000 / 60;
          if (diffMins > idleTime) {
            logoutUser();
            console.log('App likely terminated and restarted');
          } else {
            console.log('App just resumed from background');
          }
        }
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, [appState]);


  // Function to logout and clear session
  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem('session'); // Remove session data from AsyncStorage
      setSession({ loggedIn: false }); // Update context state
      try {
        router.replace('/(tabs)');

      } catch (error) {
        console.error(error);

      }
    } catch (e) {
      console.error('Fail)ed to logout', e);
    }
  };

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextValue => {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within a SessionProvider');
  return ctx;
};
