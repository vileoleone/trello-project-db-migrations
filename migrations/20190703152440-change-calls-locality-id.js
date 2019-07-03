const { dataType } = require('db-migrate-shared')
const { CHAR, INTEGER } = dataType

exports.up = async (db) => {
  await db.changeColumn('calls', 'locality_id', { type: CHAR, length: 5 })
}

exports.down = async (db) => {
  await db.changeColumn('calls', 'locality_id', { type: INTEGER })
}
