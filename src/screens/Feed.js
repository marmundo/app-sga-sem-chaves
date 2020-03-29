import React, { Component } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { CardView } from 'react-native-simple-card-view';
import MqttService from '../core/services/MqttService';
import NotifService from '../core/services/NotifService';
import appConfig from './app.json';
import Sensor from '../core/components/Sensor';
import moment from 'moment';
import { getLarguradaTela, consts } from '../core/libraries/Commons';

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      senderId: appConfig.senderID,
      isConnected: false,
      topic: consts.topic,
      salas: {
        1: {
          porta: 'Aberta',
        },
        21: {},
        22: {},
        23: {},
      },
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
    console.log(token);
    this.setState({ registerToken: token.token, gcmRegistered: true });
  }

  onNotif(notif) {
    console.log(notif);
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
    if (this.state.salas[numeroPorta].porta == 'aberta' && verificaHora) {
      this.showLocalNotification('Porta aberta');
    }
  }

  componentDidMount() {
    (numberOfRooms = Object.keys(this.state.salas)),
      (roomsLenght = numberOfRooms.length);
    this.setState({ numberOfRooms });
    this.setState({ roomsLenght });

    //Se a porta aberta quando recebe
    this.verificarPortaAbertaDepoisDas22EAntesDas07(1);

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
    Alert.alert('connected to mqtt');

    MqttService.subscribe(this.state.topic, this.onTopic);

    this.setState({
      isConnected: true,
    });
  };

  onTopic = (message) => {
    payloadString = message._getPayloadString();
    topic = message._getDestinationName();

    // const {payloadString, topic} = message;

    topicoArray = topic.split('/');

    salaM = topicoArray[2];
    sensorM = topicoArray[3];
    valor = payloadString;

    this.setState((prevState) => {
      let salas = Object.assign({}, prevState.salas);
      if (salas[salaM] == undefined) {
        sensor_valor = {};
        sensor_valor[sensorM] = valor;
        salas[salaM] = sensor_valor;
      }
      salas[salaM][sensorM] = valor;
      this.showLocalNotification(`Sala ${salaM}== ${salas[salaM][sensorM]}`);
      return { salas };
    });
  };

  navigatetoSala = (i) => {
    params = {
      sala: this.state.numberOfRooms[i],
      porta: this.state.salas[this.state.numberOfRooms[i]].porta,
      temperatura: this.state.salas[this.state.numberOfRooms[i]].temperatura,
      presenca: this.state.salas[this.state.numberOfRooms[i]].presenca,
      //TODO: Mudar nome da variavel
      umidade: this.state.salas[this.state.numberOfRooms[i]].umidade,
      luminosidade: this.state.salas[this.state.numberOfRooms[i]].luminosidade,
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
                    valor={this.state.salas[this.state.numberOfRooms[i]].porta}
                  >
                    {' '}
                  </Sensor>
                  <Sensor
                    nome={consts.nomesSensores.temperatura}
                    valor={
                      this.state.salas[this.state.numberOfRooms[i]].temperatura
                    }
                  >
                    {' '}
                  </Sensor>
                  <Sensor
                    nome={consts.nomesSensores.presenca}
                    valor={
                      this.state.salas[this.state.numberOfRooms[i]].presenca
                    }
                  >
                    {' '}
                  </Sensor>
                  <Sensor
                    nome={consts.nomesSensores.umidade}
                    valor={
                      this.state.salas[this.state.numberOfRooms[i]].umidade
                    }
                  >
                    {' '}
                  </Sensor>
                  <Sensor
                    nome={consts.nomesSensores.luminosidade}
                    valor={
                      this.state.salas[this.state.numberOfRooms[i]].luminosidade
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
