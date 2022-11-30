const { dataType } = require('db-migrate-shared')
const { STRING } = dataType

exports.up = async (db) => {
  await db.addColumn('agents', 'nickname', { type: STRING, length: 256 })
}
