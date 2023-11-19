import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
const GeneralText = ({ title }) => {
  return (
    <View style={styles.body}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};
export default GeneralText;
const styles = StyleSheet.create({
  body: {
    padding: 5,
  },
  text: {
    color: Colors.colorGeneralText,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
