// 1. Importação de componentes nativos. O 'Alert' é uma ponte para as modais nativas (Android/iOS).
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native"

// 2. Importação de estilos e componentes customizados (Atomic Design/Componentização).
import { styles } from "./styles"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Filter } from "@/components/Filter"
import { FilterStatus } from "@/types/FilterStatus"
import { Item } from "@/components/Item"

// 3. Hooks fundamentais: useEffect para efeitos colaterais e useState para estado local.
import { useEffect, useState } from "react"

// 4. Camada de Serviço: Isola a lógica de persistência (provavelmente AsyncStorage ou SQLite).
import { itemsStorage, ItemsStorage } from "@/storage/itemsStorage"

// 5. Constante de configuração para evitar "magic strings" e facilitar manutenção.
const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export function Home() {
  // 6. Estado do filtro atual (Pendentes ou Concluídos).
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  
  // 7. Estado controlado para o campo de input (Two-way data binding manual).
  const [description, setDescription] = useState("")
  
  // 8. Estado da lista de itens que será renderizada no FlatList.
  const [items, setItems] = useState<ItemsStorage[]>([])

  // 9. Função assíncrona para adicionar itens. 'async/await' é vital aqui pois lidamos com I/O de disco.
  async function handleAdd() {
    // 10. Validação básica: trim() remove espaços vazios para evitar entradas inúteis.
    if (!description.trim()) {
      return Alert.alert("Adicionar", "Informe a descrição para adicionar.")
    }

    // 11. Objeto de negócio. O ID gerado via Math.random não é ideal para produção (UUID seria melhor),
    // mas funciona para o escopo educacional.
    const newItem = {
      id: Math.random().toString().substring(2),
      description,
      status: FilterStatus.PENDING,
    }

    // 12. Persistência: salvamos no storage e recarregamos a lista para manter a UI sincronizada.
    await itemsStorage.add(newItem)
    await itemsByStatus()

    // 13. Feedback ao usuário e reset do formulário.
    Alert.alert("Adicionado", `Adicionado ${description}`)
    setFilter(FilterStatus.PENDING) // Volta para pendentes para o usuário ver o que acabou de criar.
    setDescription("") // Limpa o Input.
  }

  // 14. Função de busca: filtra os dados baseada no estado 'filter'.
  async function itemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter)
      setItems(response) // Atualiza o estado e dispara a re-renderização da FlatList.
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível filtrar os itens.")
    }
  }

  // 15. Remoção: Aguarda a deleção no storage antes de atualizar a interface.
  async function handleRemove(id: string) {
    try {
      await itemsStorage.remove(id)
      await itemsByStatus() // Re-sincroniza a lista.
    } catch (error) {
      console.log(error)
      Alert.alert("Remover", "Não foi possível remover o item.")
    }
  }

  // 16. Confirmação de segurança: UX padrão para ações destrutivas.
  function handleClear() {
    Alert.alert("Limpar", "Deseja remover todos?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => onClear()} // Executa a limpeza real se confirmado.
    ])
  }

  // 17. Limpeza total do storage e reset imediato do estado local.
  async function onClear() {
    try {
      await itemsStorage.clear()
      setItems([])
    } catch (error) {
      console.log(error)
      Alert.alert("Limpar", "Não foi possível remover todos os itens.")
    }
  }

  // 18. Toggle de Status: O "coração" da interatividade da lista.
  async function handleToggleItemStatus(id: string) {
    try {
      await itemsStorage.toggleStatus(id)
      await itemsByStatus() // Atualiza a lista conforme o filtro ativo.
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível atualizar o status.")
    }
  }

  // 19. Hook de Efeito: Sempre que o 'filter' mudar, ele executa a busca novamente.
  // Isso garante que a UI esteja sempre em sincronia com o estado do filtro.
  useEffect(() => {
    itemsByStatus()
  }, [filter])

  return (
    <View style={styles.container}>
      {/* 20. Imagem local carregada via require. */}
      <Image source={require('@/assets/logo.png')} style={styles.logo} />

      <View style={styles.form}>
        {/* 21. Input customizado passando o estado e a função de atualização. */}
        <Input 
          placeholder="O que você precisa comprar?" 
          onChangeText={setDescription}
          value={description}
        />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {/* 22. Renderização de lista dinâmica para os botões de filtro. */}
          {FILTER_STATUS.map((status) => (
            <Filter
               key={status}
               status={status} 
               isActive={filter === status}
               onPress={() => setFilter(status)} 
            />
          ))}

          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {/* 23. FlatList: O componente mais performático para listas no RN. 
            Diferente do .map(), ela renderiza apenas o que está visível na tela (virtualização). */}
        <FlatList 
          data={items}
          keyExtractor={item => item.id} // 24. Chave única para otimização de renderização.
          renderItem={({ item }) => (
            <Item
              data={item} 
              onStatus={() => handleToggleItemStatus(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          // 25. Separador elegante entre itens, evita lógica de margem no componente Item.
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          // 26. Renderização condicional automática para listas vazias.
          ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item aqui.</Text>}
        />
      </View>
    </View>
  )
}