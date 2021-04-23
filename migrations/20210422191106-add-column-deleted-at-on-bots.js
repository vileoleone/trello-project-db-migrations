const { dataType } = require('db-migrate-shared')
const { DATE_TIME } = dataType

exports.up = async (db) => {
  await db.addColumn('bots', 'deleted_at', { type: DATE_TIME })
}

exports.down = async (db) => {
  await db.removeColumn('bots', 'deleted_at')
}
