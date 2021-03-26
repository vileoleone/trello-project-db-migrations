const { dataType } = require('db-migrate-shared')
const { TEXT, STRING } = dataType

exports.up = async (db) => {
  await db.changeColumn('chat_history', 'chat_info', { type: TEXT })
}

exports.down = async (db) => {
  await db.changeColumn('chat_history', 'chat_info', { type: STRING, length: 250 })
}
