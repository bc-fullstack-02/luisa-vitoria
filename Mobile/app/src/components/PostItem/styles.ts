import { StyleSheet } from 'react-native'
import { THEME } from '../../theme'

export const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: THEME.COLORS.BACKGROUNDBORDER,
        paddingHorizontal: 8,
        paddingTop:3,
        paddingBottom:8,
    },
    heading: {
        alignItems: 'center',
        flexDirection: 'row', 
        marginTop: 2
       
    },
    userNameText: {
        color: THEME.COLORS.TEXTSECONDARY,
        fontSize: THEME.FONT_SIZE.MD,
        fontFamily: THEME.FONT_FAMILY.BOLD,
        marginLeft: 4,
    },
    userUserText: {
        color: THEME.COLORS.TEXTSECONDARY,
        fontSize: THEME.FONT_SIZE.SM,
        marginLeft: 5,
    },
    profile_image: {
        width: 45,
        height: 45,
        borderRadius: 45
    },
    post_title: {
        color: THEME.COLORS.TEXTSECONDARY,
        fontSize: 16,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        marginBottom: 4
    },
    post_description: {
    
    },
    post_image: {
        width: 220,
        height: 260,
        
        borderRadius: 12,
        marginTop: 6,
    },
    content: {
        paddingRight: 3,
        paddingLeft: 50
    },
    footer: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingRight: 3,
        paddingLeft: 50
    },
    footer_item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    }
})