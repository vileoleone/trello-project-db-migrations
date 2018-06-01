const {dataType} = require('db-migrate-shared')
const {INTEGER, DATE_TIME, STRING, SMALLINT} = dataType

exports.up = async (db) => {
  await db.createTable('agent_summary', {
    agent_id: {type: INTEGER, notNull: true},
    queue_id: {type: STRING, notNull: true, length: 128},
    period: {type: DATE_TIME, notNull: true},
    in_completed: {type: SMALLINT, notNull: true, defaultValue: 0},
    out_completed: {type: SMALLINT, notNull: true, defaultValue: 0},
    auto_completed: {type: SMALLINT, notNull: true, defaultValue: 0},
    in_call_secs: {type: INTEGER, notNull: true, defaultValue: 0},
    out_call_secs: {type: INTEGER, notNull: true, defaultValue: 0},
    auto_call_secs: {type: INTEGER, notNull: true, defaultValue: 0},
    rejections: {type: SMALLINT, notNull: true, defaultValue: 0},
    in_ring_secs: {type: INTEGER, notNull: true, defaultValue: 0},
    out_ring_secs: {type: INTEGER, notNull: true, defaultValue: 0}
  })
  await db.runSql('ALTER TABLE agent_summary ADD CONSTRAINT pk_agent_summary PRIMARY KEY (agent_id, queue_id, period)')
  await db.addForeignKey('agent_summary', 'agents', 'fk_agent_summary_agents', { agent_id: 'id' }, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
  await db.addForeignKey('agent_summary', 'queues', 'fk_agent_summary_queues', { queue_id: 'id' }, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
}

exports.down = async (db) => {
  await db.dropTable('agent_summary')
}
