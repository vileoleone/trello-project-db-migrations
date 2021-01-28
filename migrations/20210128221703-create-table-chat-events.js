const { dataType } = require('db-migrate-shared')
const { STRING, BIGINT, DATE_TIME } = dataType

exports.up = async (db) => {
  await db.createTable('chat_events', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    type: { type: STRING, length: 35, notNull: true },
    chat_info: { type: STRING, length: 250, notNull: true },
    chat_id: { type: BIGINT, notNull: true },
    created_at: { type: DATE_TIME, notNull: true }
  })
}

exports.down = async (db) => {
  await db.dropTable('chat_events')
}
