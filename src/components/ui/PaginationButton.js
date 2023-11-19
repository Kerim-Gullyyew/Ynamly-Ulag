import { View, StyleSheet, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../constants/Colors';
import { nextAddTrip } from '../../store/slices/tripSlice';

const PaginationButton = () => {
  const dispatch = useDispatch();
  const { next } = useSelector(state => state.trip.data);
  const [loading, setIsLoading] = useState(false);
  const [error, SetError] = useState(null);
  function onPressHandler() {
    setIsLoading(true);
    dispatch(nextAddTrip({ link: next }))
      .unwrap()
      .then(() => {
        setIsLoading(false);
      })
      .catch(err => SetError(err));
  }
  return (
    <>
      <View style={styles.body}>
        {next && (
          <>
            {loading ? (
              <View style={styles.button}>
                <Text style={styles.text}>Ýüklenýär...</Text>
              </View>
            ) : (
              <Pressable onPress={() => onPressHandler()} style={styles.button}>
                <Text style={styles.text}>Ýene ýükle</Text>
              </Pressable>
            )}
          </>
        )}
      </View>
    </>
  );
};
export default PaginationButton;
const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    margin: 5,
  },
  button: {
    backgroundColor: Colors.colorBacground,
    borderRadius: 10,
    padding: 10,
    width: 150,
    maxWidth: '80%',
    alignItems: 'center',
    minWidth: 'auto',
  },
  text: {
    fontWeight: '500',
    color: 'white',
    fontSize: 18,
  },
});
