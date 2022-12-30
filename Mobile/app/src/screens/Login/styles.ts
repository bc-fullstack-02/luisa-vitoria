import { StyleSheet, TextStyle} from 'react-native'
import { THEME } from '../../theme'

type Style = {
    link: TextStyle;
    errorMessage: TextStyle
}

export const styles = StyleSheet.create<Style>({
    link: {
        color: THEME.COLORS.TEXTSECONDARY,
        fontSize: THEME.FONT_SIZE.SM,
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    errorMessage: {
        color: THEME.COLORS.ERROR,
        textAlign: 'center'
    }
})