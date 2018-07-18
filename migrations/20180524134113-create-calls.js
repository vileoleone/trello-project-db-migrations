const {dataType} = require('db-migrate-shared')
const {STRING, DATE_TIME, INTEGER, SMALLINT} = dataType
const callsTable = 'calls'

exports.up = async (db) => {
  await db.createTable(callsTable, {
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
  await db.runSql(`ALTER TABLE ${callsTable} ADD COLUMN abandon_key TINYINT(1)`)
  await db.runSql(`ALTER TABLE ${callsTable} ADD COLUMN direction ENUM('IN', 'OUT', 'AUTO') NOT NULL`)
  await db.runSql(`ALTER TABLE ${callsTable} ADD COLUMN status ENUM('DIALING', 'ENQUEUED', 'CONNECTED', 'COMPLETED', 'ABANDONED', 'DISCARDED') NOT NULL`)
  await db.addIndex(callsTable, 'index_calls_caller_number', ['caller_number'])
  await db.addIndex(callsTable, 'index_calls_created_at', ['created_at'])
  await db.addIndex(callsTable, 'index_calls_status', ['status'])
}

exports.down = (db) => (
  db.dropTable(callsTable)
)
