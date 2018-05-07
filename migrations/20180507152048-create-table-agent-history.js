const {dataType} = require('db-migrate-shared')
const {STRING, BIG_INTEGER, SMALL_INTEGER, INTEGER} = dataType
const notNull = true
const agentsHistoryTable = 'agents_history'

const agentIdForeignKey = {
  name: 'fk_agents_history_agent_id',
  table: 'agents',
  mapping: 'id',
  rules: {
    onDelete: 'CASCADE'
  }
}

const callIdForeignKey = {
  name: 'fk_agents_history_call_id',
  table: 'calls',
  mapping: 'call_id',
  rules: {
    onDelete: 'SET NULL'
  }
}

exports.up = async (db) => {
  await db.createTable(agentsHistoryTable, {
    id: {type: BIG_INTEGER, notNull: true, primaryKey: true, autoIncrement: true},
    agent_id: {type: INTEGER, notNull: true, foreignKey: agentIdForeignKey},
    timestamp: {type: BIG_INTEGER, length: 20, notNull},
    status: {type: STRING, length: 30},
    talking_queue: {type: STRING, length: 250},
    talking_call_id: {type: STRING, length: 100}
  })

  await db.addForeignKey(agentsHistoryTable, callIdForeignKey.table, callIdForeignKey.name, {
    talking_call_id: callIdForeignKey.mapping
  }, callIdForeignKey.rules)
}

exports.down = (db) => (
  db.dropTable(agentsHistoryTable)
)
