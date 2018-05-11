const {dataType} = require('db-migrate-shared')
const {STRING, BIG_INTEGER, INTEGER} = dataType
const agentsHistoryTable = 'agents_history'

const oldIndexName = 'unique_agents_history'
const newIndexName = 'unique_agents_history_call'

exports.up = async (db) => {
  await db.removeIndex(agentsHistoryTable, oldIndexName)

  const unique = true
  const indexFields = ['agent_id', 'status', 'timestamp', 'talking_queue', 'talking_call_id']
  await db.addIndex(agentsHistoryTable, newIndexName, indexFields, unique)
}

exports.down = async (db) => {
  await db.removeIndex(agentsHistoryTable, newIndexName)

  const unique = true
  const indexFields = ['agent_id', 'status', 'timestamp']
  await db.addIndex(agentsHistoryTable, oldIndexName, indexFields, unique)
}
