exports.up = async (db) => {
  await db.changeColumn('pending_settings', 'body', { type: 'MEDIUMTEXT' })
}

exports.down = async (db) => {
  await db.changeColumn('pending_settings', 'body', { type: 'TEXT' })
}
