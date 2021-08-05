const { dataType } = require('db-migrate-shared')
const { BIGINT, STRING, TEXT, DATE_TIME } = dataType

const table = {
  label: { type: TEXT, notNull: true },
  active: { type: 'TINYINT', length: 1, notNull: true, defaultValue: 1 },
  created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
  updated_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
  deleted_at: { type: DATE_TIME, defaultValue: null },
  profiler_id: { type: BIGINT, notNull: true }
}

exports.up = async (db) => {
  db.dropTable('profiler_trees')

  const alterColumns = {
    id: { type: STRING, length: 36, notNull: true, primaryKey: true },
    parent_id: { type: STRING, length: 36 }
  }

  await db.createTable('profiler_trees', { ...alterColumns, ...table })
  await db.addForeignKey('profiler_trees', 'profilers', 'fk_profiler_trees_profiler_id', { profiler_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}

exports.down = async (db) => {
  db.dropTable('profiler_trees')
  const oldColumns = {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    parent_id: { type: BIGINT },
    profiler_tree_history_id: { type: BIGINT, notNull: true }
  }

  await db.createTable('profiler_trees', { ...oldColumns, ...table })

  await db.addForeignKey('profiler_trees', 'profilers', 'fk_profiler_trees_profiler_id', { profiler_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addForeignKey('profiler_trees', 'profiler_tree_history', 'fk_profiler_trees_history_id', { profiler_tree_history_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addForeignKey('profiler_trees', 'profiler_trees', 'fk_profiler_trees_id', { parent_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}
