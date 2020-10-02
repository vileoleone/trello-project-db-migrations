const { dataType } = require('db-migrate-shared')
const { STRING } = dataType

exports.up = async (db) => {
  await db.addColumn('chat_messages', 'ref', { type: STRING, length: 256 })
}

exports.down = async (db) => {
  await db.removeColumn('chat_messages', 'ref')
}
