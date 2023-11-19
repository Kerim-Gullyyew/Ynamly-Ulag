import { Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
const Part = ({ disabled, onPress, title }) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      android_ripple={{ color: Colors.colorRipple }}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? Colors.colorBacground : 'white',
        },
        styles.part,
      ]}>
      <Text
        style={({ pressed }) => [
          { color: pressed ? 'white' : Colors.colorPart },
          styles.partText,
        ]}>
        {title}
      </Text>
    </Pressable>
  );
};
export default Part;
const styles = StyleSheet.create({
  part: {
    shadowColor: Colors.colorBacground,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.colorBacground,
    margin: 10,
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  partText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.colorPart,
  },
});
