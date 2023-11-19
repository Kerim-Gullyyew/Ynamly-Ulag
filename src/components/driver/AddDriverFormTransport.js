import { StyleSheet } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { Vehicle_type } from '../../constants/Vehicle_type';
import { useDispatch, useSelector } from 'react-redux';
import DriverFormTransport from './DriverFormTransport';
import { createtransport } from './auth/loginSlice';
const data = [
  { label: Vehicle_type.light_vehicle, value: Vehicle_type.light_vehicle },
  { label: Vehicle_type.weight_vehicle, value: Vehicle_type.weight_vehicle },
];
const AddDriverFormTransport = ({ navigation }) => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.login);
  const { user } = useSelector(state => state.login);
  const [transport, setTransport] = useState(null);
  const [model, setModel] = useState(null);
  const [error, SetError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  function transportHandler(enteredvalue) {
    setTransport(enteredvalue.value);
  }
  const onPressHandler = () => {
    if (model !== null && model !== '' && user && transport !== null) {
      const formData = new FormData();
      formData.append('model', model);
      if (selectedImage) {
        formData.append('image', {
          uri: selectedImage,
          name: selectedImage,
          type: 'image/jpg'
        });
      }
      formData.append('vehicle_type', transport);
      formData.append('user', user.id);
      setIsLoading(true)
      console.log(formData);
      dispatch(createtransport({ token, formData }))
        .then(res => {
          setTransport(null);
          setModel(null);
          SetError(null);
          setSelectedImage(null);
          setImage('');
          setIsLoading(false)
          navigation.navigate('addTrip', { modal: true});
        })
        .catch(err => {
          SetError(err)
          setIsLoading(false)
        });
      return () => { };
    } else {
      SetError({ detail: 'Hemme öýjükleri dolduryň' });
    }
  };
  function onModelChange(enteredvalue) {
    setModel(enteredvalue);
  }
  return (
    <>
      <DriverFormTransport
        error={error}
        model={model}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        onModelChange={onModelChange}
        transportHandler={transportHandler}
        transport={transport}
        image={image}
        setImage={setImage}
        setTransport={setTransport}
        data={data}
        isLoading={isLoading}
        onPressHandler={onPressHandler}
      />
    </>
  );
};

export default AddDriverFormTransport;
