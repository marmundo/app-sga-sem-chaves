import React, { Component } from "react";
import { Text, ScrollView, SafeAreaView } from "react-native";
import Sensor from "./Sensor"
import { CardView } from 'react-native-simple-card-view'
import { styles } from '../core/common_style';

export default class Sala extends Component {

    render() {
        return (
            <SafeAreaView style={{flex: 1,marginTop: 10}}>
                <ScrollView>
                    <CardView>
                        <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline', marginBottom: 20 }}>
                            Sala 21
                    </Text>
                        <Sensor nome="Porta" valor="Aberta"> </Sensor>
                        <Sensor nome="Temperatura" valor="30"> </Sensor>
                        <Sensor nome="Presença" valor="Verdadeira"> </Sensor>
                        <Sensor nome="Humidade" valor="20%"> </Sensor>
                    </CardView>

                    <CardView>
                        <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline', marginBottom: 20 }}>
                            Sala 22
                    </Text>
                        <Sensor nome="Porta" valor="Aberta"> </Sensor>
                        <Sensor nome="Temperatura" valor="30"> </Sensor>
                        <Sensor nome="Presença" valor="Verdadeira"> </Sensor>
                        <Sensor nome="Humidade" valor="20%"> </Sensor>
                    </CardView>

                    <CardView>
                        <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline', marginBottom: 20 }}>
                            Sala 23
                    </Text>
                        <Sensor nome="Porta" valor="Aberta"> </Sensor>
                        <Sensor nome="Temperatura" valor="30"> </Sensor>
                        <Sensor nome="Presença" valor="Verdadeira"> </Sensor>
                        <Sensor nome="Humidade" valor="20%"> </Sensor>
                    </CardView>

                </ScrollView>
            </SafeAreaView>
        )
    }

}
