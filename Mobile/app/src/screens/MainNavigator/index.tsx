import React, { useContext, useEffect, useState }from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as UserProfileContext } from '../../context/UserProfileContext';
import HomeNavigator from '../HomeNavigator';

import CreatePost from '../CreatePost';

const Stack = createNativeStackNavigator()

const MainNavigator = () => {

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
      <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
      <Stack.Screen name="CreatePost" children={(props) => <CreatePost user={user} name={profile.name} profileDetails={profile} {...props} />} />

    </Stack.Navigator>
    
  )
}

export default MainNavigator;