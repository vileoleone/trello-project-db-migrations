const { dataType } = require('db-migrate-shared')
const { INTEGER, BIGINT, STRING } = dataType

exports.up = async (db) => {
  await db.addColumn('profilers_attendances', 'agent_id', { type: INTEGER })
  await db.changeColumn('profilers_attendances', 'contact_id', { type: BIGINT })

  await db.addIndex('profilers_attendances', 'idx_profilers_attendances_agent_id', ['agent_id'])
}

exports.down = async (db) => {
  await db.removeColumn('profilers_attendances', 'agent_id', { type: INTEGER })
  await db.changeColumn('profilers_attendances', 'contact_id', { type: STRING, length: 36 })
}
