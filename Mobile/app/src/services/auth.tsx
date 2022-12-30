import * as SecureStore from 'expo-secure-store'

async function getAuthHeader() {
   
    const token = await SecureStore.getItemAsync('token')

    const authHeader = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    return authHeader
}

export  { getAuthHeader };