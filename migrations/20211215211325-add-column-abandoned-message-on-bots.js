const { dataType } = require('db-migrate-shared')
const { TEXT } = dataType

exports.up = async (db) => {
  await db.addColumn('bots', 'abandoned_message', { type: TEXT })
}

exports.down = async (db) => {
  await db.removeColumn('bots', 'abandoned_message')
}
