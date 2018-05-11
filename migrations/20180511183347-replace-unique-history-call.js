const {dataType} = require('db-migrate-shared')
const {STRING, BIG_INTEGER, INTEGER} = dataType
const callsHistoryTable = 'calls_history'

const unique = true
const oldIndexName = 'unique_calls_history'
const newIndexName = 'unique_calls_history_queue'

exports.up = async (db) => {
  const indexFields = ['call_id', 'status', 'timestamp', 'queue']
  await db.removeIndex(callsHistoryTable, oldIndexName)
  await db.addIndex(callsHistoryTable, newIndexName, indexFields, unique)
}

exports.down = async (db) => {
  const indexFields = ['call_id', 'status', 'timestamp']
  await db.removeIndex(callsHistoryTable, newIndexName)
  await db.addIndex(callsHistoryTable, oldIndexName, indexFields, unique)
}
