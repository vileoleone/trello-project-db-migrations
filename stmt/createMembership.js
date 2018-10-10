import execute from '../lib/execute'

export default async (db, dbName, membership) => {
  const sql = `
  INSERT INTO ${dbName}.memberships
  (queue_id, agent_id, penalty, status)
  VALUES 
  (?, ?, ?, ?)
  `
  const { queueId, agentId, penalty, status } = membership
  return execute(db, sql, [queueId, agentId, penalty, status])
}
