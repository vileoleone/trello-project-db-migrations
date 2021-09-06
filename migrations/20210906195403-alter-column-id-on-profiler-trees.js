exports.up = async (db) => (
  await db.runSql('ALTER TABLE profiler_trees MODIFY id varchar(36)')
)

exports.down = async (db) => (
  await db.runSql('ALTER TABLE profiler_trees MODIFY id bigint')
)
