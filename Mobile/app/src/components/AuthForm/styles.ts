import { StyleSheet, ViewStyle, ImageStyle, TextStyle} from 'react-native'
import { THEME } from '../../theme'

type Style = {
    container: ViewStyle;
    containerPosition: ViewStyle;
    logo: ImageStyle;
    button: ViewStyle;
}

export const styles = StyleSheet.create<Style>({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        color: THEME.COLORS.TEXTSECONDARY,
        marginTop: 120,
        
    }, 
    containerPosition: {
        alignItems: "center",
        marginTop: 50
    },
    logo: {
        width: 150,
        height: 150
    },
    button: {
        minWidth: 240,
        textAlign: 'center',
        borderRadius: 12,
        backgroundColor: 'red'
    },
})