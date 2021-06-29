exports.up = async (db) => {
  await db.removeColumn('chats', 'status')
  await db.addColumn('chats', 'status', { type: 'ENUM', length: "'PENDING', 'OFFERING', 'ONGOING', 'FINISHED', 'LOSED'" })
}

exports.down = async (db) => {
  await db.removeColumn('chats', 'status')
  await db.addColumn('chats', 'status', { type: 'ENUM', length: "'PENDING', 'OFFERING', 'ONGOING', 'FINISHED'" })
}
