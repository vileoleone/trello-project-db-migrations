const { dataType } = require('db-migrate-shared')
const { DATE_TIME, STRING, BIGINT, INTEGER, TEXT } = dataType

exports.up = async (db) => {
  await db.createTable('cc_user_logs', {
    id: { type: BIGINT, notNull: false, primaryKey: true, autoIncrement: true },
    ref_name: { type: STRING, length: 256, notNull: true },
    ref_id_int: { type: INTEGER },
    ref_id_str: { type: STRING, length: 128 },
    action: { notNull: true, type: 'ENUM', length: "'INSERT', 'UPDATE'" },
    cc_user_id: { type: STRING, length: 36, notNull: true },
    changes: { type: TEXT, notNull: true },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' }
  })
}

exports.down = async (db) => (
  await db.dropTable('cc_user_logs')
)
