exports.up = async (db) => {
  const queryResult = await db.runSql("SELECT id, source_id, name FROM chats where source in ('ZENVIA', 'GUPSHUP', 'TWILIO', '360DIALOG')")
  const chats = queryResult.map(chats => ({ ...chats }))
  for (const chat of chats) {
    const name = `${chat.name} - ${chat.source_id}`
    await updateChat(db, name, chat.id)
  }
}

exports.down = async (db) => {
  const queryResult = await db.runSql("SELECT id, info FROM chats where source in ('ZENVIA', 'GUPSHUP', 'TWILIO', '360DIALOG')")
  const chats = queryResult.map(chats => ({ ...chats }))
  for (const chat of chats) {
    const info = chat.info ? JSON.parse(chat.info) : { firstName: '', lastName: '' }
    const name = `${info.firstName} - ${chat.lastName}`
    await updateChat(db, name, chat.id)
  }
}

const updateChat = async (db, name, id) => (
  await db.runSql('UPDATE chats SET name = ? WHERE id = ?', [name, id])
)
