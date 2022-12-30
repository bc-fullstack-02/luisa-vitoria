import React, { useReducer, ReactNode} from 'react';
import * as SecureStore from 'expo-secure-store'
import api from '../services/api';
import jwt_decode from 'jwt-decode'
import { Auth, UserToken } from '../@types/auth';
import { Action } from '../@types/reducer';

interface iAuthContext {
    token: string | null;
    user: string | null;
    profile: string | null;
    name: string | null;
    isLoading: boolean;
    errorMessage: string | null;
    login?: () => void;
    register?: () => void;
    tryLocalLogin?: () => void;
    logout?: () => void;
}

const defaultValue = {
    token: null,
    user: null,
    profile: null,
    name: null,
    isLoading: true,
    errorMessage: null
}
const Context = React.createContext<iAuthContext>(defaultValue)

const Provider = ({ children }: { children: ReactNode }) => {
    const reducer = (state: any, action: Action) => {
        switch(action.type) {
            case 'login':
                return {
                    ...state,
                    ...action.payload,
                    errorMessage: null
                }
            case 'user_created':
                return {...state, errorMessage: null}
            case 'logout':
                return { token: null, profile: null, user: null, name: null, errorMessage: null}
            case "add_error": 
                return {...state, errorMessage: action.payload}
            default: 
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, defaultValue)

    const login = async({user, password}: Auth) => {
        try {
            const response = await api.post('/security/login', {user, password})
            
            const { accessToken } = response.data
            const decodedToken = jwt_decode(accessToken) as UserToken
            const userUser = decodedToken.user
            const profileId = decodedToken.profile._id
            const userName = decodedToken.profile.name

            await SecureStore.setItemAsync('token', accessToken)
            await SecureStore.setItemAsync('user', userUser)
            await SecureStore.setItemAsync('profile', profileId)
            await SecureStore.setItemAsync('name', userName)
            

            dispatch({
                type: 'login',
                payload: { token: accessToken, profile: profileId, user: userUser, name: userName}
            })
        }catch(err) {
            console.error(err)
            dispatch({
                type: 'add_error',
                payload: 'Houve algum erro no login...'
            })
        }
    }

    const register = async({user, password, name}: Auth) => {
        try {
            await api.post('/security/register', {user, password, name})
            
            dispatch({
                type: 'user_created',
            })
        }catch(err) {
            console.error(err)
            dispatch({
                type: 'add_error',
                payload: 'Houve algum erro no cadastro...'
            })
        }
    }

    const tryLocalLogin = async () => {
        let token, user, profile, name;

        try {
            token = await SecureStore.getItemAsync('token')
            user = await SecureStore.getItemAsync('user')
            profile = await SecureStore.getItemAsync('profile')
            name = await SecureStore.getItemAsync('name')

            dispatch({ type: 'login', payload: { token, profile, user, name }})

        }catch(err) {
            console.error(err)
        }
    }

    const logout = async() => {
        try {

            await SecureStore.deleteItemAsync('token')
            await SecureStore.deleteItemAsync('user')
            await SecureStore.deleteItemAsync('profile')
            await SecureStore.deleteItemAsync('name')
            

            dispatch({
                type: 'logout',
            })
        }catch(err) {
            console.error(err)
        }
    }


    return (
        <Context.Provider
            value={{
                ...state,
                login,
                register,
                tryLocalLogin,
                logout
            }}
        >
            {children}
        </Context.Provider>
    )
}

export { Provider, Context}