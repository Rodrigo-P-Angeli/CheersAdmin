/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import CommonStyles from '../CommonStyles'

export default class App extends Component {
    render() {
        return (
            <ImageBackground style={styles.container} source={require('../assets/images/BackGroundHeader.jpg')}>
                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={styles.buttonBars}>
                    <Icon name={'bars'} size={30} color={CommonStyles.Colors.Title} />
                </TouchableOpacity>
                <Text style={styles.title}>Cheers</Text>
                <TouchableOpacity disabled={true} style={styles.buttonBars}>
                    <Icon name={'bars'} size={30} color={'rgba(0,0,0,0)'} />
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        flexDirection: 'row',
        resizeMode: 'contain',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: CommonStyles.fontFamilyTitle,
        fontSize: 50,
        alignSelf: 'center',
        color: CommonStyles.Colors.Title,
    },
    buttonBars: {
        alignSelf: 'center',
        padding: 10,
    },
})
