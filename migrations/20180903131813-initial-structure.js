const {dataType} = require('db-migrate-shared')
const {INTEGER, DATE_TIME, STRING, SMALLINT, BIGINT, TEXT} = dataType

exports.up = async (db) => {
  await run01CreateCalls(db)
  await run02CreateQueues(db)
  await run03CreateCallHistory(db)
  await run04CreateAgents(db)
  await run05CreateAgentHistory(db)
  await run06CreateAgentSummary(db)
  await run07CreateQueueSummary(db)
  await run08CreateMemberships(db)
}

exports.down = async (db) => {
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
    id: {type: STRING, length: 128, notNull: true, primaryKey: true},
    bridged_call_id: {type: STRING, length: 128},
    created_at: {type: DATE_TIME, notNull: true},
    answer_at: {type: DATE_TIME},
    hangup_at: {type: DATE_TIME},
    agent_offers: {type: SMALLINT, notNull: true, defaultValue: 0},
    caller_number: {type: STRING, length: 30, notNull: true},
    caller_info: {type: STRING, length: 30},
    hold_secs: {type: SMALLINT, notNull: true, defaultValue: 0},
    talk_secs: {type: SMALLINT, notNull: true, defaultValue: 0},
    ring_secs: {type: SMALLINT, notNull: true, defaultValue: 0},
    initial_position: {type: INTEGER, notNull: true},
    abandon_position: {type: INTEGER},
    hangup_cause_id: {type: SMALLINT},
    trunking_id: {type: SMALLINT},
    transfered_to: {type: STRING},
    reason: {type: STRING}
  })
  await db.runSql(`ALTER TABLE ${'calls'} ADD COLUMN abandon_key TINYINT(1)`)
  await db.runSql(`ALTER TABLE ${'calls'} ADD COLUMN direction ENUM('IN', 'OUT', 'AUTO') NOT NULL`)
  await db.runSql(`ALTER TABLE ${'calls'} ADD COLUMN status ENUM('DIALING', 'ENQUEUED', 'CONNECTED', 'COMPLETED', 'ABANDONED', 'DISCARDED') NOT NULL`)
  await db.addIndex('calls', 'index_calls_caller_number', ['caller_number'])
  await db.addIndex('calls', 'index_calls_created_at', ['created_at'])
  await db.addIndex('calls', 'index_calls_status', ['status'])
}
const run02CreateQueues = async (db) => {
  await db.createTable('queues', {
    id: {type: STRING, length: 128, notNull: true, primaryKey: true},
    name: {type: STRING, length: 256, notNull: true}
  })
  await db.addColumn('calls', 'queue_id', {type: STRING, length: 128, notNull: true})
  await db.addForeignKey('calls', 'queues', 'fk_calls_queues', { queue_id: 'id' }, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
  await db.addIndex('calls', 'index_calls_queue_id', ['queue_id'])
}
const run03CreateCallHistory = async (db) => {
  await db.createTable('call_history', {
    id: {type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true},
    call_id: {type: STRING, notNull: true, length: 128},
    created_at: {type: DATE_TIME, notNull: true},
    event: {type: STRING, notNull: true, length: 30},
    queue_id: {type: STRING, length: 128},
    event_info: {type: TEXT, notNull: true}
  })
  await db.addForeignKey('call_history', 'calls', 'fk_call_history_calls', {call_id: 'id'}, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
  await db.addIndex('call_history', 'index_call_history_call_id', ['call_id'])

  await db.addForeignKey('call_history', 'queues', 'fk_call_history_queue', {queue_id: 'id'}, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
  await db.addIndex('call_history', 'index_call_history_queue_id', ['queue_id'])

  await db.addIndex('call_history', 'index_call_history_created_at', ['created_at'])
}
const run04CreateAgents = async (db) => {
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

const run05CreateAgentHistory = async (db) => {
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
const run06CreateAgentSummary = async (db) => {
  await db.createTable('agent_summary', {
    agent_id: {type: INTEGER, notNull: true},
    queue_id: {type: STRING, notNull: true, length: 128},
    period: {type: DATE_TIME, notNull: true},
    in_completed: {type: SMALLINT, notNull: true, defaultValue: 0},
    out_completed: {type: SMALLINT, notNull: true, defaultValue: 0},
    out_discarded: {type: SMALLINT, notNull: true, defaultValue: 0},
    auto_completed: {type: SMALLINT, notNull: true, defaultValue: 0},
    in_call_secs: {type: INTEGER, notNull: true, defaultValue: 0},
    out_call_secs: {type: INTEGER, notNull: true, defaultValue: 0},
    auto_call_secs: {type: INTEGER, notNull: true, defaultValue: 0},
    rejections: {type: SMALLINT, notNull: true, defaultValue: 0},
    login_secs: {type: INTEGER, notNull: true, defaultValue: 0},
    pause_secs: {type: INTEGER, notNull: true, defaultValue: 0},
    in_ring_secs: {type: INTEGER, notNull: true, defaultValue: 0},
    out_ring_secs: {type: INTEGER, notNull: true, defaultValue: 0}
  })
  await db.runSql('ALTER TABLE agent_summary ADD CONSTRAINT pk_agent_summary PRIMARY KEY (agent_id, queue_id, period)')
  await db.addForeignKey('agent_summary', 'agents', 'fk_agent_summary_agents', { agent_id: 'id' }, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
  await db.addForeignKey('agent_summary', 'queues', 'fk_agent_summary_queues', { queue_id: 'id' }, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
}
const run07CreateQueueSummary = async (db) => {
  await db.createTable('queue_summary', {
    queue_id: {type: STRING, notNull: true, length: 128},
    period: {type: DATE_TIME, notNull: true},
    in_completed: {type: INTEGER, notNull: true, defaultValue: 0},
    in_transferred: {type: INTEGER, notNull: true, defaultValue: 0},
    in_abandoned: {type: INTEGER, notNull: true, defaultValue: 0},
    in_completed_sla: {type: INTEGER, notNull: true, defaultValue: 0},
    in_abandoned_sla: {type: INTEGER, notNull: true, defaultValue: 0},

    out_completed: {type: INTEGER, notNull: true, defaultValue: 0},
    out_transferred: {type: INTEGER, notNull: true, defaultValue: 0},
    out_discarded: {type: INTEGER, notNull: true, defaultValue: 0},

    auto_completed: {type: INTEGER, notNull: true, defaultValue: 0},
    auto_transferred: {type: INTEGER, notNull: true, defaultValue: 0},
    auto_discarded: {type: INTEGER, notNull: true, defaultValue: 0},
    auto_abandoned: {type: INTEGER, notNull: true, defaultValue: 0},

    in_call_secs: {type: INTEGER, notNull: true, defaultValue: 0},
    out_call_secs: {type: INTEGER, notNull: true, defaultValue: 0},
    auto_call_secs: {type: INTEGER, notNull: true, defaultValue: 0},

    in_hold_secs_completed: {type: INTEGER, notNull: true, defaultValue: 0},
    in_hold_secs_abandoned: {type: INTEGER, notNull: true, defaultValue: 0},

    out_try_secs_completed: {type: INTEGER, notNull: true, defaultValue: 0},
    out_try_secs_discarded: {type: INTEGER, notNull: true, defaultValue: 0},

    auto_hold_secs_completed: {type: INTEGER, notNull: true, defaultValue: 0},
    auto_hold_secs_abandoned: {type: INTEGER, notNull: true, defaultValue: 0},
    auto_try_secs_completed: {type: INTEGER, notNull: true, defaultValue: 0},
    auto_try_secs_discarded: {type: INTEGER, notNull: true, defaultValue: 0}
  })

  await db.runSql('ALTER TABLE queue_summary ADD CONSTRAINT pk_queue_summary PRIMARY KEY (queue_id, period)')
  await db.addForeignKey('queue_summary', 'queues', 'fk_queue_summary_queues', { queue_id: 'id' }, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
  await db.addIndex('queue_summary', 'index_queue_summary_queue_id', ['queue_id'])
}
const run08CreateMemberships = async (db) => {
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
  await db.removeForeignKey('agent_history', 'fk_agent_history_agents')
  await db.removeIndex('agent_history', 'index_agent_history_agent_id')
  await db.removeIndex('agent_history', 'index_agent_history_created_at')
  await db.dropTable('agent_history')
}
const run04DropAgents = async (db) => {
  await db.removeForeignKey('calls', 'fk_calls_agents')
  await db.removeForeignKey('agents', 'fk_agents_queues')
  await db.removeIndex('calls', 'index_calls_agent_id')
  await db.removeColumn('calls', 'agent_id')
  await db.removeColumn('call_history', 'agent_id')
  await db.dropTable('agents')
}
const run03DropCallHistory = async (db) => {
  await db.dropTable('call_history')
}
const run02DropQueues = async (db) => {
  await db.removeForeignKey('calls', 'fk_calls_queues')
  await db.removeIndex('calls', 'index_calls_queue_id')
  await db.removeColumn('calls', 'queue_id')
  await db.dropTable('queues')
}
const run01DropCalls = async (db) => {
  await db.dropTable('calls')
}
