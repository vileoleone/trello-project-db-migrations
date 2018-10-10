import execute from '../lib/execute'

export default async (db, dbName, agentId, queueId = null) => {
  if (queueId === null) {
    return deleteByAgent(db, dbName, agentId)
  }
  return deleteByAgentQueue(db, dbName, agentId, queueId)
}

const deleteByAgent = async (db, dbName, agentId) => {
  const sql = `DELETE FROM ${dbName}.memberships WHERE agent_id = ?`
  return execute(db, sql, [agentId])
}

const deleteByAgentQueue = async (db, dbName, agentId, queueId) => {
  const sql = `DELETE FROM ${dbName}.memberships WHERE agent_id = ? and queue_id = ?`
  return execute(db, sql, [agentId, queueId])
}
