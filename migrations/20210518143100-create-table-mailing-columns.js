const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, STRING } = dataType

exports.up = async (db) => {
  await db.createTable('mailing_columns', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },

    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    updated_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: DATE_TIME, notNull: false },

    queue_id: { notNull: true, type: STRING, length: 128 },
    column_type: { type: STRING, length: 36, notNull: true },
    column_label: { type: STRING, length: 255, notNull: true }
  })

  await db.addIndex('mailing_columns', 'idx_mlng_cls', ['queue_id', 'column_type', 'column_label', 'deleted_at'], true)
  await db.addForeignKey('mailing_columns', 'queues', 'fk_mlng_cls', { queue_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}

exports.down = async (db) => (
  db.dropTable('mailing_columns')
)
