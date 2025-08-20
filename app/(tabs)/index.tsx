import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LogIn, UserPlus, Lock, User } from 'lucide-react-native';
import { router } from 'expo-router';
import { ROLE_TYPES } from './constants';

export default function PlayersScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

const userNames = [{ name: 'Raffel', role: ROLE_TYPES.FITNESS }, { name: 'Roger', role: ROLE_TYPES.FITNESS }, { name: 'Andre', role: ROLE_TYPES.FITNESS }]

const NOT_FOUND = 'Role not found';
  // Function to get role by name
const getRoleByName = (name: string) => {
  const user = userNames.find((u) => u.name === name);
  return user?.role ?? NOT_FOUND;
};

// Example usage
const role = getRoleByName('Roger');
  
  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    if (getRoleByName(username) === NOT_FOUND) {
      Alert.alert('Error', 'Please enter a valid username and password');
      return;
    }
    router.push('/performance');
  };

  const handleSignup = () => {
    Alert.alert('Sign Up', 'Sign up functionality will be available soon!');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Top Banner Background Image */}
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
          {/* Login Form */}
          <View style={styles.formContainer}>
            {/* Username */}
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

            {/* Password */}
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

            {/* Buttons */}
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
    </SafeAreaView>
  );
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
    marginTop: 40, // pulls form slightly over image bottom edge
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

    boxShadow: 'box-shadow: 1px 3px 7px 1px #00000094',

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
});
