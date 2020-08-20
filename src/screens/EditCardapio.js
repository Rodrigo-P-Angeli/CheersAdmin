import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, ImageBackground, Alert, TouchableOpacity } from 'react-native'
import database from '@react-native-firebase/database'
import Icon from 'react-native-vector-icons/FontAwesome'

import ItemCardapio from '../components/CardapioItem';
import Header from '../components/Header'

const initialState = {
    cardapio: [],
}

export default class AuthorApp extends Component {
    state = {
        ...initialState
    }
    componentDidMount = async () => {
        await database().ref('cardapio')
            .on('value', snapshot => this.setState({ cardapio: snapshot.val() }))
    }
    onConfirmarItem = async (id, image, marca, tipo, volume, price) => {
        await database().ref('cardapio')
            .child(`${id}`)
            .update({
                id,
                image,
                marca,
                tipo,
                volume,
                price: price.replace(',', '.') * 1,
            })
            .then(() => Alert.alert('Sucesso', 'Produto Alterado com sucesso!'))
            .catch(e => console.log(e))
        this.props.navigation.navigate('EditCardapio')
    }
    onAddItem = async (image, marca, tipo, volume, price) => {
        let cardapioLenght = this.state.cardapio.length
        console.log(cardapioLenght)
        await database().ref('cardapio')
            .child(`${cardapioLenght}`)
            .set({
                id: cardapioLenght,
                image,
                marca,
                tipo,
                volume,
                price: price.replace(',', '.') * 1,
            })
            .then(() => Alert.alert('Sucesso', 'Produto adicionado com sucesso!'))
            .catch(e => console.log(e))
        this.props.navigation.navigate('EditCardapio')
    }
    onDeleteItem = async (id) => {
        let cardapioLenght = this.state.cardapio.length
        console.log(cardapioLenght)
        await database().ref('cardapio')
            .child(`${id}`)
            .remove()
            .then(() => Alert.alert('Sucesso', 'Produto deletado com sucesso!'))
            .catch(e => console.log(e))
        this.props.navigation.navigate('EditCardapio')
    }
    render() {
        return (
            <ImageBackground style={styles.container} source={require('../assets/images/BackGround.jpg')}>
                <Header {...this.props} />
                <FlatList
                    data={this.state.cardapio}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => <ItemCardapio {...item} {...this.props} onClick={(a, b, c, d, e, f) => this.onConfirmarItem(a, b, c, d, e, f)} onDelete={this.onDeleteItem} />} />
                <TouchableOpacity style={styles.addButton} onPress={() => { this.props.navigation.navigate('FinalizarPedido', { addNew: true, onClick: this.onAddItem }) }}>
                    <Icon name={'plus'} size={20} color={'white'} />
                </TouchableOpacity>
            </ImageBackground >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
    },
})
