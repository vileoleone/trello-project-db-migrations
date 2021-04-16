const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, STRING } = dataType

exports.up = async (db) => {
  await db.createTable('queue_bots', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    queue_id: { notNull: true, type: STRING, length: 128 },
    bot_id: { notNull: true, type: BIGINT },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' }
  })

  await db.addForeignKey('queue_bots', 'queues', 'fk_queue_bots_queue', { queue_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addForeignKey('queue_bots', 'bots', 'fk_queue_bots_bot', { bot_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}

exports.down = async (db) => {
  await db.dropTable('queue_bots')
}
