import { FlatListProps, ViewStyle } from 'react-native';
import { styles } from './styles';
import { FlatList, Text, View } from "react-native";
import { colors } from "@/theme/colors";
import { Separator } from "@/components/Separator";

type Props<T> = FlatListProps<T> & {
    title: string
    emptyMessage?: string
    containerStyle?: ViewStyle
}

export function List<T>({ title, emptyMessage, containerStyle, data, renderItem, ...rest }: Props<T>) {
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={styles.title}>{title}</Text>

            <FlatList
                data={data}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                    <Separator color={colors.gray[200]} />
                )
                }
                ListEmptyComponent={
                    <Text style={styles.empty}>{emptyMessage}</Text>
                }
                {...rest}
            />
        </View>
    )
}