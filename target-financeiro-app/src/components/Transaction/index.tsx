import { MaterialIcons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'

import { colors } from '@/theme/colors'
import { TransactionTypes } from '@/utils/TransactionTypes'
import { styles } from './styles'

export type TransactionProps = {
  id: string
  value: string
  date: string
  description?: string
  type: TransactionTypes
}

type Props = {
  data: TransactionProps
  onRemove: () => void
  onEdit?: () => void
}

export function Transaction({ data, onRemove, onEdit }: Props) {
  const isInput = data.type === TransactionTypes.Input

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons
          name={isInput ? 'arrow-upward' : 'arrow-downward'}
          size={20}
          color={isInput ? colors.green[500] : colors.red[400]}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.value}>{data.value}</Text>

        <Text style={styles.description} numberOfLines={1}>
          {data.date}
          {data.description ? ` • ${data.description}` : ''}
        </Text>
      </View>

      {onEdit ? (
        <TouchableOpacity activeOpacity={0.8} onPress={onEdit}>
          <MaterialIcons name="edit" size={24} color={colors.gray[400]} />
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity activeOpacity={0.8} onPress={onRemove}>
        <MaterialIcons
          name="delete-outline"
          size={24}
          color={colors.gray[400]}
        />
      </TouchableOpacity>
    </View>
  )
}