import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

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
    FINISHED_LOADING_USER,
} from '../ActionsTypes'

export const logout = () => {
    return async dispatch => {
        auth().signOut()
            .then(() => {
                dispatch(logOutt())
            })
            .catch(e => (console.log('erro ao sair', e)))//console.log('saiu'))
    }
}

export const login = (email, senha) => {
    return async dispatch => {
        try {
            const user = await auth().signInWithEmailAndPassword(email, senha)
        } catch (err) {
            console.log(err)
        }
        dispatch(loadUser())
    }
}

export const createUser = (nome, email, senha) => {
    return async dispatch => {
        auth()
            .createUserWithEmailAndPassword(email, senha)
            .then(() => {
                console.log('User account created & signed in!');
                auth().currentUser.updateProfile({
                    displayName: nome,
                }).then(dispatch(loadUser())).catch(error => console.log('Erro ao atualizar o nome do usuário', error))
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
                console.error(error);
            });
    }
}

export const loadUser = () => {
    return async dispatch => {
        dispatch(loadingUserFunction())
        /*let endereco = null
        let fidelidade = null
        try {
            let user = await auth().currentUser
            if (user) {
                await database().ref('users').child(`${user.uid}/endereco`).once('value').then(
                    snapshot => snapshot.val() ? endereco = snapshot.val() : endereco = null
                ).catch(e => console.log('erro ao carregar endereço', e))
                await database().ref('users').child(`${user.uid}/fidelidade`)
                    .once('value').then(snapshot => {
                        snapshot.val() ? fidelidade = snapshot.val() : fidelidade = 0
                        dispatch(userSignIn(user, endereco, fidelidade))
                    }).catch(e => console.log('erro ao carregar plano fidelidade', e))
            }
        } catch (e) {
            console.log(e, 'deu erro')
        }*/
        dispatch(userSignIn(user))

    }
}

export const onChangeCEP = (text) => {
    let newText = '';
    let numbers = '0123456789';
    for (var i = 0; i < 8; i++) {
        if (numbers.indexOf(text[i]) > -1) {
            newText = newText + text[i];
        }
    }
    return {
        type: USER_SET_CEP,
        payload: {
            text: newText,
        }
    }
}

export const onChangeCidade = (text) => {
    return {
        type: USER_SET_CIDADE,
        payload: {
            text,
        }
    }
}

export const onChangeBairro = (text) => {
    return {
        type: USER_SET_BAIRRO,
        payload: {
            text,
        }
    }
}

export const onChangeRua = (text) => {
    return {
        type: USER_SET_RUA,
        payload: {
            text,
        }
    }
}

export const onChangeNumero = (text) => {
    let newText = '';
    let numbers = '0123456789';
    for (var i = 0; i < text.length; i++) {
        if (numbers.indexOf(text[i]) > -1) {
            newText = newText + text[i];
        }
    }
    return {
        type: USER_SET_NUMERO,
        payload: {
            text: newText,
        }
    }
}

export const onChangeComplemento = (text) => {
    return {
        type: USER_SET_COMPLEMENTO,
        payload: {
            text,
        }
    }
}

export const userSignIn = (user) => {
    return {
        type: USER_LOGGING,
        payload: {
            user,
        }
    }
}

export const logOutt = () => {
    return {
        type: USER_LOGOUT,
    }
}

export const saveUserAddress = (user, endereco) => {
    return async dispatch => {
        try {
            await database().ref('users').child(`${user.uid}/endereco`).set({ ...endereco })
        }
        catch (e) {
            console.log(e)
        }
    }
}

export const loadingUserFunction = () => {
    return {
        type: LOADING_USER,
    }
}

export const finishedLoadingUser = () => {
    return {
        type: FINISHED_LOADING_USER,
    }
}