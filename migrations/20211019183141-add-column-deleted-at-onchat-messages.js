const { dataType } = require('db-migrate-shared')
const { DATE_TIME } = dataType

exports.up = async (db) => {
  await db.addColumn('chat_messages', 'deleted_at', { type: DATE_TIME, defaultValue: null })
}

exports.down = async (db) => {
  await db.removeColumn('chat_messages', 'deleted_at')
}
