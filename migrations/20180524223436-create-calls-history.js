const {dataType} = require('db-migrate-shared')
const {STRING, BIGINT, TEXT, DATE_TIME} = dataType
const callHistoryTable = 'call_history'
const callsTable = 'calls'
const queuesTable = 'queues'

exports.up = async (db) => {
  await db.createTable(callHistoryTable, {
    id: {type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true},
    call_id: {type: STRING, notNull: true, length: 128},
    created_at: {type: DATE_TIME, notNull: true},
    event: {type: STRING, notNull: true, length: 30},
    queue_id: {type: STRING, length: 128},
    event_info: {type: TEXT, notNull: true}
  })
  await db.addForeignKey(callHistoryTable, callsTable, 'fk_call_history_calls', {call_id: 'id'}, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
  await db.addIndex(callHistoryTable, 'index_call_history_call_id', ['call_id'])

  await db.addForeignKey(callHistoryTable, queuesTable, 'fk_call_history_queue', {queue_id: 'id'}, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
  await db.addIndex(callHistoryTable, 'index_call_history_queue_id', ['queue_id'])

  await db.addIndex(callHistoryTable, 'index_call_history_created_at', ['created_at'])
}

exports.down = (db) => (
  db.dropTable(callHistoryTable)
)
