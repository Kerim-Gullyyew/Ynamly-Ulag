import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Modal from "react-native-modal";
import { Colors } from '../../constants/Colors';
import Transport from './Transport';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import EditButton from '../ui/EditButton';
import AddButtonRound from '../ui/AddButtonRound';
import ChooseButtonRound from '../ui/ChooseButtonRound';
import CrossButtonRound from '../ui/CrossButtonRound';

const TransportModal = ({ visible, selectedTransport, transport, setTransport, onPress, setVisible }) => {
  const navigation = useNavigation();
  const { transports } = useSelector(state => state.login.userData);
  const cancelPressed = () => {
    setTransport(selectedTransport)
    setVisible(false)
  }

  const onAddTransportPress = () => {
    setVisible(false);
    setTransport(selectedTransport)
    navigation.navigate('addDriverFormTransport')
  }
  const choosePressed = () => {
    setVisible(false)
  }

  const EditPress = () => {
    navigation.navigate('editDriverFormTransport', {
      id: transport.id,
      vehicle_type: transport.vehicle_type,
      model: transport.model,
      image: transport.image
    })
    setTransport(selectedTransport)
  }
  return (
    <View style={{ backgroundColor: 'white' }}>
      <Modal
        animationIn='pulse'
        animationInTiming={500}
        animationOut='pulse'
        animationOutTiming={300}
        isVisible={visible}
        backdropOpacity={0.7}
        onBackButtonPress={() => setVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

          <View style={styles.transport}>
            <View style={styles.body}>
              <FlatList
                nestedScrollEnabled={true}
                data={transports}
                renderItem={itemData => {
                  return <Transport transport={transport} setTransport={setTransport} itemData={itemData} />;
                }}
                keyExtractor={(item, index) => {
                  return item.id;
                }}
                alwaysBounceVertical={false}
                ListFooterComponent={() => (<>
            
                  <View style={styles.actions}>
                    <CrossButtonRound onPress={cancelPressed} />
                    {transport && (
                      <>
                        <ChooseButtonRound
                          onPress={choosePressed}
                        />
                        <EditButton
                          onPress={EditPress}
                        />
                      </>
                    )}
                    <AddButtonRound
                      onPress={onAddTransportPress}
                    />
                  </View>
                </>)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default TransportModal

const styles = StyleSheet.create({
  transport: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    flex: 1,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  trip: {
    flex: 1,
    marginBottom: 90,
  },
  actions: {
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});