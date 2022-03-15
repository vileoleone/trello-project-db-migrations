const { dataType } = require('db-migrate-shared')
const { DATE_TIME } = dataType

exports.up = async (db) => {
  await db.addColumn('routes', 'deleted_at', { type: DATE_TIME, defaultValue: null })
}

exports.down = async (db) => {
  await db.removeColumn('routes', 'deleted_at')
}
