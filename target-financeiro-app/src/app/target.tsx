import { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

import { Button } from '@/components/Button'
import { CurrencyInput, Input } from '@/components/Input'
import { PageHeader } from '@/components/PageHeader'
import { useTargetDatabase } from '@/database/useTargetDatabase'

export default function Target() {
  const params = useLocalSearchParams<{ id?: string }>()

  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const targetDatabase = useTargetDatabase()

  const targetId = params.id ? Number(params.id) : null
  const isEditing = targetId !== null && !Number.isNaN(targetId)

  async function loadTarget() {
    try {
      if (!isEditing || !targetId) {
        setName('')
        setAmount(0)
        return
      }

      setIsLoading(true)

      const response = await targetDatabase.findById(targetId)

      console.log('META PARA EDITAR:', response)

      if (!response) {
        Alert.alert('Meta', 'Meta não encontrada.')
        return
      }

      setName(response.name)
      setAmount(response.amount)
    } catch (error) {
      console.log('ERRO AO CARREGAR META:', error)
      Alert.alert('Erro', 'Não foi possível carregar os dados da meta.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSave() {
    try {
      if (!name.trim()) {
        return Alert.alert('Meta', 'Informe o nome da meta.')
      }

      if (amount <= 0) {
        return Alert.alert('Meta', 'Informe um valor maior que zero.')
      }

      setIsSaving(true)

      if (isEditing && targetId) {
        await targetDatabase.update({
          id: targetId,
          name,
          amount,
        })
      } else {
        await targetDatabase.create({
          name,
          amount,
        })
      }

      router.back()
    } catch (error) {
      console.log('ERRO AO SALVAR META:', error)

      Alert.alert(
        'Erro',
        isEditing
          ? 'Não foi possível atualizar a meta.'
          : 'Não foi possível salvar a meta.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    loadTarget()
  }, [params.id])

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title={isEditing ? 'Editar meta' : 'Nova meta'}
        subtitle={
          isEditing
            ? 'Atualize os dados da sua meta financeira'
            : 'Crie uma nova meta financeira'
        }
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da meta"
          placeholder="Ex: Apple Watch"
          value={name}
          onChangeText={setName}
          editable={!isLoading && !isSaving}
        />

        <CurrencyInput
          label="Valor alvo"
          value={amount}
          onChangeValue={(value) => setAmount(value ?? 0)}
          editable={!isLoading && !isSaving}
        />

        <Button
          title={
            isSaving
              ? 'Salvando...'
              : isEditing
                ? 'Atualizar meta'
                : 'Salvar meta'
          }
          onPress={handleSave}
          disabled={isSaving || isLoading}
        />
      </View>
    </View>
  )
}