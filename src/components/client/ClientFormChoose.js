import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import SelectionButton from '../ui/SelectionButton';
import GeneralText from '../ui/GeneralText';
import { Colors } from '../../constants/Colors';
const ClientFormChoose = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.scroll}>
      <View style={styles.firstsection}>
        <Image
          style={styles.image}
          source={require('../../assets/png/2.png')}
        />
      </View>
      <View style={styles.secondsection}>
        <GeneralText title="Saýla" />
        <View style={styles.padding}>
          <SelectionButton
            selected={true}
            onPress={() => navigation.navigate('ClientForm1')}
            title="Şäher içi"
          />
        </View>
        <View style={styles.padding}>
          <SelectionButton
            selected={true}
            onPress={() => navigation.navigate('ClientForm2')}
            title="Şäher ara"
          />
        </View>
      </View>
    </View>
  );
};
export default ClientFormChoose;
const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Colors.colorBacground,
  },
  firstsection: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondsection: {
    flex: 1,
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    paddingTop: 15,
  },
  padding: {
    marginVertical: 10,
  },
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
    borderRadius: 10,
  },
});
