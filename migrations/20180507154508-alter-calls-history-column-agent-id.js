const {dataType} = require('db-migrate-shared')
const {STRING, BIG_INTEGER, SMALL_INTEGER, INTEGER} = dataType
const callsHistoryTable = 'calls_history'
const agentsTable = 'agents'
const fkAgentId = 'fk_calls_history_agent_id'

exports.up = (db) => (
  db.addForeignKey(callsHistoryTable, agentsTable, fkAgentId, {
    agent_id: 'id'
  }, {onDelete: 'SET NULL'})
)

exports.down = (db) => (
  db.removeForeignKey(callsHistoryTable, fkAgentId, {dropIndex: true})
)
