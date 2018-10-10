const execute = require('../lib/execute')

module.exports = async (db, dbName, agentId) => {
  const sql = `
  DELETE FROM ${dbName}.memberships
  WHERE agent_id = ?
  `
  return execute(db, sql, [agentId])
}
