const { dataType } = require('db-migrate-shared')
const { TEXT } = dataType

exports.up = async (db) => (
  await db.addColumn('bots', 'mail', { type: TEXT, notNull: true, defaultValue: '' })
)

exports.down = async (db) => (
  await db.removeColumn('bots', 'mail', { type: TEXT, notNull: true, defaultValue: '' })
)
