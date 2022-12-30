import { StyleSheet } from 'react-native'
import { THEME } from '../../theme'
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.COLORS.PRIMARY,
        padding: 15,
        paddingBottom: 20,
        borderRadius: 25
    },
    profile_image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 12,
    },
    name: {
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        fontSize: THEME.FONT_SIZE.LG,
        color: THEME.COLORS.TEXTPRIMARY,
        marginBottom: 8,
    },
    container_text: {
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    text: {
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        fontSize: THEME.FONT_SIZE.MD,
        color: THEME.COLORS.TEXTPRIMARY,
        marginBottom: 2
    },
})