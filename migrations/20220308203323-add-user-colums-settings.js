const { dataType } = require('db-migrate-shared')
const { CHAR } = dataType

exports.up = async (db) => (
  await db.addColumn('pending_settings', 'cc_user_id', { type: CHAR, length: 36 })
)

exports.down = async (db) => (
  await db.removeColumn('pending_settings', 'cc_user_id')
)
