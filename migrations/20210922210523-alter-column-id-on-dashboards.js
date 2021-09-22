const { dataType } = require('db-migrate-shared')
const { BIGINT } = dataType

exports.up = async (db) => (
  await db.changeColumn('dashboards', 'id', { type: BIGINT, notNull: true, autoIncrement: true })
)

exports.down = async (db) => (
  await db.runSql('ALTER TABLE dashboards MODIFY id varchar(72)')
)
