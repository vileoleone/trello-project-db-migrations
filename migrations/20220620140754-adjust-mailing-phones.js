const { dataType } = require('db-migrate-shared')
const { STRING, BIGINT, SMALLINT } = dataType

exports.up = async (db) => {
  await db.changeColumn('mailing_phones', 'phone_order', { notNull: true, type: SMALLINT, defaultValue: 0 })
  await db.changeColumn('mailing_phones', 'phone_number', { notNull: true, type: STRING, length: 12 })
  await db.changeColumn('mailing_phones', 'phone_retried', { notNull: true, type: SMALLINT, defaultValue: 0 })
  await db.changeColumn('mailing_phones', 'national_number', { notNull: true, type: STRING, length: 11 })
}

exports.down = async (db) => {
  await db.changeColumn('mailing_phones', 'phone_order', { type: BIGINT, notNull: true, defaultValue: 0 })
  await db.changeColumn('mailing_phones', 'phone_number', { type: STRING, length: 23, notNull: true })
  await db.changeColumn('mailing_phones', 'phone_retried', { type: BIGINT, notNull: true, defaultValue: 0 })
  await db.changeColumn('mailing_phones', 'national_number', { type: STRING, length: 23, notNull: true })
}
