exports.up = async (db) => {
  await db.changeColumn('uras', 'config', { type: 'MEDIUMTEXT' })
}

exports.down = async (db) => {
  await db.changeColumn('uras', 'config', { type: 'TEXT' })
}
