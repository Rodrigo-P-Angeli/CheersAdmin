/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import {
    LOAD_CARDAPIO,
    SET_MORE, SET_LESS,
    SET_QT,
    SET_TOTAL_ITEM,
    SET_MAJOR_TOTAL,
    PUSH_PEDIDO,
} from '../ActionsTypes'
import { Alert } from 'react-native'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import moment from 'moment'

import { saveUserAddress } from './user'

export const loadCardapio = () => {
    return async (dispatch, getState) => {
        if (!getState().cardapioo) {
            try {
                await database().ref('cardapio').on('value', snapshot => {
                    const itens = snapshot.val()
                    dispatch(setCardapio(itens))
                })
            }
            catch (err) {
                console.log(err)
            }
        } else {
            return console.log('Erro em Load cardapio')
        }

    }
}
export const setCardapio = posts => {
    return {
        type: LOAD_CARDAPIO,
        payload: posts,
    }
}
export const setmore = (id, qt) => {
    if (qt) {
        return {
            type: SET_MORE,
            payload: {
                id: id,
                qt: qt
            },
        }
    } else {
        return {
            type: SET_MORE,
            payload: {
                id: id,
            },
        }
    }
}
export const setMore = (id, qt) => {
    return dispatch => {
        dispatch(setmore(id, qt))
        dispatch(setTotalItem(id))
        dispatch(setMajorTotal())
    }
}
export const setLess = (id) => {
    return dispatch => {
        dispatch(setless(id))
        dispatch(setTotalItem(id))
        dispatch(setMajorTotal())
    }
}
export const setless = (id) => {
    return {
        type: SET_LESS,
        payload:
        {
            id: id,
        },
    }
}
export const setQuantidade = (id, text) => {
    let newText = '';
    let numbers = '0123456789';
    return dispatch => {
        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
        }
        dispatch(setqt(id, newText))
        dispatch(setTotalItem())
        dispatch(setMajorTotal())
    }
}
export const setTotalItem = () => {
    return {
        type: SET_TOTAL_ITEM,
    }
}
export const setqt = (id, qt) => {
    return {
        type: SET_QT,
        payload:
        {
            id: id,
            qt: qt,
        },
    }
}
export const setMajorTotal = () => {
    return {
        type: SET_MAJOR_TOTAL,
    }
}
export const pushPedido = () => {
    return {
        type: PUSH_PEDIDO,
    }
}

export const postPedido = (user, pedido, endereco, total) => {
    let refPedido = null
    const now = new Date().toISOString()
    return async dispatch => {
        refPedido = await database().ref('pedidos').push()
        refPedido.set({
            data: now,
            uid: user.uid,
            pedido: pedido.filter((item) => item.quantidade > 0),
            endereco: endereco,
            total: total,
            status: 'Envidado',
        }).then(
            await database().ref('users').child(`${user.uid}/pedidos`).once('value').then(snapshot => {
                let pedidos = snapshot.val() ? snapshot.val() : []
                pedidos[snapshot.val() ? snapshot.val().length : 0] = refPedido.key
                database().ref('users').child(`${user.uid}`).set(
                    {
                        pedidos
                    })
            })).catch(e => console.log(e)).then(() => {
                dispatch(loadCardapio())
                dispatch(saveUserAddress(user, endereco))
                Alert.alert('Pedido Enviado com sucesso', 'Guenta que já já chegar')
                dispatch(pushPedido())
            }
            )
    }
}
