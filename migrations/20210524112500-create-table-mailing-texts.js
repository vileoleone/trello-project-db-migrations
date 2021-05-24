const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, STRING } = dataType

exports.up = async (db) => {
  await db.createTable('mailing_texts', {
    mailing_column_id: { type: BIGINT, notNull: true },
    mailing_contact_id: { type: BIGINT, notNull: true },
    mailing_column_value: { type: STRING, length: 255, notNull: true },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: DATE_TIME, notNull: false }
  })

  await db.addIndex('mailing_texts', 'idx_mailing_texts', ['mailing_column_id', 'mailing_contact_id', 'deleted_at'], true)
  await db.runSql('CREATE FULLTEXT INDEX idx_mailing_texts_value ON mailing_texts(mailing_column_value)')

  await db.addForeignKey('mailing_texts', 'mailing_columns', 'fk_mailing_texts_column', { mailing_column_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addForeignKey('mailing_texts', 'mailing_contacts', 'fk_mailing_texts_contact', { mailing_contact_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}

exports.down = (db) => (
  db.dropTable('mailing_texts')
)
