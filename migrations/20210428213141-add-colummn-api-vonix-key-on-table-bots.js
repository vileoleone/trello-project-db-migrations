const { dataType } = require('db-migrate-shared')
const { STRING, BIGINT } = dataType

exports.up = async (db) => {
  await db.removeColumn('bots', 'api_vonix_key')
  await db.addColumn('bots', 'auth_tokens_id', { type: BIGINT })
  await db.addForeignKey('bots', 'auth_tokens', 'fk_bot_auth_id', { auth_tokens_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}

exports.down = async (db) => {
  await db.removeColumn('bots', 'auth_tokens_id')
  await db.addColumn('bots', 'api_vonix_key', { type: STRING, length: 36 })
}
