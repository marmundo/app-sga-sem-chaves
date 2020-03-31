import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSala } from '../../store/actions/sala';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CardView } from 'react-native-simple-card-view';
import Sensor from '../components/Sensor';
import { getLarguradaTela, consts } from '../libraries/Commons';
import MqttService from '../services/MqttService';

class Sala extends Component {
  constructor(props) {
    super(props);
    const { params } = props.route;
    this.sala = params.sala;
  }

  setSala = (sala) => {
    this.props.onSetSala(sala);
  };

  handlePresPorta = async () => {
    porta = consts.porta;
    newSala = { ...this.props.salas };
    if (this.props.salas[this.sala].porta === consts.aberta) {
      newSala[this.sala].porta = consts.fechada;
      await this.setSala(newSala);
    } else {
      newSala[this.sala].porta = consts.aberta;
      await this.setSala(newSala);
    }

    MqttService.publishMessage(
      consts.topicRaiz + this.sala + '/' + porta,
      this.props.salas[this.sala].porta
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
            Sala {this.sala}
          </Text>
          <TouchableOpacity onPress={this.handlePresPorta}>
            <Sensor
              nome={consts.nomesSensores.porta}
              valor={this.props.salas[this.sala].porta}
            >
              {' '}
            </Sensor>
          </TouchableOpacity>
          <Sensor
            nome={consts.nomesSensores.temperatura}
            valor={this.props.salas[this.sala].temperatura}
          >
            {' '}
          </Sensor>
          <Sensor
            nome={consts.nomesSensores.presenca}
            valor={this.props.salas[this.sala].presenca}
          >
            {' '}
          </Sensor>
          <Sensor
            nome={consts.nomesSensores.umidade}
            valor={this.props.salas[this.sala].umidade}
          >
            {' '}
          </Sensor>
          <Sensor
            nome={consts.nomesSensores.luminosidade}
            valor={this.props.salas[this.sala].luminosidade}
          >
            {' '}
          </Sensor>
        </CardView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetSala: (sala) => dispatch(setSala(sala)),
  };
};

const mapStateToProps = ({ sala }) => {
  return {
    salas: sala.salas,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sala);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: "center"
  },
});
