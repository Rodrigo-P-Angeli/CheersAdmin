/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react'
import { Text, StyleSheet, View, ImageBackground, Button, Image } from 'react-native'
import AuthInput from '../components/AuthInput'
import CommonStyles from '../CommonStyles'
import { TouchableOpacity } from 'react-native-gesture-handler'

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: false,
    secureTextSenha: true,
    secureTextConfirmSenha: true,
}

export default class Auth extends Component {

    state = { ...initialState }

    render() {
        const validation = []
        validation.push(this.state.email && this.state.email.includes('@'))
        validation.push(this.state.password && this.state.password.length >= 6)

        if (this.state.stageNew) {
            validation.push(this.state.name && this.state.name.length >= 3)
            validation.push(this.state.confirmPassword === this.state.password)
        }

        const validForm = validation.reduce((a, d) => a && d)
        return (
            <ImageBackground style={styles.backgroung} source={require('../../assets/images/BackGround.jpg')}>
                <Text style={styles.title}>Cheers</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subTitle}>{this.state.stageNew ? 'Crie a sua conta' : 'Entrar com E-mail'}</Text>
                    {this.state.stageNew &&
                        <AuthInput icon={'user'} placeholder={'Nome'} value={this.state.name} style={styles.input} onChangeText={name => this.setState({ name })} />}
                    <AuthInput icon={'at'} placeholder={'Email'} value={this.state.email} style={styles.input} onChangeText={email => this.setState({ email })} />
                    <AuthInput icon={'lock'} secureTextEntry={this.state.secureTextSenha} placeholder={'Senha'} value={this.state.password} style={styles.input} onChangeText={password => this.setState({ password })} />
                    {this.state.stageNew &&
                        <AuthInput icon={'asterisk'} secureTextEntry={this.state.secureTextConfirmSenha} placeholder={'Confirmar Senha'} value={this.state.confirmPassword} style={styles.input} onChangeText={confirmPassword => this.setState({ confirmPassword })} />}
                    <TouchableOpacity disabled={!validForm} onPress={() => this.state.stageNew ? this.props.createUser(this.state.name, this.state.email, this.state.password) : this.props.loginUser(this.state.email, this.state.password)}>
                        <View style={{ height: 10 }} />
                        <View style={[styles.buttonContainer, styles.loginButton, validForm ? [] : { backgroundColor: '#AAA' }]}>
                            <Text style={styles.buttonText}>{this.state.stageNew ? 'Registrar' : 'Entrar'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ padding: 10 }} onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                    <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Fazer Login' : 'Criar conta'}
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroung: {
        flex: 1,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',

    },
    title: {
        fontFamily: CommonStyles.fontFamilyTitle,
        color: CommonStyles.Colors.secundary,
        fontSize: 70,
        marginBottom: 10,
    },
    subTitle: {
        color: 'white',
        fontFamily: CommonStyles.fontFamily,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    input: {
        marginTop: 10,
        backgroundColor: 'white',
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        paddingTop: 20,
        paddingRight: 20,
        paddingLeft: 20,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: CommonStyles.fontFamily,
        color: 'white',
        fontSize: 20,
    },
    loginButton: {
        backgroundColor: CommonStyles.Colors.logginButton,
        fontFamily: CommonStyles.fontFamily,
    },
    loginButtonText: {
        fontFamily: CommonStyles.fontFamily,
        color: 'white',
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 10,
        width: 250,
        borderRadius: 5,
        padding: 10,
    },
    fabookButton: {
        backgroundColor: "#3b5998",
    },
    loginText: {
        color: 'white',
        fontFamily: CommonStyles.fontFamily,
        flex: 9,
        paddingLeft: 15,
    },
    icon: {
        width: 30,
        height: 30,
        flex: 2,
        resizeMode: 'contain'
    },
    socialButtonContent: {
        flexDirection: 'row',
        //justifyContent: 'flex-end',
        //alignContent: 'flex-start',
        alignItems: 'center',
    },
    googleButton: {
        backgroundColor: "#ff0000",
    },
})
