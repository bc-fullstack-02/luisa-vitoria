import React, { useReducer, ReactNode} from 'react';
import * as SecureStore from 'expo-secure-store'
import { navigate } from '../../RootNavigation';
import { Action } from '../@types/reducer';
import api from '../services/api';
import { Post } from '../@types/post';
import { getAuthHeader } from '../services/auth';

interface iPostContext {
    posts: Post[];
    errorMessage: string | null;
    getPosts?: () => void;
    likePost?: ({postId}: {postId: string}) => void;
    unlikePost?: ({postId}: {postId: string}) => void;
    createPost?: ({title, description}: {title: string, description: string}) => void;
}
const defaultValue = { 
    posts: [], 
    errorMessage: null,
}

const Context = React.createContext<iPostContext>(defaultValue)

const Provider = ({ children }: { children: ReactNode}) => {
    const reducer = (state: any, action: Action) => {
        switch(action.type) {
            case 'create_post':
                return {...state, posts: [...state.posts, action.payload]}
            case 'show_posts':
                return {...state, posts: action.payload }
            case 'like_post':
                const [postLike, ...restLike] = state.posts.filter((post) => post._id === action.payload.id)
                postLike.likes.push(action.payload.profile)
                return {...state, posts: [...state.posts]}
            case 'unlike_post':
                const [postUnlike, ...restUnlike] = state.posts.filter(post => post._id === action.payload.id)
                const index = postUnlike.likes.indexOf(action.payload.profile)
                postUnlike.likes.splice(index, 1)
                return {...state, posts: [...state.posts]}
        }

    }

    const [state, dispatch] = useReducer(reducer, defaultValue)

    const getPosts = async() => {
        try {
            const authHeader = await getAuthHeader()
            const response = await api.get('/feed', authHeader)
        
            dispatch({
                type: 'show_posts',
                payload: response.data 
            })

        }catch(err) {
            console.error(err)
        }
    }

    const likePost = async({postId}: {postId: string}) => {
        try {
            const authHeader = await getAuthHeader()
            await api.post(`/posts/${postId}/like`, null, authHeader)
            const profile = await SecureStore.getItemAsync('profile')
            dispatch({ 
                type: "like_post", 
                payload: {
                    id: postId,
                    profile: profile
                }
            })
        }catch(err) {
            console.error(err)
        }
    }

    const unlikePost = async({postId}: {postId: string}) => {
        try {
            const authHeader = await getAuthHeader()
            await api.post(`/posts/${postId}/unlike`, null, authHeader)
            const profile = await SecureStore.getItemAsync('profile')

            dispatch({ 
                type: "unlike_post", 
                payload: {
                    id: postId,
                    profile: profile
                }
            })

        }catch(err) {
            console.error(err)
        }
    }

    const createPost = async({ title, description }: {title: string, description: string}) => {
        try {
            const authHeader = await getAuthHeader()
            const response = await api.post('/posts', { title, description}, authHeader)

            dispatch({ type: 'create_post', payload: response.data })
            navigate('Home')

        }catch(err) {
            console.error(err)
        }
    }

    return (
        <Context.Provider
            value={{
                ...state,
                getPosts,
                createPost,
                likePost,
                unlikePost
            }}
        >
            {children}
        </Context.Provider>
    )
}

export { Provider, Context }