const { dataType } = require('db-migrate-shared')
const { INTEGER } = dataType

exports.up = async (db) => {
  await db.addColumn('agent_summary', 'ring_secs', { type: INTEGER, notNull: true, defaultValue: 0 })
}

exports.down = async (db) => {
  await db.removeColumn('agent_summary', 'ring_secs')
}
