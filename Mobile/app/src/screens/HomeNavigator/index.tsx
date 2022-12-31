
import React, {useEffect, useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as UserProfileContext } from '../../context/UserProfileContext';
import HomeScreen from '../HomeScreen';
import PostDetail from '../PostDetail';


const Stack = createNativeStackNavigator()

// import { Container } from './styles';

const HomeNavigator = () => {
    
    const { user } = useContext(AuthContext)
    const { getUserProfile, profile } = useContext(UserProfileContext)

    useEffect(() => {
        getUserProfile && getUserProfile()
    }, [])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" children={(props) => <HomeScreen user={user} name={profile.name} profileDetails={profile} screenName="PostDetail" {...props} />} />
      <Stack.Screen name='PostDetail' component={PostDetail} initialParams={{ postId: '' }} />

    </Stack.Navigator>
  )
}

export default HomeNavigator;