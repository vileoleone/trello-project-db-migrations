exports.up = async (db) => {
  await db.addColumn('queues', 'active', { type: 'TINYINT', length: 1, notNull: true, defaultValue: 1 })
  await db.addIndex('queues', 'index_queues_active', ['active'])
}

exports.down = async (db) => {
  await db.removeIndex('queues', 'index_queues_active')
  await db.removeColumn('queues', 'active')
}
