exports.up = async (db) => (
  await db.runSql('ALTER TABLE call_responses MODIFY profiler_trees_id varchar(36)')
)

exports.down = async (db) => (
  await db.runSql('ALTER TABLE call_responses MODIFY profiler_trees_id bigint')
)
