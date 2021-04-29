const { dataType } = require('db-migrate-shared')
const { BIGINT, STRING } = dataType

exports.up = async (db) => {
  await db.removeForeignKey('bots', 'fk_bot_auth_id')
  await db.removeColumn('bots', 'auth_token_id')
  await db.addColumn('bots', 'application_id', { type: STRING, length: 128 })
  await db.addForeignKey('bots', 'applications', 'fk_bot_aplication_id', { application_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}

exports.down = async (db) => {
  await db.removeForeignKey('bots', 'fk_bot_aplication_id')
  await db.removeColumn('bots', 'application_id')
  await db.addColumn('bots', 'auth_token_id', { type: BIGINT })
  await db.addForeignKey('bots', 'auth_tokens', 'fk_bot_auth_id', { auth_token_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}
