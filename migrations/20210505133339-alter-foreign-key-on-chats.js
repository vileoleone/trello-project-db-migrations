const { dataType } = require('db-migrate-shared')
const { BIGINT, STRING } = dataType

exports.up = async (db) => {
  await db.removeForeignKey('chats', 'fk_chat_bot_id')
  await db.removeColumn('chats', 'bot_id')

  await db.addColumn('chats', 'bot_id', { type: BIGINT, notNull: true })
  await db.addForeignKey('chats', 'bots', 'fk_chat_bot_id', { bot_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}

exports.down = async (db) => {
  await db.removeForeignKey('chats', 'fk_chat_bot_id')
  await db.removeColumn('chats', 'bot_id')

  await db.addColumn('chats', 'bot_id', { type: STRING, length: 128, notNull: true })
  await db.addForeignKey('chats', 'bots', 'fk_chat_bot_id', { bot_id: 'application_id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}
