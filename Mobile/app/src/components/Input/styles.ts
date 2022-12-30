import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { ThemeProvider } from '@react-navigation/native'
import { THEME } from '../../theme'

type Style = {
    container: ViewStyle;
    input: TextStyle;
};

export const styles = StyleSheet.create<Style>({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '100%',
        minWidth: 260,
        borderRadius: 12,
        backgroundColor: THEME.COLORS.PRIMARY,
        padding: 12,
        color: THEME.COLORS.TEXTPRIMARY,
    },
    input: {
        marginStart: 12,
        flex: 1,
        color: THEME.COLORS.TEXTPRIMARY,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
    }
})