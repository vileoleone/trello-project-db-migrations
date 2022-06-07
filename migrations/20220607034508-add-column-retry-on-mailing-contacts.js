exports.up = async (db) => {
  await db.addColumn('mailing_contacts', 'retry', { type: 'text' })
}

exports.down = async (db) => {
  await db.removeColumn('mailing_contacts', 'retry')
}
