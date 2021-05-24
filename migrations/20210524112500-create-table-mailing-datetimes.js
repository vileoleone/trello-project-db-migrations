const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME } = dataType

exports.up = async (db) => {
  await db.createTable('mailing_datetimes', {
    mailing_column_id: { type: BIGINT, notNull: true },
    mailing_contact_id: { type: BIGINT, notNull: true },
    mailing_column_value: { type: DATE_TIME, notNull: true },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: DATE_TIME, notNull: false }
  })

  await db.addIndex('mailing_datetimes', 'idx_mailing_datetimes', ['mailing_column_id', 'mailing_contact_id', 'deleted_at'], true)
  await db.addIndex('mailing_datetimes', 'idx_mailing_datetimes_value', ['mailing_column_value'])

  await db.addForeignKey('mailing_datetimes', 'mailing_columns', 'fk_mailing_datetimes_column', { mailing_column_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addForeignKey('mailing_datetimes', 'mailing_contacts', 'fk_mailing_datetimes_contact', { mailing_contact_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}

exports.down = (db) => (
  db.dropTable('mailing_datetimes')
)
