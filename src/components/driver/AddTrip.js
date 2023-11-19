import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getLocation } from '../client/locationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createTrip } from '../../store/slices/tripSlice';
import DriverForm from './DriverForm';
import { useNavigation } from '@react-navigation/native';
import { getUserData } from './auth/loginSlice';

const AddTrip = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { token } = useSelector(state => state.login);
  const user = useSelector(state => state.login.user.id);
  const user_id = useSelector(state => state.login.user.id);
  const [error, SetError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dataVehicleType = useSelector(state => state.login.userData.transports);
  const [region, setRegion] = useState([]);
  const [region2, setRegion2] = useState([]);

  const [fromData, setFromData] = useState([]);
  const [toData, setToData] = useState([]);

  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [transport, setTransport] = useState(null);
  const [is_intercity, setIsIntercity] = useState(false);
  const [is_onway, setIsOnway] = useState(false);
  const [passenger, setPassenger] = useState(true);
  const [cargo, setCargo] = useState(false);
  const [capacity, setCapacity] = useState(null);
  const [description, setDescription] = useState(null);
  const [show, setShow] = useState(false);
  const locations = useSelector((state) => state.location.data);
  useEffect(() => {
    setIsLoading(true);
    if (locations) {
      setIsLoading(false);
      return
    } else {
      dispatch(getLocation())
        .unwrap()
        .then(() => {
          setIsLoading(false);
        })
        .catch(error => SetError(error));
      setIsLoading(false);
      return () => {
        isCancelled = true;
      };
    }
  }, []);

  function regionHandler(enteredValue) {
    setRegion(enteredValue);
    setFromData(locations.filter(location => location.region === enteredValue.region))
  }
  function fromHandler(enteredValue) {
    setFrom(enteredValue);
    if (selectedForm === 1) {
      setTo(enteredValue);
    }
  }
  function region2Handler(enteredValue) {
    setRegion2(enteredValue);
    setToData(locations.filter(location => location.region === enteredValue.region))
  }
  function toHandler(enteredValue) {
    setTo(enteredValue);
  }
  function capacityHandler(enteredValue) {
    setCapacity(enteredValue);
  }
  function descriptionHandler(enteredValue) {
    setDescription(enteredValue);
  }
  function fromHandler(enteredValue) {
    setFrom(enteredValue);
  }
  function onPressHandler() {
    if (from?.title === to?.title) {
      setIsIntercity(true);
    } else {
      setIsIntercity(false);
    }
    setShow(false);
    setIsLoading(true)
    if (capacity, from !== null, to !== null, user, transport) {
      const json = {
        is_active: true,
        leaving_time: "2023-10-24T06:26:17.720Z",
        capacity: capacity,
        is_intercity: is_intercity,
        is_onway: is_onway,
        description: description,
        cargo: cargo,
        passanger: passenger,
        from_location: from.id,
        to_location: to.id,
        user: user,
        transport_id: transport.id,
      };
      dispatch(createTrip({ token, json }))
        .unwrap()
        .then(res => {
          dispatch(getUserData({ token, user_id }))
            .unwrap()
            .then(res => {
              navigation.navigate('tripList');
              setRegion([]);
              setRegion2([]);
              setFromData([]);
              setToData([]);
              setFrom(null);
              setTo(null);
              setIsIntercity(false);
              setIsOnway(false);
              setPassenger(true);
              setCargo(false);
              setCapacity(null);
              SetError(null);
              setDescription(null);
              setIsLoading(false)
            });
        })
        .catch(err => SetError(err), setIsLoading(false));
      return () => { };
    } else {
      SetError({ detail: 'Formany doly dolduryň!' })
    }
  };
  return (
    <DriverForm
      region={region}
      setRegion={setRegion}
      region2={region2}
      setRegion2={setRegion2}
      regionHandler={regionHandler}
      region2Handler={region2Handler}
      fromHandler={fromHandler}
      toHandler={toHandler}
      from={from}
      to={to}
      setFrom={setFrom}
      setTo={setTo}
      fromData={fromData}
      toData={toData}
      transport={transport}
      setTransport={setTransport}
      dataVehicleType={dataVehicleType}
      capacity={capacity}
      setCapacity={setCapacity}
      capacityHandler={capacityHandler}
      description={description}
      descriptionHandler={descriptionHandler}
      is_onway={is_onway}
      setIsOnway={() => setIsOnway(!is_onway)}
      passenger={passenger}
      setPassenger={() => setPassenger(!passenger)}
      cargo={cargo}
      setCargo={() => setCargo(!cargo)}
      isLoading={isLoading}
      onPressHandler={onPressHandler}
      title={"Ýatda sakla"}
      show={show}
      setShow={setShow}
      width={"82%"}
    />
  );
};

export default AddTrip;
