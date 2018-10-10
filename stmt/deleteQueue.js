const execute = require('../lib/execute')

module.exports = async (db, dbName, queueId) => {
  const sql = `DELETE FROM ${dbName}.queues WHERE id = ?`
  const result = await execute(db, sql, [queueId])
  return (result.affectedRows === 1)
}
