import { Text, TextInput, TextInputProps, View } from 'react-native'

import { colors } from '@/theme'
import { styles } from './styles'

type InputProps = TextInputProps & {
  label: string
}

type CurrencyInputProps = Omit<TextInputProps, 'value' | 'onChangeText'> & {
  label: string
  value: number
  onChangeValue: (value: number | null) => void
}

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function Input({ label, ...rest }: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        placeholderTextColor={colors.gray[400]}
        {...rest}
      />
    </View>
  )
}

export function CurrencyInput({
  label,
  value,
  onChangeValue,
  ...rest
}: CurrencyInputProps) {
  function handleChangeText(text: string) {
    const onlyDigits = text.replace(/\D/g, '')

    if (!onlyDigits) {
      onChangeValue(null)
      return
    }

    const amount = Number(onlyDigits) / 100

    onChangeValue(amount)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholderTextColor={colors.gray[400]}
        value={value > 0 ? brl.format(value) : ''}
        onChangeText={handleChangeText}
        {...rest}
      />
    </View>
  )
}