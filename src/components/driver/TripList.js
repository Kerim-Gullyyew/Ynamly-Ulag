import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import TripItem from './TripItem';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AddButton from '../ui/AddButton';
import { getUserData } from './auth/loginSlice';
import Loading from '../ui/Loading';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';
const TripList = () => {
  const navigation = useNavigation();
  const { trips } = useSelector(state => state.login.userData);
  const tripler = useSelector(state => state.login.userData.trips);
  const { token } = useSelector((state) => state.login);
  const user_id = useSelector(state => state.login.user.id);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const onPressHandler = () => {
    navigation.navigate("addTrip");
  };
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(getUserData({ token, user_id }))
      .unwrap()
      .then(() => {
        setIsLoading(false);
      })
      .catch(error => SetError(error));
    setIsLoading(false);
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <View style={styles.trip}>
      <Loading loading={isLoading} />
      <AddButton onPress={() => onPressHandler()} />
      <View style={styles.body}>
        {
          trips?.length < 1 ? (
            <View style={{ justifyContent: 'center', paddingTop: 200, alignItems: 'center' }}>
              <Icon name="info-outline" size={150} color={Colors.colorBorder} />
              <Text style={{ color: Colors.colorBorder, fontWeight: '500', fontSize: 28 }}>Maglumat goşuň!</Text></View>
          ) : (
            <>
              <FlatList
                nestedScrollEnabled={true}
                data={trips}
                renderItem={itemData => {
                  return (
                    <TripItem
                      onPress={() =>
                        navigation.navigate('tripDetail', { id: itemData.item.id })
                      }
                      itemData={itemData}
                    />
                  );
                }}
                keyExtractor={(item, index) => {
                  return item.id;
                }}
                alwaysBounceVertical={false}
              />
            </>
          )
        }
      </View>
    </View>
  );
};
export default TripList;
const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 20,
  },
  transport: {
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  transportHeader: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  transportText: {
    textAlign: 'center',
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  trip: {

    backgroundColor: 'white',
    flex: 1,

  },
});
