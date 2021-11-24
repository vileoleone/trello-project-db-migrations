const { dataType } = require('db-migrate-shared')
const { TEXT } = dataType

exports.up = async (db) => {
  await db.addColumn('bots', 'welcome-message', { type: TEXT })
}

exports.down = async (db) => {
  await db.removeColumn('bots', 'welcome-message')
}
