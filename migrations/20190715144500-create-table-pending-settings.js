const { dataType } = require('db-migrate-shared')
const { BIGINT, STRING, TEXT } = dataType

exports.up = (db) => (
  db.createTable('pending_settings', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },

    object_type: { type: STRING, length: 128, notNull: true },
    object_id: { type: STRING, length: 128, notNull: true },
    body: { type: TEXT }
  })
)

exports.down = (db) => (
  db.dropTable('pending_settings')
)
