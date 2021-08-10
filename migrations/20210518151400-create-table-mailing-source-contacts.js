const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME } = dataType

exports.up = async (db) => {
  await db.createTable('mailing_source_contacts', {
    mailing_source_id: { type: BIGINT, notNull: true },
    mailing_contact_id: { type: BIGINT, notNull: true },

    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: BIGINT, notNull: true, defaultValue: 0 }
  })

  await db.runSql('ALTER TABLE mailing_source_contacts ADD CONSTRAINT pk_mailing_source_contacts PRIMARY KEY (mailing_source_id, mailing_contact_id, deleted_at)')
}

exports.down = (db) => (
  db.dropTable('mailing_source_contacts')
)