const { dataType } = require('db-migrate-shared')
const { STRING } = dataType

exports.up = async (db) => (
  db.addColumn('entry_numbers', 'timezone', { type: STRING, notNull: true })
)
