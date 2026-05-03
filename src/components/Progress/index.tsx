import { Text, View } from 'react-native'
import { styles } from './styles'
import { TransactionTypes } from '@/utils/transaction-types'
import { List } from '../List'
import { Transaction } from '../Transaction'
import { Button } from '../Button'
import { router } from 'expo-router'

type SavedValues =
    {
        current: string
        target: string
        percentage: number
    }

type Props =
    {
        data: SavedValues
        id: string
    }

const transactions =
    [
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

export function Progress({ data, id }: Props) {

    return (

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
                renderItem={({ item }) => (
                    <Transaction
                        data={item}
                        onRemove={() => { }}
                    />
                )}
            />

            <Button
                title="Nova transação"
                onPress={() => router.navigate(`/transaction/${id}`)}
            />
        </View >
    )
}