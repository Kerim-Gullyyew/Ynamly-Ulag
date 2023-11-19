import {
  View,
  Text,
  StyleSheet,
  Linking,
  Pressable,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { getTripDetail } from '../../store/slices/tripSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../constants/Colors';
import { backendUrl } from '../../constants/rootUrl';
import AnimationHeader from '../ui/AnimationHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Vehicle_type } from '../../constants/Vehicle_type';
import { ScrollView } from 'react-native-gesture-handler';
import Privacy from '../ui/Privacy';
const ResultDetail = ({ route }) => {
  const dispatch = useDispatch();
  const id = route.params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [error, SetError] = useState(null);
  const [show, setShow] = useState(false)
  useEffect(() => {
    setIsLoading(true);
    dispatch(getTripDetail({ id }))
      .unwrap()
      .then(() => {
        setIsLoading(false);
      })
      .catch(error => SetError(error));
    setIsLoading(false);
    return () => {
      isCancelled = true;
    };
  }, [id]);
  const { tripDetail } = useSelector(state => state?.trip);
  function callToNumber(phone) {
    setShow(false);
    Linking.openURL(`tel: +${phone}`);
  }
  return (
    <ScrollView style={styles.flex}>
      <Privacy isVisible={show} setShow={setShow} onPress={() => callToNumber(tripDetail?.user?.username)} title="Ynamly ulag platformanyň administrasiýasy sürüjilere kepillik geçenok." />
      <View style={styles.body}>
        <AnimationHeader
          region={tripDetail.from_location?.region}
          region2={tripDetail.to_location?.region}
          title={tripDetail.from_location?.title}
          title2={tripDetail.to_location?.title}
        />
        <View style={styles.section}>
          <View style={styles.callnumber}>
            <Text style={styles.callnumbertext}>
              {tripDetail.user?.username}
            </Text>
          </View>
          <View style={styles.sectionImage}>
            <>
              {tripDetail?.transport_id?.image === null ? (
                <>
                  {tripDetail?.transport_id?.vehicle_type ===
                    Vehicle_type.light_vehicle ? (
                    <Image
                      style={styles.image}
                      source={require('../../assets/png/car.png')}
                    />
                  ) : (
                    <Image
                      style={styles.image}
                      source={require('../../assets/png/truck.png')}
                    />
                  )}
                </>
              ) : (
                <Image
                  style={styles.image}
                  source={{ uri: backendUrl + tripDetail?.transport_id?.image }}
                />
              )}
            </>
          </View>
        </View>
        <View style={styles.section2}>
          {tripDetail?.passanger && (
            <View style={{ flexDirection: 'row', columnGap: 10, alignItems: 'center' }}>
              <Icon name="check-circle-outline" size={24} color={Colors.colorBacground} />
              <Text style={{ color: Colors.colorBacground, fontSize: 16, fontWeight: '500' }}>Ýolagçy</Text>
            </View>
          )}
          {tripDetail?.cargo && (
            <View style={{ flexDirection: 'row', columnGap: 10, alignItems: 'center' }}>
              <Icon name="check-circle-outline" size={24} color={Colors.colorBacground} />
              <Text style={{ color: Colors.colorBacground, fontSize: 16, fontWeight: '500' }}>Poçta, Ýük</Text>
            </View>
          )}
          <Text style={styles.section2Text}>{tripDetail?.description}</Text>
        </View>
        <View style={styles.section3}>
          <Pressable
            onPress={() => setShow(true)}
            style={styles.call}>
            <Icon name="call" size={30} color="white" />
            <Text style={styles.section3Text}>Jaň etmek</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};
export default ResultDetail;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 10,
  },
  flex: {
    backgroundColor: Colors.colorBacground2,
    flex: 1,
  },
  callnumbertext: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  section: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    shadowColor: Colors.colorBacground,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 6,
    borderRadius: 10,
  },
  callnumber: {
    position: 'absolute',
    right: 0,
    padding: 10,
    zIndex: 1,
    backgroundColor: Colors.colorBacground,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 10,
  },
  sectionImage: {
    alignItems: 'center',
  },
  sectionBody: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  sectionText: {
    fontSize: 17,
    fontWeight: '400',
    color: Colors.colorDetailText,
  },
  sectionText2: {
    color: Colors.colorDetailText2,
  },
  image: {
    width: '90%',
    height: 250,
    maxWidth: '90%',
    objectFit: 'contain',
    bottom: 0,
  },
  section2: {
    marginHorizontal: 15,
    paddingVertical: 20,
    rowGap: 10,
  },
  section2Text: {
    fontSize: 15,
    color: Colors.colorDetailText,
    fontWeight: '500',
    textAlign: 'justify',
    lineHeight: 30,
  },
  section3: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  call: {
    backgroundColor: Colors.colorSelectionButton,
    width: 200,
    maxWidth: '90%',
    height: 50,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section3Text: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
});
