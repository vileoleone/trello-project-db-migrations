const { dataType } = require('db-migrate-shared')
const { DATE_TIME, TEXT } = dataType

exports.up = async (db) => {
  await db.changeColumn('email_attendances', 'status', { type: 'ENUM', length: "'PENDING','OFFERING','ONGOING','SENDED','ANSWERED','TRANSFERRED','FINISHED','SEND_FAILED'" })
  await db.addColumn('email_attendances', 'failed_at', { type: DATE_TIME })
  await db.addColumn('email_history', 'info', { type: TEXT, defaultValue: '' })
}
