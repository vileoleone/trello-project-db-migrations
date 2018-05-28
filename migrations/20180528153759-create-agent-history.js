const {dataType} = require('db-migrate-shared')
const {INTEGER, BIGINT, DATE_TIME, STRING, TEXT} = dataType

exports.up = async (db) => {
  await db.createTable('agent_history', {
    id: {type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true},
    agent_id: {type: INTEGER, notNull: true},
    created_at: {type: DATE_TIME, notNull: true},
    event: {type: STRING, notNull: true, length: 30},
    queue_id: {type: STRING, length: 128},
    event_info: {type: TEXT, notNull: true}
  })
  await db.addForeignKey('agent_history', 'agents', 'fk_agent_history_agents', { agent_id: 'id' }, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
  await db.addIndex('agent_history', 'index_agent_history_agent_id', ['agent_id'])
  await db.addIndex('agent_history', 'index_agent_history_created_at', ['created_at'])
}

exports.down = async (db) => {
  await db.removeForeignKey('agent_history', 'fk_agent_history_agents')
  await db.removeIndex('agent_history', 'index_agent_history_agent_id')
  await db.removeIndex('agent_history', 'index_agent_history_created_at')
  await db.dropTable('agent_history')
}
