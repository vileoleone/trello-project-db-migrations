const { dataType } = require('db-migrate-shared')
const { BIGINT } = dataType

exports.up = async (db) => {
  await db.changeColumn('email_history', 'status', { type: 'ENUM', length: "'SEND_PENDING','SEND_DONE','ANSWER_PENDING','ANSWER_DONE','OFFERING','REJECTED','ACCEPTED','TIMEOUT','GIVEUP','TRANSFERRED','FINISHED'" })
  await db.changeColumn('email_messages', 'status', { type: 'ENUM', length: "'SEND_PENDING','SEND_DONE','ANSWER_PENDING','ANSWER_DONE','TRANSFERRED'" })
  await db.changeColumn('email_attendances', 'status', { type: 'ENUM', length: "'PENDING','OFFERING','ONGOING','SENDED','ANSWERED','TRANSFERRED','FINISHED'" })
  await db.addColumn('email_attendances', 'transfer_attendance_id', { type: BIGINT })
}
