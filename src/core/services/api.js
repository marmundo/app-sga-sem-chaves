import axios from 'axios';

/* Endereços para cada emulador/simulador:
 ** Genymotion:              http://10.0.3.2:3333/
 ** Emulador Android Studio: http://10.0.2.2:3333/
 ** Simulador IOS:           http://localhost:3333/
 ** ifrn https://suap.ifrn.edu.br/api/v2/autenticacao/token/
 */
const api = axios.create({
  baseURL: 'https://suap.ifrn.edu.br/api/v2/autenticacao/token/',
});

export default api;
