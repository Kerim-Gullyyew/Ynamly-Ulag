import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getUserData } from './auth/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../constants/Colors';
import SelectionButton from '../ui/SelectionButton';
const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, SetError] = useState(null);
  const { token } = useSelector(state => state.login);
  const user_id = useSelector(state => state.login.user.id);
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
  }, [token, user_id]);
  const onPress = page => {
    navigation.navigate(page);
  };
  return (
    <View style={styles.body}>
      <View style={styles.number}>
        <Text>+99361167930</Text>
      </View>
      <View style={styles.section}>
        <Image
          style={styles.image}
          source={require('../../assets/png/Profile.png')}
        />
      </View>
      <View style={styles.second}>
        <View style={styles.main}>
          <SelectionButton
            onPress={() => onPress('tripList')}
            selected={true}
            title="Gidýän ugruňyz"
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.colorBacground,
  },
  second: {
    backgroundColor: 'white',
    padding: 10,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 20,
  },
  number: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'white'
  },
  section: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  section2: {
    marginVertical: 20,
    borderColor: Colors.colorBorder,
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingHorizontal: 25,
    backgroundColor: 'white',
  },
  section2Text: {
    fontSize: 14,
    color: Colors.colorGeneralText,
    fontWeight: '400',
  },
  section2Text2: {
    fontSize: 18,
    color: Colors.colorDetailText2,
    fontWeight: '400',
  },
  section3: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 400,
    maxWidth: '95%',
    objectFit: 'contain',
  },
  main: {
    marginTop: 10,
    alignItems: 'center',
  },
});
