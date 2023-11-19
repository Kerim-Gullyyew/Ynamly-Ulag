import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import { backendUrl } from '../../constants/rootUrl';
import { Vehicle_type } from '../../constants/Vehicle_type';
const Transport = ({ itemData, transport, setTransport }) => {

  const onPress = () => {
    if (transport?.id === itemData.item.id) {
      setTransport(null)
    } else {
      setTransport(itemData.item);
    }
  };
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: Colors.colorBacground }}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? Colors.colorBacground : 'white',
        },
        { backgroundColor: transport?.id === itemData.item.id ? Colors.colorBacground : "white" },
        styles.body,
      ]}>
      <View style={styles.section}>
        {itemData.item.image !== null ? (
          <Image
            style={styles.image}
            source={{ uri: backendUrl + itemData.item.image }}
          />
        ) : (
          <>
            {itemData.item.vehicle_type ===
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
        <View style={styles.textSection}>
          <Text style={styles.text}>{itemData.item.model}</Text>
          <Text style={styles.text}>{itemData.item.vehicle_type}</Text>
        </View>
      </View>
    </Pressable>
  );
};
export default Transport;
const styles = StyleSheet.create({
  body: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 15
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 100,
    objectFit: 'contain',
  },
  textSection: {
    paddingLeft: 10,
  },
  text: {
    fontSize: 16,
    paddingVertical: 3,
    color: Colors.colorDetailText,
    fontWeight: '500',
  },
  line: {
    flexDirection: 'row',
  },
  boldText: {
    width: '30%',
    fontWeight: 'bold',
  },
});
