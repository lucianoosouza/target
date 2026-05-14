import { useCallback, useState } from 'react'
import { Alert, View } from 'react-native'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'

import { Button } from '@/components/Button'
import { List } from '@/components/List'
import { PageHeader } from '@/components/PageHeader'
import { Progress } from '@/components/Progress'
import { Transaction, TransactionProps } from '@/components/Transaction'
import { useTargetDatabase } from '@/database/useTargetDatabase'
import {
  TransactionDatabase,
  useTransactionDatabase,
} from '@/database/useTransactionDatabase'
import { TransactionTypes } from '@/utils/TransactionTypes'

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

function calculatePercentage(current: number, target: number) {
  if (target <= 0) {
    return 0
  }

  return Math.min((current / target) * 100, 100)
}

function formatDate(value: string) {
  const [date] = value.split(' ')
  const [year, month, day] = date.split('-')

  return `${day}/${month}/${year.slice(2)}`
}

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>()

  const [title, setTitle] = useState('Meta')
  const [details, setDetails] = useState({
    current: brl.format(0),
    target: brl.format(0),
    percentage: 0,
  })
  const [transactions, setTransactions] = useState<TransactionDatabase[]>([])

  const targetDatabase = useTargetDatabase()
  const transactionDatabase = useTransactionDatabase()

  async function fetchData() {
    try {
      const targetId = Number(params.id)

      if (!targetId) {
        return
      }

      const targetResponse = await targetDatabase.findById(targetId)
      const transactionsResponse =
        await transactionDatabase.findByTargetId(targetId)

      if (!targetResponse) {
        return Alert.alert('Meta', 'Meta não encontrada.')
      }

      setTitle(targetResponse.name)

      setDetails({
        current: brl.format(targetResponse.accumulated),
        target: brl.format(targetResponse.amount),
        percentage: calculatePercentage(
          targetResponse.accumulated,
          targetResponse.amount
        ),
      })

      setTransactions(transactionsResponse)
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível carregar os dados da meta.')
    }
  }

  async function handleRemoveTransaction(id: number) {
    try {
      await transactionDatabase.remove(id)
      await fetchData()
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível remover a transação.')
    }
  }

  function parseTransaction(item: TransactionDatabase): TransactionProps {
    return {
      id: String(item.id),
      value: brl.format(Math.abs(item.amount)),
      date: formatDate(item.created_at),
      description: item.observation ?? undefined,
      type:
        item.amount >= 0
          ? TransactionTypes.Input
          : TransactionTypes.Output,
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [params.id])
  )

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title={title}
        rightButton={{
          icon: 'edit',
          onPress: () => {
            console.log('EDITAR META ID:', params.id)

            router.push({
              pathname: '/target',
              params: {
                id: String(params.id),
              },
            })
          },
        }}
      />

      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Transaction
            data={parseTransaction(item)}
            onRemove={() => handleRemoveTransaction(item.id)}
            onEdit={() =>
              router.push({
                pathname: '/transaction/[id]',
                params: {
                  id: String(params.id),
                  transactionId: String(item.id),
                },
              })
            }
          />
        )}
        emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu primeiro dinheiro aqui."
      />

      <Button
        title="Nova transação"
        onPress={() => router.navigate(`/transaction/${params.id}`)}
      />
    </View>
  )
}