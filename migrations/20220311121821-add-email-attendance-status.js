exports.up = async (db) => {
  await db.changeColumn('email_attendances', 'status', { type: 'ENUM', length: "'PENDING','OFFERING','ONGOING','SENDED','ANSWERED','FINISHED'" })
}

exports.down = async (db) => {
  await db.changeColumn('email_attendances', 'status', { type: 'ENUM', length: "'PENDING','OFFERING','ONGOING','ANSWERED','FINISHED'" })
}
