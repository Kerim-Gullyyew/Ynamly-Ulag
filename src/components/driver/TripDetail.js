import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getLocation } from '../client/locationSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTrip,
  getTripDetail,
} from '../../store/slices/tripSlice';
import DriverForm from './DriverForm';
import { useNavigation } from '@react-navigation/native';
import { editTrip, getUserData } from './auth/loginSlice';
const TripDetail = ({ route }) => {
  const id = route.params.id;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { tripDetail } = useSelector(state => state.trip);
  const locations = useSelector((state) => state.location.data);
  const { token } = useSelector(state => state.login);
  const user = useSelector(state => state.login.user.id);
  const user_id = useSelector(state => state.login.user.id);
  const [error, SetError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dataVehicleType = useSelector(state => state.login.userData.transports);
  const [region, setRegion] = useState(null);
  const [region2, setRegion2] = useState(null);
  const [fromData, setFromData] = useState([]);
  const [toData, setToData] = useState([]);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [transport, setTransport] = useState(null);
  const [is_intercity, setIsIntercity] = useState(null);
  const [is_onway, setIsOnway] = useState(null);
  const [passenger, setPassenger] = useState(null);
  const [cargo, setCargo] = useState(null);
  const [capacity, setCapacity] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    if (tripDetail) {

      setFrom(tripDetail?.from_location);
      setTo(tripDetail?.to_location);
      setTransport(tripDetail?.transport_id);
      setIsIntercity(tripDetail?.is_intercity);
      setIsOnway(tripDetail?.is_onway);
      setPassenger(tripDetail?.passanger);
      setCargo(tripDetail?.cargo);
      setCapacity(tripDetail?.capacity.toString());
      setDescription(tripDetail?.description);
      setRegion({
        region: tripDetail?.from_location?.region,
      });
      setRegion2({
        region: tripDetail?.to_location?.region,
      });
      // setFromData(locations.filter(location => location?.region === region?.region))
    }
  }, [tripDetail]);

  useEffect(() => {
    setIsLoading(true);
    if (locations) {
      return;
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
  useEffect(() => {
    setIsLoading(true);
    dispatch(getTripDetail({ id }))
      .unwrap()
      .then(() => {
        setIsLoading(false);
      });
    setIsLoading(false);
    return () => { };
  }, [id]);
  useEffect(() => {
    setFromData(locations.filter(location => location?.region === region?.region))
    setToData(locations.filter(location => location?.region === region2?.region))
  }, [region, region2])

  function regionHandler(enteredValue) {
    setRegion(enteredValue);
    setFromData(locations.filter(location => location?.region === enteredValue?.region))
  }
  function region2Handler(enteredValue) {
    setRegion2(enteredValue);
    setToData(locations.filter(location => location?.region === enteredValue?.region))
  }

  function fromHandler(enteredValue) {
    setFrom(enteredValue);
    if (selectedForm === 1) {
      setTo(enteredValue);
    }
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
  const onPressHandler = () => {
    if (region.region === region2.region) {
      setIsIntercity(true);
    } else {
      setIsIntercity(false);
    }
    setIsLoading(true)
    const json = {
      is_active: true,
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
    dispatch(editTrip({ token, json, id }))
      .unwrap()
      .then(res => {
        dispatch(getUserData({ token, user_id }))
          .unwrap()
          .then(res => {
            setIsLoading(false)
            navigation.navigate('driver');
          });
      })
      .catch(err => SetError(err), setIsLoading(false));
    return () => { };
  };
  const deleteTripHandler = () => {
    setIsLoading(true)
    dispatch(deleteTrip({ token, id }))
      .unwrap()
      .then(res => {
        dispatch(getUserData({ token, user_id }))
          .unwrap()
          .then(res => {
            navigation.navigate('tripList');
            setIsLoading(false)
          });
      })
      .catch(err => SetError(err), setIsLoading(false));
    return () => { };
  };
  return (
    <>
      <DriverForm
        selectedTransport={tripDetail?.transport_id}
        id={id}
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
        setIsOnway={setIsOnway}
        passenger={passenger}
        setPassenger={setPassenger}
        cargo={cargo}
        setCargo={setCargo}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onPressHandler={onPressHandler}
        deleteTripHandler={deleteTripHandler}
        title="Ýatda saklamak"
      />
    </>
  );
};
export default TripDetail;
