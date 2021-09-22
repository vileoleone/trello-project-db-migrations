exports.up = async (db) => (
  await db.runSql('ALTER TABLE dashboards MODIFY id varchar(72)')
)

exports.down = async (db) => (
  await db.runSql('ALTER TABLE dashboards MODIFY id bigint')
)
