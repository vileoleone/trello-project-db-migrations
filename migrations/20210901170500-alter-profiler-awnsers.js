const { dataType } = require('db-migrate-shared')
const { STRING, BIGINT } = dataType

exports.up = async (db) => {
  await db.addColumn('call_responses', 'profiler_tree_id', { type: STRING, length: 36 })
  await db.addColumn('call_responses', 'profiler_field_id', { type: BIGINT })
  await db.runSql('UPDATE call_responses SET profiler_tree_id = profiler_trees_id, profiler_field_id = profiler_fields_id')
  await db.removeColumn('call_responses', 'profiler_trees_id')
  await db.removeColumn('call_responses', 'profiler_fields_id')
}
