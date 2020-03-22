import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/Login'
import Sala from './src/screens/Sala'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Sala" component={Sala} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
// import React, { Component } from "react";

// import { Platform, Text, View, Button } from "react-native";

// import MqttService from "./src/core/services/MqttService";

// import OfflineNotification from './src/core/components/OfflineNotification';

// import {styles} from './src/core/common_style';

// const instructions = Platform.select({

//   ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",

//   android:

//     "Double tap R on your keyboard to reload,\n" +

//     "Shake or press menu button for dev menu"

// });

// export default class App extends Component {

//   PAHO = "MqttService";
//   MQTTJS = "mqtt.js"

//   state = {

//     isConnected: false,

//     message: "",
//     topic: "ssc/sensor/22/porta",
//     lib: this.PAHO,

//   };

//   componentDidMount() {

//     if (this.state.lib === this.PAHO) {

//       MqttService.connectClient(

//         this.mqttSuccessHandler,

//         this.mqttConnectionLostHandler

//       );
//     }
//     if (this.state.lib == this.MQTTJS) {
//       console.log("mqtt.js")
//     }

//   }

//   onTopic = message => {

//     this.setState({

//       message

//     });

//   };

//   mqttSuccessHandler = () => {

//     console.info("connected to mqtt");

//     MqttService.subscribe(this.state.topic, this.onTopic);

//     this.setState({

//       isConnected: true

//     });

//   };

//   mqttConnectionLostHandler = () => {

//     this.setState({

//       isConnected: false

//     });

//   };

//   onPublish = () => {

//     MqttService.publishMessage(this.state.topic, "que gostoso");

//   }

//   render() {

//     const { isConnected, message, topic } = this.state;

//     return (

//       <View style={styles.container}>

//         {!isConnected && <OfflineNotification />}

//         <Text style={styles.welcome}>Mensagem a receber no topico {topic}: {message}</Text>

//         <Button

//           onPress={this.onPublish}

//           title="Publicar mensagem"

//           color="#841584"

//         />

//       </View>

//     );

//   }

// }