const {dataType} = require('db-migrate-shared')
const {STRING, BIG_INTEGER, INTEGER} = dataType
const agentsTable = 'agents'

exports.up = (db) => (
  db.createTable(agentsTable, {
    id: {type: INTEGER, notNull: true, primaryKey: true, autoIncrement: true},
    status: {type: STRING, length: 30, notNull: true},
    talking_queue: {type: STRING, length: 250},
    talking_call_id: {type: STRING, length: 100, notNull: false}
  })
)

exports.down = (db) => (
  db.dropTable(agentsTable)
)
