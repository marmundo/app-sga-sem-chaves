import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSala } from '../store/actions/sala';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import MqttService from '../core/services/MqttService';
import NotifService from '../core/services/NotifService';
import appConfig from './app.json';
import Sensor from '../core/components/Sensor';
import moment from 'moment';
import { getLarguradaTela, consts } from '../core/libraries/Commons';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      senderId: appConfig.senderID,
      isConnected: false,
      topic: consts.topic,
      // salas: {
      //   1: {
      //     porta: 'Aberta',
      //   },
      //   21: {},
      //   22: {},
      //   23: {},
      // },
      numberOfRooms: '',
      roomsLenght: 0,
    };

    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this)
    );
    this.navigatetoSala = this.navigatetoSala.bind(this);
  }

  onRegister(token) {
    Alert.alert('Registered !', JSON.stringify(token));
    // console.log(token);
    this.setState({ registerToken: token.token, gcmRegistered: true });
  }

  onNotif(notif) {
    // console.log(notif);
    Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    Alert.alert('Permissions', JSON.stringify(perms));
  }

  showLocalNotification(message) {
    this.notif.localNotif(message);
  }

  verificarPortaAbertaDepoisDas22EAntesDas07(numeroPorta) {
    var vinteduas = moment('10:00pm', 'h:mma');
    var sete = moment('7:00am', 'h:mma');
    var now = moment(new Date());
    var verificaAntesDasSete = now.isBefore(sete);
    var verificaDepoisVinteDuas = now.isAfter(vinteduas);
    var verificaHora = verificaAntesDasSete && verificaDepoisVinteDuas;
    if (this.props.salas[numeroPorta].porta == 'aberta' && verificaHora) {
      this.showLocalNotification('Porta aberta');
    }
  }

  componentDidMount() {
    numberOfRooms = Object.keys(this.props.salas);
    roomsLenght = numberOfRooms.length;
    this.setState({ numberOfRooms });
    this.setState({ roomsLenght });

    //Se a porta aberta quando recebe
    // this.verificarPortaAbertaDepoisDas22EAntesDas07('1');

    if (!MqttService.isConnected) {
      MqttService.connectClient(
        this.mqttSuccessHandler,
        this.mqttConnectionLostHandler
      );
    }
  }

  mqttConnectionLostHandler = () => {
    this.setState({
      isConnected: false,
    });
    // Alert.alert('Conexao perdida');
    if (!MqttService.isConnected) {
      MqttService.connectClient(
        this.mqttSuccessHandler,
        this.mqttConnectionLostHandler
      );
    }
  };

  mqttSuccessHandler = () => {
    console.info('connected to mqtt');
    Alert.alert('Conectado ao Servidor');

    MqttService.subscribe(this.state.topic, this.onTopic);

    this.setState({
      isConnected: true,
    });
  };

  onTopic = (message) => {
    payloadString = message._getPayloadString();
    topic = message._getDestinationName();

    topicoArray = topic.split('/');

    salaM = topicoArray[2];
    sensorM = topicoArray[3];
    valor = payloadString;

    newSala = { ...this.props.salas };
    newSala[salaM][sensorM] = valor;
    this.setSala(newSala);

    this.showLocalNotification(
      `Sala ${salaM}\n\n ${sensorM.toUpperCase()} ${newSala[salaM][sensorM]}`
    );
  };

  setSala = (sala) => {
    this.props.onSetSala(sala);
  };

  navigatetoSala = (i) => {
    params = {
      sala: this.state.numberOfRooms[i],
    };
    this.props.navigation.navigate('Sala', params);
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ScrollView>
          {// Generates cards dinamically based on number of rooms
          this.state.roomsLenght > 0 ? (
            Array(this.state.roomsLenght)
              .fill()
              .map((_, i) => i)
              .map((i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => this.navigatetoSala(i)}
                  style={{ width: getLarguradaTela() * 0.9, margin: 20 }}
                >
                  <Text
                    style={{
                      fontWeight: 'bold',
                      textDecorationLine: 'underline',
                      marginBottom: 20,
                    }}
                  >
                    Sala {this.state.numberOfRooms[i]}
                  </Text>
                  <Sensor
                    nome={consts.nomesSensores.porta}
                    valor={this.props.salas[this.state.numberOfRooms[i]].porta}
                  >
                    {' '}
                  </Sensor>
                  <Sensor
                    nome={consts.nomesSensores.temperatura}
                    valor={
                      this.props.salas[this.state.numberOfRooms[i]].temperatura
                    }
                  >
                    {' '}
                  </Sensor>
                  <Sensor
                    nome={consts.nomesSensores.presenca}
                    valor={
                      this.props.salas[this.state.numberOfRooms[i]].presenca
                    }
                  >
                    {' '}
                  </Sensor>
                  <Sensor
                    nome={consts.nomesSensores.umidade}
                    valor={
                      this.props.salas[this.state.numberOfRooms[i]].umidade
                    }
                  >
                    {' '}
                  </Sensor>
                  <Sensor
                    nome={consts.nomesSensores.luminosidade}
                    valor={
                      this.props.salas[this.state.numberOfRooms[i]].luminosidade
                    }
                  >
                    {' '}
                  </Sensor>
                </TouchableOpacity>
              ))
          ) : (
            <Text></Text>
          )}
        </ScrollView>
      </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Feed);

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5,
    padding: 5,
    width: '70%',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
});
