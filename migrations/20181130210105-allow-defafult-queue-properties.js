const { dataType } = require('db-migrate-shared')
const { STRING } = dataType

const queueIdType = { type: STRING, length: 128 }

exports.up = async (db) => {
  await db.changeColumn('queue_properties', 'queue_id', { ...queueIdType, notNull: false })
}

exports.down = async (db) => {
  await db.removeForeignKey('queue_properties', 'fk_queue_properties_queues')
  await db.changeColumn('queue_properties', 'queue_id', { ...queueIdType, notNull: true })
  await db.addForeignKey('queue_properties', 'queues', 'fk_queue_properties_queues', { queue_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}
