// const { dataType } = require('db-migrate-shared')
// const { STRING } = dataType

exports.up = async (db) => {
  await db.runSql('ALTER TABLE chat_messages MODIFY COLUMN id BIGINT NOT NULL AUTO_INCREMENT')
}

exports.down = async (db) => {
  await db.runSql('ALTER TABLE chat_messages MODIFY COLUMN id INT NOT NULL')
}
