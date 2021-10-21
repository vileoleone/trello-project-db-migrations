exports.up = async (db) => {
  const queryResult = await db.runSql('SELECT * FROM chats')
  const chats = queryResult.map((chat) => ({ ...chat }))
  for (const chat of chats) {
    await insertChat(db, chat)
  }
}

const insertChat = async (db, chat) => {
  const info = JSON.parse(chat.info)
  const name = `${info.firstName} ${info.lastName}`
  await db.runSql('UPDATE chats SET name = ? WHERE id = ?', [name, chat.id])
}

exports.down = async (db) => (
  await db.runSql('UPDATE chats SET name = NULL')
)
