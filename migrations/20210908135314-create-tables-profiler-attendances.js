
const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, STRING } = dataType

exports.up = async (db) => {
  await createTableProfilersAttendances(db)
  await createTableProfilersResponsesFields(db)
  await createTableProfilersResponsesTrees(db)
}

const createTableProfilersAttendances = async (db) => {
  await db.createTable('profilers_attendances', {
    id: { type: BIGINT, notNull: true, primaryKey: true, autoIncrement: true },
    profiler_id: { type: BIGINT, notNull: true },
    call_id: { type: STRING, length: 128 },
    chat_id: { type: BIGINT },
    created_at: { type: DATE_TIME, notNull: true, defaultValue: 'CURRENT_TIMESTAMP' }
  })

  await db.addIndex('profilers_attendances', 'idx_profilers_attendances_id', ['id'])
  await db.addIndex('profilers_attendances', 'idx_profilers_attendances_profiler_id', ['profiler_id'])
  await db.addIndex('profilers_attendances', 'idx_profilers_attendances_call_id', ['call_id'])
  await db.addIndex('profilers_attendances', 'idx_profilers_attendances_chat_id', ['chat_id'])
  await db.addIndex('profilers_attendances', 'idx_profilers_attendances_created_at', ['created_at'])
}

const createTableProfilersResponsesFields = async (db) => {
  await db.createTable('profilers_responses_fields', {
    profiler_attendance_id: { type: BIGINT, notNull: true },
    field_id: { type: BIGINT, notNull: true },
    answer: { type: STRING, length: 255 }
  })

  await db.runSql('ALTER TABLE profilers_responses_fields ADD CONSTRAINT pk_profiler_responses_fields PRIMARY KEY (profiler_attendance_id, field_id)')
}

const createTableProfilersResponsesTrees = async (db) => {
  await db.createTable('profilers_responses_trees', {
    profiler_attendance_id: { type: BIGINT, notNull: true },
    tree_id: { type: STRING, length: 36, notNull: true }
  })

  await db.addIndex('profilers_responses_trees', 'idx_profilers_responses_trees_attendance_id', ['profiler_attendance_id'])
  await db.addIndex('profilers_responses_trees', 'idx_profilers_responses_trees_profiler_tree_id', ['tree_id'])
}

exports.down = async (db) => {
  await db.dropTable('profilers_responses_trees')
  await db.dropTable('profilers_responses_fields')
  await db.dropTable('profilers_attendances')
}
