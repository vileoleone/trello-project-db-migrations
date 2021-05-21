const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, INTEGER, BOOLEAN } = dataType

exports.up = async (db) => {
  await db.createTable('mailings_columns', {
    mailing_source_id: { type: BIGINT, notNull: true },

    mailing_column_id: { type: BIGINT, notNull: true },
    mailing_column_order: { type: INTEGER, notNull: true },
    mailing_column_errors: { type: BOOLEAN, notNull: true, defaultValue: false },

    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: DATE_TIME, notNull: false }
  })

  await db.addIndex('mailings_columns', 'idx_mlngs_cls', ['mailing_source_id', 'mailing_column_id', 'deleted_at'])
  await db.addForeignKey('mailings_columns', 'mailing_sources', 'fk_mlngs_cls_src', { mailing_source_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addForeignKey('mailings_columns', 'mailing_columns', 'fk_mlngs_cls', { mailing_column_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}

exports.down = (db) => (
  db.dropTable('mailings_columns')
)
