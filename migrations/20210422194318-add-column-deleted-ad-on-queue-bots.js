const { dataType } = require('db-migrate-shared')
const { DATE_TIME } = dataType

exports.up = async (db) => {
  await db.addColumn('queue_bots', 'deleted_at', { type: DATE_TIME })
}

exports.down = async (db) => {
  await db.removeColumn('queue_bots', 'deleted_at')
}
