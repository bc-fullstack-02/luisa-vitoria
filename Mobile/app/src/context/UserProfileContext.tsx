import React, { useReducer, ReactNode} from 'react';
import * as SecureStore from 'expo-secure-store'
import { navigate } from '../../RootNavigation';
import { Action } from '../@types/reducer';
import api from '../services/api';
import { Post } from '../@types/post';
import { getAuthHeader } from '../services/auth';
import { Profile } from '../@types/profile';

interface iProfileContext {
    profile: Profile;
    errorMessage: string | null;
    getUserProfile?: () => void;

}

const defaultValue = { 
    profile: {
        _id: '',
        name: '',
        followers: [''],
        following: [''],
        user: {
            user: ''
        },
        image: false,
        urlImage: ''
    }, 
    errorMessage: null,
}

const Context = React.createContext<iProfileContext>(defaultValue)

const Provider = ({ children }: { children: ReactNode}) => {
    const reducer = (state: any, action: Action) => {
        switch(action.type) {
            case 'show_profile':
                return {...state, profile: {...action.payload}}
        }

    }

    const [state, dispatch] = useReducer(reducer, defaultValue)

    const getUserProfile = async() => {
        try {
            const authHeader = await getAuthHeader()
            const profileUser = await SecureStore.getItemAsync('profile')
            const response = await api.get(`/profiles/${profileUser}`, authHeader)
        
            dispatch({
                type: 'show_profile',
                payload: response.data 
            })

        }catch(err) {
            console.error(err)
        }
    }

    return (
        <Context.Provider
            value={{
                ...state,
                getUserProfile,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export { Provider, Context }