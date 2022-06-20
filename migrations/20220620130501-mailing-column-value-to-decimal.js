const { dataType } = require('db-migrate-shared')
const { DECIMAL } = dataType

exports.up = async (db) => {
  await db.changeColumn('mailing_column_numbers', 'mailing_column_value', { type: DECIMAL, precision: 15, scale: 3 })
  await db.changeColumn('queues', 'sla_percent', { type: DECIMAL, precision: 15, scale: 3 })
  await db.changeColumn('chats', 'rating', { type: DECIMAL, precision: 15, scale: 3 })
}

exports.down = async (db) => {
  await db.changeColumn('mailing_column_numbers', 'mailing_column_value', { type: DECIMAL, precision: 10, scale: 0 })
  await db.changeColumn('queues', 'sla_percent', { type: DECIMAL, precision: 10, scale: 0 })
  await db.changeColumn('chats', 'rating', { type: DECIMAL, precision: 10, scale: 0 })
}
