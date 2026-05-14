import { useSQLiteContext } from 'expo-sqlite'

export type TargetDatabase = {
    id: number
    name: string
    amount: number
    accumulated: number
}

export type SummaryDatabase = {
    total: number
    input: number
    output: number
}

type CreateTargetDTO = {
    name: string
    amount: number
}

type UpdateTargetDTO = {
    id: number
    name: string
    amount: number
}

export function useTargetDatabase() {
    const db = useSQLiteContext()

    async function create({ name, amount }: CreateTargetDTO) {
        const result = await db.runAsync(
            'INSERT INTO targets (name, amount) VALUES ($name, $amount)',
            {
                $name: name.trim(),
                $amount: amount,
            }
        )

        return result.lastInsertRowId
    }

    async function update({ id, name, amount }: UpdateTargetDTO) {
        await db.runAsync(
            `
      UPDATE targets
      SET
        name = $name,
        amount = $amount,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $id
      `,
            {
                $id: id,
                $name: name.trim(),
                $amount: amount,
            }
        )
    }

    async function findAll() {
        const response = await db.getAllAsync<TargetDatabase>(`
    SELECT
      t.id,
      t.name,
      t.amount,
      COALESCE(SUM(tr.amount), 0) AS accumulated
    FROM targets t
    LEFT JOIN transactions tr ON tr.target_id = t.id
    GROUP BY t.id, t.name, t.amount, t.updated_at
    ORDER BY
      CASE
        WHEN t.amount > 0 THEN
          CASE
            WHEN COALESCE(SUM(tr.amount), 0) / t.amount > 1 THEN 1
            WHEN COALESCE(SUM(tr.amount), 0) / t.amount < 0 THEN 0
            ELSE COALESCE(SUM(tr.amount), 0) / t.amount
          END
        ELSE 0
      END DESC,
      t.updated_at DESC
  `)

        return response
    }

    async function findById(id: number) {
        const response = await db.getFirstAsync<TargetDatabase>(
            `
      SELECT
        t.id,
        t.name,
        t.amount,
        COALESCE(SUM(tr.amount), 0) AS accumulated
      FROM targets t
      LEFT JOIN transactions tr ON tr.target_id = t.id
      WHERE t.id = $id
      GROUP BY t.id, t.name, t.amount
      `,
            {
                $id: id,
            }
        )

        return response
    }

    async function getSummary() {
        const response = await db.getFirstAsync<SummaryDatabase>(`
      SELECT
        COALESCE(SUM(amount), 0) AS total,
        COALESCE(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END), 0) AS input,
        COALESCE(SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END), 0) AS output
      FROM transactions
    `)

        return {
            total: response?.total ?? 0,
            input: response?.input ?? 0,
            output: response?.output ?? 0,
        }
    }

    return {
        create,
        update,
        findAll,
        findById,
        getSummary,
    }
}