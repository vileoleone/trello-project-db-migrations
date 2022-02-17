const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, STRING, CHAR, INTEGER } = dataType

exports.up = async (db) => {
  await db.createTable('entry_numbers', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },

    description: { type: STRING, length: 256, notNull: true },
    number: { type: STRING, length: 32, notNull: true },
    active: { type: 'TINYINT', length: 1, notNull: true, defaultValue: 1 },
    internal_access: { type: 'TINYINT', length: 1, notNull: true, defaultValue: 0 },
    destination_type: { type: 'ENUM', length: "'URA', 'QUEUE', 'EXTENSION', 'AGENT'", notNull: true },

    ura_id: { type: BIGINT },
    agent_id: { type: INTEGER },
    queue_id: { type: STRING, length: 128 },
    extension_id: { type: CHAR, length: 12 },

    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    updated_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' }
  })

  await db.addIndex('entry_numbers', 'index_entry_numbers_ura', ['ura_id'])
  await db.addIndex('entry_numbers', 'index_entry_numbers_agent', ['agent_id'])
  await db.addIndex('entry_numbers', 'index_entry_numbers_queue', ['queue_id'])
  await db.addIndex('entry_numbers', 'index_entry_numbers_extension', ['extension_id'])
}

exports.down = (db) => (
  db.dropTable('entry_numbers')
)
