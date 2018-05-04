const {dataType} = require('db-migrate-shared')
const {STRING, BIG_INTEGER, SMALL_INTEGER} = dataType
const callId = 'call_id'
const notNull = true
const callsTable = 'calls'

exports.up = (db) => (
  db.createTable(callsTable, {
    [callId]: {type: STRING, length: 100, unique: true, notNull: true, primaryKey: true},
    timestamp: {type: BIG_INTEGER, length: 20, notNull},
    status: {type: SMALL_INTEGER, length: 6, notNull},
    queue: {type: STRING, length: 250, notNull},
    number: {type: STRING, length: 32, notNull}
  })
)

exports.down = (db) => (
  db.dropTable(callsTable, {
    ifExists: true
  })
)
