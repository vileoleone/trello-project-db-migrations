const {dataType} = require('db-migrate-shared')
const {STRING, BIG_INTEGER, SMALL_INTEGER, INTEGER} = dataType
const notNull = true
const callsHistoryTable = 'calls_history'

const callIdForeignKey = {
  name: 'fk_calls_history_call_id',
  table: 'calls',
  mapping: 'call_id',
  rules: {
    onDelete: 'CASCADE'
  }
}

exports.up = (db) => (
  db.createTable(callsHistoryTable, {
    id: {type: BIG_INTEGER, notNull: true, primaryKey: true, autoIncrement: true},
    call_id: {type: STRING, length: 100, notNull: true, foreignKey: callIdForeignKey},
    agent_id: {type: INTEGER},
    timestamp: {type: BIG_INTEGER, length: 20, notNull},
    status: {type: SMALL_INTEGER, notNull},
    queue: {type: STRING, length: 250},
    data1: {type: STRING, length: 250},
    data2: {type: STRING, length: 250},
    data3: {type: STRING, length: 250},
    data4: {type: STRING, length: 250}
  })
)

exports.down = (db) => (
  db.dropTable(callsHistoryTable, {
    ifExists: true
  })
)
