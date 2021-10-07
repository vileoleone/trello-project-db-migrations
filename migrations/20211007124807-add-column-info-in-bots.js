const { dataType } = require('db-migrate-shared')
const { TEXT } = dataType

exports.up = async (db) => {
  await db.addColumn('bots', 'info', { type: TEXT })
}

exports.down = async (db) => {
  await db.removeColumn('bots', 'info')
}
