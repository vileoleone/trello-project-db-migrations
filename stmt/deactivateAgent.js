import execute from '../lib/execute'

export default async (db, dbName, agentId, updatedAt) => {
  const sql = `
  UPDATE ${dbName}.agents SET
  active = 0,
  updated_at = ?
  WHERE id = ?
  `
  const result = await execute(db, sql, [
    updatedAt,
    agentId
  ])
  return (result.affectedRows === 1)
}
