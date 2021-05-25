const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, DECIMAL } = dataType

exports.up = async (db) => {
  await db.createTable('mailing_column_numbers', {
    mailing_contact_id: { type: BIGINT, notNull: true },
    mailing_column_id: { type: BIGINT, notNull: true },
    mailing_column_value: { type: DECIMAL, length: '15,3', notNull: true },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: BIGINT, notNull: true, defaultValue: 0 }
  })

  await db.runSql('ALTER TABLE mailing_column_numbers ADD CONSTRAINT pk_mailing_column_numbers PRIMARY KEY (mailing_contact_id, mailing_column_id, deleted_at)')
  await db.addIndex('mailing_column_numbers', 'idx_mailing_column_numbers_value', ['mailing_column_value'])
}

exports.down = (db) => (
  db.dropTable('mailing_column_numbers')
)
