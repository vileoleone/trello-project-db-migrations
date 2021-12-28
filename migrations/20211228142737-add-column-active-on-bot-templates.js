exports.up = async (db) => {
  await db.addColumn('bot_templates', 'active', { type: 'TINYINT', length: 1, notNull: true, defaultValue: 1 })
}

exports.down = async (db) => {
  await db.removeColumn('bot_templates', 'active')
}
