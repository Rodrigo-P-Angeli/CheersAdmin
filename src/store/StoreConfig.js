/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import cardapio from './reducers/Cardapio'
import user from './reducers/User'

const reducers = combineReducers({
    cardapio: cardapio,
    user: user,
})

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig
