exports.up = async (db) => {
  const queryResult = await db.runSql("SELECT id, source_id, info FROM chats where source in ('ZENVIA', 'GUPSHUP', 'TWILIO', '360DIALOG')")
  const chats = queryResult.map(chats => ({ ...chats }))
  for (const chat of chats) {
    const info = jsonParse(chat.info)
    let name = `${info.firstName} ${info.lastName || ''}`.trim()
    name = name ? `${name} - ${chat.source_id}` : chat.source_id
    await updateChat(db, name, chat.id)
  }
}

exports.down = async (db) => {
  const queryResult = await db.runSql("SELECT id, info FROM chats where source in ('ZENVIA', 'GUPSHUP', 'TWILIO', '360DIALOG')")
  const chats = queryResult.map(chats => ({ ...chats }))
  for (const chat of chats) {
    const info = jsonParse(chat.info)
    const name = `${info.firstName} ${info.lastName || ''}`.trim()
    await updateChat(db, name, chat.id)
  }
}

const updateChat = async (db, name, id) => (
  await db.runSql('UPDATE chats SET name = ? WHERE id = ?', [name, id])
)

const jsonParse = (raw) => {
  try {
    return isEmpty(raw) ? { firstName: '', lastName: '' } : JSON.parse(raw)
  } catch (_) {
    return { firstName: '', lastName: '' }
  }
}

const isEmpty = (val) => [null, undefined, ''].includes(val)
