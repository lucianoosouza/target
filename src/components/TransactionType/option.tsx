import { ColorValue, Pressable, PressableProps, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { styles } from './styles'
import { colors } from '@/theme'

type Props = PressableProps & {
    selected: boolean
    title: string
    icon: keyof typeof MaterialIcons.glyphMap
    selectedColor: ColorValue
}

export function Option({ selected, title, icon, selectedColor, ...rest }: Props) {
    return (
        <Pressable
            style={
                [
                    styles.option,
                    selected && { backgroundColor: selectedColor },
                ]
            }
            {...rest}
        >
            <MaterialIcons
                name={icon}
                size={24}
                color={selected ? colors.white : colors.gray[500]}
            />
            <Text
                style={
                    [
                        styles.title,
                        selected && { color: colors.white },
                    ]
                }
            >
                {title}
            </Text>
        </Pressable>
    )
}