exports.up = async (db) => {
  try { await db.removeColumn('chat_messages', 'welcome-message') } catch (_) {}
  const queryResult = await db.runSql('SELECT * FROM bots')
  const queryMessage = await db.runSql("SELECT value FROM configs WHERE field = 'welcome_chat_message'")
  const message = queryMessage.map(msg => msg).shift().value
  const bots = queryResult.filter((bot) => bot.welcome_message === null)
  for (const bot of bots) {
    await updateBot(db, bot, message)
  }
}

const updateBot = async (db, bot, message) => {
  await db.runSql('UPDATE bots SET welcome_message = ? WHERE id = ?', [message, bot.id])
}

exports.down = async (db) => (
  await db.runSql('UPDATE bots SET welcome_message = NULL')
)
