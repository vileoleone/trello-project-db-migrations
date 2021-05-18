const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, STRING, INTEGER, BOOLEAN } = dataType

exports.up = async (db) => {
  await db.createTable('mailing_columns', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    mailing_source_id: { notNull: true, type: BIGINT },

    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    updated_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: DATE_TIME, notNull: false },

    column_type: { type: STRING, length: 36, notNull: true },
    column_label: { type: STRING, length: 256, notNull: true },
    column_order: { type: INTEGER, notNull: true },
    column_errors: { type: BOOLEAN, notNull: true, defaultValue: false }
  })

  await db.addIndex('mailing_columns', 'idx_mailing_columns_source', ['mailing_source_id'])
  await db.addForeignKey('mailing_columns', 'mailing_sources', 'fk_mailing_columns_source', { mailing_source_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}

exports.down = async (db) => (
  db.dropTable('mailing_columns')
)
