const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, STRING } = dataType
const columnTypes = '"isPhone", "isEmail", "isUrl", "isText", "isCpfCnpj", "isBool", "isFloat", "isInteger", "isDate", "isDatetime", "isTimestamp", "isUF", "isDdd", "isCity", "isCategory"'

exports.up = async (db) => {
  await db.createTable('mailing_columns', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },

    queue_id: { notNull: true, type: STRING, length: 128 },
    column_type: { type: 'ENUM', length: columnTypes, notNull: true, defaultValue: 'isText' },
    column_label: { type: STRING, length: 255, notNull: true },

    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    updated_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: BIGINT, notNull: true, defaultValue: 0 }
  })

  await db.addIndex('mailing_columns', 'idx_mailing_columns', ['queue_id', 'column_type', 'column_label', 'deleted_at'], true)
}

exports.down = async (db) => (
  db.dropTable('mailing_columns')
)
