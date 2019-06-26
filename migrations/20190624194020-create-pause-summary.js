const { dataType } = require('db-migrate-shared')
const { STRING, INTEGER, DATE_TIME, SMALLINT } = dataType

const queueIdType = { type: STRING, length: 128 }
const agentIdType = { type: INTEGER }
const pauseReasonIdType = { type: SMALLINT }

exports.up = async (db) => {
  await db.createTable('pause_summary', {
    agent_id: { ...agentIdType, notNull: true },
    queue_id: { ...queueIdType, notNull: true },
    pause_reason_id: { ...pauseReasonIdType, notNull: true },
    period: { type: DATE_TIME, notNull: true },
    pause_secs: { type: INTEGER, notNull: true, defaultValue: 0 }
  })
  await db.addForeignKey('pause_summary', 'agents', 'fk_pause_summary_agents', { agent_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('pause_summary', 'index_pause_summary_agent_id', ['agent_id'])
  await db.runSql('ALTER TABLE pause_summary ADD CONSTRAINT pk_pause_summary PRIMARY KEY (agent_id, queue_id, pause_reason_id, period)')
  await db.addColumn('memberships', 'pause_at', { type: DATE_TIME })
  await db.addColumn('memberships', 'pause_reason_id', pauseReasonIdType)
}

exports.down = async (db) => {
  await db.dropTable('pause_summary')
}
