
import React from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import api from '../../services/api';
import AuthForm, { Auth } from '../../components/AuthForm';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

interface SignUpProps {
  navigation: NativeStackNavigationProp<any, any>;
}

const SignUp = ({ navigation }: SignUpProps ) => {
  
  function handleLoginClick() {
    navigation.navigate("Login")
  }

  async function handleRegister(auth: Auth) {
    try {
      const response = await api.post('/security/register', auth)
      navigation.navigate("Login")
    }catch(err) {
      console.error(err)
    }
    
  }

  return (
    <>
      <AuthForm 
        formTitle='Faça o cadastro e comece a usar!'
        submitFormButtonText='Cadastrar'
        submitFormButtonAction={handleRegister}
        showNameInput
      />
      <TouchableOpacity onPress={handleLoginClick}>
        <Text style={styles.link}>Já possui conta? Entre agora!</Text>
      </TouchableOpacity>
      
   </>
  )
}

export default SignUp;