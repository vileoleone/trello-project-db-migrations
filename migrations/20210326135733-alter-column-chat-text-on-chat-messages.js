exports.up = (db) => (
  db.runSql('ALTER TABLE chat_messages MODIFY message TEXT CHARACTER SET utf8mb4')
)
