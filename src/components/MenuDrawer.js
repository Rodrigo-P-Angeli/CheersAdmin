/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Button } from 'react-native'
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer'

import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';


import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommonStyles from '../CommonStyles';



export default class menuDrawer extends Component {
    state = {
        email: '',
        name: ',',
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.title}>Cheers</Text>
                    <View style={styles.content}>
                        <Image style={styles.image} source={{ uri: this.props.user.photoURL }} />
                        <View style={{ justifyContent: 'space-around' }}>
                            <View style={styles.itens}>
                                <AntDesign name={'user'} size={15} />
                                <Text style={styles.contato}>{this.props.user.displayName}</Text>
                            </View>
                            <View style={styles.itens}>
                                <MaterialCommunityIcons name={'email'} size={15} />
                                <Text style={styles.contato}>{this.props.user.email}</Text>
                            </View>
                            <View style={styles.itens}>
                                <FontAwesome name={'phone'} size={15} />
                                <Text style={styles.contato}>{this.props.user.phoneNumber}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <DrawerContentScrollView {...this.props}>
                    <DrawerItemList {...this.props} />
                </DrawerContentScrollView>
                <View style={styles.logoutButton}>
                    <TouchableOpacity onPress={() => this.props.onSignOut()}>
                        <AntDesign name='logout' size={30} color={CommonStyles.Colors.buttons} />
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        resizeMode: 'contain',
        alignSelf: 'center',
        flex: 1,
    },
    title: {
        fontSize: 30,
        padding: 10,
        fontFamily: CommonStyles.fontFamilyTitle,
    },
    contato: {
        fontSize: 13,
        paddingLeft: 5,
        fontFamily: CommonStyles.fontFamily,
    },
    container: {
        padding: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    content: {
        flexDirection: 'row',
        padding: 5,
    },
    itens: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    logoutButton: {
        paddingBottom: 30,
        paddingRight: 30,
        alignItems: 'flex-end',
    }
})