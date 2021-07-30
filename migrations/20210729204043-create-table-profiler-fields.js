const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, TEXT, STRING } = dataType

exports.up = async (db) => {
  await db.createTable('profiler_fields', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    type: { notNull: true, type: 'ENUM', length: "'RADIO', 'TEXT', 'SELECT', 'CHECKBOX', 'DATE'" },
    title: { notNull: true, type: STRING, length: 250 },
    options: { type: TEXT },

    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    updated_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: DATE_TIME, defaultValue: null },

    profiler_id: { type: BIGINT, notNull: true }

  })
  await db.addForeignKey('profiler_fields', 'profilers', 'fk_profiler_fields_profiler_id', { profiler_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}

exports.down = async (db) => (
  db.dropTable('profiler_fields')
)
