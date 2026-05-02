import { StyleSheet } from 'react-native'

import { colors, fontFamily } from '@/theme'

export const styles = StyleSheet.create(
    {
        container: {
            width: '100%',
            flex: 1,
        },
        label: {
            fontSize: 12,
            fontFamily: fontFamily.medium,
            color: colors.gray[500],
            marginBottom: 8,
        },
        status: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
        },
        value: {
            fontSize: 18,
            fontFamily: fontFamily.medium,
            color: colors.black,
            flex: 1,
        },
        target: {
            fontSize: 20,
            fontFamily: fontFamily.medium,
            color: colors.gray[500],
        },
        percentage: {
            fontSize: 24,
            fontFamily: fontFamily.bold,
            color: colors.blue[500],
        },
        progress: {
            marginTop: 10,
            width: '100%',
            height: 5,
            borderRadius: 5,
            backgroundColor: colors.gray[300],
            overflow: 'hidden',
        },
        currentProgress: {
            height: 5,
            backgroundColor: colors.blue[500],
        },
    }
)