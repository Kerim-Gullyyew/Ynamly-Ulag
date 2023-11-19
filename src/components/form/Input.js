import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

const Input = ({
  placeholder,
  keyboardType,
  value,
  style,
  error,
  secure,
  onChangeText,
}) => {
  return (
    <View>
      <TextInput
        value={value}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.colorBorder}
        style={
          style
            ? [style, error]
            : error
              ? [styles.input, styles.error]
              : styles.input
        }
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    margin: 5,
    borderColor: Colors.colorBorder,
    width: 350,
    maxWidth: '90%',
    height: 50,
    maxHeight: 'auto',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderWidth: 1,
    paddingHorizontal: 25,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.colorGeneralText,
  },
  error: {
    borderColor: 'red',
  },
});
