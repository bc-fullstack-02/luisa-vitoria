
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
    content: {
        flex: 1,
    }
})