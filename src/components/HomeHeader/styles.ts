import { colors, fontFamily } from '@/theme'
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create(
    {
        container: {
            width: '100%',
            height: 324,
            justifyContent: 'flex-end',
            paddingHorizontal: 24,
            paddingBottom: 18,
            gap: 24,
        },

        label: {
            color: colors.white,
            fontSize: 12,
            fontFamily: 'fontFamily.regular',
        },
        total: {
            fontSize: 32,
            color: colors.white,
            fontFamily: fontFamily.medium,
        },
        summary: {  
            flexDirection: 'row',
            gap: 12,
            justifyContent: 'space-between',
            width: '100%',
        }
    }
);