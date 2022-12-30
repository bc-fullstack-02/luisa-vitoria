
import { StyleSheet } from 'react-native'
import { THEME } from '../../theme'
import Constants from 'expo-constants';
import { ThemeProvider } from '@react-navigation/native';

export const styles = StyleSheet.create({
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
        marginBottom: 2,
    },
    profile_image: {
        width: 45,
        height: 45,
        borderRadius: 45
    },
    userNameText: {
        color: THEME.COLORS.TEXTSECONDARY,
        fontSize: THEME.FONT_SIZE.MD,
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        marginLeft: 3,
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
        paddingLeft: 55
    },
    button: {
        backgroundColor: THEME.COLORS.SECONDARY,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 8,
        borderRadius: 8,
    },
    button_disabled: {
        backgroundColor: THEME.COLORS.BACKGROUNDBUTTONDISABLED,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 8,
        borderRadius: 8,
    }
    
})