
exports.up = async (db) => {
  await db.addColumn('uras', 'timezone', { type: 'TINYINT', notNull: true })
}

exports.down = async (db) => {
  await db.addColumn('uras', 'timezone', { type: 'TINYINT', notNull: true })
}
