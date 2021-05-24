const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, DECIMAL } = dataType

exports.up = async (db) => {
  await db.createTable('mailing_numbers', {
    mailing_column_id: { type: BIGINT, notNull: true },
    mailing_contact_id: { type: BIGINT, notNull: true },
    mailing_column_value: { type: DECIMAL, length: '15,3', notNull: true },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: DATE_TIME, notNull: false }
  })

  await db.addIndex('mailing_numbers', 'idx_mailing_numbers', ['mailing_column_id', 'mailing_contact_id', 'deleted_at'], true)
  await db.addIndex('mailing_numbers', 'idx_mailing_numbers_value', ['mailing_column_value'])

  await db.addForeignKey('mailing_numbers', 'mailing_columns', 'fk_mailing_numbers_column', { mailing_column_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addForeignKey('mailing_numbers', 'mailing_contacts', 'fk_mailing_numbers_contact', { mailing_contact_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}

exports.down = (db) => (
  db.dropTable('mailing_numbers')
)
