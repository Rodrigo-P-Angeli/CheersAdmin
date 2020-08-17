/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import { LOAD_CARDAPIO, SET_MORE, SET_LESS, SET_QT, SET_TOTAL_ITEM, SET_MAJOR_TOTAL, PUSH_PEDIDO } from '../ActionsTypes'

const initialState = {
    cardapioo: [],
    total: 0,
    statusPedido: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CARDAPIO:
            return {
                ...state,
                cardapioo: action.payload.map((item) => {
                    if (item.total && item.quantidade) {
                        return (item)
                    } else {
                        item.total = 0
                        item.quantidade = 0
                        return (item)
                    }
                }),
            }
        case SET_MORE:
            return {
                ...state,
                cardapioo: state.cardapioo.map(item => {
                    if (item.id === action.payload.id) {
                        if (action.payload.qt) {
                            item.quantidade = item.quantidade + action.payload.qt
                        } else {
                            item.quantidade = item.quantidade + 1
                        }
                    }
                    return item
                }),
            }
        case SET_LESS:
            return {
                ...state,
                cardapioo: state.cardapioo.map(item => {
                    if (item.id === action.payload.id) {
                        if (item.quantidade > 0) {
                            item.quantidade = item.quantidade - 1
                        }
                    }
                    return item
                }),
            }
        case SET_QT:
            return {
                ...state,
                cardapioo: state.cardapioo.map(item => {
                    if (item.id === action.payload.id) {
                        item.quantidade = action.payload.qt * 1
                    }
                    return item
                }),
            }
        case SET_TOTAL_ITEM:
            return {
                ...state,
                cardapioo: state.cardapioo.map(item => {
                    item.total = item.quantidade * (item.price * 1)
                    return item
                }),
            }
        case SET_MAJOR_TOTAL:
            let total = 0
            state.cardapioo.forEach(item => {
                total = item.total + total
                return total
            })
            return {
                ...state,
                total: total,
            }
        case PUSH_PEDIDO:
            return {
                ...initialState
            }
        default:
            return state
    }
}
export default reducer
