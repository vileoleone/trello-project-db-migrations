const { dataType } = require('db-migrate-shared')
const { DATE_TIME } = dataType

exports.up = async (db) => {
  await db.addColumn('patterns', 'deleted_at', { type: DATE_TIME })
}

exports.down = async (db) => {
  await db.removeColumn('patterns', 'deleted_at')
}
