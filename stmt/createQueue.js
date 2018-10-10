const execute = require('../lib/execute')

module.exports = async (db, dbName, params) => {
  const sql = `
  INSERT INTO ${dbName}.queues
  (id, name, description, direction_in, direction_out, direction_auto)
  VALUES
  (?, ?, ?, ?, ?, ?)
  `
  const result = await execute(db, sql, [
    params.id,
    params.name,
    params.description,
    params.directionIn ? 1 : 0,
    params.directionOut ? 1 : 0,
    params.directionAuto ? 1 : 0
  ])
  return result.affectedRows === 1
}
