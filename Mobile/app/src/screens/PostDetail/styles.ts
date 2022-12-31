
import { StyleSheet, TextStyle} from 'react-native'
import { THEME } from '../../theme'
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    input_container: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '100%',
        minWidth: 260,
        backgroundColor: THEME.COLORS.PRIMARY,
        padding: 15,
        color: THEME.COLORS.TEXTPRIMARY,
    },
    input: {
        marginStart: 12,
        flex: 1,
        color: THEME.COLORS.TEXTPRIMARY,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        textAlign: 'center',
    },
    button: {
        backgroundColor: THEME.COLORS.SECONDARY,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        width: 200,
    },
    button_text: {
        textAlign: 'center',
    }
})