import { Dimensions } from "react-native";

const getLarguradaTela = () => {
    var largura = Math.round(Dimensions.get('window').width);
    return largura;
}

const consts={
    aberta:"Aberta",
    fechada:"Fechada"
}

export {getLarguradaTela, consts}