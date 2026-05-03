import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/theme";

export const styles = StyleSheet.create(
    {
        container:
        {
            gap: 5,
        },
        header:
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
        },
        label:
        {
            fontFamily: fontFamily.regular,
            fontSize: 12,
            color: colors.white,
        },
        value:
        {
            fontFamily: fontFamily.regular,
            fontSize: 18,
            color: colors.white,
        },
    }
)