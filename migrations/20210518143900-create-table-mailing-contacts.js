const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, STRING, INTEGER } = dataType

const contactStatus = '"IMPORTED", "UNSCHEDULED", "SCHEDULED", "DIALING", "ANSWERED", "CONNECTED", "RESCHEDULED", "FINISHED"'

exports.up = async (db) => {
  await db.createTable('mailing_contacts', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },

    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    updated_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: DATE_TIME, notNull: false },
    scheduled_at: { type: DATE_TIME, notNull: false },

    queue_id: { notNull: true, type: STRING, length: 128 },
    contact_id: { type: STRING, length: 255, notNull: true },
    contact_status: { type: 'ENUM', length: contactStatus, notNull: true, defaultValue: 'IMPORTED' },
    contact_retries: { type: INTEGER, notNull: true, defaultValue: 0 }
  })

  await db.addIndex('mailing_contacts', 'idx_mailing_contacts', ['queue_id', 'contact_id', 'deleted_at'], true)
  await db.addIndex('mailing_contacts', 'idx_mailing_contacts_status', ['contact_status'])
  await db.addForeignKey('mailing_contacts', 'queues', 'fk_mailing_contacts_queue', { queue_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}

exports.down = async (db) => (
  db.dropTable('mailing_contacts')
)
