import { Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
const SelectionButton = ({ title, onPress, selected }) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'white' }}
      style={({ pressed }) => [
        styles.body,
        pressed && { backgroundColor: Colors.colorBacground },
        selected && styles.selected,
      ]}>
      <Text style={[styles.text, selected && styles.selectedText]}>
        {title}
      </Text>
    </Pressable>
  );
};
export default SelectionButton;
const styles = StyleSheet.create({
  body: {
    margin: 5,
    borderColor: Colors.colorBorder,
    borderWidth: 1,
    width: 300,
    height: 50,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '80%',
    minWidth: 'auto',
  },
  selected: {
    backgroundColor: Colors.colorSelectionButton,
  },
  text: {
    color: Colors.colorBorder,
    fontSize: 20,
    fontWeight: '500',
  },
  selectedText: {
    color: 'white',
  },
});
