const {dataType} = require('db-migrate-shared')
const {STRING, BIG_INTEGER} = dataType
const callsTable = 'calls'

exports.up = (db) => (
  db.createTable(callsTable, {
    call_id: {type: STRING, length: 100, unique: true, notNull: true, primaryKey: true},
    timestamp: {type: BIG_INTEGER, length: 20, notNull: true},
    status: {type: STRING, length: 30, notNull: true},
    queue: {type: STRING, length: 250},
    number: {type: STRING, length: 32, notNull: true}
  })
)

exports.down = (db) => (
  db.dropTable(callsTable)
)
