import { useSQLiteContext } from 'expo-sqlite'

export type TransactionDatabase = {
    id: number
    target_id: number
    amount: number
    observation: string | null
    created_at: string
    updated_at: string
}

type CreateTransactionDTO = {
    targetId: number
    amount: number
    observation?: string
}

type UpdateTransactionDTO = {
    id: number
    amount: number
    observation?: string
}

export function useTransactionDatabase() {
    const db = useSQLiteContext()

    async function create({ targetId, amount, observation }: CreateTransactionDTO) {
        const result = await db.runAsync(
            `
      INSERT INTO transactions (target_id, amount, observation)
      VALUES ($targetId, $amount, $observation)
      `,
            {
                $targetId: targetId,
                $amount: amount,
                $observation: observation?.trim() || null,
            }
        )

        return result.lastInsertRowId
    }

    async function update({ id, amount, observation }: UpdateTransactionDTO) {
        await db.runAsync(
            `
      UPDATE transactions
      SET
        amount = $amount,
        observation = $observation,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $id
      `,
            {
                $id: id,
                $amount: amount,
                $observation: observation?.trim() || null,
            }
        )
    }

    async function findById(id: number) {
        const response = await db.getFirstAsync<TransactionDatabase>(
            `
      SELECT
        id,
        target_id,
        amount,
        observation,
        created_at,
        updated_at
      FROM transactions
      WHERE id = $id
      `,
            {
                $id: id,
            }
        )

        return response
    }

    async function findByTargetId(targetId: number) {
        const response = await db.getAllAsync<TransactionDatabase>(
            `
      SELECT
        id,
        target_id,
        amount,
        observation,
        created_at,
        updated_at
      FROM transactions
      WHERE target_id = $targetId
      ORDER BY created_at DESC
      `,
            {
                $targetId: targetId,
            }
        )

        return response
    }

    async function remove(id: number) {
        await db.runAsync('DELETE FROM transactions WHERE id = $id', {
            $id: id,
        })
    }

    return {
        create,
        update,
        findById,
        findByTargetId,
        remove,
    }
}