import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import mobileHandling from '../../../utils/mobileHandling';
import Input from '../../form/Input';
import ErrorText from '../../ui/ErrorText';
import { backendUrl } from '../../../constants/rootUrl';
import { userLogin } from './loginSlice';
import { useDispatch } from 'react-redux';
import { Colors } from '../../../constants/Colors';
import SelectionButton from '../../ui/SelectionButton';
import GeneralText from '../../ui/GeneralText';
import { Roles } from '../../../constants/Roles';
import Loading from '../../ui/Loading';
const CELL_COUNT = 4;
const Register = ({ navigation }) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const dispatch = useDispatch();
  const [username, setUsername] = useState('+993');
  const [error, SetError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState(null);
  const [seconds, setSeconds] = useState(90)
  const [active, setActive] = useState(false);
  function onUsernameHandler(enteredValue) {
    mobileHandling({ enteredValue, SetError, setUsername });
  }
  const handleSubmit = async e => {
    e.preventDefault();
    setSeconds(90);
    if (username !== null) {
      let isCancelled = false;
      if (
        Number(username[5]) < 6 &&
        Number(username[5]) > 0 &&
        username.length === 12
      ) {
        SetError(null);
        const json = {
          mobile: username,
        };
        try {
          setIsLoading(true);
          const { data } = await axios.post(
            backendUrl + '/api/auth/register-mobile/',
            json,
          );
          setActive(true);
          setData(data);
          setIsLoading(false);
        } catch (error) { }
        return () => {
          isCancelled = true;
        };
      } else {
        SetError({ detail: 'Nadogry Nomer' });
        return;
      }
    } else {
      SetError({ detail: 'Nadogry Nomer' });
    }
  };
  const handleCodeSubmit = async e => {
    e.preventDefault();
    setIsLoading(true)
    let isCancelled = false;
    const json = {
      username: username,
      password: value,
    };
    dispatch(userLogin({ json }))
      .unwrap()
      .then(() => {
        setValue("");
        setUsername('+993');
        setData(null);
        SetError(null);
        navigation.navigate(Roles.driver);
      })
      .catch(err => SetError({ detail: "Parol nädogry" }));
    setIsLoading(false)
    return () => {
      isCancelled = true;
    };
  };
  useEffect(() => {
    if (active) {
      timer = setInterval(() => {
        setSeconds(seconds - 1);
        if (seconds === 0) {
          setActive(false);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  });
  return (
    <View style={styles.scroll}>
      <SafeAreaView style={styles.scroll}>
        <Loading loading={isLoading} />
        <View style={styles.firstsection}>
          <Image
            style={styles.image}
            source={require('../../../assets/png/3.png')}
          />
        </View>
        <View style={styles.secondsection}>
          <View style={styles.body}>
            <View style={styles.form}>
              <View style={styles.div}>
                <GeneralText title="Registrasiýa" />
              </View>
              {active && (
                <View style={{ borderWidth: 3, borderColor: Colors.colorBacground, padding: 10, borderRadius: 50 }}>
                  <Text style={{ color: Colors.colorBacground, fontWeight: '600', fontSize: 34 }}>{seconds < 10 ? '0' + seconds : seconds}</Text>
                </View>
              )}
              <ErrorText title={error?.detail} />
              {data?.response === 'success' ? (
                <>
                  <SafeAreaView style={styles.flex}>
                    <ScrollView style={styles.flex}>
                      {
                        active ? (
                          <>
                            <CodeField
                              ref={ref}
                              {...props}
                              value={value}
                              onChangeText={setValue}
                              cellCount={CELL_COUNT}
                              rootStyle={styles.codeFieldRoot}
                              keyboardType="number-pad"
                              textContentType="oneTimeCode"
                              renderCell={({ index, symbol, isFocused }) => (
                                <Text
                                  key={index}
                                  style={[styles.cell, isFocused && styles.focusCell]}
                                  onLayout={getCellOnLayoutHandler(index)}>
                                  {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                              )}
                            />
                            <View style={styles.div}>
                              <SelectionButton
                                selected={true}
                                onPress={handleCodeSubmit}
                                title="Kody ugratmak"
                              />
                            </View>
                          </>
                        ) : (
                          <View style={styles.div}>
                            <SelectionButton
                              selected={true}
                              onPress={handleSubmit}
                              title="Täzeden ugratmak"
                            />
                          </View>
                        )
                      }
                    </ScrollView>
                  </SafeAreaView>
                </>
              ) : (
                <>
                  <SafeAreaView style={styles.flex}>
                    <ScrollView style={styles.flex}>
                      <Text style={styles.phoneText}>Telefon belgiňiz</Text>
                      <View style={styles.div}>
                        <Input
                          error={error}
                          value={username}
                          onChangeText={onUsernameHandler}
                          keyboardType="number-pad"
                          placeholder="Username"
                        />
                      </View>
                      <View style={styles.div}>
                        <SelectionButton
                          selected={true}
                          onPress={handleSubmit}
                          title="Sms ugratmak"
                        />
                      </View>
                    </ScrollView>
                  </SafeAreaView>
                </>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
export default Register;
const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Colors.colorBacground,
  },
  firstsection: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondsection: {
    flex: 1,
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: Colors.colorBacground,
    color: Colors.colorDetailText,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  flex: {
    flex: 1,
  },
  padding: {
    margin: 20,
  },
  image: {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
    maxWidth: '100%',
  },
  body: {
    flex: 1,
  },
  form: {
    alignItems: 'center',
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  div: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helper: {
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helperText: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.colorDetailText,
    fontWeight: 'bold',
  },
  number: {
    paddingRight: 10,
    fontSize: 18,
    fontWeight: '500',
    color: Colors.colorDetailText,
  },
  phoneText: {
    color: Colors.colorDetailText,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500'
  }
});
