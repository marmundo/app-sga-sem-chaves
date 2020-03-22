/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import AddSala from './src/screens/AddSala'
import Sala from './src/screens/Sala'
import Login from './src/screens/Login'
// import Notification from './src/screens/Notification'
import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => AddSala);
AppRegistry.registerComponent(appName, () => Sala);
AppRegistry.registerComponent(appName, () => Login);
// AppRegistry.registerComponent(appName, () => Notification);