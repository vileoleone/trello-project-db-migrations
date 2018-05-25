const {dataType} = require('db-migrate-shared')
const {STRING} = dataType
const queuesTable = 'queues'
const callsTable = 'calls'

exports.up = async (db) => {
  await db.createTable(queuesTable, {
    id: {type: STRING, length: 128, notNull: true, primaryKey: true}
  })
  await db.addColumn(callsTable, 'queue_id', {type: STRING, length: 128, notNull: true})
  await db.addForeignKey(callsTable, queuesTable, 'fk_calls_queues', { queue_id: 'id' }, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
  await db.addIndex(callsTable, 'index_calls_queue_id', ['queue_id'])
}

exports.down = async (db) => {
  await db.removeForeignKey(callsTable, 'fk_calls_queues')
  await db.removeIndex(callsTable, 'index_calls_queue_id')
  await db.removeColumn(callsTable, 'queue_id')
  await db.dropTable(queuesTable)
}
