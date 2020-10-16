const { dataType } = require('db-migrate-shared')
const { DATE_TIME } = dataType

exports.up = async (db) => {
  await db.addColumn('lcr_profiles', 'active', { type: 'TINYINT', length: 1, notNull: true, defaultValue: 1 })
  await db.addColumn('lcr_profiles', 'created_at', { type: DATE_TIME })
  await db.addColumn('lcr_profiles', 'updated_at', { type: DATE_TIME })
}

exports.down = async (db) => {
  await db.removeColumn('lcr_profiles', 'created_at')
  await db.removeColumn('lcr_profiles', 'created_at')
  await db.removeColumn('lcr_profiles', 'active')
}
