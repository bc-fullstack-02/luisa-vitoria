
import React, { useContext } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import AuthForm from '../../components/AuthForm';
import { Text, TouchableOpacity} from 'react-native';
import { styles } from './styles';
import { Context as AuthContext} from '../../context/AuthContext'
import Spacer from '../../components/Spacer';


interface LoginProps {
  navigation: NativeStackNavigationProp<any, any>;
}

const Login = ({ navigation }: LoginProps) => {
  const { login, errorMessage } = useContext(AuthContext)

  console.log(errorMessage)
  function handleRegisterClick() {
    navigation.navigate("SignUp")
  }

  return (
    <>
      {login && (
        <>
          <AuthForm 
          formTitle='Faça login e comece a usar!'
          submitFormButtonText='Entrar'
          submitFormButtonAction={login}
          />

          <TouchableOpacity onPress={handleRegisterClick}>
            <Text style={styles.link}>Não possui conta? Crie uma agora!</Text>
          </TouchableOpacity>

          {errorMessage && (
            <Spacer>
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            </Spacer>
          )}
           
        </>

      )}
   </>
  )  
}

export default Login;