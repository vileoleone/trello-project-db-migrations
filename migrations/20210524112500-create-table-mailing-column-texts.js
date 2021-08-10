const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, STRING } = dataType

exports.up = async (db) => {
  await db.createTable('mailing_column_texts', {
    mailing_contact_id: { type: BIGINT, notNull: true },
    mailing_column_id: { type: BIGINT, notNull: true },
    mailing_column_value: { type: STRING, length: 255, notNull: true },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: BIGINT, notNull: true, defaultValue: 0 }
  })

  await db.runSql('ALTER TABLE mailing_column_texts ADD CONSTRAINT pk_mailing_column_texts PRIMARY KEY (mailing_contact_id, mailing_column_id, deleted_at)')
  await db.runSql('CREATE FULLTEXT INDEX idx_mailing_column_texts_value ON mailing_column_texts(mailing_column_value)')
}

exports.down = (db) => (
  db.dropTable('mailing_column_texts')
)