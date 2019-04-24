const { dataType } = require('db-migrate-shared')
const { INTEGER } = dataType

exports.up = async (db) => {
  await db.removeForeignKey('agent_summary', 'fk_agent_summary_queues')
  await db.addColumn('agent_summary', 'call_secs', { type: INTEGER, notNull: true, defaultValue: 0 })
}

exports.down = async (db) => {
  await db.runSql('DELETE FROM agent_summary WHERE queue_id NOT IN (SELECT id FROM queues)')
  await db.addForeignKey('agent_summary', 'queues', 'fk_agent_summary_queues', { queue_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.removeColumn('agent_summary', 'call_secs')
}
