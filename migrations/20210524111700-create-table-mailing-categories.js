const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, STRING } = dataType

exports.up = async (db) => {
  await db.createTable('mailing_categories', {
    mailing_contact_id: { type: BIGINT, notNull: true },
    mailing_column_id: { type: BIGINT, notNull: true },
    mailing_column_value: { type: STRING, length: 255, notNull: true },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: BIGINT, notNull: true, defaultValue: 0 }
  })

  await db.runSql('ALTER TABLE mailing_categories ADD CONSTRAINT pk_mailing_categories PRIMARY KEY (mailing_contact_id, mailing_column_id, deleted_at)')
  await db.addIndex('mailing_categories', 'idx_mailing_categories_value', ['mailing_column_value'])
}

exports.down = (db) => (
  db.dropTable('mailing_categories')
)
