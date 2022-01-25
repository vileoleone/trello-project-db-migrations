exports.up = async (db) => {
  await db.runSql('update chats set chat_secs = (unix_timestamp(finished_at) - unix_timestamp(created_at)) where finished_at IS NOT null')
  await db.runSql('update chats set talk_secs = (unix_timestamp(finished_at) - unix_timestamp(answered_at)) where finished_at IS NOT null')
  await db.runSql('update chats set hold_secs = (unix_timestamp(answered_at) - unix_timestamp(created_at)) where answered_at IS NOT null')
}

exports.down = async (db) => {
  await db.runSql('update chats set chat_secs = 0, hold_secs = 0, talk_secs = 0')
}
