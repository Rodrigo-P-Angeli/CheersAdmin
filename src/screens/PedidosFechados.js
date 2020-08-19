/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react'
import { Text, StyleSheet, View, ImageBackground, Button, Image, FlatList, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import database from '@react-native-firebase/database'
import Moment from 'moment'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import CommonStyles from '../CommonStyles'
import Header from '../components/Header'

const initialState = {
    pedidosAntigos: []
}

export default class PedidosAntigos extends Component {
    state = {
        ...initialState
    }
    componentDidMount() {
        database()
            .ref('/pedidos').orderByKey().limitToFirst(10)
            .on('value', snapshot => {
                let perdidos = []
                snapshot.forEach(function (userSnap) {
                    if (userSnap.val().status == 'Entregue' || userSnap.val().status == 'Entrege') {
                        perdidos.push({ ...userSnap.val(), numeroPedido: userSnap.key })
                    }
                });
                this.setState({ pedidosAntigos: perdidos.reverse() })
            })
    }
    render() {
        return (
            <ImageBackground style={styles.backgroung} source={require('../assets/images/BackGround.jpg')}>
                <Header {...this.props} />
                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.pedidosAntigos}
                    keyExtractor={(item) => `${item.numeroPedido}`}
                    renderItem={({ item }) =>
                        <View style={{ backgroundColor: 'white', margin: 5, padding: 5, borderRadius: 10 }} elevation={5}>
                            <View style={styles.item}>
                                <View style={{ height: 100, flex: 2, justifyContent: 'space-between' }}>
                                    <Text style={styles.text}>Data: {Moment(item.data).format('DD/MM/YYYY h:mm:ss a')}</Text>
                                    <Text style={styles.text}>Entrega em: {item.endereco.rua}, n° {item.endereco.numero}, {item.endereco.bairro}, {item.endereco.cidade}, {item.endereco.estado}{item.endereco.complemento ? `, ${item.endereco.complemento}` : null}</Text>
                                    <Text style={styles.text}>Status: {item.status}</Text>
                                </View>
                                <View style={{ height: 100, flex: 1, justifyContent: 'space-between' }}>
                                    <Text style={styles.text}># {item.numeroPedido}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={[styles.text, { fontSize: 15 }]}>{'Total:\nR$'}</Text>
                                        <Text style={[styles.text, { flex: 1, textAlign: 'right', fontSize: 20 }]}>{item.total.toFixed(2).replace('.', ',')}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>}
                />
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroung: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'center',

    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: CommonStyles.Colors.buttons,
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        height: 100,
    },
    text: {
        fontFamily: CommonStyles.fontFamily,
        fontSize: 15,
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        flex: 1,
        marginBottom: 10,
        marginTop: 10,
    },
    left: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    excludeText: {
        color: 'white',
        fontSize: 20,
        margin: 10,
    },
    excludesIcon: {
        margin: 10,
    },
})
