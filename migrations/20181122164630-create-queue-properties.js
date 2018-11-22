const { dataType } = require('db-migrate-shared')
const { STRING, BIGINT, TEXT } = dataType

const queueIdType = { type: STRING, length: 128 }

exports.up = async (db) => {
  await db.createTable('queue_properties', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    queue_id: { ...queueIdType, notNull: true },
    name: { type: STRING, length: 128, notNull: true },
    value: { type: TEXT }
  })
  await db.addForeignKey('queue_properties', 'queues', 'fk_queue_properties_queues', { queue_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('queue_properties', 'index_queue_properties_queue_id', ['queue_id'])
  await db.addIndex('queue_properties', 'unique_queue_properties_queue_id_name', ['queue_id', 'name'])
}

exports.down = async (db) => {
  await db.dropTable('queue_properties')
}
