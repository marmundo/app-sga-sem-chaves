import React from "react";
import { StyleSheet, Text } from "react-native";
import { CardView } from 'react-native-simple-card-view';
import Sensor from "../components/Sensor";
import getLarguradaTela from "../libraries/Commons"



const Sala = (props) => {
    const { params } = props.route;
    const {sala,porta,temperatura,presenca,umidade,luminosidade} = params;
    return (
        <CardView style={{ width: getLarguradaTela() * 0.9, margin: 20 }}>
            <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline', marginBottom: 20 }}>
                Sala {sala}
                {/* Sala 1 */}
            </Text>
            <Sensor nome="Porta" valor={porta}> </Sensor>
            <Sensor nome="Temperatura" valor={temperatura}> </Sensor>
            <Sensor nome="Presença" valor={presenca}> </Sensor>
            <Sensor nome="Humidade" valor={umidade}> </Sensor>
            <Sensor nome="Luminosidade" valor={luminosidade}> </Sensor>
        </CardView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default Sala;