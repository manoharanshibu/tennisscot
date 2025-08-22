import React from 'react';
import { SessionProvider } from './SessionContext';
import { Slot } from 'expo-router';

export default function AppLayout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
