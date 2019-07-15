exports.up = async (db) => {
  await db.runSql('ALTER TABLE cc_users CHANGE active_queues preferences TEXT')
}

exports.down = async (db) => {
  await db.runSql('ALTER TABLE cc_users CHANGE preferences active_queues TEXT')
}
