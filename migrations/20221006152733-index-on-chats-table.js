
exports.up = async (db) => {
  await db.addIndex('chats', 'index_created_at', ['created_at'])
  await db.addIndex('chats', 'index_finished_at', ['finished_at'])
}

exports.down = async (db) => {
  await db.removeIndex('chats', 'index_created_at')
  await db.removeIndex('chats', 'index_finished_at')
}
