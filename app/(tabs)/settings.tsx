import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy } from 'lucide-react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem('session', JSON.stringify({ loggedIn: false }));
      router.replace('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1e40af', '#1e3a8a']} style={styles.header}>
        <Trophy size={32} color="#ffffff" style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Settings Page</Text>
      </LinearGradient>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.containerItem}
          onPress={handleLogout}
          activeOpacity={0.95}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'center',
  },
  headerIcon: {
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#dbeafe',
    textAlign: 'center',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  containerItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0061A8',
    boxShadow: '2px 6px 20px 0px #000000',
    margin: 20,
    width: 319,
    height: 72,
    textAlign: 'center',
  },
  logoutText: {
    display: 'flex',
    fontFamily: 'Segoe UI',
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
    alignItems: 'center',
    margin: 4,
    textAlign: 'center',
  },
});
