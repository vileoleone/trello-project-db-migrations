const { dataType } = require('db-migrate-shared')
const { STRING } = dataType

exports.up = async (db) => {
  await db.addColumn('mailing_phones', 'national_number', { type: STRING, length: 23, notNull: true })
}

exports.down = async (db) => {
  await db.removeColumn('mailing_phones', 'national_number')
}
