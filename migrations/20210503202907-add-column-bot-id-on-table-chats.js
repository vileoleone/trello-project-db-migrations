const { dataType } = require('db-migrate-shared')
const { STRING } = dataType

exports.up = async (db) => {
  await db.addColumn('chats', 'bot_id', { type: STRING, length: 128, notNull: true })
  await db.addForeignKey('chats', 'bots', 'fk_chat_bot_id', { bot_id: 'application_id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}

exports.down = async (db) => {
  await db.removeForeignKey('chats', 'fk_bot_application_id')
  await db.removeColumn('chats', 'bot_id')
}
