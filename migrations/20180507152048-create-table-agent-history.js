const {dataType} = require('db-migrate-shared')
const {STRING, BIG_INTEGER, INTEGER} = dataType
const agentsHistoryTable = 'agents_history'

exports.up = async (db) => {
  await db.createTable(agentsHistoryTable, {
    id: {type: BIG_INTEGER, notNull: true, primaryKey: true, autoIncrement: true},
    agent_id: {type: INTEGER, notNull: true},
    timestamp: {type: BIG_INTEGER, length: 20, notNull: true},
    status: {type: STRING, length: 30, notNull: true},
    talking_queue: {type: STRING, length: 250},
    talking_call_id: {type: STRING, length: 100}
  })
}

exports.down = (db) => (
  db.dropTable(agentsHistoryTable)
)
