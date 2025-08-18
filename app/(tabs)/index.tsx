import React, { useState, useMemo } from 'react';

import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LogIn, UserPlus, Lock, User } from 'lucide-react-native';
import { router } from 'expo-router';

export default function PlayersScreen() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    // Navigate to player evaluation screen
    router.push('/player-evaluation');
  };

  const handleSignup = () => {
    Alert.alert('Sign Up', 'Sign up functionality will be available soon!');
  };

  const currentDate = new Date();

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.header}
      >

        <View style={styles.searchContainer}>
          <Image
            source={require('../../assets/images/tennis-scotland-logo.png')}
            style={{ width: 108, height: 45 }} // Set size as needed
            resizeMode="contain"
          />

          <View style={styles.iconContainer}>
            <Image
              source={require('../../assets/images/search icon.png')}
              style={{ width: 27, height: 27 }} // Set size as needed
              resizeMode="contain"
            />
            <Image
              source={require('../../assets/images/menu.png')}
              style={{ width: 33, height: 33 }} // Set size as needed
              resizeMode="contain"
            />
          </View>

        </View>

        <LinearGradient
          colors={['#059669', '#047857']}
          style={styles.background}
        >
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <User size={48} color="#ffffff" />
              </View>
              <Text style={styles.title}>Tennis Scotland</Text>
              <Text style={styles.subtitle}>Player Management System</Text>
            </View>

            <View style={styles.formContainer}>
              {/* Username Input - First Row */}
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

              {/* Password Input - Second Row */}
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

              {/* Login and Signup Buttons - Third Row */}
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

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Secure access to player evaluations and management tools
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#d1fae5',
    textAlign: 'center',
    fontWeight: '500',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
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
    gap: 12,
    marginTop: 8,
  },
  signupButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#059669',
    gap: 8,
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
  },
  loginButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#059669',
    gap: 8,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 14,
    color: '#d1fae5',
    textAlign: 'center',
    lineHeight: 20,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#0061a8',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: 250,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: 'Segoe UI',
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 16,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#d1fae5',
    textAlign: 'center',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  resultsHeader: {
    paddingHorizontal: 16,
  },
  resultsText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 100,
  },
});