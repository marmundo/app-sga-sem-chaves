import React, { Component } from "react";

import { Platform, StyleSheet, Text, View, Button } from "react-native";

import MqttService from "./src/core/services/MqttService";

import OfflineNotification from './src/core/components/OfflineNotification';

const instructions = Platform.select({

  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",

  android:

    "Double tap R on your keyboard to reload,\n" +

    "Shake or press menu button for dev menu"

});

type Props = {};

export default class App extends Component<Props> {

  PAHO = "MqttService";
  MQTTJS = "mqtt.js"

  state = {

    isConnected: false,

    message: "",
    topic: "ssc/sensor/21/porta",
    lib: this.PAHO,

  };

  componentDidMount() {

    if (this.state.lib === this.PAHO) {

      MqttService.connectClient(

        this.mqttSuccessHandler,

        this.mqttConnectionLostHandler

      );
    }
    if (this.state.lib == this.MQTTJS) {
      console.log("mqtt.js")
    }

  }

  onTopic = message => {

    this.setState({

      message

    });

  };

  mqttSuccessHandler = () => {

    console.info("connected to mqtt");

    MqttService.subscribe(this.state.topic, this.onTopic);

    this.setState({

      isConnected: true

    });

  };

  mqttConnectionLostHandler = () => {

    this.setState({

      isConnected: false

    });

  };

  onPublish = () => {

    MqttService.publishMessage(this.state.topic, "Porta Aberta");

  }

  render() {

    const { isConnected, message, topic } = this.state;

    return (

      <View style={styles.container}>

        {!isConnected && <OfflineNotification />}

        <Text style={styles.welcome}>Mensagem a receber no topico {topic}: {message}</Text>

        <Button

          onPress={this.onPublish}

          title="Publicar mensagem"

          color="#841584"

        />

      </View>

    );

  }

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#F5FCFF"

  },

  welcome: {

    fontSize: 20,

    textAlign: "center",

    margin: 10

  },

  instructions: {

    textAlign: "center",

    color: "#333333",

    marginBottom: 5

  }

});