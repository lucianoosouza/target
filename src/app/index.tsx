import { View, StatusBar } from "react-native";
import { HomeHeader } from "@/components/HomeHeader";
import { colors } from "@/theme";
import { Target } from "@/components/Target";
import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { router } from "expo-router";
const summary = {
  total: 'R$ 8.467,89',
  input: {
    label: 'Entradas',
    value: 'R$ 15.542,67',
    icon: {
      name: 'arrow-upward',
      color: colors.green[500],
    },
  },
  output: {
    label: 'Saídas',
    value: 'R$ 7.074,78',
    isLeft: true,
    icon: {
      name: 'arrow-downward',
      color: colors.red[400],
    },
  },
};

const targets = [
  {
    id: '1',
    name: 'Apple Watch',
    percentage: '50%',
    current: 'R$ 580,00',
    target: 'R$ 1.700,00',
  },
  {
    id: '2',
    name: 'Comprar uma cadeira ergonômica',
    percentage: '75%',
    current: 'R$ 900,00',
    target: 'R$ 1.200,00',
  },
  {
    id: '3',
    name: 'Viagem',
    percentage: '75%',
    current: 'R$ 1.200,00',
    target: 'R$ 3.000,00',
  },
]

export default function Home() {
  return (

    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <HomeHeader data={summary} />

      <List
        title="Metas"
        data={targets}
        emptyMessage="Nenhuma meta. Toque em nova meta para criar."
        containerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) =>
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />}
      />

      <View style={{ padding: 24, paddingBottom: 32 }} />

      <Button
        title="Nova Meta"
        onPress={() => router.navigate('/target')}
      />
    </View>
  );
}