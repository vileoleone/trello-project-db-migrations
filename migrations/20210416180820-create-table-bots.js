const { dataType } = require('db-migrate-shared')
const { STRING, BIGINT, DATE_TIME } = dataType

exports.up = async (db) => {
  await db.createTable('bots', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    name: { type: STRING, length: 50, notNull: true },
    active: { type: 'TINYINT', length: 1, defaultValue: 1 },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' }
  })
}

exports.down = async (db) => {
  await db.dropTable('bots')
}
