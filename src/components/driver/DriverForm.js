import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import { TypeRadio } from '../../constants/TypeRadio';
import DropdownForm from '../form/DropdownForm';
import RadioButton from '../form/RadioButton';
import SearchButton from '../ui/SearchButton';
import { PlaceholderContext } from '../../constants/CityContext';
import { ScrollView } from 'react-native-gesture-handler';
import { Regions } from '../../constants/Regions';
import Input from '../form/Input';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/Colors';
import DeleteButton from '../ui/DeleteButton';
import { useSelector } from 'react-redux';
import { backendUrl } from '../../constants/rootUrl';
import { Vehicle_type } from '../../constants/Vehicle_type';
import Privacy from '../ui/Privacy';
import Loading from '../ui/Loading';
import TransportModal from './TransportModal';
import PlaceSubscribe from './PlaceSubscribe';
import FlashMessage from 'react-native-flash-message';
const DriverForm = ({
  id,
  region,
  setRegion,
  region2,
  setRegion2,
  regionHandler,
  region2Handler,
  fromHandler,
  toHandler,
  from,
  to,
  setFrom,
  setTo,
  fromData,
  toData,
  transport,
  capacity,
  capacityHandler,
  description,
  descriptionHandler,
  is_onway,
  setIsOnway,
  passenger,
  setPassenger,
  cargo,
  setCargo,
  isLoading,
  onPressHandler,
  deleteTripHandler,
  title,
  show,
  setShow,
  setTransport,
  selectedTransport,
  width
}) => {
  const navigation = useNavigation();
  const [error, setError] = useState('')
  const username = useSelector((state) => state.login.user.username);
  const [visible, setVisible] = useState(false);
  return (
    <>
      <FlashMessage position={"bottom"} />
      <TransportModal selectedTransport={selectedTransport} visible={visible} transport={transport} setTransport={setTransport} setVisible={setVisible} />
      <View style={styles.phone}>
        <Text style={styles.phoneText}>{username}</Text>
      </View>
      <ScrollView style={styles.flex}>
        <Loading loading={isLoading} />
        <Privacy show={show} onPress={onPressHandler} title="Türkmenistanyň kanunyna we syýasatyna garşy gelýän ýazgylar ýazan halatyňyzda jogapkärçilige çekiljekdigiňizi duýdurýarys." setShow={setShow} isVisible={show} />
        <View style={styles.body}>
          <View style={styles.form}>
            <View>
              <Text style={styles.text}>Nireden</Text>
              <DropdownForm
                data={Regions}
                value={region}
                setValue={setRegion}
                onOptionHandler={regionHandler}
                placeholder={PlaceholderContext.region}
                labelField="region"
                valueField="region"
              />
              {
                width ? (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', columnGap: 10 }}>
                    <DropdownForm
                      onOptionHandler={fromHandler}
                      value={from}
                      setValue={setFrom}
                      data={fromData}
                      placeholder={PlaceholderContext.from}
                      labelField="title"
                      valueField="id"
                      width={width}
                    />
                    <PlaceSubscribe />
                  </View>

                ) : (
                  <DropdownForm
                    onOptionHandler={fromHandler}
                    value={from}
                    setValue={setFrom}
                    data={fromData}
                    placeholder={PlaceholderContext.from}
                    labelField="title"
                    valueField="id"
                    width={width}
                  />
                )
              }
            </View>
            <View>
              <Text style={styles.text}>Nirä</Text>
              <DropdownForm
                data={Regions}
                value={region2}
                setValue={setRegion2}
                onOptionHandler={region2Handler}
                placeholder={PlaceholderContext.region}
                labelField="region"
                valueField="region"
              />
              <DropdownForm
                onOptionHandler={toHandler}
                value={to}
                setValue={setTo}
                data={toData}
                placeholder={PlaceholderContext.to}
                labelField="title"
                valueField="id"
              />
            </View>
            <View style={styles.padding}>
              <Pressable onPress={() => setVisible(!visible)} style={styles.transportheader}>
                {transport?.model !== undefined ? (
                  <View style={styles.transport}>
                    {transport.image !== null ? (
                      <Image
                        style={styles.image}
                        source={{ uri: backendUrl + transport.image }}
                      />
                    ) : (
                      <>
                        {transport.vehicle_type ===
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
                    )}
                    <Text style={styles.text}>Modeli:  {transport.model}</Text>
                    <Text style={styles.text}>{transport.vehicle_type}</Text>
                  </View>
                ) : (
                  <>
                    <Text style={styles.text}>Awtoulagyň suraty</Text>
                  </>
                )}
              </Pressable>
            </View>
            <Input
              value={capacity}
              onChangeText={capacityHandler}
              keyboardType="number-pad"
              placeholder="Adam sany"
            />
            <Input
              value={description}
              onChangeText={descriptionHandler}
              placeholder="Dusundiris"
            />
            <View style={styles.radios}>
              <RadioButton
                selected={passenger}
                type={passenger}
                setType={() => setPassenger(passenger)}
                title={TypeRadio.person}
              />
              <RadioButton
                selected={cargo}
                type={setCargo}
                setType={() => setCargo(!cargo)}
                title={TypeRadio.cargo}
              />
              <RadioButton
                selected={is_onway}
                type={is_onway}
                setType={() => setIsOnway(!is_onway)}
                title="yol ugra"
              />
            </View>
            {error && (
              <Text style={{ color: 'red' }}>{error}</Text>
            )}
            {
              setShow ? (
                <SearchButton onPress={() => { from !== null && to !== null && capacity && transport ? setShow(true) : setError("Hemme formany doly dolduryň") }} title={title} />

              ) : (
                <SearchButton onPress={onPressHandler} title={title} />
              )
            }
            {deleteTripHandler && (
              <DeleteButton
                title="Pozmak"
                onPress={() => deleteTripHandler()}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default DriverForm;
const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginBottom: 14,
    alignItems: 'center',
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'space-between',
  },
  phone: {
    position: 'absolute',
    zIndex: 10,
    right: 0,
    marginRight: 10,
    backgroundColor: Colors.colorBacground,
    padding: 5,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  transport: {
    alignItems: 'center',
  },
  phoneText: {
    color: 'white',
    fontSize: 14
  },
  padding: {
    marginTop: 10
  },
  image: {
    width: 300,
    height: 120,
    objectFit: 'contain',
  },
  flex: {
    flex: 1,
    paddingVertical: 18,
    backgroundColor: Colors.colorBacground2,
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
    color: Colors.colorDetailText,
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  form: {
    flex: 1,
    rowGap: 10,
    alignItems: 'center',
  },
  radios: {
    marginTop: 15,
    flexDirection: 'row',
  },
  delete: {
    backgroundColor: 'red',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {},
  transportheader: {
    borderColor: Colors.borderColor,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: 300,
    height: 200,
  },
  transportaction: {
    flexDirection: 'row',
    columnGap: 15,
  },
  action: {
    padding: 5,
    width: 100,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center',
  },
  addaction: {
    backgroundColor: Colors.colorBacground,
  },
  deleteaction: {
    backgroundColor: Colors.colorRed,
  },
  actiontext: {
    color: 'white',
    fontSize: 16,
  },
});
