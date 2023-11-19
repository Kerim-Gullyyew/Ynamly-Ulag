/**
 * @format
 */
// import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import AppWrapper from './AppWrapper';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => AppWrapper);
