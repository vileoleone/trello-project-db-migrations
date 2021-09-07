exports.up = async (db) => (
  await db.runSql('ALTER TABLE profiler_trees MODIFY parent_id varchar(36)')
)

exports.down = async (db) => (
  await db.runSql('ALTER TABLE profiler_trees MODIFY parent_id bigint')
)
