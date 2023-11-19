import { View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
const AddButton = ({ onPress }) => {
  return (
    <View style={styles.transportHeader}>
      <Pressable android_ripple={{ color: "white" }} onPress={onPress} style={styles.button}>
        <Icon name="add" size={30} color="white" />
      </Pressable>
    </View>
  );
};
export default AddButton;
const styles = StyleSheet.create({
  transportHeader: {
    padding: 30,
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    right: 0,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.colorBacground,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});
