exports.up = async (db) => {
  const queryResult = await db.runSql(`SELECT chat_history.chat_id AS id, MIN(chat_history.created_at) AS answeredAt
                                          FROM chat_history
                                          JOIN chats ON (chats.id = chat_history.chat_id)
                                        WHERE chat_history.event = 'ACCEPTED'
                                        AND chats.answered_at IS NULL
                                        GROUP BY chat_history.chat_id`)

  const chats = queryResult.map((chat) => ({ ...chat }))
  for (const chat of chats) {
    await insertChat(db, chat)
  }
}

const insertChat = async (db, chat) => (
  await db.runSql('UPDATE chats SET answered_at = ? WHERE id = ?', [chat.answeredAt, chat.id])
)

exports.down = async (db) => (
  await db.runSql('UPDATE chats SET answered_at = NULL')
)
