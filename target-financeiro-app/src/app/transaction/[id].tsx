import { useEffect, useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

import { Button } from '@/components/Button'
import { CurrencyInput, Input } from '@/components/Input'
import { PageHeader } from '@/components/PageHeader'
import { useTransactionDatabase } from '@/database/useTransactionDatabase'

type TransactionMode = 'input' | 'output'

export default function Transaction() {
  const params = useLocalSearchParams<{
    id: string
    transactionId?: string
  }>()

  const [amount, setAmount] = useState(0)
  const [observation, setObservation] = useState('')
  const [mode, setMode] = useState<TransactionMode>('input')
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const transactionDatabase = useTransactionDatabase()

  const targetId = Number(params.id)
  const transactionId = params.transactionId ? Number(params.transactionId) : null
  const isEditing = transactionId !== null && !Number.isNaN(transactionId)

  async function loadTransaction() {
    try {
      if (!isEditing || !transactionId) {
        setAmount(0)
        setObservation('')
        setMode('input')
        return
      }

      setIsLoading(true)

      const response = await transactionDatabase.findById(transactionId)

      console.log('TRANSAÇÃO PARA EDITAR:', response)

      if (!response) {
        Alert.alert('Transação', 'Transação não encontrada.')
        return
      }

      setAmount(Math.abs(response.amount))
      setObservation(response.observation ?? '')
      setMode(response.amount >= 0 ? 'input' : 'output')
    } catch (error) {
      console.log('ERRO AO CARREGAR TRANSAÇÃO:', error)
      Alert.alert('Erro', 'Não foi possível carregar os dados da transação.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSave() {
    try {
      if (!targetId || Number.isNaN(targetId)) {
        return Alert.alert('Transação', 'Meta inválida.')
      }

      if (amount <= 0) {
        return Alert.alert('Transação', 'Informe um valor maior que zero.')
      }

      setIsSaving(true)

      const normalizedAmount = mode === 'input' ? amount : amount * -1

      if (isEditing && transactionId) {
        await transactionDatabase.update({
          id: transactionId,
          amount: normalizedAmount,
          observation,
        })
      } else {
        await transactionDatabase.create({
          targetId,
          amount: normalizedAmount,
          observation,
        })
      }

      router.back()
    } catch (error) {
      console.log('ERRO AO SALVAR TRANSAÇÃO:', error)

      Alert.alert(
        'Erro',
        isEditing
          ? 'Não foi possível atualizar a transação.'
          : 'Não foi possível salvar a transação.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    loadTransaction()
  }, [params.transactionId])

  return (
    <View style={{ flex: 1, padding: 24, gap: 24 }}>
      <PageHeader
        title={isEditing ? 'Editar transação' : 'Nova transação'}
        subtitle={
          isEditing
            ? 'Atualize os dados da transação'
            : 'Registre uma entrada ou saída da meta'
        }
      />

      <CurrencyInput
        label="Valor"
        value={amount}
        onChangeValue={(value) => setAmount(value ?? 0)}
        editable={!isLoading && !isSaving}
      />

      <Input
        label="Observação"
        placeholder="Ex: Depósito mensal"
        value={observation}
        onChangeText={setObservation}
        editable={!isLoading && !isSaving}
      />

      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '600' }}>
          Tipo da transação
        </Text>

        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setMode('input')}
            disabled={isLoading || isSaving}
            style={{
              flex: 1,
              height: 52,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: mode === 'input' ? '#16a34a' : '#e5e7eb',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: mode === 'input' ? '#ffffff' : '#111827',
              }}
            >
              Entrada
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setMode('output')}
            disabled={isLoading || isSaving}
            style={{
              flex: 1,
              height: 52,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: mode === 'output' ? '#dc2626' : '#e5e7eb',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: mode === 'output' ? '#ffffff' : '#111827',
              }}
            >
              Saída
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Button
        title={
          isSaving
            ? 'Salvando...'
            : isEditing
              ? 'Atualizar transação'
              : 'Salvar transação'
        }
        onPress={handleSave}
        disabled={isSaving || isLoading}
      />
    </View>
  )
}