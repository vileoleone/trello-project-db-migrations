const { dataType } = require('db-migrate-shared')
const { STRING } = dataType

exports.up = async (db) => {
  await db.addColumn('mailing_contacts', 'contact_name', { type: STRING, length: 256 })
}

exports.down = async (db) => {
  await db.removeColumn('mailing_contacts', 'contact_name')
}
