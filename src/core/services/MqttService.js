import init from '../libraries/index';
import { Alert } from 'react-native';

init();

class MqttService {
  static local = 'hive';
  static conf_mqtt = {
    mosquitto: {
      url: 'test.mosquitto.org',
      port: 8080,
      username: '',
      password: '',
      path: '/mqtt',
    },
    localhost: {
      url: 'localhost',
      port: 8080,
      username: '',
      password: '',
    },
    ifrn: {
      url: 'localhost',
      port: 8081,
      username: 'ssc_admin',
      password: 'mqtt@123',
    },
    hive: {
      url: 'broker.mqttdashboard.com',
      // url:"broker.hivemq.com",
      port: 8000,
      username: '',
      password: '',
      path: '/mqtt',
    },
  };

  static instance = null;

  static getInstance() {
    if (!MqttService.instance) {
      MqttService.instance = new MqttService();
    }

    return MqttService.instance;
  }

  constructor() {
    console.log(this);

    let clientId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    // this.client = new Paho.MQTT.Client(MqttService.conf_mqtt[MqttService.local].url, MqttService.conf_mqtt[MqttService.local].port, MqttService.conf_mqtt[MqttService.local].path, clientId)
    this.client = new Messaging.Client(
      'broker.mqttdashboard.com',
      8000,
      clientId
    );
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
    if (MqttService.local === 'ifrn' || MqttService.local === 'hive') {
      useSSL = true;
    } else {
      useSSL = false;
    }
    if (this.client && this.client.isConnected) {
      this.client.disconnect();
    }
    this.client.connect({
      timeout: 3,
      onSuccess: () => {
        this.isConnected = true;

        onSuccessHandler();
      },

      // useSSL: false,

      onFailure: this.onFailure,

      // reconnect: true,

      keepAliveInterval: 600,

      cleanSession: false,
      // userName: MqttService.conf_mqtt[MqttService.local].username,
      // password: MqttService.conf_mqtt[MqttService.local].password,
    });
  };

  onFailure = ({ errorMessage }) => {
    console.info('Erro' + errorMessage);
    erro =
      'Erro: ' +
      errorMessage +
      '======' +
      this.client._getHost() +
      '======' +
      'SSL: ' +
      this.client._getPath() +
      'URL: ' +
      this.client._getURI() +
      'Porta: ' +
      this.client._getPort();

    this.isConnected = false;

    Alert.alert(
      'Could not connect to MQTT',
      erro,
      [
        {
          text: 'TRY AGAIN',
          onPress: () =>
            this.connectClient(
              this.onSuccessHandler,
              this.onConnectionLostHandler
            ),
        },
      ],

      {
        cancelable: false,
      }
    );
  };

  onMessageArrived = (message) => {
    // const { payloadString, topic } = message;
    this.callbacks['ssc/sensor/#'](message);
  };

  isConnected = () => {
    return this.client.isConnected;
  };

  publishMessage = (topic, message) => {
    console.log('Publicando: ', topic, message);
    if (!this.isConnected) {
      console.info('not connected');

      return;
    }

    // this.client.publish(topic, message);
    var message = new Messaging.Message(message);
    message.destinationName = topic;
    message.qos = 0;
    message.retained = false;
    this.client.send(message);
  };

  subscribe = (topic, callback) => {
    if (!this.isConnected) {
      console.info('not connected');

      return;
    }
    this.callbacks[topic] = callback;
    this.client.subscribe(topic);
  };

  unsubscribe = (topic) => {
    if (!this.isConnected) {
      console.info('not connected');

      return;
    }

    delete this.callbacks[topic];

    this.client.unsubscribe(topic);
  };
}

export default MqttService.getInstance();
