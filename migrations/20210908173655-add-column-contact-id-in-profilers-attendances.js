const { dataType } = require('db-migrate-shared')
const { STRING } = dataType

exports.up = async (db) => {
  await db.addColumn('profilers_attendances', 'contact_id', { type: STRING, length: 36 })
  await db.addIndex('profilers_attendances', 'idx_profilers_attendances_contact_id', ['contact_id'])
}

exports.down = async (db) => {
  await db.removeColumn('profilers_attendances', 'contact_id', { type: STRING, length: 36 })
}
