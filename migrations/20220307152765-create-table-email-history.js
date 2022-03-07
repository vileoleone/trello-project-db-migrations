const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, STRING, INTEGER } = dataType

exports.up = async (db) => {
  await db.createTable('email_history', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    email_attendance_id: { type: BIGINT, notNull: true },
    email_message_id: { type: BIGINT, notNull: true },
    agent_id: { type: INTEGER },
    queue_id: { notNull: true, type: STRING, length: 128 },
    status: { type: 'ENUM', length: "'SEND_PENDING','SEND_DONE','ANSWER_PENDING','ANSWER_DONE','OFFERING','REJECTED','ACCEPTED','TIMEOUT'", notNull: true },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' }
  })

  await db.addIndex('email_history', 'index_email_history_queue', ['queue_id'])
  await db.addIndex('email_history', 'index_email_history_agent', ['agent_id'])
  await db.addIndex('email_history', 'index_email_history_message', ['email_message_id'])
  await db.addIndex('email_history', 'index_email_history_attendance', ['email_attendance_id'])
}

exports.down = (db) => (
  db.dropTable('email_history')
)
