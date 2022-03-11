const { dataType } = require('db-migrate-shared')
const { STRING } = dataType

exports.up = async (db) => {
  await db.changeColumn('uras', 'timezone', { type: STRING, notNull: true })
}

exports.down = async (db) => {
  await db.changeColumn('uras', 'timezone', { type: STRING, notNull: true })
}
