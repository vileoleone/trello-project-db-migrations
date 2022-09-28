const { dataType } = require('db-migrate-shared')
const { STRING } = dataType

exports.up = async (db) => {
  await db.addColumn('entry_numbers', 'timezone', { type: STRING, notNull: true })
}

exports.down = async (db) => {
  await db.addColumn('entry_numbers', 'timezone', { type: STRING, notNull: true })
}
