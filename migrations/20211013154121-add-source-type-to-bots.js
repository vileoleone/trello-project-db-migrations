exports.up = async (db) => (
  await db.changeColumn('bots', 'source_type', { notNull: true, type: 'ENUM', length: "'TELEGRAM', 'ZENVIA', 'FACEBOOK', '360DIALOG', 'GUPSHUP', 'TWILIO'" })
)

exports.down = async (db) => (
  await db.changeColumn('bots', 'source_type', { notNull: true, type: 'ENUM', length: "'TELEGRAM', 'ZENVIA', 'FACEBOOK', '360DIALOG', 'GUPSHUP'" })
)
