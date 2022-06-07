const { dataType } = require('db-migrate-shared')
const { STRING } = dataType

exports.up = async (db) => {
  await db.addColumn('mailing_phones', 'phone_id', { type: STRING, length: 128 })
}

exports.down = async (db) => {
  await db.removeColumn('mailing_phones', 'phone_id')
}
