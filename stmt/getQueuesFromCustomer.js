import execute from '../lib/execute'

export default async (db, dbName) => {
  const sql = `SELECT * FROM ${dbName}.queues`
  const result = await execute(db, sql, [])

  return result.map(row => ({
    id: row.id,
    name: row.name,
    description: row.description,
    directionIn: (row.direction_in === 1),
    directionOut: (row.direction_out === 1),
    directionAuto: (row.direction_auto === 1)
  }))
}
