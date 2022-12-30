
import React, { useState } from 'react';
import { KeyboardAvoidingView, Image, Text, Platform} from 'react-native';
import { styles } from './styles';
import { User, Lock } from 'phosphor-react-native'
import logo  from '../../../assets/images/logo_parrot.png'
import Heading from '../../components/Heading';
import { Input } from '../../components/Input';
import { THEME } from '../../theme';
import Spacer from '../../components/Spacer';
import Button from '../../components/Button';
import { Auth } from '../../@types/auth';

interface AuthFormProps {
    formTitle: string;
    submitFormButtonText: string;
    submitFormButtonAction: (auth: Auth) => {};
    showNameInput?: boolean;
}


const AuthForm = ({ formTitle, submitFormButtonText, showNameInput, submitFormButtonAction }: AuthFormProps) => {
    const [name, setName] = useState('')
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    return (
        <KeyboardAvoidingView style={styles.container} contentContainerStyle={styles.containerPosition} behavior={Platform.OS === 'ios' ? "padding" : "position"}>
            <Image source={logo} style={logo}  />

            <Heading title='Sysmap Parrot' subtitle={formTitle} />

            {showNameInput && (
                <Input.Root>
                    <Input.Icon>
                        <User color='#ffffff' />
                    </Input.Icon>
                    <Input.Input value={name} onChangeText={setName} placeholder='Nome' placeholderTextColor={THEME.COLORS.INPUT} autoCapitalize='none' autoCorrect/>
                </Input.Root>
            )}
            
            {showNameInput && <Spacer />}

            <Input.Root>
                <Input.Icon>
                    <User color='#ffffff' />
                </Input.Icon>
                <Input.Input value={user} onChangeText={setUser} placeholder='Login' placeholderTextColor={THEME.COLORS.INPUT} autoCapitalize='none' autoCorrect/>
            </Input.Root>
            
            <Spacer />

            <Input.Root>
                <Input.Icon>
                    <Lock color='#ffffff' />
                </Input.Icon>
                <Input.Input value={password} onChangeText={setPassword} placeholder='******' placeholderTextColor={THEME.COLORS.INPUT} autoCapitalize='none' autoCorrect secureTextEntry />
            </Input.Root>

            <Spacer />
            
            {name !== '' ? 
                <Button onPress={() => submitFormButtonAction({ name, user, password })} title={submitFormButtonText} />
            :
                <Button onPress={() => submitFormButtonAction({ user, password })} title={submitFormButtonText} />
            }

            <Spacer />

        </KeyboardAvoidingView>
    )
}

export default AuthForm;