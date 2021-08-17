const { dataType } = require('db-migrate-shared')
const { BOOLEAN } = dataType

exports.up = async (db) => {
  await db.addColumn('mailing_source_columns', 'mailing_column_code', { type: BOOLEAN, notNull: true, defaultValue: false })
}

exports.down = async (db) => {
  await db.removeColumn('mailing_source_columns', 'mailing_column_code')
}
