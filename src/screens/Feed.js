import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSala } from '../store/actions/sala';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  // Text
  TouchableOpacity,
} from 'react-native';
import MqttService from '../core/services/MqttService';
import NotifService from '../core/services/NotifService';
import appConfig from './app.json';
import SalaFeed from '../core/components/SalaFeed';

import { consts } from '../core/libraries/Commons';
import { verificarPortaAbertaDepoisDas22EAntesDas07 } from '../core/services/Verifica';

import { Container, Content, Text } from 'native-base';
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      senderId: appConfig.senderID,
      isConnected: false,
      topic: consts.topic,
      numberOfRooms: '',
      roomsLenght: 0,
    };

    this.notif = new NotifService(this.onNotif.bind(this));
    this.navigatetoSala = this.navigatetoSala.bind(this);
  }

  navigatetoSala = (i) => {
    console.log('Sala apertada:' + i);
    console.log('Sala ' + i);
    params = {
      sala: i,
      nomeSala: 'Sala ' + i,
    };
    this.props.navigation.navigate('Sala', params);
  };

  onNotif(notif) {
    // console.log(notif);
    Alert.alert(notif.title, notif.message);
  }

  // handlePerm(perms) {
  //   Alert.alert('Permissions', JSON.stringify(perms));
  // }

  showLocalNotification(message) {
    this.notif.localNotif(message);
  }

  componentDidMount() {
    numberOfRooms = Object.keys(this.props.salas);
    console.log('Numero de salas ' + numberOfRooms);
    roomsLenght = numberOfRooms.length;
    this.setState({ numberOfRooms });
    this.setState({ roomsLenght });

    //Se a porta aberta quando recebe
    verificarPortaAbertaDepoisDas22EAntesDas07('1');

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

  render() {
    return (
      <ScrollView>
        <Container>
          <Content>
            {
              // Generates cards dinamically based on number of rooms
              this.state.roomsLenght > 0 ? (
                Array(this.state.roomsLenght)
                  .fill()
                  .map((_, i) => i)
                  .map((i) => (
                    <SalaFeed
                      onPress={this.navigatetoSala}
                      key={i}
                      sala={this.state.numberOfRooms[i]}
                      // style={{ width: getLarguradaTela() * 0.9, margin: 20 }}
                    />
                  ))
              ) : (
                <Text></Text>
              )
            }
          </Content>
        </Container>
      </ScrollView>
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

// const styles = StyleSheet.create({
//   button: {
//     borderWidth: 1,
//     borderColor: '#000000',
//     margin: 5,
//     padding: 5,
//     width: '70%',
//     backgroundColor: '#DDDDDD',
//     borderRadius: 5,
//   },
// });
