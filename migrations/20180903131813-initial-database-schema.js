const { dataType } = require('db-migrate-shared')
const { INTEGER, DATE_TIME, STRING, SMALLINT, BIGINT, TEXT, DECIMAL } = dataType

const callIdType = { type: STRING, length: 128 }
const queueIdType = { type: STRING, length: 128 }
const agentIdType = { type: INTEGER }
const extensionIdType = { type: STRING, length: 6 }
const pkProps = { notNull: true, primaryKey: true }

const agentStatusesType = { type: 'ENUM', length: "'OFFLINE', 'ONLINE', 'RINGING', 'DIALING', 'ONTHEPHONE', 'PAUSED'", notNull: true, defaultValue: 'OFFLINE' }

exports.up = async (db) => {
  await run01CreateCalls(db)
  await run02CreateQueues(db)
  await run03CreateCallHistory(db)
  await run04CreateAgents(db)
  await run05CreateAgentHistory(db)
  await run06CreateAgentSummary(db)
  await run07CreateQueueSummary(db)
  await run08CreateMemberships(db)
  await run09CreateMembershipHistory(db)
  await run10CreateQueueHistory(db)
  await run11CreatePauseReason(db)
  await runCreateForeignKeys(db)
}

exports.down = async (db) => {
  await runDropForeignKeys(db)
  await run11DropPauseReason(db)
  await run10DropQueueHistory(db)
  await run09DropMembershipHistory(db)
  await run08DropMemberships(db)
  await run07DropQueueSummary(db)
  await run06DropAgentSummary(db)
  await run05DropAgentHistory(db)
  await run04DropAgents(db)
  await run03DropCallHistory(db)
  await run02DropQueues(db)
  await run01DropCalls(db)
}

const run01CreateCalls = async (db) => {
  await db.createTable('calls', {
    id: { ...callIdType, ...pkProps },
    queue_id: { ...queueIdType, notNull: true },
    agent_id: agentIdType,
    bridged_call_id: callIdType,
    direction: { type: 'ENUM', length: "'IN', 'OUT', 'AUTO'", notNull: true },
    created_at: { type: DATE_TIME, notNull: true },
    answer_at: { type: DATE_TIME },
    hangup_at: { type: DATE_TIME },
    agent_offers: { type: SMALLINT, notNull: true, defaultValue: 0 },
    caller_number: { type: STRING, length: 30, notNull: true },
    caller_info: { type: STRING, length: 30 },
    locality_id: { type: INTEGER },
    call_type_id: { type: INTEGER },
    hold_secs: { type: SMALLINT, notNull: true, defaultValue: 0 },
    talk_secs: { type: SMALLINT, notNull: true, defaultValue: 0 },
    ring_secs: { type: SMALLINT, notNull: true, defaultValue: 0 },
    initial_position: { type: INTEGER, notNull: true },
    abandon_key: { type: 'TINYINT', length: 1 },
    abandon_position: { type: INTEGER },
    transferred_to: { type: STRING },
    recording_status: { type: 'ENUM', length: "'AVAILABLE', 'ARCHIVED', 'DELETED'" },
    recording_storage_id: { type: INTEGER },
    hangup_cause_id: { type: SMALLINT },
    trunking_id: { type: SMALLINT },
    carrier_id: { type: INTEGER },
    status: { type: 'ENUM', length: "'DIALING', 'ENQUEUED', 'CONNECTED', 'COMPLETED', 'ABANDONED', 'DISCARDED'", notNull: true },
    reason: { type: STRING }
  })

  await db.addIndex('calls', 'index_calls_caller_number', ['caller_number'])
  await db.addIndex('calls', 'index_calls_created_at', ['created_at'])
  await db.addIndex('calls', 'index_calls_status', ['status'])
}

const run02CreateQueues = async (db) => {
  await db.createTable('queues', {
    id: { ...queueIdType, ...pkProps },
    name: { type: STRING, length: 256, notNull: true },
    direction_in: { type: 'TINYINT', length: 1, defaultValue: 1 },
    direction_out: { type: 'TINYINT', length: 1, defaultValue: 1 },
    direction_auto: { type: 'TINYINT', length: 1, defaultValue: 0 },
    description: { type: TEXT },
    sla_secs: { type: INTEGER },
    sla_percent: { type: DECIMAL, length: '6,3' },
    image_url: { type: STRING }
  })
}

const run03CreateCallHistory = async (db) => {
  await db.createTable('call_history', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    call_id: { ...callIdType, notNull: true },
    created_at: { type: DATE_TIME, notNull: true },
    event: { type: STRING, notNull: true, length: 30 },
    queue_id: { ...queueIdType, notNull: true },
    agent_id: agentIdType,
    event_info: { type: TEXT, notNull: true }
  })

  await db.addIndex('call_history', 'index_call_history_created_at', ['created_at'])
}

const run04CreateAgents = async (db) => {
  await db.createTable('agents', {
    id: { ...agentIdType, ...pkProps, autoIncrement: false },
    name: { type: STRING, length: 256, notNull: true },
    image_url: { type: STRING },
    password: { type: STRING, length: 256 },
    default_queue_id: { type: STRING, length: 128 },
    login_extension: extensionIdType,
    login_at: { type: DATE_TIME },
    pause_at: { type: DATE_TIME },
    logout_at: { type: DATE_TIME },
    talking_since: { type: DATE_TIME },
    talking_call_id: callIdType,
    last_call_answered_at: { type: DATE_TIME },
    last_call_rejected_at: { type: DATE_TIME },
    last_pause_at: { type: DATE_TIME },
    status: agentStatusesType,
    active: { type: 'TINYINT', length: 1, notNull: true, defaultValue: 1 },
    created_at: { type: DATE_TIME, notNull: true },
    updated_at: { type: DATE_TIME },
    pause_reason_id: { type: 'TINYINT' } // diff from original: added
  })
}

const run05CreateAgentHistory = async (db) => {
  await db.createTable('agent_history', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    agent_id: { ...agentIdType, notNull: true },
    created_at: { type: DATE_TIME, notNull: true },
    event: { type: STRING, notNull: true, length: 30 },
    queue_id: queueIdType,
    event_info: { type: TEXT, notNull: true }
  })

  await db.addIndex('agent_history', 'index_agent_history_created_at', ['created_at'])
}

const run06CreateAgentSummary = async (db) => {
  await db.createTable('agent_summary', {
    agent_id: { ...agentIdType, notNull: true },
    queue_id: { ...queueIdType, notNull: true },
    period: { type: DATE_TIME, notNull: true },
    in_completed: { type: SMALLINT, notNull: true, defaultValue: 0 },
    out_completed: { type: SMALLINT, notNull: true, defaultValue: 0 },
    out_discarded: { type: SMALLINT, notNull: true, defaultValue: 0 },
    auto_completed: { type: SMALLINT, notNull: true, defaultValue: 0 },
    rejections: { type: SMALLINT, notNull: true, defaultValue: 0 },
    login_secs: { type: INTEGER, notNull: true, defaultValue: 0 },
    pause_secs: { type: INTEGER, notNull: true, defaultValue: 0 },
    in_ring_secs: { type: INTEGER, notNull: true, defaultValue: 0 }, // diff from original: distinct in/out of ring_secs
    out_ring_secs: { type: INTEGER, notNull: true, defaultValue: 0 }, // diff from original: distinct in/out of ring_secs
    in_call_secs: { type: INTEGER, notNull: true, defaultValue: 0 },
    out_call_secs: { type: INTEGER, notNull: true, defaultValue: 0 },
    auto_call_secs: { type: INTEGER, notNull: true, defaultValue: 0 }
  })
  await db.runSql('ALTER TABLE agent_summary ADD CONSTRAINT pk_agent_summary PRIMARY KEY (agent_id, queue_id, period)')
}

const run07CreateQueueSummary = async (db) => {
  await db.createTable('queue_summary', {
    queue_id: { ...queueIdType, notNull: true },
    period: { type: DATE_TIME, notNull: true },
    in_completed: { type: INTEGER, notNull: true, defaultValue: 0 },
    in_transferred: { type: INTEGER, notNull: true, defaultValue: 0 },
    in_abandoned: { type: INTEGER, notNull: true, defaultValue: 0 },
    in_completed_sla: { type: INTEGER, notNull: true, defaultValue: 0 },
    in_abandoned_sla: { type: INTEGER, notNull: true, defaultValue: 0 },
    out_completed: { type: INTEGER, notNull: true, defaultValue: 0 },
    out_transferred: { type: INTEGER, notNull: true, defaultValue: 0 },
    out_discarded: { type: INTEGER, notNull: true, defaultValue: 0 },
    auto_completed: { type: INTEGER, notNull: true, defaultValue: 0 },
    auto_transferred: { type: INTEGER, notNull: true, defaultValue: 0 },
    auto_discarded: { type: INTEGER, notNull: true, defaultValue: 0 },
    auto_abandoned: { type: INTEGER, notNull: true, defaultValue: 0 },
    in_call_secs: { type: INTEGER, notNull: true, defaultValue: 0 },
    out_call_secs: { type: INTEGER, notNull: true, defaultValue: 0 },
    auto_call_secs: { type: INTEGER, notNull: true, defaultValue: 0 },
    in_hold_secs_completed: { type: INTEGER, notNull: true, defaultValue: 0 },
    in_hold_secs_abandoned: { type: INTEGER, notNull: true, defaultValue: 0 },
    out_try_secs_completed: { type: INTEGER, notNull: true, defaultValue: 0 },
    out_try_secs_discarded: { type: INTEGER, notNull: true, defaultValue: 0 },
    auto_hold_secs_completed: { type: INTEGER, notNull: true, defaultValue: 0 },
    auto_hold_secs_abandoned: { type: INTEGER, notNull: true, defaultValue: 0 },
    auto_try_secs_completed: { type: INTEGER, notNull: true, defaultValue: 0 }, // diff from original: added
    auto_try_secs_discarded: { type: INTEGER, notNull: true, defaultValue: 0 } // diff from original: added
  })

  await db.runSql('ALTER TABLE queue_summary ADD CONSTRAINT pk_queue_summary PRIMARY KEY (queue_id, period)')
}

const run08CreateMemberships = async (db) => {
  await db.createTable('memberships', {
    queue_id: { ...queueIdType, notNull: true },
    agent_id: { ...agentIdType, notNull: true },
    penalty: { type: SMALLINT, notNull: true, defaultValue: 0 },
    status: agentStatusesType // diff from original: added
  })
  await db.runSql('ALTER TABLE memberships ADD CONSTRAINT pk_memberships PRIMARY KEY (agent_id, queue_id)')
}

const run09CreateMembershipHistory = async (db) => {
  await db.createTable('membership_history', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    agent_id: { ...agentIdType, notNull: true },
    queue_id: { ...queueIdType, notNull: true },
    created_at: { type: DATE_TIME, notNull: true },
    started_at: { type: DATE_TIME, notNull: true },
    ended_at: { type: DATE_TIME }
  })
}

const run10CreateQueueHistory = async (db) => {
  await db.createTable('queue_history', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    queue_id: { ...queueIdType, notNull: true },
    created_at: { type: DATE_TIME, notNull: true },
    property: { type: STRING, length: 128, notNull: true },
    user_id: { type: INTEGER, notNull: true },
    property_info: { type: STRING, length: 256 }
  })

  await db.addIndex('queue_history', 'index_queue_history_created_at', ['created_at'])
}

const run11CreatePauseReason = async (db) => {
  await db.createTable('pause_reasons', {
    id: { type: SMALLINT, notNull: true, primaryKey: true, autoIncrement: true },
    description: { type: STRING, length: 128, notNull: true },
    max_pause_secs: { type: INTEGER, notNull: true, defaultValue: 0 }
  })
}

const runCreateForeignKeys = async (db) => {
  await db.addForeignKey('calls', 'queues', 'fk_calls_queues', { queue_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('calls', 'index_calls_queue_id', ['queue_id'])

  await db.addForeignKey('calls', 'agents', 'fk_calls_agents', { agent_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('calls', 'index_calls_agent_id', ['agent_id'])

  await db.addForeignKey('call_history', 'calls', 'fk_call_history_calls', { call_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('call_history', 'index_call_history_call_id', ['call_id'])

  await db.addForeignKey('agents', 'queues', 'fk_agents_queues', { default_queue_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('agents', 'index_agents_default_queue_id', ['default_queue_id'])

  await db.addForeignKey('agent_history', 'agents', 'fk_agent_history_agents', { agent_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('agent_history', 'index_agent_history_agent_id', ['agent_id'])

  await db.addForeignKey('agent_summary', 'agents', 'fk_agent_summary_agents', { agent_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('agent_summary', 'index_agent_summary_agent_id', ['agent_id'])

  await db.addForeignKey('agent_summary', 'queues', 'fk_agent_summary_queues', { queue_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('agent_summary', 'index_agent_summary_queue_id', ['queue_id'])

  await db.addForeignKey('queue_summary', 'queues', 'fk_queue_summary_queues', { queue_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('queue_summary', 'index_queue_summary_queue_id', ['queue_id'])

  await db.addForeignKey('memberships', 'agents', 'fk_memberships_agents', { agent_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('memberships', 'index_memberships_agent_id', ['agent_id'])

  await db.addForeignKey('memberships', 'queues', 'fk_memberships_queues', { queue_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('memberships', 'index_memberships_queue_id', ['queue_id'])

  await db.addForeignKey('membership_history', 'agents', 'fk_membership_history_agents', { agent_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('membership_history', 'index_membership_history_agent_id', ['agent_id'])

  await db.addForeignKey('membership_history', 'queues', 'fk_membership_history_queues', { queue_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('membership_history', 'index_membership_history_queue_id', ['queue_id'])

  await db.addForeignKey('queue_history', 'queues', 'fk_queue_history_queues', { queue_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('queue_history', 'index_queue_history_queue_id', ['queue_id'])
}

const runDropForeignKeys = async (db) => {
  await db.removeForeignKey('queue_history', 'fk_queue_history_queues')
  await db.removeForeignKey('membership_history', 'fk_membership_history_agents')
  await db.removeForeignKey('membership_history', 'fk_membership_history_queues')
  await db.removeForeignKey('memberships', 'fk_memberships_queues')
  await db.removeForeignKey('memberships', 'fk_memberships_agents')
  await db.removeForeignKey('queue_summary', 'fk_queue_summary_queues')
  await db.removeForeignKey('agent_summary', 'fk_agent_summary_queues')
  await db.removeForeignKey('agent_summary', 'fk_agent_summary_agents')
  await db.removeForeignKey('agent_history', 'fk_agent_history_agents')
  await db.removeForeignKey('agents', 'fk_agents_queues')
  await db.removeForeignKey('call_history', 'fk_call_history_calls')
  await db.removeForeignKey('calls', 'fk_calls_agents')
  await db.removeForeignKey('calls', 'fk_calls_queues')
}

const run11DropPauseReason = async (db) => {
  await db.dropTable('pause_reasons')
}

const run10DropQueueHistory = async (db) => {
  await db.dropTable('queue_history')
}

const run09DropMembershipHistory = async (db) => {
  await db.dropTable('membership_history')
}

const run08DropMemberships = async (db) => {
  await db.dropTable('memberships')
}

const run07DropQueueSummary = async (db) => {
  await db.dropTable('queue_summary')
}

const run06DropAgentSummary = async (db) => {
  await db.dropTable('agent_summary')
}

const run05DropAgentHistory = async (db) => {
  await db.dropTable('agent_history')
}

const run04DropAgents = async (db) => {
  await db.dropTable('agents')
}

const run03DropCallHistory = async (db) => {
  await db.dropTable('call_history')
}

const run02DropQueues = async (db) => {
  await db.dropTable('queues')
}

const run01DropCalls = async (db) => {
  await db.dropTable('calls')
}
