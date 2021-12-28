const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, STRING, TEXT } = dataType

exports.up = (db) => (
  db.createTable('uras', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    active: { type: 'TINYINT', length: 1, notNull: true, defaultValue: 1 },
    description: { type: STRING, length: 256 },
    config: { type: TEXT, defaultValue: '{}' },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    updated_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' }
  })
)

exports.down = (db) => (
  db.dropTable('uras')
)
