const { dataType } = require('db-migrate-shared')

exports.up = async (db) => {
  await db.removeIndex('queue_properties', 'unique_queue_properties_queue_id_name')
  await db.addIndex('queue_properties', 'unique_queue_properties_queue_id_name', ['queue_id', 'name'], true)
}

exports.down = async (db) => {
  await db.removeIndex('queue_properties', 'unique_queue_properties_queue_id_name')
  await db.addIndex('queue_properties', 'unique_queue_properties_queue_id_name', ['queue_id', 'name'])
}
