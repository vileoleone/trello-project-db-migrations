const { dataType } = require('db-migrate-shared')
const { DATE_TIME } = dataType

exports.up = async (db) => {
  await db.addColumn('email_messages', 'failed_at', { type: DATE_TIME })
}
