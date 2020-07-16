const { dataType } = require('db-migrate-shared')
const { STRING, SMALLINT, CHAR, DATE_TIME } = dataType

exports.up = async (db) => {
  await db.addColumn('trunkings', 'group_id', { type: STRING, notNull: true, length: 30 })
  await db.addColumn('trunkings', 'technology', { type: STRING, notNull: true, length: 30 })
  await db.addColumn('trunkings', 'method', { type: CHAR, length: 1 })
  await db.addColumn('trunkings', 'status', { type: STRING, length: 30 })
  await db.addColumn('trunkings', 'updated_at', { type: DATE_TIME })
  await db.addColumn('trunkings', 'start_channel', { type: SMALLINT, length: 6 })
  await db.addColumn('trunkings', 'end_channel', { type: SMALLINT, length: 6 })
  await db.addColumn('trunkings', 'total', { type: SMALLINT, notNull: true })
  await db.addColumn('trunkings', 'in_use', { type: SMALLINT, notNull: true })
}

exports.down = async (db) => {
  await db.removeColumn('trunkings', 'group_id')
  await db.removeColumn('trunkings', 'technology')
  await db.removeColumn('trunkings', 'method')
  await db.removeColumn('trunkings', 'status')
  await db.removeColumn('trunkings', 'updated_at')
  await db.removeColumn('trunkings', 'start_channel')
  await db.removeColumn('trunkings', 'end_channel')
  await db.removeColumn('trunkings', 'total')
  await db.removeColumn('trunkings', 'in_use')
}
