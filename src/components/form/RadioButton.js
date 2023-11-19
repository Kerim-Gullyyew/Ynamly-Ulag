import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { TypeRadio } from '../../constants/TypeRadio';
import { Colors } from '../../constants/Colors';

const RadioButton = ({ title, selected, type, setType }) => {
  return (
    <View style={styles.radioButtonContainer}>
      <TouchableOpacity
        onPress={setType}
        style={styles.radioButton}>
        <View style={selected ? [styles.radioButtonIcon, styles.selected] : styles.radioButtonIcon} />
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    marginRight: 10,
    alignItems: 'center',
  },
  radioButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon: {
    height: 18,
    width: 18,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.colorRadio,
    marginRight: 5,
    backgroundColor: 'white',
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16,
  },
  text: {
    color: 'black',
  },
  selected: {
    backgroundColor: Colors.colorBacground
  },
});
