import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
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
const ClientForm1 = () => {
    const dispatch = useDispatch();
    const locations = useSelector((state) => state.location.data);
    useEffect(() => {
        dispatch(getLocation())
    }, [])
    const [error, setError] = useState(null)
    const [from, setFrom] = useState(null);
    const [cargo, setCargo] = useState(false);
    const [passenger, setPassenger] = useState(true);
    const [fromData, setFromData] = useState([]);
    const [region1, setRegion1] = useState("");
    const navigation = useNavigation();
    function region1Handler(item) {
        setRegion1(item.region);
        setFrom(null);
        setFromData(locations.filter(location => location.region === item.region))
    }
    function fromHandler(item) {
        setFrom(item);
    }
    function setTypePerson() {
        setPassenger(!passenger)
    }
    function setTypeCargo() {
        setCargo(!cargo)
    }
    function onPress() {
        if (from !== undefined) {
            const cargo = cargo === true ? `&cargo=${cargo}` : '';
            const passanger = passenger === true ? `&passanger=${passenger}` : '';
            let link = `?from_location=${from.id}&to_location=${from.id}${cargo}${passanger}&created=true&is_intercity=true&others=false`;
            console.log(link);
            dispatch(getTrip({ link })).unwrap().then(() => {
                navigation.navigate('ResultList', { selectedForm: 1, link: link });
            })
        } else {
            setError("Formany doly dolduryň!")
        }
    }

    useEffect(() => {
        if (fromData[0]?.title === 'Aşgabat ş.') {
            setFrom(fromData[0]);
        }
    }, [fromData, setFrom])
    return (
        <View style={styles.body}>
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
export default ClientForm1
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
        paddingTop: 30,
        alignItems: 'center',
    },
    radios: {
        flexDirection: 'row',
    },
});
