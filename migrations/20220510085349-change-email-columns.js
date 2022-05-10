exports.up = async (db) => {
  await db.changeColumn('email_history', 'status', { type: 'ENUM', length: "'SEND_PENDING','SEND_DONE','ANSWER_PENDING','ANSWER_DONE','OFFERING','REJECTED','ACCEPTED','TIMEOUT','GIVEUP','TRANSFERRED','FINISHED','SEND_FAILED'" })
  await db.changeColumn('email_messages', 'status', { type: 'ENUM', length: "'SEND_PENDING','SEND_DONE','ANSWER_PENDING','ANSWER_DONE','TRANSFERRED','SEND_FAILED'" })
  await db.changeColumn('email_attendances', 'status', { type: 'ENUM', length: "'PENDING','OFFERING','ONGOING','SENDED','ANSWERED','TRANSFERRED','FINISHED'" })
}
