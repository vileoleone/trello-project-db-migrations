const { dataType } = require('db-migrate-shared')
const { INTEGER, BIGINT, DATE_TIME } = dataType

exports.up = async (db) => {
  await db.createTable('chat_sessions', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    event: { notNull: true, type: 'ENUM', length: "'CONNECT', 'DISCONNECT'" },
    agent_id: { type: INTEGER, notNull: true },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' }
  })
}

exports.down = async (db) => {
  await db.dropTable('chat_sessions')
}
