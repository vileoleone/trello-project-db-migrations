exports.up = async (db) => {
  await db.changeColumn('chats', 'status', { type: 'ENUM', length: "'PENDING', 'OFFERING', 'ATTENDANCE'" })
}

exports.down = async (db) => {
  await db.runSql('ALTER TABLE chats MODIFY COLUMN status VARCHAR(15)')
}
