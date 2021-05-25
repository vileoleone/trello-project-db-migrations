const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, STRING } = dataType

exports.up = async (db) => {
  await db.createTable('mailing_column_emails', {
    mailing_contact_id: { type: BIGINT, notNull: true },
    mailing_column_id: { type: BIGINT, notNull: true },
    mailing_column_value: { type: STRING, length: 127, notNull: true },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: BIGINT, notNull: true, defaultValue: 0 }
  })

  await db.runSql('ALTER TABLE mailing_column_emails ADD CONSTRAINT pk_mailing_column_emails PRIMARY KEY (mailing_contact_id, mailing_column_id, deleted_at)')
}

exports.down = (db) => (
  db.dropTable('mailing_column_emails')
)
