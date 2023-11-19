import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { Roles } from '../constants/Roles';
import SelectionButton from '../components/ui/SelectionButton';
const Enter = ({ navigation }) => {
  const onNavigateHandler = page => {
    navigation.navigate(page);
  };
  return (
    <View style={styles.scroll}>
      <View style={styles.firstsection}>
        <Image
          style={styles.image}
          source={require('../assets/png/1.png')}
        />
      </View>
      <View style={styles.secondsection}>
        <SelectionButton
          selected={true}
          onPress={() => onNavigateHandler('ClientFormChoose')}
          title="Ýolagçy"
        />
        <SelectionButton
          selected={true}
          onPress={() => onNavigateHandler(Roles.driver)}
          title="Sürüji"
        />
      </View>
    </View>
  );
};
export default Enter;
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
    alignItems: 'flex-end',
  },
  secondsection: {
    flex: 1,
    bottom: 0,
    rowGap: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
  },
  padding: {
    margin: 20,
  },
  image: {
    maxWidth: '100%',
    maxHeight: 'auto',
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
});