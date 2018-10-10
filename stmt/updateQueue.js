const execute = require('../lib/execute')

module.exports = async (db, dbName, params) => {
  const sql = `
  UPDATE ${dbName}.queues SET
    name = ?,
    description = ?,
    direction_in = ?,
    direction_out = ?,
    direction_auto = ?
  WHERE id = ?
  `
  const result = await execute(db, sql, [
    params.name,
    params.description,
    params.directionIn ? 1 : 0,
    params.directionOut ? 1 : 0,
    params.directionAuto ? 1 : 0,
    params.id
  ])
  return (result.affectedRows === 1)
}
