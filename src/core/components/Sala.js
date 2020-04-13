import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSala } from '../../store/actions/sala';
import { StyleSheet } from 'react-native';
import Sensor from '../components/Sensor';
import { consts } from '../libraries/Commons';
import MqttService from '../services/MqttService';
import { Container, Content, Card, CardItem, Left } from 'native-base';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

class Sala extends Component {
  constructor(props) {
    super(props);
    const { params } = props.route;
    sala = params.sala;
  }

  setSala = (sala) => {
    this.props.onSetSala(sala);
  };

  handlePressLuz = async () => {
    luminosidade = consts.luminosidade;
    newSala = { ...this.props.salas };
    if (this.props.salas[sala].luminosidade === consts.on) {
      newSala[sala].luminosidade = consts.off;
      await this.setSala(newSala);
    } else {
      newSala[sala].luminosidade = consts.on;
      await this.setSala(newSala);
    }
  };

  handlePresPorta = async () => {
    porta = consts.porta;
    newSala = { ...this.props.salas };
    if (this.props.salas[sala].porta === consts.aberta) {
      newSala[sala].porta = consts.fechada;
      await this.setSala(newSala);
    } else {
      newSala[sala].porta = consts.aberta;
      await this.setSala(newSala);
    }

    MqttService.publishMessage(
      consts.topicRaiz + sala + '/' + porta,
      this.props.salas[sala].porta
    );
  };

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem style={{ marginTop: 15 }}>
              <Left>
                <Sensor
                  label={consts.nomesSensores.porta}
                  sensor={consts.nomesIcones.porta}
                  valor={this.props.salas[sala].porta}
                />
                <Sensor
                  label={consts.nomesSensores.temperatura}
                  sensor={consts.nomesIcones.temperatura}
                  valor={this.props.salas[sala].temperatura}
                />
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Sensor
                  label={consts.nomesSensores.presenca}
                  sensor={consts.nomesIcones.presenca}
                  valor={this.props.salas[sala].presenca}
                />
                <Sensor
                  label={consts.nomesSensores.umidade}
                  sensor={consts.nomesIcones.umidade}
                  valor={this.props.salas[sala].umidade}
                />
              </Left>
            </CardItem>
            <CardItem style={{ justifyContent: 'center' }}>
              <TouchableWithoutFeedback onPress={() => this.handlePressLuz()}>
                <Sensor
                  label={consts.nomesSensores.luminosidade}
                  sensor={consts.nomesIcones.luminosidade}
                  valor={this.props.salas[sala].luminosidade}
                />
              </TouchableWithoutFeedback>
            </CardItem>
          </Card>
        </Content>
      </Container>
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
