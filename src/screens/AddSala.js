import React, { Component } from "react";

import { styles } from '../core/common_style';

import { Text, View, Button, TextInput, StyleSheet } from "react-native";

import MqttService from "../core/services/MqttService"

export default class AddSala extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sala: "",
      topic_temperature: ""
    };
  }

  componentDidMount() {
    // MqttService.connectClient(
    //   this.mqttSuccessHandler,
    //   this.mqttConnectionLostHandler
    // );
  }

  mqttSuccessHandler = () => {

    console.info("connected to mqtt");

    MqttService.subscribe(this.state.topic, this.onTopic);

    this.setState({

      isConnected: true

    });

  };

  render() {
    return (

      <View style={styles.container}>

        {/* {!isConnected && <OfflineNotification />} */}
        <View style={stylesLocal.container}>
          <Text style={styles.welcome}>Qual o número da Sala:</Text>
          <TextInput style={stylesLocal.input}
            placeholder="Sala" onChangeText={(sala) => this.setState(
              { sala, 
                topic_temperature: "ssc/sensor/" + sala + "/temperatura" 
              })
              } value={this.state.sala} />
        </View>
        <View style={stylesLocal.container}>
          <Text>{this.state.topic_temperature}</Text>
          {/* <Text style={styles.welcome}>Temperatura: {this.props.getTemperatura({this.state.sala})}</Text> */}
        </View>

      </View>

    );
  }

}

const stylesLocal = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  input: {
    fontSize: 20,
  }
})