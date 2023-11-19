import { View, Animated, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import { useEffect } from 'react';

const Blink = ({ fadeAnimationForBlink }) => {
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  });
  const fadeAnimation = new Animated.Value(fadeAnimationForBlink);
  return (
    <Animated.View style={{ opacity: fadeAnimation }}>
      <View style={styles.arrow}></View>
    </Animated.View>
  );
};
export default Blink;
const styles = StyleSheet.create({
  arrow: {
    width: 20,
    height: 5,
    backgroundColor: Colors.colorSelectionButton,
  },
});
