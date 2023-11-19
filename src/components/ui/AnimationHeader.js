import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';
const AnimationHeader = ({ region, region2, title, title2 }) => {
  const fadeAnimation = new Animated.Value(0);
  let deviceWidth = Dimensions.get('window').width * 0.8;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnimation, {
          toValue: deviceWidth,
          duration: 2000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  });
  return (
    <View>
      <View style={styles.body2}>
        <Text style={styles.text}>{region}</Text>
        <Text style={styles.text}>{region2}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.circle}></View>
        <Animated.View
          style={[{ transform: [{ translateX: fadeAnimation }] }, styles.car]}>
          <Icon
            name="airport-shuttle"
            size={30}
            color={Colors.colorBacground}
          />
        </Animated.View>
        <View style={[styles.line, { width: deviceWidth }]}></View>
        <View style={styles.circle}></View>
      </View>
      <View style={styles.body2}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{title2}</Text>
      </View>
    </View>
  );
};

export default AnimationHeader;
const styles = StyleSheet.create({
  body: {
    width: '90%',
    height: 20,
    marginHorizontal: 20,
    marginVertical: 5,
    justifyContent: 'space-between',
    alignContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  body2: {
    width: '90%',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    alignContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  line: {
    height: 0.8,
    top: 7,
    backgroundColor: Colors.colorBacground,
  },
  text: {
    color: Colors.colorDetailText,
    fontWeight: '500'
  },
  group: {
    width: 50,
    height: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    position: 'absolute',
    height: 30,
    marginHorizontal: 10,
    borderRadius: 50,
    backgroundColor: Colors.colorBacground,
  },
  car: {
    position: 'absolute',
    paddingHorizontal: 5,
    zIndex: 1,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: Colors.colorBacground,
  },
  arrow: {
    width: 20,
    height: 5,
  },
});
