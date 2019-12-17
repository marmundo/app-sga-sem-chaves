import { Alert } from 'react-native';

import init from '../libraries/index';

init();



class MqttService {

    static local = "localhost"
    static conf_mqtt = {
        mosquitto: {
            url: "test.mosquitto.org",
            port: 8080,
            username: "",
            password: ""
        },
        localhost: {
            url: "localhost",
            port: 9001,
            username: "",
            password: ""
        },
        ifrn: {
            url: "10.225.0.5",
            port: 8081,
            username: "ssc_admin",
            password: "mqtt@123"
        },
    }

    static instance = null;

    static getInstance() {

        if (!MqttService.instance) {

            MqttService.instance = new MqttService();

        }

        return MqttService.instance;

    }

    constructor() {

        console.log(this)

        
        let clientId = 'mdm';

        this.client = new Paho.MQTT.Client(MqttService.conf_mqtt[MqttService.local].url, MqttService.conf_mqtt[MqttService.local].port, clientId)

        this.client.onMessageArrived = this.onMessageArrived;

        this.callbacks = {};

        this.onSuccessHandler = undefined;

        this.onConnectionLostHandler = undefined;

        this.isConnected = false;

    }

    connectClient = (onSuccessHandler, onConnectionLostHandler) => {

        this.onSuccessHandler = onSuccessHandler;

        this.onConnectionLostHandler = onConnectionLostHandler;

        this.client.onConnectionLost = () => {

            this.isConnected = false;

            onConnectionLostHandler();

        };

        this.client.connect({

            

            timeout: 10,

            onSuccess: () => {

                this.isConnected = true;

                onSuccessHandler();

            },

            useSSL: false,

            onFailure: this.onFailure,

            reconnect: true,

            keepAliveInterval: 20,

            cleanSession: true,
            userName: MqttService.conf_mqtt[MqttService.local].username,
            password: MqttService.conf_mqtt[MqttService.local].password,


        });

    };

    onFailure = ({ errorMessage }) => {

        console.info(errorMessage);

        this.isConnected = false;

        Alert.alert(
            '',
            'Could not connect to MQTT',

            [{ text: 'TRY AGAIN', onPress: () => this.connectClient(this.onSuccessHandler, this.onConnectionLostHandler) }],

            {

                cancelable: false,

            },

        );

    };

    onMessageArrived = message => {

        const { payloadString, topic } = message;

        this.callbacks[topic](payloadString);

    };

    publishMessage = (topic, message) => {

        if (!this.isConnected) {

            console.info('not connected');

            return;

        }

        this.client.publish(topic, message);

    };

    subscribe = (topic, callback) => {

        if (!this.isConnected) {

            console.info('not connected');

            return;

        }

        this.callbacks[topic] = callback;

        this.client.subscribe(topic);

    };

    unsubscribe = topic => {

        if (!this.isConnected) {

            console.info('not connected');

            return;

        }

        delete this.callbacks[topic];

        this.client.unsubscribe(topic);

    };

}

export default MqttService.getInstance();