import { StyleSheet } from 'react-native'
import { colors, fontFamily } from '@/theme'

export const styles = StyleSheet.create(
    {
        container:
        {
            width: '100%',
            gap: 10,
        },
        label:
        {
            fontFamily: fontFamily.medium,
            fontSize: 12,
            color: colors.gray[600],
        },
        input:
        {
            color: colors.black,
            fontFamily: fontFamily.regular,
            fontSize: 16,
            paddingBottom: 12,
            borderBottomWidth: 1,
            borderBottomColor: colors.gray[400],
        },
    }
)