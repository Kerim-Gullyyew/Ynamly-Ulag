import { View, Text, StyleSheet, Image, Linking, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { backendUrl } from '../../constants/rootUrl';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Vehicle_type } from '../../constants/Vehicle_type';
import Privacy from '../ui/Privacy';
const Result = ({ itemData }) => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false)
  const onPressHandler = () => {
    navigation.navigate('ResultDetail', {
      id: itemData.item.id,
    });
  };
  function callToNumber(phone) {
    setShow(false)
    Linking.openURL(`tel: +${phone}`);
  }
  return (
    <View style={styles.body}>
      <Privacy isVisible={show} onPress={() => callToNumber(itemData.item.user.username)} setShow={setShow} title="Ynamly ulag platformanyň administrasiýasy sürüjilere kepillik geçenok." />
      <Pressable
        onPress={onPressHandler}
        android_ripple={{ color: Colors.colorRipple }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? Colors.colorOptionButtonPressed
              : 'white',
          },
          styles.groupList,
        ]}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.part}>
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
          </View>
          <View style={styles.part}>
            <Text style={styles.text}>{itemData.item.transport_id.model}</Text>
            <Text style={styles.text}>{itemData.item.transport_id.vehicle_type}</Text>

            {itemData.item?.passanger && (
              <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center' }}>
                <Icon name="check-circle-outline" size={18} color={Colors.colorBacground} />
                <Text style={{ color: Colors.colorBacground, fontSize: 14, fontWeight: '500' }}>Ýolagçy</Text>
              </View>
            )}
            {itemData.item?.cargo && (
              <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center' }}>
                <Icon name="check-circle-outline" size={18} color={Colors.colorBacground} />
                <Text style={{ color: Colors.colorBacground, fontSize: 14, fontWeight: '500' }}>Poçta, Ýük</Text>
              </View>
            )}
          </View>
        </View>
        <Pressable onPress={() => setShow(true)} style={styles.part}>
          <Icon style={{ backgroundColor: Colors.colorBacground, borderRadius: 50, padding: 12, elevation: 3 }} name="call" size={30} color="white" />
        </Pressable>
      </Pressable>
    </View>
  );
};
export default Result;
const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.colorBacground2,
  },
  groupList: {
    width: '90%',
    maxWidth: '90%',
    margin: 5,
    marginHorizontal: 15,
    flex: 1,
    padding: 10,
    shadowColor: Colors.colorBacground,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  part: {
    marginHorizontal: 10,
    rowGap: 10,
  },
  text: {
    color: Colors.colorDetailText,
    fontWeight: '500'
  },
  image: {
    width: 100,
    height: 100,
    objectFit: 'contain',
  },
});
