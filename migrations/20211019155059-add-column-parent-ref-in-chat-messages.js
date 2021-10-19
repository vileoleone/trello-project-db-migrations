const { dataType } = require('db-migrate-shared')
const { STRING } = dataType

exports.up = async (db) => {
  await db.removeColumn('chat_messages', 'parent_id')
  await db.addColumn('chat_messages', 'parent_ref', { type: STRING, length: 256 })
}

exports.down = async (db) => {
  await db.removeColumn('chat_messages', 'parent_ref')
  await db.addColumn('chat_messages', 'parent_id', { type: STRING, length: 256 })
}
