const { dataType } = require('db-migrate-shared')
const { STRING, BIGINT, DATE_TIME, INTEGER } = dataType

exports.up = async (db) => {
  await db.createTable('email_attendances', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    bot_id: { type: BIGINT, notNull: true },
    queue_id: { notNull: true, type: STRING, length: 128 },
    latest_agent_id: { type: INTEGER },

    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    updated_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    finished_at: { type: DATE_TIME },

    messages: { type: INTEGER, defaultValue: 0 },

    direction: { type: 'ENUM', length: "'IN','OUT','AUTO'", notNull: true },
    status: { type: 'ENUM', length: "'PENDING','OFFERING','ONGOING','FINISHED'", notNull: true }
  })

  await db.addIndex('email_attendances', 'index_email_attendance_bot', ['bot_id'])
  await db.addIndex('email_attendances', 'index_email_attendance_queue', ['queue_id'])
  await db.addIndex('email_attendances', 'index_email_attendance_agent', ['latest_agent_id'])
}

exports.down = (db) => (
  db.dropTable('email_attendances')
)
