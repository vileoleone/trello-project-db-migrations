
exports.up = async (db) => {
  await db.addIndex('mailing_contacts', 'index_answered', ['answered'])
}

exports.down = async (db) => {
  await db.removeIndex('mailing_contacts', 'index_answered')
}
