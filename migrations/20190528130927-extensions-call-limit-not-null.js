
const { dataType } = require('db-migrate-shared')
const { INTEGER } = dataType

exports.up = async (db) => {
  await db.runSql('UPDATE extensions SET call_limit = 10 WHERE call_limit IS NULL')
  await db.changeColumn('extensions', 'call_limit', { type: INTEGER, length: 3, notNull: true })
}

exports.down = async (db) => {
  await db.changeColumn('extensions', 'call_limit', { type: INTEGER, length: 3, notNull: false })
}
