import moment from 'moment';
import storeconfig from '../../store/storeconfig';
import { Alert } from 'react-native';
import { consts } from '../libraries/Commons';
import NotifService from '../services/NotifService';

const store = storeconfig();

onNotif = (notif) => {
  // console.log(notif);
  Alert.alert(notif.title, notif.message);
};

showLocalNotification = (message) => {
  this.notif.localNotif(message);
};

export const verificarPortaAbertaDepoisDas22EAntesDas07 = (numeroPorta) => {
  console.log('Verifica');
  var vinteduas = moment('10:00pm', 'h:mma');
  var sete = moment('7:00am', 'h:mma');
  var now = moment(new Date());
  var verificaAntesDasSete = now.isBefore(sete);

  salas = store.getState().sala.salas;

  aberta = consts.aberta;
  console.log(consts.aberta);
  notif = new NotifService(this.onNotif.bind(this));

  if (salas[numeroPorta][consts.porta] == aberta && verificaAntesDasSete) {
    console.log(notif);
    showLocalNotification('PORTA ABERTA');
  }
};
