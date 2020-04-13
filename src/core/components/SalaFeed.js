import React, { Component } from 'react';
import { connect } from 'react-redux';

import { consts } from '../libraries/Commons';
import Sensor from '../components/Sensor';

import { Card, CardItem, Text, Left, Body } from 'native-base';
import { TouchableOpacity } from 'react-native';

class SalaFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfRooms: Object.keys(this.props.salas),
      roomsLenght: 0,
    };
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress(this.props.sala)}>
        <Card>
          <CardItem>
            <Body>
              <Text style={{ fontSize: 20 }}>Sala {this.props.sala}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Sensor
                label={consts.nomesSensores.porta}
                sensor={consts.nomesIcones.porta}
                valor={this.props.salas[this.props.sala].porta}
              />
              <Sensor
                label={consts.nomesSensores.temperatura}
                sensor={consts.nomesIcones.temperatura}
                valor={this.props.salas[this.props.sala].temperatura}
              />
            </Left>
          </CardItem>
          <CardItem>
            <Left>
              <Sensor
                label={consts.nomesSensores.presenca}
                sensor={consts.nomesIcones.presenca}
                valor={this.props.salas[this.props.sala].presenca}
              />
              <Sensor
                label={consts.nomesSensores.umidade}
                sensor={consts.nomesIcones.umidade}
                valor={this.props.salas[this.props.sala].umidade}
              />
            </Left>
          </CardItem>
          <CardItem>
            <Sensor
              label={consts.nomesSensores.luminosidade}
              sensor={consts.nomesIcones.luminosidade}
              valor={this.props.salas[this.props.sala].luminosidade}
            />
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = ({ sala }) => {
  return {
    salas: sala.salas,
  };
};

export default connect(mapStateToProps, null)(SalaFeed);
