// const { dataType } = require('db-migrate-shared')
// const { STRING } = dataType

exports.up = async (db) => {
  await db.runSql('ALTER TABLE chats ADD COLUMN status VARCHAR(15)')
}

exports.down = async (db) => {
  await db.runSql('ALTER TABLE chats DROP COLUMN status')
}
