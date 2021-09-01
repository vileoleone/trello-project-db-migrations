const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, STRING } = dataType

exports.up = async (db) => {
  await db.createTable('call_responses', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    answer: { type: STRING, length: 255 },

    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    updated_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: DATE_TIME, defaultValue: null },

    call_id: { type: STRING, notNull: true, length: 128 },
    profiler_trees_id: { type: BIGINT },
    profiler_fields_id: { type: BIGINT }
  })

  await db.addIndex('call_responses', 'idx_call_response_call_id', ['call_id'])
  await db.addIndex('call_responses', 'idx_call_response_profiler_trees_id', ['profiler_trees_id'])
  await db.addIndex('call_responses', 'idx_call_response_profiler_fields_id', ['profiler_fields_id'])
}

exports.down = async (db) => (
  db.dropTable('call_responses')
)
