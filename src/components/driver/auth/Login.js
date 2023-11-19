import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import CityOptButton from '../../ui/CityOptButton';
import { useState } from 'react';
import Input from '../../form/Input';
import { useDispatch } from 'react-redux';
import { userLogin } from './loginSlice';
import ErrorText from '../../ui/ErrorText';
import mobileHandling from '../../../utils/mobileHandling';
const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [error, SetError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'username':
        mobileHandling({ enteredValue, SetError, setUsername });
        break;
      case 'password':
        setPassword(enteredValue);
        break;
    }
  }
  const handleSubmit = e => {
    e.preventDefault();
    let isCancelled = false;
    const json = {
      username: username,
      password: password,
    };
    if (username && password) {
      setIsLoading(true);
      dispatch(userLogin({ json }))
        .unwrap()
        .then(() => {
          setPassword('');
          setUsername('');
          navigation.navigate('driver');
        })
        .catch(error => SetError(error));
      setIsLoading(false);
      return () => {
        isCancelled = true;
      };
    } else {
      return;
    }
  };
  return (
    <View style={styles.body}>
      <View style={styles.form}>
        <View style={styles.div}>
          <Text style={styles.loginText}>Login</Text>
        </View>
        {error && <ErrorText title={error.message} />}
        {error && <ErrorText title={error.detail} />}
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <View style={styles.div}>
              <View style={styles.helper}>
                <Text style={styles.helperText}>+993</Text>
              </View>
              <Input
                error={error}
                value={username}
                onChangeText={updateInputValueHandler.bind(this, 'username')}
                keyboardType="number-pad"
                placeholder="Username"
              />
            </View>
            <View style={styles.div}>
              <Input
                error={error}
                value={password}
                secure
                onChangeText={updateInputValueHandler.bind(this, 'password')}
                placeholder="Password"
              />
            </View>
          </>
        )}
        <View style={styles.div}>
          {isLoading ? (
            <CityOptButton disabled={true} title="Login" />
          ) : (
            <CityOptButton onPress={handleSubmit} title="Login" />
          )}
        </View>
      </View>
    </View>
  );
};
export default Login;
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  form: {
    alignItems: 'center',
    margin: 15,
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    paddingHorizontal: 15,
    borderRadius: 10,
    width: 200,
    borderWidth: 0.5,
  },
  helper: {
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helperText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  div: {
    flexDirection: 'row',
    marginVertical: 15,
  },
});
