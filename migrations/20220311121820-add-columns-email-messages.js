exports.up = async (db) => {
  await db.addColumn('email_messages', 'in_reply_to', { type: 'TEXT', defaultValue: '' })
  await db.addColumn('email_messages', 'reply_to', { type: 'TEXT', defaultValue: '' })
  await db.addColumn('email_messages', 'refers', { type: 'MEDIUMTEXT', defaultValue: '' })

  await db.changeColumn('email_messages', 'mail_body', { type: 'MEDIUMTEXT' })
  await db.changeColumn('email_messages', 'mail_attachments', { type: 'MEDIUMTEXT' })
  await db.changeColumn('email_attendances', 'status', { type: 'ENUM', length: "'PENDING','OFFERING','ONGOING','ANSWERED','FINISHED'" })
}

exports.down = async (db) => {
  await db.removeColumn('email_messages', 'in_reply_to')
  await db.removeColumn('email_messages', 'reply_to')
  await db.removeColumn('email_messages', 'refers')

  await db.changeColumn('email_messages', 'mail_body', { type: 'TEXT' })
  await db.changeColumn('email_messages', 'mail_attachments', { type: 'TEXT' })
  await db.changeColumn('email_attendances', 'status', { type: 'ENUM', length: "'PENDING','OFFERING','ONGOING','FINISHED'" })
}
