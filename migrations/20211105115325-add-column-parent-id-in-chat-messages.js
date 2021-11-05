const { dataType } = require('db-migrate-shared')
const { BIGINT } = dataType

exports.up = async (db) => {
  await db.addColumn('chats', 'parent_id', { type: BIGINT })
}

exports.down = async (db) => {
  await db.removeColumn('chats', 'parent_id')
}
