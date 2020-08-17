/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import React, { Component } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'

export default class AuthorApp extends Component {
    componentDidMount = async () => {
        await this.props.loadUser()
        await this.props.finishedLoadUser()
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <ActivityIndicator animating={true} size={'large'} style={styles.ActInd} color={'#333'} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#999',
    },
    ActInd: {
        alignSelf: 'center'
    },
})
