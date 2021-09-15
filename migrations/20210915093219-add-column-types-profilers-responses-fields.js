const { dataType } = require('db-migrate-shared')
const { DECIMAL, BIGINT, STRING, TEXT, DATETIME } = dataType

exports.up = async (db) => {
  await db.runSql('DELETE FROM profilers_responses_fields')
  await db.addColumn('profilers_responses_fields', 'profiler_field_id', { type: BIGINT })

  await db.addColumn('profilers_responses_fields', 'val_option', { type: STRING, length: 255 })
  await db.addColumn('profilers_responses_fields', 'val_number', { type: DECIMAL, precision: 15, scale: 3 })
  await db.addColumn('profilers_responses_fields', 'val_text', { type: TEXT })
  await db.addColumn('profilers_responses_fields', 'val_period', { type: DATETIME })

  await db.removeColumn('profilers_responses_fields', 'answer')
  await db.removeColumn('profilers_responses_fields', 'field_id')

  await db.addIndex('profilers_responses_fields', 'idx_profilers_responses_option', ['val_option'])
  await db.addIndex('profilers_responses_fields', 'idx_profilers_responses_number', ['val_number'])
  await db.addIndex('profilers_responses_fields', 'idx_profilers_responses_period', ['val_period'])
  await db.addIndex('profilers_responses_fields', 'idx_profilers_responses_field', ['profiler_field_id'])
}

exports.down = () => {}
