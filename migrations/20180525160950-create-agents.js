const {dataType} = require('db-migrate-shared')
const {INTEGER} = dataType

exports.up = async (db) => {
  await db.createTable('agents', {
    id: {type: INTEGER, notNull: true, primaryKey: true, autoIncrement: true}
  })
  await db.runSql(`ALTER TABLE agents ADD COLUMN status ENUM('OFFLINE', 'AVAILABLE', 'ONTHEPHONE') NOT NULL DEFAULT 'OFFLINE'`)
  await db.addColumn('calls', 'agent_id', {type: INTEGER})
  await db.addForeignKey('calls', 'agents', 'fk_calls_agents', { agent_id: 'id' }, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
  await db.addIndex('calls', 'index_calls_agent_id', ['agent_id'])

  await db.addColumn('call_history', 'agent_id', {type: INTEGER})
}

exports.down = async (db) => {
  await db.removeForeignKey('calls', 'fk_calls_agents')
  await db.removeIndex('calls', 'index_calls_agent_id')
  await db.removeColumn('calls', 'agent_id')

  await db.removeColumn('call_history', 'agent_id')

  await db.dropTable('agents')
}
