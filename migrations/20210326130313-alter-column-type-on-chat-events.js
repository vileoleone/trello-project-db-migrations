const { dataType } = require('db-migrate-shared')
const { DATE_TIME, STRING, BIGINT } = dataType

exports.up = async (db) => {
  await db.dropTable('chat_events')

  await db.createTable('chat_history', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    event: { notNull: true, type: 'ENUM', length: "'START', 'OFFERING', 'FINISHED', 'REJECTED', 'ACCEPTED', 'TIMEOUT'" },
    chat_id: { type: BIGINT, notNull: true },
    chat_info: { type: STRING, length: 250 },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' }
  })

  await db.addForeignKey('chat_history', 'chats', 'fk_chat_history_chats', { chat_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}

exports.down = async (db) => {
  await db.dropTable('chat_history')

  await db.createTable('chat_events', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    type: { type: STRING, length: 35, notNull: true },
    chat_info: { type: STRING, length: 250, notNull: true },
    chat_id: { type: BIGINT, notNull: true },
    created_at: { type: DATE_TIME, notNull: true }
  })
}
