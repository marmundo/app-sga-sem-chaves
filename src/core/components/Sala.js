import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CardView } from 'react-native-simple-card-view';
import Sensor from '../components/Sensor';
import { getLarguradaTela, consts } from '../libraries/Commons';
import MqttService from '../services/MqttService';

export default class Sala extends Component {
  constructor(props) {
    super(props);
    const { params } = props.route;
    const {
      sala,
      porta,
      temperatura,
      presenca,
      umidade,
      luminosidade,
    } = params;
    this.state = {
      sala,
      porta,
      temperatura,
      presenca,
      umidade,
      luminosidade,
    };
  }

  handlePresPorta = async () => {
    porta = consts.porta;
    (await this.state.porta) === consts.aberta
      ? this.setState({ porta: consts.fechada })
      : this.setState({ porta: consts.aberta });
    MqttService.publishMessage(
      consts.topicRaiz + this.state.sala + '/' + porta,
      this.state.porta
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <CardView style={{ width: getLarguradaTela() * 0.9, margin: 20 }}>
          <Text
            style={{
              fontWeight: 'bold',
              textDecorationLine: 'underline',
              marginBottom: 20,
            }}
          >
            Sala {this.state.sala}
          </Text>
          <TouchableOpacity onPress={this.handlePresPorta}>
            <Sensor nome={consts.nomesSensores.porta} valor={this.state.porta}>
              {' '}
            </Sensor>
          </TouchableOpacity>
          <Sensor
            nome={consts.nomesSensores.temperatura}
            valor={this.state.temperatura}
          >
            {' '}
          </Sensor>
          <Sensor
            nome={consts.nomesSensores.presenca}
            valor={this.state.presenca}
          >
            {' '}
          </Sensor>
          <Sensor
            nome={consts.nomesSensores.umidade}
            valor={this.state.umidade}
          >
            {' '}
          </Sensor>
          <Sensor
            nome={consts.nomesSensores.luminosidade}
            valor={this.state.luminosidade}
          >
            {' '}
          </Sensor>
        </CardView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: "center"
  },
});
