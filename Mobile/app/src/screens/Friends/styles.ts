import { StyleSheet } from 'react-native'
import { THEME } from '../../theme'
import Constants from 'expo-constants';
import { ThemeProvider } from '@react-navigation/native';

export const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        paddingVertical: 2,
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        backgroundColor: THEME.COLORS.PRIMARY
    },
    text_heading: {
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        fontSize: THEME.FONT_SIZE.MD,
        color: THEME.COLORS.TEXTPRIMARY,
        marginLeft: 4
    },
    item: {
        borderBottomWidth: 1,
        borderColor: THEME.COLORS.BACKGROUNDBORDER,
        paddingBottom: 8,
        paddingTop: 5
    },
    heading_item:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    userNameText: {
        color: THEME.COLORS.TEXTSECONDARY,
        fontSize: THEME.FONT_SIZE.MD,
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        marginLeft: 2,
    },
    userUserText: {
        color: THEME.COLORS.TEXTSECONDARY,
        fontSize: THEME.FONT_SIZE.SM,
        marginLeft: 5,
    },
    button_list: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    button: {
        backgroundColor: THEME.COLORS.SECONDARY,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 8,
        borderRadius: 8,
    }
    
})