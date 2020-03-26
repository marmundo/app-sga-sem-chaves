import { Dimensions } from "react-native";

export default getLarguradaTela = () => {
    var largura = Math.round(Dimensions.get('window').width);
    return largura;
}