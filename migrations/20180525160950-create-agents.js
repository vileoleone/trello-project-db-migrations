const {dataType} = require('db-migrate-shared')
const {INTEGER, STRING, DATE_TIME} = dataType

exports.up = async (db) => {
  await db.createTable('agents', {
    id: {type: INTEGER, notNull: true, primaryKey: true, autoIncrement: true},
    login_extension: {type: STRING, length: 6},
    login_at: {type: DATE_TIME},
    logout_at: {type: DATE_TIME},
    talking_call_id: {type: STRING, length: 128},
    last_call_rejected_at: {type: DATE_TIME},
    last_call_answered_at: {type: DATE_TIME},
    talking_since: {type: DATE_TIME}
  })
  await db.runSql(`ALTER TABLE agents ADD COLUMN status ENUM('OFFLINE', 'ONLINE', 'RINGING', 'ONTHEPHONE') NOT NULL DEFAULT 'OFFLINE'`)
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
