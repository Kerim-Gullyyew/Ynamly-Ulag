import { View, StyleSheet, Text, Pressable, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../constants/Colors';
import { nextAddTrip, otherTrip } from '../../store/slices/tripSlice';
import AnimationHeader from '../ui/AnimationHeader';


const OtherResult = ({ link }) => {
  const dispatch = useDispatch();
  const link2 = link.replace('others=false', 'others=true');
  const [loading, setIsLoading] = useState(false);
  const { results } = useSelector(state => state?.trip?.otherdata);
  function onPressHandler() {
    setIsLoading(true);
    dispatch(otherTrip({ link: link2 }))
      .unwrap()
      .then(() => {
        setIsLoading(false);
      })
      .catch(err => SetError(err));
  }
  return (
    <>
      <View style={styles.body}>
        {loading ? (
          <View style={styles.button}>
            <Text style={styles.text}>Ýüklenýär...</Text>
          </View>
        ) : (
          <>
            {!results && (
              <Pressable onPress={() => onPressHandler()} style={styles.button}>
                <Text style={styles.text}>Welaýatyň başga künjeklerine</Text>
              </Pressable>
            )}
          </>
        )}

      </View>

    </>
  )
}

export default OtherResult

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.colorBacground2,
    alignItems: 'center',
    // margin: 5,
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
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
});