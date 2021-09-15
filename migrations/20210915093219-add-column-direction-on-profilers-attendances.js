const { dataType } = require('db-migrate-shared')
const { BIGINT, STRING } = dataType

exports.up = async (db) => {
  await db.runSql('DELETE FROM profilers_attendances')

  await db.addColumn('profilers_attendances', 'contact', { type: STRING, length: 255 })
  await db.addColumn('profilers_attendances', 'direction', { type: 'ENUM', length: "'IN', 'OUT', 'AUTO'", notNull: true })
  await db.addColumn('profilers_attendances', 'type', { type: 'ENUM', length: "'CALL', 'TEXT'", notNull: true })
  await db.addColumn('profilers_attendances', 'mailing_contact_id', { type: BIGINT })
  await db.removeColumn('profilers_attendances', 'contact_id')

  await db.addIndex('profilers_attendances', 'idx_profilers_direction', ['direction'])
  await db.addIndex('profilers_attendances', 'idx_profilers_mailing_contacts', ['mailing_contact_id'])
}
