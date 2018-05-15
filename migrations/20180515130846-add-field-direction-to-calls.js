const {dataType} = require('db-migrate-shared')
const {STRING} = dataType
const callsTable = 'calls'

exports.up = (db) => (
  db.addColumn(callsTable, 'direction', {
    type: STRING,
    length: 4,
    notNull: true
  })
)

exports.down = (db) => (
  db.removeColumn(callsTable, 'direction')
)
