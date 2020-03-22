import React, { Component } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { CardView } from 'react-native-simple-card-view';
import MqttService from "../core/services/MqttService";
import NotifService from '../core/services/NotifService';
import appConfig from './app.json';
import Sensor from "./Sensor";
import moment from "moment";

export default class Sala extends Component {

    constructor(props) {
        super(props);
        this.state = {
            senderId: appConfig.senderID,
            isConnected: false,
            topic: "ssc/sensor/#",
            salas: {
                1: {
                    porta: "aberta"
                },
                21: {
                },
                22: {
                },
                23: {
                }
            },
        };

        this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
    }

    onRegister(token) {
        Alert.alert("Registered !", JSON.stringify(token));
        console.log(token);
        this.setState({ registerToken: token.token, gcmRegistered: true });
    }

    onNotif(notif) {
        console.log(notif);
        Alert.alert(notif.title, notif.message);
    }

    handlePerm(perms) {
        Alert.alert("Permissions", JSON.stringify(perms));
    }


    showLocalNotification(message) {
        this.notif.localNotif(message);
    }

    verificarPortaAbertaDepoisDas22EAntesDas07(numeroPorta) {
        var vinteduas = moment('10:00pm', 'h:mma');
        var sete = moment('7:00am', 'h:mma');
        var now= moment(new Date())
        var verificaAntesDasSete=now.isBefore(sete)
        var verificaDepoisVinteDuas=now.isAfter(vinteduas)
        var verificaHora= verificaAntesDasSete && verificaDepoisVinteDuas
        if (this.state.salas[numeroPorta].porta == "aberta" && verificaHora) {
            this.showLocalNotification("Porta aberta")
        }
    }
    componentDidMount() {
        //Se a porta aberta quando recebe
        this.verificarPortaAbertaDepoisDas22EAntesDas07(1);

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
            notify("SGA Sem Chaves", "Sensor: " + sensorM + ": " + salas[salaM][sensorM])
            return { salas };
        })


    };



    render() {

        let numberOfRooms = Object.keys(this.state.salas)
        let roomsLenght = numberOfRooms.length

        return (
            <SafeAreaView style={{ flex: 1, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                <ScrollView>
                    {
                        // Generates cards dinamically based on number of rooms
                        roomsLenght > 0 ?
                            Array(roomsLenght).fill().map((_, i) => i).map(i =>
                                <CardView key={i} style={{ width: 350, margin: 20 }}>
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
const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: "#000000",
        margin: 5,
        padding: 5,
        width: "70%",
        backgroundColor: "#DDDDDD",
        borderRadius: 5,
    },
})