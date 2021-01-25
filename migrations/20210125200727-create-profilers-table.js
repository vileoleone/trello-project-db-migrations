const { dataType } = require('db-migrate-shared')
const { BIGINT, STRING, DATE_TIME } = dataType

exports.up = async (db) => {
  await db.createTable('profilers', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    queue_id: { type: STRING, length: 128, notNull: true },
    description: { type: STRING, length: 256 },
    active: { type: 'TINYINT', length: 1, notNull: true, defaultValue: 1 },
    created_at: { type: DATE_TIME, notNull: true },
    updated_at: { type: DATE_TIME, notNull: true },
    deleted_at: { type: DATE_TIME, notNull: false }
  })

  await db.addForeignKey('profilers', 'queues', 'fk_profilers_queues', { queue_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('profilers', 'index_profilers_queues', ['queue_id'])
}

exports.down = async (db) => {
  await db.dropTable('profilers')
}
