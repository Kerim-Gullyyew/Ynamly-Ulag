import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Transport from './Transport';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import EditButton from '../ui/EditButton';
import AddButtonRound from '../ui/AddButtonRound';
import ChooseButtonRound from '../ui/ChooseButtonRound';

const TransportList = () => {
  const navigation = useNavigation();
  const { transports } = useSelector(state => state.login.userData);
  const [select, setSelect] = useState(null)
  return (
    <View style={styles.transport}>
      <View style={styles.actions}>
        {select && (
          <>
            <ChooseButtonRound
              onPress={() => navigation.navigate('addTrip', {
                created_at: select.item.created_at,
                image: select.item.image,
                model: select.item.model,
                id: select.item.id,
                vehicle_type: select.item.vehicle_type,
              })}
            />
            <EditButton
              onPress={() => navigation.navigate('editDriverFormTransport', {
                vehicle_type: select.item.vehicle_type,
                model: select.item.model,
                image: select.item.image,
                id: select.item.id,
              })}
            />
          </>
        )}
        <AddButtonRound
          onPress={() => navigation.navigate('addDriverFormTransport')}
        />
      </View>
      <View style={styles.body}>
        <FlatList
          nestedScrollEnabled={true}
          data={transports}
          renderItem={itemData => {
            return <Transport select={select} setSelect={setSelect} itemData={itemData} />;
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        />
      </View>
    </View>
  );
};
export default TransportList;
const styles = StyleSheet.create({
  transport: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flex: 1,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  trip: {
    flex: 1,
    marginBottom: 90,
  },
  actions: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 30,
  },
});
