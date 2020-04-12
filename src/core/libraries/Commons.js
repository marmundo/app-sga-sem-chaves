import { Dimensions } from 'react-native';

const getLarguradaTela = () => {
  var largura = Math.round(Dimensions.get('window').width);
  return largura;
};

const consts = {
  on: 'ON',
  off: 'OFF',
  aberta: 'Aberta',
  fechada: 'Fechada',
  topic: 'ssc/sensor/#',
  topicRaiz: 'ssc/sensor/',
  porta: 'porta',
  luminosidade: 'luminosidade',
  portaAberta: 'Porta Aberta',
  nomesSensores: {
    porta: 'Porta',
    temperatura: 'Temperatura',
    presenca: 'Presença',
    luminosidade: 'Luminosidade',
    umidade: 'Umidade',
  },
  nomesIcones: {
    porta: 'archway',
    temperatura: 'thermometer-quarter',
    presenca: 'bell',
    luminosidade: 'lightbulb',
    umidade: 'tint',
  },
};

export { getLarguradaTela, consts };
