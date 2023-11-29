import { View, Text, StyleSheet, Pressable, Animated, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { Switch } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Vehicle_type } from '../../constants/Vehicle_type';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, toggleTrip } from './auth/loginSlice';
import { editTrip } from '../../store/slices/tripSlice';
import { backendUrl } from '../../constants/rootUrl';
import ToggleSwitch from 'toggle-switch-react-native'
const TripItem = ({ onPress, itemData }) => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.login);
  const user_id = useSelector(state => state.login.user.id);
  const [error, SetError] = useState(null);
  const id = itemData.item.id;
  const [isSwitchOn, setIsSwitchOn] = useState(itemData.item.is_active)
  // const [isSwitchOn, setIsSwitchOn] = React.useState(itemData.item.is_active);
  const onToggleSwitch = () => {
    dispatch(toggleTrip({ token, id }))
      .unwrap()
      .then(res => {

        // setIsSwitchOn(res.is_active);
      })
      .catch(err => SetError(err));
    return () => { };
  };
  const fadeAnimation = new Animated.Value(0);
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnimation, {
          toValue: 200,
          duration: 2000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  });
  return (
    <>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: Colors.colorBacground }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? Colors.colorBacground : 'white',
          },
          styles.trip,
        ]}>
        <View style={styles.status}>
          <ToggleSwitch
            isOn={itemData.item.is_active}
            onColor="#14C38E"
            offColor='#DDDDDD'
            labelStyle={{ color: "black", fontWeight: "900" }}
            size='medium'
            onToggle={onToggleSwitch}
          />

        </View>
      
        <View style={styles.body}>
          <View style={styles.point}>
            <View style={styles.group}>
              <Text style={styles.boltext}>{itemData.item.from_location.region}</Text>
              <View style={styles.round}></View>
              <Text style={styles.boltext}>{itemData.item.from_location.title.match(/.{1,13}/g).join('\n')} </Text>
            </View>

            <Animated.View
              style={[{ transform: [{ translateX: fadeAnimation }] }, styles.line]}>
              <Icon
                name="arrow-right-alt"
                size={40}
                color={Colors.colorBacground}
              />
            </Animated.View>
            <View style={styles.group}>
              <Text style={styles.boltext}>{itemData.item.to_location.region}</Text>
              <View style={styles.round}></View>
              <Text style={styles.boltext}>{itemData.item.to_location.title.match(/.{1,10}/g).join('\n')} </Text>
            </View>
          </View>
          <View style={styles.section}>
            {itemData.item.transport_id.image !== null ? (
              <Image
                style={styles.image}
                source={{ uri: backendUrl + itemData.item.transport_id.image }}
              />
            ) : (
              <>
                {itemData.item.transport_id.vehicle_type ===
                  Vehicle_type.light_vehicle ? (
                  <Image
                    style={styles.image}
                    source={require('../../assets/png/car.png')}
                  />
                ) : (
                  <Image
                    style={styles.image}
                    source={require('../../assets/png/truck.png')}
                  />
                )}
              </>
            )}
            <View style={{ paddingRight: 10, rowGap: 5 }}>
              <Text style={styles.boltext}>
                {itemData.item.transport_id.vehicle_type}

              </Text>
              <Text style={styles.boltext}>
                {itemData.item.transport_id.model}
              </Text>
              <Text style={styles.boltext}>
                Adam sany:
                {itemData.item.capacity}
              </Text>

            </View>
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default TripItem;
const styles = StyleSheet.create({
  trip: {
    shadowColor: Colors.colorBacground,
    borderRadius: 10,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  status: {
    marginRight: 10,
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  statusbutton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.colorBacground,
  },
  body: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    columnGap: 20,
  },
  point: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  line: {
    width: 40,
    flex: 1,
  },
  group: {
    alignItems: 'center',
  },
  round: {
    height: 20,
    width: 20,
    borderRadius: 50,
    backgroundColor: Colors.colorBacground,
  },
  boltext: {
    textAlign: 'right',
    fontWeight: '500',
    color: Colors.colorDetailText,
    fontSize: 14,
  },
  image: {
    height: '100%',
    width: 200,
    // marginTop: 14,
    alignSelf: 'center',
    objectFit: 'contain',
  },
});
