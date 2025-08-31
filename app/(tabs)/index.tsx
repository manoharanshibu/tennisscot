// app/index.tsx
import React, { useState, useCallback } from 'react';
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
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { LogIn, UserPlus, Lock, User } from 'lucide-react-native';
import { ROLE_TYPES } from './constants';
import { useFocusEffect } from '@react-navigation/native';
import { useSession } from '@/components/SessionContext';


export default function Index() {

  const { session, setSession } = useSession(); // <-- use context


  // Load session every time the screen comes into focus (important after logout)
  useFocusEffect(
    useCallback(() => {
      const loadSession = async () => {
        try {
          const data = await AsyncStorage.getItem('session');
          if (data) {
            const { username, fullName, email, loggedIn, role } = JSON.parse(data);
            console.log('>>> Session on home page:', { username, fullName, email, loggedIn, role });
            setSession({ username, fullName, email, loggedIn, role });
          } else {
            setSession(null);
          }
        } catch (e) {
          console.error('Failed to load session on home page:', e);
        }
      };

      loadSession();
    }, [])
  );


  function LandingScreen() {
    return (
      <SafeAreaView style={styles.container}>
        {/* Background image at the bottom */}
        <Image
          source={require('../../assets/images/bg.png')}
          style={styles.bottomImage}
          resizeMode="cover"
        />

        {/* Buttons on top of the image */}
        <View>
          <Image
            source={require('../../assets/images/tennis-scotland-logo.png')}
            style={styles.logoLanding}
            resizeMode="contain"
          />
          <View style={styles.playerInfoLanding}>
            <Image source={require('../../assets/images/profileImage.png')} style={styles.profileImage} />
            <View style={styles.nameRankContainer}>
              <Text style={styles.playerName}>Alan Curran</Text>
              <Text style={styles.locationText}>Livington, Scotland</Text>
            </View>
            <Image source={require('../../assets/images/country.png')}
              style={styles.countryImage} />
          </View>
          <View style={[styles.containerItem, { opacity: 0.5 }]}>
            <Text style={styles.playerName}>Self Evaluation</Text>
          </View>

          <TouchableOpacity
            style={styles.containerItem}
            onPress={() => router.push('/performance')}
            activeOpacity={0.95}
          >
            <Text style={styles.playerName}>Performance Report</Text>
          </TouchableOpacity>

          <View style={[styles.containerItem, { opacity: 0.5 }]}>
            <Text style={styles.playerName}>Schedules</Text>
          </View>
          <TouchableOpacity
            style={styles.containerItem}
            onPress={() => router.push('/book-court')}>
            <Text style={styles.playerName}>Book a Court</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const userNames = [
      { name: 'raffael', role: ROLE_TYPES.TENNIS, fullName: 'Rafael Nadal', email: 'shibum123@gmail.com' },
      { name: 'roger', role: ROLE_TYPES.FITNESS, fullName: 'Roger Federer', email: 'shibum123@gmail.com' },
      { name: 'andre', role: ROLE_TYPES.TENNISFITNESS, fullName: 'Andre Agassi', email: 'shibum123@gmail.com' },
      { name: 'shibu', role: ROLE_TYPES.TENNISFITNESS, fullName: 'Shibu Manoharan', email: 'shibum123@gmail.com' },
      { name: 'gouthami', role: ROLE_TYPES.TENNISFITNESS, fullName: 'Dubasi Gouthami', email: 'gouthami@greenrichit.com' },
      { name: 'sesh', role: ROLE_TYPES.TENNISFITNESS, fullName: 'Kumar Sesh', email: 'kumarsesh@greenrichit.com' },
      { name: 'palani', role: ROLE_TYPES.TENNISFITNESS, fullName: 'Palanivel Subrahmanian', email: 'baskar.ibiz@gmail.com' },
      { name: 'bhagya', role: ROLE_TYPES.TENNISFITNESS, fullName: 'Bhagya Shyn', email: 'bhagya.shyn@gmail.com' },
    ];

    const NOT_FOUND = 'Role not found';

    const getRoleByName = (name: string) => {
      const user = userNames.find((u) => u.name === name.toLowerCase());
      return user?.role ?? NOT_FOUND;
    };


    const handleLogin = async () => {
      if (!username.trim() || !password.trim()) {
        Alert.alert('Error', 'Please enter both username and password');
        return;
      }

      const user = userNames.find((u) => u.name === username.toLowerCase());
      if (!user) {
        Alert.alert('Error', 'Invalid username or password');
        return;
      }

      try {
        const sessionData = {
          username,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          loggedIn: true,
        };

        await AsyncStorage.setItem('session', JSON.stringify(sessionData));
        console.log('Logging in', sessionData);
        setSession(sessionData);
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
            {/* <Image
              source={require('../../assets/images/bg_playing.gif')}
              style={styles.tennisPlayer}
              resizeMode="cover"
            /> */}
            <Video
              source={require('../../assets/images/tennis_player.mp4')}
              style={styles.tennisPlayer}
              resizeMode="cover"
              shouldPlay
              isLooping
              isMuted
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
              <View style={styles.textTitleContainer}>
                <Text style={styles.textTitle}>Practice... Perform...  WIN</Text>
                <Image
                  source={require('../../assets/images/Trophy.png')}
                  resizeMode="contain"
                />
              </View>


            </View>
          </View>
        </ScrollView>
        {/* <Text style={styles.version}>Version 7</Text> */}
      </SafeAreaView>
    );
  }

  return session?.loggedIn ? <LandingScreen /> : <LoginScreen />;
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
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
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 0,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginTop: -15,
    marginBottom: 10,
  },
  countryImage: {
    width: 30,
    height: 30,
    marginTop: -15,
  },
  nameRankContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'flex-start',

  },
  locationText: {
    fontSize: 8,
    color: '#ffffff',
    fontWeight: '400',

    marginBottom: 12,
  },
  playerInfoLanding: {
    display: 'flex',
    flexDirection: 'row',   // keep items in one line
    gap: 10,                // spacing between items (RN 0.71+ supports gap)
    alignItems: 'center',   // vertical centering
    justifyContent: 'center', // horizontal centering
  },
  playerInfo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
  },
  playerName: {
    display: 'flex',
    fontFamily: 'Segoe UI',
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
    alignItems: 'center',
    margin: 4,
    textAlign: 'center',
  },
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
  logoLanding: {
    position: 'absolute',
    top: -120,
    left: -20,
    width: 180,
    height: 60,
    zIndex: 10,
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
    marginTop: -30,
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
  textTitleContainer: {

    flexDirection: 'row',       // puts text and image in one line
    alignItems: 'center',       // vertically aligns them
    justifyContent: 'center',   // centers them horizontally
    marginVertical: 16,
    gap: 15,
    marginTop: 40,
  },
  textTitle: {
    color: '#FFFFFF',
    boxShadow: '3px 3px 6px var(--sds- size - stroke - focus - ring) #000000',
    fontSize: 22,
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 200, // Adjust height depending on image
    zIndex: -1,
  },

  container: {
    flex: 1,
    backgroundColor: '#0061a8',
    justifyContent: 'center',
    alignItems: 'center',
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
