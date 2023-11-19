import React, { useDebugValue, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Register from '../components/driver/auth/Register';
import TripList from '../components/driver/TripList';
import { getLocation } from '../components/client/locationSlice';
const Driver = ({ navigation }) => {
  const { token } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLocation())
  }, [])
  return (
    <>
      {token ? (
        <TripList navigation={navigation} />
      ) : (
        <Register navigation={navigation} />
      )}
    </>
  );
};
export default Driver;
