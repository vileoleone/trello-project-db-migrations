const { dataType } = require('db-migrate-shared')
const { SMALLINT } = dataType

exports.up = async (db) => (
  await db.addColumn('bots', 'timeout_secs', { type: SMALLINT })
)

exports.down = async (db) => (
  await db.removeColumn('bots', 'timeout_secs')
)
