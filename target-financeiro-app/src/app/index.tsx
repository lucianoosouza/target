import { useCallback, useState } from 'react'
import { StatusBar, View } from 'react-native'
import { router, useFocusEffect } from 'expo-router'

import { Button } from '@/components/Button'
import { HomeHeader } from '@/components/HomeHeader'
import { List } from '@/components/List'
import { Target } from '@/components/Target'
import { TargetDatabase, useTargetDatabase } from '@/database/useTargetDatabase'

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

export default function Index() {
  const [targets, setTargets] = useState<TargetDatabase[]>([])
  const [summary, setSummary] = useState({
    total: brl.format(0),
    input: { label: 'Entradas', value: brl.format(0) },
    output: { label: 'Saídas', value: brl.format(0) },
  })

  const targetDatabase = useTargetDatabase()

  async function fetchData() {
    try {
      const targetsResponse = await targetDatabase.findAll()
      const summaryResponse = await targetDatabase.getSummary()

      setTargets(targetsResponse)

      setSummary({
        total: brl.format(summaryResponse.total),
        input: {
          label: 'Entradas',
          value: brl.format(summaryResponse.input),
        },
        output: {
          label: 'Saídas',
          value: brl.format(summaryResponse.output),
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <HomeHeader data={summary} />

      <List
        title="Metas"
        data={targets}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          const percentage = calculatePercentage(item.accumulated, item.amount)

          return (
            <Target
              data={{
                id: String(item.id),
                name: item.name,
                percentage: `${percentage.toFixed(0)}%`,
                current: brl.format(item.accumulated),
                target: brl.format(item.amount),
              }}
              onPress={() => router.navigate(`/in-progress/${item.id}`)}
            />
          )
        }}
        emptyMessage="Nenhuma meta. Toque em nova meta para criar."
        containerStyle={{ paddingHorizontal: 24 }}
      />

      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="Nova meta" onPress={() => router.navigate('/target')} />
      </View>
    </View>
  )
}