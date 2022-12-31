import { useContext, useEffect } from 'react';
import { User, HouseSimple, UsersThree} from 'phosphor-react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as AuthProvider, Context as AuthContext} from './src/context/AuthContext'
import { Provider as PostProvider, Context as PostContext, } from './src/context/PostContext'
import { Provider as ProfileProvider, Context as ProfileContext, } from './src/context/ProfileContext'
import { Provider as UserProfileProvider} from './src/context/UserProfileContext'

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'

import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Loading from './src/components/Loading';
import Profile from './src/screens/Profile';
import Friends from './src/screens/Friends';
import { THEME } from './src/theme';
import { navigationRef } from './RootNavigation';

import MainNavigator from './src/screens/MainNavigator';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: THEME.COLORS.BACKGROUND,
  },
}

function App() {
  const { token, tryLocalLogin } = useContext(AuthContext)

  useEffect(() => {
    tryLocalLogin && tryLocalLogin()
  }, [])

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  })

  const Stack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaProvider>
      { fontsLoaded ? (
        <NavigationContainer theme={MyTheme} ref={navigationRef}>
          {!token ? (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
          )
          : (
            <Tab.Navigator
              screenOptions={({route}) => ({
                tabBarIcon: ({ color, size }) => {
                  switch(route.name) {
                    case 'MainNavigator':
                      return (
                        <HouseSimple weight='fill' size={size} color={color}  />
                      )
                    case 'Friends':
                      return (
                        <UsersThree weight='fill' size={size} color={color} />
                      )
                    case 'Profile':
                      return (
                        <User weight='fill' size={size} color={color} />
                      )
                  }
                },
                headerShown: false,
                tabBarShowLabel: false,
                tabBarInactiveTintColor: THEME.COLORS.BLACK,
                tabBarActiveTintColor: THEME.COLORS.SECONDARY,
              })}
            >
              <Tab.Screen name="MainNavigator" component={MainNavigator} options={{ 
                unmountOnBlur: true,
              }} />
              <Tab.Screen name="Friends" component={Friends} options={{
                unmountOnBlur: true,
              }} />
              <Tab.Screen name="Profile" component={Profile} options={{
                unmountOnBlur: true,
              }} />
            </Tab.Navigator>
          )
          
          }
        </NavigationContainer>
      )
      :
        <Loading />
      }
    </SafeAreaProvider>
  );

}


export default () => {
  return (
    <AuthProvider>
      <PostProvider>
        <ProfileProvider>
          <UserProfileProvider>
            <App />
          </UserProfileProvider>
        </ProfileProvider>
      </PostProvider>
    </AuthProvider>
  )
}