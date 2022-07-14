
exports.up = async (db) => {
  await db.addColumn('mailing_contacts', 'answered', { notNull: true, type: 'TINYINT', defaultValue: 0, length: 1 })
}

exports.down = async (db) => {
  await db.removeColumn('mailing_contacts', 'answered')
}
