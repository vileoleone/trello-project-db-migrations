exports.up = async (db) => (
  await db.changeColumn('chats', 'status', { type: 'ENUM', length: "'PENDING','OFFERING','ONGOING','FINISHED','LOSED','TRANSFERED', 'ABANDONED'", defaultValue: null })
)

exports.down = async (db) => (
  await db.changeColumn('chats', 'status', { type: 'ENUM', length: "'PENDING','OFFERING','ONGOING','FINISHED','LOSED','TRANSFERED'", defaultValue: null })
)