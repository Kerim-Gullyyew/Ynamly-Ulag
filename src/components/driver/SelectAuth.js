import { View, StyleSheet } from 'react-native';
import React from 'react';
import AppNameText from '../ui/AppNameText';
import CityOptButton from '../ui/CityOptButton';
import { AuthContext } from '../../constants/AuthContext';
const SelectAuth = ({ navigation }) => {
  const onPressHandler = page => {
    navigation.navigate(page);
  };
  return (
    <View style={styles.body}>
      <AppNameText />
      <View style={styles.buttons}>
        <CityOptButton
          onPress={() => onPressHandler('login')}
          title={AuthContext.login}
        />
        <CityOptButton
          onPress={() => onPressHandler('register')}
          title={AuthContext.register}
        />
      </View>
    </View>
  );
};
export default SelectAuth;
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
  buttons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
