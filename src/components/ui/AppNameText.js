import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
const AppNameText = ({ title }) => {
  return (
    <View>
      <Text style={styles.app_name}>{title}</Text>
    </View>
  );
};
export default AppNameText;
const styles = StyleSheet.create({
  app_name: {
    color: 'black',
    fontSize: 24,
    color: Colors.colorHeaderTint,
    fontWeight: 'bold',
  },
});