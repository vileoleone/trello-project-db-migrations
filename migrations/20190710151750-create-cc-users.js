const { dataType } = require('db-migrate-shared')
const { CHAR, STRING, TEXT } = dataType

exports.up = async (db) => {
  await db.createTable('cc_users', {
    id: { type: CHAR, length: 36, null: false, primaryKey: true },
    name: { type: STRING, length: 256 },
    email: { type: STRING, length: 256 },
    admin_permissions: { type: TEXT },
    tabs: { type: TEXT },
    queues: { type: TEXT },
    email_reports: { type: TEXT },
    active_queues: { type: TEXT }
  })
}

exports.down = async (db) => {
  await db.dropTable('cc_users')
}
