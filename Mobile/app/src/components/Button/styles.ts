import { StyleSheet } from "react-native"
import { THEME } from "../../theme"

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        borderRadius: 12
    },
    touchable: {
        minWidth: 260,
        padding: 14,
    },
    text: {
        color: THEME.COLORS.TEXTSECONDARY,
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        textAlign: 'center'
    }
})