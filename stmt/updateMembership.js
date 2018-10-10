const execute = require('../lib/execute')

module.exports = async (db, dbName, membership) => {
  const sql = `
  UPDATE ${dbName}.memberships
  SET penalty = ?
  WHERE agent_id = ?
  AND queue_id = ?
  `
  const { penalty, agentId, queueId } = membership
  return execute(db, sql, [penalty, agentId, queueId])
}
