exports.up = async (db) => (
  await db.changeColumn('chat_history', 'event', { type: 'ENUM', length: "'START','OFFERING','FINISHED','REJECTED','ACCEPTED','TIMEOUT','LOSED','TRANSFERED','ABANDONED'", defaultValue: null })
)

exports.down = async (db) => (
  await db.changeColumn('chat_history', 'event', { type: 'ENUM', length: "'START','OFFERING','FINISHED','REJECTED','ACCEPTED','TIMEOUT','LOSED','TRANSFERED'", defaultValue: null })
)
