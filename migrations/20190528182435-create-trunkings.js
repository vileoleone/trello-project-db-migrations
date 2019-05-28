const { dataType } = require('db-migrate-shared')
const { STRING, INTEGER } = dataType

exports.up = async (db) => {
  await db.createTable('trunkings', {
    id: { type: INTEGER, length: 6, notNull: true, primaryKey: true, autoIncrement: true },
    name: { type: STRING, length: 128, notNull: true }
  })
  await db.runSql("INSERT INTO trunkings (id, name) VALUES (1, 'Tronco Inicial')")
}

exports.down = async (db) => {
  await db.dropTable('trunkings')
}
