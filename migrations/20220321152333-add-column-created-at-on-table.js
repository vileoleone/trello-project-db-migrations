const { dataType } = require('db-migrate-shared')
const { DATE_TIME } = dataType

exports.up = async (db) => {
  await db.addColumn('pending_settings', 'created_at', { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' })
}

exports.down = async (db) => {
  await db.removeColumn('pending_settings', 'created_at')
}
