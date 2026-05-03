import { ColorValue, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";

export type SummaryProps =
    {
        label: string;
        value: string;
        icon:
        {
            name: keyof typeof MaterialIcons.glyphMap;
            color: ColorValue;
        };
        isRight?: boolean;
    };

type Props =
    {
        data: SummaryProps;
    };

export function Summary({ data }: Props) {
    const { isRight = false } = data;

    return (
        <View
            style=
            {
                [
                    styles.container,
                    isRight && { justifyContent: "flex-end" },
                ]
            }
        >
            <View style={styles.header}>
                <MaterialIcons
                    name={data.icon.name}
                    size={16}
                    color={data.icon.color}
                />
                <Text style={styles.label}>{data.label}</Text>
            </View>
            <Text style={styles.value}>{data.value}</Text>
        </View>
    );
}