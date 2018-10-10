import execute from '../lib/execute'

export default async (db, dbName, queueId) => {
  const sql = `
  SELECT *
  FROM ${dbName}.queues
  WHERE id = ?
  `
  const result = await execute(db, sql, [queueId])
  const rawQueue = result[0]

  return {
    id: rawQueue.id,
    name: rawQueue.name,
    description: rawQueue.description,
    directionIn: (rawQueue.direction_in === 1),
    directionOut: (rawQueue.direction_out === 1),
    directionAuto: (rawQueue.direction_auto === 1)
  }
}
