// app/landing.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LandingScreen() {
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
