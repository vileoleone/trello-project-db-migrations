const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, INTEGER, BOOLEAN } = dataType

exports.up = async (db) => {
  await db.createTable('mailings_source_columns', {
    mailing_source_id: { type: BIGINT, notNull: true },
    mailing_column_id: { type: BIGINT, notNull: true },
    mailing_column_order: { type: INTEGER, notNull: true, default: 0 },
    mailing_column_errors: { type: BOOLEAN, notNull: true, defaultValue: false },

    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: BIGINT, notNull: true, defaultValue: 0 }
  })

  await db.runSql('ALTER TABLE mailings_source_columns ADD CONSTRAINT pk_mailings_source_columns PRIMARY KEY (mailing_source_id, mailing_column_id, deleted_at)')
}

exports.down = (db) => (
  db.dropTable('mailings_source_columns')
)
