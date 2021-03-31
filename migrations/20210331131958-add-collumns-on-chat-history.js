const { dataType } = require('db-migrate-shared')
const { STRING, INTEGER } = dataType

exports.up = async (db) => {
  await db.addColumn('chat_history', 'queue_id', { type: STRING, length: 128 })
  await db.addForeignKey('chat_history', 'queues', 'fk_queue_history', { queue_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addColumn('chat_history', 'agent_id', { type: INTEGER })
  await db.addForeignKey('chat_history', 'agents', 'fk_agent_history', { agent_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}

exports.down = async (db) => {
  await db.removeColumn('chat_history', 'agent_id')
  await db.removeColumn('chat_history', 'queue_id')
}
