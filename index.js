import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import App from './App';
// import AddSala from './src/screens/AddSala'
// import Sala from './src/screens/Sala'
// import Login from './src/screens/Login'
// import Notification from './src/screens/Notification'
import { name as appName } from './app.json';
import Reactotron from 'reactotron-react-native';

import storeConfig from './src/store/storeconfig';

const store = storeConfig();
const Redux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Redux);
// AppRegistry.registerComponent(appName, () => AddSala);

console.tron = Reactotron.configure().useReactNative().connect();
