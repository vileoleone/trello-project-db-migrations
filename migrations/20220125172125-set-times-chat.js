exports.up = async (db) => {
  await db.runSql('update chats set chat_secs = (unix_timestamp(finished_at) - unix_timestamp(created_at))')

  await db.runSql(`update chats as chat set 
  hold_secs = (
    COALESCE((select unix_timestamp(history.created_at) from chat_history as history where chat.id = history.chat_id and history.event = "ACCEPTED" order by id limit 1), 0) +
    COALESCE((select unix_timestamp(history.created_at) from chat_history as history where chat.id = history.chat_id and history.event = "START" order by id limit 1), 0)
  )`)

  await db.runSql('update chats set talk_secs = (COALESCE(chat_secs, 0) - COALESCE(hold_secs,0))')
}

exports.down = async (db) => {
  await db.runSql('update chats set chat_secs = 0, hold_secs = 0, talk_secs = 0')
}
