import { Dimensions } from 'react-native';

const getLarguradaTela = () => {
  var largura = Math.round(Dimensions.get('window').width);
  return largura;
};

const consts = {
  aberta: 'Aberta',
  fechada: 'Fechada',
  topic: 'ssc/sensor/#',
  porta: 'porta',
  topicRaiz: 'ssc/sensor/',
  portaAberta: 'Porta Aberta',
  nomesSensores: {
    porta: 'Porta',
    temperatura: 'Temperatura',
    presenca: 'Presença',
    luminosidade: 'Luminosidade',
    umidade: 'Umidade',
  },
};

export { getLarguradaTela, consts };
