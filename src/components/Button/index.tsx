import { ActivityIndicator, Text, TouchableHighlightProps, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { colors } from '@/theme';

type Props = TouchableHighlightProps & {
    title: string
    processing?: boolean
}
export function Button({ title, processing = false, ...rest }: Props) {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            disabled={processing}
            {...rest}
        >
            <Text style={styles.title}>
                {processing ? (
                    <ActivityIndicator
                        size="small"
                        color={colors.white}
                    />
                ) : (
                    title
                )}
            </Text>
        </TouchableOpacity>
    )
}