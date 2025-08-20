import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface ScoreSelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export default function ScoreSelector({
  value,
  onChange,
  min = 0.5,
  max = 10,
  step = 0.5,
}: ScoreSelectorProps) {

  const scores = Array.from(
    { length: (max - min) / step + 1 },
    (_, i) => min + i * step
  );

  const getScoreLabel = (score: number) => {
    if (score <= 3) return 'Poor';
    if (score <= 5) return 'Fair';
    if (score <= 7) return 'Good';
    if (score <= 9) return 'Excellent';
    return 'Outstanding';
  };

  return (
    <View style={styles.container}>
      <View style={[styles.pickerContainer]}>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => onChange(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {scores.map((score) => (
            <Picker.Item
              key={score}
              label={`${score}`}
              value={score}
            />
          ))}
        </Picker>
      </View>
      {/* 
      <View style={styles.selectedScoreContainer}>
        <Text style={styles.selectedScoreLabel}>Selected Score:</Text>
        <Text style={[styles.selectedScore, { color }]}>
          {value}/10 - {getScoreLabel(value)}
        </Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  pickerContainer: {

    borderWidth: 1,
    borderRadius: 12,
    width: 95,
    backgroundColor: '#ffffff',
    overflow: 'hidden',

  },
  picker: {
    height: 40,
    width: 95,

  },
  pickerItem: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000000',
    marginTop: -88,
  },
  selectedScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    fontSize: 24,

  },
  selectedScoreLabel: {
    fontSize: 24,
    color: '#000000',

  },
  selectedScore: {
    fontSize: 34,
    fontWeight: '800',

  },
  scaleLabels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    gap: 8,
  },
  scaleLabel: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '500',
  },
});