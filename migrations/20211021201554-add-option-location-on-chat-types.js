exports.up = async (db) => (
  await db.changeColumn('chat_messages', 'type', { type: 'ENUM', length: "'TEXT', 'IMAGE', 'AUDIO', 'DOC', 'CONTACT', 'VIDEO', 'LOCALIZATION'", defaultValue: 'TEXT', notNull: true })
)

exports.down = async (db) => (
  await db.changeColumn('chat_messages', 'type', { type: 'ENUM', length: "'TEXT', 'IMAGE', 'AUDIO', 'DOC', 'CONTACT', 'VIDEO'", defaultValue: 'TEXT', notNull: true })
)
