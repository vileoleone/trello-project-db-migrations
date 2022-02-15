const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, STRING, TEXT } = dataType

exports.up = async (db) => {
  await db.createTable('call_ratings', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },

    ura_id: { type: BIGINT, notNull: true },
    call_id: { type: STRING, notNull: true, length: 128 },

    name: { type: STRING, length: 256 },
    value: { type: TEXT }
  })

  await db.addIndex('call_ratings', 'index_call_ratings_ura', ['ura_id'])
  await db.addIndex('call_ratings', 'index_call_ratings_call', ['call_id'])
}

exports.down = (db) => (
  db.dropTable('call_ratings')
)
