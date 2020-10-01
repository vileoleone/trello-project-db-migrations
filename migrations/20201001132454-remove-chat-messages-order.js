const { dataType } = require('db-migrate-shared')
const { INTEGER } = dataType

exports.up = (db) => db.removeColumn('chat_messages', 'order')
exports.down = (db) => db.addColumn('chat_messages', 'order', { type: INTEGER, notNull: true })
