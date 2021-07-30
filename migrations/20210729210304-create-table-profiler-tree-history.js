const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, TEXT } = dataType

exports.up = async (db) => {
  await db.createTable('profiler_tree_history', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    tree: { type: TEXT, notNull: true },

    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    updated_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: DATE_TIME, defaultValue: null },

    profiler_id: { type: BIGINT, notNull: true }

  })
  await db.addForeignKey('profiler_tree_history', 'profilers', 'fk_profiler_tree_history_profiler_id', { profiler_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}

exports.down = async (db) => (
  db.dropTable('profiler_tree_history')
)
