// /**
//  * @format
//  */

import { AppRegistry } from 'react-native';
import App from './App';
// import AddSala from './src/screens/AddSala'
// import Sala from './src/screens/Sala'
// import Login from './src/screens/Login'
// import Notification from './src/screens/Notification'
import { name as appName } from './app.json';
import Reactotron from 'reactotron-react-native';

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => AddSala);
// AppRegistry.registerComponent(appName, () => Sala);
// AppRegistry.registerComponent(appName, () => Login);
// AppRegistry.registerComponent(appName, () => Notification);

console.tron = Reactotron.configure().useReactNative().connect();

// import './src/config/ReactotronConfig';
// import React from 'react';

// import Routes from './src/routes';

// const App = () => <Routes />;

// export default App;

// import * as React from 'react';
// import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;
