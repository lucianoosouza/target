import { Text, View } from 'react-native'
import { styles } from './styles'
import { TransactionTypes } from '@/utils/transaction-types'
import { List } from '../List'
import { Transaction } from '../Transaction'
import { colors } from '@/theme'
// Componente de progresso financeiro
type SavedValues = {
    current: string
    target: string
    percentage: number
}
// Props do componente, recebendo os valores atuais, meta e porcentagem
type Props = {
    data: SavedValues
}
// Exemplo de transações recentes (pode ser substituído por dados reais)
const transactions = [
    {
        id: '2',
        value: 'R$ 20,00',
        date: '12/04/25',
        type: TransactionTypes.OUTPUT,
    },
    {
        id: '1',
        value: 'R$ 300,00',
        date: '12/04/25',
        description: 'CDB de 110% no banco XPTO',
        type: TransactionTypes.INPUT,
    },
    {
        id: '3',
        value: 'R$ 300,00',
        date: '12/04/25',
        description: 'CDB de 110% no banco XPTO',
        type: TransactionTypes.INPUT,
    },
]
// Componente de progresso financeiro, mostrando o valor guardado, a meta e a porcentagem
export function Progress({ data }: Props) {
    // Renderiza o componente
    return (
        // Container principal
        <View style={styles.container}>
            <Text style={styles.label}>Valor guardado</Text>
            <View style={styles.status}>
                <Text style={styles.value}>
                    {data.current}
                    <Text style={styles.target}> de {data.target}</Text>
                </Text>
                <Text style={styles.percentage}>
                    {data.percentage.toFixed(0)}%
                </Text>
            </View>

            <View style={styles.progress}>
                <View
                    style={[
                        styles.currentProgress,
                        { width: `${data.percentage}%` },
                    ]}
                />
            </View>

            <List
                title="Transações"
                emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu primeiro dinheiro aqui."
                data={transactions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Transaction
                        data={item}
                        onRemove={() => { }}
                    />
                )}
            />
        </View >
    )
}