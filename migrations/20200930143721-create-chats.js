const { dataType } = require('db-migrate-shared')
const { BIGINT, STRING, TEXT, INTEGER, DATE_TIME, DECIMAL } = dataType

exports.up = async (db) => {
  await db.createTable('chats', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    agent_id: { type: INTEGER, notNull: false },
    source: { type: STRING, length: 36 },
    source_id: { type: STRING, length: 256 },
    info: { type: TEXT },
    rating: { type: DECIMAL },
    queue_id: { type: STRING, length: 128 },
    direction: { type: 'ENUM', length: "'IN', 'OUT', 'AUTO'", notNull: true },
    created_at: { type: DATE_TIME, notNull: true },
    answered_at: { type: DATE_TIME, notNull: false },
    finished_at: { type: DATE_TIME, notNull: false }
  })

  await db.addForeignKey('chats', 'agents', 'fk_chats_agents', { agent_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('chats', 'index_chats_agents', ['agent_id'])

  await db.addForeignKey('chats', 'queues', 'fk_chats_queues', { queue_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('chats', 'index_chats_queues', ['queue_id'])
}

exports.down = async (db) => {
  await db.dropTable('chats')
}
