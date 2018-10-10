const execute = require('../lib/execute')

module.exports = async (db, dbName, agentId, queueId) => {
  const sql = `
  SELECT COUNT(*) AS qtd
  FROM ${dbName}.memberships
  WHERE agent_id = ?
  AND queue_id = ?
  `
  const result = await execute(db, sql, [agentId, queueId])
  return result[0].qtd === 1
}
