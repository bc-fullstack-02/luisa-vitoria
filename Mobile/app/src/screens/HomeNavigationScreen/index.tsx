
import React, { useContext, useEffect, useState }from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as UserProfileContext } from '../../context/UserProfileContext';
import Home from '../Home';
import CreatePost from '../CreatePost';

const Stack = createNativeStackNavigator()

const HomeNavigationScreen = () => {

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
      <Stack.Screen name="Home"  children={(props) => <Home user={user} name={profile.name} profileDetails={profile} {...props} />} />
      <Stack.Screen name="CreatePost" children={(props) => <CreatePost user={user} name={profile.name} profileDetails={profile} {...props} />} />

    </Stack.Navigator>
  )
}

export default HomeNavigationScreen;