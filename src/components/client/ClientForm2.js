import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNameText from '../ui/AppNameText';
import DropdownForm from '../form/DropdownForm';
import RadioButton from '../form/RadioButton';
import { TypeRadio } from '../../constants/TypeRadio';
import SearchButton from '../ui/SearchButton';
import { PlaceholderContext } from '../../constants/CityContext';
import { Regions } from '../../constants/Regions';
import { useDispatch, useSelector } from 'react-redux';
import { getLocation } from './locationSlice';
import { getTrip } from '../../store/slices/tripSlice';
import { useNavigation } from '@react-navigation/native';
const ClientForm2 = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLocation())
    }, [])
    const locations = useSelector((state) => state.location.data);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [cargo, setCargo] = useState(false);
    const [passenger, setPassenger] = useState(true);
    const [fromData, setFromData] = useState([]);
    const [fromData2, setFromData2] = useState([]);
    const [toData, setToData] = useState([]);
    const [toData2, setToData2] = useState([]);
    const [region1, setRegion1] = useState("");
    const [region2, setRegion2] = useState("");
    const [error, setError] = useState("");
    const navigation = useNavigation();
    function region1Handler(item) {
        setRegion1(item.region);
        setFrom(null)
        setFromData(locations.filter(location => location.region === item.region))
    }
    function region2Handler(item) {
        setRegion2(item.region);
        setTo(null)
        setToData(locations.filter(location => location.region === item.region))
    }
    function fromHandler(item) {
        setFrom(item);
    }
    function toHandler(item) {
        setTo(item);
    }
    function setTypePerson() {
        setPassenger(!passenger)
    }
    function setTypeCargo() {
        setCargo(!cargo)
    }
    function onPress() {
        if (from !== undefined && to !== undefined) {
            const cargo = cargo === true ? `&cargo=${cargo}` : '';
            const passanger = passenger === true ? `&passanger=${passenger}` : '';
            let link = `?from_location=${from?.id}&to_location=${to?.id}${cargo}${passanger}&others=false`;

            dispatch(getTrip({ link })).unwrap().then(() => {
                navigation.navigate('ResultList', { selectedForm: 2, link: link });
            })
        } else {
            setError("Formany doly dolduryň!")
        }
    }
    useEffect(() => {
        if (fromData[0]?.title === 'Aşgabat') {
            setFrom(fromData[0]);
        }
    }, [fromData, setFrom])

    useEffect(() => {
        if (toData[0]?.title === 'Aşgabat') {
            setTo(toData[0]);
        }
    }, [toData, setTo])
    return (
        <View style={styles.body}>

            <AppNameText title="Nireden" />
            {error && (
                <Text style={styles.text}>{error}</Text>
            )}
            <View style={styles.form}>
                <DropdownForm
                    data={Regions}
                    value={region1}
                    labelField="region"
                    valueField="region"
                    setValue={setRegion1}
                    onOptionHandler={region1Handler}
                    placeholder={PlaceholderContext.region}
                />
                {
                    from?.region !== "Aşgabat" && (
                        <DropdownForm
                            onOptionHandler={fromHandler}
                            value={from}
                            labelField={"title"}
                            valueField={"title"}
                            setValue={setFrom}
                            data={fromData}
                            placeholder={PlaceholderContext.from}
                        />
                    )
                }
                <AppNameText title="Nirä" />
                <DropdownForm
                    data={Regions}
                    value={region2}
                    labelField="region"
                    valueField="region"
                    setValue={setRegion2}
                    onOptionHandler={region2Handler}
                    placeholder={PlaceholderContext.region}
                />
                {to?.region !== "Aşgabat" && (
                    <DropdownForm
                        onOptionHandler={toHandler}
                        value={to}
                        labelField={"title"}
                        valueField={"title"}
                        setValue={setTo}
                        data={toData}
                        placeholder={PlaceholderContext.to}
                    />
                )}
                <View style={styles.radios}>
                    <RadioButton
                        selected={passenger}
                        setType={setTypePerson}
                        title={TypeRadio.person}
                    />
                    <RadioButton
                        selected={cargo}
                        setType={setTypeCargo}
                        title={TypeRadio.cargo}
                    />
                </View>
                <SearchButton onPress={onPress} title={'Gozle'} />
            </View>
        </View>
    );
}
export default ClientForm2
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
        justifyContent: 'space-between',
    },
    form: {
        flex: 1,
        rowGap: 10,
        paddingTop: 5,
        alignItems: 'center',
    },
    text: {
        color: 'red',
        fontWeight: '500',
        fontSize: 16,
        paddingVertical: 10,
    },
    radios: {
        flexDirection: 'row',
    },
});
