const execute = require('../lib/execute')

module.exports = async (db, dbName, queueId) => {
  const sql = `
  SELECT COUNT(*) AS qtd
  FROM ${dbName}.queues
  WHERE queues.id like ?
  `
  const result = await execute(db, sql, [queueId])
  const queuesCount = result[0].qtd
  return queuesCount === 1
}
