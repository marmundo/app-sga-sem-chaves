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
            1: {
                porta:"aberta"
            },
            21: {
            },
            22: {
            },
            23: {
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
            const values = Object.values(salas[21])
            console.log(keys);
            console.log(values);
            salas[salaM][sensorM] = valor;
            console.log("Sensor: " + sensorM + ": " + salas[salaM][sensorM])
            return { salas };
        })


    };



    render() {

        let numberOfRooms = Object.keys(this.state.salas)
        let roomsLenght = numberOfRooms.length

        return (
            <SafeAreaView style={{ flex: 1, marginTop: 10, justifyContent:'center',alignItems:'center' }}>
                <ScrollView>
                    {
                        // Generates cards dinamically based on number of rooms
                        roomsLenght > 0 ?
                            Array(roomsLenght).fill().map((_, i) => i).map(i =>
                            <CardView key={i} style={{width:350,margin:20}}>
                                    <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline', marginBottom: 20 }}>
                                        Sala {numberOfRooms[i]}
                                    </Text>
                                    <Sensor nome="Porta" valor={this.state.salas[numberOfRooms[i]].porta}> </Sensor>
                                    <Sensor nome="Temperatura" valor={this.state.salas[numberOfRooms[i]].temperatura}> </Sensor>
                                    <Sensor nome="Presença" valor={this.state.salas[numberOfRooms[i]].presenca}> </Sensor>
                                    <Sensor nome="Humidade" valor={this.state.salas[numberOfRooms[i]].umidade}> </Sensor>
                                    <Sensor nome="Luminosidade" valor={this.state.salas[numberOfRooms[i]].luminosidade}> </Sensor>
                                </CardView>
                            )
                            :
                            <Text></Text>
                    }
                </ScrollView>
            </SafeAreaView>
        )
    }

}
