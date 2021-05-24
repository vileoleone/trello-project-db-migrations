const { dataType } = require('db-migrate-shared')
const { CHAR, TEXT, INTEGER, BIGINT, DATE_TIME } = dataType

exports.up = async (db) => {
  await db.createTable('chat_messages', {
    id: { type: CHAR, length: 36, notNull: true, primaryKey: true },
    chat_id: { type: BIGINT, notNull: true },
    message: { type: TEXT },
    order: { type: INTEGER, notNull: true },
    direction: { type: 'ENUM', length: "'IN', 'OUT', 'AUTO'", notNull: true },
    created_at: { type: DATE_TIME, notNull: true },
    sended_at: { type: DATE_TIME },
    readed_at: { type: DATE_TIME },
    answered_at: { type: DATE_TIME }
  })

  await db.addForeignKey('chat_messages', 'chats', 'fk_chat_messages_chats', { chat_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('chat_messages', 'index_chat_messages_chats', ['chat_id'])
}

exports.down = async (db) => {
  await db.dropTable('chat_messages')
}
