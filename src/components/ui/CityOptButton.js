import { Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
const CityOptButton = ({ title, disabled, onPress }) => {
  return (
    <Pressable disabled={disabled} onPress={onPress} android_ripple={{ color: Colors.colorRipple }} style={({ pressed }) => [
      {
        backgroundColor: pressed
          ? Colors.colorOptionButtonPressed
          : Colors.colorOptionButtonBackground,
      },
      styles.option,
    ]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};
export default CityOptButton;
const styles = StyleSheet.create({
  option: {
    backgroundColor: Colors.colorButton,
    width: 130,
    marginVertical: 15,
    paddingHorizontal: 3,
    paddingVertical: 6,
    borderRadius: 5,
    shadowRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  }
});