// app/index.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { LogIn, UserPlus, Lock, User } from 'lucide-react-native';
import { ROLE_TYPES } from './constants';

export default function Index() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const sessionData = await AsyncStorage.getItem('session');
        if (sessionData) {
          const session = JSON.parse(sessionData);
          setLoggedIn(session.loggedIn);
          console.log('Logged in user:', session.username);
          console.log('Role:', session.role);
        }
      } catch (e) {
        console.error('Failed to load session', e);
      }
    };

    loadSession();
  }, []);

  function LandingScreen() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome!</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/evaluation')}>
          <Text style={styles.buttonText}>Self Evaluation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/performance')}>
          <Text style={styles.buttonText}>Performance Report</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/schedules')}>
          <Text style={styles.buttonText}>Schedules</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/book')}>
          <Text style={styles.buttonText}>Book a Court</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            try {
              await AsyncStorage.removeItem('session');
              setLoggedIn(false);
            } catch (error) {
              console.error('Logout failed:', error);
            }
          }}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const userNames = [
      { name: 'Raffael', role: ROLE_TYPES.TENNIS },
      { name: 'Roger', role: ROLE_TYPES.FITNESS },
      { name: 'Andre', role: ROLE_TYPES.TENNISFITNESS },
    ];

    const NOT_FOUND = 'Role not found';

    const getRoleByName = (name: string) => {
      const user = userNames.find((u) => u.name === name);
      return user?.role ?? NOT_FOUND;
    };

    const handleLogin = async () => {
      if (!username.trim() || !password.trim()) {
        Alert.alert('Error', 'Please enter both username and password');
        return;
      }

      const role = getRoleByName(username);
      if (role === NOT_FOUND) {
        Alert.alert('Error', 'Invalid username or password');
        return;
      }

      try {
        await AsyncStorage.setItem(
          'session',
          JSON.stringify({ username, role, loggedIn: true })
        );
        setLoggedIn(true);
      } catch (error) {
        console.error('Error saving session', error);
        Alert.alert('Error', 'Unable to save session data');
      }
    };

    const handleSignup = () => {
      Alert.alert('Sign Up', 'Sign up functionality will be available soon!');
    };

    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.bannerContainer}>
            <Image
              source={require('../../assets/images/bg.png')}
              style={styles.bannerImage}
              resizeMode="cover"
            />
            <Image
              source={require('../../assets/images/tennis-scotland-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.loginContainer}>
            <Image
              source={require('../../assets/images/tennis-player.png')}
              style={styles.tennisPlayer}
              resizeMode="cover"
            />

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <User size={20} color="#6b7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Username"
                  placeholderTextColor="#9ca3af"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <Lock size={20} color="#6b7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.signupButton}
                  onPress={handleSignup}
                  activeOpacity={0.8}
                >
                  <UserPlus size={18} color="#059669" />
                  <Text style={styles.signupButtonText}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLogin}
                  activeOpacity={0.8}
                >
                  <LogIn size={18} color="#ffffff" />
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <Text style={styles.version}>Version 2.1</Text>
      </SafeAreaView>
    );
  }

  return loggedIn ? <LandingScreen /> : <LoginScreen />;
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0061a8',
  },
  scrollContainer: {
    paddingBottom: 32,
  },
  bannerContainer: {
    position: 'relative',
    width: '100%',
    height: 240,
  },
  loginContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  bannerImage: {
    backgroundColor: '#0061a8',
    width: '100%',
    height: '100%',
    maxWidth: 500,
    maxHeight: 500,
  },
  logo: {
    position: 'absolute',
    top: 80,
    left: 20,
    width: 180,
    height: 60,
    zIndex: 10,
  },
  tennisPlayer: {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -10,
    maxWidth: 600,
    maxHeight: 600,
  },
  formContainer: {
    padding: 32,
    marginHorizontal: 20,
    marginTop: 40,
    elevation: 8,
    maxWidth: 600,
    maxHeight: 600,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  version: {
    zIndex: 10,
    textAlign: 'right',
    right: 10,
    color: '#ffffff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  signupButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#16316F',
    marginRight: 8,
    width: 111,
    height: 50,
  },
  signupButtonText: {
    fontSize: 21,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 8,
  },
  loginButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#16316F',
    width: 111,
    height: 50,
  },
  loginButtonText: {
    fontSize: 21,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#0061a8',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    color: '#0061a8',
    fontWeight: '600',
    textAlign: 'center',
  },
});
