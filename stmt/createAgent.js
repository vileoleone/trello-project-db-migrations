import execute from '../lib/execute'
import timestampSecsToDate from '../lib/timestampSecsToDate'

export default async (db, dbName, params) => {
  const sql = `
  INSERT INTO ${dbName}.agents (id, name, password, default_queue_id, active, created_at, updated_at) VALUES (?, ?, ?, ?, 1, ?, ?)
  `
  const result = await execute(db, sql, [
    params.registration,
    params.name,
    params.password,
    params.queue,
    timestampSecsToDate(params.createdAt),
    timestampSecsToDate(params.updatedAt)
  ])
  return (result.affectedRows === 1)
}
