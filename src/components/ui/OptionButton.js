import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '../../constants/Colors';
const OptionButton = ({ title, onPressHandler }) => {
  return (
    <Pressable
      onPress={onPressHandler}
      android_ripple={{ color: Colors.colorRipple }}
      style={({ pressed }) => [
        {
          backgroundColor: pressed
            ? Colors.colorOptionButtonPressed
            : Colors.colorOptionButtonBackground,
        },
        styles.option,
      ]}>
      <Text style={styles.optionButton}>{title}</Text>
    </Pressable>
  );
};
export default OptionButton;
const styles = StyleSheet.create({
  optionButton: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontWeight: '500',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 5,
  },
});
