import { StyleSheet } from 'react-native'

import { colors, fontFamily } from '@/theme'

export const styles = StyleSheet.create(
    {
        container:
        {
            paddingVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 7,
        },
        info:
        {
            flex: 1,
            gap: 4,
        },
        value:
        {
            fontSize: 16,
            fontFamily: fontFamily.medium,
            color: colors.black,
        },
        description:
        {
            fontSize: 13,
            fontFamily: fontFamily.regular,
            color: colors.gray[500],
        },
    }
)