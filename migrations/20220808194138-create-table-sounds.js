const { dataType } = require('db-migrate-shared')
const { DATE_TIME, STRING, BIGINT } = dataType

exports.up = async (db) => {
  await db.createTable('sounds', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    description: { type: STRING, length: 256, notNull: true },
    active: { type: 'TINYINT', length: 1, notNull: true, defaultValue: 1 },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    updated_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    sound: { type: STRING, length: 256 }
  })
}

exports.down = async (db) => (
  await db.dropTable('sounds')
)
