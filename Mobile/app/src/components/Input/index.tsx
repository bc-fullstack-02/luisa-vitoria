
import React, { ReactNode} from 'react';
import { View, TextInput, TextInputProps } from 'react-native';

import { styles } from './styles';

interface TextInputRootProps {
    children: ReactNode;
}

const TextInputRoot = ({ children }: TextInputRootProps) => {
    return ( 
        <View style={styles.container}>
            {children}
        </View>
    )
}

interface TextInputInputProps extends TextInputProps {}

const TextInputInput = (props: TextInputInputProps) => {
    return (
        <TextInput style={styles.input} {...props}></TextInput>
    )
}

interface TextInputIconProps {
    children: ReactNode;
}

const TextInputIcon = ({ children }: TextInputIconProps) => {
    return (
        <>
            {children}
        </>
    )
}

export const Input = {
    Root: TextInputRoot,
    Input: TextInputInput,
    Icon: TextInputIcon
}