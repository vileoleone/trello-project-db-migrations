const { dataType } = require('db-migrate-shared')
const { TEXT } = dataType

exports.up = async (db) => {
  await db.addColumn('profilers', 'hooks', { type: TEXT, notNull: false })
}
