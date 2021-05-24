const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, STRING } = dataType

exports.up = async (db) => {
  await db.createTable('mailing_categories', {
    mailing_column_id: { type: BIGINT, notNull: true },
    mailing_contact_id: { type: BIGINT, notNull: true },
    mailing_column_value: { type: STRING, length: 255, notNull: true },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: DATE_TIME, notNull: false }
  })

  await db.addIndex('mailing_categories', 'idx_mailing_categories_column', ['mailing_column_id', 'deleted_at'])
  await db.addIndex('mailing_categories', 'idx_mailing_categories_contact', ['mailing_contact_id', 'deleted_at'])
  await db.addIndex('mailing_categories', 'idx_mailing_categories_value', ['mailing_column_value'])

  await db.addForeignKey('mailing_categories', 'mailing_columns', 'fk_mailing_categories_column', { mailing_column_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addForeignKey('mailing_categories', 'mailing_contacts', 'fk_mailing_categories_contact', { mailing_contact_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}

exports.down = (db) => (
  db.dropTable('mailing_categories')
)
