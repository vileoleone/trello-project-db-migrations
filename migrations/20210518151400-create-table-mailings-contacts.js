const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME } = dataType

exports.up = async (db) => {
  await db.createTable('mailings_contacts', {
    mailing_source_id: { type: BIGINT, notNull: true },
    mailing_contact_id: { type: BIGINT, notNull: true },

    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: DATE_TIME, notNull: false }
  })

  await db.addIndex('mailings_contacts', 'idx_mailings_contacts', ['mailing_source_id', 'mailing_contact_id', 'deleted_at'])
  await db.addForeignKey('mailings_contacts', 'mailing_sources', 'fk_mailings_contacts_source', { mailing_source_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addForeignKey('mailings_contacts', 'mailing_contacts', 'fk_mailings_contacts_contact', { mailing_contact_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}

exports.down = (db) => (
  db.dropTable('mailings_contacts')
)
