exports.up = async (db) => {
  await db.changeColumn('chat_history', 'event', { notNull: true, type: 'ENUM', length: "'START', 'OFFERING', 'FINISHED', 'REJECTED', 'ACCEPTED', 'TIMEOUT', 'DISCONNECTED'" })
}

exports.down = async (db) => {
  await db.changeColumn('chat_history', 'event', { notNull: true, type: 'ENUM', length: "'START', 'OFFERING', 'FINISHED', 'REJECTED', 'ACCEPTED', 'TIMEOUT'" })
}
