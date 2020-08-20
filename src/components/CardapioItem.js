/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TextInput, Image } from 'react-native'
import CommonStyles from '../CommonStyles'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class ItemCardapio extends Component {
    render() {
        return (
            <TouchableOpacity onLongPress={() => this.props.onDelete(this.props.id)} onPress={() => this.props.navigation.navigate('FinalizarPedido', this.props)} activeOpacity={.7}>
                <View style={{ padding: 5, paddingBottom: 0 }}>
                    <View elevation={2} style={styles.containerOutside}>
                        <View style={styles.container}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.image} source={{ uri: this.props.image }} />
                            </View>
                            <View style={styles.desc}>
                                <Text style={styles.marca}>Marca: {this.props.marca}</Text>
                                <Text style={styles.marca}>Tipo: {this.props.tipo}</Text>
                                <Text style={styles.marca}>Volume: {this.props.volume}</Text>
                                <Text style={styles.priceText}>
                                    R$ {this.props.price.toFixed(2).replace('.', ',')}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: CommonStyles.Colors.buttons,
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'white',
        borderWidth: 2,
        margin: 5,
    },
    containerOutside: {
        backgroundColor: 'white',
        borderRadius: 10,
    },
    desc: {
        flex: .8,
    },
    marca: {
        fontSize: 20,
        fontFamily: CommonStyles.fontFamily
    },
    priceText: {
        fontFamily: CommonStyles.fontFamily,
        textAlign: 'justify',
    },
    imageContainer: {
        flex: .2,
    },
    image: {
        //resizeMode: 'contain',
        padding: 25,
        flex: 1,
    },
})