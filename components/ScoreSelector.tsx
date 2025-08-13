import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface ScoreSelectorProps {
  value: number;
  onChange: (value: number) => void;
  color: string;
  min?: number;
  max?: number;
}

export default function ScoreSelector({
  value,
  onChange,
  color,
  min = 1,
  max = 10
}: ScoreSelectorProps) {
  const scores = Array.from({ length: max - min + 0.5 }, (_, i) => min + i);

  const getScoreLabel = (score: number) => {
    if (score <= 3) return 'Poor';
    if (score <= 5) return 'Fair';
    if (score <= 7) return 'Good';
    if (score <= 9) return 'Excellent';
    return 'Outstanding';
  };

  return (
    <View style={styles.container}>
      <View style={[styles.pickerContainer, { borderColor: color }]}>
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
    width: 80,
    backgroundColor: '#ffffff',
    overflow: 'hidden',

  },
  picker: {
    height: 40,
    width: 80,

  },
  pickerItem: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000000',
    marginTop: -40,
  },
  selectedScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    fontSize: 24,

  },
  selectedScoreLabel: {
    fontSize: 24,
    color: '#6b7280',

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
    color: '#9ca3af',
    fontWeight: '500',
  },
});