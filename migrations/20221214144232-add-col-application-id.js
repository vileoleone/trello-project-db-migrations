const { dataType } = require('db-migrate-shared')
const { STRING } = dataType

exports.up = async (db) => {
  await db.addColumn('mailing_sources', 'application_id', { type: STRING, length: 128 })

  await db.addIndex('mailing_sources', 'idx_mailing_sources_application', ['application_id'])
}

exports.down = async (db) => {
  await db.removeColumn('mailing_sources', 'application_id')
}
