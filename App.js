import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/Login';
import Feed from './src/screens/Feed';
import Sala from './src/core/components/Sala';

import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{
            title: 'Salas',
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Sala"
          component={Sala}
          options={{
            title: 'Sala',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
