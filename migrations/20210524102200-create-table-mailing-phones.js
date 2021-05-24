const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, STRING } = dataType

exports.up = async (db) => {
  await db.createTable('mailing_phones', {
    mailing_column_id: { type: BIGINT, notNull: true },
    mailing_contact_id: { type: BIGINT, notNull: true },
    mailing_column_value: { type: STRING, length: 23, notNull: true },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: DATE_TIME, notNull: false }
  })

  await db.addIndex('mailing_phones', 'idx_mailing_phones_column', ['mailing_column_id', 'deleted_at'])
  await db.addIndex('mailing_phones', 'idx_mailing_phones_contact', ['mailing_contact_id', 'deleted_at'])

  await db.addForeignKey('mailing_phones', 'mailing_columns', 'fk_mailing_phones_column', { mailing_column_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addForeignKey('mailing_phones', 'mailing_contacts', 'fk_mailing_phones_contact', { mailing_contact_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}

exports.down = (db) => (
  db.dropTable('mailing_phones')
)
