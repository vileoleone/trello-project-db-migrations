const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, STRING, TEXT, INTEGER } = dataType

exports.up = async (db) => {
  await db.createTable('mailing_sources', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    queue_id: { notNull: true, type: STRING, length: 128 },

    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    uploaded_at: { type: DATE_TIME, notNull: false },
    seeded_at: { type: DATE_TIME, notNull: false },
    deleted_at: { type: DATE_TIME, notNull: false },

    source_key: { type: STRING, length: 256, notNull: true },
    source_name: { type: STRING, length: 256, notNull: true },
    source_mime: { type: STRING, length: 15, notNull: true },
    source_size: { type: BIGINT, notNull: true, defaultValue: 0 },
    source_contacts: { type: INTEGER, notNull: true, defaultValue: 0 },
    source_preferences: { type: TEXT, notNull: true }
  })

  await db.addIndex('mailing_sources', 'idx_mailing_sources_queue', ['queue_id'])
  await db.addIndex('mailing_sources', 'idx_mailing_sources_key', ['source_key'], true)
  await db.addForeignKey('mailing_sources', 'queues', 'fk_mailing_sources_queue', { queue_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}

exports.down = async (db) => (
  db.dropTable('mailing_sources')
)
