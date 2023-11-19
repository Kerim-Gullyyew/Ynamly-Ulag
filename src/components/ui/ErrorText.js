import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
const ErrorText = ({ title }) => {
  return (
    <View>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};
export default ErrorText;
const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: 'red',
  }
})