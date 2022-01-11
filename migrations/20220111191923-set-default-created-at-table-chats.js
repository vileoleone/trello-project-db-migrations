exports.up = async (db) => {
  await db.runSql('ALTER TABLE chats MODIFY COLUMN created_at datetime NOT NULL default CURRENT_TIMESTAMP')
}

exports.down = async (db) => {
  await db.runSql('ALTER TABLE chats MODIFY COLUMN created_at datetime NOT NULL')
}
