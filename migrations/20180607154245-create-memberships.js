const {dataType} = require('db-migrate-shared')
const {SMALLINT, INTEGER, STRING} = dataType

exports.up = async (db) => {
  await db.createTable('memberships', {
    queue_id: {type: STRING, notNull: true, length: 128},
    agent_id: {type: INTEGER, notNull: true},
    penalty: {type: SMALLINT, notNull: true, defaultValue: 0}
  })
  await db.runSql(`ALTER TABLE memberships ADD COLUMN status ENUM('OFFLINE', 'ONLINE', 'RINGING', 'DIALING', 'ONTHEPHONE', 'PAUSED') NOT NULL DEFAULT 'OFFLINE'`)
  await db.runSql('ALTER TABLE memberships ADD CONSTRAINT pk_memberships PRIMARY KEY (agent_id, queue_id)')
  await db.addForeignKey('memberships', 'agents', 'fk_memberships_agents', { agent_id: 'id' }, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
  await db.addForeignKey('memberships', 'queues', 'fk_memberships_queues', { queue_id: 'id' }, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
}

exports.down = async (db) => {
  await db.dropTable('memberships')
}
