import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TextInput, Image, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class EditItem extends Component {
    state = {
        ...this.props.route.params
    }
    componentDidMount() {
        if (this.props.route.params.addNew) {
            this.setState({
                image: '',
                marca: '',
                tipo: '',
                volume: '',
                price: 0,
            })
        }
    }
    onConfirmar = () => {
        if (this.props.route.params.addNew) {
            console.log(this.props.route.params.onClick)
            return this.props.route.params.onClick(this.state.image, this.state.marca, this.state.tipo, this.state.volume, this.state.price)
        } else {
            return this.props.route.params.onClick(this.state.id, this.state.image, this.state.marca, this.state.tipo, this.state.volume, this.state.price)
        }
    }
    render() {

        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Image style={styles.image} source={this.props.route.params.addNew ? null : { uri: this.state.image }} />
                    <TextInput style={styles.textInput} value={this.state.marca} onChangeText={text => this.setState({ marca: text })} autoCapitalize={'words'} onSubmitEditing={() => { this.segundoTextInput.focus(); }} blurOnSubmit={false} />
                    <TextInput style={styles.textInput} value={this.state.tipo} onChangeText={text => this.setState({ tipo: text })} ref={(input) => { this.segundoTextInput = input; }} blurOnSubmit={false} onSubmitEditing={() => { this.terceiroTextInput.focus(); }} />
                    <TextInput style={styles.textInput} value={`${this.state.volume}`} onChangeText={text => this.setState({ volume: text })} ref={(input) => { this.terceiroTextInput = input; }} blurOnSubmit={false} onSubmitEditing={() => { this.quartoTextInput.focus(); }} />
                    <TextInput style={styles.textInput} value={`${this.state.price}`} onChangeText={text => this.setState({ price: text })} keyboardType={'numeric'} ref={(input) => { this.quartoTextInput = input; }} />
                    <TouchableOpacity onPress={() => this.onConfirmar()}>
                        <Text>Confirmar!!</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        padding: 10,
    },
    image: {
        resizeMode: 'center',
        padding: 25,
        height: 200,
        //flex: 8,
    },
    textInput: {
        borderWidth: 1,
    }
})