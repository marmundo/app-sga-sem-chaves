import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { styles } from '../common_style';

const Sensor = (props) => (
  <View style={[styles.containerRow, stylesLocal.container]}>
    <Text style={stylesLocal.sensor}>{props.nome}</Text>
    <Text style={(stylesLocal.sensor, stylesLocal.bold)}>{props.valor}</Text>
  </View>
);

export default Sensor;

const stylesLocal = StyleSheet.create({
  sensor: {
    margin: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: 'lightgrey',
    justifyContent: 'space-around',
    // alignContent:'center',
  },
});
