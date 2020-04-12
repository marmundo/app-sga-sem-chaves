import 'react-native-gesture-handler';
import React, { Component } from 'react';
import api from '../core/services/api';
// import { NavigationContainer } from '@react-navigation/native';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

class Login extends Component {
  state = {
    name: 'Temporario',
    username: '',
    password: '',
    error: '',
  };

  login = async () => {
    if (this.state.username.length === 0 || this.state.password.length === 0) {
      this.setState(
        { error: 'Preencha usuário e senha para continuar!' },
        () => false
      );
      Alert.alert('Erro', this.state.error);
    } else {
      try {
        //Codigo de https://github.com/Rocketseat/blog-adonis-reactjs-react-native-airbnb-app/blob/master/src/pages/signIn/index.js
        // const response = await api.post('/', {
        //   username: this.state.username,
        //   password: this.state.password,
        // });
        // const userToken = response.data.token;
        this.props.navigation.navigate('Feed');
      } catch (_err) {
        console.tron.log(_err);
        this.setState({
          error: 'Houve um problema com o login, verifique suas credenciais!',
        });
        Alert.alert('Erro', this.state.error);
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Matricula"
          style={styles.input}
          autoFocus={true}
          keyboardType="number-pad"
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
        />
        <TextInput
          placeholder="Senha"
          style={styles.input}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          onSubmitEditing={this.login}
        />
        <TouchableOpacity onPress={this.login} style={styles.buttom}>
          <Text style={styles.buttomText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttom: {
    marginTop: 30,
    padding: 10,
    backgroundColor: 'green',
  },
  buttomText: {
    fontSize: 20,
    color: '#FFF',
  },
  input: {
    marginTop: 20,
    width: '90%',
    backgroundColor: '#EEE',
    height: 40,
    borderWidth: 1,
    borderColor: '#333',
  },
});

// const mapStateToProps = ({user}) => {
//   return {
//     isLoading: user.isLoading,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onLogin: user => dispatch(login(user)),
//   };
// };

export default Login;
