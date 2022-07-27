exports.up = async (db) => {
  await db.addColumn('mailing_phones', 'phone_type_id', { type: 'TINYINT', length: 2 })
  await db.addColumn('mailing_phones', 'phone_type', { type: 'VARCHAR', length: 1 })
}

exports.down = async (db) => {
  await db.removeColumn('mailing_phones', 'phone_type_id')
  await db.removeColumn('mailing_phones', 'phone_type')
}
