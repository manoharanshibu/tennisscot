import { router } from 'expo-router';
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';

import { useSession } from '@/components/SessionContext';

// Static booking data
const bookingData = [
  {
    id: '1',
    name: 'Ladywell Community Tennis Courts',
    distance: '0.8 miles',
    address: 'Harrysmuir Path, Willowbank Livingston EH54 6HN',
    dates: [
      {
        label: '1st Aug',
        day: 'MON',
        availability: 'high',
        times: [
          { label: '9 AM', available: true },
          { label: '10 AM', available: false },
          { label: '11 AM', available: true },
          { label: '12 PM', available: true },
          { label: '1 PM', available: false },
          { label: '2 PM', available: true },
        ],
      },
      {
        label: '2nd Aug',
        day: 'TUE',
        availability: 'medium',
        times: [
          { label: '9 AM', available: true },
          { label: '10 AM', available: false },
          { label: '11 AM', available: true },
          { label: '12 PM', available: true },
          { label: '1 PM', available: false },
          { label: '2 PM', available: true },
        ],
      },
      {
        label: '3rd Aug',
        day: 'WED',
        availability: 'low',
        times: [
          { label: '9 AM', available: true },
          { label: '10 AM', available: false },
          { label: '11 AM', available: true },
          { label: '12 PM', available: true },
          { label: '1 PM', available: false },
          { label: '2 PM', available: true },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Craiglockhart Tennis Centre',
    distance: '5.2 miles',
    address: '177 Colinton Rd, Edinburgh EH14 1BZ',
    dates: [
      {
        label: '1st Aug',
        day: 'MON',
        availability: 'medium',
        times: [
          { label: '9 AM', available: true },
          { label: '10 AM', available: true },
          { label: '11 AM', available: false },
          { label: '12 PM', available: true },
        ],
      },
      {
        label: '2nd Aug',
        day: 'TUE',
        availability: 'high',
        times: [
          { label: '9 AM', available: true },
          { label: '10 AM', available: true },
          { label: '11 AM', available: true },
          { label: '12 PM', available: true },
          { label: '1 PM', available: true },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Inverleith Park Tennis Courts',
    distance: '3.4 miles',
    address: 'Arboretum Pl, Edinburgh EH3 5NZ',
    dates: [
      {
        label: '1st Aug',
        day: 'MON',
        availability: 'low',
        times: [
          { label: '9 AM', available: false },
          { label: '10 AM', available: false },
          { label: '11 AM', available: true },
          { label: '12 PM', available: false },
          { label: '1 PM', available: true },
          { label: '2 PM', available: true },
        ],
      },
      {
        label: '2nd Aug',
        day: 'TUE',
        availability: 'medium',
        times: [
          { label: '9 AM', available: true },
          { label: '10 AM', available: true },
          { label: '11 AM', available: true },
          { label: '12 PM', available: false },
          { label: '1 PM', available: false },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Meadowbank Sports Centre',
    distance: '2.7 miles',
    address: '139 London Rd, Edinburgh EH7 6AE',
    dates: [
      {
        label: '1st Aug',
        day: 'MON',
        availability: 'high',
        times: [
          { label: '9 AM', available: true },
          { label: '10 AM', available: true },
          { label: '11 AM', available: true },
          { label: '12 PM', available: true },
          { label: '1 PM', available: true },
          { label: '2 PM', available: true },
        ],
      },
      {
        label: '2nd Aug',
        day: 'TUE',
        availability: 'low',
        times: [
          { label: '9 AM', available: false },
          { label: '10 AM', available: false },
          { label: '11 AM', available: false },
          { label: '12 PM', available: true },
        ],
      },
      {
        label: '3rd Aug',
        day: 'WED',
        availability: 'medium',
        times: [
          { label: '9 AM', available: true },
          { label: '10 AM', available: true },
          { label: '11 AM', available: false },
          { label: '12 PM', available: true },
          { label: '1 PM', available: true },
        ],
      },
    ],
  },
];


export default function BookCourtScreen() {
  const { session } = useSession(); // <-- use context
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showBookingDone, setShowBookingDone] = useState(false);

  const getStepTitle = () => {
    if (!selectedCourt) return 'Select the Court';
    if (!selectedDate) return 'Select the Date';
    return `${selectedDate?.label} - Select the Time`;
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setShowConfirmation(true);
  };

  const confirmBooking = async () => {
    if (!session) return;

    const bookingPayload = {
      name: session.fullName,
      court: selectedCourt?.name,
      booker_email: session.email,
      court_admin_email: 'baskar.ibiz@gmail.com',
      booked_date: selectedDate?.label,
      booked_time: selectedTime?.label,
    };

    try {
      const res = await fetch(
        'https://5pqjom8xcb.execute-api.eu-west-2.amazonaws.com/default/bookCourt',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingPayload),
        }
      );

      if (res.ok) console.log('Booking submitted successfully', bookingPayload);
      else console.error('Booking failed', await res.text());
    } catch (err) {
      console.error('API call failed', err);
    }

    setShowConfirmation(false);
    setShowBookingDone(true);
  };

  const reset = () => {
    setSelectedCourt(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setShowBookingDone(false);
  };

  const renderLocationInfo = () => (
    <View style={styles.selectedCourtRow}>
      <Image
        source={require('../assets/images/locationIcon.png')}
        style={styles.locationIcon}
      />
      <Text style={styles.selectedCourtText}>{selectedCourt?.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ backgroundColor: '#0061a8', flex: 1, maxWidth: 600, alignSelf: 'center' }}>
      <Image
        source={require('../assets/images/tennis-scotland-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{getStepTitle()}</Text>
        {selectedCourt && renderLocationInfo()}

        {/* Court Selection */}
        {!selectedCourt &&
          bookingData.map((court) => (
            <TouchableOpacity
              key={court.id}
              style={styles.card}
              onPress={() => setSelectedCourt(court)}
            >
              <Text style={styles.courtName}>{court?.name}</Text>
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

        {/* Date Selection */}
        {selectedCourt && !selectedDate && (
          <View style={styles.dateGrid}>
            {selectedCourt.dates.map((date, index) => {
              let backgroundColor = '#f3f4f6';
              if (date.availability === 'low') backgroundColor = '#e23737ff';
              else if (date.availability === 'medium') backgroundColor = '#fef08aff';
              else if (date.availability === 'high') backgroundColor = '#bbf7d0';

              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.dateBox, { backgroundColor }]}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text style={styles.dateText}>{date.day} {date.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Time Selection */}
        {selectedCourt && selectedDate && (
          <View style={styles.dateGrid}>
            {selectedDate.times.map((slot, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.timeBox,
                  { backgroundColor: slot.available ? '#60FB4BBA' : '#8E85853B' },
                ]}
                disabled={!slot.available}
                onPress={() => handleTimeSelect(slot)}
              >
                <Text
                  style={[
                    styles.dateText,
                    { color: slot.available ? '#065f46' : '#9ca3af' },
                  ]}
                >
                  {slot.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (selectedTime) setSelectedTime(null);
            else if (selectedDate) setSelectedDate(null);
            else if (selectedCourt) setSelectedCourt(null);
            else router.back();
          }}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal transparent visible={showConfirmation} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Check your booking</Text>
            <Text style={styles.modalItem}>
              <Text style={{ color: '#248600', fontSize: 20 }}>
                {selectedDate?.label} {selectedTime?.label}
              </Text>
            </Text>
            <Text style={styles.modalItem}>{selectedCourt?.name}</Text>
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                onPress={() => setShowConfirmation(false)}
                style={styles.cancelBtn}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmBooking} style={styles.confirmBtn}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Booking Done Modal */}
      <Modal transparent visible={showBookingDone} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Booking Confirmed</Text>
            <Text style={{ fontSize: 40, textAlign: 'center' }}>👍</Text>
            <Text
              style={[styles.modalItem, { color: '#059669', fontWeight: '600' }]}
            >
              {selectedDate?.label} {selectedTime?.label}
            </Text>
            <Text style={styles.modalItem}>{selectedCourt?.name}</Text>
            <TouchableOpacity
              onPress={reset}
              style={[styles.confirmBtn, { marginTop: 12 }]}
            >
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: { marginTop: 20, left: 20, width: 180, height: 60, zIndex: 10 },
  container: {
    padding: 16,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#ffffff',
    paddingBottom: 40,
    alignItems: 'center',
    borderRadius: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#003B89',
    paddingTop: 10,
  },
  dateTextRow: { flexDirection: 'row', alignItems: 'flex-start' },
  superscript: { fontSize: 10, lineHeight: 12, textAlignVertical: 'top' },
  card: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#f9fafb',
  },
  courtName: { fontSize: 16, fontWeight: '600', color: '#000', marginBottom: 8 },
  distance: { fontSize: 16, fontWeight: '600', color: '#4AAA00', marginBottom: 8 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  locationIcon: {
    width: 18,
    height: 22,
    marginRight: 6,
    tintColor: '#4b5563',
  },
  address: { flexShrink: 1, fontSize: 14, fontWeight: '600', color: '#1F3EAF' },
  selectedCourtRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  selectedCourtText: { fontSize: 16, fontWeight: '500', color: '#000000' },
  dateGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  dateBox: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    marginBottom: 12,
    width: 120,
  },
  timeBox: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    marginBottom: 12,
    width: 80,
  },
  dateText: { fontSize: 14, fontWeight: '500', color: '#000' },
  backButton: { marginTop: 20 },
  backText: { color: '#000', fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalTitle: { fontWeight: '600', marginBottom: 10, fontSize: 20, color: '#003B89' },
  modalItem: { fontSize: 16, marginVertical: 8, textAlign: 'center' },
  modalButtonRow: { flexDirection: 'row', marginTop: 20, gap: 16 },
  cancelBtn: {
    backgroundColor: '#0267B9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: 115,
  },
  confirmBtn: {
    backgroundColor: '#0267B9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: 115,
  },
  buttonText: { color: 'white', textAlign: 'center', fontSize: 16, fontWeight: '600' },
});
