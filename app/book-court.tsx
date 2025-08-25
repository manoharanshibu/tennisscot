import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

// Mock court data
const courts = [
  {
    id: '1',
    name: 'Ladywell Community Tennis Courts',
    distance: '0.8 miles',
    address: 'Harrysmuir Path, Willowbank Livingston EH54 6HN',
  },
  {
    id: '2',
    name: 'Craiglockhart Tennis Centre',
    distance: '5.2 miles',
    address: '177 Colinton Rd, Edinburgh EH14 1BZ',
  },
  {
    id: '3',
    name: 'St. Margaret’s Park Tennis Courts',
    distance: '3.7 miles',
    address: 'St. Margaret’s Park, Meadowbank St, Corstorphine EH12 7SX',
  },
  {
    id: '4',
    name: 'Leith Links Tennis Courts',
    distance: '6.4 miles',
    address: 'Links Gardens, Leith, Edinburgh EH6 7EB',
  },
];

// Mock dates
const availableDates = [
  { label: 'MON 1st Aug', availability: 'high' },
  { label: 'TUE 2nd Aug', availability: 'medium' },
  { label: 'WED 3rd Aug', availability: 'low' },
  { label: 'THU 4th Aug', availability: 'high' },
  { label: 'FRI 5th Aug', availability: 'medium' },
];


export default function BookCourtScreen() {
  const [selectedCourt, setSelectedCourt] = useState(null);

  return (
    <SafeAreaView>
      <Image
        source={require('../assets/images/tennis-scotland-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Step Title */}
        <Text style={styles.title}>
          {selectedCourt ? 'Select the Date' : 'Select the Court'}
        </Text>

        {/* Selected court summary (in Date step) */}
        {selectedCourt && (
          <View style={styles.selectedCourtRow}>
            <Image
              source={require('../assets/images/locationIcon.png')}
              style={styles.locationIcon}
            />
            <Text style={styles.selectedCourtText}>{selectedCourt.name}</Text>
          </View>
        )}

        {/* Court Selection Step */}
        {!selectedCourt &&
          courts.map(court => (
            <TouchableOpacity
              key={court.id}
              style={styles.card}
              onPress={() => setSelectedCourt(court)}
            >
              <Text style={styles.courtName}>{court.name}</Text>
              <Text style={styles.distance}>{court.distance}</Text>
              <View style={styles.locationRow}>
                <Image
                  source={require('../assets/images/locationIcon.png')}
                  style={styles.locationIcon}
                />
                <Text style={styles.address}>{court.address}</Text>
              </View>
            </TouchableOpacity>
          ))}

        {/* Date Selection Step */}
        {selectedCourt && (
          <View style={styles.dateGrid}>
            {availableDates.map((date, index) => {
              let backgroundColor = '#f3f4f6'; // default

              if (date.availability === 'low') backgroundColor = '#fecaca';       // red-200
              else if (date.availability === 'medium') backgroundColor = '#fef08a'; // yellow-200
              else if (date.availability === 'high') backgroundColor = '#bbf7d0';   // green-200

              return (
                <TouchableOpacity key={index} style={[styles.dateBox, { backgroundColor }]}>
                  <Text style={styles.dateText}>{date.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

        )}

        {/* Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (selectedCourt) {
              setSelectedCourt(null); // Go back to court selection
            } else {
              router.back(); // Go back to previous screen
            }
          }}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginTop: 20,
    left: 20,
    width: 180,
    height: 60,
    zIndex: 10,
  },
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#f9fafb',
  },
  courtName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  distance: {
    fontSize: 14,
    color: '#059669',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    tintColor: '#4b5563',
  },
  address: {
    fontSize: 14,
    color: '#374151',
    flexShrink: 1,
  },
  selectedCourtRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedCourtText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  dateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  dateBox: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 12,
    marginBottom: 12,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  backButton: {
    marginTop: 20,
  },
  backText: {
    color: '#2563eb',
    fontSize: 16,
  },
});
