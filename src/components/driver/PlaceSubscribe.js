import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Modal from "react-native-modal";
import { Regions } from '../../constants/Regions';
import { PlaceholderContext } from '../../constants/CityContext';
import DropdownForm from '../form/DropdownForm';
import Input from '../form/Input';
import { useDispatch, useSelector } from 'react-redux';
import { createRequest } from './auth/loginSlice';
import PopupText from '../ui/PopupText';
import FlashMessage, { positionStyle } from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

const PlaceSubscribe = () => {
  const [visible, setVisible] = useState(false)
  const { token } = useSelector(state => state.login);
  const [region, setRegion] = useState([]);
  const [description, setDescription] = useState(null);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const user = useSelector((state) => state.login.user.id)
  const dispatch = useDispatch();
  const onPress = () => {

    if (region && description && user) {
      const json = {
        region: region.region,
        title: description,
        user: user
      }
      console.log(json);
      dispatch(createRequest({ token, json })).unwrap().then((res) => {
        setResponse(res.message)
        setError(null);
        setVisible(false);
        setDescription(null);
        setRegion([]);
        showMessage({
          message: res.message,
          type: 'success',
          backgroundColor: Colors.colorBacground,
          style: { borderRadius: 20, marginBottom: 24, marginHorizontal: 12 },
          color: "white",
        });
        setResponse(null);
      })

    } else {
      setError('Formany doly dolduryň!')
    }
  }
  function descriptionHandler(enteredValue) {
    setDescription(enteredValue);
  }
  function regionHandler(enteredValue) {
    setRegion(enteredValue);
  }
  return (
    <>

      <Pressable onPress={() => setVisible(true)} style={{ backgroundColor: Colors.colorBacground, width: '12%', height: 35, padding: 5, borderRadius: 5, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="add" color="white" size={25} />
      </Pressable>

      <Modal
        animationIn='pulse'
        animationInTiming={500}
        animationOut='pulse'
        animationOutTiming={300}
        isVisible={visible}
        backdropOpacity={0.7}
        onBackButtonPress={() => setVisible(false)}
      >
        <View style={{ backgroundColor: 'white', borderRadius: 14, rowGap: 10, paddingVertical: 14 }}>
          <View style={{ alignItems: 'center', rowGap: 10 }}>
            <Text style={{ color: Colors.colorRed, fontSize: 16, fontWeight: '500' }}>{error}</Text>
            <Text style={{ color: Colors.colorDetailText, paddingHorizontal: 14, fontSize: 16, fontWeight: '500' }}>{response}</Text>
            <DropdownForm
              data={Regions}
              value={region}
              setValue={setRegion}
              onOptionHandler={regionHandler}
              placeholder={PlaceholderContext.region}
              labelField="region"
              valueField="region"
            />
            <Input
              value={description}
              onChangeText={descriptionHandler}
              placeholder="Dusundiris"
            />

          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 24 }}>
            <Pressable onPress={() => setVisible(false)}><Text style={{ color: Colors.colorDetailText, fontSize: 16 }}>Yza</Text></Pressable>
            <Pressable onPress={onPress} style={{ backgroundColor: Colors.colorBacground, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4, elevation: 3 }}><Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>Ugratmak</Text></Pressable>
          </View>

        </View>

      </Modal>
    </>

  )
}

export default PlaceSubscribe