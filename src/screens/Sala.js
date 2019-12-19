import React, { Component } from "react";
import { Text, ScrollView, SafeAreaView } from "react-native";
import Sensor from "./Sensor"
import { CardView } from 'react-native-simple-card-view'
import { styles } from '../core/common_style';
import MqttService from "../core/services/MqttService";

export default class Sala extends Component {


    state = {
        isConnected: false,
        topic: "ssc/sensor/#",
        salas: {
            21: {
            }
        },
    };



    componentDidMount() {
        MqttService.connectClient(
            this.mqttSuccessHandler,
            this.mqttConnectionLostHandler
        );
    }

    mqttConnectionLostHandler = () => {

        this.setState({

            isConnected: false

        });

    };


    mqttSuccessHandler = () => {

        console.info("connected to mqtt");

        MqttService.subscribe(this.state.topic, this.onTopic);

        this.setState({

            isConnected: true

        });

    };

    onTopic = message => {
        const { payloadString, topic } = message;


        topicoArray = topic.split("/")
        salaM = topicoArray[2]
        sensorM = topicoArray[3]
        valor = payloadString

   
        this.setState(prevState => {
            let salas = Object.assign({}, prevState.salas);
            const keys = Object.keys(salas[21]);
            const values=Object.values(salas[21])
            console.log(keys);
            console.log(values);
            salas[salaM][sensorM] = valor;
            console.log("Sensor: "+sensorM+": "+salas[salaM][sensorM])
            return { salas }; 
        })


    };



    render() {
        return (
            <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
                <ScrollView>
                    <CardView>
                        <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline', marginBottom: 20 }}>
                            Sala 21
                    </Text>
                        <Sensor nome="Porta" valor={this.state.salas[21].porta}> </Sensor>
                        <Sensor nome="Temperatura" valor={this.state.salas[21].temperatura}> </Sensor>
                        <Sensor nome="Presença" valor={this.state.salas[21].presenca}> </Sensor>
                        <Sensor nome="Humidade" valor={this.state.salas[21].umidade}> </Sensor>
                        <Sensor nome="Luminosidade" valor={this.state.salas[21].luminosidade}> </Sensor>
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
