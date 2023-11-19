import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DriverFormTransport from './DriverFormTransport';
import { Vehicle_type } from '../../constants/Vehicle_type';
import { useNavigation } from '@react-navigation/native';
import { deleteTransport, edittransport } from './auth/loginSlice';
const data = [
  { label: Vehicle_type.light_vehicle, value: Vehicle_type.light_vehicle },
  { label: Vehicle_type.weight_vehicle, value: Vehicle_type.weight_vehicle },
];
const EditDriverFormTransport = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const id = route.params.id;
  const { token } = useSelector(state => state.login);
  const { user } = useSelector(state => state.login);
  const [transport, setTransport] = useState({
    label: route.params.vehicle_type,
    value: route.params.vehicle_type,
  });
  const [model, setModel] = useState(route.params.model);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(route.params.image);
  const [isLoading, setIsLoading] = useState(false);
  const [error, SetError] = useState(null);
  function onModelChange(enteredvalue) {
    setModel(enteredvalue);
  }
  function transportHandler(enteredvalue) {
    setTransport(enteredvalue);
  }
  const deleteHandler = () => {
    setIsLoading(true)
    dispatch(deleteTransport({ token, id }))
      .unwrap()
      .then(res => {
        navigation.navigate('transportList');
        setIsLoading(false)
      })
      .catch(err => {
        SetError(err)
        setIsLoading(false)
      });
    return () => { };
  };
  const onPressHandler = () => {
    if (model !== null && user && transport !== null) {
      const formData = new FormData();
      formData.append('model', model);
      if (selectedImage) {
        formData.append('image', {
          uri: selectedImage,
          name: 'selfie.jpg',
          type: 'image/jpg'
        });
      }
      formData.append('vehicle_type', transport.value);
      formData.append('user', user.id);
      setIsLoading(true)
      dispatch(edittransport({ token, id, formData }))
        .unwrap()
        .then(res => {
          setIsLoading(false)
          navigation.navigate('transportList');
        })
        .catch(err => {
          SetError(err)
          setIsLoading(false)
        });
      return () => { };
    } else {
      SetError({ detail: 'Hemme oyjukleri dolduryn' });
    }
  };
  return (
    <DriverFormTransport
      deleteHandler={deleteHandler}
      error={error}
      isLoading={isLoading}
      selectedImage={selectedImage}
      image={image}
      setImage={setImage}
      setSelectedImage={setSelectedImage}
      model={model}
      onModelChange={onModelChange}
      transportHandler={transportHandler}
      transport={transport}
      setTransport={setTransport}
      data={data}
      onPressHandler={onPressHandler}
    />
  );
};
export default EditDriverFormTransport;
