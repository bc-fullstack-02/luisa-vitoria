import React, { useReducer, ReactNode} from 'react';
import * as SecureStore from 'expo-secure-store'
import { Action } from '../@types/reducer';
import api from '../services/api';
import { getAuthHeader } from '../services/auth';
import { Profile } from '../@types/profile';

interface iProfileContext {
    profiles: Profile[];
    errorMessage: string | null;
    getProfiles?: () => void;
    followProfile?: ({profileId}: {profileId: string}) => void;
    unfollowProfile?: ({profileId}: {profileId: string}) => void;
}


const defaultValue = { 
    profiles: [{
        _id: '',
        name: '',
        followers: [''],
        user: {
            user: ''
        },
        image: false,
        urlImage: ''
    }], 
    errorMessage: null,
}

const Context = React.createContext<iProfileContext>(defaultValue)

const Provider = ({ children }: { children: ReactNode}) => {
    const reducer = (state: any, action: Action) => {
        switch(action.type) {
            case 'show_profiles':
                return {...state, profiles: action.payload}
            case 'follow_profile':
                const [profileFollow, ...restFollow] = state.profiles.filter((profile) => profile._id === action.payload.id)
                profileFollow.followers.push(action.payload.profile)
                return {...state, profiles: [...state.profiles]}
            case 'unfollow_profile':
                const [profileUnFollow, ...restUnFollow] = state.profiles.filter((profile) => profile._id === action.payload.id)
                const index = profileUnFollow.followers.indexOf(action.payload.profile)
                profileUnFollow.followers.splice(index, 1)
                
                return {...state, profiles: [...state.profiles]}
        }
    }

    const [state, dispatch] = useReducer(reducer, defaultValue)

    const getProfiles = async() => {
        try {
            const authHeader = await getAuthHeader()
            const response = await api.get('/profiles', authHeader)
        
            dispatch({
                type: 'show_profiles',
                payload: response.data 
            })

        }catch(err) {
            console.error(err)
        }
    }

    const followProfile = async({ profileId }: {profileId: string}) => {
        try {
            const authHeader = await getAuthHeader()
            await api.post(`/profiles/${profileId}/follow`, null, authHeader)
            const profileUser = await SecureStore.getItemAsync('profile')

            dispatch({
                type: 'follow_profile',
                payload: {
                    id: profileId,
                    profile: profileUser
                }
            })
        } catch(err) {
            console.error(err)
        }
    }

    const unfollowProfile = async({ profileId }: {profileId: string}) => {
        try {
            const authHeader = await getAuthHeader()
            await api.post(`/profiles/${profileId}/unfollow`, null, authHeader)
            const profileUser = await SecureStore.getItemAsync('profile')

            dispatch({
                type: 'unfollow_profile',
                payload: {
                    id: profileId,
                    profile: profileUser
                }
            })
        } catch(err) {
            console.error(err)
        }
    }

    
    return (
        <Context.Provider
            value={{
                ...state,
                getProfiles,
                followProfile,
                unfollowProfile,
                
            }}
        >
            {children}
        </Context.Provider>
    )
}

export { Provider, Context }