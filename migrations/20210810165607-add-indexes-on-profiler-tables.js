const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, TEXT, STRING } = dataType

exports.up = async (db) => {
  await createTableProfilerFields(db)
  await createTableProfilerTrees(db)
  await createTableProfilerTreeHistory(db)
  await createTableCallResponses(db, true)

  await db.addIndex('call_responses', 'idx_call_response_call_id', ['call_id'])
  await db.addIndex('call_responses', 'idx_call_response_profiler_trees_id', ['profiler_trees_id'])
  await db.addIndex('call_responses', 'idx_call_response_profiler_fields_id', ['profiler_fields_id'])
  await db.addIndex('call_responses', 'idx_call_response_contact_id', ['contact_id'])

  await db.addIndex('profiler_fields', 'idx_field_profiler_id', ['profiler_id'])
  await db.addIndex('profiler_trees', 'idx_tree_profiler_id', ['profiler_id'])
  await db.addIndex('profiler_tree_history', 'idx_tree_history_profiler_id', ['profiler_id'])
}

exports.down = async (db) => {
  await createTableProfilerFields(db)
  await createTableProfilerTrees(db)
  await createTableProfilerTreeHistory(db)
  await createTableCallResponses(db)

  await db.addForeignKey('profiler_fields', 'profilers', 'fk_profiler_fields_profiler_id', { profiler_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addForeignKey('profiler_trees', 'profilers', 'fk_profiler_trees_profiler_id', { profiler_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addForeignKey('profiler_tree_history', 'profilers', 'fk_profiler_tree_history_profiler_id', { profiler_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })

  await db.addIndex('call_responses', 'idx_call_response_call_id', ['call_id'])
  await db.addIndex('call_responses', 'idx_call_response_profiler_trees_id', ['profiler_trees_id'])
  await db.addIndex('call_responses', 'idx_call_response_profiler_fields_id', ['profiler_fields_id'])
}

const createTableProfilerFields = async (db) => {
  await db.dropTable('profiler_fields')
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
}

const createTableProfilerTrees = async (db) => {
  await db.dropTable('profiler_trees')
  await db.createTable('profiler_trees', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    label: { type: TEXT, notNull: true },
    parent_id: { type: BIGINT },
    active: { type: 'TINYINT', length: 1, notNull: true, defaultValue: 1 },

    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    updated_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: DATE_TIME, defaultValue: null },

    profiler_id: { type: BIGINT, notNull: true },
    profiler_tree_history_id: { type: BIGINT, notNull: true }
  })
}

const createTableProfilerTreeHistory = async (db) => {
  await db.dropTable('profiler_tree_history')
  await db.createTable('profiler_tree_history', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    tree: { type: TEXT, notNull: true },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    updated_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: DATE_TIME, defaultValue: null },
    profiler_id: { type: BIGINT, notNull: true }
  })
}

const createTableCallResponses = async (db, isUpgrade = false) => {
  const callResponseTable = {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    answer: { type: STRING, length: 255 },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    updated_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' },
    deleted_at: { type: DATE_TIME, defaultValue: null },
    call_id: { type: STRING, notNull: true, length: 128 },
    profiler_trees_id: { type: BIGINT },
    profiler_fields_id: { type: BIGINT }
  }
  if (isUpgrade) callResponseTable.contact_id = { type: STRING, notNull: false, length: 25 }
  await db.dropTable('call_responses')
  await db.createTable('call_responses', callResponseTable)
}
