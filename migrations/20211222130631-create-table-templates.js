const { dataType } = require('db-migrate-shared')
const { CHAR, BIGINT, INTEGER, DATE_TIME, STRING, TEXT } = dataType

exports.up = async (db) => {
  await db.createTable('bot_templates', {
    id: { type: INTEGER, length: 11, notNull: true, primaryKey: true, autoIncrement: true },
    bot_id: { type: BIGINT, notNull: true },
    name: { type: STRING, length: 256, notNull: true },
    template_id: { type: STRING, length: 256 },
    status: { type: CHAR, length: 36 },
    category: { type: 'ENUM', length: "'ACCOUNT_UPDATE', 'PAYMENT_UPDATE', 'PERSONAL_FINANCE_UPDATE', 'SHIPPING_UPDATE', 'RESERVATION_UPDATE', 'ISSUE_RESOLUTION', 'APPOINTMENT_UPDATE', 'TRANSPORTATION_UPDATE', 'TICKET_UPDATE', 'ALERT_UPDATE', 'AUTO_REPLY'" },
    message: { type: TEXT, notNull: true },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    updated_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: DATE_TIME }
  })
}

exports.down = async (db) => {
  await db.dropTable('bot_templates')
}
