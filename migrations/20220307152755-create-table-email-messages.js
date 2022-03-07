const { dataType } = require('db-migrate-shared')
const { TEXT, BIGINT, DATE_TIME, STRING, INTEGER } = dataType

exports.up = async (db) => {
  await db.createTable('email_messages', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    email_attendance_id: { type: BIGINT, notNull: true },
    agent_id: { type: INTEGER },

    imap_id: { type: BIGINT, notNull: true },
    message_id: { type: STRING, length: 256, notNull: true },
    original_message_id: { type: STRING, length: 256, notNull: true },

    email_parent_id: { type: BIGINT },
    email_answer_id: { type: BIGINT },

    direction: { type: 'ENUM', length: "'IN','OUT'", notNull: true },
    status: { type: 'ENUM', length: "'SEND_PENDING','SEND_DONE','ANSWER_PENDING','ANSWER_DONE'", notNull: true },

    server_datetime_at: { type: DATE_TIME },
    agent_start_at: { type: DATE_TIME },
    agent_finish_at: { type: DATE_TIME },

    sended_at: { type: DATE_TIME },
    answered_at: { type: DATE_TIME },

    mail_to: { type: TEXT, notNull: true },
    mail_cc: { type: TEXT },
    mail_from: { type: STRING, length: 256, notNull: true },
    mail_subject: { type: STRING, length: 256, notNull: true },
    mail_body: { type: TEXT, notNull: true },
    mail_attachments: { type: TEXT }
  })

  await db.addIndex('email_messages', 'index_email_message_id', ['message_id'])
  await db.addIndex('email_messages', 'index_email_message_imap', ['imap_id'])
  await db.addIndex('email_messages', 'index_email_message_agent', ['agent_id'])
  await db.addIndex('email_messages', 'index_email_message_original', ['original_message_id'])
  await db.addIndex('email_messages', 'index_email_message_attendance', ['email_attendance_id'])
}

exports.down = (db) => (
  db.dropTable('email_messages')
)
