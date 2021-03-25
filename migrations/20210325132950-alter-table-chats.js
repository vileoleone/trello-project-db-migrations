const { dataType } = require('db-migrate-shared')
const { STRING } = dataType

exports.up = async (db) => {
  await db.changeColumn('chats', 'status', { type: 'ENUM', notNull: true, length: "'PENDING', 'OFFERING', 'ONGOING', 'FINISHED'" })
  await db.changeColumn('chats', 'source', { type: STRING, length: 36, notNull: true })
  await db.changeColumn('chats', 'source_id', { type: STRING, length: 256, notNull: true })
}

exports.down = async (db) => {
  await db.changeColumn('chats', 'status', { type: 'ENUM', length: "'PENDING', 'OFFERING', 'ATTENDANCE'" })
  await db.changeColumn('chats', 'source', { type: STRING, length: 36 })
  await db.changeColumn('chats', 'source_id', { type: STRING, length: 256 })
}
