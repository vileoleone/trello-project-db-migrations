const { dataType } = require('db-migrate-shared')
const { SMALLINT } = dataType

exports.up = async (db) => {
  await db.addColumn('chats', 'hold_secs', { type: SMALLINT, notNull: true, defaultValue: 0 })
  await db.addColumn('chats', 'talk_secs', { type: SMALLINT, notNull: true, defaultValue: 0 })
  await db.addColumn('chats', 'chat_secs', { type: SMALLINT, notNull: true, defaultValue: 0 })
}

exports.down = async (db) => {
  await db.removeColumn('chats', 'hold_secs', { type: SMALLINT, notNull: true, defaultValue: 0 })
  await db.removeColumn('chats', 'talk_secs', { type: SMALLINT, notNull: true, defaultValue: 0 })
  await db.removeColumn('chats', 'chat_secs', { type: SMALLINT, notNull: true, defaultValue: 0 })
}
