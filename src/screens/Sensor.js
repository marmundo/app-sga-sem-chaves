import React from "react";
import { Text, StyleSheet, View } from 'react-native';
import { styles } from "../core/common_style";

const Sensor = (props) => (
    <View style={[
        styles.containerRow,stylesLocal.container] }>
        <Text style={stylesLocal.sensor}>{props.nome}</Text>
        <Text style={stylesLocal.sensor}>{props.valor}</Text>
    </View >
);

export default Sensor;

const stylesLocal = StyleSheet.create({
    sensor: {
        margin: 10,
    },
    container:{
        backgroundColor:'lightgrey',
        justifyContent:'flex-start',
        // alignContent:'center',  
    }
})