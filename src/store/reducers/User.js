/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import {
    USER_LOGGING,
    USER_LOGOUT,
    USER_SET_CEP,
    USER_SET_NUMERO,
    USER_SET_CIDADE,
    USER_SET_COMPLEMENTO,
    USER_SET_BAIRRO,
    USER_SET_RUA,
    LOADING_USER,
    FINISHED_LOADING_USER
} from '../ActionsTypes'

const initialState = {
    endereco: {
        CEP: '',
        estado: 'ES',
        cidade: '',
        bairro: '',
        rua: '',
        numero: '',
        complemento: '',
    },
    user: null,
    loadingUser: true,
    fidelidade: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGGING:
            let endereco = null
            if (!action.payload.endereco) {
                endereco = state.endereco
            } else {
                endereco = action.payload.endereco
            }
            return {
                ...state,
                user: action.payload.user,
                endereco: endereco,
                fidelidade: action.payload.fidelidade,
            }
        case USER_LOGOUT:
            return {
                ...initialState,
            }
        case USER_SET_CEP:
            return {
                ...state,
                endereco: {
                    ...state.endereco,
                    CEP: action.payload.text
                }
            }
        case USER_SET_CIDADE:
            return {
                ...state,
                endereco: {
                    ...state.endereco,
                    cidade: action.payload.text
                }
            }
        case USER_SET_NUMERO:
            return {
                ...state,
                endereco: {
                    ...state.endereco,
                    numero: action.payload.text
                }
            }
        case USER_SET_COMPLEMENTO:
            return {
                ...state,
                endereco: {
                    ...state.endereco,
                    complemento: action.payload.text
                }
            }
        case USER_SET_BAIRRO:
            return {
                ...state,
                endereco: {
                    ...state.endereco,
                    bairro: action.payload.text
                }
            }
        case USER_SET_RUA:
            return {
                ...state,
                endereco: {
                    ...state.endereco,
                    rua: action.payload.text
                }
            }
        case LOADING_USER:
            return {
                ...state,
                loadingUser: true
            }
        case FINISHED_LOADING_USER:
            return {
                ...state,
                loadingUser: false
            }
        default:
            return state
    }
}
export default reducer
