const execute = require('../lib/execute')
const timestampSecsToDate = require('../lib/timestampSecsToDate')

module.exports = async (db, dbName, params, updatedAt) => {
  const sql = `
  UPDATE ${dbName}.agents SET
    name = ?,
    password = ?,
    default_queue_id = ?,
    active = ?,
    updated_at = ?
  WHERE id = ?
  `
  const paramActive = params.active ? 1 : 0
  const result = await execute(db, sql, [
    params.name,
    params.password,
    params.queue,
    paramActive,
    timestampSecsToDate(updatedAt),
    params.registration
  ])
  return (result.affectedRows === 1)
}
