import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Picker({ label, buttons, setSelected, selected }) {
  const [picked, setPicked] = useState(selected);

  useEffect(() => {
    setSelected(picked)
  }, [picked])

  useEffect(() => {
    setPicked(selected);
  }, [selected])

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.checkbox,
              {
                backgroundColor: picked === button.params ? "#A52A2A" : "white",
              },
            ]}
            onPress={() => {
              setPicked(button.params);
            }}
          >
            <Text
              style={[
                styles.checkboxText,
                {
                  color: picked === button.params ? "white" : "#A52A2A",
                },
              ]}
            >
              {button.content}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 20,
  },
  checkbox: {
    paddingVertical: 15,
    marginRight: 5,
    paddingHorizontal: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#A52A2A',
    borderRadius: 5,
  },
  checkboxText: {
    color: '#A52A2A',
    fontWeight: '400',
  },
  label: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 20,
  },
});
