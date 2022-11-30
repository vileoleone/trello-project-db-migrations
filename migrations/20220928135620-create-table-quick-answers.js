const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, STRING, BOOLEAN, SMALLINT } = dataType

exports.up = (db) => (
  db.createTable('quick_answers', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    answer: { type: STRING, length: 256, notNull: true },
    category: { type: STRING, length: 256 },
    active: { type: 'TINYINT', length: 1, notNull: true, defaultValue: 1 }
  })
)

exports.down = (db) => (
  db.dropTable('quick_answers')
)
