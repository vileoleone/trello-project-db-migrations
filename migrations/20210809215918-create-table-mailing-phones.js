const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, STRING, BOOLEAN } = dataType

exports.up = async (db) => {
  await db.createTable('mailing_phones', {
    mailing_contact_id: { type: BIGINT, notNull: true },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: BIGINT, notNull: true, defaultValue: 0 },

    phone_status: { type: STRING, length: 15, notNull: true, defaultValue: 'PENDING' },
    phone_order: { type: BIGINT, notNull: true, defaultValue: 0 },
    phone_number: { type: STRING, length: 23, notNull: true },
    phone_retried: { type: BIGINT, notNull: true, defaultValue: 0 },
    phone_answered: { type: BOOLEAN, notNull: true, defaultValue: false }
  })

  await db.runSql('ALTER TABLE mailing_phones ADD CONSTRAINT pk_mailing_phones PRIMARY KEY (mailing_contact_id, phone_number, deleted_at)')
}

exports.down = (db) => (
  db.dropTable('mailing_phones')
)
