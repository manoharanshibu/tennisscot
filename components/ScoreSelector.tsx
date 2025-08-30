import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

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

  const data = scores.map((score) => ({
    label: score.toString(),
    value: score,
  }));

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        data={data}
        labelField="label"
        valueField="value"
        value={value}
        placeholder="Select"
        onChange={(item) => onChange(item.value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  dropdown: {
    height: 40,
    width: 95,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  dropdownContainer: {
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  itemTextStyle: {
    fontSize: 16,
    color: '#000',
  },
});
