const { dataType } = require('db-migrate-shared')
const { STRING, TEXT, DATE_TIME } = dataType

exports.up = async (db) => {
  await db.addColumn('bots', 'source_type', { notNull: true, type: 'ENUM', length: "'TELEGRAM', 'ZENVIA', 'FACEBOOK'" })
  await db.addColumn('bots', 'source_id', { notNull: true, type: STRING, length: 50 })
  await db.addColumn('bots', 'source_token', { notNull: true, type: STRING, length: 256 })
  await db.addColumn('bots', 'api_vonix_key', { type: STRING, length: 36 })
  await db.addColumn('bots', 'notes', { type: TEXT })
  await db.addColumn('bots', 'updated_at', { type: DATE_TIME })
}

exports.down = async (db) => {
  await db.removeColumn('bots', 'source_type')
  await db.removeColumn('bots', 'source_id')
  await db.removeColumn('bots', 'source_token')
  await db.removeColumn('bots', 'api_vonix_key')
  await db.removeColumn('bots', 'notes')
  await db.removeColumn('bots', 'updated_at')
}
