const {dataType} = require('db-migrate-shared')
const {STRING, DATE_TIME, INTEGER} = dataType
const callsTable = 'calls'

exports.up = async (db) => {
  await db.createTable(callsTable, {
    id: {type: STRING, length: 128, notNull: true, primaryKey: true},
    created_at: {type: DATE_TIME, notNull: true},
    caller_number: {type: STRING, length: 30, notNull: true},
    caller_info: {type: STRING, length: 30},
    position: {type: INTEGER, notNull: true},
    initial_position: {type: INTEGER, notNull: true},
  })
  await db.runSql(`ALTER TABLE ${callsTable} ADD COLUMN direction ENUM('IN', 'OUT', 'AUTO') NOT NULL`)
  await db.runSql(`ALTER TABLE ${callsTable} ADD COLUMN status ENUM('ENQUEUED') NOT NULL`)
  await db.addIndex(callsTable, 'index_calls_caller_number', ['caller_number'])
  await db.addIndex(callsTable, 'index_calls_created_at', ['created_at'])
  await db.addIndex(callsTable, 'index_calls_status', ['status'])
}

exports.down = (db) => (
   db.dropTable(callsTable)
)
