exports.up = async (db) => {
  await db.changeColumn('chat_history', 'event', { notNull: true, type: 'ENUM', length: "'START','OFFERING','FINISHED','REJECTED','ACCEPTED','TIMEOUT','DISCONNECTED', 'LOSED'" })
}

exports.down = async (db) => {
  await db.changeColumn('chat_history', 'event', { notNull: true, type: 'ENUM', length: "'START','OFFERING','FINISHED','REJECTED','ACCEPTED','TIMEOUT','DISCONNECTED'" })
}
