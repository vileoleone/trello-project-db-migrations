const {dataType} = require('db-migrate-shared')
const {INTEGER, STRING, DATE_TIME} = dataType

exports.up = async (db) => {
  await db.createTable('agents', {
    id: {type: INTEGER, notNull: true, primaryKey: true, autoIncrement: false},
    name: {type: STRING, length: 256, notNull: true},
    default_queue_id: {type: STRING, notNull: false, length: 128},
    password: {type: STRING, length: 256, notNull: false},
    login_extension: {type: STRING, length: 6},
    login_at: {type: DATE_TIME},
    pause_at: {type: DATE_TIME},
    last_pause_at: {type: DATE_TIME},
    logout_at: {type: DATE_TIME},
    talking_call_id: {type: STRING, length: 128},
    last_call_rejected_at: {type: DATE_TIME},
    last_call_answered_at: {type: DATE_TIME},
    talking_since: {type: DATE_TIME}
  })
  await db.runSql(`ALTER TABLE agents ADD COLUMN status ENUM('OFFLINE', 'ONLINE', 'RINGING', 'DIALING', 'ONTHEPHONE', 'PAUSED') NOT NULL DEFAULT 'OFFLINE'`)
  await db.runSql(`ALTER TABLE agents ADD COLUMN pause_reason_id TINYINT`)
  await db.runSql(`ALTER TABLE agents ADD COLUMN active TINYINT DEFAULT 1`)
  await db.addColumn('calls', 'agent_id', {type: INTEGER})
  await db.addForeignKey('calls', 'agents', 'fk_calls_agents', { agent_id: 'id' }, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
  await db.addForeignKey('agents', 'queues', 'fk_agents_queues', { default_queue_id: 'id' }, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
  await db.addIndex('calls', 'index_calls_agent_id', ['agent_id'])

  await db.addColumn('call_history', 'agent_id', {type: INTEGER})
}

exports.down = async (db) => {
  await db.removeForeignKey('calls', 'fk_calls_agents')
  await db.removeForeignKey('agents', 'fk_agents_queues')
  await db.removeIndex('calls', 'index_calls_agent_id')
  await db.removeColumn('calls', 'agent_id')
  await db.removeColumn('call_history', 'agent_id')
  await db.dropTable('agents')
}
