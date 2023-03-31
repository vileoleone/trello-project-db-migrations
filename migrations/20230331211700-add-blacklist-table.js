const { dataType } = require('db-migrate-shared')
const {STRING, INTEGER,VARCHAR, BIGINT, DATE_TIME} = dataType

exports.up = async (db) => {
  await db.createTable('cards', {
    id: { type: VARCHAR(128), unique: true, notNull: true },
    queueId: {type: VARCHAR(128), notNull: true},
    phone_number: {type: VARCHAR(11), unique: true, notNull: true},
  })
}
exports.down =  async  function(db) {
  await db.dropTable('cards')
}
