import { StyleSheet } from 'react-native'

import { colors, fontFamily } from '@/theme'

export const styles = StyleSheet.create(
    {
        container: {
            minHeight: 72,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            paddingVertical: 8,
        },
        info: {
            flex: 1,
            gap: 4,
        },
        value: {
            fontSize: 16,
            fontFamily: fontFamily.medium,
            color: colors.black,
        },
        description: {
            fontSize: 13,
            fontFamily: fontFamily.regular,
            color: colors.gray[500],
        },
    })