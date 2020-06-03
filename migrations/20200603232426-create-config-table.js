const { dataType } = require('db-migrate-shared')
const { STRING, INTEGER, TEXT } = dataType

const configIdType = { type: INTEGER }

exports.up = async (db) => {
  await db.createTable('configs', {
    id: { ...configIdType, notNull: true, primaryKey: true, autoIncrement: true },
    field: { type: STRING, notNull: true },
    value: { type: TEXT }
  })
}

exports.down = async (db) => {
  await db.dropTable('configs')
}
