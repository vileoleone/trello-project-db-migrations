const {dataType} = require('db-migrate-shared')
const {STRING, BIG_INTEGER, INTEGER} = dataType
const callsHistoryTable = 'calls_history'

exports.up = async (db) => {
  await db.createTable(callsHistoryTable, {
    id: {type: BIG_INTEGER, notNull: true, primaryKey: true, autoIncrement: true},
    call_id: {type: STRING, length: 100, notNull: true},
    agent_id: {type: INTEGER, notNull: false},
    timestamp: {type: BIG_INTEGER, length: 20, notNull: true},
    status: {type: STRING, length: 30, notNull: true},
    queue: {type: STRING, length: 250},
    data1: {type: STRING, length: 250},
    data2: {type: STRING, length: 250},
    data3: {type: STRING, length: 250},
    data4: {type: STRING, length: 250}
  })

  const unique = true
  const indexName = 'unique_calls_history'
  const indexFields = ['call_id', 'status', 'timestamp']
  await db.addIndex(callsHistoryTable, indexName, indexFields, unique)
}

exports.down = (db) => (
  db.dropTable(callsHistoryTable)
)
