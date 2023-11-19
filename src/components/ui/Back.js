import React from 'react';
import CityOptButton from './CityOptButton';
import { useNavigation } from '@react-navigation/native';
const Back = () => {
  const navigation = useNavigation();
  return <CityOptButton title="Go back" onPress={navigation.navigate('driver')} />;
};
export default Back;
