
const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, STRING, CHAR, TEXT } = dataType

exports.up = async (db) => {
  await db.createTable('dashboards', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    user_id: { type: CHAR, length: 36 },
    type: { type: STRING, length: 36 },
    config: { type: TEXT },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' }
  })
}

exports.down = async (db) => {
  await db.dropTable('dashboards')
}
