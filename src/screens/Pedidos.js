/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react'
import { Text, StyleSheet, View, ImageBackground, Button, Image } from 'react-native'
import CommonStyles from '../CommonStyles'
import { TouchableOpacity } from 'react-native-gesture-handler'

const initialState = {

}

export default class Auth extends Component {

    render() {
        return (
            <ImageBackground style={styles.backgroung} source={require('../assets/images/BackGround.jpg')}>

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
