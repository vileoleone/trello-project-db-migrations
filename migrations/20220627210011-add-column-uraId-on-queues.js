const { dataType } = require('db-migrate-shared')
const { BIGINT } = dataType

exports.up = async (db) => {
  await db.addColumn('queues', 'ura_id', { type: BIGINT })
}

exports.down = async (db) => {
  await db.removeColumn('queues', 'ura_id')
}
