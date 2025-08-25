import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, AppState } from 'react-native';

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

  useEffect(() => {
    // Load session on initial render
    const loadSession = async () => {
      try {
        const data = await AsyncStorage.getItem('session');
        if (data) setSession(JSON.parse(data));
      } catch (e) {
        console.error('Failed to load session', e);
      }
    };
    loadSession();

    // Handle app state changes (foreground, background, etc.)
    const handleAppStateChange = (nextAppState: string) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // App is coming to the foreground
        console.log('App is active');
      } else if (nextAppState === 'background') {
        // App is going to the background, clear session
        console.log('App is in background, logging out');
        logoutUser();
      }
      setAppState(nextAppState);
    };

    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    // Clean up listener on unmount
    return () => {
      appStateSubscription.remove();  // Correct way to remove the subscription
    };
  }, [appState]);

  // Function to logout and clear session
  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem('session'); // Remove session data from AsyncStorage
      setSession({ loggedIn: false }); // Update context state
    } catch (e) {
      console.error('Failed to logout', e);
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
