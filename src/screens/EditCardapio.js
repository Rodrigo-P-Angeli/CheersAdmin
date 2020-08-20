import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, ImageBackground } from 'react-native'
import database from '@react-native-firebase/database'
import ItemCardapio from '../components/CardapioItem';
import Header from '../components/Header'

const initialState = {
    cardapio: [],
}

export default class AuthorApp extends Component {
    state = {
        ...initialState
    }
    componentDidMount = () => {
        database().ref('cardapio')
            .once('value')
            .then(
                snapshot => this.setState({ cardapio: snapshot.val() })
            )
            .catch(e => console.log(e))
    }
    render() {
        return (
            <ImageBackground style={styles.container} source={require('../assets/images/BackGround.jpg')}>
                <Header {...this.props} />
                <FlatList
                    data={this.state.cardapio}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => <ItemCardapio {...item} />} />
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
