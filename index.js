/**
 * @format
 */

import React from 'react'
import {AppRegistry} from 'react-native';
import App from './src/Navigation';
import {name as appName} from './app.json';
import { Provider } from 'react-redux'
import storeConfig from './src/store/StoreConfig'

const store = storeConfig()

const Redux = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Redux);
