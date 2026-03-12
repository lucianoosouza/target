// 1. Importamos a biblioteca padrão para persistência local no dispositivo.
import AsyncStorage from "@react-native-async-storage/async-storage"
// 2. Importamos o Enum/Tipo para garantir que o status seja sempre consistente (PENDING ou DONE).
import { FilterStatus } from "@/types/FilterStatus"

// 3. Definimos uma constante para a chave. O prefixo '@comprar:' evita conflitos com outras chaves no app.
const ITEMS_STORAGE_KEY = "@comprar:items"

// 4. Definição do Tipo (Interface) para que o TypeScript nos dê autocompletar e segurança de tipos.
export type ItemsStorage = {
  id: string
  status: FilterStatus
  description: string
}

// 5. Método Privado/Interno: Busca a string bruta no disco e converte para Objeto JS (Parse).
async function get(): Promise<ItemsStorage[]> {
  try {
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY)
    // 6. Se 'storage' existir, fazemos o parse; caso contrário, retornamos um array vazio.
    return storage ? JSON.parse(storage) : []
  } catch (error) {
    // 7. Relançamos o erro com um prefixo para facilitar o rastreamento em logs de erro.
    throw new Error("ITEMS_GET: " + error)
  }
}

// 8. Filtra os itens em nível de software. Útil para separar Pendentes de Concluídos.
async function getByStatus(status: FilterStatus): Promise<ItemsStorage[]> {
  const items = await get()
  return items.filter((item) => item.status === status)
}

// 9. Método Privado: Pega o Objeto JS, converte em String (Serialize) e salva no disco.
async function save(items: ItemsStorage[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    throw new Error("ITEMS_SAVE: " + error)
  }
}

// 10. Adição: Segue o princípio da Imutabilidade. Criamos um novo array com o item novo no fim.
async function add(newItem: ItemsStorage): Promise<ItemsStorage[]> {
  const items = await get()
  const updatedItems = [...items, newItem] // 11. Spread operator (...) para não mutar o array original.
  await save(updatedItems)
  
  return updatedItems
}

// 12. Remoção: Filtra todos os itens, EXCETO o que possui o ID informado.
async function remove(id: string): Promise<void> {
  const items = await get()
  const updatedItems = items.filter((item) => item.id !== id)
  await save(updatedItems)
}

// 13. Limpeza: Remove a chave inteira do storage, "resetando" o módulo.
async function clear(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ITEMS_STORAGE_KEY)
  } catch (error) {
    throw new Error("ITEMS_CLEAR: " + error)
  }
}

// 14. A Lógica de Negócio mais complexa: Alternar o status do item.
async function toggleStatus(id: string): Promise<void> {
  const items = await get()

  // 15. Usamos o .map() para percorrer a lista e gerar um novo array.
  const updatedItems = items.map((item) => 
    item.id === id
    ? {
      // 16. Se for o ID alvo, mantemos as propriedades (...item) e alteramos apenas o status.
      ...item,
      status: item.status === FilterStatus.PENDING
        ? FilterStatus.DONE
       : FilterStatus.PENDING,
    }
    : item // 17. Se não for o ID alvo, retorna o item sem alterações.
  )

  await save(updatedItems)
}

// 18. Exportamos um objeto unificado (Design Pattern: Singleton/Namespace).
// Isso permite usar: itemsStorage.add(), itemsStorage.get(), etc.
export const itemsStorage = {
  get,
  getByStatus,
  add,
  remove,
  clear,
  toggleStatus,
}