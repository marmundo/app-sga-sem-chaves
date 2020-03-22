import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { login } from '../store/actions/user'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native'

class Login extends Component {
    state = {
        name: 'Temporario',
        email: '',
        password: '',
        error:'',
    }

    componentDidUpdate = prevProps => {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.props.navigation.navigate('Profile')
        }
    }

    login = async () => {
        if (this.state.email.length === 0 || this.state.password.length === 0) {
            this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
          } else {
            //   Codigo de https://github.com/Rocketseat/blog-adonis-reactjs-react-native-airbnb-app/blob/master/src/pages/signIn/index.js
        //     try {
        //       const response = await api.post('/sessions', {
        //         email: this.state.email,
        //         password: this.state.password,
        //       });
      
        //       await AsyncStorage.setItem('@AirBnbApp:token', response.data.token);
      
        //       const resetAction = StackActions.reset({
        //         index: 0,
        //         actions: [
        //           NavigationActions.navigate({ routeName: 'Main' }),
        //         ],
        //       });
        //       this.props.navigation.dispatch(resetAction);
        //     } catch (_err) {
        //     //   console.tron.log(_err);
        //     console.log(_err)
        //       this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
        //     }
          }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder='Email' style={styles.input}
                    autoFocus={true} keyboardType='email-address'
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })} />
                <TextInput placeholder='Senha' style={styles.input}
                    secureTextEntry={true} value={this.state.password}
                    onChangeText={password => this.setState({ password })} />
                <TouchableOpacity onPress={this.login} style={styles.buttom}>
                    <Text style={styles.buttomText}>Login</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('Register')
                }} style={styles.buttom}>
                    <Text style={styles.buttomText}>Criar nova conta...</Text>
                </TouchableOpacity> */}
            </View>
        )
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
        backgroundColor: 'green'
    },
    buttomText: {
        fontSize: 20,
        color: '#FFF'
    },
    input: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#EEE',
        height: 40,
        borderWidth: 1,
        borderColor: '#333',
    }
})

const mapStateToProps = ({ user }) => {
    return {
        isLoading: user.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch(login(user))
    }
}

export default Login
// export default connect(mapStateToProps, mapDispatchToProps)(Login)
