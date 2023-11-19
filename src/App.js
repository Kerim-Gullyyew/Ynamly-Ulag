
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native';
import Enter from './screens/Enter';
import Driver from './screens/Driver';
import { Colors } from './constants/Colors';
import { Roles } from './constants/Roles';
import { createStackNavigator } from '@react-navigation/stack';
import ClientForm1 from './components/client/ClientForm1';
import ClientForm2 from './components/client/ClientForm2';
import ResultList from './components/client/ResultList';
import ResultDetail from './components/client/ResultDetail';
import ClientFormChoose from './components/client/ClientFormChoose';
import AddDriverFormTransport from './components/driver/AddDriverFormTransport';
import EditDriverFormTransport from './components/driver/EditDriverFormTransport';
import TripDetail from './components/driver/TripDetail';
import AddTrip from './components/driver/AddTrip';
import TransportList from './components/driver/TransportList';
import TripList from './components/driver/TripList';
import { getLocation } from './components/client/locationSlice';
import Loading from './components/ui/Loading';
const Stack = createStackNavigator();

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLocation())
  }, [])
  const { isLoading } = useSelector((state) => state.location)

  return (
    <>
      <Loading loading={isLoading} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerRight: () =>
              <Image
                style={{ width: 100, height: 50, marginRight: 3, objectFit: 'contain' }}
                source={require('./assets/png/logo.png')}
              />
            ,
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: Colors.colorBacground,
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontSize: 18,
            },
          }}>
          <Stack.Screen

            name="Enter"
            options={{
              title: 'Hoş geldiňiz',
            }}
            component={Enter}
          />
          <Stack.Screen
            options={{
              title: 'Saýlaň',
            }}
            name="ClientFormChoose"
            component={ClientFormChoose}
          />
          <Stack.Screen name="ClientForm1" options={{
            title: 'Ynamly Ulag',
          }} component={ClientForm1} />
          <Stack.Screen name="ClientForm2" options={{
            title: 'Ynamly Ulag',
          }} component={ClientForm2} />
          <Stack.Screen
            name="ResultList"
            options={{
              title: 'Gözleg netijesi',
              headerShown: true,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.colorBacground2,
              },
              headerTintColor: Colors.colorGeneralText,
              headerTitleStyle: {
                fontSize: 22,
                fontWeight: 'bold',
              },
            }}
            component={ResultList}
          />
          <Stack.Screen
            options={{
              title: 'Gözleg netijesi',
              headerShown: true,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.colorBacground2,
              },
              headerTintColor: Colors.colorGeneralText,
              headerTitleStyle: {
                fontSize: 22,
                fontWeight: 'bold',
              },
            }}
            name="ResultDetail"
            component={ResultDetail}
          />

          <Stack.Screen
            name={Roles.driver}

            options={{
              title: 'Gidýän ugurlaryňyz',
              headerShown: true,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.colorBacground,
              },
              headerTintColor: 'white',
              headerTitleStyle: {
                fontSize: 18,
              },
            }}
            component={Driver}
          />
          <Stack.Screen
            options={{
              title: "Goşulan ulaglar",
              headerShown: true,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.colorBacground2,
              },
              headerTintColor: Colors.colorGeneralText,
              headerTitleStyle: {
                fontSize: 22,
                fontWeight: 'bold',
              },
            }}
            name="transportList"
            component={TransportList}
          />
          <Stack.Screen
            options={{
              title: "Maglumat giriziň",
              headerShown: true,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.colorBacground,
              },
              headerTintColor: 'white',
              headerTitleStyle: {
                fontSize: 18,
              },
            }}
            name="addDriverFormTransport"
            component={AddDriverFormTransport}
          />
        
          <Stack.Screen
            options={{
              title: "Maglumat giriziň",
              headerShown: true,
              headerTitleAlign: 'center',

              headerStyle: {
                backgroundColor: Colors.colorBacground2,
              },
              headerTintColor: Colors.colorGeneralText,
              headerTitleStyle: {
                fontSize: 22,
                fontWeight: 'bold',
              },
            }}
            name="addTrip"
            component={AddTrip}
          />
          <Stack.Screen
            options={{
              title: "Gidýän ugurlaryňyz",
              headerShown: true,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.colorBacground2,
              },
              headerTintColor: Colors.colorGeneralText,
              headerTitleStyle: {
                fontSize: 22,
                fontWeight: 'bold',
              },
            }}
            name="tripList"
            component={TripList}
          />
          <Stack.Screen
            options={{
              title: 'Gidýän ugruňyz',
              headerShown: true,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.colorBacground2,
              },
              headerTintColor: Colors.colorGeneralText,
              headerTitleStyle: {
                fontSize: 22,
                fontWeight: 'bold',
              },
            }}
            name="tripDetail"
            component={TripDetail}
          />

          <Stack.Screen
          options={{
            title: "Ulagy üýtgetmek"
          }}
            name="editDriverFormTransport"
            component={EditDriverFormTransport}
          />
          <Stack.Screen name="driver" options={{
            title: 'Gidýän ugruňyz',
          }} component={Driver} />
        </Stack.Navigator>
      </NavigationContainer >
    </>

  )
}



export default App;


