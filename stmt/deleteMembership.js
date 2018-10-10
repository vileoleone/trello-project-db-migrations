import execute from '../lib/execute'

export default async (db, dbName, agentId) => {
  const sql = `
  DELETE FROM ${dbName}.memberships
  WHERE agent_id = ?
  `
  return execute(db, sql, [agentId])
}
