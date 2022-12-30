import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode} from 'react';
import { View, TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { THEME } from '../../theme';

import { styles } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const Button = (props: ButtonProps) => {
  return (
    <LinearGradient 
    style={styles.container}
    start={{x:0,y:1}}
    end={{x:1,y:0}}
    colors={[THEME.COLORS.SECONDARYLIGHT, THEME.COLORS.SECONDARYDARK]}
    >
      <TouchableOpacity {...props} style={styles.touchable}>
          <Text style={styles.text}>
              {props.title}
          </Text>
      </TouchableOpacity>
    </LinearGradient>
  )
}

export default Button;