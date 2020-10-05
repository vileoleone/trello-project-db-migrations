exports.up = async (db) => {
  await db.runSql('ALTER TABLE chat_messages CHANGE sended_at delivered_at datetime')
}

exports.down = async (db) => {
  await db.runSql('ALTER TABLE chat_messages CHANGE delivered_at sended_at datetime')
}
