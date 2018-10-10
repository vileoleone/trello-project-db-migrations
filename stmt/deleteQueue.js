import execute from '../lib/execute'

export default async (db, dbName, queueId) => {
  const sql = `DELETE FROM ${dbName}.queues WHERE id = ?`
  const result = await execute(db, sql, [queueId])
  return (result.affectedRows === 1)
}
