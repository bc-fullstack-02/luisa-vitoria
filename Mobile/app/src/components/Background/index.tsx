
import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';

interface Props {
    children?: React.ReactNode
}

const Background = ({children}: Props) => {
  return (
    <View style={styles.container}>
        {children}
    </View>
  )
}

export default Background;