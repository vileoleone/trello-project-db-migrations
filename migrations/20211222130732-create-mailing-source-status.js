const { dataType } = require('db-migrate-shared')
const { STRING } = dataType

exports.up = async (db) => {
  await db.addColumn('mailing_sources', 'source_status', { type: STRING, length: 15, notNull: true })
}

exports.down = async (db) => {
  await db.removeColumn('mailing_sources', 'source_status')
}
