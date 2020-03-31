import moment from 'moment';
import storeconfig from '../../store/storeconfig';
import { Alert } from 'react-native';
import { consts } from '../libraries/Commons';

const store = storeconfig();

export const verificarPortaAbertaDepoisDas22EAntesDas07 = (numeroPorta) => {
  console.log('Verifica');
  var vinteduas = moment('10:00pm', 'h:mma');
  var sete = moment('7:00am', 'h:mma');
  var now = moment(new Date());
  var verificaAntesDasSete = now.isBefore(sete);

  salas = store.getState().sala.salas;

  aberta = consts.aberta;
  console.log(consts.aberta);

  if (salas[numeroPorta][consts.porta] == aberta && verificaAntesDasSete) {
    // this.showLocalNotification('Porta aberta');
    Alert.alert(consts.portaAberta);
  }
};
