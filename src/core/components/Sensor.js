import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Icon } from 'native-base';
import { consts } from '../libraries/Commons';

class Sensor extends Component {
  getStyle = () => {
    switch (this.props.label) {
      case consts.nomesSensores.luminosidade:
        if (this.props.valor === consts.on) {
          return { color: 'goldenrod' };
        } else {
          return { color: 'black' };
        }
      case consts.nomesSensores.presenca:
        console.log(this.props.valor);
        if (this.props.valor === consts.on) {
          return { color: 'red' };
        } else {
          return { color: 'black' };
        }
      // case consts.nomesSensores.umidade:
      //   return { color: 'blue' };
      // case consts.nomesSensores.temperatura:
      //   return { color: 'red' };
      default:
        break;
    }
  };
  render() {
    return (
      <View style={stylesLocal.container}>
        <Icon
          style={[stylesLocal.sensor, this.getStyle()]}
          type="FontAwesome5"
          name={this.props.sensor}
        />
        <Text style={stylesLocal.text}>{this.props.label}</Text>
        <Text style={[stylesLocal.text, stylesLocal.bold]}>
          {this.props.valor}
        </Text>
      </View>
    );
  }
}

export default Sensor;

const stylesLocal = StyleSheet.create({
  sensor: {
    marginBottom: 15,
    fontSize: 50,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
