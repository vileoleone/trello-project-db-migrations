const {dataType} = require('db-migrate-shared')
const {STRING, BIG_INTEGER, SMALL_INTEGER, INTEGER} = dataType
const agentsTable = 'agents'

const callIdForeignKey = {
  name: 'fk_agents_talking_call_id',
  table: 'calls',
  mapping: 'call_id',
  rules: {
    onDelete: 'CASCADE'
  }
}

exports.up = (db) => (
  db.createTable(agentsTable, {
    id: {type: INTEGER, notNull: true, primaryKey: true, autoIncrement: true},
    status: {type: STRING, length: 30},
    talking_queue: {type: STRING, length: 250},
    talking_call_id: {type: STRING, length: 100, notNull: false, foreignKey: callIdForeignKey}
  })
)

exports.down = (db) => (
  db.dropTable(agentsTable)
)
