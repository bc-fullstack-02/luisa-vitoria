import { StyleSheet, TextStyle} from 'react-native'
import { THEME } from '../../theme'
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    heading: {
        alignItems: 'center',
        flexDirection: 'row', 
        paddingHorizontal: 8,
        paddingVertical:4,
        backgroundColor: THEME.COLORS.PRIMARY,
    },
    profile_image: {
        width: 45,
        height: 45,
        borderRadius: 45
    },
    userNameText: {
        color: THEME.COLORS.TEXTPRIMARY,
        fontSize: THEME.FONT_SIZE.MD,
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        marginLeft: 4,
    },
    userUserText: {
        color: THEME.COLORS.TEXTPRIMARY,
        fontSize: THEME.FONT_SIZE.SM,
        marginLeft: 5,
    },
    title: {
        fontSize: THEME.FONT_SIZE.MD,
        fontFamily: THEME.FONT_FAMILY.BOLD,
        textAlign: 'center',
        marginTop: 15
    },
    post_image: {
        width: 200,
        height: 260,
        marginVertical: 15,
        borderRadius: 25,
        textAlign: 'center'
    },
    buttonStyle: {
        backgroundColor: THEME.COLORS.PRIMARYDARK,
        color: THEME.COLORS.TEXTPRIMARY,
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginVertical: 15,
    },
    buttonTextStyle: {
        color: THEME.COLORS.TEXTPRIMARY,
        paddingVertical: 10,
        fontSize: 16,
    },
})