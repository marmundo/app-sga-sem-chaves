import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/Login';
import Feed from './src/screens/Feed';
import Sala from './src/core/components/Sala';

const Stack = createStackNavigator();

function App() {
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
